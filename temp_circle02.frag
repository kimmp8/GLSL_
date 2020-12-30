#ifdef GL_ES
precision mediump float;
#endif 

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const float PI = 3.14159265359;

vec3 Mcircle(vec2 coord, float c){
    float angle = atan(coord.y, coord.x);
    angle += PI; // 0 ~ 2PI로 범위 재정의
    angle *=  2.0 * PI; // 실시간 회전
    angle /= 2.0 * PI; // 0 ~ 1 범위로 재정의
    
    float d = distance(vec2(0.0), coord * 4.0);
    float a = sin(clamp(-1.0, 4.0, (u_time * 1.0 / 4.0) - 1.0)) * 5.0;
    // u_time * 1.0 /3.0
    // abs(sin(u_time * 1.0 / 2.0))
    float b = 12.0; // 라인 갯수

    float r = a + sin(angle - b * d);
    
    d = step(d,r);
    
    return vec3(d);
}

void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;
    coord = coord * 2.0 - 1.0;
    
    
    coord.x *= u_resolution.x / u_resolution.y;

    vec3 color = vec3(Mcircle(coord, 6.3));

    gl_FragColor = vec4(color, 1.0);
}