import { useEffect } from "react";
import * as BABYLON from "babylonjs";

// Enable .babylon loader
BABYLON.SceneLoader.RegisterPlugin(new BABYLON.BabylonFileLoader());

const BabylonScene = () => {
  useEffect(() => {
    const canvas = document.getElementById("renderCanvas");
    const engine = new BABYLON.Engine(canvas, true);

    const createScene = () => {
      const scene = new BABYLON.Scene(engine);

      // Adding a light
      const light = new BABYLON.PointLight(
        "Omni",
        new BABYLON.Vector3(20, 20, 100),
        scene
      );

      // Adding an Arc Rotate Camera
      const camera = new BABYLON.ArcRotateCamera(
        "Camera",
        0,
        0.8,
        100,
        BABYLON.Vector3.Zero(),
        scene
      );
      camera.attachControl(canvas, false);

      // Load .gltf model
      BABYLON.SceneLoader.ImportMesh(
        "",
        "/gltf/dragon/",
        "scene.gltf",
        scene,
        (newMeshes) => {
          // Set the target of the camera to the first imported mesh
          camera.target = newMeshes[0];
        }
      );

      // Move the light with the camera
      scene.registerBeforeRender(() => {
        light.position = camera.position;
      });

      return scene;
    };

    const scene = createScene();

    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener("resize", () => {
      engine.resize();
    });

    return () => {
      scene.dispose();
      engine.dispose();
    };
  }, []);

  return <canvas id="renderCanvas" />;
};

export default BabylonScene;
