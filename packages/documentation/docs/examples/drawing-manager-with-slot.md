## Live example

<eg-base libraries="places,drawing">
  <eg-drawing-manager-with-slot />
</eg-base>

::: warning
If you are using the runtime-only build the template on `toolbarTemplate` will not work, instead of that
you need to pre-compile the templates into render functions, or use the compiler-included build.
:::

## Source code

```html
<body>
  <div id="root">
    <h1>Drawing Manager Example</h1>
    <div style="width:100%; display: flex; justify-content: center;">
      <span style="width: auto;" />
      {{ mapMode }}
      <span style="width: auto;" />
      <button @click="mapMode='edit'">Edit</button>
    </div>
    <br />
    <gmap-map
      ref="mapRef"
      :center="mapCenter"
      :zoom="7"
      map-type-id="roadmap"
      style="width: 100%; height: 800px; display:flex; justify-content: center; align-items: flex-start;"
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
          :rectangle-options="rectangleOptions"
          :circle-options="circleOptions"
          :polyline-options="polylineOptions"
          :polygon-options="polygonOptions"
          :shapes="shapes"
        >
          <template v-slot="on">
            <drawing-toolbar
              @drawingmode_changed="on.setDrawingMode($event)"
              @delete_selection="on.deleteSelection()"
              @save="mapMode='ready'"
            />
          </template>
        </gmap-drawing-manager>
      </template>
    </gmap-map>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.2.2/dist/gmap-vue.min.js"></script>

  <script>
    // Only for example purposes
    // In a real application you would simply create a separate component
    const toolbarTemplate =
      '<div style="background-color: #040404; display: flex; position: absolute; padding: 8px">' +
      "  <div><button @click=\"$emit('drawingmode_changed', 'rectangle')\">Rectangle</button></div>" +
      "  <div><button @click=\"$emit('drawingmode_changed', 'circle')\">Circle</button></div>" +
      "  <div><button @click=\"$emit('drawingmode_changed', 'polyline')\">Line</button></div>" +
      "  <div><button @click=\"$emit('drawingmode_changed', 'polygon')\">Polygon</button></div>" +
      "  <div><button @click=\"$emit('delete_selection')\">Delete</button></div>" +
      "  <div><button @click=\"$emit('save')\">Save</button></div>" +
      "</div>";

    Vue.use(GmapVue, {
      load: {
        key: 'AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc',
        libraries: 'places,drawing'
      }
    });

    document.addEventListener('DOMContentLoaded', function() {
      new Vue({
        el: '#root',
        components: {
          drawingToolbar: {
            template: toolbarTemplate
          }
        },
        data: {
          mapCenter: { lat: 4.5, lng: 99 },
          mapMode: null,
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
          },
          polygonOptions: {
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
        }
      });
    });
  </script>
</body>
```
