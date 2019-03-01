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
class SecretProofTransaction extends Transaction_1.Transaction {
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param fee
     * @param hashType
     * @param secret
     * @param proof
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType, version, deadline, fee, hashType, secret, proof, signature, signer, transactionInfo) {
        super(TransactionType_1.TransactionType.SECRET_PROOF, networkType, version, deadline, fee, signature, signer, transactionInfo);
        this.hashType = hashType;
        this.secret = secret;
        this.proof = proof;
        if (!HashType_1.HashTypeLengthValidator(hashType, this.secret)) {
            throw new Error('HashType and Secret have incompatible length or not hexadecimal string');
        }
    }
    /**
     * Create a secret proof transaction object.
     *
     * @param deadline - The deadline to include the transaction.
     * @param hashType - The hash algorithm secret is generated with.
     * @param secret - The seed proof hashed.
     * @param proof - The seed proof.
     * @param networkType - The network type.
     *
     * @return a SecretProofTransaction instance
     */
    static create(deadline, hashType, secret, proof, networkType) {
        return new SecretProofTransaction(networkType, 3, deadline, UInt64_1.UInt64.fromUint(0), hashType, secret, proof);
    }
    /**
     * @internal
     * @returns {VerifiableTransaction}
     */
    buildTransaction() {
        return new nem2_library_1.SecretProofTransaction.Builder()
            .addDeadline(this.deadline.toDTO())
            .addType(this.type)
            .addFee(this.fee.toDTO())
            .addVersion(this.versionToDTO())
            .addHashAlgorithm(this.hashType)
            .addSecret(this.secret)
            .addProof(this.proof)
            .build();
    }
}
exports.SecretProofTransaction = SecretProofTransaction;
//# sourceMappingURL=SecretProofTransaction.js.map