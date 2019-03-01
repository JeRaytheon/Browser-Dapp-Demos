import { NamespaceId } from '../namespace/NamespaceId';
import { UInt64 } from '../UInt64';
import { Mosaic } from './Mosaic';
import { MosaicId } from './MosaicId';
/**
 * XEM mosaic
 */
export declare class XEM extends Mosaic {
    /**
     * Divisiblity
     * @type {number}
     */
    static DIVISIBILITY: number;
    /**
     * Initial supply
     * @type {number}
     */
    static INITIAL_SUPPLY: number;
    /**
     * Is tranferable
     * @type {boolean}
     */
    static TRANSFERABLE: boolean;
    /**
     * Is mutable
     * @type {boolean}
     */
    static SUPPLY_MUTABLE: boolean;
    /**
     * mosaicId
     * @type {Id}
     */
    static MOSAIC_ID: MosaicId;
    /**
     * namespaceId
     * @type {Id}
     */
    static NAMESPACE_ID: NamespaceId;
    /**
     * constructor
     * @param amount
     */
    private constructor();
    /**
     * Create xem with using xem as unit.
     *
     * @param amount
     * @returns {XEM}
     */
    static createRelative(amount: UInt64 | number): XEM;
    /**
     * Create xem with using micro xem as unit, 1 XEM = 1000000 micro XEM.
     *
     * @param amount
     * @returns {XEM}
     */
    static createAbsolute(amount: UInt64 | number): XEM;
}
