import { Observable } from 'rxjs';
import { MosaicId } from '../model/mosaic/MosaicId';
import { MosaicInfo } from '../model/mosaic/MosaicInfo';
import { MosaicName } from '../model/mosaic/MosaicName';
import { NamespaceId } from '../model/namespace/NamespaceId';
import { Http } from './Http';
import { MosaicRepository } from './MosaicRepository';
import { NetworkHttp } from './NetworkHttp';
import { QueryParams } from './QueryParams';
/**
 * Mosaic http repository.
 *
 * @since 1.0
 */
export declare class MosaicHttp extends Http implements MosaicRepository {
    /**
     * Constructor
     * @param url
     * @param networkHttp
     */
    constructor(url: string, networkHttp?: NetworkHttp);
    /**
     * Gets the MosaicInfo for a given mosaicId
     * @param mosaicId - Mosaic id
     * @returns Observable<MosaicInfo>
     */
    getMosaic(mosaicId: MosaicId): Observable<MosaicInfo>;
    /**
     * Gets MosaicInfo for different mosaicIds.
     * @param mosaicIds - Array of mosaic ids
     * @returns Observable<MosaicInfo[]>
     */
    getMosaics(mosaicIds: MosaicId[]): Observable<MosaicInfo[]>;
    /**
     * Gets array of MosaicInfo from mosaics created with provided namespace
     * @param namespaceId - Namespace id
     * @param queryParams - (Optional) Query params
     * @returns Observable<MosaicInfo[]>
     */
    getMosaicsFromNamespace(namespaceId: NamespaceId, queryParams?: QueryParams): Observable<MosaicInfo[]>;
    /**
     * Gets array of MosaicName for different mosaicIds
     * @param mosaicIds - Array of mosaic ids
     * @returns Observable<MosaicName[]>
     */
    getMosaicsName(mosaicIds: MosaicId[]): Observable<MosaicName[]>;
}
