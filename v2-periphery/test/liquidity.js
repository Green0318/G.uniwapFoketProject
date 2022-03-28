const UniswapV2Router02 = artifacts.require("UniswapV2Router02");
const IERC20 = artifacts.require("IERC20");
const WETH = artifacts.require("WETH9");
const BN = web3.utils.BN;
const truffleAssert = require('truffle-assertions');
const IUniswapV2Factory = artifacts.require("IUniswapV2Factory");
const IUniswapV2Pair = artifacts.require("IUniswapV2Pair");

contract("UniswapV2Router02 test", accounts => {
  let factoryAddress;
  let tokenA = "0x78914D93DFfae4fb3F17BDe990b5438634dECFA9";
  let tokenB = "0x8B201535d039FEC2bb444511E343E47A3b4FdDd1";
  let TOKENA_AMOUNT = "10000";
  let TOKENB_AMOUNT = "20000";
  let amountIn = "100";
  let amountOutMin = "100";
  let amountAMin = "1";
  let amountBMin = "1";

  let uniswapV2router02;
  let weth;

  beforeEach(async () => {    
    uniswapV2router02 = await UniswapV2Router02.deployed();  
    console.log("UniswapV2Router02: ", UniswapV2Router02.address);

    weth = await WETH.deployed();
    factoryAddress = await uniswapV2router02.factory();
    console.log("Factory: ", factoryAddress);    
  });

  it("Router Test", async () => {   
    console.log("Add Liquidity"); 
    const tokenAContract = await IERC20.at(tokenA);
    const tokenBContract = await IERC20.at(tokenB);
    console.log("TokanA totalSupply: ", new BN(await tokenAContract.totalSupply()).toString());
    console.log("TokanB totalSupply: ", new BN(await tokenBContract.totalSupply()).toString());

    let uniswapV2factory = await IUniswapV2Factory.at(factoryAddress);    
    console.log("Pairs Count: ", new BN(await uniswapV2factory.allPairsLength()).toString());

    let pairAddr = await uniswapV2factory.getPair(tokenAContract.address, tokenBContract.address);
    console.log("Pair Address: ", pairAddr);
    let pairAB = await IUniswapV2Pair.at(pairAddr);

    // Approve TokenA, TokenB 
    await tokenAContract.approve(uniswapV2router02.address, TOKENA_AMOUNT);
    await tokenBContract.approve(uniswapV2router02.address, TOKENB_AMOUNT);
    console.log("ERC20 Approved for A and B");

    await uniswapV2router02.addLiquidity(tokenA, tokenB, TOKENA_AMOUNT, TOKENB_AMOUNT, 0 , 0, 
        accounts[0], (Date.now() + 100000000));    



    let _liquidity = new BN(await pairAB.balanceOf(accounts[0])).toString();
    console.log("LP Tokens: ", _liquidity);    

    await tokenAContract.approve(uniswapV2router02.address, amountIn);
    let path = [];
    path[0] = tokenA;
    path[1] = tokenB;

    console.log("Swap Tokens");
    let swap = await uniswapV2router02.swapExactTokensForTokens(amountIn, amountOutMin, path, accounts[0], (Date.now() + 100000000));
    console.log("TokanA : ", new BN(await tokenAContract.balanceOf(accounts[0])).toString());
    console.log("TokanB : ", new BN(await tokenBContract.balanceOf(accounts[0])).toString());

    console.log("Remove Liquidity");

    await pairAB.approve( uniswapV2router02.address, 1000);
    let removeLiquidity = await uniswapV2router02.removeLiquidity(tokenA, tokenB, 1000, amountAMin, amountBMin, accounts[0], 
        (Date.now() + 100000000));
        
    console.log("LP Tokens: ", new BN(await pairAB.balanceOf(accounts[0])).toString());    
  })  

});


