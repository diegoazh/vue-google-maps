/**
 * This are GoogleMapsOptions that we want to have like
 * props in our Vue component.
 * This properties are in the way that GoogleMaps accept it
 * and with extraneous properties for the VueJs API.
 * In a previous version of this plugin, to avoid repetition,
 * we created a .js file component with a `mappedProps` key on it
 * and used a variety of helper functions to clean it and bind it
 * to Vue props and watch them, etc.
 * To day our primary main goal is get a more intuitive and descriptive
 * API and a better documentation of it, following this goals we move
 * this extraneous properties to an independent file in order to consume
 * it when is needed.
 * Please you need to remind that you need to create properties in the
 * correspondent Vue component with the same names and the same values
 * for those properties that are not extraneous to Vue.
 */

export const autocompleteMappedProps = {
  bounds: {
    type: Object,
  },
  componentRestrictions: {
    type: Object,
    // Do not bind -- must check for undefined
    // in the property
    noBind: true,
  },
  types: {
    type: Array,
    default() {
      return [];
    },
  },
};

export const circleMappedProps = {
  center: {
    type: Object,
    twoWay: true,
    required: true,
  },
  radius: {
    type: Number,
    twoWay: true,
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  editable: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Object,
    twoWay: false,
  },
};

export const clusterMappedProps = {
  maxZoom: {
    type: Number,
    twoWay: false,
  },
  batchSizeIE: {
    type: Number,
    twoWay: false,
  },
  calculator: {
    type: Function,
    twoWay: false,
  },
  enableRetinaIcons: {
    type: Boolean,
    twoWay: false,
  },
  gridSize: {
    type: Number,
    twoWay: false,
  },
  averageCenter: {
    type: Boolean,
    twoWay: false,
  },
  ignoreHidden: {
    type: Boolean,
    twoWay: false,
  },
  imageExtension: {
    type: String,
    twoWay: false,
  },
  imagePath: {
    type: String,
    twoWay: false,
  },
  imageSizes: {
    type: Array,
    twoWay: false,
  },
  minimumClusterSize: {
    type: Number,
    twoWay: false,
  },
  clusterClass: {
    type: String,
    twoWay: false,
  },
  styles: {
    type: Array,
    twoWay: false,
  },
  zoomOnClick: {
    type: Boolean,
    twoWay: false,
  },
};

export const drawingManagerMappedProps = {
  circleOptions: {
    type: Object,
    twoWay: false,
    noBind: true,
  },
  markerOptions: {
    type: Object,
    twoWay: false,
    noBind: true,
  },
  polygonOptions: {
    type: Object,
    twoWay: false,
    noBind: true,
  },
  polylineOptions: {
    type: Object,
    twoWay: false,
    noBind: true,
  },
  rectangleOptions: {
    type: Object,
    twoWay: false,
    noBind: true,
  },
};

export const heatMapLayerMappedProps = {
  options: {
    type: Object,
    twoWay: false,
    default: () => {},
  },
  data: {
    type: Array,
    twoWay: true,
  },
};

export const infoWindowMappedProps = {
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

export const kmlLayerMappedProps = {
  url: {
    twoWay: false,
    type: String,
  },
  map: {
    twoWay: true,
    type: Object,
  },
};

export default {
  autocompleteMappedProps,
  circleMappedProps,
  clusterMappedProps,
  drawingManagerMappedProps,
  heatMapLayerMappedProps,
  infoWindowMappedProps,
  kmlLayerMappedProps,
};
