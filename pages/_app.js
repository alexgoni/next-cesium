import { Ion } from "cesium";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5YTY3ZDVhNC0zMThlLTQxZjUtODhmOS04ZmJjZGY4MDM4MDEiLCJpZCI6MTQzNzkxLCJpYXQiOjE2ODU2ODkwNDF9.3RQSwjKyySalcp1nUufcBxUk_hNALFLJ9j-X0-FoEpI";

  useEffect(() => {
    const cesiumViewerBottom = document.querySelector(".cesium-viewer-bottom");
    if (cesiumViewerBottom) {
      cesiumViewerBottom.remove();
    }
  }, []);
  return <Component {...pageProps} />;
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
