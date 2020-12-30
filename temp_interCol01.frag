
#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const float PI = 3.14159265359;

float rect(in vec2 st, in vec2 size){
    size.x = (max(0.0, sin(u_time * PI)) * 0.875 + 0.125) * size.x;
    size.y = (max(0.0, sin(u_time * PI + PI)) * 0.875 + 0.125) * size.y;
    size = 0.25 - size * 0.25;
    // size = size; 와 같이 두면, size 값이 클수록 화면 상하좌우 끝에서부터 가운데로 사각형 사이즈가 작아진다.
    // 사각형이 그려지는 원리는 화면에 어느 정도로 (사각형 모양인 상태로) 화면에 색상을 채우느냐에 달려있다.
    // 위 식에서는 size 값이 1.0 보다 크면 음수가 되기 때문에 사각형이 사라진다.
    // size * 0.25 부분을 뺌으로 인해 (원래 size 값이 클 수록 사각형이 작아지는 것과 반대로) 값이 클 수록 사각형이 커진다. 
    
    vec2 uv = smoothstep(size, size + size * vec2(0.002), st * (1.0 - st));
    return uv.x * uv.y;
}

vec3 rectN(vec2 coord, vec2 loc, vec2 size){
    vec2 sw = loc - size/2.0;
    vec2 ne = loc + size/2.0;
    vec2 shape = step(sw, coord);
    shape -= step(ne, coord);
    return vec3(shape.x * shape.y);
}

vec2 swinger(vec2 speed, vec2 range){
    return vec2(sin(u_time * PI * speed) * abs(range));
}
vec3 pressedImage(vec3 color){

    float Y = (0.257 * color.r) + (0.504 * color.g) + (0.098 * color.b) + 16.0;
    float U = -(0.148 * color.r) - (0.291 * color.g) + (0.439 * color.b) + 128.0;
    float V = (0.439 * color.r) - (0.368 * color.g) - (0.071 * color.b) + 128.0;
    
    // YUV(YCbCr) 모델을 RGB 모델로 변환
    float R = 1.164 * (Y - 16.0) + 1.596 * (V - 128.0);
    float G = 1.164 * (Y - 16.0) - 0.813*(V-128.0) - 0.391 * (U - 128.0);
    float B = 1.164 * (Y - 16.0) + 2.018*(U-128.0);
    return vec3(R,G,B);
}

void main(){
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;
    vec2 coord = st * 2.0 - 1.0;
    float angle = atan(coord.y, coord.x);
    angle += PI * PI * u_time;
    angle /= 2.0 * PI;
    angle *= 1.0;


    vec3 infed_color = vec3(0.0, 1.0, 0.0);
    
    vec3 infing_colorA = vec3(0.0, 0.0667, 1.0);
    vec3 infing_colorB = vec3(0.9804, 0.1373, 0.1098);

    vec3 color = mix(infing_colorA, infing_colorB, atan(tan(angle), tan(angle))); // 원래 맨뒤의 함수식은 step(0.5, st.x)

    color = mix(color, infed_color, rect(abs((st-vec2(0.5, 0.0))*vec2(2.0,1.0)), vec2(0.05,0.125)));
    //위 식의 abs 함수는 rect 함수 내의 smoothstep의 범위 외(미만, 초과로 인해)에 있어
    // 무시됐던 부분(음수가 된 부분)을 양수(절댓값)으로 돌려 마치 사각형이 2개인 모양으로 표현했다.

    color = mix(color, infed_color, rectN(coord, swinger(vec2(1.0,1.5), vec2(0.6)), vec2(0.4,0.1)));

     // YUV 이미지 압축 후 RGB로 재변환 반복
    for(int n = 0; n < 10; n++){
        color = pressedImage(color);
    }

    gl_FragColor = vec4(color, 1.0);
    // gl_FragColor = vec4(R,G,B, 1.0);
    
}