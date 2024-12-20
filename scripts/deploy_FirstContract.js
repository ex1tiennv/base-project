const hre = require("hardhat");

// 「main」関数を宣言する
async function main() {

  // 「FirstContract」のコントラクトを取得してデプロイする
  const FirstContract  = await hre.ethers.getContractFactory("FirstContract"); 

  // contractを初期化する際のパラメータ（constructor関数に渡す）
  const initName = "MyCompany";
  const initAge = 10;

  // 「initName」と「initAge」のパラメータでコントラクトをデプロイする
  const firstContract = await FirstContract.deploy(initName, initAge);

  // デプロイの処理を待つ
  // await firstContract.deployed();

  // デプロイが完了されたコントラクトのアドレスのログ
  console.log(`FirstContract deployed to----: ${firstContract.target}`);
}


// 「main」の実行、 エラーの処理
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});