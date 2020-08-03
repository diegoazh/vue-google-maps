## About GmapVue

GmapVue is a fork from [vue2-google-maps](https://github.com/xkjyeah/vue-google-maps).

This project has all features added to `vue2-google-maps` plugin up to [v0.10.8](https://github.com/xkjyeah/vue-google-maps/releases/tag/v0.10.8), but in the case of `gmap-vue` it has **the last features** added to `vue2-google-maps` repository by the community developers in many PRs, that they can't landed in a new version of that project, for different reasons.

Because of that we fork the project and plain to continue working and adding new features to this great plugin.

## Installation

### npm

```shell
npm install gmap-vue --save
```

### yarn

```shell
yarn add gmap-vue
```

### Manually

Just download `dist/gmap-vue.js` file and include it from your HTML.

```html
<script src="./gmap-vue.js"></script>
```

### jsdelivr

You can use a free CDN like [jsdelivr](https://www.jsdelivr.com) to include this plugin in your html file

```html
<script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.2.0/dist/gmap-vue.min.js"></script>
```

### unpkg

You can use a free CDN like [unpkg](https://unpkg.com) to include this plugin in your html file

```html
<script src="https://unpkg.com/gmap-vue@1.2.0/dist/gmap-vue.js"></script>
```

::: warning
Be aware that if you use this method, you cannot use TitleCase for your components and your attributes.
That is, instead of writing `<GmapMap>`, you need to write `<gmap-map>`.
:::

[Source code](/examples/) - [Live example](http://diegoazh.github.io/gmap-vue/overlay.html).

## Basic usage

### Get an API key from Google

[Generating an Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key).

### Quickstart (Webpack, Nuxt):

If you are using Webpack and Vue file components, just add the following to your code!

```vue
<GmapMap
  :center="{lat:10, lng:10}"
  :zoom="7"
  map-type-id="terrain"
  style="width: 500px; height: 300px"
>
  <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :clickable="true"
    :draggable="true"
    @click="center=m.position"
  />
</GmapMap>
```

In your `main.js` or inside a Nuxt plugin:

```js
import Vue from 'vue'
import * as GmapVue from 'gmap-vue'

Vue.use(GmapVue, {
  load: {
    key: 'YOUR_API_TOKEN',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'gmap-vue/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then set installComponents to 'false'.
  //// If you want to automatically install all the components this property must be set to 'true':
  installComponents: true
})
```

If you need to gain access to the `Map` instance (e.g. to call `panToBounds`, `panTo`):
```vue
<template>
  <GmapMap ref="mapRef" ...>
  </GmapMap>
</template>
<script>
  export default {
    mounted () {
      // At this point, the child GmapMap has been mounted, but
      // its map has not been initialized.
      // Therefore we need to write mapRef.$mapPromise.then(() => ...)

      this.$refs.mapRef.$mapPromise.then((map) => {
        map.panTo({lat: 1.38, lng: 103.80})
      })
    }
  }
</script>
```

If you need to gain access to the `google` object:
```vue
<template>
  <GmapMap ref="mapRef" ...>
    <GmapMarker ref="myMarker" :position="google && new google.maps.LatLng(1.38, 103.8)" />
  </GmapMap>
</template>
<script>
  import {gmapApi} from 'gmap-vue'

  export default {
    computed: {
      google: gmapApi
    }
  }
</script>
```

Control the options of the map with the options property:

For more information about google [MapOptions](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions) visit the link.

 ```vue
 <GmapMap
  :options="{
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
    disableDefaultUi: false
  }"
>
</GmapMap>
```

Add region and language localization:

For more information about google [Localization](https://developers.google.com/maps/documentation/javascript/localization) visit the link.

```js
Vue.use(GmapVue, {
  load: {
    region: 'VI',
    language: 'vi',
  },
})
```

### Nuxt.js config

For Nuxt.js projects, please import GmapVue in the following way:

```js
import * as GmapVue from '~/node_modules/gmap-vue'
```

Add the following to your `nuxt.config.js`'s `build.extend()`:

```js
transpile: [/^gmap-vue($|\/)/]
```

### Officially supported components:

The list of officially support components are:

- Rectangle, Circle
- Polygon, Polyline
- KML Layer
- Marker
- InfoWindow
- Autocomplete
- Cluster* (via `marker-clusterer-plus`)

You can find examples of this on [examples](/examples/).
Auto-generated API documentation for these components are [here](http://diegoazh.github.io/gmap-vue/autoapi.html).

For `Cluster`, you **must** import the class specifically, e.g.
```js
import GmapCluster from 'gmap-vue/dist/components/cluster' // replace dist with src if you have Babel issues

Vue.component('GmapCluster', GmapCluster)
```
Inconvenient, but this means all other users don't have to bundle the marker clusterer package
in their source code.

### Adding your own components

It should be relatively easy to add your own components (e.g. Heatmap, GroundOverlay). please refer to the
[source code for `mapElementFactory`](https://github.com/diegoazh/gmap-vue/blob/vue2/src/factories/map-element.js).

Example for [DirectionsRenderer](https://developers.google.com/maps/documentation/javascript/reference/3/#DirectionsRenderer):

```js
// DirectionsRenderer.js
import { mapElementFactory } from 'gmap-vue'

export default mapElementFactory({
  name: 'directionsRenderer',
  ctr: () => google.maps.DirectionsRenderer,
  //// The following is optional, but necessary if the constructor takes multiple arguments
  //// e.g. for GroundOverlay
  // ctrArgs: (options, otherProps) => [options],
  events: ['directions_changed'],

  // Mapped Props will automatically set up
  //   this.$watch('propertyName', (v) => instance.setPropertyName(v))
  //
  // If you specify `twoWay`, then it also sets up:
  //   google.maps.event.addListener(instance, 'propertyName_changed', () => {
  //     this.$emit('propertyName_changed', instance.getPropertyName())
  //   })
  //
  // If you specify `noBind`, then neither will be set up. You should manually
  // create your watchers in `afterCreate()`.
  mappedProps: {
    routeIndex: { type: Number },
    options: { type: Object },
    panel: { },
    directions: { type: Object },
    //// If you have a property that comes with a `_changed` event,
    //// you can specify `twoWay` to automatically bind the event, e.g. Map's `zoom`:
    // zoom: {type: Number, twoWay: true}
  },
  // Any other properties you want to bind. Note: Must be in Object notation
  props: {},
  // Actions you want to perform before creating the object instance using the
  // provided constructor (for example, you can modify the `options` object).
  // If you return a promise, execution will suspend until the promise resolves
  beforeCreate (options) {},
  // Actions to perform after creating the object instance.
  afterCreate (directionsRendererInstance) {},
})
```

Thereafter, it's easy to use the newly-minted component!

```vue
<template>
  <GmapMap :zoom="..." :center="...">
    <DirectionsRenderer />
  </GmapMap>
</template>
<script>
import DirectionsRenderer from './DirectionsRenderer.js'

export default {
  components: {DirectionsRenderer}
}
</script>
```

## Testing

More automated tests should be written to help new contributors.

Meanwhile, please test your changes against the suite of [examples](examples).

Improvements to the tests are welcome :)
