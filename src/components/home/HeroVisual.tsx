
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, PresentationControls, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function DeviceModel(props: any) {
    const group = useRef<THREE.Group>(null);

    // Subtle floating rotation
    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
            group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.05;
        }
    });

    // Materials
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: "#ffffff",
        roughness: 0.3,
        metalness: 0.1,
    });

    const metalAccent = new THREE.MeshStandardMaterial({
        color: "#e0e0e0",
        roughness: 0.1,
        metalness: 0.8,
    });

    const screenMaterial = new THREE.MeshPhysicalMaterial({
        color: "#000000",
        roughness: 0.0,
        metalness: 0.5,
        transmission: 0,
        clearcoat: 1,
    });

    return (
        <group ref={group} {...props} dispose={null}>
            {/* HEAD SECTION */}
            <group position={[0, 1.6, 0]}>
                {/* Main Head Mass */}
                <mesh material={bodyMaterial}>
                    <cylinderGeometry args={[0.85, 0.6, 0.8, 64]} />
                </mesh>

                {/* Metal Contact Surface (The Face) */}
                <mesh position={[0, 0.41, 0]} material={metalAccent}>
                    <cylinderGeometry args={[0.8, 0.8, 0.05, 64]} />
                </mesh>

                {/* Glowing Ring */}
                <mesh position={[0, 0.35, 0]}>
                    <torusGeometry args={[0.86, 0.02, 16, 100]} />
                    <meshBasicMaterial color="#3b82f6" toneMapped={false} />
                </mesh>
            </group>

            {/* NECK TRANSITION */}
            <mesh position={[0, 1.1, 0]} material={bodyMaterial}>
                <cylinderGeometry args={[0.6, 0.5, 0.6, 64]} />
            </mesh>

            {/* CHROME COLLAR */}
            <mesh position={[0, 0.85, 0]} material={metalAccent}>
                <torusGeometry args={[0.52, 0.05, 16, 64]} />
            </mesh>

            {/* HANDLE BODY - Ergonomic Shape using stacked cylinders for curve */}
            <group position={[0, -0.5, 0]}>
                {/* Upper Handle */}
                <mesh position={[0, 0.8, 0]} material={bodyMaterial}>
                    <cylinderGeometry args={[0.5, 0.45, 1.2, 64]} />
                </mesh>

                {/* Lower Handle */}
                <mesh position={[0, -0.4, 0]} material={bodyMaterial}>
                    <cylinderGeometry args={[0.45, 0.4, 1.4, 64]} />
                </mesh>

                {/* Bottom Cap */}
                <mesh position={[0, -1.1, 0]} material={metalAccent}>
                    <cylinderGeometry args={[0.4, 0.3, 0.1, 64]} />
                </mesh>
            </group>

            {/* CONTROL INTERFACE */}
            <group position={[0, 0.2, 0.48]} rotation={[0.1, 0, 0]}>
                {/* Screen / Panel */}
                <RoundedBox args={[0.6, 1.0, 0.05]} radius={0.05} smoothness={4}>
                    <primitive object={screenMaterial} attach="material" />
                </RoundedBox>

                {/* Interface Elements (Mocked) */}
                <mesh position={[0, 0.2, 0.03]}>
                    <planeGeometry args={[0.4, 0.3]} />
                    <meshBasicMaterial color="#1a1a1a" />
                </mesh>

                {/* Buttons */}
                <mesh position={[0, -0.2, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.08, 0.08, 0.05, 32]} />
                    <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
                </mesh>
            </group>
        </group>
    );
}

export function HeroVisual() {
    return (
        <div className="h-[400px] w-full lg:h-[600px] cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 5.5], fov: 40 }} dpr={[1, 2]}>
                <ambientLight intensity={1.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, 0, -10]} color="#3b82f6" intensity={2} />

                {/* Rim Light for definition */}
                <spotLight position={[0, 5, -5]} intensity={2} color="#ffffff" />

                <PresentationControls
                    global
                    rotation={[0, 0.3, 0]}
                    polar={[-Math.PI / 6, Math.PI / 6]} // Limit vertical rotation
                    azimuth={[-Math.PI / 2, Math.PI / 2]}
                >
                    <Float rotationIntensity={0.2} floatIntensity={0.5} speed={2}>
                        <DeviceModel scale={1.3} />
                    </Float>
                </PresentationControls>

                <ContactShadows position={[0, -2.4, 0]} opacity={0.5} scale={10} blur={2} far={4} />
                <Environment preset="studio" />
            </Canvas>
        </div>
    );
}
