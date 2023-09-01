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
import { Camera, CameraFlyTo, Entity, ModelGraphics, Viewer } from "resium";

export default function Build() {
  const destination = Cartesian3.fromDegrees(127.5, 37.512, 50000);
  const orientation = {
    heading: Math.toRadians(0.0),
    pitch: Math.toRadians(-90.0),
    roll: 0.0,
  };

  const osm = new OpenStreetMapImageryProvider({
    url: "https://a.tile.openstreetmap.org/",
  });

  const terrainProvider = createWorldTerrain({
    requestWaterMask: true,
    requestVertexNormals: true,
  });

  const position1 = Cartesian3.fromDegrees(127.3, 37.48, 0);
  const angleRadY = 90;
  const rotMatrixY = Matrix3.fromRotationZ(Math.toRadians(angleRadY));
  const fixPosition1 = Matrix4.multiply(
    Transforms.eastNorthUpToFixedFrame(position1),
    Matrix4.fromRotationTranslation(rotMatrixY, new Cartesian3(0, 0, 0)),
    new Matrix4()
  );

  const position2 = Cartesian3.fromDegrees(128.3, 37.48, 10000);
  const fixPosition2 = Matrix4.multiply(
    Transforms.eastNorthUpToFixedFrame(position2),
    Matrix4.fromRotationTranslation(rotMatrixY, new Cartesian3(0, 0, 0)),
    new Matrix4()
  );

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
        <CameraFlyTo
          destination={destination}
          orientation={orientation}
          duration={3}
        />
        <Entity position={position1}>
          <ModelGraphics
            uri="/gltf/dragon/scene.gltf"
            modelMatrix={fixPosition1}
            scale={500_000}
          />
        </Entity>

        <Entity position={position2}>
          <ModelGraphics
            uri="/gltf/dragon/scene.gltf"
            modelMatrix={fixPosition2}
            scale={500_000}
          />
        </Entity>
      </Viewer>
    </>
  );
}

// problem : 모델 모습
