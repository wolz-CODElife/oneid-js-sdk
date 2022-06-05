export default SSO;
/**
*
* Automatically generated code, via SSO.js
*
* Do not modify manually
*
*/
declare class SSO {
    /**
    *  The default URL string for send requests to OneID API
    */
    static baseURL: string;
    /**
    *
    * Call this method to initialize all OneId instances.
    *
    * @param {object} options - An object containing `siteDomain` and `apiKey`
    * @param {string} options.apiKey
    * @param {string} options.siteDomain
    */
    static initialize({ apiKey, siteDomain, OneId }: {
        apiKey: string;
        siteDomain: string;
    }): void;
    /**
     * @typedef AuthResponse
     * @param {object} - an object containing user properties
     */
    /**
    *
    * Call this method to handle authentication with OneId.
    *
    * @param {object} options - An object containing `type` and `scope`
    * @param {("login" | "signup")} options.type
    * @param {("profile" | "basic" | "advance")} options.scope
    * @returns {Promise<AuthResponse|Error>}
    */
    static handleAuth({ type, scope }: {
        type: ("login" | "signup");
        scope: ("profile" | "basic" | "advance");
    }): Promise<any>;
    /**
     * Call this method to check if user's token or object is not undefined
     *
     * @returns {boolean} true || false
     */
    static isAuthenticated(): boolean;
    /**
     * Call this method to check if user's token or object is not undefined
     *
     * @returns {{token: string, user: object}} User - Object of current user
     */
    static currentUser(): {
        token: string;
        user: object;
    };
    /**
     * Call this method to remove all instance of the current user
     *
     */
    static Logout(): void;
}
//# sourceMappingURL=SSO.d.ts.map