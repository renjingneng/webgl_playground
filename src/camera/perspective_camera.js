import { Camera } from './camera.js';
import { gl_matrix } from '../../res/gl_matrix.js';
class PerspectiveCamera extends Camera {
    constructor(fov = 50, aspect = 1, near = 0.1, far = 2000) {
        this.fov = fov;
        this.near = near;
        this.far = far;
        this.aspect = aspect;
    }
    get_projection_matrix() {
        var projection_matrix = gl_matrix.mat4.create();
        gl_matrix.mat4.perspective(projection_matrix, this.fov, this.aspect, this.near, this.far);
        return projection_matrix;
    }
}
export { PerspectiveCamera };