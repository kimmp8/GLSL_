#ifdef GL_ES
precision mediump float;
#endif

const float PI = 3.1415926535;

uniform vec2 u_resolution;

float polygonShape(vec2 position, float radius, float sides){
    position = position * 2.0 - 1.0;
    // 0 ~ 1 좌표 위치를 -1 ~ + 1 좌표 위치로 변경
    // 원래는 왼쪽 아래에 (x,y) = (0,0) 좌표였음.

    float angle = atan(position.x, position.y);
    // atan 은 역탄젠트로서 x축이 -무한 ~ +무한 일 때, y축은 탄젠트 그래프로 -PI/2 ~ +PI/2 사이에서 각각 무한으로 수렴한다.
    // https://kr.mathworks.com/help/matlab/ref/graphofinversetangentfunctionexample_01_ko_KR.png

    float slice = PI * 2.0 / sides;
    // 곱하기 2 하는 이유는 (atan에서 나눠지는 /2 부분) -PI/2 ~ +PI/2 에 대해 상응하기 위해 곱해졌다.


    return step(radius, cos(floor(0.5 + angle / slice) * slice - angle) * length(position));
}


void main(){
    vec2 position = gl_FragCoord.xy / u_resolution;

    vec3 color = vec3(0.0);

    float polygon = polygonShape(position, 0.6, 6.0);

    color = vec3(polygon);

    gl_FragColor = vec4(color, 1.0);

}