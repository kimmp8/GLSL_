// the Book of Shaders 의 Random. Canvas만 보고 작성.

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// #define mouse u_mouse / u_resolution.xy
// vec2로 define 해두어도 swizzle해서 쓸 수 없다. 따로 swizzle한 함수(변수)를 define 해야한다.

float random(float f){
    return fract(sin(f * 337.143) * 1e4);
}

float randomSerie(float crd, float freq, float t, float DivDen){
    return step(freq, random(floor(crd * DivDen - t)));
}

float drawStripe(float crd, float thickness, float den){
    // float count = floor(crd * 10.0);
    float fracted = fract(crd * den);
    return (1.0 - step(thickness, fracted)) + step(1.0 - thickness, fracted);
}

void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;
    coord.x *= u_resolution.x / u_resolution.y;
    vec2 mouse = u_mouse / u_resolution.xy; 

    vec2 density = vec2(100.0, 50.0);

    float randCoordY = random(floor(coord.y * density.x)); // <--
    float temp = random(floor((coord.y + 0.1) * density.x)); // <-- 반복되는 함수에 대한 정리가 필요.
    float mouseRange = 0.1 + (mouse.x * 0.95); // 맨 오른쪽에 마우스를 위치시켜두어도 mouseRange != 1.0 이므로 0.9가 아닌 0.95로 씀.
    float reactMouse = mix( randCoordY , 0.0, mouseRange);

    float pattern = randomSerie(coord.x, reactMouse, temp * u_time * 100.0, density.y); // 좌표계, 빈도수, 시간, 나뉘는 사각형 개수
    float line = drawStripe(coord.y, 0.11, density.x);
    // float inner = dot(random(coord.x),random(coord.y));
    vec3 col = vec3(pattern + line);
    // col = vec3(inner);
    gl_FragColor = vec4(col, 1.0);
}

// 코드는 동일하게 나오는 것처럼 보여도 Book of Shaders 예제에서는 floor(coord), fract(coord) (모두 vec2)를 각각 한 변수로 묶고 시작
// 그리고 별도로 time, direction 에 대한 변수 선언함.