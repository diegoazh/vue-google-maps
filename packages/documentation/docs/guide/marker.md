## Description

This component helps you to create a marker in the map.

For more information read the Google Maps documentation for [markers](https://developers.google.com/maps/documentation/javascript/markers).

It is exported with the name `GmapMarker`.

## Variables

This component save the original marker object provided by Google Maps in a property called `$kmlLayerObject`, as the example below.

```javascript
  this.$markerObject = new google.maps.Marker(...);
```

## Source code

:::details Click to se the source code of <code>info-window.vue</code> component

```vue
<script>
import MapElementMixin from '../mixins/map-element';
import { getPropsValues, bindEvents, bindProps } from '../utils/helpers';
import { markerMappedProps } from '../utils/mapped-props-by-map-element';

export default {
  mixins: [MapElementMixin],
  props: {
    animation: {
      type: Number,
    },
    attribution: {
      type: Object,
    },
    clickable: {
      type: Boolean,
      default: true,
    },
    cursor: {
      type: String,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: [String, Object],
    },
    label: {
      type: [String, Object],
    },
    opacity: {
      type: Number,
      default: 1,
    },
    options: {
      type: Object,
    },
    place: {
      type: Object,
    },
    position: {
      type: Object,
    },
    shape: {
      type: Object,
    },
    title: {
      type: String,
    },
    visible: {
      type: Boolean,
      default: true,
    },
    zIndex: {
      type: Number,
    },
  },
  render(h) {
    if (!this.$slots.default || this.$slots.default.length === 0) {
      return '';
    }
    if (this.$slots.default.length === 1) {
      // So that infowindows can have a marker parent
      return this.$slots.default[0];
    }

    return h('div', this.$slots.default);
  },
  destroyed() {
    if (!this.$markerObject) {
      return;
    }

    if (this.$clusterObject) {
      // Repaint will be performed in `updated()` of cluster
      this.$clusterObject.removeMarker(this.$markerObject, true);
    } else if (this.$markerObject && this.$markerObject.setMap) {
      this.$markerObject.setMap(null);
    }
  },
  inject: {
    $clusterPromise: {
      default: null,
    },
  },
  provide() {
    const events = [
      'click',
      'rightclick',
      'dblclick',
      'drag',
      'dragstart',
      'dragend',
      'mouseup',
      'mousedown',
      'mouseover',
      'mouseout',
    ];

    const promise = this.$mapPromise
      .then((map) => {
        this.$map = map;

        // Initialize the maps with the given options
        const initialOptions = {
          ...this.options,
          map,
          ...getPropsValues(this, markerMappedProps),
        };

        const { options: extraOptions, ...finalOptions } = initialOptions;

        if (this.$clusterPromise) {
          finalOptions.map = null;
        }

        this.$markerObject = new google.maps.Marker(finalOptions);

        bindProps(this, this.$infoWindowObject, markerMappedProps);
        bindEvents(this, this.$infoWindowObject, events);

        if (this.$clusterPromise) {
          this.$clusterPromise.then((clusterObject) => {
            clusterObject.addMarker(this.$markerObject);
            this.$clusterObject = clusterObject;
          });
        }

        return this.$markerObject;
      })
      .catch((error) => {
        throw error;
      });

    this.$markerPromise = promise;
    return { $markerPromise: promise };
  },
};
</script>

```

:::

If you need to know what are `mappedProps` please read the general concepts of this application [here](/examples/#mapped-props).

:::details Mapped Props of <code>GmapMarker</code> component

```javascript
export const markerMappedProps = {
  animation: {
    twoWay: true,
    type: Number,
  },
  attribution: {
    type: Object,
  },
  clickable: {
    type: Boolean,
    twoWay: true,
    default: true,
  },
  cursor: {
    type: String,
    twoWay: true,
  },
  draggable: {
    type: Boolean,
    twoWay: true,
    default: false,
  },
  icon: {
    twoWay: true,
  },
  label: {},
  opacity: {
    type: Number,
    default: 1,
  },
  options: {
    type: Object,
  },
  place: {
    type: Object,
  },
  position: {
    type: Object,
    twoWay: true,
  },
  shape: {
    type: Object,
    twoWay: true,
  },
  title: {
    type: String,
    twoWay: true,
  },
  zIndex: {
    type: Number,
    twoWay: true,
  },
  visible: {
    twoWay: true,
    default: true,
  },
};
```

:::

:::details Events bound with to way on <code>GmapMarker</code>

```javascript
const events = [
  'click',
  'rightclick',
  'dblclick',
  'drag',
  'dragstart',
  'dragend',
  'mouseup',
  'mousedown',
  'mouseover',
  'mouseout',
];
```

:::

## How to use it

```vue
<template>
  <gmap-map :center="center" :zoom="7" style="width: 100%; height: 500px">
    <gmap-marker
      v-for="m in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    >
    </gmap-marker>
  </gmap-map>
</template>

<script>
export default {
  data() {
    return {
      markers: [{
        position: {
          lat: 10.0,
          lng: 10.0
        }
      }],
    }
  }
}
</script>
```

If you need to know the API of this component please read it [here](/code/components/marker.html).

## Html examples

:::details Basic marker HTML example

```html
<body>
  <div id="root">
    <gmap-map :center="center" :zoom="7" style="width: 100%; height: 500px">
      <gmap-marker v-for="m in markers" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position"></gmap-marker>
    </gmap-map>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.2.2/dist/gmap-vue.min.js"></script>

  <script>
    Vue.use(GmapVue, {
      load: {
        key: 'AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc'
      },
      // Demonstrating how we can customize the name of the components
      installComponents: false,
    });

    document.addEventListener('DOMContentLoaded', function() {
      Vue.component('google-map', GmapVue.Map);
      Vue.component('google-marker', GmapVue.Marker);

      new Vue({
        el: '#root',
        data: {
          center: {
            lat: 10.0,
            lng: 10.0
          },
          markers: [{
            position: {
              lat: 10.0,
              lng: 10.0
            }
          }, {
            position: {
              lat: 11.0,
              lng: 11.0
            }
          }]
        },
      });
    });
  </script>
</body>
```

:::

:::details Shape marker HTML example

```html
<body>
  <div id="root">
    <p>Only the dark dots in the middle of the marker are clickable</p>

    <google-map :center="center" :zoom="7" style="width: 100%; height: 500px">
      <google-marker v-for="m in markers" :position="m.position" :clickable="true"
      :draggable="true" @click="center=m.position" :shape="shape"></google-marker>
    </google-map>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.2.2/dist/gmap-vue.min.js"></script>

  <script>
    Vue.use(GmapVue, {
      load: {
        key: 'AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc'
      },
      // Demonstrating how we can customize the name of the components
      installComponents: false,
    });

    document.addEventListener('DOMContentLoaded', function() {
      Vue.component('google-map', GmapVue.Map);
      Vue.component('google-marker', GmapVue.Marker);

      new Vue({
        el: '#root',
        data: {
          center: {
            lat: 10.0,
            lng: 10.0
          },
          markers: [{
            position: {
              lat: 10.0,
              lng: 10.0
            }
          }, {
            position: {
              lat: 11.0,
              lng: 11.0
            }
          }],
          shape: {
            coords: [10, 10, 10, 15, 15, 15, 15, 10],
            type: 'poly'
          },
        },
      });
    });
  </script>
</body>
```

:::

## Test the component

:::details Click to see the basic marker HTML example in action

<eg-base>
  <eg-marker />
</eg-base>

:::

:::details Click to see the shape marker HTML example in action

<eg-base>
  <eg-basic-marker-shape />
</eg-base>

:::
