/**
 * The blockchain storage info structure describes stored data.
 */
export declare class BlockchainStorageInfo {
    /**
                 * The number accounts published in the blockchain.
                 */ readonly numAccounts: number;
    /**
     * The number of confirmed blocks.
     */
    readonly numBlocks: number;
    /**
     * The number of confirmed transactions.
     */
    readonly numTransactions: number;
    /**
     * @param numAccounts
     * @param numBlocks
     * @param numTransactions
     */
    constructor(/**
                     * The number accounts published in the blockchain.
                     */ numAccounts: number, 
        /**
         * The number of confirmed blocks.
         */
        numBlocks: number, 
        /**
         * The number of confirmed transactions.
         */
        numTransactions: number);
}
