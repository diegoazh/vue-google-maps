<template>
  <div>
    <!-- @slot Used to set your cluster -->
    <slot></slot>
  </div>
</template>

<script>
import MarkerClusterer from '@google/markerclustererplus';
import MapElementMixin from '../mixins/map-element';
import { clusterMappedProps } from '../utils/mapped-props-by-map-element';
import { bindEvents, getPropsValues, bindProps } from '../utils/helpers';

/**
 * Cluster component
 * @displayName GmapCluster
 * @see [source code](/guide/cluster.html#source-code)
 * @see [Official documentation](https://googlemaps.github.io/js-markerclustererplus/index.html)
 * @see [Marker clusterer](https://github.com/googlemaps/v3-utility-library/blob/master/markerclustererplus/src/markerclusterer.js)
 */
export default {
  mixins: [MapElementMixin],
  props: {
    /**
     * The max zoom of the Google Maps
     * @see [MapOptions interface](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions)
     */
    maxZoom: {
      type: Number,
    },
    /**
     * The batchSize for IE
     * @see [issue 136](https://github.com/googlemaps/v3-utility-library/issues/136)
     * @see [docs explanation](https://github.com/googlemaps/v3-utility-library/blob/0a707d5ce74738a9ad4fcb6c02257fb9d9e433ae/packages/markerclustererplus/src/markerclusterer.ts#L27)
     */
    batchSizeIE: {
      type: Number,
    },
    /**
     * Function to calculate markers in a cluster
     * @see [calculator docs](https://googlemaps.github.io/js-markerclustererplus/globals.html#calculator)
     */
    calculator: {
      type: Function,
    },
    /**
     * Enable the retina icons on the cluster
     */
    enableRetinaIcons: {
      type: Boolean,
    },
    /**
     * Set the grid size of the cluster
     */
    gridSize: {
      type: Number,
    },
    /**
     * Enable de average center
     */
    averageCenter: {
      type: Boolean,
    },
    /**
     * Enable to ignore hidden markers
     */
    ignoreHidden: {
      type: Boolean,
    },
    /**
     * Set the image extension type
     */
    imageExtension: {
      type: String,
    },
    /**
     * Set the image path
     */
    imagePath: {
      type: String,
    },
    /**
     * Set the image size
     */
    imageSizes: {
      type: Array,
    },
    /**
     * Set the minimum cluster size
     */
    minimumClusterSize: {
      type: Number,
    },
    /**
     * Set a css class for the cluster
     */
    clusterClass: {
      type: String,
    },
    /**
     * Set the styles for the cluster
     */
    styles: {
      type: Array,
    },
    /**
     * Enable zoom on click
     */
    zoomOnClick: {
      type: Boolean,
    },
  },
  async provide() {
    // events to bind with toWay
    const events = [
      'click',
      'rightclick',
      'dblclick',
      'drag',
      'dragstart',
      'dragend',
      'mouseup',
      'mousedown',
      'mouseover',
      'mouseout',
    ];

    // Infowindow needs this to be immediately available
    const promise = await this.$mapPromise
      .then((map) => {
        this.$map = map;

        // Initialize the maps with the given options
        const initialOptions = {
          // TODO: analyze the below line because I think it can be removed
          ...this.options,
          map,
          ...getPropsValues(this, clusterMappedProps),
        };
        const { options: extraOptions, ...finalOptions } = initialOptions;

        if (typeof MarkerClusterer === 'undefined') {
          throw new Error(
            'MarkerClusterer is not installed! require() it or include it from https://cdnjs.cloudflare.com/ajax/libs/js-marker-clusterer/1.0.0/markerclusterer.js'
          );
        }

        const { map: mapInstance, markers, ...clusterOptions } = finalOptions;

        this.$clusterObject = new MarkerClusterer(
          mapInstance,
          markers,
          ...clusterOptions
        );

        bindProps(this, this.$clusterObject, clusterMappedProps);
        bindEvents(this, this.$clusterObject, events);

        Object.keys(clusterMappedProps).forEach((prop) => {
          if (clusterMappedProps[prop].twoWay) {
            this.$on(`${prop.toLowerCase()}_changed`, this.reinsertMarkers);
          }
        });

        return this.$clusterObject;
      })
      .catch((error) => {
        throw error;
      });

    // TODO: analyze the efects of only returns the instance and remove completely the promise
    this.$clusterPromise = promise;
    return { $clusterPromise: promise };
  },
  beforeDestroy() {
    /* Performance optimization when destroying a large number of markers */
    this.$children.forEach((marker) => {
      if (marker.$clusterObject === this.$clusterObject) {
        marker.$clusterObject = null;
      }
    });

    if (this.$clusterObject) {
      this.$clusterObject.clearMarkers();
    }
  },
  destroyed() {
    // Note: not all Google Maps components support maps
    if (this.$clusterObject && this.$clusterObject.setMap) {
      this.$clusterObject.setMap(null);
    }
  },
  updated() {
    if (this.$clusterObject) {
      this.$clusterObject.repaint();
    }
  },
  methods: {
    reinsertMarkers() {
      const oldMarkers = this.$clusterObject.getMarkers();
      this.$clusterObject.clearMarkers();
      this.$clusterObject.addMarkers(oldMarkers);
    },
  },
};
</script>
