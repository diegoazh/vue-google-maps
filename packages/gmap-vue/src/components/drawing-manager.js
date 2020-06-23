import mapElementFactory from '../factories/map-element';

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
export default mapElementFactory({
	name: 'drawingManager',
	ctr: () => google.maps.drawing.DrawingManager,
	events: events,
	mappedProps: props,
});