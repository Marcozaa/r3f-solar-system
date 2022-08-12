import React from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

function Model({ url, ...props }) {
  const { scene } = useGLTF("models/ISS_stationary.glb");
  return <primitive object={scene} {...props} />;
}

export default function Satellite({ lat, lon, radius }) {
  useEffect(() => {
    // Make api request for ISS position
  }, []);

  function calcPosFromLatLonRad(lat, lon, radius) {
    var phi = (90 - lat) * (Math.PI / 180);
    var theta = (lon + 180) * (Math.PI / 180);

    var x = -(radius * Math.sin(phi) * Math.cos(theta));
    var z = radius * Math.sin(phi) * Math.sin(theta);
    var y = radius * Math.cos(phi);

    return [x + 60, y, z];
  }
  console.log(calcPosFromLatLonRad(-43.8816, -93.9964, 4));
  return <Model scale={0.02} position={calcPosFromLatLonRad(37.2, 81.6, 8)} />;
}
