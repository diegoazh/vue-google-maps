## Description

This component helps you to create a circle on Google Maps API.

For more information read the Google Maps documentation for [circles](https://developers.google.com/maps/documentation/javascript/examples/circle-simple#maps_circle_simple-javascript).

It is exported with the name `GmapCircle`.

## Variables

This component save the original circle object provided by Google Maps in a property called `$circleObject`, as the example below.

```javascript
this.$circleObject = new google.maps.Circle(...);
```

## Source code

:::details Click to se the source code of <code>circle.vue</code> component

```vue
<script>
import mapElementMixin from '../mixins/map-element';
import { circleMappedProps } from '../utils/mapped-props-by-map-element';
import { bindEvents, getPropsValues, bindProps } from '../utils/helpers';

export default {
  mixins: [mapElementMixin],
  props: {
    center: {
      type: Object,
      required: true,
    },
    radius: {
      type: Number,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    editable: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
    },
  },
  render() {
    return '';
  },
  async provide() {
    // events to bind with toWay
    const events = [
      'click',
      'dblclick',
      'drag',
      'dragend',
      'dragstart',
      'mousedown',
      'mousemove',
      'mouseout',
      'mouseover',
      'mouseup',
      'rightclick',
    ];

    // Infowindow needs this to be immediately available
    const promise = this.$mapPromise
      .then((map) => {
        this.$map = map;

        // Initialize the maps with the given options
        const initialOptions = {
          ...this.options,
          map,
          ...getPropsValues(this, circleMappedProps),
        };
        const { options: extraOptions, ...finalOptions } = initialOptions;
        this.$circleObject = new google.maps.Circle(finalOptions);
        bindProps(this, this.$circleObject, circleMappedProps);
        bindEvents(this, this.$circleObject, events);

        return this.$circleObject;
      })
      .catch((error) => {
        throw error;
      });

    this.$circlePromise = promise;
    return { $circlePromise: promise };
  },
  destroyed() {
    // Note: not all Google Maps components support maps
    if (this.$circleObject && this.$circleObject.setMap) {
      this.$circleObject.setMap(null);
    }
  },
};
</script>

```

:::

If you need to know what are `mappedProps` please read the general concepts of this application [here](/examples/#mapped-props).

::: details Mapped Props of <code>GmapCircle</code> component

```javascript
export const circleMappedProps = {
  center: {
    type: Object,
    twoWay: true,
    required: true,
  },
  radius: {
    type: Number,
    twoWay: true,
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  editable: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Object,
    twoWay: false,
  },
};
```

:::

:::details Events bound with to way on <code>GmapCircle</code>

```javascript
const events = [
  'click',
  'dblclick',
  'drag',
  'dragend',
  'dragstart',
  'mousedown',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'rightclick',
];
```

:::

## How to use it

```vue
<!-- you can use the auto close form if you want -->
<gmap-circle />

<!-- or -->
<gmap-circle></gmap-circle>
```

If you need to know the API of this component please read it [here](/code/components/circle.html).
