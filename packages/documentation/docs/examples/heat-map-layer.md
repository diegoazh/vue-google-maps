## Live example

<eg-base libraries="visualization">
  <eg-heat-map-layer />
</eg-base>

## Source code

::: warning
This component is one of the few components where you must use the Google `LatLng` object to create the markers, you can't use a generic object like `{ lat: 0, lng: 0 }` to generate them.
:::

```html
<body>
  <div id="root">
    <gmap-map
      ref="mapRef"
      :zoom="7"
      :center="center"
      map-type-id="roadmap"
      style="width: 100%; height: 500px;"
    >
      <gmap-marker
        v-for="(m, index) in markers"
        :key="index"
        :position="m.location"
        :clickable="true"
        :draggable="true"
        @click="center=m.location"
      />
      <gmap-heatmap-layer
        :data="markers"
        :options="{maxIntensity: 120, dissipating: false}"
      />
    </gmap-map>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.2.2/dist/gmap-vue.min.js"></script>

  <script>
    Vue.use(GmapVue, {
      load: {
        key: 'AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc',
        libraries: 'visualization'
      }
    });

    document.addEventListener('DOMContentLoaded', function() {
      new Vue({
        el: '#root',
        data: {
          center: { lat: 4.5, lng: 99 },
          markers: [],
        },
        async mounted() {
          await this.$gmapApiPromiseLazy();
          this.markers = [
            {
              location: new google.maps.LatLng({ lat: 3, lng: 101 }),
              weight: 100
            },
            {
              location: new google.maps.LatLng({ lat: 5, lng: 99 }),
              weight: 50
            },
            {
              location: new google.maps.LatLng({ lat: 6, lng: 97 }),
              weight: 80
            }
          ];
        }
      });
    });
  </script>
</body>
```

You also can use a computed property like below

```vue
<template>
  <gmap-map
    ref="mapRef"
    :zoom="7"
    :center="center"
    map-type-id="roadmap"
    style="width: 100%; height: 500px;"
  >
    <gmap-marker
      v-for="(m, index) in markers"
      :key="index"
      :position="m.location"
      :clickable="true"
      :draggable="true"
      @click="center=m.location"
    />
    <gmap-heatmap-layer
      :data="markers"
      :options="{maxIntensity: 120, dissipating: false}"
    />
  </gmap-map>
</template>
<script>
  import { gmapApi } from 'gmap-vue';

  export default {
    computed: {
      google: gmapApi,
      markers() {
        if (this.google) {
          return [
            { location: new google.maps.LatLng({ lat: 3, lng: 101 }), weight: 100 },
            { location: new google.maps.LatLng({ lat: 5, lng: 99 }), weight: 50  },
            { location: new google.maps.LatLng({ lat: 6, lng: 97 }), weight: 80 }
          ];
        }
        return [];
      },
    },
  };
</script>
```
