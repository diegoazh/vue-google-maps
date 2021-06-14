---
title: marker
---
# Marker
Marker component

::: tip Tags
**see**: [source code](/guide/marker.html#source-code)<br />**see**: [Official documentation](https://developers.google.com/maps/documentation/javascript/markers)<br />**see**: [Official reference](https://developers.google.com/maps/documentation/javascript/reference/marker)<br />
:::

## Table of contents
[[toc]]

## Props

### animation (`number`)
::: tip Tags
**see**: https://developers.google.com/maps/documentation/javascript/reference/marker<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`number`|-|Which animation to play when marker is added to a map.|
### attribution (`object`)


|type|default|description|
|:-|:-|:-|:-|
|`object`|-|This property was not found on the Googole Maps documentation, but it was defined in the previous version of this component.
Any suggestion is welcome here.|
### clickable (`boolean`)
::: tip Tags
**see**: https://developers.google.com/maps/documentation/javascript/reference/marker<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`boolean`|true|If true, the marker receives mouse and touch events. Default value is true.|
### cursor (`string`)
::: tip Tags
**see**: https://developers.google.com/maps/documentation/javascript/reference/marker<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`string`|-|Mouse cursor type to show on hover.|
### draggable (`boolean`)
::: tip Tags
**see**: https://developers.google.com/maps/documentation/javascript/reference/marker<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`boolean`|false|If true, the marker can be dragged. Default value is false.|
### icon (`string|object`)
::: tip Tags
**see**: [Icon type](https://developers.google.com/maps/documentation/javascript/reference/marker#Icon)<br />**see**: [Symbol type](https://developers.google.com/maps/documentation/javascript/reference/marker#Symbol)<br />**see**: https://developers.google.com/maps/documentation/javascript/reference/marker<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`string|object`|-|Icon for the foreground. If a string is provided, it is treated as though it were an Icon with the string as url.
Its type can be string|Icon|Symbol optional|
### label (`string|object`)
::: tip Tags
**see**: https://developers.google.com/maps/documentation/javascript/reference/marker<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`string|object`|-|Adds a label to the marker. A marker label is a letter or number that appears inside a marker. The label can either be a string, or a MarkerLabel object. If provided and MarkerOptions.title is not provided, an accessibility text (e.g. for use with screen readers) will be added to the marker with the provided label's text. Please note that the label is currently only used for accessibility text for non-optimized markers.|
### opacity (`number`)
::: tip Tags
**see**: https://developers.google.com/maps/documentation/javascript/reference/marker<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`number`|1|A number between 0.0, transparent, and 1.0, opaque.|
### options (`object`)


|type|default|description|
|:-|:-|:-|:-|
|`object`|-|Extra options passed to this component.|
### place (`object`)


|type|default|description|
|:-|:-|:-|:-|
|`object`|-|This property was not found on the Googole Maps documentation, but it was defined in the previous version of this component.
Any suggestion is welcome here.|
### position (`object`)
::: tip Tags
**see**: https://developers.google.com/maps/documentation/javascript/reference/marker<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`object`|-|Marker position. The position is required to display the marker and can be provided with Marker.setPosition if not provided at marker construction.|
### shape (`object`)
::: tip Tags
**see**: [MarkerShape type](https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerShape)<br />**see**: https://developers.google.com/maps/documentation/javascript/reference/marker<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`object`|-|Image map region definition used for drag/click.|
### title (`string`)
::: tip Tags
**see**: https://developers.google.com/maps/documentation/javascript/reference/marker<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`string`|-|Rollover text. If provided, an accessibility text (e.g. for use with screen readers) will be added to the marker with the provided value. Please note that the title is currently only used for accessibility text for non-optimized markers.|
### visible (`boolean`)
::: tip Tags
**see**: https://developers.google.com/maps/documentation/javascript/reference/marker<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`boolean`|true|If true, the marker is visible.|
### zIndex (`number`)
::: tip Tags
**see**: https://developers.google.com/maps/documentation/javascript/reference/marker<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`number`|-|All markers are displayed on the map in order of their zIndex, with higher values displaying in front of markers with lower values. By default, markers are displayed according to their vertical position on screen, with lower markers appearing in front of markers further up the screen.|


## Slots

### default
Default slot of the component.

