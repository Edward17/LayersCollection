var openstreetmap_attribution = 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors, under ODbL';
var tiles_attribution = 'Tiles: &copy; ';
var attribution = openstreetmap_attribution + ' | ' + tiles_attribution;
var osm_attribution = attribution; // must be deleted

var mapbox_token = 'pk.eyJ1IjoiZWR3YXJkMTciLCJhIjoiY2llaWR4endiMDAycXRibThvZ3dlczI3diJ9.eghwjbaS0bJ80bj2Vzd6Ew'; // This is my personal access token. Please don't use it, just register on MapBox for free: https://www.mapbox.com/signup/?plan=starter
//var lyrk_token = '';

var layers_data = [
    {
        'header': 'true',
        'name': 'General'
    },
    {
        'name': 'OpenStreetMap',
        'address': 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': openstreetmap_attribution,
        'id': '1000'
    },
    {
        'name': 'Humanitarian',
        'address': 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
        'id': '1001'
    },
    {
        'name': 'MapQuest Open',
        'address': 'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': attribution + '<a href="http://www.mapquest.com/" target="_blank">MapQuest</a>',
        'subdomains': ['1', '2', '3', '4'],
        'id': '1002'
    },
    {
        'name': 'MapSurfer.NET',
        'address': 'http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}',
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://giscience.uni-hd.de/" target="_blank">GIScience Research Group @ Heidelberg University</a>',
        'id': '1003'
    },
    {
        'name': 'MapSurfer.NET gray',
        'address': 'http://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}',
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://giscience.uni-hd.de/" target="_blank">GIScience Research Group @ Heidelberg University</a>',
        'blackwhite': 'true',
        'id': '1004'
    },

/*
// I don't know how to register on Lyrk and bekome access token. If you know please contact me
    {
        'name': 'Lyrk',
        'address': 'https://tiles.lyrk.org/ls/{z}/{x}/{y}?apikey=' + lyrk_token,
        'maxZoom': 18,
        'attribution': attribution + '<a href="http://lyrk.de/" target="_blank">Lyrk</a>',
        'id': '1005'
    },
    {
        'name': 'Lyrk Retina',
        'address': 'https://tiles.lyrk.org/lr/{z}/{x}/{y}?apikey=' + lyrk_token,
        'maxZoom': 18,
        'attribution': attribution + '<a href="http://lyrk.de/" target="_blank">Lyrk</a>',
        'id': '1006'
    },

// don't works
    {
        'wms': 'true',
        'name': 'Omniscale',
        'address': 'https://maps.omniscale.net/v1/.../tile', // key must be added
        'layers': 'osm',
        'attribution': attribution + '<a href="http://maps.omniscale.com/" target="_blank">Omniscale</a>',
        'id': '1007'
    },
*/

    {
        'name': 'OpenStreetMap.de',
        'address': 'http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://openstreetmap.de/germanstyle.html" target="_blank">OpenStreetMap - Deutschland</a>',
        'id': '1008',
        'language': 'de'
    },
    {
        'name': 'OpenStreetMap.fr',
        'address': 'http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
        'maxZoom': 20,
        'attribution': attribution + '<a href="http://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
        'id': '1009',
        'language': 'fr'
    },
    {
        'name': 'OpenStreetMap.se',
        'address': 'http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': attribution + '<a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a>',
        'id': '1010'
    },
    {
        'name': 'wmflabs OSM standart',
        'address': 'http://{s}.tiles.wmflabs.org/osm/{z}/{x}/{y}.png',
        'maxZoom': 21,
        'attribution': openstreetmap_attribution,
        'id': '1011'
    },
    {
        'name': 'wmflabs OSM no-labels',
        'address': 'http://{s}.tiles.wmflabs.org/osm-no-labels/{z}/{x}/{y}.png',
        'maxZoom': 21,
        'attribution': openstreetmap_attribution,
        'id': '1012',
        'nolabels': 'true'
    },
    {
        'name': 'wmflabs OSM B/W',
        'address': 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
        'maxZoom': 21,
        'attribution': openstreetmap_attribution,
        'id': '1013',
        'blackwhite': 'true'
    },
    {
        'name': 'Alberding',
        'address': 'http://map.dgpsonline.eu/default/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.alberding.eu/" target="_blank">Alberding GmbH</a>, CC-BY-SA',
        'id': '1014'
    },
    {
        'name': 'Alberding (sorbian)',
        'address': 'http://map.dgpsonline.eu/osmsb/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.alberding.eu/" target="_blank">Alberding GmbH</a>, CC-BY-SA',
        'id': '1015',
        'language': 'wen'
    },
    {
        'name': '4UMaps',
        'address': 'http://4umaps.eu/{z}/{x}/{y}.png',
        'maxZoom': 15,
        'attribution': attribution + '<a href="http://www.4umaps.eu/">4UMaps</a>',
        'id': '1016'
    },
    {
        'name': 'Osmapa.pl',
        'address': 'http://{s}.tile.openstreetmap.pl/osmapa.pl/{z}/{x}/{y}.png',
        'maxZoom': 20,
        'attribution': attribution + '<a href="http://osmapa.pl/" target="_blank">Osmapa.pl</a>',
        'id': '1017',
        'language': 'pl'
    },
    {
        'name': 'OpenStreetBrowser',
        'address': 'http://tiles-base.openstreetbrowser.org/tiles/basemap_base/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.openstreetbrowser.org/" target="_blank">OpenStreetBrowser</a>',
        'id': '1018'
    },

/*
// don't works with websites (GitHub Pages also), only with localhost: http://www.gossamer-threads.com/lists/wiki/mediawiki-cvs/625066
    {
        'name': 'Wikimedia maps',
        'address': 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': attribution + '<a href="https://maps.wikimedia.org" target="_blank">Wikimedia maps</a>',
        'id': '1019'
    },
*/

    {
        'name': 'OsmAnd Online',
        'address': 'http://tile.osmand.net/hd/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': attribution + '<a href="<a href="http://osmand.net/" target="_blank">OsmAnd</a>',
        'id': '1020'
    },
    {
        'name': 'Спутник',
        'address': 'http://{s}.tiles.maps.sputnik.ru/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://maps.sputnik.ru/" target="_blank">Спутник</a>',
        'id': '1021',
        'language': 'ru'
    },
    {
        'name': 'Спутник Retina',
        'address': 'http://tiles.maps.sputnik.ru/tiles/kmt2/{z}/{x}/{y}.png?tag=retina',
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://maps.sputnik.ru/" target="_blank">Спутник</a>',
        'id': '1022',
        'language': 'ru'
    },
    {
        'name': 'Космоснимки',
        'address': 'http://{s}.tile.osm.kosmosnimki.ru/kosmo/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': attribution + '<a href="http://osm.kosmosnimki.ru/" target="_blank">ScanEx</a>',
        'id': '1023',
        'subdomains': ['a', 'b', 'c', 'd'],
        'old': 'true',
        'language': 'ru'
    },
    {
        'name': 'Космоснимки Night',
        'address': 'http://{s}.tile.osm.kosmosnimki.ru/night/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': attribution + '<a href="http://osm.kosmosnimki.ru/" target="_blank">ScanEx</a>',
        'id': '1024',
        'subdomains': ['a', 'b', 'c', 'd'],
        'old': 'true',
        'language': 'ru'
    },
    {
        'name': 'Космоснимки Spring',
        'address': 'http://{s}.tile.osm.kosmosnimki.ru/spring/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': attribution + '<a href="http://osm.kosmosnimki.ru/" target="_blank">ScanEx</a>',
        'id': '1025',
        'subdomains': ['a', 'b', 'c', 'd'],
        'old': 'true',
        'language': 'ru'
    },
    {
        'name': 'Космоснимки Summer',
        'address': 'http://{s}.tile.osm.kosmosnimki.ru/summer/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': attribution + '<a href="http://osm.kosmosnimki.ru/" target="_blank">ScanEx</a>',
        'id': '1026',
        'subdomains': ['a', 'b', 'c', 'd'],
        'old': 'true',
        'language': 'ru'
    },
    {
        'name': 'Космоснимки Autumn',
        'address': 'http://{s}.tile.osm.kosmosnimki.ru/autumn/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': attribution + '<a href="http://osm.kosmosnimki.ru/" target="_blank">ScanEx</a>',
        'id': '1027',
        'subdomains': ['a', 'b', 'c', 'd'],
        'old': 'true',
        'language': 'ru'
    },
    {
        'name': 'Космоснимки Winter',
        'address': 'http://{s}.tile.osm.kosmosnimki.ru/winter/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': attribution + '<a href="http://osm.kosmosnimki.ru/" target="_blank">ScanEx</a>',
        'id': '1028',
        'subdomains': ['a', 'b', 'c', 'd'],
        'old': 'true',
        'language': 'ru'
    },
    {
        'name': 'Чепецк.NET',
        'address': 'http://ingreelab.net/C04AF0B62BEC112E8D7242FB848631D12D252728/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://чепецк.net/" target="_blank">ST-GIS</a>, <a href="http://www.openstreetmap.org/user/Max%20Vasilev" target="_blank">Max Vasilev</a>',
        'id': '1029',
        'language': 'ru'
    },
    {
        'name': 'stranger',
        'address': 'http://ingreelab.net/stranger/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://чепецк.net/" target="_blank">ST-GIS</a>, <a href="http://www.openstreetmap.org/user/Max%20Vasilev" target="_blank">Max Vasilev</a>',
        'id': '1030',
        'nolabels': 'true'
    },
    {
        'name': 'MapBox.streets',
        'address': 'https://{s}.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' + mapbox_token,
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
        'id': '1031'
    },
    {
        'name': 'MapBox.streets-basic',
        'address': 'https://{s}.tiles.mapbox.com/v4/mapbox.streets-basic/{z}/{x}/{y}.png?access_token=' + mapbox_token,
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
        'id': '1032'
    },
    {
        'name': 'MapBox.light',
        'address': 'https://{s}.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=' + mapbox_token,
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
        'id': '1033',
        'blackwhite': 'true',
        'language': 'en'
    },
    {
        'name': 'MapBox.dark',
        'address': 'https://{s}.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=' + mapbox_token,
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
        'id': '1034',
        'language': 'en'
    },
    {
        'name': 'MapBox.emerald',
        'address': 'https://{s}.tiles.mapbox.com/v4/mapbox.emerald/{z}/{x}/{y}.png?access_token=' + mapbox_token,
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
        'id': '1035'
    },
    {
        'name': 'MapBox.high-contrast',
        'address': 'https://{s}.tiles.mapbox.com/v4/mapbox.high-contrast/{z}/{x}/{y}.png?access_token=' + mapbox_token,
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
        'id': '1036',
        'language': 'en'
    },
    {
        'name': 'CartoDB Positron',
        'address': 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        'maxZoom': 22, // can be more
        'attribution': openstreetmap_attribution + ' | ' + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>',
        'id': '1037',
        'old': 'true',
        'language': 'en'
    },
    {
        'name': 'CartoDB Dark Matter',
        'address': 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
        'maxZoom': 22, // can be more
        'attribution': openstreetmap_attribution + ' | ' + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>',
        'id': '1038',
        'old': 'true',
        'language': 'en'
    },
    {
        'name': 'CartoDB Positron (no labels)',
        'address': 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
        'maxZoom': 22, // can be more
        'attribution': openstreetmap_attribution + ' | ' + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>',
        'id': '1039',
        'old': 'true',
        'nolabels': 'true'
    },
    {
        'name': 'CartoDB Dark Matter (no labels)',
        'address': 'http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',
        'maxZoom': 22, // can be more
        'attribution': openstreetmap_attribution + ' | ' + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>',
        'id': '1040',
        'old': 'true',
        'nolabels': 'true'
    },
    {
        'name': 'CartoDB Positron Retina',
        'address': 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
        'maxZoom': 22, // can be more
        'attribution': openstreetmap_attribution + ' | ' + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>',
        'id': '1041',
        'old': 'true',
        'language': 'en'
    },
    {
        'name': 'CartoDB Dark Matter Retina',
        'address': 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
        'maxZoom': 22, // can be more
        'attribution': openstreetmap_attribution + ' | ' + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>',
        'id': '1042',
        'old': 'true',
        'language': 'en'
    },
    {
        'name': 'CartoDB Positron (no labels) Retina',
        'address': 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png',
        'maxZoom': 22, // can be more
        'attribution': openstreetmap_attribution + ' | ' + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>',
        'id': '1043',
        'old': 'true',
        'nolabels': 'true'
    },
    {
        'name': 'CartoDB Dark Matter (no labels) Retina',
        'address': 'http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}@2x.png',
        'maxZoom': 22, // can be more
        'attribution': openstreetmap_attribution + ' | ' + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>',
        'id': '1044',
        'old': 'true',
        'nolabels': 'true'
    },
    {
        'name': 'CartoDB World Antique',
        'address': 'https://cartocdn_{s}.global.ssl.fastly.net/base-antique/{z}/{x}/{y}.png',
        'maxZoom': 22, // can be more
        'attribution': openstreetmap_attribution + ' | ' + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>',
        'id': '1045',
        'old': 'true',
        'language': 'en'
    },
    {
        'name': 'CartoDB World Eco',
        'address': 'https://cartocdn_{s}.global.ssl.fastly.net/base-eco/{z}/{x}/{y}.png',
        'maxZoom': 22, // can be more
        'attribution': openstreetmap_attribution + ' | ' + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>',
        'id': '1046',
        'old': 'true',
        'language': 'en'
    },
    {
        'name': 'CartoDB World Flat Blue',
        'address': 'https://cartocdn_{s}.global.ssl.fastly.net/base-flatblue/{z}/{x}/{y}.png',
        'maxZoom': 22, // can be more
        'attribution': openstreetmap_attribution + ' | ' + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>',
        'id': '1047',
        'old': 'true',
        'nolabels': 'true'
    },
    {
        'name': 'CartoDB World Midnight Commander',
        'address': 'https://cartocdn_{s}.global.ssl.fastly.net/base-midnight/{z}/{x}/{y}.png',
        'maxZoom': 22, // can be more
        'attribution': openstreetmap_attribution + ' | ' + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>',
        'id': '1048',
        'old': 'true',
        'nolabels': 'true'
    },
    {
        'name': 'Stamen Toner',
        'address': 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png',
        'maxZoom': 20,
        'attribution': attribution + '<a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>',
        'id': '1049',
        'old': 'true',
        'blackwhite': 'true',
        'language': 'en'
    },
    {
        'name': 'Stamen Toner-background',
        'address': 'http://{s}.tile.stamen.com/toner-background/{z}/{x}/{y}.png',
        'maxZoom': 20,
        'attribution': attribution + '<a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>',
        'id': '1050',
        'old': 'true',
        'blackwhite': 'true',
        'nolabels': 'true'
    },
    {
        'name': 'Stamen Toner-lite',
        'address': 'http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png',
        'maxZoom': 20,
        'attribution': attribution + '<a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>',
        'id': '1051',
        'old': 'true',
        'blackwhite': 'true',
        'language': 'en'
    },
    {
        'name': 'Skobbler',
        'address': 'http://tiles{s}-bc7b4da77e971c12cb0e069bffcf2771.skobblermaps.com/TileService/tiles/2.0/01021113210/7/{z}/{x}/{y}.png?traffic=false',
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.skobbler.com/">Skobbler</a>',
        'subdomains': ['1', '2', '3'],
        'id': '1052'
    },
    {
        'name': 'Skobbler (with traffic)',
        'address': 'http://tiles{s}-bc7b4da77e971c12cb0e069bffcf2771.skobblermaps.com/TileService/tiles/2.0/01021113210/7/{z}/{x}/{y}.png?traffic=true',
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.skobbler.com/">Skobbler</a>',
        'subdomains': ['1', '2', '3'],
        'id': '1053'
    },
    {
        'name': 'Falk',
        'address': 'http://ec2.cdn.ecmaps.de/WmsGateway.ashx.jpg?TileX={x}&TileY={y}&ZoomLevel={z}&Experience=falk&MapStyle=Falk%20OSM',
        'maxZoom': 16,
        'attribution': attribution + '2013 <a href="http://www.falk.de/">Falk Verlag</a>',
        'id': '1054',
        'old': 'true'
    },
    {
        'name': 'Maptoolkit',
        'address': 'http://tile0{s}.maptoolkit.net/terrain/{z}/{x}/{y}.png',
        'maxZoom': 17,
        'attribution': attribution + '<a href="http://www.toursprung.com/">Toursprung GmbH</a>',
        'subdomains': ['1', '2', '3'],
        'id': '1055'
    },
    {
        'name': 'OpenHistoricalMap',
        'address': 'http://www.openhistoricalmap.org/ohm_tiles/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': attribution + '<a href="http://www.openhistoricalmap.org/" target="_blank">OpenHistoricalMap</a>',
        'id': '1056'
    },
    {
        'header': 'true',
        'name': 'Public Transport'
    },
    {
        'name': 'Thunderforest Transport',
        'address': 'http://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.thunderforest.com/" target="_blank">Andy Allan</a>',
        'id': '1057'
    },
    {
        'name': 'Thunderforest Transport Dark',
        'address': 'http://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.thunderforest.com/" target="_blank">Andy Allan</a>',
        'id': '1058'
    },
    {
        'name': 'ÖPNV Karte',
        'address': 'http://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': attribution + '<a href="http://öpnvkarte.de/" target="_blank">ÖPNV Karte</a>',
        'id': '1059'
    },
    {
        'header': 'true',
        'name': 'Hiking, Cycling, etc.'
    },
    {
        'name': 'Thunderforest Landskape',
        'address': 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': attribution + '<a href="http://www.thunderforest.com/" target="_blank">Andy Allan</a>',
        'id': '1060'
    },
    {
        'name': 'Thunderforest Outdoors',
        'address': 'http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': attribution + '<a href="http://www.thunderforest.com/" target="_blank">Andy Allan</a>',
        'id': '1061'
    },
    {
        'name': 'Thunderforest OpenCycleMap',
        'address': 'http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': attribution + '<a href="http://www.thunderforest.com/" target="_blank">Andy Allan</a>',
        'id': '1062'
    },
    {
        'name': 'MapBox.outdoors',
        'address': 'https://{s}.tiles.mapbox.com/v4/mapbox.outdoors/{z}/{x}/{y}.png?access_token=' + mapbox_token,
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
        'id': '1063'
    },
    {
        'name': 'MapBox.run-bike-hike',
        'address': 'https://{s}.tiles.mapbox.com/v4/mapbox.run-bike-hike/{z}/{x}/{y}.png?access_token=' + mapbox_token,
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
        'id': '1064',
        'language': 'en'
    },
    {
        'name': 'Hike & Bike',
        'address': 'http://toolserver.org/tiles/hikebike/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://hikebikemap.de/" target="_blank">Colin Marquardt</a>',
        'id': '1065'
    },
    {
        'name': 'Veloroad 2',
        'address': 'http://78.47.183.107/veloroad/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://osmz.ru/veloroad2.html" target="_blank">Ilya Zverev</a>',
        'id': '1066',
        'language': 'ru'
    },
    {
        'name': 'OpenTopoMap',
        'address': 'http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        'maxZoom': 15,
        'attribution': attribution + '<a href="http://opentopomap.org/" target="_blank">OpenTopoMap</a>',
        'id': '1067'
    },
    {
        'name': 'Komoot',
        'address': 'https://www.komoot.de/tiles/{s}/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': attribution + '<a href="https://www.komoot.de/" target="_blank">Komoot</a>',
        'id': '1068'
    },
    {
        'name': 'Refuges.info',
        'address': 'http://maps.refuges.info/hiking/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': attribution + '<a href="http://maps.refuges.info/" target="_blank">sly</a>',
        'id': '1069',
        'old': 'true'
    },
    {
        'header': 'true',
        'name': 'Boating'
    },
    {
        'name': 'OpenRiverBoatMap',
        'address': 'http://{s}.tile.openstreetmap.fr/openriverboatmap/{z}/{x}/{y}.png',
        'maxZoom': 20,
        'attribution': attribution + 'ybon',
        'id': '1070'
    },
    {
        'name': 'FT-Blue',
        'address': 'http://www.freietonne.de/osm/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': attribution + '<a href="http://www.freietonne.de/" target="_blank">Freie Tonne</a>',
        'id': '1071'
    },
    {
        'header': 'true',
        'name': 'Beautiful'
    },
    {
        'name': 'MapBox.wheatpaste',
        'address': 'https://{s}.tiles.mapbox.com/v4/mapbox.wheatpaste/{z}/{x}/{y}.png?access_token=' + mapbox_token,
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
        'id': '1072'
    },
    {
        'name': 'MapBox.comic',
        'address': 'https://{s}.tiles.mapbox.com/v4/mapbox.comic/{z}/{x}/{y}.png?access_token=' + mapbox_token,
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
        'id': '1073',
        'language': 'en'
    },
    {
        'name': 'MapBox.pencil',
        'address': 'https://{s}.tiles.mapbox.com/v4/mapbox.pencil/{z}/{x}/{y}.png?access_token=' + mapbox_token,
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
        'id': '1074',
        'blackwhite': 'true',
        'nolabels': 'true'
    },
    {
        'name': 'MapBox.pirates',
        'address': 'https://{s}.tiles.mapbox.com/v4/mapbox.pirates/{z}/{x}/{y}.png?access_token=' + mapbox_token,
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
        'id': '1075',
        'language': 'en'
    },
    {
        'name': 'Stamen Watercolor',
        'address': 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
        'maxZoom': 20,
        'attribution': attribution + '<a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>',
        'id': '1076',
        'old': 'true',
        'nolabels': 'true'
    },
    {
        'header': 'true',
        'name': 'Satellite'
    },

/*
 https://github.com/shramov/leaflet-plugins/blob/master/examples/bing.html

 Copyright (c) 2011-2015, Pavel Shramov, Bruno Bergot

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

    {
        'bing': 'true',
        'name': 'Bing Satellite',
        'address': 'LfO3DMI9S6GnXD7d0WGs~bq2DRVkmIAzSOFdodzZLvw~Arx8dclDxmZA0Y38tHIJlJfnMbGq5GXeYmrGOUIbS2VLFzRKCK0Yv_bAl6oe-DOc',
        'maxZoom': 19,
        'type': 'Aerial',
        'id': '1077'
    },
    {
        'name': 'MapBox.streets-satellite',
        'address': 'https://{s}.tiles.mapbox.com/v4/mapbox.streets-satellite/{z}/{x}/{y}.png?access_token=' + mapbox_token,
        'maxZoom': 17,
        'attribution': attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
        'id': '1078'
    },
    {
        'name': 'MapBox.satellite',
        'address': 'https://{s}.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=' + mapbox_token,
        'maxZoom': 17,
        'attribution': tiles_attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
        'id': '1079'
    },
    {
        'tms': 'true',
        'name': 'Ортофотоплани',
        'address': 'http://212.26.144.110/tile2/orto_10000/{z}/{x}/{y}.jpg',
        'maxZoom': 16,
        'attribution': tiles_attribution + '<a href="http://map.land.gov.ua/kadastrova-karta">ЦДЗК</a>',
        'id': '1080'
    },
    {
        'name': 'MapBox Live Satellite',
        'address': 'http://{s}.tiles.mapbox.com/v4/mapbox.landsat-live/{z}/{x}/{y}.png?access_token=' + mapbox_token,
        'maxZoom': 13,
        'attribution': tiles_attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
        'subdomains': ['a', 'b'],
        'minZoom': 7,
        'id': '1081'
    }
];

var overlays_data = [
    {
        'name': 'OpenRailwayMap',
        'address': 'http://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': '<a href="http://www.openrailwaymap.org/" target="_blank">OpenRailwayMap</a>',
        'id': '2000'
    },
    {
        'name': 'OpenRailwayMap Maxspeed',
        'address': 'http://{s}.tiles.openrailwaymap.org/maxspeed/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': '<a href="http://www.openrailwaymap.org/" target="_blank">OpenRailwayMap</a>',
        'id': '2001'
    },
    {
        'name': 'OpenRailwayMap Signals',
        'address': 'http://{s}.tiles.openrailwaymap.org/signals/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': '<a href="http://www.openrailwaymap.org/" target="_blank">OpenRailwayMap</a>',
        'id': '2002'
    },
    {
        'name': 'OpenPtMap',
        'address': 'http://www.openptmap.org/tiles/{z}/{x}/{y}.png',
        'maxZoom': 17,
        'attribution': '<a href="http://www.openptmap.org/" target="_blank">OpenPtMap</a>',
        'id': '2003'
    },
    {
        'name': 'OpenFireMap - Fire hydrants',
        'address': 'http://openfiremap.org/hytiles/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': '<a href="http://openfiremap.org/" target="_blank">OpenFireMap</a>',
        'id': '2004'
    },
    {
        'name': 'OpenFireMap - Emergency rooms',
        'address': 'http://openfiremap.org/eytiles/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': '<a href="http://openfiremap.org/" target="_blank">OpenFireMap</a>',
        'id': '2005'
    }
];