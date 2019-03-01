import { NamespaceId } from '../namespace/NamespaceId';
import { MosaicId } from './MosaicId';
/**
 * The mosaic name info structure describes basic information of a mosaic and name.
 */
export declare class MosaicName {
    /**
                 * The mosaic id.
                 */ readonly mosaicId: MosaicId;
    /**
     * The namespace id.
     */
    readonly namespaceId: NamespaceId;
    /**
     * The mosaic name.
     */
    readonly name: string;
    /**
     * @param mosaicId
     * @param namespaceId
     * @param name
     */
    constructor(/**
                     * The mosaic id.
                     */ mosaicId: MosaicId, 
        /**
         * The namespace id.
         */
        namespaceId: NamespaceId, 
        /**
         * The mosaic name.
         */
        name: string);
}
