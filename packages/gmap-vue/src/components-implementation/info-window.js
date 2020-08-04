import mapElementFactory from '../factories/map-element';

const props = {
  options: {
    type: Object,
    required: false,
    default() {
      return {};
    },
  },
  position: {
    type: Object,
    twoWay: true,
  },
  zIndex: {
    type: Number,
    twoWay: true,
  },
};

const events = ['domready', 'closeclick', 'content_changed'];

export default mapElementFactory({
  mappedProps: props,
  events,
  name: 'infoWindow',
  ctr: () => google.maps.InfoWindow,
  props: {
    opened: {
      type: Boolean,
      default: true,
    },
  },

  inject: {
    $markerPromise: {
      default: null,
    },
  },

  mounted() {
    const el = this.$refs.flyaway;
    el.parentNode.removeChild(el);
  },

  beforeCreate(options) {
    // TODO: Analyze a better way to do this
    // eslint-disable-next-line no-param-reassign -- needed to add properties to option object
    options.content = this.$refs.flyaway;

    if (this.$markerPromise) {
      const { position, ...cleanedOptions } = options;
      // eslint-disable-next-line no-param-reassign -- needed to add properties to option object
      options = cleanedOptions;
      return this.$markerPromise.then((mo) => {
        this.$markerObject = mo;
        return mo;
      });
    }

    // this return is to follow the consistent-return rule of eslint, https://eslint.org/docs/rules/consistent-return
    return undefined;
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

  afterCreate() {
    // TODO: This function names should be analyzed
    /* eslint-disable no-underscore-dangle -- old style */
    this._openInfoWindow();
    this.$watch('opened', () => {
      this._openInfoWindow();
    });
    /* eslint-enable no-underscore-dangle */
  },
});
