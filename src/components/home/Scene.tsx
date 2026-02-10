"use client";

import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Stage, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { OBJLoader } from "three-stdlib";
import { MTLLoader } from "three-stdlib";
import { TextureLoader } from "three";
import * as THREE from "three";

function Model() {
    const materials = useLoader(MTLLoader, "/models/corona/Corona.mtl");
    const obj = useLoader(OBJLoader, "/models/corona/Corona.obj", (loader) => {
        materials.preload();
        loader.setMaterials(materials);
    });

    // Load texture separately if needed, but MTL should handle it if paths are correct.
    // The user provided BotellaText.jpg. Often MTL files reference textures relatively.
    // We might need to manually apply the texture if the MTL path is wrong or weird.
    // Let's try loading the OBJ+MTL directly first. If texture is missing, we can force it.

    const texture = useLoader(TextureLoader, "/models/corona/BotellaText.jpg");

    // Traverse the object to apply texture if not automatically picked up or to improve material
    obj.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (Array.isArray(mesh.material)) {
                mesh.material.forEach((m) => {
                    (m as THREE.MeshStandardMaterial).map = texture;
                    (m as THREE.MeshStandardMaterial).needsUpdate = true;
                });
            } else {
                (mesh.material as THREE.MeshStandardMaterial).map = texture;
                (mesh.material as THREE.MeshStandardMaterial).needsUpdate = true;
            }
        }
    });

    const ref = useRef<THREE.Group>(null);

    // Auto-rotate
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.2;
        }
    });

    return <primitive object={obj} ref={ref} scale={0.8} />;
}

export function Scene() {
    return (
        <div style={{ width: "100%", height: "100%", minHeight: "500px" }}>
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 150], fov: 50 }}>
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.6}>
                        <Model />
                    </Stage>
                </Suspense>
                <OrbitControls autoRotate enableZoom={false} />
            </Canvas>
        </div>
    );
}
