
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function DeviceModel(props: any) {
    const group = useRef<THREE.Group>(null);

    // Slight rotation animation
    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
        }
    });

    return (
        <group ref={group} {...props} dispose={null}>
            {/* Head - Metallic */}
            <mesh position={[0, 1.8, 0]}>
                <cylinderGeometry args={[0.8, 0.5, 0.5, 32]} />
                <meshStandardMaterial
                    color="#e0e0e0"
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            {/* Top Surface of Head - Shiny Metal */}
            <mesh position={[0, 2.06, 0]}>
                <cylinderGeometry args={[0.75, 0.75, 0.05, 32]} />
                <meshStandardMaterial
                    color="#ffffff"
                    metalness={1}
                    roughness={0.05}
                    emissive="#ffffff"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Neck - Transition */}
            <mesh position={[0, 1.4, 0]}>
                <cylinderGeometry args={[0.5, 0.6, 0.4, 32]} />
                <meshStandardMaterial color="#ffffff" roughness={0.2} />
            </mesh>

            {/* Handle - Main Body */}
            <mesh position={[0, 0.2, 0]}>
                <cylinderGeometry args={[0.6, 0.5, 2.2, 32]} />
                <meshStandardMaterial color="#ffffff" roughness={0.2} />
            </mesh>

            {/* Bottom Cap */}
            <mesh position={[0, -1.0, 0]} rotation={[Math.PI, 0, 0]}>
                <sphereGeometry args={[0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
                <meshStandardMaterial color="#ffffff" roughness={0.2} />
            </mesh>

            {/* Control Panel Area - Darker Gray */}
            <mesh position={[0, 0.5, 0.55]} rotation={[0.1, 0, 0]}>
                <boxGeometry args={[0.5, 1.2, 0.05]} />
                <meshStandardMaterial color="#f5f5f5" roughness={0.4} />
            </mesh>

            {/* Buttons */}
            <mesh position={[0, 0.8, 0.6]} rotation={[Math.PI / 2 + 0.1, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
                <meshStandardMaterial color="#ff9500" emissive="#ff9500" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0, 0.5, 0.59]} rotation={[Math.PI / 2 + 0.1, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
                <meshStandardMaterial color="#ff9500" emissive="#ff9500" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0, 0.2, 0.58]} rotation={[Math.PI / 2 + 0.1, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
                <meshStandardMaterial color="#ff9500" emissive="#ff9500" emissiveIntensity={0.5} />
            </mesh>

            {/* LED Indicators */}
            <mesh position={[0, -0.2, 0.57]} rotation={[0.1, 0, 0]}>
                <planeGeometry args={[0.4, 0.1]} />
                <meshBasicMaterial color="#3b82f6" />
            </mesh>

        </group>
    );
}

export function HeroVisual() {
    return (
        <div className="h-[400px] w-full lg:h-[600px]">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -5, -10]} color="#3b82f6" intensity={2} />

                <PresentationControls
                    global
                    rotation={[0, 0.3, 0]}
                    polar={[-Math.PI / 3, Math.PI / 3]}
                    azimuth={[-Math.PI / 1.4, Math.PI / 2]}
                >
                    <Float rotationIntensity={0.4} floatIntensity={1} speed={1.5}>
                        <DeviceModel scale={1.2} />
                    </Float>
                </PresentationControls>

                <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#000000" />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
