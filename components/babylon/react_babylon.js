import React, { Suspense, useEffect } from "react";
import { Scene, Engine, Model, startTransition } from "react-babylonjs";
import * as BABYLON from "babylonjs";
import "@babylonjs/loaders/glTF";

// react-babylon 컴포넌트 안에서 처음 resize 문제 해결 불가
const BabylonScene = () => {
  return (
    <Engine
      observeCanvasResize={true}
      canvasId="renderCanvas"
      className="rounded-md shadow-md outline-none"
    >
      <Scene clearColor={new BABYLON.Color3(0.9, 0.9, 0.9)}>
        <arcRotateCamera
          name="camera1"
          target={BABYLON.Vector3.Zero()}
          alpha={Math.PI / 4}
          beta={Math.PI / 3}
          radius={5}
          wheelPrecision={50}
          upperRadiusLimit={6}
        />
        <hemisphericLight
          name="light1"
          intensity={0.7}
          direction={BABYLON.Vector3.Up()}
        />

        <Suspense fallback="Loading...">
          <Model
            rootUrl="/glb/"
            sceneFilename="Cesium_Man.glb"
            scaling={new BABYLON.Vector3(0.25, 0.25, 0.25)}
            position={new BABYLON.Vector3(0, -0.3, 0)}
          />
        </Suspense>
      </Scene>
    </Engine>
  );
};

export default BabylonScene;
