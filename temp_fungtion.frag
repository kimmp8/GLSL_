#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float gain(float x, float k) 
{
    float a = 0.5 * pow(2.0 * ((x<0.5) ? x:1.0-x), k);
    return (x < 0.5) ? a:1.0-a;
}
// https://www.desmos.com/calculator/roznwbiatj 그래프 참고


float Function(vec2 Coord, float func, float size){
    return step(func - size, Coord.y) - step(func + size, Coord.y);
}

void main(){
    vec2 resol = (gl_FragCoord.xy / u_resolution) * 5.0; // 0~1 범위를 0~2로 확장.
    float func = gain(resol.x, 1.3); // pow(resol.x, 2.0);
    //step(1.0, resol.x);

    // modulo :: mod(x, 0.25) 일 때, x를 0.25로 나누었을 때 나머지 값을 반환한다.
    // fract :: fract(x) 일 때, x의 소수점 부분만을 반환핟다.(mod 함수의 2번째 인자 값이 1.0 인 것과 같음)
    // ceil :: ceil(x)일 때, x의 소수점 부분을 올림해서 반환한다.
    // floor :: floor(x)일 때, x의 소수점 부분을 내림해서 반환한다.
    // sign :: sing(x)일 때, x가 양수면 +1, x가 음수면 -1, x가 0이면 0을 반환한다.
    // absolute :: abs(x)일 때, x의 절댓값을 반환한다.(음수면 양수로, 양수는 양수로)
    // clamp :: clamp(x, a, b)일 때, a보다 작으면 a값으로, b보다 크면 b값으로 반환한다. a와 b값 사이는 x값 그대로 반환한다. 최소값 a, 최댓값 b라고 보면 된다.
    // min :: min(a, x)일 때, x가 a보다 크면 a값으로, a보다 작으면 그대로 반환한다.
    // max :: max(a, x)일 때, x가 a보다 작으면 a값으로, a보다 큰 값을 반환한다.



    float size = 0.02;
    float funcCol = Function(resol, func, size);
    vec3 bgCol = vec3(func);
    bgCol = (1.0 - funcCol) * bgCol + funcCol * vec3(1.0,0.0,0.0);
    

    gl_FragColor = vec4(bgCol,1.0);

}