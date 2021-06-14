## Description

This component helps you to create a Google Map.

For more information read the Google Maps documentation for [map](https://developers.google.com/maps/documentation/javascript/basics).

It is exported with the name `GmapMap`.

## Variables

This component save the original map object instance provided by Google Maps in a property called `$mapObject`, as the example below.

```javascript
  this.$mapObject = new google.maps.Map(element, options);;
```

## Source code

:::details Click to se the source code of <code>map.vue</code> component

```vue
<template>
  <div class="vue-map-container">
    <div ref="vue-map" class="vue-map"></div>
    <div class="vue-map-hidden">
      <slot></slot>
    </div>
    <slot name="visible"></slot>
  </div>
</template>

<script>
import mountableMixin from '../mixins/mountable';
import {
  bindEvents,
  bindProps,
  getPropsValues,
  twoWayBindingWrapper,
  watchPrimitiveProperties,
} from '../utils/helpers';
import { mapMappedProps } from '../utils/mapped-props-by-map-element';

export default {
  mixins: [mountableMixin],
  props: {
    center: {
      type: Object,
      required: true,
    },
    zoom: {
      type: Number,
      required: false,
    },
    heading: {
      type: Number,
    },
    mapTypeId: {
      type: String,
    },
    tilt: {
      type: Number,
    },
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      recyclePrefix: '__gmc__',
    };
  },
  provide() {
    this.$mapPromise = new Promise((resolve, reject) => {
      this.$mapPromiseDeferred = { resolve, reject };
    });

    return {
      $mapPromise: this.$mapPromise,
    };
  },
  computed: {
    finalLat() {
      return this.center && typeof this.center.lat === 'function'
        ? this.center.lat()
        : this.center.lat;
    },
    finalLng() {
      return this.center && typeof this.center.lng === 'function'
        ? this.center.lng()
        : this.center.lng;
    },
    finalLatLng() {
      return { lat: this.finalLat, lng: this.finalLng };
    },
  },
  watch: {
    zoom(zoom) {
      if (this.$mapObject) {
        this.$mapObject.setZoom(zoom);
      }
    },
  },
  beforeDestroy() {
    const recycleKey = this.getRecycleKey();
    if (window[recycleKey]) {
      window[recycleKey].div = this.$mapObject.getDiv();
    }
  },
  mounted() {
    return this.$gmapApiPromiseLazy()
      .then(() => {
        const events = [
          'bounds_changed',
          'click',
          'dblclick',
          'drag',
          'dragend',
          'dragstart',
          'idle',
          'mousemove',
          'mouseout',
          'mouseover',
          'resize',
          'rightclick',
          'tilesloaded',
        ];

        // getting the DOM element where to create the map
        const element = this.$refs['vue-map'];

        // creating the map
        const initialOptions = {
          ...this.options,
          ...getPropsValues(this, mapMappedProps),
        };

        // don't use delete keyword in order to create a more predictable code for the engine
        const { options: extraOptions, ...finalOptions } = initialOptions;
        const options = finalOptions;

        const recycleKey = this.getRecycleKey();
        if (this.options.recycle && window[recycleKey]) {
          element.appendChild(window[recycleKey].div);
          this.$mapObject = window[recycleKey].map;
          this.$mapObject.setOptions(options);
        } else {
          // console.warn('[vue2-google-maps] New google map created')
          this.$mapObject = new google.maps.Map(element, options);
          window[recycleKey] = { map: this.$mapObject };
        }

        // binding properties (two and one way)
        bindProps(this, this.$mapObject, mapMappedProps);
        // binding events
        bindEvents(this, this.$mapObject, events);

        // manually trigger center and zoom
        twoWayBindingWrapper((increment, decrement, shouldUpdate) => {
          this.$mapObject.addListener('center_changed', () => {
            if (shouldUpdate()) {
              this.$emit('center_changed', this.$mapObject.getCenter());
            }
            decrement();
          });

          const updateCenter = () => {
            increment();
            this.$mapObject.setCenter(this.finalLatLng);
          };

          watchPrimitiveProperties(
            this,
            ['finalLat', 'finalLng'],
            updateCenter
          );
        });
        this.$mapObject.addListener('zoom_changed', () => {
          this.$emit('zoom_changed', this.$mapObject.getZoom());
        });
        this.$mapObject.addListener('bounds_changed', () => {
          this.$emit('bounds_changed', this.$mapObject.getBounds());
        });

        this.$mapPromiseDeferred.resolve(this.$mapObject);

        return this.$mapObject;
      })
      .catch((error) => {
        throw error;
      });
  },
  methods: {
    resize() {
      if (this.$mapObject) {
        google.maps.event.trigger(this.$mapObject, 'resize');
      }
    },
    resizePreserveCenter() {
      if (!this.$mapObject) {
        return;
      }

      const oldCenter = this.$mapObject.getCenter();
      google.maps.event.trigger(this.$mapObject, 'resize');
      this.$mapObject.setCenter(oldCenter);
    },

    /// Override mountableMixin::_resizeCallback
    /// because resizePreserveCenter is usually the
    /// expected behaviour
    // eslint-disable-next-line no-underscore-dangle -- old code
    _resizeCallback() {
      this.resizePreserveCenter();
    },
    panBy(...args) {
      if (this.$mapObject) {
        this.$mapObject.panBy(...args);
      }
    },
    panTo(...args) {
      if (this.$mapObject) {
        this.$mapObject.panTo(...args);
      }
    },
    panToBounds(...args) {
      if (this.$mapObject) {
        this.$mapObject.panToBounds(...args);
      }
    },
    fitBounds(...args) {
      if (this.$mapObject) {
        this.$mapObject.fitBounds(...args);
      }
    },
    getRecycleKey() {
      return this.options.recycle
        ? this.recyclePrefix + this.options.recycle
        : this.recyclePrefix;
    },
  },
};
</script>

<style lang="css">
.vue-map-container {
  position: relative;
}

.vue-map-container .vue-map {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
}
.vue-map-hidden {
  display: none;
}
</style>

```

:::

If you need to know what are `mappedProps` please read the general concepts of this application [here](/examples/#mapped-props).

:::details Mapped Props of <code>GmapMap</code> component

```javascript
export const mapMappedProps = {
  center: {
    required: true,
    twoWay: true,
    type: Object,
    noBind: true,
  },
  zoom: {
    required: false,
    twoWay: true,
    type: Number,
    noBind: true,
  },
  heading: {
    type: Number,
    twoWay: true,
  },
  mapTypeId: {
    twoWay: true,
    type: String,
  },
  tilt: {
    twoWay: true,
    type: Number,
  },
  options: {
    type: Object,
    default() {
      return {};
    },
  },
};
```

:::

:::details Events bound with to way on <code>GmapMap</code>

```javascript
const events = [
  'bounds_changed',
  'click',
  'dblclick',
  'drag',
  'dragend',
  'dragstart',
  'idle',
  'mousemove',
  'mouseout',
  'mouseover',
  'resize',
  'rightclick',
  'tilesloaded',
];
```

:::

## How to use it

```vue
<template>
  <gmap-map
    :center="center"
    :zoom="7"
    ref="mmm"
    style="width: 100%; height: 500px;"
  >
  </gmap-map>
</template>
```

If you need to know the API of this component please read it [here](/code/components/map.html).

## Html examples

:::details HTML example with center twoway

```html
<head>
  <meta charset="utf-8" />
  <style>
  .map-container {
    width: 400px;
    height: 400px;
    display: inline-block;
  }
  .flex-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  </style>
</head>
<body>
  <script>
  var tests = [];

  </script>

  <div id="test1">
    <h2>Test 1</h2>
    <ol>
      <li>You can pan around this map, and the center is updated.</li>
      <li>When you edit the lat/lng the map center is updated</li>
    </ol>

    <div>
      <small><strong>Lat:</strong></small>
      <input type="number"
        v-model.number.lazy="reportedMapCenter.lat"
        @change="sync"
        step="0.00001" />
      &nbsp;
      <small><strong>Lng:</strong></small>
      <input type="number"
        v-model.number.lazy="reportedMapCenter.lng"
        @change="sync"
        step="0.00001" />
    </div>
    <br>

    <div class="flex-container">
      <div>
        <gmap-map :center="mapCenter" :zoom="12"
          ref="map"
          @center_changed="updateCenter"
          @idle="sync"
          class="map-container">
        </gmap-map>
      </div>
      <div>
        <gmap-street-view-panorama
          :position="mapCenter"
          ref="pano"
          @position_changed="updateCenter"
          :pov="pov"
          class="map-container">
        </gmap-street-view-panorama>
      </div>
    </div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.16.4/lodash.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.2.2/dist/gmap-vue.min.js"></script>

  <script>
    Vue.use(GmapVue, {
      load: {
        key: 'AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc',
      }
    });

    document.addEventListener('DOMContentLoaded', function() {
      new Vue({
        el: '#test1',
        data: {
          reportedMapCenter: {
            lat: 1.32,
            lng: 103.8
          },
          mapCenter: null,
          pov: {
            pitch: 0,
            heading: 0,
          },
        },
        created () {
          this.sync()
        },
        methods: {
          updateCenter(latLng) {
            this.reportedMapCenter = {
              lat: latLng.lat(),
              lng: latLng.lng(),
            }
          },
          sync () {
            this.mapCenter = this.reportedMapCenter
          }
        }
      });
    });
  </script>
</body>
```

:::

:::details HTML example with center

```html
<head>
  <style>
    .map-container {
      width: 400px;
      height: 400px;
    }
    .flex-test3-container {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
    .flex-test3-container > div {
      display: flex;
      flex-direction: row;
    }
    .flex-test3-container > div > small {
      margin-right: .3rem;
      font-size: 16px;
      font-weight: bolder;
    }
  </style>
</head>
<body>
  <script>
    var tests = [];
  </script>

  <div id="test1">
    <h2>Test 1</h2>
    <small><strong>Passes if:</strong> You can pan around this map without it being snapped back to the center</small>
    <br><br>
    <gmap-map :center="{lat: 1.38, lng: 103.8}" :zoom="12"
      class="map-container">
    </gmap-map>
  </div>
  <script>
    tests.push(() => {
      new Vue({
        el: '#test1',
      });
    });
  </script>

  <div id="test2">
    <h2>Test 2</h2>
    <small><strong>Passes if:</strong> Clicking the button changes the center</small>
    <br>
    <button @click="changeCenter">Change Center</button>&nbsp;
    <button @click="changeZoom">Change Zoom</button>
    <br><br>
    <gmap-map :center="changingCenter" :zoom="changingZoom" class="map-container">
    </gmap-map>
  </div>
  <script>
    tests.push(() => {
      new Vue({
        el: '#test2',
        data: {
          changingZoom: 12,
          changingCenter: {lat: 1.38, lng: 103.8},
        },
        methods: {
          changeCenter() {
            this.changingCenter = {
              lat: 1.38 + Math.random() * 0.3,
              lng: 103.8 + Math.random() * 0.1
            };
          },
          changeZoom() {
            this.changingZoom = Math.floor(5 + Math.random() * 10);
          },
        }
      });
    });
  </script>

  <div id="test3">
    <h2>Test 3</h2>
    <small><strong>Passes if:</strong> Resize of (1) is artefact-free.</small>
    <br>
    <small><strong>Passes if:</strong> Resize of (2) preserves the center</small>
    <br>
    <button @click="changeSize">Change Size</button>
    <br><br>

    <div class="flex-test3-container">
      <div>
        <small><strong>1</strong></small>
        <gmap-map :center="changingCenter" :zoom="changingZoom" ref="resizeMap1"
        :style="changingSize" class="map-container">
        </gmap-map>
      </div>
      <div>
        <small><strong>2</strong></small>
        <gmap-map :center="changingCenter" :zoom="changingZoom" ref="resizeMap2"
        :style="changingSize" class="map-container">
        </gmap-map>
      </div>
    </div>
  </div>
  <script>
    tests.push(() => new Vue({
      el: '#test3',
      data: {
        changingZoom: 12,
        changingCenter: {lat:1.38, lng:103.8},
        changingWidth: 200,
        changingHeight: 200,
        i: 0,
      },
      computed: {
        changingSize() {
          return {
            width: this.changingWidth + 'px',
            height: this.changingHeight + 'px',
          };
        }
      },
      methods: {
        changeCenter() {
          this.changingCenter = {
            lat: 1.38 + Math.random() * 0.3,
            lng: 103.8 + Math.random() * 0.1
          };
        },
        changeZoom() {
          this.changingZoom = Math.floor(5 + Math.random() * 10);
        },
        changeSize() {
          this.i = (this.i + 1) % 2;
          this.changingWidth = 200 + this.i * 300;
          this.changingHeight = 200 + Math.random() * 150;
          this.$nextTick(() => {
            this.$refs.resizeMap1.resize();
            this.$refs.resizeMap2.resizePreserveCenter();
          });
        }
      }
    }));
  </script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.16.4/lodash.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.2.2/dist/gmap-vue.min.js"></script>

  <script>
    Vue.use(GmapVue, {
      load: {
        key: 'AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc',
      }
    });

    document.addEventListener('DOMContentLoaded', function() {
      Vue.component('gmap-map', GmapVue.Map);

      for (let test of tests) {
        test();
      }
    });
  </script>
</body>
```

:::

:::details HTML example with destroy

```html
<body>
  <div id="root">
    <h1>Resize Bus</h1>

    <p>
      There should be no error toggling the visibility of the maps
      <button @click=updateStyle>
        Toggle Visibility
      </button>
    </p>

    <div v-if="showElements">
      <gmap-map
        :style="currentStyle"
        :center="{lat: 1.38, lng: 103.8}"
        :zoom=12>
      </gmap-map>

      <gmap-map
        :style="currentStyle"
        :center="{lat: 1.38, lng: 103.8}"
        :zoom=12>
      </gmap-map>

      <gmap-map
        :style="currentStyle"
        :center="{lat: 1.38, lng: 103.8}"
        :zoom=12
        :resize-bus="customBus">
      </gmap-map>
    </div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.2.2/dist/gmap-vue.min.js"></script>

  <script>
    Vue.use(GmapVue, {
      load: {
        key: 'AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc',
      },
    });

    document.addEventListener('DOMContentLoaded', function() {
      new Vue({
        el: '#root',
        data: {
          currentStyle: {
            display: 'inline-block',
            width: '200px',
            height: '200px',
          },
          showElements: true,
          customBus: new Vue(),
        },
        methods: {
          updateStyle() {
            this.showElements = !this.showElements;
            Vue.$gmapDefaultResizeBus.$emit('resize');
          },
          updateBus() {
            this.customBus.$emit('resize');
          }
        }
      });
    });
  </script>
</body>
```

:::

:::details HTML example of map functions

```html
<body>
  <div id="root">
    <button @click="panTo">
      Pan To
    </button>

    <button @click="panToBounds">
      Pan To Bounds
    </button>

    <button @click="fitBounds">
      Fit Bounds
    </button>

    <gmap-map :center="center" :zoom="7" ref="mmm" style="width: 100%; height: 500px">
      <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position"></gmap-marker>
    </gmap-map>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"></script>
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

        methods: {
          fitBounds() {
            var b = new google.maps.LatLngBounds();

            b.extend({
              lat: 33.972,
              lng: 35.4054
            });
            b.extend({
              lat: 33.7606,
              lng: 35.64592
            });

            this.$refs.mmm.fitBounds(b);
          },
          panToBounds() {
            var b = new google.maps.LatLngBounds();

            b.extend({
              lat: 33.972,
              lng: 35.4054
            });
            b.extend({
              lat: 33.7606,
              lng: 35.64592
            });

            this.$refs.mmm.panToBounds(b);
          },
          panTo() {
            this.$refs.mmm.panTo({
              lat: 47.912867,
              lng: 106.910723
            });
          },
        }
      });
    });
  </script>
</body>
```

:::

:::details HTML example of map type id

```html
<body>
  <div id="root">
    <p>Map type id <strong>{{mapTypeId}}</strong></p>

    <gmap-map :center="center" :zoom="15" style="width: 100%; height: 500px"
        @maptypeid_changed="updateMapType"
        :map-type-id="mapTypeId">
    </gmap-map>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.js"></script>
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
            lat: 47.376332,
            lng: 8.547511
          },
          mapTypeId: "terrain",
        },
        methods: {
          updateMapType: function(type) {
            this.mapTypeId = type
          }
        }
      });
    });
  </script>
</body>
```

:::

## Test the component

:::details Click to see the HTML example with center twoway in action

<eg-base>
  <eg-map-center-twoway />
</eg-base>

:::

:::details Click to see the HTML example with center in action

<eg-base>
  <eg-map-center />
</eg-base>

:::

:::details Click to see the HTML example with destroy in action

<eg-base>
  <eg-map-destroy />
</eg-base>

:::

:::details Click to see the HTML example of map functions in action

<eg-base>
  <eg-map-functions />
</eg-base>

:::

:::details Click to see the HTML example of map type id in action

<eg-base>
  <eg-map-type-id />
</eg-base>

:::
