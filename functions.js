var map;
var left;
var language_selector;

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
    left.innerHTML = left.innerHTML + '<div class="padding_text" id="-100"><button type=button onclick="showLayer(-100)">Set gray background</button></div>';
    left.innerHTML = left.innerHTML + '<div class="padding_text" id="-101"><button type=button onclick="showLayer(-101)">Set black background</button></div>';

    left.innerHTML = left.innerHTML + '<h2 class="header_big">Overlays</h2>';
    initializeOverlays();
    left.innerHTML = left.innerHTML + '<div class="padding_text"><button type=button onclick="removeAllOverlays()">Remove all overlays</button></div>';

    registerPermalinkButton(map, document.getElementById('permalink'), 'http://edward17.github.io/LayersCollection/', setDefaultMap, showPermalinkLayers);
}

function initializeElements() {
    map = L.map('map');
    left = document.getElementById('left');
    language_selector = document.getElementById('language_selector');
}

function initializeLayers() {
    for (var i = 0; i < layers_data.length; i++) {
        if (layers_data[i].header) {
            left.innerHTML = left.innerHTML + '<div class="padding_text"><b>' + layers_data[i].name + '</b></div>';
        } else {
            layers_data[i].index = layers.push(createLeafletLayer(layers_data[i])) - 1;
            left.innerHTML = left.innerHTML + '<div' + createClassAttribute(layers_data[i], 'padding_text layer') + ' id="' + layers_data[i].id + '" onclick="showLayer(' + layers_data[i].id + ')"> ' + layers_data[i].name + createAdditionalInformation(layers_data[i]) + '</div>';
        }
    }
}

function initializeOverlays() {
    for (var i = 0; i < overlays_data.length; i++) {
        if (overlays_data[i].header) {
            left.innerHTML = left.innerHTML + '<div class="padding_text"><b>' + overlays_data[i].name + '</b></div>';
        } else {
            overlays_data[i].index = overlays.push(createLeafletLayer(overlays_data[i])) - 1;
            left.innerHTML = left.innerHTML + '<div' + createClassAttribute(overlays_data[i], '') + '><input id="' + overlays_data[i].id + '" type="checkbox" onchange="onOverlayChanged(' + overlays_data[i].id + ')"> ' + overlays_data[i].name + createAdditionalInformation(overlays_data[i]) + '</div>';
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
        additional_information = additional_information + '<span class="additional_information old">old</span>';
    }
    if (data.blackwhite) {
        additional_information = additional_information + '<span class="additional_information bw">b/w</span>';
    }
    if (data.nolabels) {
        additional_information = additional_information + '<span class="additional_information nl">nl</span>';
    }
    if (data.language) {
        additional_information = additional_information + '<span class="additional_information lang">' + data.language + '</span>';
        
        if (language_selector.innerHTML.search('<option>' + data.language +'</option>') == -1) {
            language_selector.innerHTML = language_selector.innerHTML + '<option>' + data.language +'</option>';
        }
    }
    return additional_information;
}

function createClassAttribute(data, class_name) {
    if (data.old) {
        class_name = class_name + ' old_hidden';
    }
    return ' class="' + class_name + '"';
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
        if (current_layer_id.length > 0) {
            if (current_layer_id.search('-') == -1) {
                map.removeLayer(layers[getLayerDataByID(current_layer_id).index]);
            }
            document.getElementById(current_layer_id).className = document.getElementById(current_layer_id).className.replace('selected_layer', 'layer');
        }

        if (id.toString().search('-') == -1)  {
            map.addLayer(layers[getLayerDataByID(id).index]);
            if (current_overlays_ids.length > 0) {
                layers[getLayerDataByID(id).index].bringToBack();
            }
        } else if (id == '-100') {
            document.getElementById('map').style.backgroundColor = 'rgb(221,221,221)';
        } else if (id == '-101') {
            document.getElementById('map').style.backgroundColor = 'rgb(0,0,0)';
        }
        
        document.getElementById(id).setAttribute('class', 'padding_text selected_layer');
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

function removeAllOverlays() {
    if (current_overlays_ids.length > 0) {
        for (var i = 0; i < current_overlays_ids.length; i++) {
            map.removeLayer(overlays[getOverlayDataByID(current_overlays_ids[i]).index]);
            document.getElementById(current_overlays_ids[i]).checked = false;
        }
        current_overlays_ids = [];
        
        updatePermalinkLayers();
    }
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

function onBWCheckboxChanged() {
    var left_layers = left.childNodes;
    for (var i = 0; i < left_layers.length; i++) {
        if (left_layers[i].innerHTML.search('class="additional_information bw"') == -1 && left_layers[i].tagName != 'H2') {
            if (document.getElementById('blackwhite_selector').checked) {
                left_layers[i].className = left_layers[i].className + ' blackwhite_hidden';
            } else {
                left_layers[i].className = left_layers[i].className.replace(' blackwhite_hidden', '');
            }
        }
    }
}

function onNLCheckboxChanged() {
    var left_layers = left.childNodes;
    for (var i = 0; i < left_layers.length; i++) {
        if (left_layers[i].innerHTML.search('class="additional_information nl"') == -1 && left_layers[i].tagName != 'H2') {
            if (document.getElementById('nolabels_selector').checked) {
                left_layers[i].className = left_layers[i].className + ' nolabels_hidden';
            } else {
                left_layers[i].className = left_layers[i].className.replace(' nolabels_hidden', '');
            }
        }
    }
}

function onOldCheckboxChanged() {
    var left_layers = left.childNodes;
    for (var i = 0; i < left_layers.length; i++) {
        if (left_layers[i].innerHTML.search('class="additional_information old"') != -1) {
            if (document.getElementById('old_selector').checked) {
                left_layers[i].className = left_layers[i].className.replace(' old_hidden', '');
            } else {
                left_layers[i].className = left_layers[i].className + ' old_hidden';
            }
        }
    }
}

function onLanguageChanged() {
    var language = language_selector.options[language_selector.selectedIndex].text;
    var left_layers = left.childNodes;
    for (var i = 0; i < left_layers.length; i++) {
        if (language == 'any') {
            left_layers[i].className = left_layers[i].className.replace(' language_hidden', '');
        } else {
            if (left_layers[i].className != 'header_big' && left_layers[i].innerHTML.search('>' + language + '<') == -1) {
                if (left_layers[i].className.search('language_hidden') == -1) {
                    left_layers[i].className = left_layers[i].className + ' language_hidden';
                }
            } else {
                left_layers[i].className = left_layers[i].className.replace(' language_hidden', '');
            }
        }
    }
}