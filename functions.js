var map;
var left;
var language_selector;

var layers = [];
var current_layer_id = '';

var overlays = [];
var current_overlays_ids = [];

var new_layer;
var new_layer_options;

var hiding_filters_count = 0;
var headers_count = 0;

/* INITIALIZATION */

function loaded() {
    initializeElements();

    left.innerHTML = left.innerHTML + '<h2 class="header_big">Baselayers</h2>';
    initializeLayers();
    left.innerHTML = left.innerHTML + '<div class="padding_text" id="-100"><button type=button onclick="showLayer(-100)">Set gray background</button></div>';
    left.innerHTML = left.innerHTML + '<div class="padding_text" id="-101"><button type=button onclick="showLayer(-101)">Set black background</button></div>';

    left.innerHTML = left.innerHTML + '<h2 class="header_big">Overlays</h2>';
    initializeOverlays();
    left.innerHTML = left.innerHTML + '<div class="padding_text"><button type=button onclick="removeAllOverlays()">Remove all overlays</button></div>';

    registerPermalinkButton(map, document.getElementById('permalink'), 'http://edward17.github.io/LayersCollection/', setDefaultMap, showSavedLayers);
    map.on('move', saveMapPosition);
    
    initializeFilters();
}

function initializeElements() {
    map = L.map('map');
    left = document.getElementById('left');
    language_selector = document.getElementById('language_selector');
}

function initializeLayers() {
    for (var i = 0; i < layers_data.length; i++) {
        if (layers_data[i].header) {
            createHeader(layers_data[i].id, layers_data[i].name);
        } else {
            layers_data[i].index = layers.push(createLeafletLayer(layers_data[i])) - 1;
            left.innerHTML = left.innerHTML + '<div class="layer" id="' + layers_data[i].id + '" onclick="showLayer(' + layers_data[i].id + ')"> ' + layers_data[i].name + createAdditionalInformation(layers_data[i]) + '</div>';
        }
    }
}

function initializeOverlays() {
    for (var i = 0; i < overlays_data.length; i++) {
        if (overlays_data[i].header) {
            createHeader(overlays_data[i].id, overlays_data[i].name);
        } else {
            overlays_data[i].index = overlays.push(createLeafletLayer(overlays_data[i])) - 1;
            left.innerHTML = left.innerHTML + '<div><input id="' + overlays_data[i].id + '" type="checkbox" onchange="onOverlayChanged(' + overlays_data[i].id + ')"> ' + overlays_data[i].name + createAdditionalInformation(overlays_data[i]) + '</div>';
        }
    }
}

function initializeFilters() {
    if (localStorage.getItem('old_selector') != null) {
        document.getElementById('old_selector').checked = (localStorage.getItem('old_selector') == 'true');
        if (localStorage.getItem('old_selector') == 'false') {
            onOldCheckboxChanged();
        }
    } else {
        document.getElementById('old_selector').checked = true;
    }

    if (localStorage.getItem('ua_selector') != null) {
        document.getElementById('ua_selector').checked = (localStorage.getItem('ua_selector') == 'true');
        if (localStorage.getItem('ua_selector') == 'false') {
            onUACheckboxChanged();
        }
    } else {
        document.getElementById('ua_selector').checked = true;
    }

    document.getElementById('blackwhite_selector').checked = (localStorage.getItem('blackwhite_selector') == 'true');
    if (localStorage.getItem('blackwhite_selector') == 'true') {
        onBWCheckboxChanged();
    }

    document.getElementById('nolabels_selector').checked = (localStorage.getItem('nolabels_selector') == 'true');
    if (localStorage.getItem('nolabels_selector') == 'true') {
        onNLCheckboxChanged();
    }

    document.getElementById('retina_selector').checked = (localStorage.getItem('retina_selector') == 'true');
    if (localStorage.getItem('nolabels_selector') == 'true') {
        onRetinaCheckboxChanged();
    }

    if (localStorage.getItem('language_selector')) {
        document.getElementById('language_selector').value = localStorage.getItem('language_selector');
        if (localStorage.getItem('language_selector') != 'any') {
            onLanguageChanged();
        }
    }

    for (i = 0; i < headers_count; i++) {
        header_id = 3000 + i;
        if (localStorage.getItem('header_' + header_id)) {
            document.getElementById(header_id).checked = (localStorage.getItem('header_' + header_id) == 'true');
            if (localStorage.getItem('header_' + header_id) == 'false') {
                onHeaderChanged(header_id);
            }
        }
    }
}

