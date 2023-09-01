import { Cartesian3, Math, createWorldTerrain } from "cesium";
import { Camera, CameraFlyTo, Viewer } from "resium";

export default function Home() {
  const destination = Cartesian3.fromDegrees(-122.4175, 37.655, 400);
  const orientation = {
    heading: Math.toRadians(0.0),
    pitch: Math.toRadians(-15.0),
  };

  return (
    <>
      <Viewer full terrainProvider={createWorldTerrain()}>
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
