"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const nem2_library_1 = require("nem2-library");
const UInt64_1 = require("../UInt64");
const HashType_1 = require("./HashType");
const Transaction_1 = require("./Transaction");
const TransactionType_1 = require("./TransactionType");
class SecretLockTransaction extends Transaction_1.Transaction {
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param fee
     * @param mosaic
     * @param duration
     * @param hashType
     * @param secret
     * @param recipient
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType, version, deadline, fee, 
    /**
     * The locked mosaic.
     */
    mosaic, 
    /**
     * The duration for the funds to be released or returned.
     */
    duration, 
    /**
     * The hash algorithm, secret is generated with.
     */
    hashType, 
    /**
     * The proof hashed.
     */
    secret, 
    /**
     * The recipient of the funds.
     */
    recipient, signature, signer, transactionInfo) {
        super(TransactionType_1.TransactionType.SECRET_LOCK, networkType, version, deadline, fee, signature, signer, transactionInfo);
        this.mosaic = mosaic;
        this.duration = duration;
        this.hashType = hashType;
        this.secret = secret;
        this.recipient = recipient;
        if (!HashType_1.HashTypeLengthValidator(hashType, this.secret)) {
            throw new Error('HashType and Secret have incompatible length or not hexadecimal string');
        }
    }
    /**
     * Create a secret lock transaction object.
     *
     * @param deadline - The deadline to include the transaction.
     * @param mosaic - The locked mosaic.
     * @param duration - The funds lock duration.
     * @param hashType - The hash algorithm secret is generated with.
     * @param secret - The proof hashed.
     * @param recipient - The recipient of the funds.
     * @param networkType - The network type.
     *
     * @return a SecretLockTransaction instance
     */
    static create(deadline, mosaic, duration, hashType, secret, recipient, networkType) {
        return new SecretLockTransaction(networkType, 3, deadline, UInt64_1.UInt64.fromUint(0), mosaic, duration, hashType, secret, recipient);
    }
    /**
     * @internal
     * @returns {VerifiableTransaction}
     */
    buildTransaction() {
        return new nem2_library_1.SecretLockTransaction.Builder()
            .addDeadline(this.deadline.toDTO())
            .addType(this.type)
            .addFee(this.fee.toDTO())
            .addVersion(this.versionToDTO())
            .addMosaicId(this.mosaic.id.id.toDTO())
            .addMosaicAmount(this.mosaic.amount.toDTO())
            .addDuration(this.duration.toDTO())
            .addHashAlgorithm(this.hashType)
            .addSecret(this.secret)
            .addRecipient(this.recipient.plain())
            .build();
    }
}
exports.SecretLockTransaction = SecretLockTransaction;
//# sourceMappingURL=SecretLockTransaction.js.map