import type { RawData } from "./types";

const options: RequestInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
};

export const fetchTracks = async () => {
  const res = await fetch("src/mock/tracks.json", options);
  if (!res.ok) { 
    throw new Error(`An error has occurred: ${res.status}`);
  }

  const result: RawData = await res.json();
  return result;
};
