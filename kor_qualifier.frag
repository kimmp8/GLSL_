#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;


// void plus(inout vec3 col){
//     col = col + 0.5;
// }

// inout qualifier 는 외부에서 vec3 col 변수 값을 레퍼런스 복사로 받아서 반영후, vec3 값만 반영한다.(void 타입이므로 실제 함수내에서는 반환이 안 일어남)


// void plus(out vec3 col){
//     col = col + 0.5;
// }

// out qualifier 는  외부에서 vec3 col 변수를 받은게 아닌, 자체적으로 새로 선언되고 초기화된 상태(col 값이 0인 상태)로 함수를 실행한다.
// 때문에 main 함수 내에서 선언만하고 값은 넣지 않은 모양새를 취하게 된다.


void plus(in vec3 col){
    col = col+ 0.5;
    
}

// in qualifier 는 외부에서 vec3 col 변수 값을 레퍼런스 복사로 받아서 반영하지만 반영된 vec3 col 변수 값는 외부로 반영되지 않는다.
// 함수 내부에서 사용된 후, 함수 내에서 선언된 다른 변수나 return 반환에 의해서만 외부 반환이 가능하다.
// 위 함수의 void 타입에서는 함수 외부로 반환할 방법이 없다.


void main(){
    vec3 color = vec3(0.5);
    plus(color);
    
    gl_FragColor = vec4(color, 1.0);
}