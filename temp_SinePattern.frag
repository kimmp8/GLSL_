#ifdef GL_ES
precision mediump float;
#endif

#define RGB(r,g,b) vec3(r/255.0, g/255.0, b/255.0)
const vec3 WHITE = vec3(1.0, 1.0, 1.0);
const vec3 BLUE = RGB(85.0, 205.0, 252.0);
const vec3 PINK = RGB(247.0, 168.0, 184.0);

uniform vec2 u_resolution;
uniform float u_time; 

vec3 band(vec2 pos){
    float y = abs(pos.y) - 0.5;
    if(y <= 0.0) return WHITE; // pos.y = 0.50 ~ 0.9999
    if(y <= 1.0) return PINK;  // pos.y = 1.0 ~ 1.4999
    if(y <= 2.0) return BLUE;  // pos.y = 1.5 ~ 1.9999
}

vec3 boundry(vec2 pos){
    float y = abs(pos.y);
    if(y - 0.02 <= floor(y) && floor(y) <= y + 0.02) return vec3(0.0);
    else return WHITE;
}

void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution.xy;
    coord.x *= u_resolution.x / u_resolution.y;
    vec2 position = (coord * 5.0) - vec2(0.0, 2.5);
    vec2 Ctime = vec2(0.0, sin(position.x + u_time));
    vec3 calc = band(position + Ctime) * boundry(position + Ctime);
    calc = band(position + Ctime); // boundry visible <-> invisible
    gl_FragColor = vec4(calc, 1.0);
}