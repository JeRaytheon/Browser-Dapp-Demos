import { MosaicInfo } from '../model/mosaic/MosaicInfo';
/**
 * Class representing mosaic view information
 */
export declare class MosaicView {
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
     * Namespace and mosaic description
     * @returns {string}
     */
    fullName(): string;
}
