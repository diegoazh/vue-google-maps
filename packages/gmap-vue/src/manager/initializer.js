/**
 * @param {string} apiKey    API Key, or object with the URL parameters. For example
 *                  to use Google Maps Premium API, pass
 *                    `{ client: <YOUR-CLIENT-ID> }`.
 *                  You may pass the libraries and/or version (as `v`) parameter into
 *                  this parameter and skip the next two parameters
 * @param {string} version   Google Maps version
 * @param {string | string[]} libraries Libraries to load (@see
 *                  https://developers.google.com/maps/documentation/javascript/libraries)
 * @param loadCn    Boolean. If set to true, the map will be loaded from google maps China
 *                  (@see https://developers.google.com/maps/documentation/javascript/basics#GoogleMapsChina)
 *
 * Example:
 * ```
 *      import {load} from 'vue-google-maps'
 *
 *      load(<YOUR-API-KEY>)
 *
 *      load({
 *              key: <YOUR-API-KEY>,
 *      })
 *
 *      load({
 *              client: <YOUR-CLIENT-ID>,
 *              channel: <YOUR CHANNEL>
 *      })
 * ```
 */

export default (() => {
  let isApiSetUp = false;

  return (options, loadCn) => {
    // Allow options to be an object.
    // This is to support more esoteric means of loading Google Maps,
    // such as Google for business
    // https://developers.google.com/maps/documentation/javascript/get-api-key#premium-auth
    if (typeof options !== 'object') {
      throw new Error('options should  be an object');
    }

    // Do nothing if run from server-side
    if (typeof document === 'undefined') {
      return;
    }

    const finalOptions = { ...options };
    const { libraries } = finalOptions;

    if (!isApiSetUp) {
      isApiSetUp = true;
      const baseUrl =
        typeof loadCn === 'boolean' && loadCn
          ? 'https://maps.google.cn'
          : 'https://maps.googleapis.com';

      const googleMapScript = document.createElement('SCRIPT');

      // libraries
      if (Array.isArray(libraries)) {
        finalOptions.libraries = libraries.join(',');
      }

      finalOptions.callback = 'vueGoogleMapsInit';

      const query = Object.keys(finalOptions)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(
              finalOptions[key]
            )}`
        )
        .join('&');

      const url = `${baseUrl}/maps/api/js?${query}`;

      googleMapScript.setAttribute('src', url);
      googleMapScript.setAttribute('async', '');
      googleMapScript.setAttribute('defer', '');
      document.head.appendChild(googleMapScript);
    } else {
      throw new Error('You already started the loading of google maps');
    }
  };
})();
