const baseURL = "https://auth.oneidtech.com/auth";

class OneIDV2 {
  private static _apiKey: string;

  static start({ apiKey }: { apiKey: string }) {
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

export function handleAuth(): Promise<{ token: string; user: User }> {
  let width = 720;
  let height = 720;
  const y = window.top.outerHeight / 2 + window.top.screenY - height / 2;
  const x = window.top.outerWidth / 2 + window.top.screenX - width / 2;
  const w = window.open(
    `${baseURL}?type=login&callback=${window.location.origin}&api_key=${OneIDV2.apiKey}`,
    "auth",
    `width=${width},height=${height},scrollbars=no,status=no,toolbar=no,menubar=no,location=no,resizable=no,dependent=no,dialog=no,top=${y}, left=${x}`
  );
  w?.focus();

  return new Promise((resolve, reject) => {
    const anotherInterval = setInterval(() => {
      try {
        let searchParams = new URLSearchParams(w?.location?.search);
        if (searchParams.get("token") && searchParams.get("user")) {
          let token = searchParams.get("token")!;
          let userString = searchParams.get("user")!;
          const user = JSON.parse(userString);
          clearInterval(anotherInterval);
          resolve({
            token,
            user,
          });
          w?.close();
        }
      } catch (e) {
        // console.log(e);
        // clearInterval(anotherInterval);
      }
    }, 300);

    const interval = setInterval(() => {
      if (w?.closed) {
        clearInterval(anotherInterval);
        clearInterval(interval);
        return reject("window closed");
      }
    });
  });
}

export interface User {
  _id: string;
  username: string;
  oneId: string;
  email: string;
  isVerified: boolean;
  fullName?: string;
  gender?: string;
  dob?: string;
  phone?: string;
  maritalStatus?: string;
  primaryAddress?: string;
  secondaryAddress?: string;
  country?: string;
  postalCode?: string;
  [key: string]: any;
}
