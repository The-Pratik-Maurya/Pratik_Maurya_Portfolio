"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Float, Line } from "@react-three/drei"; // Stars hata diya yahan se
import { useRef } from "react";
import * as THREE from "three";

function BlockchainNetwork() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
  });

  const centerNode = [0, 0, 0] as [number, number, number];
  const topNode = [1.8, 1.5, 0.5] as [number, number, number];
  const bottomNode = [-1.8, -1.5, -0.5] as [number, number, number];

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1.5}>
      <group ref={groupRef} scale={0.9} position={[0, -0.2, 0]}>
        
        <Line points={[centerNode, topNode]} color="#00E5FF" lineWidth={2} transparent opacity={0.4} />
        <Line points={[centerNode, bottomNode]} color="#00E5FF" lineWidth={2} transparent opacity={0.4} />

        <mesh position={centerNode}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color="#000000" emissive="#00E5FF" emissiveIntensity={0.5} wireframe />
        </mesh>
        <mesh position={centerNode} scale={0.5}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={1.2} />
        </mesh>

        <mesh position={topNode}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color="#000000" emissive="#00E5FF" emissiveIntensity={0.5} wireframe />
        </mesh>
        <mesh position={topNode} scale={0.4}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#00E5FF" emissive="#ffffff" emissiveIntensity={1.5} />
        </mesh>

        <mesh position={bottomNode}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#000000" emissive="#00E5FF" emissiveIntensity={0.5} wireframe />
        </mesh>
        <mesh position={bottomNode} scale={0.4}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#00E5FF" emissive="#ffffff" emissiveIntensity={1.5} />
        </mesh>

      </group>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 h-full w-full pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={4} color="#00E5FF" />

        {/* YAHAN SE STARS HATA DIYE HAIN */}

        <BlockchainNetwork />
        
        <ContactShadows position={[0, -3.5, 0]} opacity={0.9} scale={20} blur={2.5} far={6} color="#00E5FF" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}