import SSO from "./lib/SSO";
class OneId extends SSO {
    /**
     * Call this method to initialize all OneID instances.
     *
     * @param {object} options Your OneID API key and Redirect URL.
     * @example OneId.start({ apiKey, siteDomain })
     * @static
     */
    static start(options) {
        const { apiKey, siteDomain } = options;
        if (!siteDomain) {
            throw new Error(`OneId.start failed: siteDomain is required`);
        }
        if (!apiKey) {
            throw new Error(`OneId.start failed: apiKey is required`);
        }
        this.initialize({ apiKey, siteDomain });
    }
}
OneId.OneId = OneId;
export default OneId;
