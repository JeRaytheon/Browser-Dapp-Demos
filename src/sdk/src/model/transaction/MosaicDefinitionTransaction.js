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
const MosaicId_1 = require("../mosaic/MosaicId");
const NamespaceId_1 = require("../namespace/NamespaceId");
const UInt64_1 = require("../UInt64");
const Transaction_1 = require("./Transaction");
const TransactionType_1 = require("./TransactionType");
/**
 * Before a mosaic can be created or transferred, a corresponding definition of the mosaic has to be created and published to the network.
 * This is done via a mosaic definition transaction.
 */
class MosaicDefinitionTransaction extends Transaction_1.Transaction {
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param fee
     * @param parentId
     * @param mosaicId
     * @param mosaicName
     * @param mosaicProperties
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType, version, deadline, fee, 
    /**
     * The namespace id.
     */
    parentId, 
    /**
     * The mosaic id.
     */
    mosaicId, 
    /**
     * The name of the mosaic.
     */
    mosaicName, 
    /**
     * The mosaic properties.
     */
    mosaicProperties, signature, signer, transactionInfo) {
        super(TransactionType_1.TransactionType.MOSAIC_DEFINITION, networkType, version, deadline, fee, signature, signer, transactionInfo);
        this.parentId = parentId;
        this.mosaicId = mosaicId;
        this.mosaicName = mosaicName;
        this.mosaicProperties = mosaicProperties;
    }
    /**
     * Create a mosaic creation transaction object
     * @param deadline - The deadline to include the transaction.
     * @param mosaicName - The mosaic name ex: xem.
     * @param namespaceName - The namespace where mosaic will be included ex: nem.
     * @param mosaicProperties - The mosaic properties.
     * @param networkType - The network type.
     * @returns {MosaicDefinitionTransaction}
     */
    static create(deadline, mosaicName, namespaceName, mosaicProperties, networkType) {
        return new MosaicDefinitionTransaction(networkType, 2, deadline, new UInt64_1.UInt64([0, 0]), new NamespaceId_1.NamespaceId(namespaceName), new MosaicId_1.MosaicId(nem2_library_1.mosaicId(namespaceName, mosaicName)), mosaicName, mosaicProperties);
    }
    /**
     * @internal
     * @returns {VerifiableTransaction}
     */
    buildTransaction() {
        let mosaicDefinitionTransaction = new nem2_library_1.MosaicCreationTransaction.Builder()
            .addDeadline(this.deadline.toDTO())
            .addFee(this.fee.toDTO())
            .addVersion(this.versionToDTO())
            .addDivisibility(this.mosaicProperties.divisibility)
            .addDuration(this.mosaicProperties.duration.toDTO())
            .addParentId(this.parentId.id.toDTO())
            .addMosaicId(this.mosaicId.id.toDTO())
            .addMosaicName(this.mosaicName);
        if (this.mosaicProperties.supplyMutable === true) {
            mosaicDefinitionTransaction = mosaicDefinitionTransaction.addSupplyMutable();
        }
        if (this.mosaicProperties.transferable === true) {
            mosaicDefinitionTransaction = mosaicDefinitionTransaction.addTransferability();
        }
        if (this.mosaicProperties.levyMutable === true) {
            mosaicDefinitionTransaction = mosaicDefinitionTransaction.addLevyMutable();
        }
        return mosaicDefinitionTransaction.build();
    }
}
exports.MosaicDefinitionTransaction = MosaicDefinitionTransaction;
//# sourceMappingURL=MosaicDefinitionTransaction.js.map