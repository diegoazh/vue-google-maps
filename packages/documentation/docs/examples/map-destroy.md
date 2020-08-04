## Live example

<eg-base>
  <eg-map-destroy />
</eg-base>

## Source code

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
