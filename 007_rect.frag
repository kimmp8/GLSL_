#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

vec3 rectShape(vec2 coord, vec2 position, vec2 scale){
    
    vec2 shaper = step(position - scale.xy/2.0, coord.xy);
    shaper -= step(position + scale.xy/2.0, coord.xy);
    return vec3(shaper.x * shaper.y);
}


void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;

    vec3 col = rectShape(coord, vec2(0.5,0.6), vec2(0.5,0.7));

    gl_FragColor = vec4(col, 1.0);
}