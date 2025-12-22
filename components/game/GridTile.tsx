'use client';

import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { useEffect } from 'react';

interface GridTileProps extends GroupProps {
    position: [number, number, number];
}

export function GridTile({ position, ...props }: GridTileProps) {
    const { scene, materials } = useGLTF('/models/road-straight.glb');

    // Log to debug
    useEffect(() => {
        console.log('Scene:', scene);
        console.log('Materials:', materials);
    }, [scene, materials]);

    return (
        <group position={position} {...props}>
            <primitive
                object={scene.clone()}
                scale={1.5}
            />
        </group>
    );
}

// Preload the model
useGLTF.preload('/models/road-straight.glb');
