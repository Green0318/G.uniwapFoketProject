const colors = require('colors')
const UniswapV2Factory = artifacts.require('UniswapV2Factory');

module.exports = function (deployer, network, addresses) {
    const _FEETOSETTER = addresses[0];
    deployer.deploy(UniswapV2Factory, _FEETOSETTER);
}
