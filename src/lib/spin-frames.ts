// Pure math for the 360° photo spinner on the merchandise page.
// The vest photos are not evenly spaced, so every kept photo carries its real
// viewing angle (degrees, 0 = front, increasing in turn direction). The spinner
// advances a continuous angle at constant speed and shows the photo whose angle
// was reached last; while it is shown the photo tilts slightly in the turn
// direction, then the next photo takes over. Only one photo is ever visible.

export type SpinState = {
  /** Position in the angle list of the photo to show. */
  i: number;
  /** Tilt of that photo in degrees (CSS rotateY). */
  rot: number;
};

export function spinState(deg: number, angles: number[], maxSwing: number): SpinState {
  const d = ((deg % 360) + 360) % 360;
  let i = 0;
  for (let k = 0; k < angles.length; k++) if ((angles[k] as number) <= d) i = k;
  const from = angles[i] as number;
  const to = i + 1 < angles.length ? (angles[i + 1] as number) : 360 + (angles[0] as number);
  const gap = Math.max(1e-6, to - from);
  const f = Math.min(1, Math.max(0, (d - from) / gap));
  const amp = Math.min(maxSwing, gap * 0.25);
  return { i, rot: amp * (1 - 2 * f) };
}
