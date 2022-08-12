import "./App.css";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sparkles } from "@react-three/drei";
import { DoubleSide, TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useMemo } from "react";
import { Sun } from "./components/Sun";
import { Moon } from "./components/Moon";
import Satellite from "./components/Satellite";
import { Suspense } from "react";
import { Loader } from "./components/Loader";
import * as THREE from "three";
function Particles() {}

const Earth = React.forwardRef((props) => {
  const colorMap = useLoader(TextureLoader, props.colorMapLink || null);
  const bumpMap = useLoader(TextureLoader, props.bumpMapLink || null);
  const specMap = useLoader(TextureLoader, props.specMapLink || null);
  const earth = useRef();

  console.log(earth);
  var r = 80;
  var theta = 0;
  var dTheta = (2 * Math.PI) / 1000;
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    earth.current.rotation.y += 0.001;

    state.camera.lookAt(earth.current.position);
    theta += dTheta;
    //earth.current.position.x = r * Math.cos(theta);
    //earth.current.position.z = r * Math.sin(theta);
    //earth.current.position.set(Math.cos(date) * 100, 0, Math.sin(date) * 100);
    /*earth.current.position.x += Math.cos(time);
    earth.current.position.z += Math.sin(time);*/
  });
  return (
    <group ref={earth} position={[60, 0, 0]}>
      <mesh>
        <sphereGeometry args={[props.radius, 32, 32]} />
        <meshPhongMaterial
          displacementMap={bumpMap}
          displacementScale={props.bumpSize}
          specularMap={specMap}
          specular={"grey"}
          map={colorMap}
        />
      </mesh>
      <Clouds radius={4} />
    </group>
  );
});

const Curve = () => {
  const curve = new THREE.EllipseCurve(0, 0, 250, 300, 0, 2 * Math.PI);

  const points = curve.getSpacedPoints(200);
  return (
    <line>
      <bufferGeometry setFromPoints={points} />
      <lineBasicMaterial color={"red"} transparent opacity={0.5} />
    </line>
  );
};

const EarthOrbit = () => {
  return (
    <mesh position={[-25, 0, 40]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[80, 0.5, 16, 100]} />
      <meshBasicMaterial />
    </mesh>
  );
};

function Clouds({ radius }) {
  const cloudsColor = useLoader(TextureLoader, "/earth/cloudscolor.jpg");

  return (
    <mesh>
      <sphereGeometry args={[radius / 2 + 0.01, 32, 32]} />
      <meshPhongMaterial
        map={cloudsColor}
        side={DoubleSide}
        opacity={0.8}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function App() {
  const moon = useRef();

  const prova = useRef();
  return (
    <div className="App">
      <Canvas
        style={{
          background: "#010b19",
        }}
        camera={{
          position: [0, 0, -170],
        }}>
        <Suspense fallback={<Loader />}>
          <hemisphereLight color="white" groundColor="white" intensity={0.75} />
          <directionalLight
            intensity={0.5}
            castShadow
            shadow-mapSize-height={512}
            shadow-mapSize-width={512}
          />
          <spotLight
            castShadow
            shadow-mapSize-height={512}
            shadow-mapSize-width={512}
            position={[50, 10, 10]}
            intensity={1}
            angle={0.15}
            penumbra={1}
          />
          <group ref={prova} position={[10, 0, 0]}>
            <Earth
              radius={8}
              bumpMapLink={"/earth/earthbump1k.jpg"}
              specMapLink={"/earth/earthspec1k.jpg"}
              colorMapLink={"/earth/earthmap1k.jpg"}
              bumpSize={0.5}
            />
          </group>
          <Satellite lat={37.795517} lon={-122.393693} rad={10} />

          <group>
            <Sun radius={4 * 10.9} colorMapLink={"/sun/sunmap.jpg"} />
          </group>
          <group position={[70, 0, 0]}>
            <Moon
              ref={moon}
              radius={4 / 3.66}
              bumpMapLink={"/moon/moonbump4k.jpg"}
              specMapLink={"/earth/earthspec1k.jpg"}
              colorMapLink={"/moon/moonmap4k.jpg"}
              bumpSize={0.15}
            />
          </group>
          <Sparkles
            count={10000}
            /** Color of particles (default: 100) */
            color={"white"}
            noise={1}
            scale={333}
            size={12}
          />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
