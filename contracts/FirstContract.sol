// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.9;

contract FirstContract {
    // 次の変数を宣言する： companyName (会社名), age (年齢) và owner(コントラクトをデプロイするアカウントのウォレットアドレス)
    string public companyName;
    uint256 public age;
    address public owner;

    // コントラクトをデプロイする前に初期値を指定する
    constructor(string memory _initName, uint _initAge) {
        companyName = _initName;
        age = _initAge;
        owner = msg.sender;
    }

    // 「onlyOwner」という modifier 関数を宣言する → ownerのみ使用できるように制限する
    modifier onlyOwner() {
        require(msg.sender == owner, "Only Owner can use this function!!!");
        _;
    }

    // 「companyName」変数に値を代入する関数
    //　Ownerのみこの関数を使用できる
    function setCompanyName(string memory _name) public onlyOwner {
        companyName = _name;
    }

    // 「age」変数に値を代入する関数
    //　使用制限がない
    function setAge(uint _age) public {
        age = _age;
    }
}
