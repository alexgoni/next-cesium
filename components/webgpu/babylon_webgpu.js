import { useEffect } from "react";
import * as BABYLON from "babylonjs";
import { GLTFFileLoader } from "@babylonjs/loaders/glTF";

export default function WebGPUScene() {
  useEffect(() => {
    const canvas = document.getElementById("renderCanvas");
    const engine = new BABYLON.WebGPUEngine(canvas);

    const initAsync = async () => {
      await engine.initAsync(); // The only change with webGL Engine

      const scene = new BABYLON.Scene(engine);
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
    };

    initAsync();
  }, []);

  return (
    <canvas
      id="renderCanvas"
      className="m-0 h-full w-full overflow-hidden rounded-md p-0 shadow-md outline-none"
    />
  );
}
