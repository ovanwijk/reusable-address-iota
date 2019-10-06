import { composeAPI } from '@iota/core';

import  Kerl from '@iota/kerl';
import { trits, trytes, asciiToTrytes } from '@iota/converter';

export function getAPI():any {
    return composeAPI({provider:"http://localhost:14625"})
}


export function iotaHash(inputTrytes) {
    //console.log(inputTrytes);
    const inputTrits = trits(inputTrytes);
    const paddedInput = new Int8Array((Math.floor(inputTrits.length / Kerl.HASH_LENGTH) + 1) * Kerl.HASH_LENGTH)
  //  debugger;
    paddedInput.set(inputTrits);
    const kerl = new Kerl();
    kerl.initialize();
    kerl.absorb(paddedInput, 0, paddedInput.length)
    const hashTrits = new Int8Array(Kerl.HASH_LENGTH)
    kerl.squeeze(hashTrits, 0, Kerl.HASH_LENGTH)
    return trytes(hashTrits)
}


function bytehiftToTrit(trits:Uint8Array): Int8Array {
    var toReturn = new Int8Array(trits.length);
    for(var i = 0; i < trits.length;i++){
        if(trits[i] == 0){
            toReturn[i] = -1
        }else if(trits[i] == 1){
            toReturn[i] = 0
        }else if(trits[i] == 2){
            toReturn[i] = 1
        }else{
         //   console.log("Error byteshift", trits[i]);
        }        
    }
    return toReturn;
}

function tritshiftToByte(trits:Int8Array): Uint8Array {
    var toReturn = new Uint8Array(trits.length);
    for(var i = 0; i < trits.length;i++){
        if(trits[i] == -1){
            toReturn[i] = 0
        }else if(trits[i] == 0){
            toReturn[i] = 1
        }else if(trits[i] == 1){
            toReturn[i] = 2
        }else{
            console.log("Error trit shift", trits[i]);
        }        
    }
    return toReturn;
}


export function cryptoJSIotaHash(inputTrytes:Buffer) {
    //console.log(inputTrytes);
    const inputTrits = bytehiftToTrit(inputTrytes);
    
    const paddedInput = new Int8Array((Math.floor(inputTrits.length / Kerl.HASH_LENGTH) + 1) * Kerl.HASH_LENGTH)
  //  debugger;
    paddedInput.set(inputTrits);
    const kerl = new Kerl();
    kerl.initialize();
    kerl.absorb(paddedInput, 0, paddedInput.length)
    const hashTrits = new Int8Array(Kerl.HASH_LENGTH)
    kerl.squeeze(hashTrits, 0, Kerl.HASH_LENGTH)
    return Buffer.from(tritshiftToByte(hashTrits));
}

export function bufferToTrytes(input:Buffer){
    return trytes(bytehiftToTrit(input));
}
