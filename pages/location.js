import {
  Cartesian3,
  ScreenSpaceEventType,
  Math,
  Cartographic,
  createWorldTerrain,
  SceneMode,
} from "cesium";
import { useEffect } from "react";
import { Viewer, Entity, ScreenSpaceEventHandler, useCesium } from "resium";
import * as Cesium from "cesium";

function PositionEntity() {
  const { viewer } = useCesium();

  useEffect(() => {
    const scene = viewer.scene;
    const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    const entity = viewer.entities.add({}); // location label entity
    entity.label = new Cesium.LabelGraphics();

    handler.setInputAction((movement) => {
      const cartesian = viewer.camera.pickEllipsoid(
        movement.endPosition,
        scene.globe.ellipsoid
      );
      if (cartesian) {
        const cartographic = Cartographic.fromCartesian(cartesian);
        const longitudeString = Math.toDegrees(cartographic.longitude).toFixed(
          2
        );
        const latitudeString = Math.toDegrees(cartographic.latitude).toFixed(2);

        entity.position = cartesian;
        entity.label.show = true;
        entity.label.text =
          `Lon: ${`   ${longitudeString}`.slice(-7)}\u00B0` +
          `\nLat: ${`   ${latitudeString}`.slice(-7)}\u00B0`;
      } else {
        entity.label.show = false;
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    return () => {
      handler.destroy();
      viewer.entities.remove(entity);
    };
  }, [viewer]);

  return null;
}

export default function Location() {
  const terrainProvider = createWorldTerrain({
    requestWaterMask: true,
    requestVertexNormals: true,
  });

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
        <PositionEntity />
      </Viewer>
    </>
  );
}
