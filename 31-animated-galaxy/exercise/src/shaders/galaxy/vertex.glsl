uniform float uSize;
uniform float uTime;

attribute float aScale;

varying vec3 vColor;

void main()
{
    
    // Position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Spin
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz);
    float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
    angle += angleOffset;
    modelPosition.x = distanceToCenter * cos(angle);
    modelPosition.z = distanceToCenter * sin(angle);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition * 5.0;
    gl_Position = projectedPosition;

    // Size
    gl_PointSize = uSize * aScale;
    gl_PointSize *= (1.0 / - viewPosition.z);

    vColor = color;
}