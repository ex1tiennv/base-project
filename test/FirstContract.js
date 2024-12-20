//ライブラリ挿入
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FirstContract", function() {
    let FirstContract;
    let firstContract;
    let owner;
    let addr;

    beforeEach(async function () {
        //　hardhatが提供したアカウントを取得する
        [owner, addr] = await ethers.getSigners();


        // 「ethers.getContractFactory([コントラクト名])」で「FirstContract」というコントラクトを取得する 
        FirstContract = await ethers.getContractFactory("FirstContract");
        
        // 「owner.address」アカウントで「FirstContract」をデプロイする 
        // 初期値を指定する：companyName = 「My Company」 、「age」 = 14
        firstContract = await FirstContract.deploy("My Company", 14);
    })
    
    /* 
        テストケースのタイトル：「Should return initialize correctly」
        初期値を確認する: companyName, age, owner 
    */
    it("Should return initialize correctly", async () => {
        /* 「companyName＝My Company」かを確認する
                ・companyName＝My Company：OK
                ・companyName！＝My Company：NG
        */
        expect(await firstContract.companyName()).to.equal("My Company");
        // 「age ＝ 14」かを確認する
        expect(await firstContract.age()).to.equal(14);
        // 「owner ＝ owner.address」かを確認する
        //　 (12行目で取得する)
        expect(await firstContract.owner()).to.equal(owner.address);
    })

    /* 
        テストケースのタイトル：「should allow updating companyName with owner address」
        「setCompanyName()」関数でcompanyName = "NewCompany" に更新する
    */
    it('should allow updating companyName with owner address', async() => {
        // 「owner」アカウントで companyName = "NewCompany" に更新する
        await firstContract.connect(owner).setCompanyName("NewCompany");
        /* 「companyName ＝ "NewCompany"」 かを確認する
                ・companyName＝NewCompany：OK
                ・companyName!＝NewCompany：NG
        */
        expect(await firstContract.companyName()).to.equal("NewCompany");
    })
    /* 
        テストケースのタイトル：「should not allow updating companyName without owner address"」
        「owner」以外のアカウントで「setCompanyName()」関数でcompanyName = "HackerCompany" に更新する
       「modifier onlyOwner」の条件を確認する： 
        コントラクトをデプロイするアカウント（owner）以外は「setCompanyName」が使用できない
         →　「Only Owner can use this function!!!」というエラーメッセージを返す
    */
    it('should not allow updating companyName without owner address', async() => {
        // 「addr」アカウントで companyName = "HackerCompany" に更新する
        // 「Only Owner can use this function!!!」エラーメッセージが返されるかを確認する
        await expect(
            firstContract.connect(addr).setCompanyName("HackerCompany")
          ).to.be.revertedWith("Only Owner can use this function!!!");
    })

    /* 
        テストケースのタイトル：「should allow anyone to update age"」
        「setAge()」関数で age = 10  に更新する
    */
    it('should allow anyone to update age', async() => {
        // 「owner」アカウントで setAge で age=10 に更新する
        await firstContract.setAge(10);
        // 「age = 10」かを確認する 
        expect(await firstContract.age()).to.equal(10);

        // 「addr」アカウントで setAge で age=15 に更新する
        await firstContract.connect(addr).setAge(15);
        // 「age = 15」かを確認する 
        expect(await firstContract.age()).to.equal(15);
    })

})