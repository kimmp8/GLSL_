#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const float PI = 3.14159265359;

void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;
    coord.x *= u_resolution.x / u_resolution.y;
    coord = coord * 2.0 - 1.0;
    int N = 3;

    float angle = atan(coord.x, coord.y) + PI;
    float r = (2.0 * PI) / float(N);
    // float d = floor(0.5 + angle / r) * r - angle;
    float d = cos(floor(0.5 + angle / r) * r - angle) * length(coord);
    

    vec3 color = vec3(1.0-smoothstep(0.4, 0.41, d));
    // vec3 color = vec3(d);


    gl_FragColor = vec4(color, 1.0);

}