var osm_attribution = 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>, under ODbL | Tiles: &copy; ';
var mapbox_token = 'pk.eyJ1IjoiZWR3YXJkMTciLCJhIjoiY2llaWR4endiMDAycXRibThvZ3dlczI3diJ9.eghwjbaS0bJ80bj2Vzd6Ew'; // This is my personal access token. Please don't use it, just register on MapBox for free: https://www.mapbox.com/signup/?plan=starter
//var lyrk_token = '';

var permalink;
var left;
var map;

var layers = [];
var layer_names = [];
var current_layer_index = -1;

function load() {
    map = L.map(
        'map',
        {
            center: [49.373, 31.861],
            zoom: 10
        }
    );
    left = document.getElementById('left');
    permalink = document.getElementById('permalink');

    addHeaderToLeft('General');

    layers[0] = L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            maxZoom: 19,
            attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>, under ODbL'
        }
    );
    addLayerToLeft(0, 'OpenStreetMap');

    initLayers();

    map.on('move', generatePermalink);
    checkPermalink();
}

function initLayers() {
    var new_layer;
    var i;

    new_layer = L.tileLayer(
        'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Humanitarian');

    new_layer = L.tileLayer(
        'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: osm_attribution + '<a href="http://www.mapquest.com/" target="_blank">MapQuest</a>',
                subdomains: ['1', '2', '3', '4']
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'MapQuest Open');

    new_layer = L.tileLayer(
        'http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}',
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://giscience.uni-hd.de/" target="_blank">GIScience Research Group @ Heidelberg University</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'MapSurfer.NET');

    new_layer = L.tileLayer(
        'http://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}',
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://giscience.uni-hd.de/" target="_blank">GIScience Research Group @ Heidelberg University</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'MapSurfer.NET gray', '<span class="bw">b/w</span>');

//// I don't know how to register on Lyrk and bekome access token. If you know please contact me.
//
//    new_layer = L.tileLayer(
//        'https://tiles.lyrk.org/ls/{z}/{x}/{y}?apikey=' + lyrk_token,
//            {
//                maxZoom: 18,
//                attribution: osm_attribution + '<a href="http://lyrk.de/" target="_blank">Lyrk</a>'
//            }
//        );
//    i = layers.push(new_layer);
//    addLayerToLeft(i - 1, 'Lyrk');
//
//    new_layer = L.tileLayer(
//        'https://tiles.lyrk.org/lr/{z}/{x}/{y}?apikey=' + lyrk_token,
//            {
//                maxZoom: 18,
//                attribution: osm_attribution + '<a href="http://lyrk.de/" target="_blank">Lyrk</a>'
//            }
//        );
//    i = layers.push(new_layer);
//    addLayerToLeft(i - 1, 'Lyrk Retina');
//
//// don't works
//
//    new_layer = L.tileLayer.wms(
//        'https://maps.omniscale.net/v1/.../tile', // key must be added
//            {
//                layers: 'osm',
//                attribution: osmAttr + ', &copy; <a href="http://maps.omniscale.com/" target="_blank">Omniscale</a>'
//            }
//        );
//    i = layers.push(new_layer);
//    addLayerToLeft(i - 1, 'Omniscale');

    new_layer = L.tileLayer(
        'http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://openstreetmap.de/germanstyle.html" target="_blank">OpenStreetMap - Deutschland</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'OpenStreetMap.de', '<span class="lang">de</span>');

    new_layer = L.tileLayer(
        'http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
            {
                maxZoom: 20,
                attribution: osm_attribution + '<a href="http://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'OpenStreetMap.fr', '<span class="lang">fr</span>');

    new_layer = L.tileLayer(
        'http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: osm_attribution + '<a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'OpenStreetMap.se');

    new_layer = L.tileLayer(
        'http://{s}.tiles.wmflabs.org/osm/{z}/{x}/{y}.png',
            {
                maxZoom: 21,
                attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>, under ODbL'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'OSM standart (wmflabs)');

    new_layer = L.tileLayer(
        'http://{s}.tiles.wmflabs.org/osm-no-labels/{z}/{x}/{y}.png',
            {
                maxZoom: 21,
                attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>, under ODbL'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'OSM no-labels (wmflabs)', '<span class="nl">nl</span>');

    new_layer = L.tileLayer(
        'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
            {
                maxZoom: 21,
                attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>, under ODbL'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'OSM B/W (wmflabs)', '<span class="bw">b/w</span>');

    new_layer = L.tileLayer(
        'http://map.dgpsonline.eu/default/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://www.alberding.eu/" target="_blank">Alberding GmbH</a>, CC-BY-SA'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Alberding');

    new_layer = L.tileLayer(
        'http://map.dgpsonline.eu/osmsb/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://www.alberding.eu/" target="_blank">Alberding GmbH</a>, CC-BY-SA'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'Alberding (sorbian)', '<span class="lang">wen</span>');

    new_layer = L.tileLayer(
        'http://4umaps.eu/{z}/{x}/{y}.png',
            {
                maxZoom: 15,
                attribution: osm_attribution + '<a href="http://www.4umaps.eu/">4UMaps</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, '4UMaps');

    new_layer = L.tileLayer(
        'http://{s}.tile.openstreetmap.pl/osmapa.pl/{z}/{x}/{y}.png',
            {
                maxZoom: 20,
                attribution: osm_attribution + '<a href="http://osmapa.pl/" target="_blank">Osmapa.pl</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'Osmapa.pl', '<span class="lang">pl</span>');

    new_layer = L.tileLayer(
        'http://tiles-base.openstreetbrowser.org/tiles/basemap_base/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://www.openstreetbrowser.org/" target="_blank">OpenStreetBrowser</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'OpenStreetBrowser');

//// Don't works with website (GitHub pages also), only with localhost: http://www.gossamer-threads.com/lists/wiki/mediawiki-cvs/625066
//
//    new_layer = L.tileLayer(
//        'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
//            {
//                maxZoom: 19,
//                attribution: osm_attribution + '<a href="https://maps.wikimedia.org" target="_blank">Wikimedia maps</a>'
//            }
//        );
//    i = layers.push(new_layer);
//    addLayerToLeft(i - 1, 'Wikimedia maps');

    new_layer = L.tileLayer(
        'http://tile.osmand.net/hd/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://osmand.net/" target="_blank">OsmAnd</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'OsmAnd Online');

    new_layer = L.tileLayer(
        'http://{s}.tiles.maps.sputnik.ru/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://maps.sputnik.ru/" target="_blank">Sputnik</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'Sputnik', '<span class="lang">ru</span>');

    new_layer = L.tileLayer(
        'http://tiles.maps.sputnik.ru/tiles/kmt2/{z}/{x}/{y}.png?tag=retina',
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://maps.sputnik.ru/" target="_blank">Sputnik</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'Sputnik Retina', '<span class="lang">ru</span>');

    new_layer = L.tileLayer(
        'http://{s}.tile.osm.kosmosnimki.ru/kosmo/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: osm_attribution + '<a href="http://osm.kosmosnimki.ru/" target="_blank">ScanEx</a>',
                subdomains: ['a', 'b', 'c', 'd']
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'Kosmosnimki', '<span class="old">old</span><span class="lang">ru</span>');

    new_layer = L.tileLayer(
        'http://{s}.tile.osm.kosmosnimki.ru/night/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: osm_attribution + '<a href="http://osm.kosmosnimki.ru/" target="_blank">ScanEx</a>',
                subdomains: ['a', 'b', 'c', 'd']
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'Kosmosnimki Night', '<span class="old">old</span><span class="lang">ru</span>');

    new_layer = L.tileLayer(
        'http://{s}.tile.osm.kosmosnimki.ru/spring/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: osm_attribution + '<a href="http://osm.kosmosnimki.ru/" target="_blank">ScanEx</a>',
                subdomains: ['a', 'b', 'c', 'd']
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'Kosmosnimki Spring', '<span class="old">old</span><span class="lang">ru</span>');

    new_layer = L.tileLayer(
        'http://{s}.tile.osm.kosmosnimki.ru/summer/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: osm_attribution + '<a href="http://osm.kosmosnimki.ru/" target="_blank">ScanEx</a>',
                subdomains: ['a', 'b', 'c', 'd']
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'Kosmosnimki Summer', '<span class="old">old</span><span class="lang">ru</span>');

    new_layer = L.tileLayer(
        'http://{s}.tile.osm.kosmosnimki.ru/autumn/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: osm_attribution + '<a href="http://osm.kosmosnimki.ru/" target="_blank">ScanEx</a>',
                subdomains: ['a', 'b', 'c', 'd']
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'Kosmosnimki Autumn', '<span class="old">old</span><span class="lang">ru</span>');

    new_layer = L.tileLayer(
        'http://{s}.tile.osm.kosmosnimki.ru/winter/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: osm_attribution + '<a href="http://osm.kosmosnimki.ru/" target="_blank">ScanEx</a>',
                subdomains: ['a', 'b', 'c', 'd']
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'Kosmosnimki Winter', '<span class="old">old</span><span class="lang">ru</span>');

    new_layer = L.tileLayer(
        'http://ingreelab.net/C04AF0B62BEC112E8D7242FB848631D12D252728/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://чепецк.net/" target="_blank">ST-GIS</a>, <a href="http://www.openstreetmap.org/user/Max%20Vasilev" target="_blank">Max Vasilev</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'Чепецк.NET', '<span class="lang">ru</span>');

    new_layer = L.tileLayer(
        'http://ingreelab.net/stranger/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://чепецк.net/" target="_blank">ST-GIS</a>, <a href="http://www.openstreetmap.org/user/Max%20Vasilev" target="_blank">Max Vasilev</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'stranger', '<span class="nl">nl</span>');

    new_layer = L.tileLayer(
        'https://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapbox_token,
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
                id: 'mapbox.streets',
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'MapBox.streets');

    new_layer = L.tileLayer(
        'https://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapbox_token,
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
                id: 'mapbox.streets-basic',
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'MapBox.streets-basic');

    new_layer = L.tileLayer(
        'https://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapbox_token,
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
                id: 'mapbox.light',
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'MapBox.light', '<span class="lang">en</span>');

    new_layer = L.tileLayer(
        'https://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapbox_token,
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
                id: 'mapbox.dark',
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'MapBox.dark', '<span class="lang">en</span>');

    new_layer = L.tileLayer(
        'https://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapbox_token,
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
                id: 'mapbox.emerald',
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'MapBox.emerald');

    new_layer = L.tileLayer(
        'https://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapbox_token,
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
                id: 'mapbox.high-contrast',
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'MapBox.high-contrast', '<span class="lang">en</span>');

    new_layer = L.tileLayer(
        'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            {
                maxZoom: 22, // can be more
                attribution: osm_attribution + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'CartoDB Positron', '<span class="old">old</span><span class="lang">en</span>');

    new_layer = L.tileLayer(
        'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            {
                maxZoom: 22, // can be more
                attribution: osm_attribution + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'CartoDB Dark Matter', '<span class="old">old</span><span class="lang">en</span>');

    new_layer = L.tileLayer(
        'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
            {
                maxZoom: 22, // can be more
                attribution: osm_attribution + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'CartoDB Positron (no labels)', '<span class="old">old</span><span class="nl">nl</span>');

    new_layer = L.tileLayer(
        'http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',
            {
                maxZoom: 22, // can be more
                attribution: osm_attribution + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'CartoDB Dark Matter (no labels)', '<span class="old">old</span><span class="nl">nl</span>');

    new_layer = L.tileLayer(
        'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
            {
                maxZoom: 22, // can be more
                attribution: osm_attribution + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'CartoDB Positron Retina', '<span class="old">old</span><span class="lang">en</span>');

    new_layer = L.tileLayer(
        'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
            {
                maxZoom: 22, // can be more
                attribution: osm_attribution + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'CartoDB Dark Matter Retina', '<span class="old">old</span><span class="lang">en</span>');

    new_layer = L.tileLayer(
        'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png',
            {
                maxZoom: 22, // can be more
                attribution: osm_attribution + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'CartoDB Positron (no labels) Retina', '<span class="old">old</span><span class="nl">nl</span>');

    new_layer = L.tileLayer(
        'http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}@2x.png',
            {
                maxZoom: 22, // can be more
                attribution: osm_attribution + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'CartoDB Dark Matter (no labels) Retina', '<span class="old">old</span><span class="nl">nl</span>');

    new_layer = L.tileLayer(
        'https://cartocdn_{s}.global.ssl.fastly.net/base-antique/{z}/{x}/{y}.png',
            {
                maxZoom: 22, // can be more
                attribution: osm_attribution + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'CartoDB World Antique', '<span class="old">old</span><span class="lang">en</span>');

    new_layer = L.tileLayer(
        'https://cartocdn_{s}.global.ssl.fastly.net/base-eco/{z}/{x}/{y}.png',
            {
                maxZoom: 22, // can be more
                attribution: osm_attribution + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'CartoDB World Eco', '<span class="old">old</span><span class="lang">en</span>');

    new_layer = L.tileLayer(
        'https://cartocdn_{s}.global.ssl.fastly.net/base-midnight/{z}/{x}/{y}.png',
            {
                maxZoom: 22, // can be more
                attribution: osm_attribution + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'CartoDB World Flat Blue', '<span class="old">old</span><span class="nl">nl</span>');

    new_layer = L.tileLayer(
        'https://cartocdn_{s}.global.ssl.fastly.net/base-antique/{z}/{x}/{y}.png',
            {
                maxZoom: 22, // can be more
                attribution: osm_attribution + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'CartoDB World Midnight Commander', '<span class="old">old</span><span class="lang">en</span>');

    new_layer = L.tileLayer(
        'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png',
            {
                maxZoom: 20,
                attribution: osm_attribution + '<a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'Stamen Toner', '<span class="old">old</span><span class="lang">en</span>');

    new_layer = L.tileLayer(
        'http://{s}.tile.stamen.com/toner-background/{z}/{x}/{y}.png',
            {
                maxZoom: 20,
                attribution: osm_attribution + '<a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'Stamen Toner-background', '<span class="old">old</span><span class="nl">nl</span>');

    new_layer = L.tileLayer(
        'http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png',
            {
                maxZoom: 20,
                attribution: osm_attribution + '<a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'Stamen Toner-lite', '<span class="old">old</span><span class="lang">en</span>');

    new_layer = L.tileLayer(
        'http://tiles{s}-bc7b4da77e971c12cb0e069bffcf2771.skobblermaps.com/TileService/tiles/2.0/01021113210/7/{z}/{x}/{y}.png?traffic=false',
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://www.skobbler.com/">Skobbler</a>',
                subdomains: ['1', '2', '3']
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Skobbler');

    new_layer = L.tileLayer(
        'http://tiles{s}-bc7b4da77e971c12cb0e069bffcf2771.skobblermaps.com/TileService/tiles/2.0/01021113210/7/{z}/{x}/{y}.png?traffic=true',
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://www.skobbler.com/">Skobbler</a>',
                subdomains: ['1', '2', '3']
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Skobbler (with traffic)');

    new_layer = L.tileLayer(
        'http://ec2.cdn.ecmaps.de/WmsGateway.ashx.jpg?TileX={x}&TileY={y}&ZoomLevel={z}&Experience=falk&MapStyle=Falk%20OSM',
            {
                maxZoom: 16,
                attribution: osm_attribution + '2013 <a href="http://www.falk.de/">Falk Verlag</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Falk');

    new_layer = L.tileLayer(
        'http://tile0{s}.maptoolkit.net/terrain/{z}/{x}/{y}.png',
            {
                maxZoom: 17,
                attribution: osm_attribution + '<a href="http://www.toursprung.com/">Toursprung GmbH</a>',
                subdomains: ['1', '2', '3']
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Maptoolkit');

    new_layer = L.tileLayer(
        'http://maps.refuges.info/hiking/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: osm_attribution + '<a href="http://maps.refuges.info/" target="_blank">sly</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Refuges.info');

    new_layer = L.tileLayer(
        'http://www.openhistoricalmap.org/ohm_tiles/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: osm_attribution + '<a href="http://www.openhistoricalmap.org/">OpenHistoricalMap</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'OpenHistoricalMap');

    addHeaderToLeft('Public Transport');

    new_layer = L.tileLayer(
        'http://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://www.thunderforest.com/" target="_blank">Andy Allan</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Thunderforest Transport');

    new_layer = L.tileLayer(
        'http://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://www.thunderforest.com/" target="_blank">Andy Allan</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Thunderforest Transport Dark');

    new_layer = L.tileLayer(
        'http://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: osm_attribution + '<a href="http://öpnvkarte.de/">ÖPNV Karte</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'ÖPNV Karte');

    addHeaderToLeft('Hiking, Cycling, etc.');

    new_layer = L.tileLayer(
        'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: osm_attribution + '<a href="http://www.thunderforest.com/" target="_blank">Andy Allan</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Thunderforest Landscape');

    new_layer = L.tileLayer(
        'http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: osm_attribution + '<a href="http://www.thunderforest.com/" target="_blank">Andy Allan</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Thunderforest Outdoors');

    new_layer = L.tileLayer(
        'http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: osm_attribution + '<a href="http://www.thunderforest.com/" target="_blank">Andy Allan</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Thunderforest OpenCycleMap');

    new_layer = L.tileLayer(
        'https://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapbox_token,
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
                id: 'mapbox.outdoors',
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'MapBox.outdoors');

    new_layer = L.tileLayer(
        'https://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapbox_token,
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
                id: 'mapbox.run-bike-hike',
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'MapBox.run-bike-hike', '<span class="lang">en</span>');

    new_layer = L.tileLayer(
        'http://toolserver.org/tiles/hikebike/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://hikebikemap.de/">Colin Marquardt</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Hike & Bike');

    new_layer = L.tileLayer(
        'http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
            {
                maxZoom: 15,
                attribution: osm_attribution + '<a href="http://opentopomap.org/">OpenTopoMap</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'OpenTopoMap');

    new_layer = L.tileLayer(
        'http://78.47.183.107/veloroad/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://osmz.ru/veloroad2.html">Ilya Zverev</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'Veloroad 2', '<span class="lang">ru</span>');

    new_layer = L.tileLayer(
        'https://www.komoot.de/tiles/{s}/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="https://www.komoot.de/">Komoot</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Komoot');

    addHeaderToLeft('Boating');

    new_layer = L.tileLayer(
        'http://{s}.tile.openstreetmap.fr/openriverboatmap/{z}/{x}/{y}.png',
            {
                maxZoom: 20,
                attribution: osm_attribution + 'ybon'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'OpenRiverBoatMap');

    new_layer = L.tileLayer(
        'http://www.freietonne.de/osm/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: osm_attribution + '<a href="http://www.freietonne.de/">Freie Tonne</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'FT-Blue');

    addHeaderToLeft('Beautiful');

    new_layer = L.tileLayer(
        'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
            {
                maxZoom: 20,
                attribution: osm_attribution + '<a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'Stamen Watercolor', '<span class="old">old</span><span class="nl">nl</span>');

    new_layer = L.tileLayer(
        'https://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapbox_token,
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
                id: 'mapbox.wheatpaste',
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'MapBox.wheatpaste');

    new_layer = L.tileLayer(
        'https://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapbox_token,
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
                id: 'mapbox.comic',
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'MapBox.comic', '<span class="lang">en</span>');

    new_layer = L.tileLayer(
        'https://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapbox_token,
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
                id: 'mapbox.pencil',
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'MapBox.pencil', '<span class="nl">nl</span>');

    new_layer = L.tileLayer(
        'https://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapbox_token,
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
                id: 'mapbox.pirates',
            }
        );
    i = layers.push(new_layer);
    addLayerWithInformationToLeft(i - 1, 'MapBox.pirates', '<span class="lang">en</span>');

    addHeaderToLeft('Satellite');

// https://github.com/shramov/leaflet-plugins/blob/master/examples/bing.html
//
// Copyright (c) 2011-2015, Pavel Shramov, Bruno Bergot
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

    new_layer = new L.BingLayer(
        'LfO3DMI9S6GnXD7d0WGs~bq2DRVkmIAzSOFdodzZLvw~Arx8dclDxmZA0Y38tHIJlJfnMbGq5GXeYmrGOUIbS2VLFzRKCK0Yv_bAl6oe-DOc',
            {
                maxZoom: 19, // my line
                type: 'Aerial'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Bing Satellite');

    new_layer = L.tileLayer(
        'https://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapbox_token,
            {
                maxZoom: 17,
                attribution: osm_attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
                id: 'mapbox.streets-satellite',
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'MapBox.streets-satellite');

    new_layer = L.tileLayer(
        'https://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapbox_token,
            {
                maxZoom: 17,
                attribution: 'Tiles: &copy; <a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
                id: 'mapbox.satellite',
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'MapBox.satellite');

    new_layer = L.tileLayer(
        'http://212.26.144.110/tile2/orto_10000/{z}/{x}/{y}.jpg',
            {
                maxZoom: 16,
                attribution: 'Tiles: &copy; <a href="http://map.land.gov.ua/kadastrova-karta">ЦДЗК</a>',
                tms: true
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Ортофотоплани');

    new_layer = L.tileLayer(
        'http://{s}.tiles.mapbox.com/v4/mapbox.landsat-live/{z}/{x}/{y}.png?access_token=' + mapbox_token,
            {
                maxZoom: 13,
                attribution: 'Tiles: &copy; <a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
                subdomains: ['a', 'b'],
                minZoom: 7
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'MapBox Live Satellite');

//// overlay layers
//
//    new_layer = L.tileLayer(
//        'http://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png',
//            {
//                maxZoom: 19,
//                attribution: osm_attribution + '<a href="http://www.openrailwaymap.org/">OpenRailwayMap</a>'
//            }
//        );
//    i = layers.push(new_layer);
//    addLayerToLeft(i - 1, 'OpenRailwayMap');
//
//    new_layer = L.tileLayer(
//        'http://{s}.tiles.openrailwaymap.org/maxspeed/{z}/{x}/{y}.png',
//            {
//                maxZoom: 19,
//                attribution: osm_attribution + '<a href="http://www.openrailwaymap.org/">OpenRailwayMap</a>'
//            }
//        );
//    i = layers.push(new_layer);
//    addLayerToLeft(i - 1, 'OpenRailwayMap Maxspeed');
//
//    new_layer = L.tileLayer(
//        'http://{s}.tiles.openrailwaymap.org/signals/{z}/{x}/{y}.png',
//            {
//                maxZoom: 19,
//                attribution: osm_attribution + '<a href="http://www.openrailwaymap.org/">OpenRailwayMap</a>'
//            }
//        );
//    i = layers.push(new_layer);
//    addLayerToLeft(i - 1, 'OpenRailwayMap Signals');
//
//    new_layer = L.tileLayer(
//        'http://www.openptmap.org/tiles/{z}/{x}/{y}.png',
//            {
//                maxZoom: 17,
//                attribution: osm_attribution + '<a href="http://www.openptmap.org/">OpenPtMap</a>'
//            }
//        );
//    i = layers.push(new_layer);
//    addLayerToLeft(i - 1, 'OpenPtMap');
//
//    new_layer = L.tileLayer(
//        'http://openfiremap.org/hytiles/{z}/{x}/{y}.png',
//            {
//                maxZoom: 19,
//                attribution: osm_attribution + '<a href="http://openfiremap.org/">OpenFireMap</a>'
//            }
//        );
//    i = layers.push(new_layer);
//    addLayerToLeft(i - 1, 'OpenFireMap - Fire hydrants');
//
//    new_layer = L.tileLayer(
//        'http://openfiremap.org/eytiles/{z}/{x}/{y}.png',
//            {
//                maxZoom: 19,
//                attribution: osm_attribution + '<a href="http://openfiremap.org/">OpenFireMap</a>'
//            }
//        );
//    i = layers.push(new_layer);
//    addLayerToLeft(i - 1, 'OpenFireMap - Emergency rooms');
}

function addLayerToLeft(i, layer_name) {
    left.innerHTML = left.innerHTML + '<button type="button" onclick="showLayer(' + i + ')">Show</button> ' + layer_name + '<br>';
    layer_names.push(layer_name);
}

function addLayerWithInformationToLeft(i, layer_name, additional_information) {
    left.innerHTML = left.innerHTML + '<button type="button" onclick="showLayer(' + i + ')">Show</button> ' + layer_name + additional_information + '<br>';
    layer_names.push(layer_name);
}

function addHeaderToLeft(header_name) {
    left.innerHTML = left.innerHTML + '<b>' + header_name + '</b><br>';
}

function showLayer(i) {
    if (i != current_layer_index) {
        if(current_layer_index != -1) {
            map.removeLayer(layers[current_layer_index]);
        }

        map.addLayer(layers[i]);
        current_layer_index = i;
    }

    generatePermalink('');
}

function checkPermalink() {
    if (window.location.hash.toString().length > 0) {
        var hash = new String(window.location.hash.toString());
        hash = hash.replace('#map=', '');
        var data = hash.split('/');
        var zoom = data[0];
        var lat = data[1];
        var lng_layer = data[2].split('&layer=');
        var lng = lng_layer[0];
        var layer = lng_layer[1];

        map.setView(L.latLng(lat, lng), zoom);
        showLayer(layer);
    } else {
        showLayer(0);
    }
}

function generatePermalink(e) {
    var lat_string = map.getCenter().lat + '';
    lat_string = lat_string.substring(1, 9);
    var permalink_url = 'http://edward17.github.io/LayersCollection/#map=' + map.getZoom() + '/' + map.getCenter().lat + '/' + map.getCenter().lng + '&layer=' + current_layer_index;
    permalink.setAttribute('href', permalink_url);
}