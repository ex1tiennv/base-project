require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv");
dotenv.config();
/** @type import('hardhat/config').HardhatUserConfig */

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const INFURA_API_KEY = process.env.INFURA_API_KEY;
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.19",
  // コントラクトを認証するために etherscan api を宣言する
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  // デプロイするためのネットワークを宣言する
  networks: {
    /* 
      ethereumのmainnet: mainnet  
      アカウント: 「.env」ファイルでコンフィグされたウォレットアドレス
      url: https://www.infura.io/ から取得されたRPC(Remote Procedure Call) 
      ethereumのmainnetのchainId：1 (https://chainid.network/ 　から取得する）
    */
    mainnet: {
      accounts: [DEPLOYER_PRIVATE_KEY],
      url: "https://mainnet.infura.io/v3/" + INFURA_API_KEY,
      chainId: 1
    },
    /* 
      ethereumのtestnet： sepolia 
      アカウント: 「.env」ファイルでコンフィグされたウォレットアドレス
      url: https://www.infura.io/ から取得されたRPC(Remote Procedure Call) 
      ethereumのtestnetのchainId：11155111
    */
    sepolia: {
      accounts: [DEPLOYER_PRIVATE_KEY],
      url: "https://sepolia.infura.io/v3/" + INFURA_API_KEY,
      chainId: 11155111
    },
  },
  // テストケースのタイムアウト時間を設定する（最大時間、単位：ms） 
  mocha: {
    timeout: 600000,
  },
};
