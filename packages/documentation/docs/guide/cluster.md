## Description

This component helps you to create a cluster of markers on Google Maps API.

For more information read the Google Maps documentation for [clustering](https://developers.google.com/maps/documentation/javascript/marker-clustering).

It is exported with the name `GmapCluster`.

## Variables

This component save the original cluster object provided by Google Maps in a property called `$clusterObject`, as the example below.

```javascript
this.$clusterObject = new MarkerClusterer(...);
```

## Source code

:::details Click to se the source code of <code>cluster.vue</code> component

```vue
<template>
  <div>
    <!-- @slot Used to set your cluster -->
    <slot></slot>
  </div>
</template>

<script>
import MarkerClusterer from '@google/markerclustererplus';
import MapElementMixin from '../mixins/map-element';
import { clusterMappedProps } from '../utils/mapped-props-by-map-element';
import { bindEvents, getPropsValues, bindProps } from '../utils/helpers';

export default {
  mixins: [MapElementMixin],
  props: {
    maxZoom: {
      type: Number,
    },
    batchSizeIE: {
      type: Number,
    },
    calculator: {
      type: Function,
    },
    enableRetinaIcons: {
      type: Boolean,
    },
    gridSize: {
      type: Number,
    },
    averageCenter: {
      type: Boolean,
    },
    ignoreHidden: {
      type: Boolean,
    },
    imageExtension: {
      type: String,
    },
    imagePath: {
      type: String,
    },
    imageSizes: {
      type: Array,
    },
    minimumClusterSize: {
      type: Number,
    },
    clusterClass: {
      type: String,
    },
    styles: {
      type: Array,
    },
    zoomOnClick: {
      type: Boolean,
    },
  },
  async provide() {
    // events to bind with toWay
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

    // Infowindow needs this to be immediately available
    const promise = await this.$mapPromise
      .then((map) => {
        this.$map = map;

        // Initialize the maps with the given options
        const initialOptions = {
          ...this.options,
          map,
          ...getPropsValues(this, clusterMappedProps),
        };
        const { options: extraOptions, ...finalOptions } = initialOptions;

        if (typeof MarkerClusterer === 'undefined') {
          throw new Error(
            'MarkerClusterer is not installed! require() it or include it from https://cdnjs.cloudflare.com/ajax/libs/js-marker-clusterer/1.0.0/markerclusterer.js'
          );
        }

        const { map: mapInstance, markers, ...clusterOptions } = finalOptions;

        this.$clusterObject = new MarkerClusterer(
          mapInstance,
          markers,
          ...clusterOptions
        );

        bindProps(this, this.$clusterObject, clusterMappedProps);
        bindEvents(this, this.$clusterObject, events);

        Object.keys(clusterMappedProps).forEach((prop) => {
          if (clusterMappedProps[prop].twoWay) {
            this.$on(`${prop.toLowerCase()}_changed`, this.reinsertMarkers);
          }
        });

        return this.$clusterObject;
      })
      .catch((error) => {
        throw error;
      });

    this.$clusterPromise = promise;
    return { $clusterPromise: promise };
  },
  beforeDestroy() {
    /* Performance optimization when destroying a large number of markers */
    this.$children.forEach((marker) => {
      if (marker.$clusterObject === this.$clusterObject) {
        marker.$clusterObject = null;
      }
    });

    if (this.$clusterObject) {
      this.$clusterObject.clearMarkers();
    }
  },
  destroyed() {
    // Note: not all Google Maps components support maps
    if (this.$clusterObject && this.$clusterObject.setMap) {
      this.$clusterObject.setMap(null);
    }
  },
  updated() {
    if (this.$clusterObject) {
      this.$clusterObject.repaint();
    }
  },
  methods: {
    reinsertMarkers() {
      const oldMarkers = this.$clusterObject.getMarkers();
      this.$clusterObject.clearMarkers();
      this.$clusterObject.addMarkers(oldMarkers);
    },
  },
};
</script>

```

:::

If you need to know what are `mappedProps` please read the general concepts of this application [here](/examples/#mapped-props).

::: details Mapped Props of <code>GmapCluster</code> component

```javascript
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
```

:::

:::details Events bound with to way on <code>GmapCircle</code>

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
  <gmap-map
    :center="center"
    :zoom="7"
    style="width: 100%; height: 500px"
  >
    <!-- use the default slot to pass markers to it -->
    <gmap-cluster></gmap-cluster>
  </gmap-map>
</template>
```

If you need to know the API of this component please read it [here](/code/components/cluster.html).

## Html examples

```html
<body>
  <div id="root">
    <gmap-map :center="center" :zoom="7" style="width: 100%; height: 500px">
      <gmap-cluster>
        <gmap-marker v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true" :draggable="true"
          @click="center=m.position"
          :key="index"
          ></gmap-marker>
      </gmap-cluster>
    </gmap-map>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"></script>
  <script src="https://unpkg.com/@google/markerclustererplus@5.1.0/dist/markerclustererplus.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.2.2/dist/gmap-vue.min.js"></script>

  <script>
    Vue.use(GmapVue, {
      load: {
        key: 'AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc'
      },
    });

    document.addEventListener('DOMContentLoaded', function() {
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

## Test the component

:::details Click to see the html example in action

<eg-base>
  <eg-basic-marker-cluster />
</eg-base>

:::
