module.exports = {
  base: '/gmap-vue/',
  title: 'Gmap-vue plugin',
  description: 'Documentation for gmap-vue plugin',
  themeConfig: {
    sidebarDepth: 2,
    nav: [
      {text: 'gmap-vue', link: '/'},
      {text: 'code examples', link: '/examples/'},
    ],
    sidebar: {
      '/examples/': [
        ['', 'Using a CDN'],
        ['map-center', 'Map center'],
        ['map-center-twoway', 'Map center two way binding'],
        ['basic-autocomplete', 'Autocomplete basic'],
        ['autocomplete', 'Autocomplete'],
        ['kml-layer', 'Kml layer'],
        ['map-functions', 'Map functions'],
        ['marker', 'Marker'],
        ['basic-marker-cluster', 'Marker cluster'],
        ['basic-marker-shape', 'Marker shape'],
        ['place-input', 'Place input'],
        ['place-default', 'Place default'],
        ['status-bar-information', 'Status bar information'],
        ['window-information', 'Window information'],
        ['map-type-id', 'Map type id'],
        ['overlay', 'Overlay'],
        ['polyline', 'Polyline'],
        ['polygon-simple', 'Poligon simple'],
        ['polygon-advanced', 'Poligon advanced'],
        ['resize-bus', 'Resize bus'],
        ['map-destroy', 'Map destroy'],
        ['street-view-panorama', 'Street view panorama'],
        ['heat-map-layer', 'Heat Map Layer'],
        ['drawing-manager', 'Drawing manager'],
        ['drawing-manager-with-slot', 'Drawing manager with slot'],
      ],
      '/': [
        ['', 'Getting started']
      ],
    }
  },
}
