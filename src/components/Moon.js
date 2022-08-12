import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { TextureLoader } from "three";

export function Moon({
  radius,
  colorMapLink,
  bumpMapLink,
  specMapLink,
  bumpSize,
  ref,
}) {
  const moon = useRef();

  const colorMap = useLoader(TextureLoader, colorMapLink || null);
  const bumpMap = useLoader(TextureLoader, bumpMapLink || null);
  const specMap = useLoader(TextureLoader, specMapLink || null);

  //Set the moon's orbital radius, start angle, and angle increment value
  var r = 16;
  var theta = 0;
  var dTheta = (2 * Math.PI) / 1000;

  useFrame(() => {
    //Increment theta, and update moon x and y
    //position based off new theta value
    theta += dTheta;
    moon.current.position.x = r * Math.cos(theta);
    moon.current.position.z = r * Math.sin(theta);
  });

  return (
    <mesh ref={moon}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshPhongMaterial
        displacementMap={bumpMap}
        displacementScale={bumpSize}
        specularMap={specMap}
        specular={"grey"}
        map={colorMap}
      />
    </mesh>
  );
}
