<template>
  <div>
    <gmap-map :center="center" :zoom="7" style="width: 100%; height: 500px">
      <google-kml-layer v-for="l in kmlLayers" :url="l.url" :clickable="true"></google-kml-layer>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: 'eg-kml-layer',
  data () {
    return {
      center: {
        lat: -19.257753,
        lng: 146.823688
      },
      kmlLayers: [{
        url: 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml'
      }],
    }
  },
}
</script>
