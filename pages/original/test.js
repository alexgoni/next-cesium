import {
  Cartesian3,
  Ion,
  Math,
  Matrix3,
  Matrix4,
  OpenStreetMapImageryProvider,
  SceneMode,
  Transforms,
  createOsmBuildings,
  createWorldTerrain,
  viewerCesiumInspectorMixin,
} from "cesium";
import Head from "next/head";
import { useEffect } from "react";
import {
  Camera,
  CameraFlyTo,
  Entity,
  Model,
  ModelGraphics,
  Scene,
  Viewer,
  useCesium,
} from "resium";

// Vanilla + resium

function SetOption() {
  const { viewer } = useCesium();
  viewer.scene.screenSpaceCameraController.maximumZoomDistance = 6378137 * 5;
  viewer.homeButton.viewModel.command.beforeExecute.addEventListener(
    (event) => {
      event.cancel = true;
      viewer.camera.flyTo({
        destination: Cartesian3.fromDegrees(127.5, 37.512, 1_500_000),
        orientation: {
          heading: Math.toRadians(0), // 지도 회전 값 양수로 갈수록꺽임
          pitch: Math.toRadians(-90.0), // 카메라 시야 각도 : -90[수직] , 0[수평]
          roll: 0.0, // 회전 값
        },
      });
    },
  );
  //   viewer.scene.primitives.add(createOsmBuildings()); // vue와 마찬가지로 지도 깨짐 현상
  const position1 = Cartesian3.fromDegrees(127.3, 37.48, 0);

  viewer.entities.add({
    name: "Chair",
    description: "Chair Model",
    position: position1,
    modelMatrix: Transforms.eastNorthUpToFixedFrame(position1),
    model: {
      uri: "/glb/chair.glb",
      minimumPixelSize: 0,
    },
  });
}

export default function Test() {
  const osm = new OpenStreetMapImageryProvider({
    url: "https://a.tile.openstreetmap.org/",
  });

  const terrainProvider = createWorldTerrain({});

  const destination = Cartesian3.fromDegrees(127.5, 37.512, 500_000);
  const orientation = {
    heading: Math.toRadians(0.0),
    pitch: Math.toRadians(-90.0),
    roll: 0.0,
  };

  const position1 = Cartesian3.fromDegrees(127.3, 37.48, 0);
  const modelMatrix1 = Transforms.eastNorthUpToFixedFrame(position1);

  return (
    <>
      <Viewer
        full
        imageryProvider={osm}
        terrainProvider={terrainProvider}
        sceneMode={SceneMode.SCENE3D}
        sceneModePicker={true}
        timeline={false}
        shouldAnimate={true}
        navigationHelpButton={false}
        geocoder={false}
        baseLayerPicker={false}
      >
        <Camera />
        <CameraFlyTo
          destination={destination}
          orientation={orientation}
          duration={0}
        />
        <SetOption />
        <Model
          url="/glb/Cesium_Man.glb"
          modelMatrix={modelMatrix1}
          scale={10_000}
        />
      </Viewer>
    </>
  );
}
