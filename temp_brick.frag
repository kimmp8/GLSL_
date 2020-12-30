#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 brickTile(vec2 coord, float density){
    coord *= density;
    coord.x += step(1.0, mod(coord.y, 2.0)) * 0.5;
    return fract(coord);
}

float box(vec2 coord, vec2 size){
    vec2 sw = vec2(0.5) - size * 0.5;
    vec2 ne = vec2(0.5) + size * 0.5;
    vec2 temp = smoothstep(sw + 0.01, sw, coord)
            - smoothstep(ne, ne - 0.01, coord);
    
    return temp.x * temp.y;
}

void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;
    coord.x *= u_resolution.x / u_resolution.y;
    coord /= vec2(0.5, 0.2) / 1.5; // = 가로세로 사이즈 / 전체 사이즈
    coord = brickTile(coord, 5.0);
    vec3 color = vec3(box(coord, vec2(0.98)));
    // color = vec3(coord, 0.0); // space coordinate(공간 좌표)로 보기
    gl_FragColor = vec4(color, 1.0);
}