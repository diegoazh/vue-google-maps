<template>
  <div>
    <h3>Changing Default Place updates text box</h3>
    <small>
      <ol>
        <li>select a place</li>
        <li>click in place input</li>
        <li>select one option of the list</li>
        <li>press <kbd>&#9166;</kbd></li>
      </ol>
    </small>
    <button @click="setDescription('Tokyo')">Set to Tokyo</button>&nbsp;
    <button @click="setDescription('Shanghai')">Set to Shanghai</button>&nbsp;
    <button @click="setDescription('Seoul')">Set to Seoul</button>
    <br>
    <br>
    <label>
      <strong>Place:</strong>
      <gmap-autocomplete :value="description" placeholder="This is a placeholder text" @place_changed="setPlace"
        :select-first-on-enter="true">
      </gmap-autocomplete>
    </label>
    <br />
    <p>Use a place input to see coordinates</p>
    <strong>lat:</strong> <i>{{latLng.lat}}</i>,
    <strong>lng:</strong> <i>{{latLng.lng}}</i>

    <div>
      <h3>Options work</h3>
      You cannot find the state of Texas in this
      <label>
        Only locations in Singapore:
        <gmap-autocomplete :value="description" @place_changed="setPlace" :options="{
            bounds: {north: 1.4, south: 1.2, east: 104, west: 102},
            strictBounds: true
          }">
        </gmap-autocomplete>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'eg-basic-autocomplete',
  data () {
    return {
      description: 'Singapore',
      latLng: {
        lat: '',
        lng: '',
      }
    }
  },
  methods: {
    setDescription(description) {
      this.description = description;
    },
    setPlace(place) {
      if (!place) return

      console.log(place)

      this.latLng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
    }
  }
}
</script>
