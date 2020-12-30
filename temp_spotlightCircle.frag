#ifdef GL_ES
precision mediump float;
#endif


uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

#define mouse u_mouse / u_resolution.xy // glsl Sandbox 상에서 쓰이는 uniform vec2 mouse의 default Set

float distanceFunction(vec3 pos){
    float d = length(pos) - 0.5;
    return d;
}

void main(){
    vec2 coord = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);

    vec3 cameraPos = vec3(0.0, 0.0, -5.0);
    float screenZ = 5.0;
    vec3 rayDirection = normalize(vec3(coord, screenZ));

    
    vec3 col = vec3(0.0);
    float depth = 0.0;
    vec3 temp = vec3(0.0);
	for (int i = 0; i < 2; i++) { // 원을 10번 쌓아 올려 외곽 부분의 라운드를 만든다.
		vec3 rayPos = cameraPos + rayDirection * depth;
		float dist = distanceFunction(rayPos);
        
		if (dist < 0.1) { // 반복될 때마다 (화면상에서 볼 때)앞선 순서의 원 부분을 뺀 나머지 부분에 대해 계산
			vec3 n = normalize(rayPos);
			vec3 light = normalize(vec3(mouse * 2.0 - 1.0, -0.1)); // 마우스 위치에 대해 벡터 균일화 시켜준 것
            // mouse * 2.0 - 1.0 == (u_mouse / u_resolution.xy) * 2.0 - 1.0
			col = vec3(dot(n, light));
            // 내적(dot) 식에 의해 |x| . cos(x) == |n|.cos(n) == |x|.|x|*(light / |x|)
            // 라이트 스팟 부분을 높이라고 가정한다면 내적에 따라 col 값을 구한다.
            // ((x,y) == (0,0) 축을 기준으로) 마우스 위치에 따라 벡터 방향이 영향 받는다.
			break;
		}
		depth += dist;
	}
    
    gl_FragColor = vec4(col, 1.0);
}