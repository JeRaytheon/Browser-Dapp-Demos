import { PublicAccount } from '../account/PublicAccount';
import { NetworkType } from '../blockchain/NetworkType';
import { MosaicId } from '../mosaic/MosaicId';
import { MosaicProperties } from '../mosaic/MosaicProperties';
import { NamespaceId } from '../namespace/NamespaceId';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
/**
 * Before a mosaic can be created or transferred, a corresponding definition of the mosaic has to be created and published to the network.
 * This is done via a mosaic definition transaction.
 */
export declare class MosaicDefinitionTransaction extends Transaction {
    /**
     * The namespace id.
     */
    readonly parentId: NamespaceId;
    /**
     * The mosaic id.
     */
    readonly mosaicId: MosaicId;
    /**
     * The name of the mosaic.
     */
    readonly mosaicName: string;
    /**
     * The mosaic properties.
     */
    readonly mosaicProperties: MosaicProperties;
    /**
     * Create a mosaic creation transaction object
     * @param deadline - The deadline to include the transaction.
     * @param mosaicName - The mosaic name ex: xem.
     * @param namespaceName - The namespace where mosaic will be included ex: nem.
     * @param mosaicProperties - The mosaic properties.
     * @param networkType - The network type.
     * @returns {MosaicDefinitionTransaction}
     */
    static create(deadline: Deadline, mosaicName: string, namespaceName: string, mosaicProperties: MosaicProperties, networkType: NetworkType): MosaicDefinitionTransaction;
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
    constructor(networkType: NetworkType, version: number, deadline: Deadline, fee: UInt64, 
        /**
         * The namespace id.
         */
        parentId: NamespaceId, 
        /**
         * The mosaic id.
         */
        mosaicId: MosaicId, 
        /**
         * The name of the mosaic.
         */
        mosaicName: string, 
        /**
         * The mosaic properties.
         */
        mosaicProperties: MosaicProperties, signature?: string, signer?: PublicAccount, transactionInfo?: TransactionInfo);
}
