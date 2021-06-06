<script>
import MapElementMixin from '../mixins/map-element';
import { heatMapLayerMappedProps } from '../utils/mapped-props-by-map-element';
import { bindProps, getPropsValues, bindEvents } from '../utils/helpers';

/**
 * HeatmapLayer component
 * @displayName HeatmapLayer
 * @see [source code](/guide/heatmap-layer.html#source-code)
 * @see [Official documentation](https://developers.google.com/maps/documentation/javascript/heatmaplayer)
 */
export default {
  mixins: [MapElementMixin],
  props: {
    /**
     * Extra options that you want to pass to the component
     */
    options: {
      type: Object,
      default: () => {},
    },
    /**
     * The heat map data, is an array of `new google.maps.LatLng`,
     * @see [heatmap options](https://developers.google.com/maps/documentation/javascript/heatmaplayer#add-a-heatmap-layer)
     * @example `[new google.maps.LatLng(37.782, -122.447)]`
     */
    data: {
      type: Array,
    },
  },
  async provide() {
    const events = [];

    // Infowindow needs this to be immediately available
    this.$map = await this.$mapPromise;

    // Initialize the maps with the given options
    const initialOptions = {
      // TODO: analyze the below line because I think it can be removed
      ...this.options,
      map: this.$map,
      ...getPropsValues(this, heatMapLayerMappedProps),
    };

    const { options: extraOptions, ...finalOptions } = initialOptions;

    this.$heatmapLayerObject = new google.maps.visualization.HeatmapLayer(
      finalOptions
    );

    bindProps(this, this.$heatmapLayerObject, heatMapLayerMappedProps);
    bindEvents(this, this.$heatmapLayerObject, events);

    // TODO: analyze the efects of only returns the instance and remove completely the promise
    this.$heatmapLayerPromise = this.$heatmapLayerObject;
    return { $heatmapLayerPromise: this.$heatmapLayerObject };
  },
  destroyed() {
    // Note: not all Google Maps components support maps
    if (this.$heatmapLayerObject && this.$heatmapLayerObject.setMap) {
      this.$heatmapLayerObject.setMap(null);
    }
  },
};
</script>
