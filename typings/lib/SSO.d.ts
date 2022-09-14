export interface UserProps {
    _id: string;
    username: string;
    email: string;
    oneId: string;
    profile?: {
        [key: string]: any;
    };
}
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
    static get baseURL(): string;
    private static siteDomain;
    private static apiKey;
    private static token;
    private static user;
    /**
     *
     * Call this method to initialize all OneId instances.
     *
     */
    static initialize({ apiKey, siteDomain, }: {
        /**
         * Your OneID API key
         */
        apiKey: string;
        /**
         * Your site domain
         */
        siteDomain: string;
    }): void;
    /**
     *
     * Call this method to handle authentication with OneId.
     *
     * @param {object} options - An object containing `type` and `scope`
     * @param {("login" | "signup")} options.type
     * @param {("profile" | "basic" | "advance")} options.scope
     * @returns {{token: string, user: object}} User - Object of current user
     */
    static handleAuth({ type, scope, }?: {
        type?: "login" | "signup";
        scope?: "profile" | "basic" | "advance";
    }): Promise<{
        token: string;
        user: UserProps;
    }>;
    static get isAuthenticated(): boolean;
    static currentUser(): {
        token: string;
        user: UserProps;
    };
    /**
     * Call this method to remove all instance of the current user
     *
     */
    static Logout(): void;
}
export default SSO;
//# sourceMappingURL=SSO.d.ts.map