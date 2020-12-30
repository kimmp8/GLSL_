#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float drawLine(vec2 coord, bool toggle){
    float k;
    float r = 0.1;

    if(toggle){
        k = coord.x;
    }else{
        k = 1.0 - coord.x;
    }

    float ret = smoothstep(k - r, k, coord.y)
     - smoothstep(k, k + r, coord.y);
    return mix(0.0, 1.0, ret);
}

float drawCircle(vec2 coord, float rand){
    vec2 loc;
    float r = 0.55;
    float sub = 0.1;
    
    if(rand >= 0.5){
        if (rand >= 0.75){
            loc = vec2(1.0, 1.0);
         } else {
            loc = vec2(0.0, 1.0);
         }
    } else {
        if (rand >= 0.25){
            loc = vec2(1.0, 0.0);
         } else {
            loc = vec2(0.0, 0.0);
         }
    }

    return (step(length(coord - loc), r) - step(length(coord - loc), r - sub))
    + (step(length(vec2(1.0 - coord) - loc), r) - step(length(vec2(1.0 - coord) - loc), r - sub));
}

float random(vec2 v2){
    float f = dot(v2, vec2(15.485, 18.182));
    return fract(sin(f * 722.1231) * 743.478);
}


void main() {
    vec2 coord = gl_FragCoord.xy / u_resolution;
    coord.x *= u_resolution.x / u_resolution.y;
    coord *= 1e1; // 1e1 == 1 * 10^1
    // '(a)e(b)' == a * 10^b
    
    bool dirLine = random(floor(coord)) > 0.5 ? true:false;
    // random 값으로 미로에 들어갈 bool 값 판단

    float ranCir = random(floor(coord));
    // 원형 미로에 들어갈 random 값 계산

    coord = fract(coord); // fract로 좌표계 (x,y) == 0~1 반복    
    float draw = drawLine(coord, dirLine); // 미로
    draw = drawCircle(coord, ranCir); // 원형 미로
    vec3 col = vec3(draw);
    gl_FragColor = vec4(col, 1.0);
}