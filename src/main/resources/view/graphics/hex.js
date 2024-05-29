import { TILE_HEIGHT } from './assetConstants.js';
const TILE_SEPERATION = 20;
export const HEXAGON_HEIGHT = TILE_HEIGHT + TILE_SEPERATION;
export const HEXAGON_RADIUS = HEXAGON_HEIGHT / 2;
export const HEXAGON_WIDTH = HEXAGON_RADIUS * Math.sqrt(3);
export const HEXAGON_Y_SEP = HEXAGON_RADIUS * 3 / 2;
export function hexToScreen(q, r) {
    const x = HEXAGON_RADIUS * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r);
    const y = HEXAGON_RADIUS * 3 / 2 * r;
    return { x, y };
}
/**
 * https://www.redblobgames.com/grids/hexagons/#pixel-to-hex
 */
export function screenToHex(point) {
    const q = (Math.sqrt(3) / 3 * point.x - 1.0 / 3 * point.y) / HEXAGON_RADIUS;
    const r = (2.0 / 3 * point.y) / HEXAGON_RADIUS;
    return axialRound({ q, r });
}
function axialRound(hex) {
    return cubeToAxial(cubeRound(axialToCube(hex)));
}
function axialToCube(hex) {
    const q = hex.q;
    const r = hex.r;
    const s = -q - r;
    return { q, r, s };
}
function cubeToAxial(cube) {
    const q = cube.q;
    const r = cube.r;
    return { q, r };
}
function cubeRound(frac) {
    let q = Math.round(frac.q);
    let r = Math.round(frac.r);
    let s = Math.round(frac.s);
    const qDiff = Math.abs(q - frac.q);
    const rDiff = Math.abs(r - frac.r);
    const sDiff = Math.abs(s - frac.s);
    if (qDiff > rDiff && qDiff > sDiff) {
        q = -r - s;
    }
    else if (rDiff > sDiff) {
        r = -q - s;
    }
    else {
        s = -q - r;
    }
    return { q, r, s };
}
