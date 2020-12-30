#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 rect(vec2 coord, vec2 loca, vec2 size){
     vec2 sw = loca - size/2.0;
     vec2 ne = loca + size/2.0;
     vec2 pct = step(sw, coord);
     pct -= step(ne, coord);
     return vec3(pct.x * pct.y);

}

void main(){
    vec2 coord = gl_FragCoord.xy/u_resolution;

    vec3 col = rect(coord, vec2(0.5), vec2(0.5));




    gl_FragColor = vec4(col, 1.0);
    
}