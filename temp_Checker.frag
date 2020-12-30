#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float checker(float x){
    return ceil(x/2.0) - ceil((x - 1.0)/2.0);
}

void main(){
    vec2 resol = gl_FragCoord.xy / u_resolution;
    float density = 12.0;
    float CheckX = checker(density * resol.x);
    float CheckY = checker(density * resol.y);
    vec3 col = vec3(CheckX * CheckY) + vec3((CheckX - 1.0) * (CheckY - 1.0));
    
    gl_FragColor = vec4(col, 1.0);
}
