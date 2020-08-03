<template>
  <div id="container">
    <h3>Drawing Manager Example</h3>
    <div style="width: 100%;">
      <span style="width: auto;" />
      <ul>
        <li><strong>Mode:</strong> {{ mapMode }}</li>
      </ul>
      <span style="width: auto;" />
      <button @click="setMapMode">
        {{ mapMode === "ready" ? "Edit" : "Ready" }}
      </button>
    </div>
    <br />
    <gmap-map
      ref="mapRef"
      :center="mapCenter"
      :zoom="17"
      map-type-id="roadmap"
      style="width: 100%; height: 100%;"
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
          v-if="mapMode === 'edit'"
          :rectangle-options="rectangleOptions"
          :circle-options="circleOptions"
          :shapes="shapes"
        >
          <div>
            <button @click="setDrawingMode('rectangle')">Rectangle</button>
            <button @click="setDrawingMode('circle')">Circle</button>
            <button @click="deleteSelection()">Delete</button>
            <button @click="mapMode = 'ready'">Save</button>
          </div>
        </gmap-drawing-manager>
      </template>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "eg-drawing-manager-with-slot",
  data() {
    return {
      mapCenter: { lat: 0, lng: 0 },
      mapMode: null,
      mapDraggable: true,
      mapCursor: null,
      shapes: [],
      rectangleOptions: {
        fillColor: "#777",
        fillOpacity: 0.4,
        strokeWeight: 2,
        strokeColor: "#999",
        draggable: false,
        editable: false,
        clickable: true
      },
      circleOptions: {
        fillColor: "#777",
        fillOpacity: 0.4,
        strokeWeight: 2,
        strokeColor: "#999",
        draggable: false,
        editable: false,
        clickable: true
      }
    };
  },
  watch: {
    mapMode(newMode, oldMode) {
      if (newMode === "ready") {
        if (oldMode === "edit") {
          this.mapDraggable = true;
          this.mapCursor = null;
          return;
        }
      }

      if (newMode === "edit") {
        this.mapDraggable = false;
        this.mapCursor = "default";
      }
    }
  },
  mounted() {
    this.mapMode = "ready";
  },
  methods: {
    setMapMode() {
      if (this.mapMode === "edit") {
        this.mapMode = "ready";
      } else {
        this.mapMode = "edit";
      }
    }
  }
};
</script>

<style scoped>
#container {
  width: 700px;
  height: 300px;
  margin-bottom: 9rem;
}
</style>
