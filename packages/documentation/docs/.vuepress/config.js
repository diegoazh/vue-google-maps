const { sidebarTree } = require('../code/config');
const apiDocs = sidebarTree('API docs');

module.exports = {
  base: '/gmap-vue/',
  title: 'Gmap-vue plugin',
  description: 'Documentation for gmap-vue plugin',
  themeConfig: {
    sidebarDepth: 4,
    nav: [
      { text: 'Plugin', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/code/' }
    ],
    sidebar: {
      '/code/': apiDocs['/code/'],
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            {
              title: 'Concepts',
              collapsable: false,
              path: '/guide/'
            },
            {
              title: 'Components',
              collapsable: false,
              path: '/guide/autocomplete',
              children: [
                ['autocomplete', 'GmapAutocomplete'],
                ['circle', 'GmapCircle'],
                ['cluster', 'GmapCluster'],
                ['drawing-manager', 'GmapDrawingManager'],
                ['heatmap-layer', 'Heat Map Layer'],
                ['info-window', 'Info Window'],
                ['kml-layer', 'Kml layer'],
                ['map', 'Map component'],
                ['cdn', 'Using a CDN'],
                ['marker', 'Marker'],
                ['basic-marker-cluster', 'Marker cluster'],
                ['basic-marker-shape', 'Marker shape'],
                ['place-input', 'Place input'],
                ['place-default', 'Place default'],
                ['status-bar-information', 'Status bar information'],
                ['overlay', 'Overlay'],
                ['polyline', 'Polyline'],
                ['polygon-simple', 'Poligon simple'],
                ['polygon-advanced', 'Poligon advanced'],
                ['resize-bus', 'Resize bus'],
                ['street-view-panorama', 'Street view panorama'],
              ]
            },
          ],
        }
      ],
      '/': [['', 'Getting started']]
    }
  }
};
