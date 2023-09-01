import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function WebGPUScene() {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      console.error("Container element not found.");
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load(
      "/glb/airplane.glb",
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);

        return () => {
          model.traverse((object) => {
            if (object.isMesh) {
              object.geometry.dispose();
              object.material.dispose();
            }
          });
        };
      },
      undefined,
      (error) => {
        console.error("Error loading glTF model: ", error);
      },
    );

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <div ref={containerRef} id="container"></div>;
}
