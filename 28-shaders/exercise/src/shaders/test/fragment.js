const testFragmentShader = /* glsl */ `
// precision mediump float;

uniform vec3 uColor;
uniform sampler2D uTexture;

// varying float vRandom;
varying vec2 vuv;
varying float vElevation;

void main()
{
    vec4 textureColor = texture2D(uTexture, vuv);
    textureColor *= vElevation * 2.0 + 0.5;
    gl_FragColor = textureColor;
}
`
export default testFragmentShader;