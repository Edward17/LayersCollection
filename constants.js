var openstreetmap_attribution = 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors, under ODbL';
var tiles_attribution = 'Tiles: &copy; ';
var attribution = openstreetmap_attribution + ' | ' + tiles_attribution;
var osm_attribution = attribution; // must be deleted

var mapbox_token = 'pk.eyJ1IjoiZWR3YXJkMTciLCJhIjoiY2llaWR4endiMDAycXRibThvZ3dlczI3diJ9.eghwjbaS0bJ80bj2Vzd6Ew'; // This is my personal access token. Please don't use it, just register on MapBox for free: https://www.mapbox.com/signup/?plan=starter
//var lyrk_token = '';

// max layer id = 1085
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
        'maxZoom': ?
        'attribution': attribution + '<a href="http://maps.omniscale.com/" target="_blank">Omniscale</a>',
        'layers': 'osm',
        'id': '1007'
    },
*/

    {
        'name': 'OpenStreetMap.de',
        'address': 'http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': attribution + '<a href="http://openstreetmap.de/germanstyle.html" target="_blank">OpenStreetMap - Deutschland</a>',
        'id': '1008',
        'subdomains': ['a', 'b', 'c', 'd'],
        'language': 'de'
    },
    {
        'name': 'OpenStreetMap.de background',
        'address': 'http://{s}.tile.openstreetmap.de:8002/tiles/1.0.0/bg//{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': attribution + '<a href="http://openstreetmap.de/germanstyle.html" target="_blank">OpenStreetMap - Deutschland</a>',
        'id': '1084',
        'subdomains': ['a', 'b', 'c', 'd'],
        'nolabels': 'true'
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
        'name': 'wmflabs standart',
        'address': 'http://{s}.tiles.wmflabs.org/osm/{z}/{x}/{y}.png',
        'maxZoom': 21,
        'attribution': openstreetmap_attribution,
        'id': '1011'
    },
    {
        'name': 'wmflabs no-labels',
        'address': 'http://{s}.tiles.wmflabs.org/osm-no-labels/{z}/{x}/{y}.png',
        'maxZoom': 21,
        'attribution': openstreetmap_attribution,
        'id': '1012',
        'nolabels': 'true'
    },
    {
        'name': 'wmflabs B/W',
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
        'language': 'ru'
    },
    {
        'name': 'Космоснимки Ночь',
        'address': 'http://{s}.tile.osm.kosmosnimki.ru/night/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': attribution + '<a href="http://osm.kosmosnimki.ru/" target="_blank">ScanEx</a>',
        'id': '1024',
        'subdomains': ['a', 'b', 'c', 'd'],
        'language': 'ru'
    },
    {
        'name': 'Космоснимки Весна',
        'address': 'http://{s}.tile.osm.kosmosnimki.ru/spring/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': attribution + '<a href="http://osm.kosmosnimki.ru/" target="_blank">ScanEx</a>',
        'id': '1025',
        'subdomains': ['a', 'b', 'c', 'd'],
        'language': 'ru'
    },
    {
        'name': 'Космоснимки Лето',
        'address': 'http://{s}.tile.osm.kosmosnimki.ru/summer/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': attribution + '<a href="http://osm.kosmosnimki.ru/" target="_blank">ScanEx</a>',
        'id': '1026',
        'subdomains': ['a', 'b', 'c', 'd'],
        'language': 'ru'
    },
    {
        'name': 'Космоснимки Осень',
        'address': 'http://{s}.tile.osm.kosmosnimki.ru/autumn/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': attribution + '<a href="http://osm.kosmosnimki.ru/" target="_blank">ScanEx</a>',
        'id': '1027',
        'subdomains': ['a', 'b', 'c', 'd'],
        'language': 'ru'
    },
    {
        'name': 'Космоснимки Зима',
        'address': 'http://{s}.tile.osm.kosmosnimki.ru/winter/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': attribution + '<a href="http://osm.kosmosnimki.ru/" target="_blank">ScanEx</a>',
        'id': '1028',
        'subdomains': ['a', 'b', 'c', 'd'],
        'language': 'ru'
    },
    {
        'name': 'Космоснимки Печать',
        'address': 'http://{s}.tile.osm.kosmosnimki.ru/bw/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': attribution + '<a href="http://osm.kosmosnimki.ru/" target="_blank">ScanEx</a>',
        'id': '1082',
        'subdomains': ['a', 'b', 'c', 'd'],
        'blackwhite': 'true',
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
        'attribution': attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">MapBox</a>',
        'id': '1031'
    },
    {
        'name': 'MapBox.streets-basic',
        'address': 'https://{s}.tiles.mapbox.com/v4/mapbox.streets-basic/{z}/{x}/{y}.png?access_token=' + mapbox_token,
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">MapBox</a>',
        'id': '1032'
    },
    {
        'name': 'MapBox.light',
        'address': 'https://{s}.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=' + mapbox_token,
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">MapBox</a>',
        'id': '1033',
        'blackwhite': 'true',
        'language': 'en'
    },
    {
        'name': 'MapBox.dark',
        'address': 'https://{s}.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=' + mapbox_token,
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">MapBox</a>',
        'id': '1034',
        'language': 'en'
    },
    {
        'name': 'MapBox.emerald',
        'address': 'https://{s}.tiles.mapbox.com/v4/mapbox.emerald/{z}/{x}/{y}.png?access_token=' + mapbox_token,
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">MapBox</a>',
        'id': '1035'
    },
    {
        'name': 'MapBox.high-contrast',
        'address': 'https://{s}.tiles.mapbox.com/v4/mapbox.high-contrast/{z}/{x}/{y}.png?access_token=' + mapbox_token,
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">MapBox</a>',
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
        'name': 'Nachtlebenkarte',
        'address': 'http://sanday.geofabrik.de/test_night/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://blog.geofabrik.de/?p=332" target="_blank">Lisa Stolz, Geofabrik</a>',
        'id': '1085'
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
        'attribution': attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">MapBox</a>',
        'id': '1063'
    },
    {
        'name': 'MapBox.run-bike-hike',
        'address': 'https://{s}.tiles.mapbox.com/v4/mapbox.run-bike-hike/{z}/{x}/{y}.png?access_token=' + mapbox_token,
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">MapBox</a>',
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
        'name': 'Refuges.info hiking',
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
        'id': '1071',
        'old': 'true'
    },
    {
        'header': 'true',
        'name': 'Beautiful'
    },
    {
        'name': 'MapBox.wheatpaste',
        'address': 'https://{s}.tiles.mapbox.com/v4/mapbox.wheatpaste/{z}/{x}/{y}.png?access_token=' + mapbox_token,
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">MapBox</a>',
        'id': '1072'
    },
    {
        'name': 'MapBox.comic',
        'address': 'https://{s}.tiles.mapbox.com/v4/mapbox.comic/{z}/{x}/{y}.png?access_token=' + mapbox_token,
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">MapBox</a>',
        'id': '1073',
        'language': 'en'
    },
    {
        'name': 'MapBox.pencil',
        'address': 'https://{s}.tiles.mapbox.com/v4/mapbox.pencil/{z}/{x}/{y}.png?access_token=' + mapbox_token,
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">MapBox</a>',
        'id': '1074',
        'blackwhite': 'true',
        'nolabels': 'true'
    },
    {
        'name': 'MapBox.pirates',
        'address': 'https://{s}.tiles.mapbox.com/v4/mapbox.pirates/{z}/{x}/{y}.png?access_token=' + mapbox_token,
        'maxZoom': 19,
        'attribution': attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">MapBox</a>',
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
        'attribution': attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">MapBox</a>',
        'id': '1078'
    },
    {
        'name': 'MapBox.satellite',
        'address': 'https://{s}.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=' + mapbox_token,
        'maxZoom': 17,
        'attribution': tiles_attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">MapBox</a>',
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
        'attribution': tiles_attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">MapBox</a>',
        'subdomains': ['a', 'b'],
        'minZoom': 7,
        'id': '1081'
    },
    {
        'name': 'MapQuest Aerial',
        'address': 'http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg',
        'maxZoom': 18,
        'attribution': tiles_attribution + '<a href="http://www.mapquest.com/" target="_blank">MapQuest</a>',
        'subdomains': ['1', '2', '3', '4'],
        'id': '1083'
    }
];

