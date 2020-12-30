#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// smoothstep(float a, float b, float x)
// x의 값이 a 보다 작으면 0, b보다 크면 1을 리턴
// a ~ b 사이에서는 x값에 대해 보간이 일어난다.

float plot(vec2 st, float pct, float P){
    return smoothstep(pct - P, pct, st.y) - smoothstep(pct, pct + P, st.y);
}
// P = 0.1, st.y = 0.5 이고 pct가 0.3이라고 가정할 때, smoothstep(0.3 - 0.1, 0.3, 0.5) - smoothstep(0.3, 0.3 + 0.1, 0.5)
// A :smoothstep(0.2, 0.3, 0.5) => 0.5는 0.3보다 크므로 1을 리턴
// B : smoothstep(0.3, 0.4, 0.5) => 0.5는 0.4보다 크므로 1을 리턴
// A - B는 0이 나온다.

float noise1d(float v){
    return cos(v + cos(v * 90.1415) * 100.1415) * 0.5 + 0.5;
}

void main(){
    vec2 a = gl_FragCoord.xy / u_resolution;
    // 위 vec2 a 변수의 식은 0 ~ 1 사이의 값으로 균일화(normalize) 시켜준다.
    float time = u_time/1200.0;
    float k = 
    smoothstep(a.x, 1.0, 0.5);
    // (noise1d(time) + noise1d(time / 0.5) * 0.5 + noise1d(time / 0.25) * 0.25 + noise1d(time / 0.125) * 0.125 + noise1d(time / 0.063) * 0.063);
    // sqrt(1.0 - mod(u_time,10.0) * a.x);
    // pow(cos(3.14159265359 * a.x / 2.0), 0.5);//pow(a.x,5.0);
    vec3 color = vec3(k);
    float P = 0.02;
    float pct = plot(a,k,P);
    color = (1.0-pct) * color + pct * vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}