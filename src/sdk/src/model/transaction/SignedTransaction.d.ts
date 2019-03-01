import { NetworkType } from '../blockchain/NetworkType';
/**
 * SignedTransaction object is used to transfer the transaction data and the signature to NIS
 * in order to initiate and broadcast a transaction.
 */
export declare class SignedTransaction {
    /**
                 * Transaction serialized data
                 */ readonly payload: string;
    /**
     * Transaction hash
     */
    readonly hash: string;
    /**
     * Transaction signer
     */
    readonly signer: string;
    /**
     * Transaction type
     */
    readonly type: number;
    /**
     * Signer network type
     */
    readonly networkType: NetworkType;
}