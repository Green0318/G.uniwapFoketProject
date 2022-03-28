const UniswapV2Factory = artifacts.require("UniswapV2Factory");
const ERC20 = artifacts.require("ERC20");
const BN = web3.utils.BN;
const truffleAssert = require('truffle-assertions');

contract("UniswapV2Factory test", accounts => {
  let uniswapV2factory = null;
  let tokenA;
  let tokenB;
  let pairAB;
  let init_code_hash = '';

  beforeEach(async () => {    
    if (uniswapV2factory == null) {
      uniswapV2factory = await UniswapV2Factory.deployed();        
      console.log("UniswapV2Factory: ", uniswapV2factory.address);  
    }
  });

  it("Create two ERC20 tokens", async () => {
    tokenA = await ERC20.new(1000000);
    tokenB = await ERC20.new(2000000);
    if (tokenA === undefined || tokenB === undefined) {
      revert("Failed 1");
    }
    console.log("Token A: ", tokenA.address);
    console.log("Token B: ", tokenB.address);
  })

  it("Create a pair", async () => {
    let tx = await uniswapV2factory.createPair(tokenA.address, tokenB.address);
    truffleAssert.eventEmitted(tx, 'PairCreated', (ev) => {
      console.log("Created pair at: ", ev.pair);
      pairAB = ev.pair;
      return true;
    });
  });

  it("Get all pairs in a pool", async () => {
    let pairs = await uniswapV2factory.allPairsLength();
    console.log(`Pairs' length: ${pairs}`);
    for (let i = 0; i < pairs; i++) {
        let pair = await uniswapV2factory.allPairs.call(i);
        console.log(`Found a pair at ${pair}`);
    }
  });

  it("Get a pair from ERC20 tokens", async () => {
      const pair = await uniswapV2factory.getPair(tokenA.address, tokenB.address);
      console.log(`Pair for token1 and token2 is at ${pair}`);
  });

  it("Get INIT_CODE_HASH", async () => {
    init_code_hash = await uniswapV2factory.INIT_CODE_PAIR_HASH();
    console.log(`INIT_CODE_PAIR_HASH: ${init_code_hash}`);
  });

});


