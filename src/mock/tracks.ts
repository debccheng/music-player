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

export const tracks: TrackData[] = [
  {
    id: "113748",
    title: "Lofi Lofi Dem Bucks",
    artist: "BrentinDavis",
    duration: 251,
    cover: require("./assets/images/01.jpg"),
    src: require("./assets/audio/lofi-lofi-dem-bucks.mp3")
  },
  {
    id: "011254",
    title: "Jazzy Abstract Beat",
    artist: "Coma-media",
    duration: 85,
    cover: require("./assets/images/02.jpg"),
    src: require("./assets/audio/jazzy-abstract-beat.mp3")
  },
  {
    id: "112369",
    title: "Lofi Summer Background",
    artist: "Vladislav Kurnikov",
    duration: 133,
    cover: require("./assets/images/03.jpg"),
    src: require("./assets/audio/lofi-summer-background.mp3")
  }
];
