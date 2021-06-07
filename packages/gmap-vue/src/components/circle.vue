<script>
import mapElementMixin from '../mixins/map-element';
import { circleMappedProps } from '../utils/mapped-props-by-map-element';
import { bindEvents, getPropsValues, bindProps } from '../utils/helpers';

/**
 * Circle component
 * @displayName GmapCircle
 * @see [source code](/guide/circle.html#source-code)
 */
export default {
  mixins: [mapElementMixin],
  props: {
    /**
     * The center of the circle
     * @value { lat: 41.878, lng: -87.629 }
     * @see [Circle simple](https://developers.google.com/maps/documentation/javascript/examples/circle-simple)
     */
    center: {
      type: Object,
      required: true,
    },
    /**
     * The radious of the circle
     * @value 10
     * @see [Circle simple](https://developers.google.com/maps/documentation/javascript/examples/circle-simple)
     */
    radius: {
      type: Number,
    },
    /**
     * Indicates if the circle is draggable
     * @value true, false
     * @see [Circle simple](https://developers.google.com/maps/documentation/javascript/examples/circle-simple)
     */
    draggable: {
      type: Boolean,
      default: false,
    },
    /**
     * Indicates if the circle is editable
     * @value true, false
     * @see [Circle simple](https://developers.google.com/maps/documentation/javascript/examples/circle-simple)
     */
    editable: {
      type: Boolean,
      default: false,
    },
    /**
     * The Google Maps circle options
     * @value {
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: citymap[city].center,
        radius: Math.sqrt(citymap[city].population) * 100,
      }
     * @see [Circle simple](https://developers.google.com/maps/documentation/javascript/examples/circle-simple)
     */
    options: {
      type: Object,
    },
  },
  render() {
    return '';
  },
  provide() {
    // events to bind with toWay
    const events = [
      'click',
      'dblclick',
      'drag',
      'dragend',
      'dragstart',
      'mousedown',
      'mousemove',
      'mouseout',
      'mouseover',
      'mouseup',
      'rightclick',
    ];

    // Infowindow needs this to be immediately available
    const promise = this.$mapPromise
      .then((map) => {
        this.$map = map;

        // Initialize the maps with the given options
        const initialOptions = {
          ...this.options,
          map,
          ...getPropsValues(this, circleMappedProps),
        };
        const { options: extraOptions, ...finalOptions } = initialOptions;
        this.$circleObject = new google.maps.Circle(finalOptions);
        bindProps(this, this.$circleObject, circleMappedProps);
        bindEvents(this, this.$circleObject, events);

        return this.$circleObject;
      })
      .catch((error) => {
        throw error;
      });

    // TODO: analyze the efects of only returns the instance and remove completely the promise
    this.$circlePromise = promise;
    return { $circlePromise: promise };
  },
  destroyed() {
    // Note: not all Google Maps components support maps
    if (this.$circleObject && this.$circleObject.setMap) {
      this.$circleObject.setMap(null);
    }
  },
};
</script>
