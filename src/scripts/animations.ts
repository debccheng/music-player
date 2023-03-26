import {
  SCREEN_BOX_SHADOW, SCREEN_GLOW_ANIMATION, SCREEN_DIM_GLOW_ANIMATION, SCREEN_INITIAL, SHADOW_ANIMATION, LIGHT_ANIMATION
} from "./constants";
import type { VisualiserRenderProps } from "./types";

const getElementsForAnimation = (): [HTMLElement, HTMLElement, HTMLElement] | [] => { 
  const screen = document.getElementById("screen");
  const shadow = document.getElementById("shadow");
  const svgContainer = document.querySelectorAll<HTMLElement>(".svg-container")?.[0];

  if (!screen || !shadow || !svgContainer) return [];
  return [screen, shadow, svgContainer];
};

export const showPlaylist = () => { 
  const playlist = document.querySelector<HTMLUListElement>(".playlist");

  if (playlist) { 
    playlist.style.animation = "1s load-playlist forwards";
  }
};

export const scrollAudioIntoView = (index: number) => { 
  const items = document.querySelectorAll<HTMLUListElement>("li");
  if (items && items.length > index + 1) {
    setTimeout(() => {
      items[index].scrollIntoView({ behavior: "smooth" });
    }, 200);
  }
};

export const playCSSAnimation = (trackCover: string) => {
  const elements = getElementsForAnimation();

  if (elements.length === 3) { 
    const [screen, shadow, svgContainer] = elements;

    screen.style.setProperty("--screenImage", `url("${trackCover}")`);
    screen.style.setProperty("--screenGlow", SCREEN_BOX_SHADOW);
    screen.style.animation = SCREEN_GLOW_ANIMATION;

    shadow.style.opacity = "0.5";
    shadow.style.animation = SHADOW_ANIMATION;

    svgContainer.style.filter = "brightness(100%)";
    svgContainer.style.animation = LIGHT_ANIMATION;
  }
};

export const changeCSSAnimation = () => {
  const elements = getElementsForAnimation();

  if (elements.length === 3) { 
    const [screen, shadow, svgContainer] = elements;

    screen.style.animation = SCREEN_DIM_GLOW_ANIMATION;

    shadow.style.opacity = "0.2";
    shadow.style.animation = "none";

    svgContainer.style.filter = "brightness(80%)";
    svgContainer.style.animation = "none";
  }
};

export const resetCSSAnimation = () => { 
  const elements = getElementsForAnimation();

  if (elements.length === 3) { 
    const [screen, shadow, svgContainer] = elements;

    screen.style.setProperty("--screenImage", "none");
    screen.style.setProperty("--screenGlow", "none");
    screen.style.animation = SCREEN_INITIAL;

    shadow.style.opacity = "0.1";
    shadow.style.animation = "none";

    svgContainer.style.filter = "brightness(50%)";
    svgContainer.style.animation = "none";
  }
};

const renderFrame = ({
  analyser,
  ctx,
  bufferLength,
  dataArray,
  barWidth,
  height,
  width
}: VisualiserRenderProps) => {
  requestAnimationFrame(() => renderFrame({
    analyser,
    ctx,
    bufferLength,
    dataArray,
    barWidth,
    height,
    width
  }));

  let x = 0;
  let barHeight = 0;

  analyser.getByteFrequencyData(dataArray);

  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < bufferLength; i += 1) {
    barHeight = dataArray[i];

    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.strokeStyle = "white";
    ctx.fillRect(x - 4, height - barHeight, barWidth - 4, barHeight);
    ctx.lineWidth = 2;
    ctx.strokeRect(x - 4, height - barHeight, barWidth - 4, barHeight);

    x += barWidth + 1;
  }
};

export const visualise = (context: AudioContext, src: MediaElementAudioSourceNode) => {
  const analyser = context.createAnalyser();

  const screen = document.getElementById("screen") as HTMLDivElement;
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;

  canvas.width = screen.clientWidth;
  canvas.height = screen.clientHeight * 5;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  src.connect(analyser);
  analyser.connect(context.destination);

  analyser.fftSize = 64;

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const w = canvas.width;
  const h = canvas.height;

  const barWidth = (w / bufferLength) * 3;

  renderFrame({
    analyser,
    ctx,
    bufferLength,
    dataArray,
    height: h,
    width: w,
    barWidth
  });
};
