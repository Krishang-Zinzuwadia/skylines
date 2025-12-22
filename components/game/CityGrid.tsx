'use client';

import { GridTile } from './GridTile';

export function CityGrid() {
    const GRID_SIZE = 15;
    const BLOCK_SIZE = 5; // Number of building spaces between roads
    const TILE_SIZE = 1.5; // Actual size of each road tile model
    const SPACING = (BLOCK_SIZE + 1) * TILE_SIZE; // Total spacing between intersections

    const tiles = [];

    // Main intersection tiles (corners)
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const x = (i - Math.floor(GRID_SIZE / 2)) * SPACING;
            const z = (j - Math.floor(GRID_SIZE / 2)) * SPACING;

            tiles.push(
                <GridTile
                    key={`corner-${i}-${j}`}
                    position={[x, 0, z]}
                />
            );
        }
    }

    // Horizontal roads (connecting intersections horizontally)
    for (let i = 0; i < GRID_SIZE - 1; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const baseX = (i - Math.floor(GRID_SIZE / 2)) * SPACING;
            const z = (j - Math.floor(GRID_SIZE / 2)) * SPACING;

            // Add road tiles to connect intersections
            for (let r = 1; r <= BLOCK_SIZE; r++) {
                tiles.push(
                    <GridTile
                        key={`h-${i}-${j}-${r}`}
                        position={[baseX + r * TILE_SIZE, 0, z]}
                    />
                );
            }
        }
    }

    // Vertical roads (connecting intersections vertically)
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE - 1; j++) {
            const x = (i - Math.floor(GRID_SIZE / 2)) * SPACING;
            const baseZ = (j - Math.floor(GRID_SIZE / 2)) * SPACING;

            // Add road tiles to connect intersections
            for (let r = 1; r <= BLOCK_SIZE; r++) {
                tiles.push(
                    <GridTile
                        key={`v-${i}-${j}-${r}`}
                        position={[x, 0, baseZ + r * TILE_SIZE]}
                    />
                );
            }
        }
    }

    return <>{tiles}</>;
}
