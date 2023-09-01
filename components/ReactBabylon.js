import { useEffect } from "react";
import {
  Scene,
  Engine,
  ArcRotateCamera,
  HemisphericLight,
  Model,
  startTransition,
} from "react-babylonjs";
import * as BABYLON from "babylonjs";

const BabylonScene = () => {
  useEffect(() => {
    const canvas = document.getElementById("renderCanvas");
    const engine = new BABYLON.Engine(canvas);

    startTransition(() => {
      // 비동기 작업 수행
      const scene = new BABYLON.Scene(engine);
      scene.clearColor = new BABYLON.Color3(0.9, 0.9, 0.9);

      const camera = new BABYLON.FreeCamera(
        "camera1",
        new BABYLON.Vector3(0, 1, -10),
        scene,
      );
      camera.setTarget(BABYLON.Vector3.Zero());

      const light = new BABYLON.HemisphericLight(
        "light1",
        new BABYLON.Vector3(0, 1, 0),
        scene,
      );
      light.intensity = 0.7;

      BABYLON.SceneLoader.ImportMesh(
        "",
        "/glb/",
        "Cesium_Man.glb",
        scene,
        function (meshes, particleSystems, skeletons, animationGroups) {
          const model = meshes[0];
          model.scaling = new BABYLON.Vector3(0.25, 0.25, 0.25);
          model.position.y = -0.3;
        },
      );

      // Run the render loop
      engine.runRenderLoop(() => {
        scene.render();
      });

      window.addEventListener("resize", () => {
        engine.resize();
      });

      return () => {
        engine.dispose();
      };
    });
  }, []);

  return (
    <Engine canvasId="renderCanvas">
      <Scene clearColor={new BABYLON.Color3(0.9, 0.9, 0.9)}>
        <arcRotateCamera
          name="camera1"
          target={BABYLON.Vector3.Zero()}
          alpha={Math.PI / 4}
          beta={Math.PI / 3}
          radius={5}
        />
        <hemisphericLight
          name="light1"
          intensity={0.7}
          direction={BABYLON.Vector3.Up()}
        />

        <Model
          rootUrl="/glb/"
          sceneFilename="Cesium_Man.glb"
          scaling={new BABYLON.Vector3(0.25, 0.25, 0.25)}
          position={new BABYLON.Vector3(0, -0.3, 0)}
        />
      </Scene>
    </Engine>
  );
};

export default BabylonScene;
