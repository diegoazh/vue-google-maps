## Live example

<eg-base libraries="places,drawing">
  <eg-drawing-manager />
</eg-base>

## Source code

```html
<body>
  <div id="root">
    <h1>Drawing Manager Example</h1>
    <div style="width:100%; display: flex; justify-content: center;">
      <span style="width:auto" />
      {{ mapMode }} - {{ toolbarPosition }}
      <span style="width:auto" />
      <button @click="setPos">Position</button>
      <button @click="mapMode='edit'">Edit</button>
    </div>
    <br />
    <gmap-map
      ref="mapRef"
      :center="mapCenter"
      :zoom="7"
      map-type-id="roadmap"
      style="width: 100%; height: 800px"
      :options="{
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
          disableDefaultUi: false,
          draggable: mapDraggable,
          draggableCursor: mapCursor
        }"
    >
      <template #visible>
        <gmap-drawing-manager
          v-if="mapMode==='edit'"
          :position="toolbarPosition"
          :rectangle-options="rectangleOptions"
          :circle-options="circleOptions"
          :polyline-options="polylineOptions"
          :shapes="shapes"
        />
      </template>
    </gmap-map>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.2.2/dist/gmap-vue.min.js"></script>

  <script>
    Vue.use(GmapVue, {
      load: {
        key: 'AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc',
        libraries: 'places,drawing'
      }
    });

    document.addEventListener('DOMContentLoaded', function() {
      new Vue({
        el: '#root',
        data: {
          mapCenter: { lat: 4.5, lng: 99 },
          mapMode: null,
          toolbarPosition: 'TOP_CENTER',
          mapDraggable: true,
          mapCursor: null,
          shapes: [],
          rectangleOptions: {
            fillColor: '#777',
            fillOpacity: 0.4,
            strokeWeight: 2,
            strokeColor: '#999',
            draggable: false,
            editable: false,
            clickable: true
          },
          circleOptions: {
            fillColor: '#777',
            fillOpacity: 0.4,
            strokeWeight: 2,
            strokeColor: '#999',
            draggable: false,
            editable: false,
            clickable: true
          },
          polylineOptions: {
            fillColor: '#777',
            fillOpacity: 0.4,
            strokeWeight: 2,
            strokeColor: '#999',
            draggable: false,
            editable: false,
            clickable: true
          }
        },
        watch: {
          mapMode(newMode, oldMode) {
            if (newMode === 'ready') {
              if (oldMode === 'edit') {
                this.mapDraggable = true;
                this.mapCursor = null;
                return;
              }
            }

            if (newMode === 'edit') {
              this.mapDraggable = false;
              this.mapCursor = 'default';
            }
          }
        },
        mounted() {
          this.mapMode = 'ready';
        },
        methods: {
          setPos() {
            const posTypes = [
              'TOP_CENTER',
              'TOP_LEFT',
              'TOP_RIGHT',
              'LEFT_TOP',
              'RIGHT_TOP',
              'LEFT_CENTER',
              'RIGHT_CENTER',
              'LEFT_BOTTOM',
              'RIGHT_BOTTOM',
              'BOTTOM_CENTER',
              'BOTTOM_LEFT',
              'BOTTOM_RIGHT'
            ];

            this.toolbarPosition =
              posTypes[Math.floor(Math.random() * posTypes.length)];
          }
        }
      });
    });
  </script>
</body>
```
