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
     * @example OneId.start({ apiKey, redirectURL })
     * @static
     */
    static async start(options) {
        const { apiKey, redirectURL } = options;
        if (!redirectURL) {
        throw new Error(`OneId.start failed: redirectURL is required`);
        }
        if (!apiKey) {
        throw new Error(`OneId.start failed: apiKey is required`);
        }
        
        this.initialize({ apiKey, redirectURL , OneId });
        this.redirectURL = redirectURL
        this.apiKey = apiKey
    }
}

OneId.OneId = OneId;

export default OneId;