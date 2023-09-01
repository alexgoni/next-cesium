import React, { useEffect } from "react";
import {
  Cartesian3,
  Ion,
  Math as CesiumMath,
  Color,
  OpenStreetMapImageryProvider,
  createWorldTerrain,
} from "cesium";
import Head from "next/head";
import { Camera, CameraFlyTo, CzmlDataSource, Viewer, useCesium } from "resium";

function CzmlComponent() {
  const { viewer } = useCesium();

  const pointDummyArr = [
    {
      id: "document",
      name: "CZML Point",
      version: "1.0",
    },
  ];
  for (let i = 0; i < 250; i++) {
    let obj = {
      id: `point${i}`,
      name: "point",
      position: {
        cartographicDegrees: [
          CesiumMath.nextRandomNumber() * 360 - 180, // Longitude
          CesiumMath.nextRandomNumber() * 180 - 90, // Latitude
          0, // Height
        ],
      },
      point: {
        color: Color.fromRandom(),
        outlineColor: Color.RED,
        outlineWidth: Math.floor(Math.random() * 4),
        pixelSize: Math.floor(Math.random() * 50),
      },
      description: `Description for point ${i}`,
      properties: {
        level: Math.floor(Math.random() * 999),
        cityName: "Seoul",
      },
    };
    pointDummyArr.push(obj);
  }

  const dataSource = <CzmlDataSource data={pointDummyArr} />;
  console.log(viewer.dataSources);
  // Add the data source to the viewer
  viewer.dataSources.add(dataSource);
  viewer.zoomTo(dataSourcePromise);
}

export default function Point() {
  const destination = Cartesian3.fromDegrees(127.5, 37.512, 1_500_000);
  const orientation = {
    heading: CesiumMath.toRadians(0.0),
    pitch: CesiumMath.toRadians(-90.0),
    roll: 0.0,
  };

  const osm = new OpenStreetMapImageryProvider({
    url: "https://a.tile.openstreetmap.org/",
  });

  const terrainProvider = createWorldTerrain({
    requestWaterMask: true,
    requestVertexNormals: true,
  });

  return (
    <>
      <Viewer
        full
        imageryProvider={osm}
        terrainProvider={terrainProvider}
        sceneModePicker={true}
        timeline={false}
        animation={false}
        navigationHelpButton={false}
        geocoder={false}
        baseLayerPicker={false}
        infoBox={false}
      >
        <Camera />
        <CameraFlyTo
          destination={destination}
          orientation={orientation}
          duration={3}
        />
        <CzmlComponent />
      </Viewer>
    </>
  );
}
