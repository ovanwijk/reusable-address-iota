import {testNumber} from '../src/index';

import { createPrepareTransfers, generateAddress } from '@iota/core';

import  Kerl from '@iota/kerl';
import { trits, trytes, asciiToTrytes } from '@iota/converter';
import { KEY_CACHE } from './keycache';
import { createGetTransactionObjects } from '@iota/core/out/core/src';
import  MerkleTree from 'merkletreejs';
import * as CryptoJS from 'crypto-js';
import {asTransactionObjects,asTransactionObject} from '@iota/transaction-converter';
import { iotaHash } from '../src/iotafunctions';




const SEED = "9AZ".repeat(27);
const SIGNALSEED = iotaHash(SEED + "SIGNAL");

console.log("Signal seed:", SIGNALSEED);
var aaa = testNumber;

/**

    find & replace/change/remove in the js files of @iota node modules folders: 
    
    Find: (typeof input.balance === 'undefined' || (Number.isInteger(input.balance) && input.balance > 0)) 
    Replace:  (typeof input.balance === 'undefined' || (Number.isInteger(input.balance) && input.balance >= 0)) 


    find:exports.createAddInputs = function (provider)
    remove: threshhold === 0 check

    if (converter_1.tritsToValue(transaction_1.value(transactions, i * transaction_1.TRANSACTION_LENGTH)) < 0) { 
    find the above and remove the loop that sets the signature index, replace with:

    (instead of looking where a negative value starts(value is the first field in a TX) we just calculate)
    var signatureIndex = (transactions.length - inputs.map(a => transaction_1.TRANSACTION_LENGTH * a.security).reduce((a,b) => {return a+b;})) / transaction_1.TRANSACTION_LENGTH;

 */

 var ts = 1570029041000;

const prepareTransfers = createPrepareTransfers(undefined, () => ts);

// transfers = [
//     {

//     }
// ]
// prepareTransfers(SEED, )
var signalKeys = KEY_CACHE[SIGNALSEED];
var realKeys = KEY_CACHE[SEED];
// var signalKeyBuffers = signalKeys.map(a => Buffer.from(tritshiftToByte(trits(a))));
// // var tree = new MerkleTree(signalKeyBuffers, cryptoJSIotaHash);
// tree.getProof(signalKeys[2])
// console.log("Tree", signalKeyBuffers);



var dataTesting = SIGNALSEED + SEED + SIGNALSEED + "AABBBV";
console.log("Data hash:", iotaHash(dataTesting))
const transfers = [
    {
        address: iotaHash(dataTesting),
        value: 0,
        message: dataTesting,
        timestamp: ts,
        tag: "9".repeat(27)
    }
];




(async () => {
    var keyCount = 64;
   
var transfersResult = await prepareTransfers(SEED, transfers, {
    inputs: [
        {
            address: signalKeys[0],
            keyIndex: 0,
            security: 1,
            balance: 0
        }
    ]
});

console.log(transfersResult.map(trytes => asTransactionObject(trytes)));

   // console.log(signalKeys);
 //   console.log(realKeys);
 })();



