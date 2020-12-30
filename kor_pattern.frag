#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const float PI = 3.14159265359;
const float squareHeight = 0.353553; // sqrt(2) / 4.0 계산. 다이아몬드 사각형의 높이, 피타고라스의 정리에 의해 계산
// 직각삼각형의 높이는 1:1:sqrt(2)이다.
// sqrt() 는 루트를 지칭함.

// ** 나눗셈보다 곱셈 연산이 컴퓨터 연산에 더 효율적이다.
// ** 때문에 나눗셈이라면 const 정의 혹은 곱셈 연산으로 돌려두는 것이 좋다.

float rect(vec2 coord, vec2 size, vec2 loc){
    vec2 center = loc;
    float hor = step(center.x - size.x, coord.x) - step(center.x + size.x, coord.x);
    float ver = step(center.y - size.y, coord.y) - step(center.y + size.y, coord.y);

    return hor * ver;
}


mat2 Rotate2D(float angle){
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;
    // coord = coord *2.0 - 1.0;
    coord.x *= u_resolution.x / u_resolution.y;
    
    coord *= 3.0;
    // // coord = mod(coord, 1.0);
    coord = fract(coord);
    coord -= 0.5; // coord 값에 0.5를 빼서 원점을 가운데로 옮김
    coord *= Rotate2D(PI/4.0);
    
    vec3 color = vec3(rect(coord, vec2(squareHeight), vec2(0.0)));
   
    gl_FragColor = vec4(color, 1.0);
}