# Uniswap v2 Forked Project

Uniswap v2 is a constellation of smart-contracts used to run the eponymous service on the Ethereum’s blockchain. They allow the creation of Liquidity Pools and the trading of ERC20’s tokens.

## Deploy Uniswap v2 Core
The Uniswap v2 Core’s smart-contracts (Also called Factory) can be found in this repository.
The Core’s contracts contains everything we need to deploy the Uniswap v2 Factory. The Factory is the core module of the Uniswap v2’s model and is used to create and manage the token’s pairs.

### Open UniswapV2ERC20.sol
- Change the value of the name constant to match your LP-token’s name.
- Change the value of the symbol constant to match your LP-token’s symbol.

### Open UniswapV2Factory.sol
bytes32 public constant INIT_CODE_HASH = keccak256(abi.encodePacked(type(UniswapV2Pair).creationCode));

### Compile UniswapV2Factory.sol
You also need to call the “INIT_CODE_HASH” function and store the returned value.

## Deploy Uniswap v2 Periphery
The Uniswap v2 Periphery’s smart-contracts can be found in this repository.
They contain all the logic that our frontend UI will interact with. These contracts are needed as a proxy for the Factory as we do not interact directly with the Factory’s contracts.

### Open libraries/UniswapV2Library.sol
Insert (line 24) the INIT_CODE_HASH we saved earlier without the leading “0x”.

Thanks for following this guide. 
We can build a Security Compliant Decentralized Exchange by making a few change to this Uniswap’s fork.