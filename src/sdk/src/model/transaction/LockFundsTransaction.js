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
const UInt64_1 = require("../UInt64");
const Transaction_1 = require("./Transaction");
const TransactionType_1 = require("./TransactionType");
/**
 * Lock funds transaction is used before sending an Aggregate bonded transaction, as a deposit to announce the transaction.
 * When aggregate bonded transaction is confirmed funds are returned to LockFundsTransaction signer.
 *
 * @since 1.0
 */
class LockFundsTransaction extends Transaction_1.Transaction {
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param fee
     * @param mosaic
     * @param duration
     * @param signedTransaction
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
     * The funds lock duration.
     */
    duration, signedTransaction, signature, signer, transactionInfo) {
        super(TransactionType_1.TransactionType.LOCK, networkType, version, deadline, fee, signature, signer, transactionInfo);
        this.mosaic = mosaic;
        this.duration = duration;
        this.hash = signedTransaction.hash;
        if (signedTransaction.type !== TransactionType_1.TransactionType.AGGREGATE_BONDED) {
            throw new Error('Signed transaction must be Aggregate Bonded Transaction');
        }
    }
    /**
     * Create a Lock funds transaction object
     * @param deadline - The deadline to include the transaction.
     * @param mosaic - The locked mosaic.
     * @param duration - The funds lock duration.
     * @param signedTransaction - The signed transaction for which funds are locked.
     * @param networkType - The network type.
     */
    static create(deadline, mosaic, duration, signedTransaction, networkType) {
        return new LockFundsTransaction(networkType, 3, deadline, UInt64_1.UInt64.fromUint(0), mosaic, duration, signedTransaction);
    }
    /**
     * @internal
     * @return {VerifiableTransaction}
     */
    buildTransaction() {
        return new nem2_library_1.HashLockTransaction.Builder()
            .addDeadline(this.deadline.toDTO())
            .addType(this.type)
            .addFee(this.fee.toDTO())
            .addVersion(this.versionToDTO())
            .addMosaicId(this.mosaic.id.id.toDTO())
            .addMosaicAmount(this.mosaic.amount.toDTO())
            .addDuration(this.duration.toDTO())
            .addHash(this.hash)
            .build();
    }
}
exports.LockFundsTransaction = LockFundsTransaction;
//# sourceMappingURL=LockFundsTransaction.js.map