#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 CircleA(vec2 coord, vec2 loc, float r){
    float d = distance(coord, loc);
    // d = length(coord - loc);
    d = step(d, r);
    return vec3 (d);
}

vec3 CircleB(vec2 coord){
    float a = atan(coord.y, coord.x);
    float d = distance(coord, vec2(0.0));
    float r = sin(a);
    d = step(d, r);
    return vec3(d);
}

void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;
    coord = coord * 2.0 - 1.0;
    coord.x *= u_resolution.x / u_resolution.y;


    vec3 colA = CircleA(coord, vec2(0.5), 0.3);
    vec3 colB = CircleB(coord);
    gl_FragColor = vec4(colB, 1.0); 
}