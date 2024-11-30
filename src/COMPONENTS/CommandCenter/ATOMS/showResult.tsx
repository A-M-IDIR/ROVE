import React from "react";

import Text from "COMPONENTS/Text";
import { TERMINAL } from "RESOURCES/HANDLERS/RemoteHandler";
import RequestHandler from "RESOURCES/HANDLERS/RquestHandler";

export default function ShowResult({ param }: { param: string }) {
  const [result, setResult] = React.useState<
    {
      title: string;
      tmdbId: string;
      year: string;
      original_title: string;
      poster: string;
      type: "show";
    }[]
  >([]);
  const target = TERMINAL.target();

  React.useEffect(() => {
    (async () => {
      const search = await RequestHandler({
        key: "SEARCH_RESULT",
        config: {
          url: `https://api.themoviedb.org/3/search/tv?query=${param}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWNkMmE1YWE0YmMwMzAyZjNhZmRlYTIwZGQ2YWRhZSIsInN1YiI6IjY1OTEyNjU1NjUxZmNmNWYxMzhlMWRjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5boG-w-nlk-SWB8hvFeWq_DNRbrU6n5XEXleVQ1L1Sg"}`,
          },
        },
      });

      const popularityThreshold = 0;
      const popularResults = search.data.results
        .filter(
          (media: any) =>
            media.vote_count >= popularityThreshold && media.vote_average >= 3
        )
        .sort((a: any, b: any) => b.vote_count - a.vote_count);

      setResult(
        popularResults.slice(0, 3).map((show: any) => {
          return {
            title: show.name,
            tmdbId: show.id,
            year: show.first_air_date.split("-")[0],
            original_title: show.original_name,
            poster: `https://www.themoviedb.org/t/p/w342/${show.poster_path}`,
            overview: show.overview,
            rating: show.vote_average,
            type: "show",
          };
        })
      );
    })();
  }, []);

  if (result.length > 0)
    return (
      <>
        <Text>CLICK TO PLAY, ENJOY !</Text>

        <>
          {result.map((show, i) => (
            <div key={i}>
              <div className="SpaceS" />

              <Text
                animationConfig={{ delay: 0.3 + (i * 3) / 10 }}
                isListElement
                style={{ marginLeft: "2rem" }}
                styling={"Link UpperCase"}
                onMouseEnter={(e) => {
                  localStorage.setItem(
                    "hoverInfo",
                    JSON.stringify({ media: show, x: e.clientX, y: e.clientY })
                  );
                  window.dispatchEvent(new Event("hoverInfo"));
                }}
                onMouseLeave={() => {
                  localStorage.removeItem("hoverInfo");
                  window.dispatchEvent(new Event("hoverInfo"));
                }}
                onClick={() => {
                  target.write(show);
                }}
              >
                {show.title}
              </Text>
            </div>
          ))}
        </>
      </>
    );
}
