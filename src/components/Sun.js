import { Effects } from "@react-three/drei";
import { UnrealBloomPass } from "three-stdlib";
import { useLoader } from "@react-three/fiber";
import React from "react";
import { Canvas, extend } from "@react-three/fiber";
import { TextureLoader } from "three";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Outline,
  Select,
  Selection,
  SelectiveBloom,
  Vignette,
} from "@react-three/postprocessing";
extend({ UnrealBloomPass });

export const Sun = React.forwardRef((props) => {
  const colorMap = useLoader(TextureLoader, props.colorMapLink || null);
  const glowMap = useLoader(TextureLoader, "glow.png");

  return (
    <group position={[0, 0, 0]}>
      <mesh>
        <sphereGeometry args={[props.radius, 32, 32]} />
        <meshPhongMaterial map={colorMap} />
      </mesh>

      <sprite scale={200}>
        <spriteMaterial map={glowMap} />
      </sprite>
    </group>
  );
});
