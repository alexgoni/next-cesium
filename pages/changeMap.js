import {
  Cartesian3,
  Math,
  SceneMode,
  WebMapServiceImageryProvider,
} from "cesium";

import { Camera, CameraFlyTo, Viewer } from "resium";

export default function ChangeMap() {
  const destination = Cartesian3.fromDegrees(127.5, 37.512, 1_500_000);
  const orientation = {
    heading: Math.toRadians(0.0),
    pitch: Math.toRadians(-90.0),
    roll: 0.0,
  };

  const geoMap = new WebMapServiceImageryProvider({
    url: "http://192.168.1.45:8188/geoserver/wms",
    parameters: {
      format: "image/png",
      transparent: "true",
      tiled: true,
      enablePickFeatures: true,
    },
    layers: "stans:osm_map",
    maximumLevel: 12,
  });

  return (
    <>
      <Viewer
        full
        imageryProvider={geoMap}
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

// problem : maxzoom, homebutton
