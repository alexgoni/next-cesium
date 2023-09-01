/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 dragon.gltf --transform 
Files: dragon.gltf [21.59MB] > dragon-transformed.glb [2.42MB] (89%)
Author: Al-Deezel (https://sketchfab.com/Al-dezel)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/dragon-animation-standing-f551d410456447d19d408503481e41aa
Title: Dragon Animation Standing
*/

import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/transformed/dragon-transformed.glb"
  );
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <primitive object={nodes.GLTF_created_0_rootJoint} />
        <skinnedMesh
          name="Object_228"
          geometry={nodes.Object_228.geometry}
          material={materials.material_0}
          skeleton={nodes.Object_228.skeleton}
          scale={0.073}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/transformed/dragon-transformed.glb");