import { keyOf, last } from './utils.js';
function* pathToKeys(path) {
    let fromIdx = path[0];
    for (const toIdx of path.slice(1)) {
        const k = keyOf(fromIdx, toIdx);
        yield { key: k, from: fromIdx, to: toIdx };
        fromIdx = toIdx;
    }
}
export function computePathSegments(events, playerIdx, type) {
    var _a, _b;
    if (events.length === 0) {
        return null;
    }
    const segmentMap = {};
    let startAnim = Infinity;
    let endAnim = -Infinity;
    let total = 0;
    const bouncing = [];
    let totalMap = {};
    for (let event of events) {
        startAnim = Math.min(startAnim, event.animData.start);
        endAnim = Math.max(endAnim, event.animData.end);
        for (const { key, from, to } of pathToKeys(event.path)) {
            segmentMap[key] = (_a = segmentMap[key]) !== null && _a !== void 0 ? _a : {
                pathKeys: new Set(),
                amount: 0,
                from,
                to,
                key
            };
            const segment = segmentMap[key];
            segment.amount += event.amount;
            total += event.amount;
            for (const { key } of pathToKeys(event.path)) {
                segment.pathKeys.add(key);
            }
        }
        const hillIdx = last(event.path);
        totalMap[hillIdx] = ((_b = totalMap[hillIdx]) !== null && _b !== void 0 ? _b : 0) + event.amount;
        bouncing.push(event.path[0]);
    }
    return {
        animData: {
            start: startAnim,
            end: endAnim
        },
        segmentMap: segmentMap,
        segments: Object.values(segmentMap),
        totals: Object.entries(totalMap).map(([k, v]) => ({ cellIdx: +k, amount: v })),
        bouncing,
        type,
        playerIdx
    };
}
