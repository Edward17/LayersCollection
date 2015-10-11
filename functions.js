var map;
var left;

var layers = [];
var current_layer_id = '';

var overlays = [];
var current_overlays_ids = [];

var new_layer;
var new_layer_options;

function loaded() {
    initializeElements();

    left.innerHTML = left.innerHTML + '<h2 class="header_big">Baselayers</h2>';
    initializeLayers();
    left.innerHTML = left.innerHTML + '<h2 class="header_big">Overlays</h2>';
    initializeOverlays();

    registerPermalinkButton(map, document.getElementById('permalink'), 'http://edward17.github.io/LayersCollection/', setDefaultMap, showPermalinkLayers);
}

function initializeElements() {
    map = L.map('map');
    left = document.getElementById('left');
}

function initializeLayers() {
    for (var i = 0; i < layers_data.length; i++) {
        if (layers_data[i].header) {
            left.innerHTML = left.innerHTML + '<div class="header"><b>' + layers_data[i].name + '</b></div>';
        } else {
            layers_data[i].index = layers.push(createLeafletLayer(layers_data[i])) - 1;
            left.innerHTML = left.innerHTML + '<div class="layer" id="' + layers_data[i].id + '" onclick="showLayer(' + layers_data[i].id + ')"> ' + layers_data[i].name + createAdditionalInformation(layers_data[i]) + '</div>';
        }
    }
}

function initializeOverlays() {
    for (var i = 0; i < overlays_data.length; i++) {
        if (overlays_data[i].header) {
            left.innerHTML = left.innerHTML + '<div class="header"><b>' + overlays_data[i].name + '</b></div>';
        } else {
            overlays_data[i].index = overlays.push(createLeafletLayer(overlays_data[i])) - 1;
            left.innerHTML = left.innerHTML + '<div><input id="' + overlays_data[i].id + '" type="checkbox" onchange="onOverlayChanged(' + overlays_data[i].id + ')"> ' + overlays_data[i].name + createAdditionalInformation(overlays_data[i]) + '</div>';
        }
    }
}

function createLeafletLayer(data) {
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
            attribution: data.attribution,
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
            attribution: data.attribution
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

function createAdditionalInformation(data) {
    var additional_information = '';
    if (data.old) {
        additional_information = additional_information + '<span class="old">old</span>';
    }
    if (data.blackwhite) {
        additional_information = additional_information + '<span class="bw">b/w</span>';
    }
    if (data.nolabels) {
        additional_information = additional_information + '<span class="nl">nl</span>';
    }
    if (data.language) {
        additional_information = additional_information + '<span class="lang">' + data.language + '</span>';
    }
    return additional_information;
}

function setDefaultMap() {
    map.setView(L.latLng(49.373, 31.861), 10);
    showLayer('1000');
}

function showPermalinkLayers(ids) {
    if (ids) {
        if (ids.length == 4) {
            showLayer(ids);
        } else {
            showLayer(ids.substring(0, 4));

            var over = ids.substring(5).split(',');
            for (var i = 0; i < over.length; i++) {
                showOverlay(over[i]);
                document.getElementById(over[i]).setAttribute('checked', 'true');
            }
        }
    } else {
        showLayer('1000');
    }
}

function showLayer(id) {
    if (current_layer_id != id) {
        if(current_layer_id.length > 0) {
            map.removeLayer(layers[getLayerDataByID(current_layer_id).index]);
            document.getElementById(current_layer_id).setAttribute('class', 'layer');
        }

        map.addLayer(layers[getLayerDataByID(id).index]);
        if (current_overlays_ids.length > 0) {
            layers[getLayerDataByID(id).index].bringToBack();
        }
        
        document.getElementById(id).setAttribute('class', 'selected_layer');
        current_layer_id = id + '';
    }

    updatePermalinkLayers();
}

function onOverlayChanged(id) {
    if (document.getElementById(id).checked) {
        showOverlay(id);
    } else {
        map.removeLayer(overlays[getOverlayDataByID(id).index]);
        current_overlays_ids.splice(getOverlayDataByID(id).index_shown, 1);
        
        if (current_overlays_ids.length > 0) {
            for (var i = 0; i < current_overlays_ids.length; i++) {
                overlays_data[getOverlayIndexByID(current_overlays_ids[i])].index_shown = i;
            }
        }
    }

    updatePermalinkLayers();
}

function showOverlay(id) {
    map.addLayer(overlays[getOverlayDataByID(id).index]);
    overlays_data[getOverlayIndexByID(id)].index_shown = current_overlays_ids.push(id) - 1;
}

function updatePermalinkLayers() {
    if (current_overlays_ids.length > 0) {
        var layers_txt = current_layer_id;

        for (var i = 0; i < current_overlays_ids.length; i++) {
            layers_txt = layers_txt + ',' + current_overlays_ids[i];
        }
        
        onLayersUpdate(layers_txt);
    } else {
        onLayersUpdate(current_layer_id);
    }
}

function getLayerDataByID(id) {
    var layer = layers_data.filter(function(layer_data) {
        return layer_data.id == id;
    });
    return layer[0];
}

function getOverlayDataByID(id) {
    var overlay = overlays_data.filter(function(overlay_data) {
        return overlay_data.id == id;
    });
    return overlay[0];
}

function getOverlayIndexByID(id) {
    return overlays_data.indexOf(getOverlayDataByID(id));
}