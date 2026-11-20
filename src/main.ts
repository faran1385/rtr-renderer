import {PerspectiveCamera} from "./engine/Camera/PerspectiveCamera.ts";
import {Scene} from "./engine/Scene/Scene.ts";
import {Renderer} from "./engine/Renderer/Renderer.ts";
import * as Stats from "stats.js";
import {OrbitControls} from "./engine/Controls/OrbitControls.ts";

const canvas = document.getElementById("gpu-canvas") as HTMLCanvasElement;
if (!canvas) throw new Error('Missing canvas element "#gpu-canvas".');

const stats = new Stats.default();
stats.showPanel(1);
document.body.appendChild(stats.dom);

const renderer = new Renderer(canvas);
const scene = new Scene();

const camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    10000,
);
camera.setPosition(0, 0, 3);
const controls = new OrbitControls(camera, canvas)
await renderer.init();
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener("resize", () => {
    camera.setAspect(window.innerWidth / window.innerHeight);
    renderer.setSize(window.innerWidth, window.innerHeight);
});


function frameLoop(): void {
    stats.begin();

    controls.update()
    renderer.render(scene, camera);
    stats.end();
    requestAnimationFrame(frameLoop);
}

frameLoop();
