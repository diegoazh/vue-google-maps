## Live example

<eg-base>
  <eg-map-center-twoway />
</eg-base>

## Source code

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
