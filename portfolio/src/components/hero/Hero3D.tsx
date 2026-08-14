"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Float, Line } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function BlockchainNetwork() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    // Rotation speed thodi slow ki hai taaki CPU ko aaram mile
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.05;
    }
  });

  const centerNode = [0, 0, 0] as [number, number, number];
  const topNode = [1.8, 1.5, 0.5] as [number, number, number];
  const bottomNode = [-1.8, -1.5, -0.5] as [number, number, number];

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.5}>
      <group ref={groupRef} scale={1} position={[0, 0, 0]}>
        
        <Line points={[centerNode, topNode]} color="#00E5FF" lineWidth={1.5} transparent opacity={0.3} />
        <Line points={[centerNode, bottomNode]} color="#00E5FF" lineWidth={1.5} transparent opacity={0.3} />

        <mesh position={centerNode}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color="#000000" emissive="#00E5FF" emissiveIntensity={0.4} wireframe />
        </mesh>
        <mesh position={centerNode} scale={0.5}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={1} />
        </mesh>

        <mesh position={topNode}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color="#000000" emissive="#00E5FF" emissiveIntensity={0.4} wireframe />
        </mesh>
        <mesh position={topNode} scale={0.4}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#00E5FF" emissive="#ffffff" emissiveIntensity={1.2} />
        </mesh>

        <mesh position={bottomNode}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#000000" emissive="#00E5FF" emissiveIntensity={0.4} wireframe />
        </mesh>
        <mesh position={bottomNode} scale={0.4}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#00E5FF" emissive="#ffffff" emissiveIntensity={1.2} />
        </mesh>

      </group>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 h-full w-full pointer-events-none z-0 scale-[0.85] md:scale-100 flex items-center justify-center origin-center">
      {/* 🔥 MAGIC HERE: dpr={1} completely stops heating on high-end devices by forcing 1x rendering */}
      <Canvas camera={{ position: [0, 0, 9], fov: 45 }} dpr={1} gl={{ antialias: false, powerPreference: "high-performance" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={3} color="#00E5FF" />

        <BlockchainNetwork />
        
        {/* 🔥 Shadow calculation baked to 1 frame. Never recalculates! */}
        <ContactShadows position={[0, -3.5, 0]} opacity={0.6} scale={20} blur={2} far={6} color="#00E5FF" frames={1} resolution={256} />
      </Canvas>
    </div>
  );
}