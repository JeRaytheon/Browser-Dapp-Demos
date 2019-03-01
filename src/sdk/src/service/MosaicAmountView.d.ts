import { MosaicInfo } from '../model/mosaic/MosaicInfo';
import { UInt64 } from '../model/UInt64';
/**
 * Class representing mosaic view information with amount
 */
export declare class MosaicAmountView {
    /**
                 * The mosaic information
                 */ readonly mosaicInfo: MosaicInfo;
    /**
     * The parent namespace name
     */
    readonly namespaceName: string;
    /**
     * The mosaic name
     */
    readonly mosaicName: string;
    /**
     * The amount of absolute mosaics we have
     */
    readonly amount: UInt64;
    /**
     * @param mosaicInfo
     * @param namespaceName
     * @param mosaicName
     * @param amount
     */
    constructor(/**
                     * The mosaic information
                     */ mosaicInfo: MosaicInfo, 
        /**
         * The parent namespace name
         */
        namespaceName: string, 
        /**
         * The mosaic name
         */
        mosaicName: string, 
        /**
         * The amount of absolute mosaics we have
         */
        amount: UInt64);
    /**
     * Relative amount dividing amount by the divisibility
     * @returns {string}
     */
    relativeAmount(): number;
    /**
     * Namespace and mosaic description
     * @returns {string}
     */
    fullName(): string;
}
