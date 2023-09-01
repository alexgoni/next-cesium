import * as Cesium from "cesium";
import { useEffect, useRef } from "react";
import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Office_building from "/components/3DModels/Office_building";
import BabylonScene from "../components/BabylonScene";

// No Resium
export default function PopUp() {
  useEffect(() => {
    const osm = new Cesium.OpenStreetMapImageryProvider({
      url: "https://a.tile.openstreetmap.org/",
    });

    const viewer = new Cesium.Viewer("cesiumContainer", {
      imageryProvider: osm, // 초기 지도 설정
      terrainProvider: Cesium.createWorldTerrain(), // 지형데이터
      selectionIndicator: false,
      infoBox: false,
      sceneMode: Cesium.SceneMode.SCENE3D,
      sceneModePicker: true,
      timeline: false,
      shouldAnimate: false,
      navigationHelpButton: false,
      geocoder: false,
      baseLayerPicker: false,
    });

    viewer.scene.screenSpaceCameraController.maximumZoomDistance = 6378137 * 5;

    const defaultCoordinate = () => {
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(127.5, 37.512, 1_500_000),
        orientation: {
          heading: Cesium.Math.toRadians(0), // 지도 회전 값 양수로 갈수록꺽임
          pitch: Cesium.Math.toRadians(-90.0), // 카메라 시야 각도 : -90[수직] , 0[수평]
          roll: 0.0, // 회전 값
        },
      });
    };

    defaultCoordinate();

    // Models
    const position1 = Cesium.Cartesian3.fromDegrees(127.3, 37.48, 50); // height 적용 안됨
    const model1 = viewer.entities.add({
      name: "Dragon",
      description: "Sitting Dragon",
      position: position1,
      model: {
        uri: "/gltf/dragon/scene.gltf",
        scale: 500_000,
      },
    });

    const position2 = Cesium.Cartesian3.fromDegrees(127.2, 37.48, 50);
    const model2 = viewer.entities.add({
      name: "Cesium_Man",
      description: "This model represents a human figure in the Cesium scene.",
      position: position2,
      model: {
        uri: "/glb/Cesium_Man.glb",
        scale: 10_000,
      },
    });

    const position3 = Cesium.Cartesian3.fromDegrees(127.55, 37.48, 30);
    const model3 = viewer.entities.add({
      name: "airplane",
      description: "Flying airplane",
      position: position3,
      model: {
        uri: "/glb/airplane.glb",
        scale: 100,
      },
    });

    // glb 파일과 fbx -> gltf 변환 파일의 차이 없음
    const position4 = Cesium.Cartesian3.fromDegrees(127.6, 37.48, 30);
    const model4 = viewer.entities.add({
      name: "airplane",
      description: "Flying airplane",
      position: position4,
      model: {
        uri: "/gltf/airplane/scene.gltf",
        scale: 100,
      },
    });

    // click event
    viewer.screenSpaceEventHandler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
    );

    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((click) => {
      const pickedObject = viewer.scene.pick(click.position);
      const info = document.querySelector("#info");

      if (
        Cesium.defined(pickedObject) &&
        pickedObject.id &&
        pickedObject.id.description
      ) {
        // 인포박스 내용
        const buildingName = document.querySelector("#building_name");
        const description = document.querySelector("#description");
        const latitudeText = document.querySelector("#latitude");
        const longitudeText = document.querySelector("#longitude");

        // 모델 위도, 경도 구하기
        const cartesian = pickedObject.id.position._value;
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        const longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(
          2,
        );
        const latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(
          2,
        );

        buildingName.innerHTML = pickedObject.id.name;
        description.innerHTML = pickedObject.id.description;
        latitudeText.innerHTML = latitude;
        longitudeText.innerHTML = longitude;

        info.style.display = "flex"; // 인포박스 표시
      } else {
        info.style.display = "none"; // 인포박스 숨기기
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    /**
     * 홈버튼 클릭 Event Override
     */
    viewer.homeButton.viewModel.command.beforeExecute.addEventListener(
      (event) => {
        // 기존 적용되어있는 이동 이벤트 cancel 시킴
        event.cancel = true;
        // 초기 값 적용
        defaultCoordinate();
      },
    );

    return () => {
      viewer.destroy(); // Dispose of the viewer when the component unmounts
      info.style.display = "none"; // 인포박스 숨기기
    };
  }, []);

  const divRef = useRef(null);
  let offsetX, offsetY;

  const handleMouseDown = (e) => {
    e.preventDefault();
    offsetX = e.clientX - divRef.current.getBoundingClientRect().left;
    offsetY = e.clientY - divRef.current.getBoundingClientRect().top;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    divRef.current.style.left = e.clientX - offsetX + "px";
    divRef.current.style.top = e.clientY - offsetY + "px";
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      <div id="cesiumContainer" className="m-0 h-screen w-screen p-0"></div>

      <div
        ref={divRef}
        id="info"
        onMouseDown={handleMouseDown}
        className="absolute left-10 top-10 z-10 hidden cursor-move flex-col rounded-lg border-4 border-b-8 border-black bg-slate-100 p-4 text-left"
      >
        <div className="flex justify-between ">
          <span className="mb-1 pl-1 text-xl font-semibold">건축물 정보</span>
          <span
            className="material-symbols-outlined cursor-pointer pt-0.5 text-gray-600"
            onClick={() => {
              info.style.display = "none";
            }}
          >
            close
          </span>
        </div>

        <div className="flex-start mx-2 mt-2 flex gap-8">
          <table className="my-2 h-full rounded-lg bg-blue-600 text-lg text-blue-100 shadow-lg">
            <tbody>
              <tr className="border-b-2 border-gray-200">
                <td className="w-44 py-3 text-center font-medium text-white">
                  Building Name
                </td>
                <td
                  id="building_name"
                  className="w-64 rounded-tr-lg bg-blue-500 px-2"
                >
                  -
                </td>
              </tr>
              <tr className="border-b-2 border-gray-200">
                <td className="py-3 text-center font-medium text-white">
                  Description
                </td>
                <td id="description" className="bg-blue-500 px-2">
                  -
                </td>
              </tr>
              <tr className="border-b-2 border-gray-200">
                <td className="py-3 text-center font-medium text-white">
                  위도
                </td>
                <td id="latitude" className="bg-blue-500 px-2">
                  -
                </td>
              </tr>
              <tr className=" border-gray-200">
                <td className="py-3 text-center font-medium text-white">
                  경도
                </td>
                <td id="longitude" className="rounded-br-lg bg-blue-500 px-2">
                  -
                </td>
              </tr>
            </tbody>
          </table>

          <div
            className="mt-2 h-[500px] w-[600px] cursor-pointer rounded-md border-2 border-gray-600"
            onMouseDown={(e) => e.stopPropagation()} // Canvas 안에서는 drag event 막음
          >
            {/* <Canvas>
              <Stage>
                <Office_building />
              </Stage>
              <OrbitControls maxDistance={300} />
            </Canvas> */}
            <BabylonScene />
          </div>
        </div>
      </div>
    </>
  );
}
