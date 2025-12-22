'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { CityGrid } from './CityGrid';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

function CameraController() {
    const keysPressed = useRef<Set<string>>(new Set());
    const controlsRef = useRef<any>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            keysPressed.current.add(e.key.toLowerCase());
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            keysPressed.current.delete(e.key.toLowerCase());
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useFrame(({ camera }) => {
        if (!controlsRef.current) return;

        const speed = 0.5;
        const keys = keysPressed.current;
        const controls = controlsRef.current;

        // Get camera's forward direction
        const forward = new THREE.Vector3();
        camera.getWorldDirection(forward);
        forward.y = 0; // Project onto horizontal plane
        forward.normalize();

        // Get camera's right direction
        const right = new THREE.Vector3();
        right.crossVectors(camera.up, forward);
        right.normalize();

        // Calculate movement based on camera orientation
        const moveVector = new THREE.Vector3();

        if (keys.has('w')) moveVector.addScaledVector(forward, speed);
        if (keys.has('s')) moveVector.addScaledVector(forward, -speed);
        if (keys.has('a')) moveVector.addScaledVector(right, speed);
        if (keys.has('d')) moveVector.addScaledVector(right, -speed);

        // Move both camera and target together to maintain perspective
        if (moveVector.length() > 0) {
            camera.position.add(moveVector);
            controls.target.add(moveVector);
            controls.update();
        }
    });

    return (
        <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.05}
            minDistance={5}
            maxDistance={30}
            maxPolarAngle={Math.PI / 2.2}
            enablePan={true}
            mouseButtons={{
                LEFT: 0,   // Right-click for rotation
                MIDDLE: 1, // Middle for zoom
                RIGHT: 2   // Left-click for panning
            }}
        />
    );
}

export function Scene3D() {
    return (
        <div className="w-full h-screen">
            <Canvas
                camera={{
                    position: [18, 12, 18],
                    fov: 50,
                }}
                shadows
            >
                {/* Lighting */}
                <ambientLight intensity={0.6} />
                <directionalLight
                    position={[10, 15, 10]}
                    intensity={1.5}
                    castShadow
                    shadow-mapSize={[2048, 2048]}
                />
                <hemisphereLight intensity={0.3} groundColor="#444444" />

                {/* City Grid */}
                <CityGrid />

                {/* Camera Controls with WASD */}
                <CameraController />

                {/* Sky/Background */}
                <color attach="background" args={['#1e293b']} />
            </Canvas>
        </div>
    );
}
