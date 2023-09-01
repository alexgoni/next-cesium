import {
  Cartesian3,
  Math,
  Matrix3,
  Matrix4,
  OpenStreetMapImageryProvider,
  SceneMode,
  Transforms,
  createWorldTerrain,
} from "cesium";
import { useEffect, useRef, useState } from "react";
import {
  Camera,
  CameraFlyTo,
  Entity,
  ModelGraphics,
  Viewer,
  useCesium,
} from "resium";

function CheckDistance({ modelPosition, onDistanceChange }) {
  const { viewer } = useCesium();

  useEffect(() => {
    const cameraMoveHandler = () => {
      const cameraPosition = viewer.camera.positionWC;
      const distance = Cartesian3.distance(cameraPosition, modelPosition);
      onDistanceChange(distance);
    };
    viewer.camera.changed.addEventListener(cameraMoveHandler);
    return () => {
      viewer.camera.changed.removeEventListener(cameraMoveHandler);
    };
  }, [viewer, modelPosition, onDistanceChange]);

  return null;
}

export default function LazyLoading() {
  const osm = new OpenStreetMapImageryProvider({
    url: "https://a.tile.openstreetmap.org/",
  });

  const terrainProvider = createWorldTerrain({
    requestWaterMask: true,
    requestVertexNormals: true,
  });

  const destination = Cartesian3.fromDegrees(127.5, 37.512, 1_500_000);
  const orientation = {
    heading: Math.toRadians(0.0),
    pitch: Math.toRadians(-90.0),
    roll: 0.0,
  };

  const [distanceToModel, setDistanceToModel] = useState(null);

  const handleDistanceChange = (distance) => {
    setDistanceToModel(distance);
  };

  const position1 = Cartesian3.fromDegrees(127.3, 37.48, 0);
  const angleRadY = 90;
  const rotMatrixY = Matrix3.fromRotationZ(Math.toRadians(angleRadY));
  const fixPosition1 = Matrix4.multiply(
    Transforms.eastNorthUpToFixedFrame(position1),
    Matrix4.fromRotationTranslation(rotMatrixY, new Cartesian3(0, 0, 0)),
    new Matrix4()
  );

  const shouldLoadModel = distanceToModel !== null && distanceToModel < 70000;

  return (
    <>
      <Viewer
        full
        terrainProvider={terrainProvider}
        imageryProvider={osm}
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
        {/* <CameraFlyTo
          destination={destination}
          orientation={orientation}
          duration={3}
        /> 
        re-rendering issue
        */}
        <CheckDistance
          modelPosition={position1}
          onDistanceChange={handleDistanceChange}
        />
        {shouldLoadModel && (
          <Entity position={position1}>
            <ModelGraphics
              uri="/gltf/dragon/scene.gltf"
              modelMatrix={fixPosition1}
              scale={500_000}
            />
          </Entity>
        )}
      </Viewer>
    </>
  );
}
