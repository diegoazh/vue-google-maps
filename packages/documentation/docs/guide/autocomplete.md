## Description

This component helps you to find and select a place on Google Maps API.

For more information read the Google Maps documentation for [autocomplete](https://developers.google.com/maps/documentation/javascript/places-autocomplete).

It is exported with the name `GmapAutocomplete`.

:::warning Braking changes

From `v2.x.x` we change the slot used in this component until `v1.5.0` and below it was named `input` from `v2.x.x` we use the `default` slot and its fallback content if you don't provide a slot content.

For more information please read the [Vue.js documentation for slots](https://vuejs.org/v2/guide/components-slots.html).

:::

## Variables

This component save the original autocomplete object provided by Google Maps in a property called `$autocomplete`, as the example below.

```javascript
this.$autocomplete = new google.maps.places.Autocomplete(...);
```

## Source code

:::details Click to se the source code of <code>autocomplete.vue</code> component

```vue
<template>
  <div>
    <slot v-bind:attrs="$attrs" v-bind:listeners="$listeners">
      <input ref="input" v-bind="$attrs" v-on="$listeners" />
    </slot>
  </div>
</template>

<script>
import {
  downArrowSimulator,
  getPropsValues,
  bindProps,
} from '../utils/helpers';
import { autocompleteMappedProps } from '../utils/mapped-props-by-map-element';

export default {
  props: {
    bounds: {
      type: Object,
    },
    componentRestrictions: {
      type: Object,
    },
    types: {
      type: Array,
      default() {
        return [];
      },
    },
    selectFirstOnEnter: {
      required: false,
      type: Boolean,
      default: false,
    },
    slotRefName: {
      required: false,
      type: String,
      default: 'input',
    },
    childRefName: {
      required: false,
      type: String,
      default: 'input',
    },
    options: {
      type: Object,
    },
    fields: {
      required: false,
      type: Array,
      default: null,
    },
  },
  async mounted() {
    await this.$gmapApiPromiseLazy();

    let scopedInput = null;

    if (this.$scopedSlots.default) {
      if (!Object.keys(this.$scopedSlots.default()[0].context.$refs).length) {
        throw new Error(
          'If you use the slot input you must add a ref to the element that you will use as the input, and if you use a vue component, eg: v-text-field, etc, you need to set the childRefName indicating what is the ref name of the html input elemnt behind your component.'
        );
      }

      scopedInput = this.$scopedSlots.default()[0].context.$refs[
        this.slotRefName
      ];

      if (scopedInput && scopedInput.$refs) {
        scopedInput = scopedInput.$refs[this.childRefName];
      }

      if (scopedInput) {
        this.$refs.input = scopedInput;
      }
    }

    if (this.selectFirstOnEnter) {
      downArrowSimulator(this.$refs.input);
    }

    if (typeof google.maps.places.Autocomplete !== 'function') {
      throw new Error(
        "google.maps.places.Autocomplete is undefined. Did you add 'places' to libraries when loading Google Maps?"
      );
    }

    const autocompleteOptions = {
      ...getPropsValues(this, autocompleteMappedProps),
      ...this.options,
    };

    this.$autocomplete = new google.maps.places.Autocomplete(
      this.$refs.input,
      autocompleteOptions
    );

    bindProps(this, this.$autocomplete, autocompleteMappedProps);

    if (this.fields) {
      this.$autocomplete.setFields(this.fields);
    }

    this.$autocomplete.addListener('place_changed', () => {
      this.$emit('place_changed', this.$autocomplete.getPlace());
    });
  },
  watch: {
    componentRestrictions(v) {
      if (v !== undefined) {
        this.$autocomplete.setComponentRestrictions(v);
      }
    },
  },
};
</script>
```

:::

If you need to know what are `mappedProps` please read the general concepts of this application [here](/examples/#mapped-props).

::: details Mapped Props of <code>GmapAutocomplete</code> component

```javascript
export const autocompleteMappedProps = {
  bounds: {
    type: Object,
  },
  componentRestrictions: {
    type: Object,
    noBind: true,
  },
  types: {
    type: Array,
    default() {
      return [];
    },
  },
};
```

:::

## How to use it

```vue
<!-- you can use the auto close form if you don't use the slot -->
<gmap-autocomplete />

<!-- or use the common form with the slot -->
<gmap-autocomplete></gmap-autocomplete>
```

If you need to know the API of this component please read it [here](/code/components/autocomplete.html).

## Html examples

:::details Complete HTML example

```html
<body>
  <div id="root">
    <h1>Autocomplete Example (#164)</h1>
    <label>
      AutoComplete
      <gmap-autocomplete
        placeholder="This is a placeholder text"
        @place_changed="setPlace">
      </gmap-autocomplete>
      <button @click="usePlace">Add</button>
    </label>
    <br />

    <gmap-map
      style="width: 600px; height: 300px;"
      :zoom="1"
      :center="{lat: 0, lng: 0}">
      <gmap-marker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"></gmap-marker>
      <gmap-marker v-if="this.place" label="&#x2605;" :position="{
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng(),
        }"></gmap-marker>
    </gmap-map>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.2.2/dist/gmap-vue.min.js"></script>

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

:::

:::details Basic HTML example

```html
<body>
  <div id="root">
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
      <gmap-autocomplete
        :value="description"
        placeholder="This is a placeholder text"
        @place_changed="setPlace"
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
        <gmap-autocomplete
          :value="description"
          @place_changed="setPlace"
          :options="{
            bounds: {north: 1.4, south: 1.2, east: 104, west: 102},
            strictBounds: true
          }">
        </gmap-autocomplete>
      </label>
    </div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.2.2/dist/gmap-vue.min.js"></script>

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
          description: 'Singapore',
          latLng: {
            lat: '',
            lng: '',
          }
        },
        methods: {
          setDescription(description) {
            this.description = description;
          },
          setPlace(place) {
            if (!place) return

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

:::

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

The ref on the element must be unique. If you create more than one autocomplete, each one should have a unique ref and it must be mentioned in the slot-ref-name prop. Like this:

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
        <gmap-autocomplete class="introInput" slot-ref-name="input2">
                    <template v-slot:input="slotProps">
                        <v-text-field outlined
                                      prepend-inner-icon="place"
                                      placeholder="Location Of Event"
                                      ref="input2"
                                      v-on:listeners="slotProps.listeners"
                                      v-on:attrs="slotProps.attrs">
                        </v-text-field>
                    </template>
        </gmap-autocomplete>
```

If the element in the slot is a vue component then it must have a child ref called input (like in vuetify text-field) or specify a custom name via the child-ref-name prop (only works one level deep into a component).

The v-on:listeners is rquired, v-on:attrs may or may not be required depending on your implementation.
:::

::: warning
Cutsom text fields via scoped slot requires vue 2.6 or higher for the new slot support.
:::

## Test the component

> This is the first HTML example

<eg-base>
  <eg-autocomplete />
</eg-base>

:::details Click to see the simple html example

<eg-base>
  <eg-basic-autocomplete />
</eg-base>

:::
