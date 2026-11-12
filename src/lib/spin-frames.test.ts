import { describe, expect, it } from "vitest";
import { spinState } from "./spin-frames";

const angles = [0, 22, 33, 90, 180, 300];

describe("merchandise 360° spinner", () => {
  it("shows the photo whose real angle was reached last", () => {
    expect(spinState(21.9, angles, 6).i).toBe(0);
    expect(spinState(22, angles, 6).i).toBe(1);
    expect(spinState(179, angles, 6).i).toBe(3);
  });

  it("wraps from the last angle back to the front", () => {
    expect(spinState(359, angles, 6).i).toBe(5);
    expect(spinState(360, angles, 6).i).toBe(0);
    expect(spinState(-1, angles, 6).i).toBe(5);
  });

  it("tilts in the turn direction and never more than the limit", () => {
    const start = spinState(90, angles, 6);
    const end = spinState(179.99, angles, 6);
    expect(start.rot).toBeCloseTo(6, 2);
    expect(end.rot).toBeCloseTo(-6, 1);
  });

  it("keeps the tilt small across a small angle gap", () => {
    expect(spinState(22, angles, 6).rot).toBeCloseTo(11 * 0.25, 2);
  });
});
