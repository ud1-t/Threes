#define PI 3.1415926535897932384626433832795

varying vec2 vuv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.543123);
}

vec2 rotate(vec2 uv, float rotation, vec2 mid) {
    return vec2(
        cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
        cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

vec2 fade(vec2 t) {
    return t*t*t* (t * (t * 6.0 - 15.0) + 10.0);
}

vec4 permute(vec4 x) {
    return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float cnoise(vec2 P){
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 * 
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

void main()
{
    // // BWx pattern
    // float strength = vuv.x;

    // // BWy pattern
    // float strength = vuv.y;

    // // -BWy pattern
    // float strength = 1.0 - vuv.y;

    // // xBWy pattern
    // float strength = vuv.y * 10.0;

    // // xxxBWy pattern
    // float strength = mod(vuv.y * 10.0, 1.0);

    // // x+BWy pattern
    // float barY = step(0.8, mod(vuv.x * 10.0, 1.0));
    // barY *= step(0.4, mod(vuv.y * 10.0, 1.0));

    // float barX = step(0.4, mod(vuv.x * 10.0, 1.0));
    // barX *= step(0.8, mod(vuv.y * 10.0, 1.0));

    // float strength = barX + barY;

    // // x+BWy pattern
    // float barX = step(0.4, mod(vuv.x * 10.0, 1.0));
    // barX *= step(0.8, mod(vuv.y * 10.0 + 0.2, 1.0));

    // float barY = step(0.8, mod(vuv.x * 10.0 + 0.2, 1.0));
    // barY *= step(0.4, mod(vuv.y * 10.0, 1.0));

    // float strength = barX + barY;

    // float strength1 = step(0.2, max(abs(vuv.x - 0.5), abs(vuv.y - 0.5)));
    // float strength2 = 1.0 - step(0.25, max(abs(vuv.x - 0.5), abs(vuv.y - 0.5)));
    
    // float strength = strength1 * strength2;

    // vec2 lightUVx = vec2(vuv.x * 0.1 + 0.45, vuv.y * 0.5 + 0.25);
    // float strengthX = 0.015 / distance(lightUVx, vec2(0.5));

    // vec2 lightUVy = vec2(vuv.y * 0.1 + 0.45, vuv.x * 0.5 + 0.25);
    // float strengthY = 0.015 / distance(lightUVy, vec2(0.5));

    // float strength = strengthX * strengthY;

    // float pi = 3.1415926535897932384626433832795;
    // vec2 rotatedUV = rotate(vuv, PI * 0.25, vec2(0.5));

    // vec2 lightUVx = vec2(rotatedUV.x * 0.1 + 0.45, rotatedUV.y * 0.5 + 0.25);
    // float strengthX = 0.015 / distance(lightUVx, vec2(0.5));

    // vec2 lightUVy = vec2(rotatedUV.y * 0.1 + 0.45, rotatedUV.x * 0.5 + 0.25);
    // float strengthY = 0.015 / distance(lightUVy, vec2(0.5));

    // float strength = strengthX * strengthY;

    // vec2 wavedUV = vec2(
    //     vuv.x + sin(vuv.y * 100.0) * 0.1,
    //     vuv.y + sin(vuv.x * 100.0) * 0.1
    // );
    // float strength = 1.0 - step(0.01, abs(distance(wavedUV, vec2(0.5)) - 0.25));

    // float angle = atan(vuv.x - 0.5, vuv.y - 0.5);
    // angle /=  PI * 2.0;
    // angle += 0.5;
    // float strength = sin(angle * 100.0);


    // float angle = atan(vuv.x - 0.5, vuv.y - 0.5);
    // angle /=  PI * 2.0;
    // angle += 0.5;
    // float sinusoid = sin(angle * 100.0);

    // float radius = 0.25 + sinusoid * 0.02;
    // float strength = 1.0 - step(0.01, abs(distance(vuv, vec2(0.5)) - radius));

    float strength = step(0.9, sin(cnoise(vuv * 10.0) * 20.0));

    // Clamp the strength
    strength = clamp(strength, 0.0, 1.0);

    // Colour
    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vuv, 0.5);
    vec3 mixedColor = mix(blackColor, uvColor, strength);
    gl_FragColor = vec4(mixedColor, 1.0);



    // BW
    // gl_FragColor = vec4(strength, strength, strength, 1.0);
}