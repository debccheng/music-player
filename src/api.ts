type TrackData = {
  id: string;
  title: string;
  artist: string;
  /**
   * Song length in seconds.
   */
  duration: number;
  /**
   * Album art.
   */
  cover: string;
  /**
   * Audio source.
   */
  src: string;
}

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

  const result: TrackData[] = await res.json();
  console.log(result);
  return result;
 };
