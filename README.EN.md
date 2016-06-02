# Description

[LayersCollection](http://edward17.github.io/LayersCollection/) is a collection of raster layers based on [OpenStreetMap](https://www.openstreetmap.org/) data and layers that can be used for editing OSM. Among these are satellite imagery and GPS traces.

There are also relief layers and map of [Mapillary](http://www.mapillary.com/) panoramas coverage.

# Aim

This project is designed to:

* Show the people what OpenStreetMap is able to
* Make the life of OSM-contributor easier
* Lighten a finding and building in an OpenStreetMap-based layer

# Functions

## Layers

There are several types of layers:

* Baselayer - layer on background of the map; layer all other is laid over
* Overlay - layer with transparent background that can cover a baselayer. Showing of several overlays at the same time is supported. They are showed in order they were selected.

In addition, map background can be black ("Set black background" button) or gray ("Set gray background" button).

When many overlays are shown and you want to hide all of them, you can just press the "Remove all overlays" button.

### Previous baselayer showing

When you want to compare a place on the map in different layers (for example, OpenStreetMap and satellite imagery), you should do next steps:

1. Move and zoom a map to this place
2. Show one baselayer
3. Show second baselayer
4. Move mouse cursor on the "Show previous baselayer" button
5. Press this button every time you want to switch the layer

Note: history of all showed baselayers is **not** saved.

### Categories

Category is layers under header (to next header). All layers in one category appear to one theme. For example, layers in "General" category have not any bias (they show all the map features at once). In "Public Transport" category are layers that show public transport routes.

Category can be hidden in order to make layers list shorter and scrolling time - smaller. For that, you should switch a checkbox near this category.

## Link for coordinates and layers

You can create a link to a place on the map and selected layer (or layers when at least one overlay is shown). For that, you should click "Permalink" link in left upper corner and copy address from browser address. You can also just copy address of link. Coordinates and selected layers are updated automatically when they are changed.

Information about coordinates and layer (layers) is stored in hash. This is part of URL after `#` symbol.

Format of hash is as in [http://www.openstreetmap.org/](http://www.openstreetmap.org/) website: `#map={zoom}/{latitude}/{longitude}&layers={layers list in format "baselayer [,overlay 1] [,overlay 2]..."}`

This website supports several hash formats:

* Described above. It is used for example at http://www.openstreetmap.org/ and http://www.openstreetmap.ru/
* `#zoom={zoom}&lat={latitude}&lon={longitude}`.It is used for example at [http://pavlo-dudka.github.io/](http://pavlo-dudka.github.io/osm-pg-tests/test.html?map?dead.nodes#zoom=6&lat=49&lon=31)
* `#{zoom}/{latitude}/{longitude}`. It is used for example at [http://resultmaps.neis-one.org/osm-changesets](http://resultmaps.neis-one.org/osm-changesets?comment=mapping_party#18/44.51155/11.33740)

This ensured that you can simple switch from other website to this in order to see a place on the map in different layers. For example, you found an error in validator at [http://pavlo-dudka.github.io/](http://pavlo-dudka.github.io/), and want to see how this place looks in satellite imagery. For that, you should do next steps:

1. Copy link for this place at that website
2. Paste this link in browser address line
3. Keep only hash and delete all other
4. Copy this hash
5. Write in address line `http://edward17.github.io/LayersCollection/` and then paste this hash and press Enter
6. Map will be opened in this place. Now you can switch layer, for example to satellite imagery

In hash at http://www.openstreetmap.org/ website are stored not only coordinates but also selected layer. If you paste this hash then selected layer will be automatically showed.

You can also use this website for converting of coordinates hash from some formats into format of http://www.openstreetmap.org/ website.

## Filters

Now in this collection are aggregate many different layers. In order to lighten a searching of a layer with certain criteria filters can be used:

* Language (language code with green background) - language of labels on the map
* Show outdated layers (red "old") - show layers which weren't updated for a long time
* Show Ukraine-only layers (yellow "ua") - show layers which cover only Ukraine. It is of current importance for peoples from other countries because they cannot find there any interesting things
* Show only black/white layers (gray "b/w") - show **only** black-and-white layers. They can be used for example for printing
* Show only 3D-buildings layers (violet "3D") - show **only** layers, which have 3D buildings on higher zooms
* Show only Retina layers (orange "rtn") - show **only** layers for Retina displays
* Show only no-labels layers (blue "nl") - show **only** layers without labels. They can be used as background for map with custom labels

Enabling of multiple filers at the same time is supported.

Additionally each filters has certain "tag" (in list above they are described in brackets). If layer comes under influence of filter then tag of this filter is shown to the right of layer name.

## Custom layer

You can show your own custom tile or WMS layer. For that press the "Add custom layer" (or "Add custom WMS layer") button and fill fields in opened form. Required fields are with `*`. Whereupon press the "Show this layer" (or "Show this WMS layer") button.

Custom layer is added over selected baselayer. If your layer has transparent background but you want to see it without baselayer press the "Set gray background" button in layers list.

Showing of both custom tile and WMS layer at the same time is supported.

Note:

1. Custom layer data (tile address, copyrights, maximum zoom etc.) are not saved and will be lost by page refreshing
2. With this instrument you cannot ask an author (me) to add this layer in collection. For that, you should contact with me. Information about this is in [Contacts](https://github.com/Edward17/LayersCollection/blob/gh-pages/README.RU.md#Contacts) chapter

## Layer data export

You can export layers data (tile address, maximum zoom etc.) in order to use layer in following software:

* [Leaflet](http://leafletjs.com/) library - for it is returned complete JavaScript-code, you should only add this code in website code
* iD editor - for it is returned address which can be pasted by adding of custom layer
* JOSM editor - for it is returned address and maximum zoom (for TMS layer) or address, layers list and format (for WMS layer)
* SAS.Planet - for it is returned text of three files that must be created in separate folder in `SAS.Planet/Maps/.../` directory by analogy with other layers (only tile layers are supported)

In order to export layer data you should do next steps:

1. Enable "Show layer data by doubleclick on layer name" checkbox
2. Twice click of layer **name**
3. New tab is opened, there you can copy the result

## Building minimap into website

You can build into your own website minimap with selected layers (baselayer and unlimited count of overlays) and specified start position using `<iframe>`. For that:

1. Open necessary place on the map
2. Select layers in necessary order
3. Click the "Frame export" link
4. Copy the code and build into HTML code of your website

## Site state saving

Interface of this website can be modified. Some preferences are stored only in browser. Some preferences are stored in browser and link. However, all the preferences in link always have bigger priority than preferences stored in browser.

Next preferences are stored only in browser:

* Is left panel showed? (This is where filters, layers list and many others are placed)
* Are filters showed?
* Is each filter active?
* Is each category showed?

Next preferences are stored in browser and in link:

* Coordinates (latitude, longitude, zoom)
* Selected layers

# License

See [LICENSE.md](https://github.com/Edward17/LayersCollection/blob/gh-pages/LICENSE.md)

# Contacts

You have questions or suggestions? Write to me in [private message on OSM](https://www.openstreetmap.org/message/new/edward17) or on e-mail: edward17 [at] mail [dot] ua.

P. S. English is not my native language, so if you found a grammatical mistake do not hesitate to contact me!