<script>
import MapElementMixin from '../mixins/map-element';
import { getPropsValues, bindEvents, bindProps } from '../utils/helpers';
import { kmlLayerMappedProps } from '../utils/mapped-props-by-map-element';

/**
 * KmlLayer component
 * @displayName Kml-Layer
 * @see [source code](/guide/kml-layer.html#source-code)
 * @see [Official documentation](https://developers.google.com/maps/documentation/javascript/kmllayer)
 */
export default {
  mixins: [MapElementMixin],
  props: {
    /**
     * The URL of the .kml file
     * @see [KML layer options](https://developers.google.com/maps/documentation/javascript/kmllayer#kml_layer_options)
     */
    url: {
      type: String,
    },
    /**
     * Specifies the Map on which to render the KmlLayer. You can hide a KmlLayer by setting this value to null within the setMap() method
     * @see [KML layer options](https://developers.google.com/maps/documentation/javascript/kmllayer#kml_layer_options)
     */
    map: {
      type: Object,
    },
  },
  async provide() {
    const events = [
      'click',
      'rightclick',
      'dblclick',
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
          ...getPropsValues(this, kmlLayerMappedProps),
        };

        const { options: extraOptions, ...finalOptions } = initialOptions;

        this.$kmlLayerObject = new google.maps.KmlLayer(finalOptions);

        bindProps(this, this.$infoWindowObject, kmlLayerMappedProps);
        bindEvents(this, this.$infoWindowObject, events);

        return this.$kmlLayerObject;
      })
      .catch((error) => {
        throw error;
      });

    this.$kmlLayerPromise = promise;
    return { $kmlLayerPromise: promise };
  },
  destroyed() {
    // Note: not all Google Maps components support maps
    if (this.$kmlLayerObject && this.$kmlLayerObject.setMap) {
      this.$kmlLayerObject.setMap(null);
    }
  },
};
</script>