/* LAYERS */

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
    if (data.retina) {
        additional_information = additional_information + '<span class="rtn">rtn</span>';
    }
    if (data.ua) {
        additional_information = additional_information + '<span class="ua">ua</span>';
    }
    if (data.blackwhite) {
        additional_information = additional_information + '<span class="bw">b/w</span>';
    }
    if (data.nolabels) {
        additional_information = additional_information + '<span class="nl">nl</span>';
    }
    if (data.language) {
        additional_information = additional_information + '<span class="lg">' + data.language + '</span>';
        
        if (language_selector.innerHTML.search('<option>' + data.language +'</option>') == -1) {
            language_selector.innerHTML = language_selector.innerHTML + '<option>' + data.language +'</option>';
        }
    }
    return additional_information;
}

function createHeader(id, name) {
    left.innerHTML = left.innerHTML + '<div class="padding_text"><input id="' + id + '" type="checkbox" checked="true" onchange="onHeaderChanged(' + id + ')"> <b>' + name + '</b></div>';
    headers_count = headers_count + 1;
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
        
        document.getElementById(id).className = document.getElementById(id).className.replace('layer', 'selected_layer');
        current_layer_id = id + '';
    }

    saveLayers();
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

    saveLayers();
}

function showOverlay(id) {
    map.addLayer(overlays[getOverlayDataByID(id).index]);
    overlays_data[getOverlayIndexByID(id)].index_shown = current_overlays_ids.push(id) - 1;
}

function removeAllOverlays() {
    if (current_overlays_ids.length > 0) {
        for (var i = 0; i < current_overlays_ids.length; i++) {
            map.removeLayer(overlays[getOverlayDataByID(current_overlays_ids[i]).index]);
            document.getElementById(current_overlays_ids[i]).checked = false;
        }
        current_overlays_ids = [];
        
        saveLayers();
    }
}

/* LAYERS - UTILS */

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

function getOverlayIndexByID(id) {
    return overlays_data.indexOf(getOverlayDataByID(id));
}

/* FILTERS */

function onOldCheckboxChanged() {
    localStorage.setItem('old_selector', document.getElementById('old_selector').checked);

    var left_layers = left.childNodes;
    if (document.getElementById('old_selector').checked) {
        for (var i = 0; i < left_layers.length; i++) {
            if (left_layers[i].innerHTML.search('class="old"') != -1) {
                left_layers[i].className = left_layers[i].className.replace(' old_hidden', '');
            }
        }
    } else {
        for (var i = 0; i < left_layers.length; i++) {
            if (left_layers[i].innerHTML.search('class="old"') != -1) {
                left_layers[i].className = left_layers[i].className + ' old_hidden';
            }
        }
    }
}

function onUACheckboxChanged() {
    localStorage.setItem('ua_selector', document.getElementById('ua_selector').checked);

    var left_layers = left.childNodes;
    if (document.getElementById('ua_selector').checked) {
        for (var i = 0; i < left_layers.length; i++) {
            if (left_layers[i].innerHTML.search('class="ua"') != -1) {
                left_layers[i].className = left_layers[i].className.replace(' ua_hidden', '');
            }
        }
    } else {
        for (var i = 0; i < left_layers.length; i++) {
            if (left_layers[i].innerHTML.search('class="ua"') != -1) {
                left_layers[i].className = left_layers[i].className + ' ua_hidden';
            }
        }
    }
}

function onBWCheckboxChanged() {
    localStorage.setItem('blackwhite_selector', document.getElementById('blackwhite_selector').checked);

    var left_layers = left.childNodes;
    if (document.getElementById('blackwhite_selector').checked) {
        increaseHidingFiltersCount();
        
        for (var i = 0; i < left_layers.length; i++) {
            if (left_layers[i].innerHTML.search('class="bw"') == -1 && left_layers[i].tagName != 'H2') {
                left_layers[i].className = left_layers[i].className + ' blackwhite_hidden';
            }
        }
    } else {
        decreaseHidingFiltersCount();
        
        for (var i = 0; i < left_layers.length; i++) {
            if (left_layers[i].innerHTML.search('class="bw"') == -1 && left_layers[i].tagName != 'H2') {
                left_layers[i].className = left_layers[i].className.replace(' blackwhite_hidden', '');
            }
        }
    }
}

