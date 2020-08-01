import mapElementFactory from '../factories/map-element';

const mappedProps = {
  circleOptions: {
    type: Object,
    twoWay: false,
    noBind: true
  },
  markerOptions: {
    type: Object,
    twoWay: false,
    noBind: true
  },
  polygonOptions: {
    type: Object,
    twoWay: false,
    noBind: true
  },
  polylineOptions: {
    type: Object,
    twoWay: false,
    noBind: true
  },
  rectangleOptions: {
    type: Object,
    twoWay: false,
    noBind: true
  }
};

const props = {
  position: {
    type: String
  },
  shapes: {
    type: Array,
    required: true
  }
};

export default mapElementFactory({
  name: 'drawingManager',
  ctr: () => google.maps.drawing.DrawingManager,
  options: {
    drawingControl: true,
    drawingControlOptions: {
    },
    drawingMode: null
  },
  mappedProps,
  props,
  events: [],
  beforeCreate (options) {
    const drawingModes = [];
    for (const opt of Object.keys(options)) {
      const val = opt.split('Options');
      if (val.length > 1) {
        drawingModes.push(val[0]);
      }
    }
    const position = (this.position && google.maps.ControlPosition[this.position])
      ? google.maps.ControlPosition[this.position]
      : google.maps.ControlPosition.TOP_LEFT;

    options.drawingMode = null;
    options.drawingControl = !this.$scopedSlots.default;
    options.drawingControlOptions = {
      drawingModes,
      position
    };
    return options;
  },
  afterCreate () {
    this.$drawingmanagerObject.addListener('overlaycomplete', (e) => this.addShape(e));
    this.$map.addListener('click', this.clearSelection);
    if (this.shapes.length > 0) {
      this.drawAll();
    }
  },
  destroyed () {
    this.clearAll();
    this.$drawingmanagerObject.setMap(null);
  },

  data: () => ({
    selectedShape: null
  }),

  watch: {
    position (position) {
      if (this.$drawingmanagerObject) {
        const drawingControlOptions = {
          position: (position && google.maps.ControlPosition[position])
            ? google.maps.ControlPosition[position]
            : google.maps.ControlPosition.TOP_LEFT
        };
        this.$drawingmanagerObject.setOptions({ drawingControlOptions });
      }
    },
    circleOptions (circleOptions) {
      if (this.$drawingmanagerObject) {
        this.$drawingmanagerObject.setOptions({ circleOptions });
      }
    },
    markerOptions (markerOptions) {
      if (this.$drawingmanagerObject) {
        this.$drawingmanagerObject.setOptions({ markerOptions });
      }
    },
    polygonOptions (polygonOptions) {
      if (this.$drawingmanagerObject) {
        this.$drawingmanagerObject.setOptions({ polygonOptions });
      }
    },
    polylineOptions (polylineOptions) {
      if (this.$drawingmanagerObject) {
        this.$drawingmanagerObject.setOptions({ polylineOptions });
      }
    },
    rectangleOptions (rectangleOptions) {
      if (this.$drawingmanagerObject) {
        this.$drawingmanagerObject.setOptions({ rectangleOptions });
      }
    }
  },

  methods: {
    setDrawingMode (mode) {
      this.$drawingmanagerObject.setDrawingMode(mode);
    },
    drawAll () {
      const shapeType = {
        circle: google.maps.Circle,
        marker: google.maps.Marker,
        polygon: google.maps.Polygon,
        polyline: google.maps.Polyline,
        rectangle: google.maps.Rectangle
      };

      const _this = this;
      for (const shape of this.shapes) {
        const shapeDrawing = new shapeType[shape.type](shape.overlay);
        shapeDrawing.setMap(this.$map);
        shape.overlay = shapeDrawing;
        google.maps.event.addListener(shapeDrawing, 'click', () => {
          _this.setSelection(shape);
        });
      }
    },
    clearAll () {
      this.clearSelection();
      for (const shape of this.shapes) {
        shape.overlay.setMap(null);
      }
    },
    clearSelection () {
      if (this.selectedShape) {
        this.selectedShape.overlay.set('fillColor', '#777');
        this.selectedShape.overlay.set('strokeColor', '#999');
        this.selectedShape.overlay.setEditable(false);
        this.selectedShape.overlay.setDraggable(false);
        this.selectedShape = null;
      }
    },
    setSelection (shape) {
      this.clearSelection();
      this.selectedShape = shape;
      shape.overlay.setEditable(true);
      shape.overlay.setDraggable(true);
      this.selectedShape.overlay.set('fillColor', '#555');
      this.selectedShape.overlay.set('strokeColor', '#777');
    },
    deleteSelection () {
      if (this.selectedShape) {
        this.selectedShape.overlay.setMap(null);
        const index = this.shapes.indexOf(this.selectedShape);
        if (index > -1) {
          this.shapes.splice(index, 1);
        }
      }
    },
    addShape (shape) {
      this.setDrawingMode(null);
      this.shapes.push(shape);
      const _this = this;
      google.maps.event.addListener(shape.overlay, 'click', () => {
        _this.setSelection(shape);
      });
      this.setSelection(shape);
    }
  }
});
