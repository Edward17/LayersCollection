# Description

[LayersCollection](http://edward17.github.io/LayersCollection/) is a collection of raster layers based on OpenStreetMap data and layers which can be used for editing OSM. Among these are:

* Satellite imagery
* GPS traces

There are also relief layers and map of [Mapillary](http://www.mapillary.com/) panorams coverage.

# Aim

This project is designed to:

* Show the people what OpenStreetMap is able to
* Make the life of OSM-contributor easier
* Lighten a finding and building in an OpenStreetMap-based layer

# Functions

## Layers

There are several types of layers:

* Baselayer - layer on background of the map; layer all other is laied over
* Overlay - layer with transparent background which can laied over a baselayer. Showing of several overlays at the same time is supported. They are showed in order they were selected.

Also map background can be black ("Set black background" button) or gray ("Set gray background" button).

When many overlays are shown and you want to hide all of them, you can just press the "Remove all overlays" button.

### Previous baselayer showing

When you want to compare a place on the map in different layers (for example, OpenStreetMap and satellite imagery), you should do next steps:

1. Move and zoom a map to this place
2. Show one baselayer
3. Show second baselayer
4. Move mouse cursor on the "Show previous baselayer" button
5. Press this button every time you want to switch the layer

Note: history ao all showed baselayers **isn't** saved.

### Categories

Category is layers under header (to next header). All layers in one category appear to one theme. For example, layers in "General" category haven't any bias (they show all the map features at once). In "Public Transport" category are layers that show public transport routes.

Category can be hidden in order to make layers list shorter and scrolling time - smaller. For that you should shwitch a checkbox near this category.

## Link for coordinates and layers

You can create a link to a place on the map and selected layer (or layers when morу then one overlays are shown). For that you should click "Permalink" link in left upper corner an copy address from browser address. You can also just copy address of link. Coordinates and selected layers are updated automatically when they are changed.

Information about coordinates and layer (layers) is stored in hash. This is part of URL after `#` symbol.

Format of hash is as in [http://www.openstreetmap.org/](http://www.openstreetmap.org/) website: `#map={zoom}/{latitude}/{longitude}&layers={layers list in format "baselayer [,overlay 1] [,overlay 2]..."}`

This website supports several hash formats:

* Described above. It is used for example at http://www.openstreetmap.org/ and http://www.openstreetmap.ru/
* `#zoom={zoom}&lat={latitude}&lon={longitude}`.It is used for example at [http://pavlo-dudka.github.io/](http://pavlo-dudka.github.io/osm-pg-tests/test.html?map?dead.nodes#zoom=6&lat=49&lon=31)
* `#{zoom}/{latitude}/{longitude}`. It is used for example at [http://resultmaps.neis-one.org/osm-changesets](http://resultmaps.neis-one.org/osm-changesets?comment=mapping_party#18/44.51155/11.33740)

This ensured that you can simple switch from other website to this in order to see a place on the map in different layers. For example, you found an error in validator at  http://pavlo-dudka.github.io/ , and want to see how this place looks in satellite imagery. For that you should do next steps:

1. Copy link for this place at that website
2. Paste this link in browser address line
3. Keep only hash and delete all other
4. Copy this hash
5. Write in address line `http://edward17.github.io/LayersCollection/` and than paste this hash and press Enter
6. Map will be opened in this place. Now you can switch layer, for example to satellite imagery

In hash at http://www.openstreetmap.org/ website are storeв not only coordinates but also selected layer. If you paste this hash then selected layer will be automatically showed.

You can also use this website for converting of coordinates hash from some formats into format of http://www.openstreetmap.org/ website.

## Filters

At the moment in this collection are aggregate many different layers. In order to lighten a searching of a layer with certain criteria filters can be used:

* Language (language code with green background) - language of labels on the map
* Show outdated layers (red "old") - show layers which weren' t updated for a long time
* Show Ukraine-only layers (yellow "ua") - show layers which cover only Ukraine. It is of current importance for peoples from other countries because they cannot find there any intresting things
* Show only black/white layers (gray "b/w") - show **only** blackwhite layers. They can be used for example for printing
* Show only 3D-buildings layers (violet "3D") - show **only** layers, which have 3D buildings on higher zooms
* Show only Retina layers (orange "rtn")  - show **only** layers for Retina displays
* Show only no-labels layers (blue "nl") - show **only** layers without labels. They can be used as background for map with custom labels

Enabling of multiple filers at the same time is supported.

Additionally each filtes has certain "tag" (in list above they are described in brackets). If layer comes under influence of filter then tag of this filter is shown to the right of layer name.

## Custom layer

You can show your own custom tile layer. For that press the "Add custom layer" button and fill fields in opened form. Required fields are with `*`. Whereupon press the "Show this layer" button.

Custom layer is added over selected baselayer. If your layer has transparent background but you want to see it without baselayer press the "Set gray background" bullon in layers list.

Note:

1. Custom layer data (tile address, copyrights, maximum soom etc.) aren't saved and will be lost even by page refreshing
2. With this instrument you **can not** ask an author (me) to add this layer in collection. For that you should contact with me. Information about this is in "Contacts" chapter

## Layer data export

You can export layers data (tile address, maximum zoom etc.) in order to use layer in folloving software:

* [Leaflet](http://leafletjs.com/) library - for it is returned complete JavaScript-code, you should only add this code in website code
* iD editor - for it is returned address which can be pasted by adding of custom layer
* JOSM editor - for it is returned address and maximum zoom (for TMS layer) or address, layers list and format (for WMS layer)

In order to export layer data you should do next steps:

1. Enable "Show layer data by doubleclick on layer name" checkbox
2. Twice click of layer **name**
3. Now you can copy the result

## Site state saving

Interface of this website can be modified. Some preferences are stored only in browser. Some preferences are stored in browser and link. But for all that preferences in link have always bigger priority than preferences stored in browser.

Next preferences are stored only in browser:

* Is left panel showed? (This is where filters, layers list and many others are placed)
* Are filters showed?
* Each filter
* Showing of each category

Next preferences are stored in browser and in link:

* Coordinates (latitude, longitude, zoom)
* Selected layers

# License

See [LICENSE.md](https://github.com/Edward17/LayersCollection/blob/gh-pages/LICENSE.md)

# Contacts

You have questions or suggestions? Write to me in [private message on OSM](https://www.openstreetmap.org/message/new/edward17) or on e-mail: edward17 [at] mail [dot] ua.

P. S. English isn't my native language, so if you found a grammatical mistake don't hesitate to contact me!
