#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
const float PI = 3.14159265359;


// step(float a, float x) 일 때, x의 값이 a보다 작으면 0, a보다 크면 1

float plot(float a, vec2 b, float p){
    return step(a - p, b.y) - step(a + p, b.y);
}
float timeStep(float channelCount, float channelSwitch, float timeStretch){
    float timeStretchSet = 1.0 / timeStretch;
    float FrA = (u_time - ((channelSwitch - 1.0) * timeStretch)) / channelCount;
    float FrB = (u_time - channelSwitch * timeStretch) / channelCount;
    return floor(FrA * timeStretchSet) - floor(FrB * timeStretchSet);
}
// https://www.desmos.com/calculator/apfytwptnh 참고


void main(){
    vec2 FragResol = gl_FragCoord.xy / u_resolution;
    float k = pow(FragResol.x,12.0);

    float a = FragResol.x;
    float b = FragResol.y;
    vec3 colA = vec3(a);
    vec3 colB = vec3(b);
    vec3 colTotal = (vec3(1.0) - colA) * (vec3(1.0) - colB);

    float Linespeed = 3.0;

    float LineSize = abs(tan(u_time * (PI / Linespeed)))*0.05;
    
    // abs(tan(u_time)) 그래프는 시간에 따라 움직이는 J자형 곡선과 같다.
    // abs() 함수가 들어갔으므로  음수는 양수로 반전된다.
    
    vec3 timeCol = vec3(timeStep(3.0, 1.0, Linespeed), timeStep(3.0, 2.0, Linespeed), timeStep(3.0, 3.0, Linespeed));
    
    float s = plot(k,FragResol, LineSize);
    // FragResol.y의 값이 k +- LineSize 보다 크거나 작으면 0, k +- LineSize 만큼 범위는 1이다.
    // 이 때, k = pow(fragResol.x, 5.0)
    vec3 color = (1.0 - s) * colTotal + s * timeCol;
    gl_FragColor = vec4(color, 1.0);
}