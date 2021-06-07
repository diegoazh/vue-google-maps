---
title: map
---
# Map
Map component

::: tip Tags
**see**: [source code](/guide/map.html#source-code)<br />**see**: [Official documentation](https://developers.google.com/maps/documentation/javascript/basics)<br />**see**: [Official reference](https://developers.google.com/maps/documentation/javascript/reference/map)<br />
:::

## Table of contents
[[toc]]

## Props

### resizeBus (`undefined`)


|type|default|description|
|:-|:-|:-|:-|
|`undefined`|-|undefined|
### center (`object`)
::: tip Tags
**see**: https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`object`|-|The initial Map center.|
### zoom (`number`)
::: tip Tags
**see**: https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`number`|-|The initial Map zoom level. Valid values: Integers between zero, and up to the supported maximum zoom level.|
### heading (`number`)
::: tip Tags
**see**: https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`number`|-|The heading for aerial imagery in degrees measured clockwise from cardinal direction North. Headings are snapped to the nearest available angle for which imagery is available.|
### mapTypeId (`string`)
::: tip Tags
**see**: https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`string`|-|The initial Map mapTypeId. Defaults to ROADMAP.|
### tilt (`number`)
::: tip Tags
**see**: https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`number`|-|For vector maps, sets the angle of incidence of the map. The allowed values are restricted depending on the zoom level of the map. For raster maps, controls the automatic switching behavior for the angle of incidence of the map. The only allowed values are 0 and 45. The value 0 causes the map to always use a 0° overhead view regardless of the zoom level and viewport. The value 45 causes the tilt angle to automatically switch to 45 whenever 45° imagery is available for the current zoom level and viewport, and switch back to 0 whenever 45° imagery is not available (this is the default behavior). 45° imagery is only available for satellite and hybrid map types, within some locations, and at some zoom levels. Note: getTilt returns the current tilt angle, not the value specified by this option. Because getTilt and this option refer to different things, do not bind() the tilt property; doing so may yield unpredictable effects.|
### options (`object`)


|type|default|description|
|:-|:-|:-|:-|
|`object`|{}|Extra options that you want pass to the component|


## Methods

### resize (undefined: `undefined`) -> `void`
 This method trigger the resize event of Google Maps

::: tip Tags
**method**: resize<br />**param**: undefined<br />**returns**: undefined<br />**access**: public<br />
:::

#### Params
| name | type | description
|:-|:-|:-|
|undefined|`undefined`|undefined

#### returns (void)
 undefined
### resizePreserveCenter (undefined: `undefined`) -> `void`
 Preserve the previous center when resize the map

::: tip Tags
**method**: resizePreserveCenter<br />**param**: undefined<br />**returns**: undefined<br />**access**: public<br />
:::

#### Params
| name | type | description
|:-|:-|:-|
|undefined|`undefined`|undefined

#### returns (void)
 undefined
### panBy (x: `number`,y: `number`) -> `void`
 Changes the center of the map by the given distance in pixels. If the distance is less than both the width and height of the map, the transition will be smoothly animated. Note that the map coordinate system increases from west to east (for x values) and north to south (for y values).

::: tip Tags
**method**: panBy<br />**param**: Number of pixels to move the map in the x direction.<br />**param**: Number of pixels to move the map in the y direction.<br />**returns**: undefined<br />**access**: public<br />
:::

#### Params
| name | type | description
|:-|:-|:-|
|x|`number`|Number of pixels to move the map in the x direction.
|y|`number`|Number of pixels to move the map in the y direction.

#### returns (void)
 undefined
### panTo (latLng: `union`) -> `void`
 Changes the center of the map to the given LatLng. If the change is less than both the width and height of the map, the transition will be smoothly animated.

::: tip Tags
**method**: panTo<br />**param**: The new center latitude/longitude of the map. (types `LatLng|LatLngLiteral`)<br />**returns**: undefined<br />**access**: public<br />
:::

#### Params
| name | type | description
|:-|:-|:-|
|latLng|`union`|The new center latitude/longitude of the map. (types `LatLng|LatLngLiteral`)

#### returns (void)
 undefined
### panToBounds (latLngBounds: `union`,undefined: `union`) -> `void`
 Pans the map by the minimum amount necessary to contain the given LatLngBounds. It makes no guarantee where on the map the bounds will be, except that the map will be panned to show as much of the bounds as possible inside {currentMapSizeInPx} - {padding}. For both raster and vector maps, the map's zoom, tilt, and heading will not be changed.

::: tip Tags
**method**: panToBounds<br />**param**: The bounds to pan the map to. (types: `LatLngBounds|LatLngBoundsLiteral`)<br />**param**: [padding] - optional Padding in pixels. A number value will yield the same padding on all 4 sides. The default value is 0. (types: `number|Padding`)<br />**returns**: undefined<br />**access**: public<br />
:::

#### Params
| name | type | description
|:-|:-|:-|
|latLngBounds|`union`|The bounds to pan the map to. (types: `LatLngBounds|LatLngBoundsLiteral`)
|undefined|`union`|[padding] - optional Padding in pixels. A number value will yield the same padding on all 4 sides. The default value is 0. (types: `number|Padding`)

#### returns (void)
 undefined
### fitBounds (bounds: `union`,undefined: `union`) -> `void`
 Sets the viewport to contain the given bounds.
Note: When the map is set to display: none, the fitBounds function reads the map's size as 0x0, and therefore does not do anything. To change the viewport while the map is hidden, set the map to visibility: hidden, thereby ensuring the map div has an actual size. For vector maps, this method sets the map's tilt and heading to their default zero values.

::: tip Tags
**method**: fitBounds<br />**param**: Bounds to show. (types: `LatLngBounds|LatLngBoundsLiteral`)<br />**param**: [padding] - optional Padding in pixels. The bounds will be fit in the part of the map that remains after padding is removed. A number value will yield the same padding on all 4 sides. Supply 0 here to make a fitBounds idempotent on the result of getBounds. (types: `number|Padding`)<br />**returns**: undefined<br />**access**: public<br />
:::

#### Params
| name | type | description
|:-|:-|:-|
|bounds|`union`|Bounds to show. (types: `LatLngBounds|LatLngBoundsLiteral`)
|undefined|`union`|[padding] - optional Padding in pixels. The bounds will be fit in the part of the map that remains after padding is removed. A number value will yield the same padding on all 4 sides. Supply 0 here to make a fitBounds idempotent on the result of getBounds. (types: `number|Padding`)

#### returns (void)
 undefined
### getRecycleKey (undefined: `undefined`) -> `void`
 Get the recycle key of the map

::: tip Tags
**method**: getRecycleKey<br />**param**: undefined<br />**returns**: undefined<br />**access**: public<br />
:::

#### Params
| name | type | description
|:-|:-|:-|
|undefined|`undefined`|undefined

#### returns (void)
 undefined
## Slots

### default
The default slot is wrapped in a class that sets display: none; so by default any component you add to your map will be invisible. This is ok for most of the supplied components that interact directly with the Google map object, but it's not good if you want to bring up things like toolboxes, etc.
### visible
This slot must be used if you want to display content within the responsive wrapper for the map.


## Events

### center_changed (union)

This event is fired when the map center property changes. It sends the position displayed at the center of the map. If the center or bounds have not been set then the result is undefined. (types: `LatLng|undefined`)
### zoom_changed (union)

This event is fired when the map zoom property changes. It sends the zoom of the map. If the zoom has not been set then the result is undefined. (types: `number|undefined`)
### bounds_changed (LatLngBounds)

This event is fired when the viewport bounds have changed. It sends The lat/lng bounds of the current viewport.


