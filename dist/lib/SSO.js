import { openSignInWindow } from "./utils";
const baseURL = "https://auth.oneidtech.com/auth";
/**
 *
 * Automatically generated code, via SSO.js
 *
 * Do not modify manually
 *
 */
class SSO {
    /**
     *  The default URL string for send requests to OneID API
     */
    static get baseURL() {
        return baseURL;
    }
    /**
     *
     * Call this method to initialize all OneId instances.
     *
     */
    static initialize({ apiKey, siteDomain, }) {
        if (!siteDomain || !apiKey) {
            throw new Error("SSO.initialize failed: initialize with apiKey or siteDomain");
        }
        if (siteDomain)
            this.siteDomain = siteDomain;
        if (apiKey)
            this.apiKey = apiKey;
    }
    /**
     *
     * Call this method to handle authentication with OneId.
     *
     * @param {object} options - An object containing `type` and `scope`
     * @param {("login" | "signup")} options.type
     * @param {("profile" | "basic" | "advance")} options.scope
     * @returns {{token: string, user: object}} User - Object of current user
     */
    static async handleAuth({ type = "login", scope = "profile", } = {}) {
        if (!this.siteDomain || !this.apiKey) {
            throw new Error("OneId is not initialized: initialize with apiKey or siteDomain first");
        }
        const url = `${baseURL}?type=${type}&scope=${scope}&callback=${this.siteDomain}&api_key=${this.apiKey}`;
        openSignInWindow(url, "OneID_auth_popup_window");
        //Listen to message from pop window
        return new Promise((resolve, reject) => {
            window.addEventListener("message", (event) => {
                if (event.origin.includes(this.siteDomain)) {
                    if (typeof event.data === "string") {
                        if (event.data.includes("token") && event.data.includes("user")) {
                            let data = JSON.parse(event.data);
                            if (data.token)
                                this.token = data.token;
                            if (data.user)
                                this.user = data.user;
                            localStorage.setItem("current_user", event.data);
                            resolve(data);
                        }
                    }
                }
            }, false);
        });
    }
    static get isAuthenticated() {
        if (this.token && this.user) {
            return true;
        }
        const currentUser = localStorage.getItem("current_user");
        if (currentUser) {
            this.token = JSON.parse(currentUser).token;
            this.user = JSON.parse(currentUser).user;
        }
        else {
            return false;
        }
        if (!this.token || !this.user) {
            return false;
        }
        return true;
    }
    static currentUser() {
        if (this.token && this.user) {
            return {
                token: this.token,
                user: this.user,
            };
        }
        const currentUser = localStorage.getItem("current_user");
        if (currentUser) {
            this.token = JSON.parse(currentUser).token;
            this.user = JSON.parse(currentUser).user;
        }
        if (!this.token || !this.user) {
            throw new Error("No user found: Authenticate user before calling this method");
        }
        return {
            token: this.token,
            user: this.user,
        };
    }
    /**
     * Call this method to remove all instance of the current user
     *
     */
    static Logout() {
        this.token = null;
        this.user = null;
        localStorage.removeItem("current_user");
        return;
    }
}
SSO.token = null;
SSO.user = null;
export default SSO;
