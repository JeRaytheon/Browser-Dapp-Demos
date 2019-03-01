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
 * Transfer transactions contain data about transfers of mosaics and message to another account.
 */
class TransferTransaction extends Transaction_1.Transaction {
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param fee
     * @param recipient
     * @param mosaics
     * @param message
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType, version, deadline, fee, 
    /**
     * The address of the recipient.
     */
    recipient, 
    /**
     * The array of Mosaic objects.
     */
    mosaics, 
    /**
     * The transaction message of 2048 characters.
     */
    message, signature, signer, transactionInfo) {
        super(TransactionType_1.TransactionType.TRANSFER, networkType, version, deadline, fee, signature, signer, transactionInfo);
        this.recipient = recipient;
        this.mosaics = mosaics;
        this.message = message;
    }
    /**
     * Create a transfer transaction object
     * @param deadline - The deadline to include the transaction.
     * @param recipient - The recipient of the transaction.
     * @param mosaics - The array of mosaics.
     * @param message - The transaction message.
     * @param networkType - The network type.
     * @returns {TransferTransaction}
     */
    static create(deadline, recipient, mosaics, message, networkType) {
        return new TransferTransaction(networkType, 3, deadline, new UInt64_1.UInt64([0, 0]), recipient, mosaics, message);
    }
    /**
     * @internal
     * @returns {VerifiableTransaction}
     */
    buildTransaction() {
        return new nem2_library_1.TransferTransaction.Builder()
            .addDeadline(this.deadline.toDTO())
            .addFee(this.fee.toDTO())
            .addVersion(this.versionToDTO())
            .addRecipient(this.recipient.plain())
            .addMosaics(this.mosaics.map((mosaic) => mosaic.toDTO()))
            .addMessage(this.message)
            .build();
    }
}
exports.TransferTransaction = TransferTransaction;
//# sourceMappingURL=TransferTransaction.js.map