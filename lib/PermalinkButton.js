var map_fp;
var permalink_fp;
var _url;
var _layers;

function registerPermalinkButton(map, permalink_object_id, url, defaultMap, hashLayer) {
    map_fp = map;
    permalink_fp = document.getElementById(permalink_object_id);
    _url = url;

    map_fp.on('move', generatePermalink);

    var hash = window.location.hash.toString();
    if (hash.length > 0) {
        var data = [];

        if (hash.substring(0, 5) == '#map=') { 
            hash = hash.replace('#map=', '');
            data = hash.split('/');
            var lng_layer = data[2].split('&layers=');

            map_fp.setView(L.latLng(data[1], lng_layer[0]), data[0]);
            hashLayer(lng_layer[1]);
            _layers = lng_layer[1];
        } else if (hash.substring(0, 6) == '#zoom=') {
            hash = hash.replace('#zoom=', '');
            hash = hash.replace('lat=', '');
            hash = hash.replace('lon=', '');
            data = hash.split('&');
            map_fp.setView(L.latLng(data[1], data[2]), data[0]);
            hashLayer('');
        } else if (parseInt(hash.substring(1, 2)) < 10) {
            hash = hash.replace('#', '');
            data = hash.split('/');
            map_fp.setView(L.latLng(data[1], data[2]), data[0]);
            hashLayer('');
        } else {
            defaultMap();
        }
        
        generatePermalink('');
    } else {
        defaultMap();
    }
}

function onLayersUpdate(layers) {
    _layers = layers;
    generatePermalink('');
}

function generatePermalink(e) {
    var permalink_url = _url + '#map=' + map_fp.getZoom() + '/' + map_fp.getCenter().lat.toFixed(5) + '/' + map_fp.getCenter().lng.toFixed(5) + '&layers=' + _layers;
    permalink_fp.setAttribute('href', permalink_url);
}