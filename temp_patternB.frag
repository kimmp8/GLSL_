#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const float PI = 3.14159265359;

float box(vec2 coord, vec2 size, vec2 loc, float smooth){
    vec2 center = loc;
    // vec2 uv = step(center - size, coord) - step(center + size, coord);
    vec2 uv = smoothstep(center - size + smooth, center - size, coord)
            - smoothstep(center + size, center + size - smooth, coord);
    return uv.x * uv.y;
}

vec2 rotate(vec2 coord, float a){
    coord -= 0.5;
    coord *= mat2(cos(a), -sin(a), sin(a), cos(a));
    coord += 0.5;
    return coord;
}

vec2 offset(vec2 coord){ // 실제 coord 좌표계는 왼쪽 아래 0,0으로 두고 0.5씩 x,y에 더해서 가운데 좌표계로 바꾸는 함수이다.
    vec2 uv;
    
    if(coord.x > 0.5){
        uv.x = coord.x - 0.5; // 0 ~ 1 좌표계상에서 0.5 보다 크면 0.01 ~ 0.49

    } else {
        uv.x = coord.x + 0.5; // 0 ~ 1 좌표계상에서 0.5 보다 같거나 작으면 0.50 ~ 1.00
    }
    // -1 ~ 1 좌표상에서 음수부분은 다음과 같다.
    /*  if(coord.x <= -0.5){
        uv.x = coord.x + 0.5; // -1 ~ 0 좌표계상에서 -0.5보다 같거나 작으면 0.50 ~ 1.00
    } else {
        uv.x = coord.x - 0.5; // -1 ~ 0 좌표계상에서 -0.5보다 크면 0.01 ~ 0.49
    } // 기존 함수에서 전체적으로 -로 반전시켜준 상태이다.
    
    */
    if(coord.y > 0.5){
        uv.y = coord.y - 0.5;
    } else {
        uv.y = coord.y + 0.5;
    }

    return uv;
}



void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;
    coord.x *= u_resolution.x / u_resolution.y;
    
    coord *= 3.0; // tile
    coord = fract(coord); // tile
    // coord -= 0.5;
    // vec2 offsetCoord = offset(coord);
    vec2 coordB = coord;
    coordB *= 2.0;
    coordB = fract(coordB);
    // color 안의 사각형 함수에 직접 넣으면 바로 밑 회전 함수에 영향을 받기 때문에 회전 함수 앞에 변수 선언해서 적용했다.
    // offset 함수의 도형은 가운데 좌표계를 갖지만, 일반 coord 함수 좌표계는 왼쪽 아래 0,0 좌표이다.
    
    float boxBig = box(coordB, vec2(0.5), vec2(0.5), 0.02);
    // coord = coord * 2.0 - 1.0;
    vec2 coordC = rotate(coord, PI*0.25);
    
    float boundry = 0.01;
    float size = 0.05;
    vec3 color = vec3(boxBig - box(coordC, vec2(size + boundry), vec2(0.5), 0.012) + 2.0 * box(coordC, vec2(size), vec2(0.5), 0.012));
    // box(offset(coord), vec2(0.5), vec2(0.0), 0.012)


    gl_FragColor = vec4(color, 1.0);

}