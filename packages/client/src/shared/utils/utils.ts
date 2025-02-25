export function randomChoiceFromArray<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function lerp(a: number, b: number, t: number): number {
    return a * (1 - t) + b * t;
}

export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

export function randomFromRange(min: number, max: number): number {
    return lerp(min, max, Math.random());
}
