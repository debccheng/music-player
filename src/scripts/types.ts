export type TrackData = {
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

export type RawData = {
  tracks: TrackData[];
}

export type AudioWithImage = HTMLAudioElement & { img?: string }

export type VisualiserRenderProps = {
  analyser: AnalyserNode;
  ctx: CanvasRenderingContext2D;
  bufferLength: number;
  dataArray: Uint8Array;
  barWidth: number;
  height: number;
  width: number
}
