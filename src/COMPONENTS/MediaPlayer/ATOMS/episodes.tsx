import React, { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";

import SvgHandler from "RESOURCES/HANDLERS/SvgHandler";
import Button from "./button";
import { AnimatePresence, motion } from "framer-motion";
import RequestHandler from "RESOURCES/HANDLERS/RquestHandler";
import { TERMINAL } from "RESOURCES/HANDLERS/RemoteHandler";

const Styled = styled.div`
  position: relative;

  .Menu {
    overflow: hidden;

    position: absolute;
    top: -2.5rem;
    right: 0;
    transform: translate(0, -100%);

    display: flex;
    justify-content: flex-start;
    flex-direction: column;

    width: 300px;
    height: 220px;
    max-height: 220px;
    padding: 0.4rem 0.8rem;
    padding-bottom: 0;

    border-radius: 0.3rem;
    background-color: rgb(15, 15, 15);

    transition: 300ms all cubic-bezier(0.8, 0, 0, 0.8);

    .Page {
      overflow: hidden;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;

      width: 100%;
    }

    .Head {
      display: flex;
      justify-content: space-between;
      align-items: center;

      width: 100%;
      height: 40px;
      min-height: 40px;
      padding: 0.2rem;

      border-bottom: 1px solid rgb(0, 125, 0, 0.2);

      font-size: 0.8rem;
      text-transform: uppercase;

      aside {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 0.2rem;

        .BackButton {
          display: flex;
          justify-content: center;
          align-items: center;

          width: 24px;
          height: 24px;

          border-radius: 0.2rem;
          background-color: rgb(20, 20, 20);

          cursor: pointer;

          svg {
            width: 1.3rem;
          }
        }
      }
    }

    .Container {
      overflow: hidden;
      overflow-y: auto;

      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      gap: 0.2rem;

      width: 100%;
      padding: 0.8rem 0;

      .Option {
        display: flex;
        justify-content: space-between;
        align-items: center;

        width: 100%;
        min-height: max-content;
        padding: 0.2rem 0.4rem;

        background-color: rgb(18, 18, 18);
        border-radius: 0.2rem;

        font-size: 0.76rem;

        cursor: pointer;

        &:hover {
          background-color: rgb(20, 20, 20);
        }

        svg {
          width: 1.2rem;
        }
      }
    }
  }
`;

function Episodes({ ...rest }: {} & ComponentPropsWithoutRef<"div">) {
  const [detail, setDetail] = React.useState<any | null>(null);
  const [seasons, setSeasons] = React.useState<any[] | null>(null);
  const [episodes, setEpisodes] = React.useState<any[] | null>(null);

  const [currentSeason, setCurrentSeason] = React.useState<any>(null);

  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const target = TERMINAL.target();

  React.useEffect(() => {
    let temp = JSON.parse(localStorage.getItem("D") as string);

    if (temp === "") return;

    setSeasons(JSON.parse(localStorage.getItem("D") as string).seasons);
    setDetail(JSON.parse(localStorage.getItem("T") as string));
  }, []);

  React.useEffect(() => {
    if (!currentSeason) {
      setEpisodes(null);
      return;
    }

    (async () => {
      const seasonDetails = await RequestHandler<any>({
        key: "GET_SHOW_DETAILS",
        config: {
          url: `https://api.themoviedb.org/3/tv/${detail.tmdbId}/season/${currentSeason.seasonNumber}`,
          headers: {
            Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGNkYzhiNDA5MDU4NjBmODQxYzQxMzM3NTE1ODA4MiIsIm5iZiI6MTcyODYxMDc5NS43OTg5ODEsInN1YiI6IjY1NDVmMjM5NDFhNTYxMzM2ODgzNWVhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uu3Iz7kvsB3AvjmLq5txLvlC63ChOPssN63DtQM8lRk"}`,
          },
        },
      });

      setEpisodes(seasonDetails.data.episodes);
    })();

    document.getElementById("EPISODES_MENU")?.focus();
  }, [currentSeason]);

  if (seasons)
    return (
      <Styled
        {...rest}
        id="EPISODES_MENU"
        tabIndex={1}
        onBlur={() => {
          setCurrentSeason(null);
          setIsVisible(false);
        }}
      >
        <Button
          icon={SvgHandler.Slide({ width: "74%" })}
          onClick={() => {
            setIsVisible(!isVisible);
            setCurrentSeason(null);
          }}
        />

        <div
          className="Menu"
          style={{
            opacity: isVisible ? 1 : 0,
            top: isVisible ? "-2.5rem" : "-1.5rem",
            pointerEvents: isVisible ? "all" : "none",
          }}
        >
          <AnimatePresence mode="wait">
            {currentSeason ? (
              <motion.div
                className="Page"
                initial={{ x: "50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.8, 0, 0, 0.8] }}
                key={"EPISODES"}
              >
                <div className="Head">
                  <aside>
                    <div
                      className="BackButton"
                      onClick={() => setCurrentSeason(null)}
                    >
                      {SvgHandler.ArrowLeft()}
                    </div>

                    <p>SEASONS</p>
                  </aside>

                  <p>SEASON {currentSeason.seasonNumber}</p>
                </div>

                <div className="Container">
                  {episodes?.map((e) => (
                    <div
                      className="Option"
                      key={e.id}
                      onClick={() => {
                        console.log({
                          tmdbId: detail.tmdbId,
                          title: detail.title,
                          type: "show",
                          year: detail.year,
                          episode: {
                            episode: e.episode_number,
                            season: currentSeason.seasonNumber,
                            totalSeasons: detail.episode.totalSeasons,
                          },
                        });
                        target.write({
                          tmdbId: detail.tmdbId,
                          title: detail.title,
                          type: "show",
                          year: detail.year,
                          episode: {
                            episode: e.episode_number,
                            season: currentSeason.seasonNumber,
                            totalSeasons: detail.episode.totalSeasons,
                          },
                        });
                      }}
                    >
                      <p>EPISODE {e.episode_number}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="Page"
                initial={{ x: "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.8, 0, 0, 0.8] }}
                key={"SEASONS"}
              >
                <div className="Head">
                  <p>{detail.title}</p>
                </div>

                <div className="Container">
                  {seasons?.map((e) => (
                    <div
                      className="Option"
                      key={e.id}
                      onClick={() => setCurrentSeason(e)}
                    >
                      <p>SEASON {e.seasonNumber}</p>

                      <>{SvgHandler.CaretRight()}</>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Styled>
    );
}

export default Episodes;
