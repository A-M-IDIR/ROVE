import React from "react";
import styled from "styled-components";

import UseExplore from "RESOURCES/HOOKS/UseExplore";
import { TERMINAL } from "RESOURCES/HANDLERS/RemoteHandler";
import { UseRemoteCall } from "RESOURCES/HOOKS/UseRemote";
import RequestHandler from "RESOURCES/HANDLERS/RquestHandler";

type TypeSource = {
  url: string;
  type: "hls" | "mp4";
};
type TypeSources = {
  UHD?: TypeSource;
  FHD?: TypeSource;
  HD?: TypeSource;
  SD?: TypeSource;
  AUTO?: TypeSource;
};
export type TypeMedia = { sources: TypeSources; seasons?: any[] };

const Styled = styled.div`
  // overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  .Video {
    width: 100%;
    height: 100%;
  }

  .Loading {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;

    margin-bottom: 2rem;

    svg {
      width: 20%;
      min-width: 3rem;
      height: max-content;
    }
  }
`;

function core() {
  const { read: target, write: setTarget } = TERMINAL.target();
  const [media, setMedia] = React.useState<TypeMedia | null>(null);

  const { result, explore } = UseExplore();

  UseRemoteCall(`WATCH_CLOSED`, () => {
    setMedia(null);
    setTarget(null);
  });

  React.useEffect(() => {
    if (!target) return;

    if (target.type === "show") {
      if (!target.episode) {
        (async () => {
          let episode: {
            episode: number;
            season: number;
            totalSeasons: number;
          } = { episode: 1, season: 1, totalSeasons: 0 };

          const showDetails = await RequestHandler<any>({
            key: "GET_SHOW_DETAILS",
            config: {
              url: `https://api.themoviedb.org/3/tv/${target.tmdbId}`,
              headers: {
                Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGNkYzhiNDA5MDU4NjBmODQxYzQxMzM3NTE1ODA4MiIsIm5iZiI6MTcyODYxMDc5NS43OTg5ODEsInN1YiI6IjY1NDVmMjM5NDFhNTYxMzM2ODgzNWVhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uu3Iz7kvsB3AvjmLq5txLvlC63ChOPssN63DtQM8lRk"}`,
              },
            },
          });

          episode.totalSeasons =
            showDetails.data?.last_episode_to_air.season_number;

          let T = { ...target, episode };
          localStorage.setItem("T", JSON.stringify(T || ""));

          TERMINAL.openWindow("WATCH")(true);
          explore({ ...target, episode });
        })();
      } else {
        TERMINAL.openWindow("WATCH")(true);
        explore(target);
      }
    } else {
      TERMINAL.openWindow("WATCH")(true);
      explore(target);
    }
  }, [target]);

  const { emit: alert } = UseRemoteCall<any>("ALERT_HANDLE_ALERT");

  React.useEffect(() => {
    if (!result) {
      return setMedia(null);
    }

    if (!result.sources) {
      alert({ type: "warnning", message: "MEDIA NOT FOUND." });

      return setMedia(null);
    }

    localStorage.setItem("D", JSON.stringify(result || ""));

    setMedia(result);
  }, [result]);

  return { Styled, media };
}

export default core;
