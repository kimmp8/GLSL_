#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
vec3 rgb2hsb( in vec3 c ){
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    // 0, -1/3 , 2/3 , -1
    vec4 p = mix(vec4(c.bg, K.wz),
                 vec4(c.gb, K.xy),
                 step(c.b, c.g));
    // BS, SB, B / S
    vec4 q = mix(vec4(p.xyw, c.r),
                 vec4(c.r, p.yzx),
                 step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)),
                d / (q.x + e),
                q.x);
}
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    // rgb 색상을 구하는 식. 그래프로 그려보면 실제와 동일하게 나온다.
    // https://www.desmos.com/calculator/kzwxzeqziw
   
    rgb = rgb*rgb*(3.0-2.0*rgb);
    // 위의 rgb를 구한 식에서 3번을 제곱하여 색상간 경계를 잡는다. 마지막 제곱은 2제곱 했을 때의 뾰족한 경계 부분을 잡는다.
    // https://www.desmos.com/calculator/v6bg8nu3qh

    // 단순히 rgb * rgb (rgb^2) 를 하면 색상간 보간이 뾰족하게 나타난다.
    // https://www.desmos.com/calculator/gdpvrh1sat

    return c.z*mix(vec3(1.0), rgb, c.y);
}


float plot (vec2 st, float pct){
    return smoothstep(pct - 0.01, pct, st.y) -
        smoothstep(pct, pct + 0.01, st.y);
}

vec3 pressedImage(vec3 color){
    // RGB 모델을 YUV 모델로 변환
    float Y = (0.257 * color.r) + (0.504 * color.g) + (0.098 * color.b) + 16.0;
    float U = -(0.148 * color.r) - (0.291 * color.g) + (0.439 * color.b) + 128.0;
    float V = (0.439 * color.r) - (0.368 * color.g) - (0.071 * color.b) + 128.0;
    
    // YUV(YCbCr) 모델을 RGB 모델로 변환
    float R = 1.164 * (Y - 16.0) + 1.596 * (V - 128.0);
    float G = 1.164 * (Y - 16.0) - 0.813 * (V - 128.0) - 0.391 * (U - 128.0);
    float B = 1.164 * (Y - 16.0) + 2.018 * (U - 128.0);
    return vec3(R,G,B);
}



const float PI = 3.14159265359;
void main(){

    vec2 Res = gl_FragCoord.xy / u_resolution.xy;
    vec3 col = vec3(0.0);
    
    vec3 colA = vec3(0.2157, 0.0, 1.0);
    vec3 colB = vec3(1.0, 0.651, 0.0);

    vec3 pct = vec3(Res.x);
    pct.r = smoothstep(0.0, 1.0, Res.x);
    pct.g = sin(Res.x * PI);
    pct.b = pow(Res.x, 2.0);
    col = mix(colA,colB, pct);
    
    col = mix(col, vec3(1.0, 0.0, 0.0), plot(Res, pct.r));
    col = mix(col, vec3(0.0, 1.0, 0.0), plot(Res, pct.g));
    col = mix(col, vec3(0.0, 0.0, 1.0), plot(Res, pct.b));
    // plot(Res, pct.r); :: Res는 Res.y로 계산. pct.r(0~1 사이 x의 흐름을 따라감)의 값에 따라 Res.y의 현재 값을 반환한다.
    col = hsb2rgb(vec3(Res.x, 1.0, Res.y));

    // YUV 이미지 압축 후 RGB로 재변환 반복
    for(int n = 0; n < 10; n++){
        col = pressedImage(col);
    }

    gl_FragColor = vec4(col,1.0);

}