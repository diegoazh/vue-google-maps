## Live example

<eg-base>
  <eg-map-center />
</eg-base>

## Source code

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
