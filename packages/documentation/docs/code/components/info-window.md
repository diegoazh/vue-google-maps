---
title: info-window
---
# Info-Window
InfoWindow component

::: tip Tags
**see**: [source code](/guide/info-window.html#source-code)<br />**see**: [Official documentation](https://developers.google.com/maps/documentation/javascript/infowindows)<br />
:::

## Table of contents
[[toc]]

## Props

### opened (`boolean`)


|type|default|description|
|:-|:-|:-|:-|
|`boolean`|true|Determines if the info-window is open or not|
### options (`object`)


|type|default|description|
|:-|:-|:-|:-|
|`object`|{}|Extra options that you want to pass to the component|
### position (`object`)


|type|default|description|
|:-|:-|:-|:-|
|`object`|-|Contains the LatLng at which this info window is anchored.
Note: An InfoWindow may be attached either to a Marker object
(in which case its position is based on the marker's location)
or on the map itself at a specified LatLng.|
### zIndex (`number`)


|type|default|description|
|:-|:-|:-|:-|
|`number`|-|The z-index property of the window|


## Slots

### default
Used to set your info window.

