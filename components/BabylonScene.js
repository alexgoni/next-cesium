import { useEffect } from "react";
import * as BABYLON from "babylonjs";
import { GLTFFileLoader } from "@babylonjs/loaders/glTF";

const BabylonScene = () => {
  useEffect(() => {
    const canvas = document.getElementById("renderCanvas");
    const engine = new BABYLON.Engine(canvas);

    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.9, 0.9, 0.9); // scene의 배경 흰색 설정

    scene.createDefaultCameraOrLight(true, false, true);

    BABYLON.SceneLoader.RegisterPlugin(new GLTFFileLoader());
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
      engine.resize();
      scene.render();
    });

    window.addEventListener("resize", () => {
      engine.resize();
    });

    return () => {
      engine.dispose();
    };
  }, []);

  return (
    <canvas
      id="renderCanvas"
      className="m-0 h-full w-full overflow-hidden rounded-md p-0 shadow-md outline-none"
    />
  );
};

export default BabylonScene;
