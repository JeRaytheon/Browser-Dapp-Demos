"use strict";
/*
 * Copyright 2018 NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const nem2_library_1 = require("nem2-library");
const Address_1 = require("./Address");
const PublicAccount_1 = require("./PublicAccount");
/**
 * The account structure describes an account private key, public key, address and allows signing transactions.
 */
class Account {
    /**
     * @internal
     * @param address
     * @param keyPair
     */
    constructor(
    /**
     * The account address.
     */
    address, 
    /**
     * The account keyPair, public and private key.
     */
    keyPair) {
        this.address = address;
        this.keyPair = keyPair;
    }
    /**
     * Create an Account from a given private key
     * @param privateKey - Private key from an account
     * @param networkType - Network type
     * @return {Account}
     */
    static createFromPrivateKey(privateKey, networkType) {
        const keyPair = nem2_library_1.KeyPair.createKeyPairFromPrivateKeyString(privateKey);
        const address = nem2_library_1.address.addressToString(nem2_library_1.address.publicKeyToAddress(keyPair.publicKey, networkType));
        return new Account(Address_1.Address.createFromRawAddress(address), keyPair);
    }
    static generateNewAccount(networkType) {
        // Create random bytes
        const randomBytesArray = nem2_library_1.nacl_catapult.randomBytes(32);
        // Hash random bytes with entropy seed
        // Finalize and keep only 32 bytes
        const hashKey = nem2_library_1.convert.uint8ToHex(randomBytesArray); // TODO: derive private key correctly
        // Create KeyPair from hash key
        const keyPair = nem2_library_1.KeyPair.createKeyPairFromPrivateKeyString(hashKey);
        const address = Address_1.Address.createFromPublicKey(nem2_library_1.convert.uint8ToHex(keyPair.publicKey), networkType);
        return new Account(address, keyPair);
    }
    /**
     * Account public key.
     * @return {string}
     */
    get publicKey() {
        return nem2_library_1.convert.uint8ToHex(this.keyPair.publicKey);
    }
    /**
     * Public account.
     * @return {PublicAccount}
     */
    get publicAccount() {
        return PublicAccount_1.PublicAccount.createFromPublicKey(this.publicKey, this.address.networkType);
    }
    /**
     * Account private key.
     * @return {string}
     */
    get privateKey() {
        return nem2_library_1.convert.uint8ToHex(this.keyPair.privateKey);
    }
    /**
     * Sign a transaction
     * @param transaction - The transaction to be signed.
     * @return {SignedTransaction}
     */
    sign(transaction) {
        return transaction.signWith(this);
    }
    /**
     * Sign transaction with cosignatories creating a new SignedTransaction
     * @param transaction - The aggregate transaction to be signed.
     * @param cosignatories - The array of accounts that will cosign the transaction
     * @return {SignedTransaction}
     */
    signTransactionWithCosignatories(transaction, cosignatories) {
        return transaction.signTransactionWithCosignatories(this, cosignatories);
    }
    /**
     * Sign aggregate signature transaction
     * @param cosignatureTransaction - The aggregate signature transaction.
     * @return {CosignatureSignedTransaction}
     */
    signCosignatureTransaction(cosignatureTransaction) {
        return cosignatureTransaction.signWith(this);
    }
    /**
     * Sign raw data
     * @param data - Data to be signed
     * @return {string} - Signed data result
     */
    signData(data) {
        return nem2_library_1.convert.uint8ToHex(nem2_library_1.KeyPair.sign(this.keyPair, nem2_library_1.convert.hexToUint8(nem2_library_1.convert.utf8ToHex(data))));
    }
}
exports.Account = Account;
//# sourceMappingURL=Account.js.map