// max overlay id = 2039
var overlays_data = [
    {
        'header': 'true',
        'name': 'General'
    },
    {
        'name': 'Semitransparent',
        'address': 'http://korona.geog.uni-heidelberg.de/tiles/hybrid/x={x}&y={y}&z={z}',
        'maxZoom': 19,
        'attribution': '<a href="http://giscience.uni-hd.de/" target="_blank">GIScience Research Group @ Heidelberg University</a>',
        'id': '2006'
    },
    {
        'name': 'MapQuest Hybrid',
        'address': 'http://ttiles0{s}.mqcdn.com/tiles/1.0.0/vy/hyb/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': '<a href="http://www.mapquest.com/" target="_blank">MapQuest</a>',
        'subdomains': ['1', '2', '3', '4'],
        'id': '2007'
    },
    {
        'name': 'Космоснимки Гибрид',
        'address': 'http://{s}.tile.osm.kosmosnimki.ru/kosmohyb/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': '<a href="http://osm.kosmosnimki.ru/" target="_blank">ScanEx</a>',
        'subdomains': ['a', 'b', 'c', 'd'],
        'id': '2008',
        'language': 'ru'
    },
    {
        'name': 'Stamen Toner-hybrid',
        'address': 'http://{s}.tile.stamen.com/toner-hybrid/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': '<a href="http://stamen.com" target="_blank">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>',
        'id': '2009',
        'old': 'true',
        'language': 'en'
    },
    {
        'name': 'Stamen Toner-lines',
        'address': 'http://{s}.tile.stamen.com/toner-lines/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': '<a href="http://stamen.com" target="_blank">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>',
        'id': '2011',
        'old': 'true',
        'nolabels': 'true'
    },
    {
        'header': 'true',
        'name': 'Labels'
    },
    {
        'name': 'Multilingual map - de',
        'address': 'http://{s}.tile.openstreetmap.de:8002/tiles/1.0.0/labels/de/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': '<a href="http://mlm.jochentopf.com/" target="_blank">Multilingual Map</a>',
        'id': '2036',
        'subdomains': ['a', 'b', 'c', 'd'],
        'language': 'de'
    },
    {
        'name': 'Multilingual map - en',
        'address': 'http://{s}.tile.openstreetmap.de:8002/tiles/1.0.0/labels/en/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': '<a href="http://mlm.jochentopf.com/" target="_blank">Multilingual Map</a>',
        'id': '2037',
        'subdomains': ['a', 'b', 'c', 'd'],
        'language': 'en'
    },
    {
        'name': 'Multilingual map - ru',
        'address': 'http://{s}.tile.openstreetmap.de:8002/tiles/1.0.0/labels/ru/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': '<a href="http://mlm.jochentopf.com/" target="_blank">Multilingual Map</a>',
        'id': '2038',
        'subdomains': ['a', 'b', 'c', 'd'],
        'language': 'ru'
    },
    {
        'name': 'Multilingual map - uk',
        'address': 'http://{s}.tile.openstreetmap.de:8002/tiles/1.0.0/labels/uk/{z}/{x}/{y}.png',
        'maxZoom': 18,
        'attribution': '<a href="http://mlm.jochentopf.com/" target="_blank">Multilingual Map</a>',
        'id': '2039',
        'subdomains': ['a', 'b', 'c', 'd'],
        'language': 'uk'
    },
    {
        'name': 'Stamen Toner-labels',
        'address': 'http://{s}.tile.stamen.com/toner-labels/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': '<a href="http://stamen.com" target="_blank">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>',
        'id': '2010',
        'old': 'true',
        'language': 'en'
    },
    {
        'header': 'true',
        'name': 'Public Transport'
    },
    {
        'name': 'OpenMap.lt Public transport',
        'address': 'http://pt.openmap.lt/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': '<a href="http://openmap.lt/" target="_blank">OpenMap.lt</a>',
        'id': '2012'
    },
    {
        'name': 'OpenPtMap',
        'address': 'http://www.openptmap.org/tiles/{z}/{x}/{y}.png',
        'maxZoom': 17,
        'attribution': '<a href="http://www.openptmap.org/" target="_blank">OpenPtMap</a>',
        'id': '2003'
    },
    {
        'header': 'true',
        'name': 'Hiking, Cycling, Boating, etc.'
    },
    {
        'name': 'Waymarked Trails: Hiking',
        'address': 'http://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png',
        'maxZoom': 17,
        'attribution': '<a href="http://hiking.waymarkedtrails.org/" target="_blank">Waymarked Trails: Hiking</a>',
        'id': '2013'
    },
    {
        'name': 'Waymarked Trails: Cycling',
        'address': 'http://{s}.tile.stamen.com/toner-lines/{z}/{x}/{y}.png',
        'maxZoom': 17,
        'attribution': '<a href="http://cycling.waymarkedtrails.org/" target="_blank">Waymarked Trails: Cycling</a>',
        'id': '2014'
    },
    {
        'name': 'Waymarked Trails: MTB',
        'address': 'http://tile.waymarkedtrails.org/mtb/{z}/{x}/{y}.png',
        'maxZoom': 17,
        'attribution': '<a href="http://mtb.waymarkedtrails.org/" target="_blank">Waymarked Trails: MTB</a>',
        'id': '2015'
    },
    {
        'name': 'Waymarked Trails: Inline Skating',
        'address': 'http://tile.waymarkedtrails.org/skating/{z}/{x}/{y}.png',
        'maxZoom': 17,
        'attribution': '<a href="http://skating.waymarkedtrails.org/" target="_blank">Waymarked Trails: Inline Skating</a>',
        'id': '2016'
    },
    {
        'name': 'Waymarked Trails: Horse Riding',
        'address': 'http://tile.waymarkedtrails.org/riding/{z}/{x}/{y}.png',
        'maxZoom': 17,
        'attribution': '<a href="http://riding.waymarkedtrails.org/" target="_blank">Waymarked Trails: Horse Riding</a>',
        'id': '2017'
    },
    {
        'name': 'Waymarked Trails: Winter Sport Slopes',
        'address': 'http://tile.waymarkedtrails.org/slopemap/{z}/{x}/{y}.png',
        'maxZoom': 17,
        'attribution': '<a href="http://slopemap.waymarkedtrails.org/" target="_blank">Waymarked Trails: Winter Sport Slopes</a>',
        'id': '2018'
    },
    {
        'name': 'OpenSeaMap',
        'address': 'http://tiles.openseamap.org/seamark/{z}/{x}/{y}.png',
        'maxZoom': 17,
        'attribution': '<a href="http://openseamap.org/" target="_blank">OpenSeaMap</a>',
        'id': '2019'
    },
    {
        'header': 'true',
        'name': 'Thematic'
    },
    {
        'name': 'Lights',
        'address': 'http://129.206.74.245:8005/tms_lt.ashx?x={x}&y={y}&z={z}',
        'maxZoom': 19,
        'attribution': '<a href="http://giscience.uni-hd.de/" target="_blank">GIScience Research Group @ Heidelberg University</a>',
        'id': '2020'
    },
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
    },
    {
        'wms': 'true',
        'name': 'Street areas',
        'address': 'http://osmapa.pl/ua',
        'maxZoom': 20,
        'attribution': '<a href="http://osmapa.pl/w/areaua/" target="_blank">Osmapa.pl</a>',
        'id': '2021',
        'minZoom': 6,
        'layers': ['areahighwaylow','areahighwaysurf','areanamesurf'],
        'format': 'image/png',
        'transparent': true,
        'opacity': 1,
    },
    {
        'wms': 'true',
        'name': 'Street crossings',
        'address': 'http://osmapa.pl/ua',
        'maxZoom': 20,
        'attribution': '<a href="http://osmapa.pl/w/areaua/" target="_blank">Osmapa.pl</a>',
        'id': '2022',
        'minZoom': 16,
        'layers': ['pasy_mr'],
        'format': 'image/png',
        'transparent': true,
        'opacity': 1,
    },
    {
        'header': 'true',
        'name': 'Administrative boundaries'
    },
    {
        'name': 'Admin Boundaries',
        'address': 'http://korona.geog.uni-heidelberg.de/tiles/adminb/x={x}&y={y}&z={z}',
        'maxZoom': 18,
        'attribution': '<a href="http://giscience.uni-hd.de/" target="_blank">GIScience Research Group @ Heidelberg University</a>',
        'id': '2023'
    },
    {
        'name': 'admin_level=2',
        'address': 'http://{s}.layers.openstreetmap.fr/admin2/{z}/{x}/{y}.png',
        'maxZoom': 22,
        'attribution': '<a href="http://wiki.openstreetmap.org/wiki/User:Sletuffe" target="_blank">sly</a>',
        'id': '2024'
    },
    {
        'name': 'admin_level=3',
        'address': 'http://{s}.layers.openstreetmap.fr/admin3/{z}/{x}/{y}.png',
        'maxZoom': 22,
        'attribution': '<a href="http://wiki.openstreetmap.org/wiki/User:Sletuffe" target="_blank">sly</a>',
        'id': '2025'
    },
    {
        'name': 'admin_level=4',
        'address': 'http://{s}.layers.openstreetmap.fr/admin4/{z}/{x}/{y}.png',
        'maxZoom': 22,
        'attribution': '<a href="http://wiki.openstreetmap.org/wiki/User:Sletuffe" target="_blank">sly</a>',
        'id': '2026'
    },
    {
        'name': 'admin_level=5',
        'address': 'http://{s}.layers.openstreetmap.fr/admin5/{z}/{x}/{y}.png',
        'maxZoom': 22,
        'attribution': '<a href="http://wiki.openstreetmap.org/wiki/User:Sletuffe" target="_blank">sly</a>',
        'id': '2027'
    },
    {
        'name': 'admin_level=6',
        'address': 'http://{s}.layers.openstreetmap.fr/admin6/{z}/{x}/{y}.png',
        'maxZoom': 22,
        'attribution': '<a href="http://wiki.openstreetmap.org/wiki/User:Sletuffe" target="_blank">sly</a>',
        'id': '2028'
    },
    {
        'name': 'admin_level=7',
        'address': 'http://{s}.layers.openstreetmap.fr/admin7/{z}/{x}/{y}.png',
        'maxZoom': 22,
        'attribution': '<a href="http://wiki.openstreetmap.org/wiki/User:Sletuffe" target="_blank">sly</a>',
        'id': '2029'
    },
    {
        'name': 'admin_level=8',
        'address': 'http://{s}.layers.openstreetmap.fr/admin8/{z}/{x}/{y}.png',
        'maxZoom': 22,
        'attribution': '<a href="http://wiki.openstreetmap.org/wiki/User:Sletuffe" target="_blank">sly</a>',
        'id': '2030'
    },
    {
        'name': 'admin_level=9',
        'address': 'http://{s}.layers.openstreetmap.fr/admin9/{z}/{x}/{y}.png',
        'maxZoom': 22,
        'attribution': '<a href="http://wiki.openstreetmap.org/wiki/User:Sletuffe" target="_blank">sly</a>',
        'id': '2031'
    },
    {
        'name': 'admin_level=10',
        'address': 'http://{s}.layers.openstreetmap.fr/admin10/{z}/{x}/{y}.png',
        'maxZoom': 22,
        'attribution': '<a href="http://wiki.openstreetmap.org/wiki/User:Sletuffe" target="_blank">sly</a>',
        'id': '2032'
    },
    {
        'header': 'true',
        'name': 'GPS, Relief'
    },
    {
        'name': 'GPS Tracks',
        'address': 'http://{s}.gps-tile.openstreetmap.org/lines/{z}/{x}/{y}.png',
        'maxZoom': 19,
        'attribution': 'Traces: &copy; <a href="http://www.openstreetmap.org/traces" target="_blank">OpenStreetMap</a> contributors',
        'id': '2033'
    },
    {
        'name': 'ASTER GDEM & SRTM Hillshade',
        'address': 'http://korona.geog.uni-heidelberg.de/tiles/asterh/x={x}&y={y}&z={z}',
        'maxZoom': 18,
        'attribution': 'ASTER GDEM is a product of <a href="http://www.meti.go.jp/english/press/data/20090626_03.html" target="_blank">METI</a> and <a href="https://lpdaac.usgs.gov/products/aster_policies" target="_blank">NASA</a> | ' + tiles_attribution + '<a href="http://giscience.uni-hd.de/" target="_blank">GIScience Research Group @ Heidelberg University</a>',
        'id': '2034'
    },
    {
        'name': 'ASTER GDEM Contour lines',
        'address': 'http://korona.geog.uni-heidelberg.de/tiles/asterc/x={x}&y={y}&z={z}',
        'maxZoom': 17,
        'attribution': 'ASTER GDEM is a product of <a href="http://www.meti.go.jp/english/press/data/20090626_03.html" target="_blank">METI</a> and <a href="https://lpdaac.usgs.gov/products/aster_policies" target="_blank">NASA</a> | ' + tiles_attribution + '<a href="http://giscience.uni-hd.de/" target="_blank">GIScience Research Group @ Heidelberg University</a>',
        'id': '2035',
        'minZoom': 13
    }
];