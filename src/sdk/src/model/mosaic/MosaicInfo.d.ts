import { PublicAccount } from '../account/PublicAccount';
import { UInt64 } from '../UInt64';
import { MosaicProperties } from './MosaicProperties';
import { NamespaceId } from '../namespace/NamespaceId';
import { MosaicId } from './MosaicId';
/**
 * The mosaic info structure describes a mosaic.
 */
export declare class MosaicInfo {
    /**
                 * Mosaic is active.
                 */ readonly active: boolean;
    /**
     * The mosaic index.
     */
    readonly index: number;
    /**
     * The meta data id.
     */
    readonly metaId: string;
    /**
     * The namespace id.
     */
    readonly namespaceId: NamespaceId;
    /**
     * The mosaic id.
     */
    readonly mosaicId: MosaicId;
    /**
     * The mosaic supply.
     */
    readonly supply: UInt64;
    /**
     * The block height were mosaic was created.
     */
    readonly height: UInt64;
    /**
     * The public key of the mosaic creator.
     */
    readonly owner: PublicAccount;
    /**
     * The mosaic properties.
     */
    private readonly properties;
    /**
     * The optional levy for the mosaic. A creator can demand that each mosaic transfer induces an additional fee.
     */
    readonly levy: any;
    /**
     * @param active
     * @param index
     * @param metaId
     * @param namespaceId
     * @param mosaicId
     * @param supply
     * @param height
     * @param owner
     * @param properties
     * @param levy
     */
    constructor(/**
                     * Mosaic is active.
                     */ active: boolean, 
        /**
         * The mosaic index.
         */
        index: number, 
        /**
         * The meta data id.
         */
        metaId: string, 
        /**
         * The namespace id.
         */
        namespaceId: NamespaceId, 
        /**
         * The mosaic id.
         */
        mosaicId: MosaicId, 
        /**
         * The mosaic supply.
         */
        supply: UInt64, 
        /**
         * The block height were mosaic was created.
         */
        height: UInt64, 
        /**
         * The public key of the mosaic creator.
         */
        owner: PublicAccount, 
        /**
         * The mosaic properties.
         */
        properties: MosaicProperties, 
        /**
         * The optional levy for the mosaic. A creator can demand that each mosaic transfer induces an additional fee.
         */
        levy: any);
    /**
     * Mosaic divisibility
     * @returns {number}
     */
    readonly divisibility: number;
    /**
     * Mosaic duration
     * @returns {UInt64}
     */
    readonly duration: UInt64;
    /**
     * Is mosaic supply mutable
     * @returns {boolean}
     */
    isSupplyMutable(): boolean;
    /**
     * Is mosaic transferable
     * @returns {boolean}
     */
    isTransferable(): boolean;
    /**
     * Is levy mutable
     * @returns {boolean}
     */
    isLevyMutable(): boolean;
}
