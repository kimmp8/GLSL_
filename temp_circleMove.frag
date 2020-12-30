#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const float PI = 3.14159265359;
const float divPI = 0.318309886183;
float circle(vec2 coord, float r){
    vec2 pos = vec2(0.5) - coord;
    return smoothstep(1.0 - r, 1.0 - r + (r * 0.01), 1.0 - dot(pos, pos) * 3.14);
}

vec2 move(vec2 coord, float density, float speed){
    coord *= density;
    float time = u_time * speed;
    if(fract (time) > 0.5){ // 런타임 0.5초 넘으면 기준으로 실행, fract에 의해 1초마다 반복
        //coord.y는 fract에 의해 1로 나뉘어져 density 만큼 0 ~ 1 마다 0.5를 기준으로 위 아래가 구분된다.
        if(fract(coord.y * 0.5) > 0.5){
            //density가 적용된 coord.y 값 상에서 0.5를 넘는다면 coord.x를 + 방향으로 움직인다.
            coord.x += fract(time) * 2.0;
        }else{
            //density가 적용된 coord.y 값 상에서 0.5 미만이라면 coord.x를 - 방향으로 움직인다.
            coord.x -= fract(time) * 2.0;
        }
    }else{ // 런타임 0.5초 밑을 기준으로 실행, fract에 의해 1초마다 반복
        if(fract(coord.x * 0.5) > 0.5){
            //density가 적용된 coord.x 값 상에서 0.5를 넘는다면 coord.y를 + 방향으로 움직인다.
            coord.y += fract(time) * 2.0;
        }else{
            //density가 적용된 coord.x 값 상에서 0.5 미만이라면 coord.y를 - 방향으로 움직인다.
            coord.y -= fract(time) * 2.0;
        }
    }

    // float lapse = fract(coord.y* 0.5) > 0.5 ? coord.x + fract(time) * 2.0 : coord.x - fract(time)*2.0;
    // coord += lapse;
    // coord.y += step(1.0, mod(coord.x, 2.0)) * cos(time / PI);

    return fract(coord);
}

void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;
    coord.x *= u_resolution.x / u_resolution.y;
    coord = move(coord, 10.0, 0.5);

    vec3 color = vec3(1.0 - circle(coord, 0.3));
    color = vec3(coord, 0.0); // space coordinate로 보기
    
    gl_FragColor = vec4(color, 1.0);
}