const testVertexShader = /* glsl */ `
// uniform mat4 modelMatrix;
// uniform mat4 projectionMatrix;
// uniform mat4 viewMatrix;

// attribute vec3 position;
// attribute float aRandom;
// attribute vec2 uv;

// varying float vRandom;
varying vec2 vuv;
varying float vElevation;

uniform vec2 uFrequency;
uniform float uTime;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

    modelPosition.z += elevation;

    // modelPosition.z += aRandom * 0.1;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    // vRandom = aRandom;
    vuv = uv;
    vElevation = elevation;
}
`
export default testVertexShader;