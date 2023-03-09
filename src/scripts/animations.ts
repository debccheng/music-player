
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
