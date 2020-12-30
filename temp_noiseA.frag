#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(float f){
    return fract(sin(f * 142.321) * 4e4);
}
float random(vec2 v2){
    float f = dot(v2, vec2(321.432,451.524));
    return fract(sin(f * 432.531) * 778.472);
}

float randomSerie(float x, float freq, float t){
    return step(0.8, random( floor(x * freq) - floor(t) ));
}

void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;
    coord.x *= u_resolution.x / u_resolution.y;
    // coord *= 10.0;
    // coord = coord * 2.0 - 1.0;
    
    float cols = 2.0;
    float freq = random(floor(u_time)) + abs(atan(u_time) * 0.1);
    // abs(atan(u_time) * 0.1) :: 1보다 크면 밑에 있는 float t 변수 식상의 (1.0 - freq) 부분에서 값이 음수로 내려가므로 움직이는 방향이 바뀌게된다.
    // random(floor(u_time)) :: 밑의 t 변수 식이 없으면 랜덤한 타이밍에 멈춰있는 것처럼 보인다.
    float t = 60.0 + u_time * (1.0 - freq) * 30.0;
    // 일정한 속도로 움직이게 하는데 필요한 변수 식

    if (fract(coord.y * cols * 0.5) < 0.5){
        t *= -1.0; // coord.y == 0.5 를 기준으로 화면 분할
    }

    freq += random(floor(coord.y));

    float offset = 0.025;
    // vec3 col = vec3(randomSerie(coord.x, freq*100))
    vec3 col = vec3(randomSerie(coord.x, freq * 100.0, t - offset),
                    randomSerie(coord.x, freq * 100.0, t),
                    randomSerie(coord.x, freq * 100.0, t + offset));
    //R,G,B 각각에 randomSerie 함수를 호출하되, (t 변수에) offset 만큼의 시간차 사이에 cyan, pink가 미묘하게 보이도록 함.
    gl_FragColor = vec4(col, 1.0);

}