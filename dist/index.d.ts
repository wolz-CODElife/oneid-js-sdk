export default OneId;
/**
 * Contains all OneID API classes and functions.
 *
 * @static
 * @global
 * @class
 * @hideconstructor
 */
declare class OneId extends SSO {
    /**
     * Call this method to initialize all OneID instances.
     *
     * @param {object} options Your OneID API key and Redirect URL.
     * @example OneId.start({ apiKey, siteDomain })
     * @static
     */
    static start(options: object): Promise<void>;
}
declare namespace OneId {
    export const siteDomain: any;
    export const apiKey: any;
    export { OneId };
}
import SSO from "./lib/SSO.js";
//# sourceMappingURL=index.d.ts.map