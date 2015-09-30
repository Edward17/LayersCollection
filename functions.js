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
            left.innerHTML = left.innerHTML + '<div><b>' + layers_data[i].name + '</b></div>';
        } else {
            if (layers_data[i].bing) {
                new_layer = new L.BingLayer(
                    layers_data[i].address,
                    {
                        maxZoom: layers_data[i].maxZoom,
                        type: layers_data[i].type
                    }
                );
            } else {
                options = {
                    maxZoom: layers_data[i].maxZoom,
                    attribution: layers_data[i].attribution
                };

                if (layers_data[i].tms) {
                    options.tms = true;
                }
                if (layers_data[i].subdomains) {
                    options.subdomains = layers_data[i].subdomains;
                }
                if (layers_data[i].minZoom) {
                    options.minZoom = layers_data[i].minZoom;
                }

                new_layer = L.tileLayer(layers_data[i].address,options);
            }

            var additional_information = '';
            if (layers_data[i].old) {
                additional_information = additional_information + '<span class="old">old</span>';
            }
            if (layers_data[i].blackwhite) {
                additional_information = additional_information + '<span class="bw">b/w</span>';
            }
            if (layers_data[i].nolabels) {
                additional_information = additional_information + '<span class="nl">nl</span>';
            }
            if (layers_data[i].language) {
                additional_information = additional_information + '<span class="lang">' + layers_data[i].language + '</span>';
            }

            layers_data[i].index = layers.push(new_layer) - 1;
            left.innerHTML = left.innerHTML + '<div id="' + layers_data[i].id + '"><button type="button" onclick="showLayer(' + layers_data[i].id + ')">Show</button> ' + layers_data[i].name + additional_information + '</div>';
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
            document.getElementById(current_layer_id).removeAttribute('class');
        }

        map.addLayer(layers[getLayerDataByID(id).index]);
        document.getElementById(id).setAttribute('class', 'selected_layer');
        current_layer_id = id + '';
    }

    onLayersUpdate(id);
}