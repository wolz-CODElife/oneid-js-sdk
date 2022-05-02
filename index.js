import SSO from "./lib/SSO.js";

/**
 * Contains all OneID API classes and functions.
 *
 * @static
 * @global
 * @class
 * @hideconstructor
 */
class OneId extends SSO {
    
    /**
     * Call this method to initialize all OneID instances.
     *
     * @param {object} options Your OneID API key and Redirect URL. 
     * @example OneId.start({ apiKey, siteDomain })
     * @static
     */
    static async start(options) {
        const { apiKey, siteDomain } = options;
        if (!siteDomain) {
        throw new Error(`OneId.start failed: siteDomain is required`);
        }
        if (!apiKey) {
        throw new Error(`OneId.start failed: apiKey is required`);
        }
        
        this.initialize({ apiKey, siteDomain , OneId });
        this.siteDomain = siteDomain
        this.apiKey = apiKey
    }
}

OneId.OneId = OneId;

export default OneId;