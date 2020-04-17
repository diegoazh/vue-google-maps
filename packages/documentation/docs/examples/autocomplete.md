
## Live example

<eg-base>
  <eg-autocomplete />
</eg-base>

## Source code

```html
<body>
  <div id="root">
    <h1>Autocomplete Example (#164)</h1>
    <label>
      AutoComplete
      <gmap-autocomplete placeholder="This is a placeholder text" @place_changed="setPlace">
      </gmap-autocomplete>
      <button @click="usePlace">Add</button>
    </label>
    <br />

    <Gmap-Map style="width: 600px; height: 300px;" :zoom="1" :center="{lat: 0, lng: 0}">
      <Gmap-Marker v-for="(marker, index) in markers" :key="index" :position="marker.position"></Gmap-Marker>
      <Gmap-Marker v-if="this.place" label="&#x2605;" :position="{
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng(),
        }"></Gmap-Marker>
    </Gmap-Map>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.17/vue.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.0.0/dist/gmap-vue.min.js"></script>

  <script>
    Vue.use(GmapVue, {
      load: {
        key: 'AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc',
        libraries: 'places'
      },
    });

    document.addEventListener('DOMContentLoaded', function () {
      new Vue({
        el: '#root',
        data: {
          markers: [],
          place: null,
        },
        methods: {
          setDescription(description) {
            this.description = description;
          },
          setPlace(place) {
            this.place = place
          },
          usePlace(place) {
            if (this.place) {
              this.markers.push({
                position: {
                  lat: this.place.geometry.location.lat(),
                  lng: this.place.geometry.location.lng(),
                }
              })
              this.place = null;
            }
          }
        }
      });
    });
  </script>
</body>
```

::: tip
The autocomplete supports cutsom text field via scoped slot

```html
          <gmap-autocomplete class="introInput" >
                    <template v-slot:input="slotProps">
                        <v-text-field outlined
                                      prepend-inner-icon="place"
                                      placeholder="Location Of Event"
                                      ref="input"
                                      v-on:listeners="slotProps.listeners"
                                      v-on:attrs="slotProps.attrs">
                        </v-text-field>
                    </template>
        </gmap-autocomplete>
```

The ref on the element must be called input, if the element is a vue component then it must have a child ref called input (like in vuetify text-field) or speciy a custom name via childRefName property (only works one level deep into a component).

The v-on:listeners is rquired, v-on:attrs may or may not be required depending on your implementation.
:::

::: warning
Cutsom text fields via scoped slot requires vue 2.6 or higher for the new slot support.
:::
