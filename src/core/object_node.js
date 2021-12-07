import {Node} from './node.js';
class ObjectNode extends Node {
    constructor(){
        super();
        //self_matrix = rotate,scale
        this.self_matrix;
        //local_matrix = translate
        this.local_matrix;
        //parent_matrix = parent.parent_matrix*parent.local_matrix
        this.parent_matrix;
        //world_matrix = parent_matrix*local_matrix*self_matrix
        this.world_matrix;
    }
}
export {ObjectNode};