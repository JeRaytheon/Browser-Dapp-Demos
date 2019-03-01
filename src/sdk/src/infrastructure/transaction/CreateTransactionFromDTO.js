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
const Address_1 = require("../../model/account/Address");
const PublicAccount_1 = require("../../model/account/PublicAccount");
const NetworkType_1 = require("../../model/blockchain/NetworkType");
const Mosaic_1 = require("../../model/mosaic/Mosaic");
const MosaicId_1 = require("../../model/mosaic/MosaicId");
const MosaicProperties_1 = require("../../model/mosaic/MosaicProperties");
const NamespaceId_1 = require("../../model/namespace/NamespaceId");
const AggregateTransaction_1 = require("../../model/transaction/AggregateTransaction");
const AggregateTransactionCosignature_1 = require("../../model/transaction/AggregateTransactionCosignature");
const AggregateTransactionInfo_1 = require("../../model/transaction/AggregateTransactionInfo");
const Deadline_1 = require("../../model/transaction/Deadline");
const LockFundsTransaction_1 = require("../../model/transaction/LockFundsTransaction");
const ModifyMultisigAccountTransaction_1 = require("../../model/transaction/ModifyMultisigAccountTransaction");
const MosaicDefinitionTransaction_1 = require("../../model/transaction/MosaicDefinitionTransaction");
const MosaicSupplyChangeTransaction_1 = require("../../model/transaction/MosaicSupplyChangeTransaction");
const MultisigCosignatoryModification_1 = require("../../model/transaction/MultisigCosignatoryModification");
const PlainMessage_1 = require("../../model/transaction/PlainMessage");
const RegisterNamespaceTransaction_1 = require("../../model/transaction/RegisterNamespaceTransaction");
const SecretLockTransaction_1 = require("../../model/transaction/SecretLockTransaction");
const SecretProofTransaction_1 = require("../../model/transaction/SecretProofTransaction");
const SignedTransaction_1 = require("../../model/transaction/SignedTransaction");
const TransactionInfo_1 = require("../../model/transaction/TransactionInfo");
const TransactionType_1 = require("../../model/transaction/TransactionType");
const TransferTransaction_1 = require("../../model/transaction/TransferTransaction");
const UInt64_1 = require("../../model/UInt64");
/**
 * @internal
 * @param transactionDTO
 * @returns {Transaction}
 * @constructor
 */
exports.CreateTransactionFromDTO = (transactionDTO) => {
    if (transactionDTO.transaction.type === TransactionType_1.TransactionType.AGGREGATE_COMPLETE ||
        transactionDTO.transaction.type === TransactionType_1.TransactionType.AGGREGATE_BONDED) {
        const innerTransactions = transactionDTO.transaction.transactions.map((innerTransactionDTO) => {
            const aggregateTransactionInfo = innerTransactionDTO.meta ? new AggregateTransactionInfo_1.AggregateTransactionInfo(new UInt64_1.UInt64(innerTransactionDTO.meta.height), innerTransactionDTO.meta.index, innerTransactionDTO.meta.id, innerTransactionDTO.meta.aggregateHash, innerTransactionDTO.meta.aggregateId) : undefined;
            innerTransactionDTO.transaction.fee = transactionDTO.transaction.fee;
            innerTransactionDTO.transaction.deadline = transactionDTO.transaction.deadline;
            innerTransactionDTO.transaction.signature = transactionDTO.transaction.signature;
            return CreateStandaloneTransactionFromDTO(innerTransactionDTO.transaction, aggregateTransactionInfo);
        });
        return new AggregateTransaction_1.AggregateTransaction(extractNetworkType(transactionDTO.transaction.version), transactionDTO.transaction.type, extractTransactionVersion(transactionDTO.transaction.version), Deadline_1.Deadline.createFromDTO(transactionDTO.transaction.deadline), new UInt64_1.UInt64(transactionDTO.transaction.fee), innerTransactions, transactionDTO.transaction.cosignatures ? transactionDTO.transaction.cosignatures
            .map((aggregateCosignatureDTO) => {
            return new AggregateTransactionCosignature_1.AggregateTransactionCosignature(aggregateCosignatureDTO.signature, PublicAccount_1.PublicAccount.createFromPublicKey(aggregateCosignatureDTO.signer, extractNetworkType(transactionDTO.transaction.version)));
        }) : [], transactionDTO.transaction.signature, PublicAccount_1.PublicAccount.createFromPublicKey(transactionDTO.transaction.signer, extractNetworkType(transactionDTO.transaction.version)), new TransactionInfo_1.TransactionInfo(new UInt64_1.UInt64(transactionDTO.meta.height), transactionDTO.meta.index, transactionDTO.meta.id, transactionDTO.meta.hash, transactionDTO.meta.merkleComponentHash));
    }
    else {
        const transactionInfo = new TransactionInfo_1.TransactionInfo(new UInt64_1.UInt64(transactionDTO.meta.height), transactionDTO.meta.index, transactionDTO.meta.id, transactionDTO.meta.hash, transactionDTO.meta.merkleComponentHash);
        return CreateStandaloneTransactionFromDTO(transactionDTO.transaction, transactionInfo);
    }
};
/**
 * @internal
 * @param transactionDTO
 * @param transactionInfo
 * @returns {any}
 * @constructor
 */
