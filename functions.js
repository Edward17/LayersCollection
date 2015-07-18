var osm_attribution = 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>, under ODbL | Tiles: &copy; ';
var mapbox_token = '';
var lyrk_token = '';

var map;
var left;

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

    layers[0] = L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            maxZoom: 19,
            attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>, under ODbL'
        }
    );
    addLayerToLeft(0, 'OpenStreetMap');
    showLayer(0);

    initLayers();
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
    addLayerToLeft(i - 1, 'MapSurfer.NET gray');

    new_layer = L.tileLayer(
        'https://tiles.lyrk.org/ls/{z}/{x}/{y}?apikey=' + lyrk_token,
            {
                maxZoom: 18,
                attribution: osm_attribution + '<a href="http://lyrk.de/" target="_blank">Lyrk</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Lyrk');

    new_layer = L.tileLayer(
        'https://tiles.lyrk.org/lr/{z}/{x}/{y}?apikey=' + lyrk_token,
            {
                maxZoom: 18,
                attribution: osm_attribution + '<a href="http://lyrk.de/" target="_blank">Lyrk</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Lyrk Retina');

//// don't works
//    new_layer = L.tileLayer.wms(
//        'https://maps.omniscale.net/v1/.../tile', // key must be added
//            {
//                layers: 'osm',
//                attribution: osmAttr + ', &copy; <a href="http://maps.omniscale.com/" target="_blank">Omniscale</a>'
//            }
//        );
//    i = layers.push(new_layer);
//    addLayerToLeft(i - 1, 'Omniscale');
//
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
        'http://tiles-base.openstreetbrowser.org/tiles/basemap_base/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://www.openstreetbrowser.org/" target="_blank">OpenStreetBrowser</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'OpenStreetBrowser');

    new_layer = L.tileLayer(
        'http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://openstreetmap.de/germanstyle.html" target="_blank">OpenStreetMap - Deutschland</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'OpenStreetMap.de');

    new_layer = L.tileLayer(
        'http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
            {
                maxZoom: 20,
                attribution: osm_attribution + 'OpenStreetMap France'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'OpenStreetMap.fr');

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
    addLayerToLeft(i - 1, 'Alberding (sorbian)');

    new_layer = L.tileLayer(
        'http://{s}.tiles.maps.sputnik.ru/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://maps.sputnik.ru/" target="_blank">Sputnik</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Sputnik');

    new_layer = L.tileLayer(
        'http://{s}.tile.osm.kosmosnimki.ru/kosmo/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: osm_attribution + '<a href="http://osm.kosmosnimki.ru/" target="_blank">ScanEx</a>',
                subdomains: ['a', 'b', 'c', 'd']
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Kosmosnimki');

    new_layer = L.tileLayer(
        'http://{s}.tile.osm.kosmosnimki.ru/night/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: osm_attribution + '<a href="http://osm.kosmosnimki.ru/" target="_blank">ScanEx</a>',
                subdomains: ['a', 'b', 'c', 'd']
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Kosmosnimki Night');

    new_layer = L.tileLayer(
        'http://{s}.tile.osm.kosmosnimki.ru/spring/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: osm_attribution + '<a href="http://osm.kosmosnimki.ru/" target="_blank">ScanEx</a>',
                subdomains: ['a', 'b', 'c', 'd']
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Kosmosnimki Spring');

    new_layer = L.tileLayer(
        'http://{s}.tile.osm.kosmosnimki.ru/summer/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: osm_attribution + '<a href="http://osm.kosmosnimki.ru/" target="_blank">ScanEx</a>',
                subdomains: ['a', 'b', 'c', 'd']
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Kosmosnimki Summer');

    new_layer = L.tileLayer(
        'http://{s}.tile.osm.kosmosnimki.ru/autumn/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: osm_attribution + '<a href="http://osm.kosmosnimki.ru/" target="_blank">ScanEx</a>',
                subdomains: ['a', 'b', 'c', 'd']
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Kosmosnimki Autumn');

    new_layer = L.tileLayer(
        'http://{s}.tile.osm.kosmosnimki.ru/winter/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: osm_attribution + '<a href="http://osm.kosmosnimki.ru/" target="_blank">ScanEx</a>',
                subdomains: ['a', 'b', 'c', 'd']
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Kosmosnimki Winter');

    new_layer = L.tileLayer(
        'http://ingreelab.net/C04AF0B62BEC112E8D7242FB848631D12D252728/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://чепецк.net/" target="_blank">ST-GIS</a>, <a href="http://www.openstreetmap.org/user/Max%20Vasilev" target="_blank">Max Vasilev</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Чепецк.NET');

    new_layer = L.tileLayer(
        'http://ingreelab.net/stranger/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://чепецк.net/" target="_blank">ST-GIS</a>, <a href="http://www.openstreetmap.org/user/Max%20Vasilev" target="_blank">Max Vasilev</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'stranger');

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
                id: 'mapbox.streets-satellite',
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'MapBox.streets-satellite');

    new_layer = L.tileLayer(
        'https://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapbox_token,
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
                id: 'mapbox.satellite',
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'MapBox.satellite');

    new_layer = L.tileLayer(
        'https://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapbox_token,
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
                id: 'mapbox.light',
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'MapBox.light');

    new_layer = L.tileLayer(
        'https://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapbox_token,
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
                id: 'mapbox.dark',
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'MapBox.dark');

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
    addLayerToLeft(i - 1, 'MapBox.comic');

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
    addLayerToLeft(i - 1, 'MapBox.run-bike-hike');

    new_layer = L.tileLayer(
        'https://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapbox_token,
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
                id: 'mapbox.pencil',
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'MapBox.pencil');

    new_layer = L.tileLayer(
        'https://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapbox_token,
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>',
                id: 'mapbox.pirates',
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'MapBox.pirates');

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
    addLayerToLeft(i - 1, 'MapBox.high-contrast');

    new_layer = L.tileLayer(
        'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            {
                maxZoom: 22, // can be more
                attribution: osm_attribution + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'CartoDB Positron');

    new_layer = L.tileLayer(
        'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            {
                maxZoom: 22, // can be more
                attribution: osm_attribution + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'CartoDB Dark Matter');

    new_layer = L.tileLayer(
        'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
            {
                maxZoom: 22, // can be more
                attribution: osm_attribution + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'CartoDB Positron (no labels)');

    new_layer = L.tileLayer(
        'http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',
            {
                maxZoom: 22, // can be more
                attribution: osm_attribution + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'CartoDB Dark Matter (no labels)');

    new_layer = L.tileLayer(
        'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
            {
                maxZoom: 22, // can be more
                attribution: osm_attribution + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'CartoDB Positron Retina');

    new_layer = L.tileLayer(
        'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
            {
                maxZoom: 22, // can be more
                attribution: osm_attribution + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'CartoDB Dark Matter Retina');

    new_layer = L.tileLayer(
        'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png',
            {
                maxZoom: 22, // can be more
                attribution: osm_attribution + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'CartoDB Positron (no labels) Retina');

    new_layer = L.tileLayer(
        'http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}@2x.png',
            {
                maxZoom: 22, // can be more
                attribution: osm_attribution + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'CartoDB Dark Matter (no labels) Retina');

    new_layer = L.tileLayer(
        'https://cartocdn_{s}.global.ssl.fastly.net/base-antique/{z}/{x}/{y}.png',
            {
                maxZoom: 22, // can be more
                attribution: osm_attribution + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'CartoDB World Antique');

    new_layer = L.tileLayer(
        'https://cartocdn_{s}.global.ssl.fastly.net/base-eco/{z}/{x}/{y}.png',
            {
                maxZoom: 22, // can be more
                attribution: osm_attribution + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'CartoDB World Eco');

    new_layer = L.tileLayer(
        'https://cartocdn_{s}.global.ssl.fastly.net/base-midnight/{z}/{x}/{y}.png',
            {
                maxZoom: 22, // can be more
                attribution: osm_attribution + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'CartoDB World Flat Blue');

    new_layer = L.tileLayer(
        'https://cartocdn_{s}.global.ssl.fastly.net/base-antique/{z}/{x}/{y}.png',
            {
                maxZoom: 22, // can be more
                attribution: osm_attribution + 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'CartoDB World Midnight Commander');

    new_layer = L.tileLayer(
        'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png',
            {
                maxZoom: 20,
                attribution: osm_attribution + '<a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Stamen Toner');

    new_layer = L.tileLayer(
        'http://{s}.tile.stamen.com/toner-background/{z}/{x}/{y}.png',
            {
                maxZoom: 20,
                attribution: osm_attribution + '<a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Stamen Toner-background');

    new_layer = L.tileLayer(
        'http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png',
            {
                maxZoom: 20,
                attribution: osm_attribution + '<a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Stamen Toner-lite');

    new_layer = L.tileLayer(
        'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
            {
                maxZoom: 20,
                attribution: osm_attribution + '<a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>.'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Stamen Watercolor');

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
        'http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
            {
                maxZoom: 15,
                attribution: osm_attribution + '<a href="http://opentopomap.org/">OpenTopoMap</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'OpenTopoMap');

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
        'http://78.47.183.107/veloroad/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="http://osmz.ru/veloroad2.html">Ilya Zverev</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Veloroad 2');

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
        'http://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: osm_attribution + '<a href="http://öpnvkarte.de/">ÖPNV Karte</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'ÖPNV Karte');

    new_layer = L.tileLayer(
        'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>, under ODbL',
                subdomains: ['a', 'b']
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'OpenStreetMap black/white');

    new_layer = L.tileLayer(
        'http://www.openhistoricalmap.org/ohm_tiles/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: osm_attribution + '<a href="http://www.openhistoricalmap.org/">OpenHistoricalMap</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'OpenHistoricalMap');

    new_layer = L.tileLayer(
        'http://www.freietonne.de/osm/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: osm_attribution + '<a href="http://www.freietonne.de/">Freie Tonne</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'FT-Blue');

    new_layer = L.tileLayer(
        'https://www.komoot.de/tiles/{s}/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution: osm_attribution + '<a href="https://www.komoot.de/">Komoot</a>'
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, 'Komoot');

    new_layer = L.tileLayer(
        '',
            {
                maxZoom: 1,
                attribution: osm_attribution + ''
            }
        );
    i = layers.push(new_layer);
    addLayerToLeft(i - 1, '');

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

function showLayer(i) {
    if (i != current_layer_index) {
        if(current_layer_index != -1) {
            map.removeLayer(layers[current_layer_index]);
        }

        map.addLayer(layers[i]);
        current_layer_index = i;
    }
}