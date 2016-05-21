function data_export_loaded() {
    var layer_id = window.location.hash.replace('#', '');
    var layer_data;
    if (layer_id.substring(0,1) == '1') {
        layer_data = getLayerDataByID(layer_id)
    } else if (layer_id.substring(0,1) == '2') {
        layer_data = getOverlayDataByID(layer_id);
    }

    document.getElementById('layer_name').innerHTML = 'Layer name: ' + layer_data.name;
    showLayerData(layer_data);
}

function showLayerData(data) {
    layer_address = data.address.replace(mapbox_token, ' /*here your MapBox public token. If you haven\'t one, just <a href="https://www.mapbox.com/signup/?plan=starter">register</a> on MapBox for free*/');
    layer_attribution = data.attribution.replace(/</g, '&lt;').replace(/'>/g, '&gt;');
    var text;
    if (data.bing) {
        text = '<h2>For Leaflet</h2>Unable to export link, use <a href="https://github.com/shramov/leaflet-plugins/blob/master/layer/tile/Bing.js">https://github.com/shramov/leaflet-plugins/blob/master/layer/tile/Bing.js</a> instead';
        text = text + '<h2>For iD Editor</h2>Unable to export link, but Bing Imagery layer is already built in iD Editor';
        text = text + '<h2>For JOSM Editor</h2>Unable to export link, but Bing Imagery layer is already built in JOSM Editor';
        text = text + '<h2>For SAS.Planet</h2>Unable to export link, but Bing Imagery layer is already built in SAS.Planet';
    } else if (data.wms) {
        text = '<h2>For Leaflet</h2><pre>var layer = L.tileLayer.wms(<br>';
        text = text + '    \'' + layer_address + '\',<br>';
        text = text + '    {<br>';
        text = text + '        maxZoom: ' + data.maxZoom + ',<br>';
        text = text + '        attribution: \'' + layer_attribution + '\',<br>';
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
        text = text + '        attribution: \'' + layer_attribution + '\'';
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

        // for SAS.Planet
        var address_for_sas_planet = layer_address;
        if (address_for_sas_planet.search('{s}') != -1) {
            if (data.subdomains) {
                address_for_sas_planet = address_for_sas_planet.replace('{s}', data.subdomains[0]);
            } else {
                address_for_sas_planet = address_for_sas_planet.replace('{s}', 'a');
            }
        }

        x_index = address_for_sas_planet.indexOf('{x}');
        y_index = address_for_sas_planet.indexOf('{y}');
        z_index = address_for_sas_planet.indexOf('{z}');

        var first_variable;
        if (x_index < y_index && x_index < z_index) {
            first_variable = '{x}';
        } else if (y_index < x_index && y_index < z_index) {
            first_variable = '{y}';
        } else if (z_index < x_index && z_index < y_index) {
            first_variable = '{z}';
        }

        text = text + '<h2>For SAS.Planet</h2><h4>GetUrlScript.txt</h4><pre>begin<br>' + getGetURLBaseString(layer_address, data.subdomains) + getResultURLString(address_for_sas_planet, first_variable) + '<br>end.</pre>';
        text = text + '<h4>info.txt</h4><pre>' + data.attribution + '</pre>';
        text = text + '<h4>params.txt</h4><pre>[PARAMS]<br>pnum=0<br>GUID=';

        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', 'http://guid.setgetgo.com/get.php', true);
        xhttp.send();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                text = text + xhttp.responseText + '<br>';
                if (data.id >= 1000 && data.id < 2000) {
                    text = text + 'asLayer=0<br>';
                } else if (data.id >= 2000 & data.id < 3000) {
                    text = text + 'asLayer=1<br>';
                }

                text = text + 'name=' + data.name + '<br>';
                text = text + 'NameInCache=' + data.name.replace(' ', '_');
                if (data.rtn) {
                    text = text + '_rtn';
                }
                text = text + '<br>';
                text = text + getDefURLBaseString(address_for_sas_planet, first_variable) + '<br>';
                if (address_for_sas_planet.search('.jpg') == -1) {
                    if (data.id == 1002) {
                        text = text + 'ContentType=image/jpg<br>Ext=.png<br>';
                    } else {
                        text = text + 'ContentType=image/png<br>Ext=.png<br>';
                    }
                } else {
                    text = text + 'ContentType=image/jpg<br>Ext=.jpg<br>';
                }
                text = text + 'projection=1<br>sradiusa=6378137<br>sradiusb=6356752<br>separator=0<br>UseDwn=1<br>Sleep=0<br>DefHotKey=16463<br>PARENTSUBMENU=OSM<br>IteratorSubRectSize=8,8<br>';
                text = text + 'License=' + data.attribution;

                document.getElementById('layer_data').innerHTML = text;
            }
        };
    }

    document.getElementById('layer_data').innerHTML = text;
}

/* FOR SAS.PLANET */

function getDefURLBaseString(address, first_variable) {
    var defurlbase_string = 'DefURLBase=' + address.split(first_variable)[0];
    return defurlbase_string;
}

function getGetURLBaseString(address, subdomains) {
    if (address.search('{s}') != -1) {
        var subdomain_index = address.indexOf('{s}') + 1;
        var letter;
        var count;
        if (subdomains) {
            letter = subdomains[0];
            count = subdomains.length;
        } else {
            letter = 'a';
            count = 3;
        }

        var geturlbase_string = '  GetURLBase[' + subdomain_index + ']:=chr(ord(\''+ letter + '\')+random(' + count + '));<br>';
        return geturlbase_string;
    } else {
        return '';
    }
}

function getResultURLString(address, first_variable) {
    var resulturl = address.split(first_variable)[1];

    resulturl = resulturl.replace('{x}', '\'+inttostr(GetX)+\'');
    resulturl = resulturl.replace('{y}', '\'+inttostr(GetY)+\'');
    resulturl = resulturl.replace('{z}', '\'+inttostr(GetZ-1)+\'');

    if (first_variable == '{z}') {
        resulturl = 'inttostr(GetZ-1)+\'' + resulturl;
    } else if (first_variable == '{x}') {
        resulturl = 'inttostr(GetX)+\'' + resulturl;
    } else if (first_variable == '{y}') {
        resulturl = 'inttostr(GetY)+\'' + resulturl;
    }

    if (address.substring(address.length - 1) != '}') {
        resulturl = resulturl + '\';';
    } else {
        resulturl = resulturl.substring(0, resulturl.length - 2) + ';';
    }

    var resulturl_string = '  ResultURL:=GetURLBase+' + resulturl;
    return resulturl_string;
}
