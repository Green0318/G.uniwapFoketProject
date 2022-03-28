const UniswapV2Router02 = artifacts.require("UniswapV2Router02");
const WETH = artifacts.require("WETH9");
module.exports = async function(deployer) {
    const FACTORY_ADDRESS = "0xA5c6e374BF6dFbB462E9a5a9BfDf43e699E918FB";
    await deployer.deploy(WETH);     
    const weth = await WETH.deployed();
    await deployer.deploy(UniswapV2Router02, FACTORY_ADDRESS, weth.address);
}
