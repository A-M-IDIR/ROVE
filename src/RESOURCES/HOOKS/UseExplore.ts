import { TypeMedia } from "COMPONENTS/Watch/core";
import React from "react";
import RequestHandler from "RESOURCES/HANDLERS/RquestHandler";
import { alert } from "RESOURCES/HOCS/WithAlert";

export type TypeTarget = {
  title: string;
  year: string;
  tmdbId: string;
  episode?: {
    season: number;
    episode: number;
    totalSeasons: number;
  };
  type: "movie" | "show";
};

function UseExplore() {
  const [result, setResult] = React.useState<TypeMedia | null>(null);

  const explore = async (target: TypeTarget) => {
    setResult(null);

    const baseUrl = "https://dry-term-9a81.am-idir-contact.workers.dev";
    const url = target.episode
      ? `${baseUrl}/explore?title=${encodeURIComponent(target.title)}&tmdbId=${
          target.tmdbId
        }&releaseYear=${target.year}&season=${target.episode.season}&episode=${
          target.episode.episode
        }&totalSeasons=${target.episode.totalSeasons}`
      : `${baseUrl}/explore?title=${encodeURIComponent(target.title)}&tmdbId=${
          target.tmdbId
        }&releaseYear=${target.year}`;

    const fetchTarget = await RequestHandler<TypeMedia>({
      key: "EXPLORE",
      config: {
        url,
      },
    });

    if (fetchTarget.error) {
      alert({ type: "error", message: fetchTarget.error });
    }

    if (fetchTarget.data) {
      setResult(fetchTarget.data);
    }
  };

  return { result, explore };
}

export default UseExplore;