const CreateStandaloneTransactionFromDTO = (transactionDTO, transactionInfo) => {
    if (transactionDTO.type === TransactionType_1.TransactionType.TRANSFER) {
        return new TransferTransaction_1.TransferTransaction(extractNetworkType(transactionDTO.version), extractTransactionVersion(transactionDTO.version), Deadline_1.Deadline.createFromDTO(transactionDTO.deadline), new UInt64_1.UInt64(transactionDTO.fee), Address_1.Address.createFromEncoded(transactionDTO.recipient), transactionDTO.mosaics === undefined ? [] :
            transactionDTO.mosaics
                .map((mosaicDTO) => new Mosaic_1.Mosaic(new MosaicId_1.MosaicId(mosaicDTO.id), new UInt64_1.UInt64(mosaicDTO.amount))), transactionDTO.message !== undefined ?
            PlainMessage_1.PlainMessage.createFromDTO(transactionDTO.message.payload) : PlainMessage_1.EmptyMessage, transactionDTO.signature, PublicAccount_1.PublicAccount.createFromPublicKey(transactionDTO.signer, extractNetworkType(transactionDTO.version)), transactionInfo);
    }
    else if (transactionDTO.type === TransactionType_1.TransactionType.REGISTER_NAMESPACE) {
        return new RegisterNamespaceTransaction_1.RegisterNamespaceTransaction(extractNetworkType(transactionDTO.version), extractTransactionVersion(transactionDTO.version), Deadline_1.Deadline.createFromDTO(transactionDTO.deadline), new UInt64_1.UInt64(transactionDTO.fee), transactionDTO.namespaceType, transactionDTO.name, new NamespaceId_1.NamespaceId(transactionDTO.namespaceId), transactionDTO.namespaceType === 0 ? new UInt64_1.UInt64(transactionDTO.duration) : undefined, transactionDTO.namespaceType === 1 ? new NamespaceId_1.NamespaceId(transactionDTO.parentId) : undefined, transactionDTO.signature, PublicAccount_1.PublicAccount.createFromPublicKey(transactionDTO.signer, extractNetworkType(transactionDTO.version)), transactionInfo);
    }
    else if (transactionDTO.type === TransactionType_1.TransactionType.MOSAIC_DEFINITION) {
        return new MosaicDefinitionTransaction_1.MosaicDefinitionTransaction(extractNetworkType(transactionDTO.version), extractTransactionVersion(transactionDTO.version), Deadline_1.Deadline.createFromDTO(transactionDTO.deadline), new UInt64_1.UInt64(transactionDTO.fee), new NamespaceId_1.NamespaceId(transactionDTO.parentId), new MosaicId_1.MosaicId(transactionDTO.mosaicId), transactionDTO.name, new MosaicProperties_1.MosaicProperties(new UInt64_1.UInt64(transactionDTO.properties[0].value), (new UInt64_1.UInt64(transactionDTO.properties[1].value)).compact(), new UInt64_1.UInt64(transactionDTO.properties.length === 3 ? transactionDTO.properties[2].value : [0, 0])), transactionDTO.signature, PublicAccount_1.PublicAccount.createFromPublicKey(transactionDTO.signer, extractNetworkType(transactionDTO.version)), transactionInfo);
    }
    else if (transactionDTO.type === TransactionType_1.TransactionType.MOSAIC_SUPPLY_CHANGE) {
        return new MosaicSupplyChangeTransaction_1.MosaicSupplyChangeTransaction(extractNetworkType(transactionDTO.version), extractTransactionVersion(transactionDTO.version), Deadline_1.Deadline.createFromDTO(transactionDTO.deadline), new UInt64_1.UInt64(transactionDTO.fee), new MosaicId_1.MosaicId(transactionDTO.mosaicId), transactionDTO.direction, new UInt64_1.UInt64(transactionDTO.delta), transactionDTO.signature, PublicAccount_1.PublicAccount.createFromPublicKey(transactionDTO.signer, extractNetworkType(transactionDTO.version)), transactionInfo);
    }
    else if (transactionDTO.type === TransactionType_1.TransactionType.MODIFY_MULTISIG_ACCOUNT) {
        return new ModifyMultisigAccountTransaction_1.ModifyMultisigAccountTransaction(extractNetworkType(transactionDTO.version), extractTransactionVersion(transactionDTO.version), Deadline_1.Deadline.createFromDTO(transactionDTO.deadline), new UInt64_1.UInt64(transactionDTO.fee), transactionDTO.minApprovalDelta, transactionDTO.minRemovalDelta, transactionDTO.modifications ? transactionDTO.modifications.map((modificationDTO) => new MultisigCosignatoryModification_1.MultisigCosignatoryModification(modificationDTO.type, PublicAccount_1.PublicAccount.createFromPublicKey(modificationDTO.cosignatoryPublicKey, extractNetworkType(transactionDTO.version)))) : [], transactionDTO.signature, PublicAccount_1.PublicAccount.createFromPublicKey(transactionDTO.signer, extractNetworkType(transactionDTO.version)), transactionInfo);
    }
    else if (transactionDTO.type === TransactionType_1.TransactionType.LOCK) {
        const networkType = extractNetworkType(transactionDTO.version);
        return new LockFundsTransaction_1.LockFundsTransaction(networkType, extractTransactionVersion(transactionDTO.version), Deadline_1.Deadline.createFromDTO(transactionDTO.deadline), new UInt64_1.UInt64(transactionDTO.fee), new Mosaic_1.Mosaic(new MosaicId_1.MosaicId(transactionDTO.mosaicId), new UInt64_1.UInt64(transactionDTO.amount)), new UInt64_1.UInt64(transactionDTO.duration), new SignedTransaction_1.SignedTransaction('', transactionDTO.hash, '', TransactionType_1.TransactionType.AGGREGATE_BONDED, networkType), transactionDTO.signature, PublicAccount_1.PublicAccount.createFromPublicKey(transactionDTO.signer, networkType), transactionInfo);
    }
    else if (transactionDTO.type === TransactionType_1.TransactionType.SECRET_LOCK) {
        return new SecretLockTransaction_1.SecretLockTransaction(extractNetworkType(transactionDTO.version), extractTransactionVersion(transactionDTO.version), Deadline_1.Deadline.createFromDTO(transactionDTO.deadline), new UInt64_1.UInt64(transactionDTO.fee), new Mosaic_1.Mosaic(new MosaicId_1.MosaicId(transactionDTO.mosaicId), new UInt64_1.UInt64(transactionDTO.amount)), new UInt64_1.UInt64(transactionDTO.duration), transactionDTO.hashAlgorithm, transactionDTO.secret, Address_1.Address.createFromEncoded(transactionDTO.recipient), transactionDTO.signature, PublicAccount_1.PublicAccount.createFromPublicKey(transactionDTO.signer, extractNetworkType(transactionDTO.version)), transactionInfo);
    }
    else if (transactionDTO.type === TransactionType_1.TransactionType.SECRET_PROOF) {
        return new SecretProofTransaction_1.SecretProofTransaction(extractNetworkType(transactionDTO.version), extractTransactionVersion(transactionDTO.version), Deadline_1.Deadline.createFromDTO(transactionDTO.deadline), new UInt64_1.UInt64(transactionDTO.fee), transactionDTO.hashAlgorithm, transactionDTO.secret, transactionDTO.proof, transactionDTO.signature, PublicAccount_1.PublicAccount.createFromPublicKey(transactionDTO.signer, extractNetworkType(transactionDTO.version)), transactionInfo);
    }
    throw new Error('Unimplemented transaction with type ' + transactionDTO.type);
};
const extractNetworkType = (version) => {
    const networkType = parseInt(version.toString(16).substr(0, 2), 16);
    if (networkType === NetworkType_1.NetworkType.MAIN_NET) {
        return NetworkType_1.NetworkType.MAIN_NET;
    }
    else if (networkType === NetworkType_1.NetworkType.TEST_NET) {
        return NetworkType_1.NetworkType.TEST_NET;
    }
    else if (networkType === NetworkType_1.NetworkType.MIJIN) {
        return NetworkType_1.NetworkType.MIJIN;
    }
    else if (networkType === NetworkType_1.NetworkType.MIJIN_TEST) {
        return NetworkType_1.NetworkType.MIJIN_TEST;
    }
    throw new Error('Unimplemented network type');
};
const extractTransactionVersion = (version) => {
    return parseInt(version.toString(16).substr(2, 2), 16);
};
//# sourceMappingURL=CreateTransactionFromDTO.js.map