import mapElementFactory from '../factories/map-element';

const props = {
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

const events = [];

/**
 * @class Heatmap Layer
 *
 * Heatmap Layer class
 */
export default mapElementFactory({
  mappedProps: props,
  events,
  name: 'heatmapLayer',
  ctr: () => google.maps.visualization.HeatmapLayer,
});
