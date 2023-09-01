import {
  Cartesian3,
  ScreenSpaceEventType,
  Math,
  Matrix3,
  Matrix4,
  Transforms,
  Cartographic,
  createWorldTerrain,
  SceneMode,
} from "cesium";
import { useEffect, useState } from "react";
import {
  Viewer,
  Entity,
  ScreenSpaceEventHandler,
  useCesium,
  Camera,
  CameraFlyTo,
} from "resium";
import * as Cesium from "cesium";

function ModelInfo({ onModelClick, setShowPopUp }) {
  const { viewer } = useCesium();

  const position1 = Cartesian3.fromDegrees(127.3, 37.48, 0);
  const model = viewer.entities.add({
    name: "Dragon",
    description: "Sitting Dragon",
    position: position1,
    model: {
      uri: "/gltf/dragon/scene.gltf",
      scale: 500_000,
    },
  });

  useEffect(() => {
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    handler.setInputAction((click) => {
      const pickedObject = viewer.scene.pick(click.position);
      if (Cesium.defined(pickedObject) && pickedObject.id) {
        const cartesian = pickedObject.id.position._value;
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        const longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(
          2
        );
        const latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(
          2
        );

        const modelInfo = {
          name: pickedObject.id.name,
          description: pickedObject.id.description._value,
          longitude,
          latitude,
        };

        onModelClick(modelInfo);
        setShowPopUp(true); // 모델을 클릭한 경우 팝업 열기
      } else {
        setShowPopUp(false); // 모델이 클릭되지 않은 경우 팝업 닫기
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }, [onModelClick, setShowPopUp, viewer]);

  return null;
}

export default function PopUp() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [modelInfo, setModelInfo] = useState(null);

  const terrainProvider = createWorldTerrain({
    requestWaterMask: true,
    requestVertexNormals: true,
  });

  const destination = Cartesian3.fromDegrees(127.5, 37.512, 50000);
  const orientation = {
    heading: Math.toRadians(0.0),
    pitch: Math.toRadians(-90.0),
    roll: 0.0,
  };

  const angleRadY = 90;
  const rotMatrixY = Matrix3.fromRotationZ(Math.toRadians(angleRadY));
  const position1 = Cartesian3.fromDegrees(127.3, 37.48, 0);
  const fixPosition1 = Cesium.Matrix4.multiply(
    Transforms.eastNorthUpToFixedFrame(position1),
    Matrix4.fromRotationTranslation(rotMatrixY, new Cartesian3(0, 0, 0)),
    new Matrix4()
  );

  const handleModelClick = (info) => {
    setModelInfo(info);
    setShowPopUp(true);
  };

  return (
    <>
      <Viewer
        full
        terrainProvider={terrainProvider}
        sceneMode={SceneMode.SCENE3D}
        sceneModePicker={true}
        timeline={false}
        animation={false}
        navigationHelpButton={false}
        geocoder={false}
        baseLayerPicker={false}
        infoBox={false}
        shouldAnimate={false}
      >
        <Camera />
        <CameraFlyTo
          destination={destination}
          orientation={orientation}
          duration={3}
        />
        <ModelInfo
          onModelClick={handleModelClick}
          setShowPopUp={setShowPopUp}
        />
      </Viewer>

      {showPopUp && (
        <div className="popup">
          <h2>{modelInfo.name}</h2>
          <p>{modelInfo.description}</p>
          <p>Longitude: {modelInfo.longitude}</p>
          <p>Latitude: {modelInfo.latitude}</p>
        </div>
      )}

      <style jsx>{`
        .popup {
          position: absolute;
          top: 50px;
          left: 50px;
          padding: 10px;
          background-color: white;
          border: 1px solid #ccc;
        }
      `}</style>
    </>
  );
}
