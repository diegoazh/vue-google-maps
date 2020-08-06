import mapElementFactory from '../factories/map-element';

const mappedProps = {
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

const props = {
  position: {
    type: String,
  },
  shapes: {
    type: Array,
    required: true,
  },
};

export default mapElementFactory({
  name: 'drawingManager',
  ctr: () => google.maps.drawing.DrawingManager,
  options: {
    drawingControl: true,
    drawingControlOptions: {},
    drawingMode: null,
  },
  mappedProps,
  props,
  events: [],
  beforeCreate(options) {
    const drawingModes = Object.keys(options).reduce((modes, opt) => {
      const val = opt.split('Options');

      if (val.length > 1) {
        modes.push(val[0]);
      }

      return modes;
    }, []);
    const position =
      this.position && google.maps.ControlPosition[this.position]
        ? google.maps.ControlPosition[this.position]
        : google.maps.ControlPosition.TOP_LEFT;

    // TODO: should be analyzed after this PR
    /* eslint-disable no-param-reassign -- needed to add options */
    options.drawingMode = null;
    options.drawingControl = !this.$scopedSlots.default;
    options.drawingControlOptions = {
      drawingModes,
      position,
    };
    /* eslint-enable no-param-reassign */
    return options;
  },
  afterCreate() {
    this.$drawingManagerObject.addListener('overlaycomplete', (e) =>
      this.addShape(e)
    );

    this.$map.addListener('click', this.clearSelection);
    if (this.shapes.length > 0) {
      this.drawAll();
    }
  },
  destroyed() {
    this.clearAll();
    this.$drawingManagerObject.setMap(null);
  },

  data: () => ({
    selectedShape: null,
  }),

  watch: {
    position(position) {
      if (this.$drawingManagerObject) {
        const drawingControlOptions = {
          position:
            position && google.maps.ControlPosition[position]
              ? google.maps.ControlPosition[position]
              : google.maps.ControlPosition.TOP_LEFT,
        };
        this.$drawingManagerObject.setOptions({ drawingControlOptions });
      }
    },
    circleOptions(circleOptions) {
      if (this.$drawingManagerObject) {
        this.$drawingManagerObject.setOptions({ circleOptions });
      }
    },
    markerOptions(markerOptions) {
      if (this.$drawingManagerObject) {
        this.$drawingManagerObject.setOptions({ markerOptions });
      }
    },
    polygonOptions(polygonOptions) {
      if (this.$drawingManagerObject) {
        this.$drawingManagerObject.setOptions({ polygonOptions });
      }
    },
    polylineOptions(polylineOptions) {
      if (this.$drawingManagerObject) {
        this.$drawingManagerObject.setOptions({ polylineOptions });
      }
    },
    rectangleOptions(rectangleOptions) {
      if (this.$drawingManagerObject) {
        this.$drawingManagerObject.setOptions({ rectangleOptions });
      }
    },
  },

  methods: {
    setDrawingMode(mode) {
      this.$drawingManagerObject.setDrawingMode(mode);
    },
    drawAll() {
      const shapeType = {
        circle: google.maps.Circle,
        marker: google.maps.Marker,
        polygon: google.maps.Polygon,
        polyline: google.maps.Polyline,
        rectangle: google.maps.Rectangle,
      };

      const self = this;
      this.shapes.forEach((shape) => {
        const shapeDrawing = new shapeType[shape.type](shape.overlay);
        shapeDrawing.setMap(this.$map);
        // TODO: analyze if exists a better way to do the below assignment
        // eslint-disable-next-line no-param-reassign -- we need to assign properties to this shape
        shape.overlay = shapeDrawing;
        google.maps.event.addListener(shapeDrawing, 'click', () => {
          self.setSelection(shape);
        });
      });
    },
    clearAll() {
      this.clearSelection();
      this.shapes.forEach((shape) => {
        shape.overlay.setMap(null);
      });
    },
    clearSelection() {
      if (this.selectedShape) {
        this.selectedShape.overlay.set('fillColor', '#777');
        this.selectedShape.overlay.set('strokeColor', '#999');
        this.selectedShape.overlay.setEditable(false);
        this.selectedShape.overlay.setDraggable(false);
        this.selectedShape = null;
      }
    },
    setSelection(shape) {
      this.clearSelection();
      this.selectedShape = shape;
      shape.overlay.setEditable(true);
      shape.overlay.setDraggable(true);
      this.selectedShape.overlay.set('fillColor', '#555');
      this.selectedShape.overlay.set('strokeColor', '#777');
    },
    deleteSelection() {
      if (this.selectedShape) {
        this.selectedShape.overlay.setMap(null);
        const index = this.shapes.indexOf(this.selectedShape);
        if (index > -1) {
          this.shapes.splice(index, 1);
        }
      }
    },
    addShape(shape) {
      this.setDrawingMode(null);
      this.shapes.push(shape);
      const self = this;
      google.maps.event.addListener(shape.overlay, 'click', () => {
        self.setSelection(shape);
      });
      this.setSelection(shape);
    },
  },
});
