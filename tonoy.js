const SHA256 = require('crypto-js/sha256');//Import SHA256 library, const(Constant) statement values can be assigned once and they cannot be reassigned.
class Block{
    constructor(block, timeStamp, data, previousHash = ''){ //Constructor is used to create an Object with property.
        this.block = block;
        this.nonce = 0;
        this.timeStamp = timeStamp;
        this.data = data;
        this.previousHash = previousHash;
        this.currentHash = this.calculateHash();
        
    }

    calculateHash(){
        return SHA256(this.block + this.timeStamp + this.previousHash +this.nonce + JSON.stringify(this.data)).toString();//toString() function is used to convert number into string
    }
    //This method for proof of work
    mineBlock(difficulty){
        while(this.currentHash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce ++ ;
            this.currentHash = this.calculateHash();
    }
}
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }

    createGenesisBlock(){
        return new Block (0, "06-11-2018", "Genesis Block", "0000000000000000");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().currentHash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i =1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.currentHash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.currentHash){
                return false;
            }
        }
        return true;
    }
}

let tonoyblock = new Blockchain();



tonoyblock.addBlock(new Block(1, "6-11-2018",{Dataset:01}));

tonoyblock.addBlock(new Block(2, "8-11-2018", {Dataset:02}));

tonoyblock.addBlock(new Block(3, "7-11-2018", {Dataset:03}));


console.log(JSON.stringify(tonoyblock, null, 4));

console.log("Is BlockChain Valid?:", tonoyblock.isChainValid());

tonoyblock.chain[1].data = {Dataset:56};

tonoyblock.chain[1].currentHash = tonoyblock.chain[1].calculateHash();

console.log(JSON.stringify(tonoyblock, null, 4));

console.log("Is BlockChain Valid?:", tonoyblock.isChainValid());



