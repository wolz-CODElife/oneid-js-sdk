let windowObjectReference: Window | null = null;
let previousUrl: string | null = null;

/**
 *
 * The `open()` method of the `Window` interface loads a specified resource into a new or existing browsing context (that is, tab, window, or `<iframe>`) under a specified name.
 *
 * @param {string} url - A string indicating the URL or path of the resource to be loaded. If an empty string (`""`) is specified or this parameter is omitted, a blank page is opened into the targeted browsing context.
 * @param {string} name - A string, without whitespace, specifying the `name` of the browsing context the resource is being loaded into. If the name doesn't identify an existing context, a new context is created and given the specified name.
 *
 */
export const openSignInWindow = (url: string, name: string) => {
  // remove any existing event listeners
  window.removeEventListener("message", () => {});
  // window features
  const strWindowFeatures = "toolbar=no, menubar=no, location=0, width=600, height=700, top=100, left=100";

  if (windowObjectReference === null || windowObjectReference.closed) {
    /* if the pointer to the window object in memory does not exist
        or if such pointer exists but the window was closed */
    windowObjectReference = window.open(url, name, strWindowFeatures);
    streamMessage(windowObjectReference!, url);
  } else {
    if (previousUrl !== url) {
      /* if the resource to load is different,
            then we load it in the already opened secondary window and then
            we bring such window back on top/in front of its parent window. */
      windowObjectReference = window.open(url, name, strWindowFeatures);
      streamMessage(windowObjectReference!, url);
      windowObjectReference?.focus();
    } else {
      /* else the window reference must exist and the window
            is not closed; therefore, we can bring it back on top of any other
            window with the focus() method. There would be no need to re-create
            the window or to reload the referenced resource. */
      windowObjectReference.focus();
      streamMessage(windowObjectReference, url);
    }
  }

  // assign the previous URL
  previousUrl = url;
};

const streamMessage = (popup: Window, url) => {
  function streamer() {
    try {
      if (popup.location.search) {
        const queryString = popup.location.search;
        // send the params to the sdk
        if (popup.opener && queryString.includes("token")) {
          let params = new URLSearchParams(queryString);
          let token = params.get("token");
          let userString = params.get("user");
          let user = JSON.parse(userString || "null");
          let data = { token, user };
          popup.opener.postMessage(JSON.stringify(data), "*");
          popup.close();
        } else {
          requestAnimationFrame(streamer);
        }
      } else {
        requestAnimationFrame(streamer);
      }
    } catch (error) {
      requestAnimationFrame(streamer);
    }
  }
  requestAnimationFrame(streamer);
};
