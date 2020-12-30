#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // 현재 화면의 가로, 세로 전체 해상도
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution; // 위 vec2 a 변수의 식은 0 ~ 1 사이의 값으로 균일화(normalize) 시켜준다.
// gl_FragCoord.xy : 현재 위치하는 x,y 좌표
// ex) 현재 위치하는 좌표 (x,y) = (250, 250)

    gl_FragColor = vec4(st.x,st.y,0.0,1.0);
}