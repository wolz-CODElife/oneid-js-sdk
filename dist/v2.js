const baseURL = "https://auth.oneidtech.com/auth";
class OneIDV2 {
    static start({ apiKey }) {
        if (!apiKey) {
            throw new Error("apiKey is required");
        }
        this._apiKey = apiKey;
    }
    static get apiKey() {
        if (!this._apiKey) {
            throw new Error("apiKey is not set, please call start() first");
        }
        return this._apiKey;
    }
}
export const start = OneIDV2.start.bind(OneIDV2);
export function handleAuth() {
    let width = 700;
    let height = 600;
    const y = window.top.outerHeight / 2 + window.top.screenY - height / 2;
    const x = window.top.outerWidth / 2 + window.top.screenX - width / 2;
    const w = window.open(`${baseURL}?type=login&callback=${window.location.origin}&api_key=${OneIDV2.apiKey}`, "auth", `width=${width},height=${height},scrollbars=no,status=no,toolbar=no,menubar=no,location=no,resizable=no,dependent=no,dialog=no,top=${y}, left=${x}`);
    w === null || w === void 0 ? void 0 : w.focus();
    return new Promise((resolve, reject) => {
        const anotherInterval = setInterval(() => {
            var _a;
            try {
                let searchParams = new URLSearchParams((_a = w === null || w === void 0 ? void 0 : w.location) === null || _a === void 0 ? void 0 : _a.search);
                if (searchParams.get("token") && searchParams.get("user")) {
                    let token = searchParams.get("token");
                    let userString = searchParams.get("user");
                    const user = JSON.parse(userString);
                    clearInterval(anotherInterval);
                    resolve({
                        token,
                        user,
                    });
                    w === null || w === void 0 ? void 0 : w.close();
                }
            }
            catch (e) {
                // console.log(e);
                // clearInterval(anotherInterval);
            }
        }, 300);
        const interval = setInterval(() => {
            if (w === null || w === void 0 ? void 0 : w.closed) {
                clearInterval(anotherInterval);
                clearInterval(interval);
                return reject("window closed");
            }
        });
    });
}
