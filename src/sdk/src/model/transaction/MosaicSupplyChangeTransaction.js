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
 * In case a mosaic has the flag 'supplyMutable' set to true, the creator of the mosaic can change the supply,
 * i.e. increase or decrease the supply.
 */
class MosaicSupplyChangeTransaction extends Transaction_1.Transaction {
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param fee
     * @param mosaicId
     * @param direction
     * @param delta
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType, version, deadline, fee, 
    /**
     * The mosaic id.
     */
    mosaicId, 
    /**
     * The supply type.
     */
    direction, 
    /**
     * The supply change in units for the mosaic.
     */
    delta, signature, signer, transactionInfo) {
        super(TransactionType_1.TransactionType.MOSAIC_SUPPLY_CHANGE, networkType, version, deadline, fee, signature, signer, transactionInfo);
        this.mosaicId = mosaicId;
        this.direction = direction;
        this.delta = delta;
    }
    /**
     * Create a mosaic supply change transaction object
     * @param deadline - The deadline to include the transaction.
     * @param mosaicId - The mosaic id.
     * @param direction - The supply type.
     * @param delta - The supply change in units for the mosaic.
     * @param networkType - The network type.
     * @returns {MosaicSupplyChangeTransaction}
     */
    static create(deadline, mosaicId, direction, delta, networkType) {
        return new MosaicSupplyChangeTransaction(networkType, 2, deadline, new UInt64_1.UInt64([0, 0]), mosaicId, direction, delta);
    }
    /**
     * @internal
     * @returns {VerifiableTransaction}
     */
    buildTransaction() {
        return new nem2_library_1.MosaicSupplyChangeTransaction.Builder()
            .addDeadline(this.deadline.toDTO())
            .addFee(this.fee.toDTO())
            .addVersion(this.versionToDTO())
            .addMosaicId(this.mosaicId.id.toDTO())
            .addDirection(this.direction)
            .addDelta(this.delta.toDTO())
            .build();
    }
}
exports.MosaicSupplyChangeTransaction = MosaicSupplyChangeTransaction;
//# sourceMappingURL=MosaicSupplyChangeTransaction.js.map