function data_export_loaded() {
    var layer_id = parseInt(window.location.hash.replace('#', ''));
    var layer_data;
    if (layer_id >= 1000 && layer_id < 2000) {
        layer_data = getLayerDataByID(layer_id)
    } else if (layer_id >= 2000 & layer_id < 3000) {
        layer_data = getOverlayDataByID(layer_id);
    }

    document.getElementById('layer_name').innerHTML = 'Layer name: ' + layer_data.name;
    showLayerData(layer_data);
}

function showLayerData(data) {
    layer_address = data.address.replace(mapbox_token, ' /*here your MapBox public token. If you haven\'t one, just <a href="https://www.mapbox.com/signup/?plan=starter">register</a> on MapBox for free*/');
    var text;
    if (data.bing) {
        text = '<h2>For Leaflet</h2>Unable to export link, use <a href="https://github.com/shramov/leaflet-plugins/blob/master/layer/tile/Bing.js">https://github.com/shramov/leaflet-plugins/blob/master/layer/tile/Bing.js</a> instead';
        text = text + '<h2>For iD Editor</h2>Unable to export link, but Bing Imagery layer is already built in iD Editor';
        text = text + '<h2>For JOSM Editor</h2>Unable to export link, but Bing Imagery layer is already built in JOSM Editor';
    } else if (data.wms) {
        text = '<h2>For Leaflet</h2><pre>var layer = L.tileLayer.wms(<br>';
        text = text + '    \'' + layer_address + '\',<br>';
        text = text + '    {<br>';
        text = text + '        maxZoom: ' + data.maxZoom + ',<br>';
        text = text + '        attribution: \'' + data.attribution + '\',<br>';
        text = text + '        layers: [\'' + data.layers.join('\', \'') + '\']';
        if (data.minZoom) {
            text = text + ',<br>        minZoom: ' + data.minZoom;
        }
        if (data.format) {
            text = text + ',<br>        format: ' + data.format;
        }
        if (data.transparent) {
            text = text + ',<br>        transparent: ' + data.transparent;
        }
        if (data.opacity) {
            text = text + ',<br>        opacity: ' + data.opacity;
        }
        text = text + '<br>    }<br>';
        text = text + ');</pre>';

        text = text + '<h2>For iD Editor</h2>Unable to export link because this is WMS layer and iD Editor don\'t supports WMS layers';

        text = text + '<h2>For JOSM Editor</h2>WMS Layer<br>Address: ' + layer_address + '<br>Layers: ' + data.layers.join(', ');
        if (data.format) {
            text = text + '<br>Format: ' + data.format;
        }
    } else {
        text = '<h2>For Leaflet</h2><pre>var layer = L.tileLayer(<br>';
        text = text + '    \'' + layer_address + '\',<br>';
        text = text + '    {<br>';
        text = text + '        maxZoom: ' + data.maxZoom + ',<br>';
        text = text + '        attribution: \'' + data.attribution + '\'';
        if (data.tms) {
            text = text + ',<br>        tms: true';
        }
        if (data.subdomains) {
            text = text + ',<br>        subdomains: \'' + data.subdomains.join('') + '\'';
        }
        if (data.minZoom) {
            text = text + ',<br>        minZoom: ' + data.minZoom;
        }
        text = text + '<br>    }<br>';
        text = text + ');</pre>';

        text = text + '<h2>For iD Editor</h2>Address: ';
        if (layer_address.search('{s}') != -1) {
            if (data.subdomains) {
                text = text + layer_address.replace('{s}', data.subdomains[0]);
            } else {
                text = text + layer_address.replace('{s}', 'a');
            }
        } else {
            text = text + layer_address;
        }

        text = text + '<h2>For JOSM Editor</h2>TMS Layer<br>Address: ';
        var address_for_josm = layer_address.replace('{z}', '{zoom}');
        if (data.tms) {
            address_for_josm = address_for_josm.replace('{y}', '{-y}');
        }
        if (address_for_josm.search('{s}') != -1) {
            if (data.subdomains) {
                text = text + address_for_josm.replace('{s}', '{switch:' + data.subdomains.join(',') + '}');
            } else {
                text = text + address_for_josm.replace('{s}', '{switch:a,b,c}');
            }
        } else {
            text = text + address_for_josm;
        }
        text = text + '<br>Maximum Zoom: ' + data.maxZoom;
    }
    
    document.getElementById('layer_data').innerHTML = text;
}