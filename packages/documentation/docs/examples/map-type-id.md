## Live example

<eg-base>
  <eg-map-type-id />
</eg-base>

## Source code

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
