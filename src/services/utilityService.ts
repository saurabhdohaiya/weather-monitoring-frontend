import { DIRECTIONS } from "../constants/constant";

export function degreeToDirection(degree: number) {
    const index = Math.floor((degree % 360) / 22.5);
    return DIRECTIONS[index];
}

export function convertToCelsius(kelvin: number): number {
    return parseFloat((kelvin - 273.15).toFixed(1));
}

export function convertToFahrenheit(kelvin: number): number {
    return parseFloat(((kelvin - 273.15) * 9/5 + 32).toFixed(1));
}

