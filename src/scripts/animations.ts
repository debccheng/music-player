
const SCREEN_BOX_SHADOW = "0 0 5.5em 1.5em rgba(255, 255, 255, 0.66)";
const SCREEN_GLOW_ANIMATION = "0.5s ease-in-out infinite fuzzy-screen, 3s ease-in infinite glow";
const SCREEN_DIM_GLOW_ANIMATION = "0.5s ease-in-out infinite fuzzy-screen, 0.5s ease-in-out infinite dim-glow";

export const playAnimation = (trackCover: string) => {
  const screen = document.getElementById("screen");
  // const progressBar = document.getElementById("progress-bar");
  const shadow = document.getElementById("shadow");
  const svgContainer = document.querySelectorAll<HTMLElement>(".svg-container");

  if (screen) {
    screen.style.setProperty("--screenImage", `url("${trackCover}")`);
    screen.style.setProperty("--screenGlow", SCREEN_BOX_SHADOW);
    screen.style.animation = SCREEN_GLOW_ANIMATION;
  }
  // if (progressBar) progressBar.style.display = "block";
  if (shadow) {
    shadow.style.opacity = "0.5";
    shadow.style.animation = "3s steps(2) infinite shadow-change";
  }
  if (svgContainer && svgContainer.length > 0) {
    svgContainer[0].style.filter = "brightness(100%)";
    svgContainer[0].style.animation = "3s steps(2) infinite light-change";
  }
};

export const holdAnimation = () => {
  const screen = document.getElementById("screen");
  const shadow = document.getElementById("shadow");
  const svgContainer = document.querySelectorAll<HTMLElement>(".svg-container");

  if (screen) {
    screen.style.animation = SCREEN_DIM_GLOW_ANIMATION;
  }
  if (shadow) {
    shadow.style.opacity = "0.2";
    shadow.style.animation = "none";
  }
  if (svgContainer && svgContainer.length > 0) {
    svgContainer[0].style.filter = "brightness(80%)";
    svgContainer[0].style.animation = "none";
  }
};

export const showWaves = (audio: HTMLAudioElement, context: AudioContext, src: MediaElementAudioSourceNode, pause: boolean, resume: boolean) => {
  console.log(pause);
  
  if (pause) {
    context.suspend();
    if (src) src.disconnect();
    return;
  }
  if (resume) { 
    context.resume();
  }

  const analyser = context.createAnalyser();

  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  src.connect(analyser);
  analyser.connect(context.destination);

  analyser.fftSize = 32;

  const bufferLength = analyser.frequencyBinCount;

  const dataArray = new Uint8Array(bufferLength);

  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;

  const barWidth = (WIDTH / bufferLength) * 2.5;
  let barHeight;
  let x = 0;

  const renderFrame = () => {
    if (pause) {
      return;
    }
    requestAnimationFrame(renderFrame);
    // console.log("renderframe");

    x = 0;

    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    for (let i = 0; i < bufferLength; i+=1) {
      barHeight = dataArray[i];

      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.strokeStyle = "white";
      ctx.fillRect(x - 8, HEIGHT - barHeight, barWidth - 8, barHeight);
      ctx.lineWidth = 4;
      ctx.strokeRect(x - 8, HEIGHT - barHeight, barWidth - 8, barHeight);

      x += barWidth + 1;
    }
  };

  renderFrame();
  
};

