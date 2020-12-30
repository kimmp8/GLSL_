#ifdef GL_ES
precision mediump float;
#endif


uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const float PI = 3.14159265359;

void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;
    coord.x *= u_resolution.x / u_resolution.y;
    coord = coord * 2.0 - 1.0;

    float angle = atan(coord.y, coord.x);
    // 처음쓴 atan 의 범위는 -PI ~ PI로 되어있다.

    // float angle = sin(coord.x * min(u_time  * 100.0, 150.0)) * min(min(u_time * 1.2, 5.0), 1.0)
    //             - sin(coord.y * min(u_time * 100.0, 150.0));
    // => 체크무늬 효과 만드는 변수 식
    
    //angle += PI;
    //angle /= 2.0 * PI;
    angle += u_time*1.0;
    angle *= 3.0;

    float d = distance(vec2(0.0), coord);
    // 또는 length(coord);

    float r = sin(angle);
    
    d = step(d, r);

    vec3 col = vec3(d);

    // vec3 col = vec3(step(angle, 0.0));
    // => 체크무늬 효과의 경계를 만드는 변수 식

  
    gl_FragColor = vec4(col, 1.0);
}