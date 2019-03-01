import { Observable } from 'rxjs';
import { MosaicId } from '../model/mosaic/MosaicId';
import { MosaicInfo } from '../model/mosaic/MosaicInfo';
import { MosaicName } from '../model/mosaic/MosaicName';
import { NamespaceId } from '../model/namespace/NamespaceId';
import { QueryParams } from './QueryParams';
/**
 * Mosaic interface repository.
 *
 * @since 1.0
 */
export interface MosaicRepository {
    /**
     * Gets a MosaicInfo for a given mosaicId
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
