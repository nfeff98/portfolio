uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;

// Simplex noise helpers
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                      -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                   + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                           dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float t = uTime * 0.18;

  // Layered noise for organic nebula feel
  float n1 = snoise(uv * 2.5 + vec2(t * 0.3, t * 0.2));
  float n2 = snoise(uv * 5.0 - vec2(t * 0.15, t * 0.4));
  float n3 = snoise(uv * 10.0 + vec2(t * 0.5, -t * 0.3));

  float noise = n1 * 0.55 + n2 * 0.30 + n3 * 0.15;

  // Deep space base — near-black dark blue
  vec3 bg     = vec3(0.028, 0.028, 0.055);
  // Violet nebula vein
  vec3 violet = vec3(0.30, 0.20, 0.80);
  // Magenta highlight
  vec3 magenta = vec3(0.60, 0.10, 0.70);
  // Subtle teal accent
  vec3 teal    = vec3(0.05, 0.30, 0.55);

  float t1 = smoothstep(-0.3, 0.5, noise);
  float t2 = smoothstep(0.1, 0.9, noise + 0.2);

  vec3 col = mix(bg, teal, t1 * 0.25);
  col      = mix(col, violet, t1 * 0.55);
  col      = mix(col, magenta, t2 * 0.30);

  // Vignette
  vec2 vigUv = vUv * 2.0 - 1.0;
  float vig = 1.0 - dot(vigUv * 0.6, vigUv * 0.6);
  col *= clamp(vig, 0.0, 1.0) * 0.6 + 0.4;

  // Stars: high-frequency noise threshold
  float starNoise = snoise(uv * 180.0 + vec2(42.3, 17.8));
  float star = smoothstep(0.985, 1.0, starNoise);
  col += star * 0.9 * vec3(0.9, 0.85, 1.0);

  gl_FragColor = vec4(col, 1.0);
}
