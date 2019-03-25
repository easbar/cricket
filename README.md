# Cricket

A visualization and debugging tool for [graphhopper](http://www.graphhopper.com) forked from [maputnik](https://maputnik.gihtub.io/editor).

## Features

 - render [mvt tiles]() served by the graphhopper to show the graphhopper routing graph in your browser
 - adjust the [mvt style]() dynamically which allows you to highlight/filter roads by different properties, show them on the map etc. (this works
   thanks to maputnik)
 - hover graph to show popup with node/edge properties  
 - jump to coordinate/edge-id/node-id (work in progress)
 - show graphhopper routes on top of the graphhopper graph (work in progress)
 - show results of coordinate snapping (query graph/location index) (work in progress)   
 - copy coordinate to clipboard

## Documentation

Cricket keeps basically all functionality of maputnik the same, so it is best to start with the documentation of 
maputnik to understand what it does: [maputnik wiki](https://github.com/maputnik/editor/wiki).

Currently you need to start the graphhopper server with this [branch](https://github.com/easbar/graphhopper/tree/graphtool_mvt) 
and it needs to be running on localhost:8989. Strictly speaking you do not need the graphhopper server running, but
in this case there will not be much you can debug :) You also need to set `web.mvt.enabled: true` in your graphhopper
configuration.

To start Cricket checkout this repository and switch to the `cricket` branch, then run `npm install` followed by 
`npm run start`. You should see Cricket in your browser at `http://localhost:8888/`. For more details see the 
maputnik documentation.

Use standard maputnik features to adjust the graph visualization. By default the mapbox style is already setup to show
the graphhopper graph, you can also choose the default via the 'Open' button after changing it, export your favorite
style etc.

Hover the graph to show a popup containing edge/node metadata.

Right click the graph to open a context menu with different actions.

Right click-drag allows rotating/pitching the map (somewhat 'hidden' maputnik feature). 
   
## Contributing

Contributions are very welcome, but core maputnik changes should go directly to upstream.

## License (taken from maputnik)

Maputnik is [licensed under MIT](LICENSE) and is Copyright (c) Lukas Martinelli and contributors.

**Disclaimer** This project is not affiliated with Mapbox or Mapbox Studio. It is an independent style editor for the
open source technology in the Mapbox GL ecosystem.
As contributor please take extra care of not violating any Mapbox trademarks. Do not get inspired by Mapbox Studio and make your own decisions for a good style editor.
