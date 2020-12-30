#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const float PI = 3.14159265359;
    float noise1d(float v){
        return cos(v + cos(v * 90.1415) * 100.1415) * 0.5 + 0.5;
    }
void main(){
    vec3 colorA = vec3(1.0,0.0,0.0);
    vec3 colorB = vec3(0.0,1.0,0.0);
    
    float pct = sin(u_time);
    //((sin( u_time / 0.14 / 1.49 )* 2.0 + 1.0) * (sin( u_time / 0.14 )) * 1.7) * 0.51;

    vec3 color = mix(colorA, colorB, pct);
    
    vec3 yel, mag, gre;

    yel.rg = vec2(1.0);

    mag = yel.rbg;


    gl_FragColor = vec4(color, 1.0);
}