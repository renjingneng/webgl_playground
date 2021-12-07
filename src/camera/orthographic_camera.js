import { Camera } from './camera.js';
class OrthographicCamera extends Camera {
    constructor(left = - 1, right = 1, top = 1, bottom = - 1, near = 0.1, far = 2000) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
        this.near = near;
        this.far = far;
    }
}
export { OrthographicCamera };