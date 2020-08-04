import mapElementFactory from '../factories/map-element';

const props = {
  draggable: {
    type: Boolean,
  },
  editable: {
    type: Boolean,
  },
  options: {
    type: Object,
  },
  path: {
    type: Array,
    twoWay: true,
    noBind: true,
  },
  paths: {
    type: Array,
    twoWay: true,
    noBind: true,
  },
};

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

export default mapElementFactory({
  props: {
    deepWatch: {
      type: Boolean,
      default: false,
    },
  },
  events,
  mappedProps: props,
  name: 'polygon',
  ctr: () => google.maps.Polygon,

  beforeCreate(options) {
    /* eslint-disable no-param-reassign -- we need to clean options without use delete use delete keyword */
    if (!options.path) {
      const { path, ...cleanedOptions } = options;
      options = cleanedOptions;
    }

    if (!options.paths) {
      const { paths, ...cleanedOptions2 } = options;
      options = cleanedOptions2;
    }
    /* eslint-enable no-param-reassign */
  },

  afterCreate(inst) {
    let clearEvents = () => {};

    // Watch paths, on our own, because we do not want to set either when it is
    // empty
    this.$watch(
      'paths',
      (paths) => {
        if (paths) {
          clearEvents();

          inst.setPaths(paths);

          const updatePaths = () => {
            this.$emit('paths_changed', inst.getPaths());
          };
          const eventListeners = [];

          const mvcArray = inst.getPaths();
          for (let i = 0; i < mvcArray.getLength(); i += 1) {
            const mvcPath = mvcArray.getAt(i);
            eventListeners.push([
              mvcPath,
              mvcPath.addListener('insert_at', updatePaths),
            ]);
            eventListeners.push([
              mvcPath,
              mvcPath.addListener('remove_at', updatePaths),
            ]);
            eventListeners.push([
              mvcPath,
              mvcPath.addListener('set_at', updatePaths),
            ]);
          }
          eventListeners.push([
            mvcArray,
            mvcArray.addListener('insert_at', updatePaths),
          ]);
          eventListeners.push([
            mvcArray,
            mvcArray.addListener('remove_at', updatePaths),
          ]);
          eventListeners.push([
            mvcArray,
            mvcArray.addListener('set_at', updatePaths),
          ]);

          // TODO: analyze, we change map to forEach because clearEvents is a void function and the returned array is not used
          clearEvents = () => {
            eventListeners.forEach(([, listenerHandle]) => {
              google.maps.event.removeListener(listenerHandle);
            });
          };
        }
      },
      {
        deep: this.deepWatch,
        immediate: true,
      }
    );

    this.$watch(
      'path',
      (path) => {
        if (path) {
          clearEvents();

          inst.setPaths(path);

          const mvcPath = inst.getPath();
          const eventListeners = [];

          const updatePaths = () => {
            this.$emit('path_changed', inst.getPath());
          };

          eventListeners.push([
            mvcPath,
            mvcPath.addListener('insert_at', updatePaths),
          ]);
          eventListeners.push([
            mvcPath,
            mvcPath.addListener('remove_at', updatePaths),
          ]);
          eventListeners.push([
            mvcPath,
            mvcPath.addListener('set_at', updatePaths),
          ]);

          // TODO: analyze, we change map to forEach because clearEvents is a void function and the returned array is not used
          clearEvents = () => {
            eventListeners.forEach(([, listenerHandle]) => {
              google.maps.event.removeListener(listenerHandle);
            });
          };
        }
      },
      {
        deep: this.deepWatch,
        immediate: true,
      }
    );
  },
});
