#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const float PI = 3.14159265359;

float Triangle(vec2 coord){
    return 1.0 - step(0.0, coord.x -= coord.y);
}

vec2 rotate(vec2 coord, float angle){
    coord -= 0.5;
    angle = angle * PI;
    coord = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * coord;
    coord += 0.5;
    return coord;
    
}

vec2 tile(vec2 coord, float density){
    coord *= density;

    if(fract(coord.y * 0.5) > 0.5){
        if(fract(coord.x * 0.5) > 0.5){
            coord = rotate(coord, 1.0);
        }else{
            coord = rotate(coord, 1.5);
        }
    }else{
        if(fract(coord.x * 0.5) > 0.5){
            coord = rotate(coord, 0.5);
        }else{
            coord = rotate(coord, 0.0);
        }
    }

    return fract(coord);
}

vec2 rotateTilePattern(vec2 coord){
    coord = rotate(coord, 0.0);
    return coord;

}


void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;
    coord.x *= u_resolution.x / u_resolution.y;
    // coord = coord * 2.0 - 1.0;
    coord = tile(coord, 6.0);
    // coord = rotateTilePattern(coord);

    
    // coord.y = abs(coord.y);
    vec3 color = vec3(coord, 0.0);
    color = vec3(step(coord.x, coord.y));
    gl_FragColor = vec4(color, 1.0);
}