import { Cartesian3, Math, Matrix3, Matrix4, Transforms } from "cesium";

import { Camera, CameraFlyTo, Model, Viewer } from "resium";

export default function GlbObject() {
  const destination = Cartesian3.fromDegrees(127.5, 37.512, 1_500_000);
  const orientation = {
    heading: Math.toRadians(0.0),
    pitch: Math.toRadians(-90.0),
    roll: 0.0,
  };

  const angleRadY = 90;
  const rotMatrixY = Matrix3.fromRotationZ(Math.toRadians(angleRadY));
  const position1 = Cartesian3.fromDegrees(127.3, 37.48, 0);
  const fixPosition1 = Matrix4.multiply(
    Transforms.eastNorthUpToFixedFrame(position1),
    Matrix4.fromRotationTranslation(rotMatrixY, new Cartesian3(0, 0, 0)),
    new Matrix4()
  );

  /////////////////////
  const aa = Matrix4.multiply(
    Transforms.eastNorthUpToFixedFrame(Cartesian3.fromDegrees(127.3, 37.48, 0)),
    Matrix4.fromRotationTranslation(
      Matrix3.fromRotationZ(Math.toRadians(90)),
      new Cartesian3(0, 0, 0)
    ),
    new Matrix4()
  );

  const modelMatrix1 = Transforms.eastNorthUpToFixedFrame(position1);
  //////////////

  return (
    <>
      <Viewer full>
        <Camera />
        <CameraFlyTo
          destination={destination}
          orientation={orientation}
          duration={3}
        />
        <Model
          url="/glb/Cesium_Man.glb"
          modelMatrix={modelMatrix1}
          scale={1000000}
        />
      </Viewer>
    </>
  );
}

// problem: maxzoom, homebutton, inspector
