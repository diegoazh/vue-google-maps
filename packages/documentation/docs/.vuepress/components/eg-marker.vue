<template>
  <div>
    <gmap-map :center="center" :zoom="7" style="width: 100%; height: 500px">
      <gmap-marker v-for="m in markers" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position"></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: 'eg-marker',
  data () {
    return {
      center: {
        lat: 10.0,
        lng: 10.0
      },
      markers: [{
        position: {
          lat: 10.0,
          lng: 10.0
        }
      }, {
        position: {
          lat: 11.0,
          lng: 11.0
        }
      }]
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
