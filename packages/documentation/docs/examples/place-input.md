## Live example

::: danger
DEPRECATED, use [autocomplete](/examples/autocomplete.html) component instead.
:::

<eg-base>
  <eg-place-input />
</eg-base>

## Source code

```html
<body>
  <div id="root">
    <h1>Changing Default Place updates text box</h1>
    <button @click="setPlaceText('Tokyo')">Set to Tokyo</button><br/>
    <button @click="setPlaceText('Shanghai')">Set to Shanghai</button><br/>
    <button @click="setPlaceText('Seoul')">Set to Seoul</button><br/>
    <gmap-place-input :default-place="place"
      @place_changed="setPlace">
    </gmap-place-input>
    <br/>
    {{latLng.lat}},
    {{latLng.lng}}
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.16.4/lodash.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.2.2/dist/gmap-vue.min.js"></script>

  <script>
    Vue.use(GmapVue, {
      load: {
        key: 'AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc',
        libraries: 'places'
      },
    });

    document.addEventListener('DOMContentLoaded', function() {
      new Vue({
        el: '#root',
        data: {
          place: 'Singapore',
          latLng: {}
        },
        methods: {
          setPlaceText(place) {
            this.place = place;
          },
          setPlace(place) {
            this.latLng = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            };
          }
        }
      });
    });
  </script>
</body>
```
