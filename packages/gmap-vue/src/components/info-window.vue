<template>
  <div>
    <div ref="flyaway">
      <!-- so named because it will fly away to another component -->
      <!-- @slot Used to set your info window.  -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
import MapElementMixin from '../mixins/map-element';
import { infoWindowMappedProps } from '../utils/mapped-props-by-map-element';
import { bindEvents, bindProps, getPropsValues } from '../utils/helpers';

/**
 * InfoWindow component
 * @displayName Info-Window
 * @see [source code](/guide/info-window.html#source-code)
 * @see [Official documentation](https://developers.google.com/maps/documentation/javascript/infowindows)
 */
export default {
  mixins: [MapElementMixin],
  props: {
    /**
     * Determines if the info-window is open or not
     */
    opened: {
      type: Boolean,
      default: true,
    },
    /**
     * Extra options that you want to pass to the component
     */
    options: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
    /**
     * Contains the LatLng at which this info window is anchored.
     * Note: An InfoWindow may be attached either to a Marker object
     * (in which case its position is based on the marker's location)
     * or on the map itself at a specified LatLng.
     */
    position: {
      type: Object,
    },
    /**
     * The z-index property of the window
     */
    zIndex: {
      type: Number,
    },
  },
  methods: {
    // TODO: we need to analyze the following method name
    // eslint-disable-next-line no-underscore-dangle -- old code
    _openInfoWindow() {
      if (this.opened) {
        if (this.$markerObject !== null) {
          this.$infoWindowObject.open(this.$map, this.$markerObject);
        } else {
          this.$infoWindowObject.open(this.$map);
        }
      } else {
        this.$infoWindowObject.close();
      }
    },
  },
  inject: {
    $markerPromise: {
      default: null,
    },
  },
  provide() {
    const events = ['domready', 'closeclick', 'content_changed'];

    // Infowindow needs this to be immediately available
    const promise = this.$mapPromise
      .then((map) => {
        this.$map = map;

        // Initialize the maps with the given options
        const initialOptions = {
          // TODO: analyze the below line because I think it can be removed
          ...this.options,
          map,
          ...getPropsValues(this, infoWindowMappedProps),
        };

        const {
          options: extraOptions,
          position,
          ...finalOptions
        } = initialOptions;

        finalOptions.content = this.$refs.flyaway;

        if (this.$markerPromise) {
          this.$markerPromise.then((markerObject) => {
            this.$markerObject = markerObject;
            return markerObject;
          });
        }

        this.$infoWindowObject = new google.maps.InfoWindow(finalOptions);

        bindProps(this, this.$infoWindowObject, infoWindowMappedProps);
        bindEvents(this, this.$infoWindowObject, events);

        // TODO: This function names should be analyzed
        /* eslint-disable no-underscore-dangle -- old style */
        this._openInfoWindow();
        this.$watch('opened', () => {
          this._openInfoWindow();
        });
        /* eslint-enable no-underscore-dangle */

        return this.$infoWindowObject;
      })
      .catch((error) => {
        throw error;
      });

    // TODO: analyze the efects of only returns the instance and remove completely the promise
    this.$infoWindowPromise = promise;
    return { $infoWindowPromise: promise };
  },
  mounted() {
    const el = this.$refs.flyaway;
    el.parentNode.removeChild(el);
  },
  destroyed() {
    // Note: not all Google Maps components support maps
    if (this.$infoWindowObject && this.$infoWindowObject.setMap) {
      this.$infoWindowObject.setMap(null);
    }
  },
};
</script>
