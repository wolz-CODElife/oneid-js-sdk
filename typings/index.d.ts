import SSO from "./lib/SSO";
declare class OneId extends SSO {
    static OneId: OneId;
    /**
     * Call this method to initialize all OneID instances.
     *
     * @param {object} options Your OneID API key and Redirect URL.
     * @example OneId.start({ apiKey, siteDomain })
     * @static
     */
    static start(options: {
        /**
         * Your OneID API key
         */
        apiKey: string;
        /**
         * Your site domain
         */
        siteDomain: string;
    }): void;
}
export default OneId;
//# sourceMappingURL=index.d.ts.map