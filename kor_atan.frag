#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
uniform vec2 u_resolution;
uniform float u_time;



vec3 hsb2rgb( in vec3 c){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0,0.0,1.0);
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

void main(){
    vec2 coord = gl_FragCoord.xy/u_resolution;
    coord = coord*2.0-1.0;
    float angle = atan(coord.y, coord.x);
    // 원형의 원점을 기준으로 반시계 반향으로 오른쪽 0도에서 (위로 돌아) -PI만큼, 시계방향으로 오른쪽 0도에서 (아래로 돌아) PI만큼 돌려
    // 때문에 -PI ~ PI가 atan의 범위이다.
    // 탄젠트(tan)는 기본적으로 각도를 구할 수 있다.
    // 원점으로부터 속도값(벡터 방향값)이 (a,b) 일 때, tan = b / a 로서 탄젠트(각도)를 구할 수 있다.
    // 아크탄젠트는 이를 원형으로 그려서 만들어낸 것이다.
    // angle = arctangent(velocity b / velocity a)
    // https://blog.naver.com/kete1002/221898955144 참고


    angle += PI * 1.0 * u_time; // 이 식에  u_time 을 곱하면 시간에 따라 회전한다.
    // 위의 각도 -PI와 PI는 오른쪽에서 빨강색부터 시작된 상태로 보이게 한다.
    // 왼쪽으로 부터 연속적으로 보이게 하기위해 += PI를 더 해준다.
    // 더하고 나면 각각 각도 0과 2PI가 된다.

    angle /= 2.0 * PI;
    // hsb2rgb 는 0 ~ 1을 기준으로 만들어졌다. 현재 아크탄젠트(atan)의 0 ~ 2PI 상태에서는 이 범위를 초과한다. 그러므로 새로 치환해야한다.
    // angle / (2 * PI) = (1 / angle) * (2 * PI) 이므로 angle = 2.0 * PI / angle ( angle /= 2.0 * PI ) 을 해준다.
    // 이렇게 되면 0 ~ 2PI에서 0 ~ 1 로 치환된다.

    angle *= 1.0; // 0 ~ 1로 치환하는 이 과정에서 값을 곱해주면 원형컬러 한 사이클이 곱한 만큼 반복하게된다.

    float dist = length(coord);
    // lenghth(float x) [vec2, vec3, vec4도 가능] :: 벡터 x의 길이를 계산 ( 두 점간의 거리보다 길이를 계산한다. )
    // distance(float x, float y) [vec2, vec3, vec4도 가능] :: x와 y 두 좌표간의 거리를  계산한다.
    // 위와 같은 경우 원점 외에 정확한 한 점을 특정하는 것이 아니므로 distance보다 length를 쓰는게 알맞다.

    vec3 color = hsb2rgb(vec3(angle, dist, 1.0));
    // hue = angle , saturation = dist , brightness = 1.0
    // color = vec3(abs(sin(angle)));
    gl_FragColor = vec4(color,1.0);   

}