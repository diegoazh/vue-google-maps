import lazy from '../utils/lazy-value';

export default function promiseLazy(loadGmapApi, GmapApi) {
  return function promiseLazyCreator(options) {
    // Things to do once the API is loaded
    function onApiLoaded() {
      // TODO: All disabled eslint rules should be analyzed
      // eslint-disable-next-line no-param-reassign -- old style this should be analyzed;
      GmapApi.gmapApi = {};
      return window.google;
    }

    if (options.load) {
      // If library should load the API
      return lazy(() => {
        // Load the
        // This will only be evaluated once
        if (typeof window === 'undefined') {
          // server side -- never resolve this promise
          return new Promise(() => {}).then(onApiLoaded);
        }
        return new Promise((resolve, reject) => {
          try {
            window.vueGoogleMapsInit = resolve;
            loadGmapApi(options.load, options.loadCn);
          } catch (err) {
            reject(err);
          }
        }).then(onApiLoaded);
      });
    } // If library should not handle API, provide
    // end-users with the global `vueGoogleMapsInit: () => undefined`
    // when the Google Maps API has been loaded
    const promise = new Promise((resolve) => {
      if (typeof window === 'undefined') {
        // Do nothing if run from server-side
        return;
      }
      window.vueGoogleMapsInit = resolve;
    }).then(onApiLoaded);

    return lazy(() => promise);
  };
}
