import { openSignInWindow } from "./utils.js"

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
    static baseURL = "https://oneidtech.com/auth"





    /**
    * 
    * Call this method to initialize all OneId instances.
    * 
    * @param {object} options - An object containing `redirectURL` and `apiKey` 
    * @param {string} options.apiKey
    * @param {string} options.redirectURL
    */
    static initialize({ apiKey, redirectURL , OneId = null}) {
        if(!redirectURL || !apiKey) {
            throw new Error("SSO.initialize failed: initialize with apiKey or redirectURL")
        }
        if(redirectURL) this.redirectURL = redirectURL
        if(apiKey) this.apiKey = apiKey

        this.OneId = OneId
    }




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
    static async handleAuth({type = "login", scope = "profile"}) {
        if(!this.redirectURL || !this.apiKey) {
            throw new Error("OneId is not initialized: initialize with apiKey or redirectURL first")
        }
        if(this.redirectURL && this.apiKey) {
            const url = `https://oneidtech.com/auth?type=${type}&scope=${scope}&callback=${this.redirectURL}&api_key=${this.apiKey}`
            openSignInWindow(url, "OneID_auth_popup_window")
            //Listen to message from pop window
            return window.addEventListener("message", (event) => {
                if(typeof(event.data) === "string") {
                    if(event.data.includes("token") && event.data.includes("user")) {
                        let data = JSON.parse(event.data)
                        if(data.token) this.token = data.token
                        if(data.user) this.user = data.user
                        localStorage.setItem("token", data.token)
                        localStorage.setItem("user", JSON.stringify(data.user))
                        return data
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
        let token = this.token || localStorage.getItem("token")
        let user = this.user || JSON.parse(localStorage.getItem("user"))
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
        let token = this.token || localStorage.getItem("token")
        let user = this.user || JSON.parse(localStorage.getItem("user"))
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
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        return
    }

}

export default SSO