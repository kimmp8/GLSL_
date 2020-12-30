#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;


float circleShape(vec2 position, float radius){
    return step(radius, length(position - vec2(50.0)));
}

void main(){
    vec2 position = gl_FragCoord.xy;

    vec3 color = vec3(0.5);

    float circle = circleShape(position, 50.0);
    
    color = vec3(circle);

    gl_FragColor = vec4(color,1.0);

}