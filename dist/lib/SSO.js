import { openSignInWindow } from "./utils.js"

const baseURL = "https://oneidtech.com/auth"

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
        return baseURL
    }

    /**
    * 
    * Call this method to initialize all OneId instances.
    * 
    * @param {object} options - An object containing `siteDomain` and `apiKey` 
    * @param {string} options.apiKey
    * @param {string} options.siteDomain
    */
    static initialize({ apiKey, siteDomain , OneId = null}) {
        if(!siteDomain || !apiKey) {
            throw new Error("SSO.initialize failed: initialize with apiKey or siteDomain")
        }
        if(siteDomain) this.siteDomain = siteDomain
        if(apiKey) this.apiKey = apiKey

        this.OneId = OneId
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
    static async handleAuth({type = "login", scope = "profile"}) {
        if(!this.siteDomain || !this.apiKey) {
            throw new Error("OneId is not initialized: initialize with apiKey or siteDomain first")
        }
        if(this.siteDomain && this.apiKey) {
            const url = `https://oneidtech.com/auth?type=${type}&scope=${scope}&callback=${this.siteDomain}&api_key=${this.apiKey}`
            openSignInWindow(url, "OneID_auth_popup_window")
            //Listen to message from pop window
            return window.addEventListener("message", (event) => {
                if(event.origin.includes(this.siteDomain)){
                    if(typeof(event.data) === "string") {
                        if(event.data.includes("token") && event.data.includes("user")) {
                            let data = JSON.parse(event.data)
                            if(data.token) this.token = data.token
                            if(data.user) this.user = data.user
                            localStorage.setItem("current_user", event.data)
                            return data
                        }
                    }
                }
            }, false);
        }
    }




    /**
     * Call this method to check if user's token or object is not undefined
     * 
     * @returns {boolean} true || false 
     */
    static isAuthenticated() {
        let token, user
        if(this.token && this.user) {
            token = this.token
            user = this.user
        } else if (JSON.parse(localStorage.getItem("current_user"))) {
            token = JSON.parse(localStorage.getItem("current_user")).token
            user = JSON.parse(localStorage.getItem("current_user")).user
        }
        if(!token  && !user) {
            return false
        }
        return true
    }




    /**
     * Call this method to check if user's token or object is not undefined
     * 
     * @returns {{token: string, user: object}} User - Object of current user 
     */
    static currentUser() {
        let token, user
        if(this.token && this.user) {
            token = this.token
            user = this.user
        } else if (JSON.parse(localStorage.getItem("current_user"))) {
            token = JSON.parse(localStorage.getItem("current_user")).token
            user = JSON.parse(localStorage.getItem("current_user")).user
        }

        if (!token || !user) {
            throw new Error("No user found: Authenticate user before calling this method")
        }
        return {
            token: token,
            user: user
        }
    }




    /**
     * Call this method to remove all instance of the current user
     * 
     */
    static Logout() {
        this.token = null
        this.user = null
        localStorage.removeItem("current_user")
        return
    }

}

export default SSO