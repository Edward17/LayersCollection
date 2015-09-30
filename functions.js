var map;
var left;

var layers = [];
var current_layer_id = '';

function loaded() {
    initializeElements();
    initializeLayers();

    registerPermalinkButton(map, document.getElementById('permalink'), 'http://edward17.github.io/LayersCollection/', setDefaultMap, showLayer);
}

function initializeElements() {
    map = L.map('map');
    left = document.getElementById('left');
}

function initializeLayers() {
    var new_layer;

    for (var i = 0; i < layers_data.length; i++) {
        if (layers_data[i].header) {
            left.innerHTML = left.innerHTML + '<b>' + layers_data[i].name + '</b><br>';
        } else {
            if (layers_data[i].bing) {
                new_layer = new L.BingLayer(
                    layers_data[i].address,
                    {
                        maxZoom: layers_data[i].maxZoom,
                        type: layers_data[i].type
                    }
                );
            } else if (layers_data[i].tms) {
                new_layer = L.tileLayer(
                        layers_data[i].address,
                    {
                        maxZoom: layers_data[i].maxZoom,
                        attribution: layers_data[i].attribution,
                        tms: true
                    }
                );
            } else if (layers_data[i].subdomains) {
                new_layer = L.tileLayer(
                    layers_data[i].address,
                    {
                        maxZoom: layers_data[i].maxZoom,
                        attribution: layers_data[i].attribution,
                        subdomains: layers_data[i].subdomains,
                    }
                );
            } else {
                new_layer = L.tileLayer(
                    layers_data[i].address,
                    {
                        maxZoom: layers_data[i].maxZoom,
                        attribution: layers_data[i].attribution,
                    }
                );
            }
            layers_data[i].index = layers.push(new_layer) - 1;
            left.innerHTML = left.innerHTML + '<button type="button" onclick="showLayer(' + layers_data[i].id + ')">Show</button> ' + layers_data[i].name;

            if (layers_data[i].old) {
                left.innerHTML = left.innerHTML + '<span class="old">old</span>';
            }
            if (layers_data[i].blackwhite) {
                left.innerHTML = left.innerHTML + '<span class="bw">b/w</span>';
            }
            if (layers_data[i].nolabels) {
                left.innerHTML = left.innerHTML + '<span class="nl">nl</span>';
            }
            if (layers_data[i].language) {
                left.innerHTML = left.innerHTML + '<span class="lang">' + layers_data[i].language + '</span>';
            }

            left.innerHTML = left.innerHTML + '<br>';
        }
    }
}

function getLayerDataByID(id) {
    var layer = layers_data.filter(function(layer_data) {
        return layer_data.id == id;
    });
    return layer[0];
}

function setDefaultMap() {
    map.setView(L.latLng(49.373, 31.861), 10);
    showLayer('1000');
}

function showLayer(id) {
    if (current_layer_id != id) {
        if(current_layer_id.length > 0) {
            map.removeLayer(layers[getLayerDataByID(current_layer_id).index]);
        }

        map.addLayer(layers[getLayerDataByID(id).index]);
        current_layer_id = id + '';
    }

    onLayersUpdate(id);
}