import mapElementFactory from '../factories/map-element'

const props = {
    options: {
        type: Object,
        twoWay: false,
        default: () => {},
    },
    data: {
        type: Array,
        twoWay: true        
    },
};

const events = [];

/**
 * @class Heatmap Layer
 *
 * Heatmap Layer class
 */
export default MapElementFactory({
    mappedProps: props,
    events: events,
    name: 'heatmapLayer',
    ctr: () => google.maps.visualization.HeatmapLayer
});