#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(float f){
    float y = fract(sin(f * 712.5568) * 7894.12379);
    return y;
}
float random(vec2 v2){
    float f = dot(v2, vec2(712.332, 1293.231));
    float y = fract(sin(f * 61.234) * 34634.2312);
    return y;
}


void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;
    coord.x *= u_resolution.x / u_resolution.y;
    coord *= 10.0;
    // vec3 col = vec3(fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.225));
    float fInt = floor(coord.x);
    float fPoint = coord.x - fInt; // coord.x 에서 정수값(int)을 뺀 소숫값. 이후 (input float) float random 함수에 들어갈 값
    vec2 v2Int = vec2(floor(coord)); // floor 값에 따라 좌표계 각각 (x,y) == (1~10, 1~10) 에 있는 랜덤 값으로 vec3 값이 들어감
    vec2 v2Point = coord - v2Int; // fPoint 설명과 동일, vec2값으로 적용

    vec3 col = vec3(random(v2Int));
    
    gl_FragColor = vec4(col, 1.0);
}