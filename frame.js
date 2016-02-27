var frame_map;

function frame_loaded() {
    frame_map = L.map('frame_map', {
        zoomControl: false
    });

    var hash = window.location.hash.toString().replace('#map=', '');

    var data = hash.split('/');
    var lng_layer = data[2].split('&layers=');
    frame_map.setView(L.latLng(data[1], lng_layer[0]), data[0]);
    showLayers(lng_layer[1]);
}

function showLayers(ids) {
    if (ids.length == 4) {
        showLayer(ids);
    } else {
        showLayer(ids.substring(0, 4));

        var overlay_ids = ids.substring(5).split(',');
        for (var i = 0; i < overlay_ids.length; i++) {
            showOverlay(overlay_ids[i]);
        }
    }
}

function showLayer(id) {
    if (id.toString().search('-') == -1)  {
        frame_map.addLayer(createLeafletLayer(getLayerDataByID(id)));
    } else if (id == '-100') {
        document.getElementById('frame_map').style.backgroundColor = 'rgb(221,221,221)';
    } else if (id == '-101') {
        document.getElementById('frame_map').style.backgroundColor = 'rgb(0,0,0)';
    }
}

function showOverlay(id) {
    frame_map.addLayer(createLeafletLayer(getOverlayDataByID(id)));
}

/* LAYERS - UTILS */

function createLeafletLayer(data) {
    var layer_attribution = shortenAttribution(data.attribution);
    if (data.bing) {
        new_layer = new L.BingLayer(
            data.address,
            {
                maxZoom: data.maxZoom,
                type: data.type
            }
        );
    } else if (data.wms) {
        new_layer_options = {
            maxZoom: data.maxZoom,
            attribution: layer_attribution, //data.attribution,
            layers: data.layers
        };
        if (data.minZoom) {
            new_layer_options.minZoom = data.minZoom;
        }
        if (data.format) {
            new_layer_options.format = data.format;
        }
        if (data.transparent) {
            new_layer_options.transparent = data.transparent;
        }
        if (data.opacity) {
            new_layer_options.opacity = data.opacity;
        }
        
        new_layer = L.tileLayer.wms(data.address, new_layer_options);
    } else {
        new_layer_options = {
            maxZoom: data.maxZoom,
            attribution: layer_attribution, //data.attribution
        };
        if (data.tms) {
            new_layer_options.tms = true;
        }
        if (data.subdomains) {
            new_layer_options.subdomains = data.subdomains;
        }
        if (data.minZoom) {
            new_layer_options.minZoom = data.minZoom;
        }

        new_layer = L.tileLayer(data.address, new_layer_options);
    }
    return new_layer;
}

function shortenAttribution(attribution) {
    var short_attribution = attribution.replace(openstreetmap_attribution, 'Data &copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OSM</a>');
    short_attribution = short_attribution.replace(traces_attribution, 'Traces &copy; <a href="http://www.openstreetmap.org/traces" target="_blank">OSM</a>');
    short_attribution = short_attribution.replace(cartodb_attribution, 'Tiles &copy; <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>');
    short_attribution = short_attribution.replace(stamen_attribution, 'Tiles &copy; <a href="http://stamen.com">Stamen Design</a>');
    return short_attribution;
}

function getLayerDataByID(id) {
    for (i = 0; i < layers_data.length; i++) {
        if (layers_data[i].id == id) {
            return layers_data[i];
        }
    }
    return null;
}

function getOverlayDataByID(id) {
    for (i = 0; i < overlays_data.length; i++) {
        if (overlays_data[i].id == id) {
            return overlays_data[i];
        }
    }
    return null;
}