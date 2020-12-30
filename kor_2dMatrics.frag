#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float bar(vec2 loc, vec2 size, vec2 coord){
    vec2 sw = loc - size / 2.0; // size 는 전체 크기이지만, 실제로는 loc 부터 +- size/2 를 한 것과 같다.
    vec2 ne = loc + size / 2.0;

    vec2 ret = step(sw, coord) - step(ne, coord);
    return ret.x * ret.y;
}

mat2 rotate2D(float angle){
    return mat2(cos(angle), -sin(angle),
                sin(angle), cos(angle)); 
}

float plus(vec2 loc, vec2 size, vec2 coord){
    float b1 = bar(loc, size, coord);
    float b2 = bar(loc, size.yx, coord);
    
    return max(b1, b2);
}



void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;
    coord = coord * 2.0 - 1.0;
    // coord += vec2(0.0,0.0); // 좌표계 자체를 움직여 십자 모양을 움직일 때 사용, 반대방향으로 움직임에 유의.
    coord.x *= u_resolution.x / u_resolution.y;
    
    
   
    float rad = 0.5;
    // vec2 loca = vec2(0.0);
    vec2 loca = vec2(0.0) + vec2(sin(u_time) * rad, cos(u_time) * rad); // 십자 모양의 좌표를 변경해서 위치를 옮기는 방법(좌표계는 그대로)
    
    /* 위치 */
    coord += loca;
    // (sin, cos) 좌표계는 시계방향, (cos, sin) 좌표계는 반시계방향으로 돈다.
    
    /* 회전 */
    coord *= rotate2D(sin(u_time));
    // 원래 쓰이는 STR(scale -> rotate -> translate)가 안쓰인 이유
    // 이 예시는 십자 모양 자체가 움직이는 것이 아니라 좌표계 원점이 움직이는 것을 기준으로 만들어졌다.
    // 때문에 회전도 그 영향을 받지 않았다.
    // 단지 회전 되는 것은 좌표계 전체를 회전해서 얻은 것이므로 실제 버텍스 쉐이더 상에서 처리되는 것과 다르다.
    // 프레그먼트 쉐이더 상에서 버텍스라는 개념이 없어 좌표계를 그대로 두고 회전 시킨다는 것은 불가능하다.
    // 그러므로 이동한 십자 모양 출력 값 자체에 회전을 입혀 마치 보는 관점에서 회전시킨듯이 보이게 만든 것이다.
    // 버텍스 쉐이더 상에서 행렬 매트릭스 사용시 SRT 순서가 쓰이는 것을 유의한다.(Direct3D는 TRS)
    
    /* 크기 */
    coord *= (sin(u_time) - 1.5) / 2.0; // sin(u_time) 함수를 넣어 재미있는 효과를 주었다.
    // 마찬가지로 크기도 좌표계에 변화를 주어 조절한다.
    // 단, 값이 클수록 십자 모양이 작아지고 값이 작을수록 십자 모양이 커진다.
    // 기존의 0 ~ 1 범위의 좌표계를 크게하면 0 ~ (커진 값) 만큼 넓어져 십자 모양이 작아져 보이는 것이고,
    // 작게하면 0 ~ (작은 값) 만큼 작아져 십자 모양이 커져 보이는 착시인 것이다.

    
    // vec3 color = vec3(cross(loca, vec2(0.3, 0.02), coord)); // 십자 모양 자체 위치를 조정할 때 사용
    vec3 color = vec3(plus(vec2(0.0), vec2(0.5, 0.02), coord));

    gl_FragColor = vec4(color, 1.0);

}