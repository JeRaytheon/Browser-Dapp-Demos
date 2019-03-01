import * as $ from 'jquery';
import {
    Account, NetworkType, AccountHttp, NamespaceHttp, AccountInfo, TransactionHttp,
    TransferTransaction, Deadline, Address, XEM, Message, PlainMessage, Transaction, MosaicHttp, NamespaceId, MosaicId, MosaicAmountView, UInt64, PublicAccount, MosaicProperties, MosaicDefinitionTransaction, MosaicSupplyChangeTransaction, MosaicSupplyType, AggregateTransaction, RegisterNamespaceTransaction
} from './sdk';
import { url } from 'inspector';
import { NamespaceCreationTransaction } from 'nem2-library';



(async function initPro() {
    console.log("初始化项目");
    //  点击事件
    $('#create_account_Button').click(function () {
        console.log("点击创建用户");
        generateNewAccount();
    });
    $('#announce_button').click(function () {
        console.log("点击交易");
        transferTransaction();
    });
    $('#login_button').click(function () {
        console.log("查看信息");
        getMessage();
    });
    //创建新账户
    async function generateNewAccount() {
        const netWorkTypeStr = $('#create_account_networkType').val().toString();
        let netWorkType: number = 144
        if (netWorkTypeStr == 'MAIN_NET') netWorkType = 104;
        if (netWorkTypeStr == 'TEST_NET') netWorkType = 152;
        if (netWorkTypeStr == 'MIJIN') netWorkType = 96;
        if (netWorkTypeStr == 'MIJIN_TEST') netWorkType = 144;
        const newAccount: Account = await Account.generateNewAccount(netWorkType);
        $("#showPrivateKey").text(newAccount.privateKey);
        $("#showAddress").text(newAccount.address.plain());
        $("#showPublicKey").text(newAccount.publicKey);
    }
    //获取信息
    async function getMessage() {
        const endPoint = $('#endPoint').val().toString();
        const prkey = $('#login_privateKey').val().toString();
        const netWorkTypeStr = $('#create_account_networkType').val().toString();
        let netWorkType: number = 144
        if (netWorkTypeStr == 'MAIN_NET') netWorkType = 104;
        if (netWorkTypeStr == 'TEST_NET') netWorkType = 152;
        if (netWorkTypeStr == 'MIJIN') netWorkType = 96;
        if (netWorkTypeStr == 'MIJIN_TEST') netWorkType = 144;
        const account: Account = await Account.createFromPrivateKey(prkey, netWorkType);
        $("#loginShowAddress").text(account.address.plain());
        //与结点建立通信
        try {
            const accountInfo: AccountInfo = await new AccountHttp(endPoint).getAccountInfo(account.address).toPromise();
            $("#loginShowPublicKey").text(accountInfo.publicKey);
        } catch (error) {
        }
    }
    //交易
    async function transferTransaction() {
        const prkey = $('#login_privateKey').val().toString();
        const endPoint = $('#endPoint').val().toString();
        const toAddress = $('#to_address').val().toString();
        const toAbsoluteAmount = $('#to_absoluteAmount').val().toString();
        const toMessage = $('#to_message').val().toString();
        const netWorkTypeStr = $('#create_account_networkType').val().toString();
        let netWorkType: number = 144;
        if (netWorkTypeStr == 'MAIN_NET') netWorkType = 104;
        if (netWorkTypeStr == 'TEST_NET') netWorkType = 152;
        if (netWorkTypeStr == 'MIJIN') netWorkType = 96;
        if (netWorkTypeStr == 'MIJIN_TEST') netWorkType = 144;

        const account = await Account.createFromPrivateKey(prkey, netWorkType);
        const param1 = await Deadline.create(20);
        const param2 = await Address.createFromRawAddress(toAddress);
        const param3 = await XEM.createRelative(Number.parseInt(toAbsoluteAmount));
        const param4 = await PlainMessage.create(toMessage);
        const tx: TransferTransaction = await TransferTransaction.create(param1, param2, [param3], param4, netWorkType);
        const data = await account.sign(tx);
        new TransactionHttp(endPoint).announce(data);
    }
})();

