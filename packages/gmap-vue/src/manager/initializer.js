/**
 * @param options   Object. (@see https://developers.google.com/maps/documentation/javascript/url-params)
 *                  `libraries` can be given as an array. (@see https://developers.google.com/maps/documentation/javascript/libraries)
 *                  `callback` is ignored/overwritten.
 * @param loadCn    Boolean. If set to true, the map will be loaded from google maps China
 *                  (@see https://developers.google.com/maps/documentation/javascript/basics#GoogleMapsChina)
 */

export default (() => {
  let isApiSetUp = false;

  return (options, loadCn) => {
    if (typeof document === 'undefined') {
      // Do nothing if run from server-side
      return;
    }

    if (!isApiSetUp) {
      isApiSetUp = true;

      const googleMapScript = document.createElement('SCRIPT');

      // Allow options to be an object.
      // This is to support more esoteric means of loading Google Maps,
      // such as Google for business
      // https://developers.google.com/maps/documentation/javascript/get-api-key#premium-auth
      if (typeof options !== 'object') {
        throw new Error('options should  be an object');
      }

      // libraries
      if (
        Object.prototype.isPrototypeOf.call(Array.prototype, options.libraries)
      ) {
        // TODO: all eslint disabled rules in this file should be analyzed
        // eslint-disable-next-line no-param-reassign -- old style should be analyzed
        options.libraries = options.libraries.join(',');
      }

      // eslint-disable-next-line no-param-reassign -- old style should be analyzed
      options.callback = 'vueGoogleMapsInit';

      let baseUrl = 'https://maps.googleapis.com/';

      if (typeof loadCn === 'boolean' && loadCn === true) {
        baseUrl = 'https://maps.google.cn/';
      }

      const query = Object.keys(options)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`
        )
        .join('&');

      const url = `${baseUrl}maps/api/js?${query}`;

      googleMapScript.setAttribute('src', url);
      googleMapScript.setAttribute('async', '');
      googleMapScript.setAttribute('defer', '');
      document.head.appendChild(googleMapScript);
    } else {
      throw new Error('You already started the loading of google maps');
    }
  };
})();