function onNLCheckboxChanged() {
    localStorage.setItem('nolabels_selector', document.getElementById('nolabels_selector').checked);

    var left_layers = left.childNodes;
    if (document.getElementById('nolabels_selector').checked) {
        increaseHidingFiltersCount();
        
        for (var i = 0; i < left_layers.length; i++) {
            if (left_layers[i].innerHTML.search('class="nl"') == -1 && left_layers[i].tagName != 'H2') {
                left_layers[i].className = left_layers[i].className + ' nolabels_hidden';
            }
        }
    } else {
        decreaseHidingFiltersCount();
        
        for (var i = 0; i < left_layers.length; i++) {
            if (left_layers[i].innerHTML.search('class="nl"') == -1 && left_layers[i].tagName != 'H2') {
                left_layers[i].className = left_layers[i].className.replace(' nolabels_hidden', '');
            }
        }
    }
}

function onRetinaCheckboxChanged() {
    localStorage.setItem('retina_selector', document.getElementById('retina_selector').checked);

    var left_layers = left.childNodes;
    if (document.getElementById('retina_selector').checked) {
        increaseHidingFiltersCount();
        
        for (var i = 0; i < left_layers.length; i++) {
            if (left_layers[i].innerHTML.search('class="rtn"') == -1 && left_layers[i].tagName != 'H2') {
                left_layers[i].className = left_layers[i].className + ' retina_hidden';
            }
        }
    } else {
        decreaseHidingFiltersCount();
        
        for (var i = 0; i < left_layers.length; i++) {
            if (left_layers[i].innerHTML.search('class="rtn"') == -1 && left_layers[i].tagName != 'H2') {
                left_layers[i].className = left_layers[i].className.replace(' retina_hidden', '');
            }
        }
    }
}

function onLanguageChanged() {
    var language = language_selector.options[language_selector.selectedIndex].text;

    localStorage.setItem('language_selector', language);

    var left_layers = left.childNodes;
    if (language == 'any') {
        decreaseHidingFiltersCount();
        
        for (var i = 0; i < left_layers.length; i++) {
            left_layers[i].className = left_layers[i].className.replace(' language_hidden', '');
        }
    } else {
        increaseHidingFiltersCount();
        
        for (var i = 0; i < left_layers.length; i++) {
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

function onHeaderChanged(id) {
    localStorage.setItem('header_' + id, document.getElementById(id).checked);
    if (document.getElementById(id).checked) {
        var current_element = document.getElementById(id).parentNode.nextElementSibling;
        while (current_element.className.search('padding_text') == -1) {
            current_element.className = current_element.className.replace(' header_hidden', '');
            current_element = current_element.nextElementSibling;
        }
    } else {
        var current_element = document.getElementById(id).parentNode.nextElementSibling;
        while (current_element.className.search('padding_text') == -1) {
            current_element.className = current_element.className + ' header_hidden';
            current_element = current_element.nextElementSibling;
        }
    }
}

function increaseHidingFiltersCount() {
    hiding_filters_count = hiding_filters_count + 1;

    if (hiding_filters_count == 1) {
        var left_layers = left.childNodes;
        for (var i = 0; i < left_layers.length; i++) {
            left_layers[i].className = left_layers[i].className.replace('header_hidden', 'h_hidden');
        }
    }
}

function decreaseHidingFiltersCount() {
    hiding_filters_count = hiding_filters_count - 1;

    if (hiding_filters_count == 0) {
        var left_layers = left.childNodes;
        for (var i = 0; i < left_layers.length; i++) {
            left_layers[i].className = left_layers[i].className.replace('h_hidden', 'header_hidden');
        }
    }
}

/* SAVING SITE STATE*/

function saveMapPosition() {
    localStorage.setItem('zoom', map.getZoom());
    localStorage.setItem('lat', map.getCenter().lat);
    localStorage.setItem('lng', map.getCenter().lng);
}

function saveLayers() {
    if (current_overlays_ids.length > 0) {
        var layers_txt = current_layer_id;

        for (var i = 0; i < current_overlays_ids.length; i++) {
            layers_txt = layers_txt + ',' + current_overlays_ids[i];
        }
        
        onLayersUpdate(layers_txt);
        localStorage.setItem('layers', layers_txt);
    } else {
        onLayersUpdate(current_layer_id);
        localStorage.setItem('layers', current_layer_id);
    }
}

function setDefaultMap() {
    var zoom = localStorage.getItem('zoom');
    if (zoom != null) {
        map.setView(L.latLng(localStorage.getItem('lat'), localStorage.getItem('lng')), zoom);
        showSavedLayers(localStorage.getItem('layers'));
    } else {
        map.setView(L.latLng(49.373, 31.861), 10);
        showLayer('1000');
    }
}

function showSavedLayers(ids) {
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