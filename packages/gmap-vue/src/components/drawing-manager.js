import {gmapApi, MapElementFactory} from 'gmap-vue';

const props = {
	drawingMode: {
		type: String,
		twoWay: true
	},
	options: {
		type: Object,
		twoWay: false,
		default: () => {}
	}
};

const events = [
  'circlecomplete',
  'markercomplete',
  'overlaycomplete',
  'polygoncomplete',
  'polylinecomplete',
  'rectanglecomplete'
];

/**
 * @class Drawing Manager
 *
 * Drawing Manager class
 */
export default MapElementFactory({
	name: 'drawingManager',
	ctr: () => gmapApi().maps.drawing.DrawingManager,
	events: events,
	mappedProps: props,
});