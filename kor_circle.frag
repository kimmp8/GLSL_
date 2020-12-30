#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 circle(vec2 coord, vec2 loc, float r){
    
    float d = distance(coord, loc);
    // distance는 loc로부터 coord 좌표까지의 거리를 나타낸다.
    // 두 '점(좌표)' 사이의 거리를 보는 것이기 때문에 값이 두 개가 들어간다. 

    d = length(coord - loc);
    // length는 loc 로부터 coord 좌표까지의 길이만을 나타냄.
    // coord - loc 는 정확한 길이를 계산하기 위해 필요한 과정임.
    
    // length가 distance에 비해 연산 처리 시간이 빠르다. 때문에 length 사용을 권장.
    // 위 둘 중에 하나만 선택해서 쓰면된다.

    d = smoothstep(r - (r*0.01), r + (r*0.01), d);
    
    // smoothstep(r - (r*0.01), r + (r*0.01), d) :: 원의 반지름이 커질수록 경계선 부분은 더 넓게 흐릿해진다.
    // 먼 곳에서 가까이 접근해 원이 점점 커지는 원근감을 표현할 때 사용해도 좋다.

    // smoothstep(r, r + 0.01), d) :: 원의 반지름이 커짐에 상관 없이 r + 0.01만큼 경계선 부분을 살짝 흐릿하게 한다.


    return vec3(d);
}

vec3 sCircle(vec2 coord, vec2 loc, float r){
    float d = distance(abs(coord), loc);
    // abs()는 절댓값을 만들어주는 함수이다. 여기서 abs(coord)를 해주면 x,y 좌표계 각각의 값이 (실제 좌표계에는 변화가 없지만) 양수로 만들어준다는 것이다.
    // 때문에 음수 좌표계에 위치하더라도 (양수x, 양수y) 좌표계에 있던 것과 똑같이 원이 그려져 나오는 것이다.
    // x축, y축 기준으로 원을 각각 접어서 그릴 수 있지 않나 싶겠지만, 반대로 (-x,y), (x, -y), (-x, -y) 모든 음수 좌표계도 그렇게 접힌다 가정하면,
    // 그 접힌 부분만큼의 영역이 서로간에 -(빼기)가 되어서(상충되어서) 0으로 없어진다.
    // 그렇기에 x,y 축 기준으로 잘리는 것처럼 보이는 것이다. 
    // d = smoothstep(r - 0.02, r, d) - smoothstep(r, r+0.02, d); // => 원형 선분을 그릴 수 있다.
    // d = distance(min(abs(coord)-0.3, 0.0), loc - 0.5 ); 
    // d = length(min(abs(coord)-0.3, 0.0));
    d = length(max(abs(coord)-0.3, 0.0));
    
    d = mod(d * 12.0, 1.0);
    
    vec2 distCol = vec2(d);
    

    return vec3(d);
}


void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution.xy;
    coord= coord * 2.0 - 1.0;
    coord.x *= u_resolution.x / u_resolution.y;
    // coord.x = (0 ~ 1 범위로 바꾼 텍스처 좌표계) * (화면 비율)
    // 위 식은 기존에 화면의 끝에서 끝 부분을 0 ~ 1 범위로 한정한 coord 값에 대해 화면 비에따라 범위를 재정의하는 과정이다.
    // 화면의 폭이 작아도 넓어도 항상 0 ~ 1이었지만 폭이 (정사각형일 때보다) 작으면 1 이하의 값, 폭이 (정사각형일 때보다) 크면 1 이상의 값의 범위로 바뀐다.

    // coord.x => 화면좌우 끝에서 끝 0 ~ 1 범위 내에 있는 x 좌표 
    
    // coord.y *= u_resolution.y / u_resolution.x;
    // 마찬가지로 y좌표의 높이를 기준으로 반영한다면 위 식과 같다.
    
    // 그러나 coord.x , coord.y 모두 두면 간섭이 일어난다.
    // (예시) 만약 화면 비율이 (x,y) = (2.5,1) 일 때,
    // coord.x 식만 적용 = 2.5 (y는 1) => 화면비(2.5, 1) => x 오른쪽이 길게 나옴
    // coord.y 식만 적용 = 1 / 2.5 = 0.4 (x는 1) => 화면비(1, 0.4)
    // coord.x 식과 coord.y 식 모두 적용 = (2.5,1) * (1, 0.4) => 화면비(2.5, 0.4) => 각각의 식을 적용했을 때의 모양대로 나온다. 그러나 기존처럼 비율에 맞지 않게 찌그러져 나온다.

    // vec3 col = circle(coord, vec2(0.5), 0.5);
    vec3 col = sCircle(coord, vec2(0.5), 0.5);

    gl_FragColor = vec4(col, 1.0);

}