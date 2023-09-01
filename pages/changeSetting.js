import {
  Cartesian3,
  Math,
  OpenStreetMapImageryProvider,
  SceneMode,
  createWorldTerrain,
} from "cesium";

import { Camera, CameraFlyTo, Viewer } from "resium";

export default function ChangeSetting() {
  const destination = Cartesian3.fromDegrees(127.5, 37.512, 1_500_000);
  const orientation = {
    heading: Math.toRadians(0.0),
    pitch: Math.toRadians(-90.0),
    roll: 0.0,
  };

  const osm = new OpenStreetMapImageryProvider({
    url: "https://a.tile.openstreetmap.org/",
  });

  const terrainProvider = createWorldTerrain({});

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
      >
        <Camera />
        <CameraFlyTo
          destination={destination}
          orientation={orientation}
          duration={3}
        />
      </Viewer>
    </>
  );
}

// problem : homebutton, maxzoom
