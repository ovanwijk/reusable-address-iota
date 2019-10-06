import { iotaHash } from '../src/iotafunctions';



export class MerkleTree {
    
    leafs:Array<String>;
    constructor(leafs:Array<String>){
        this.leafs = leafs;
    }
}