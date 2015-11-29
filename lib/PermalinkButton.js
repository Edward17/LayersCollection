var _map;
var _permalink;
var _url;
var _layers;

function registerPermalinkButton(map, permalink, url, defaultMap, hashLayer) {
    _map = map;
    _permalink = permalink;
    _url = url;

    map.on('move', generatePermalinkP);

    var hash = window.location.hash.toString();    
    if (hash.length > 0) {
        var data = [];

        if (hash.substring(0, 5) == '#map=') { 
            hash = hash.replace('#map=', '');
            data = hash.split('/');
            var lng_layer = data[2].split('&layers=');

            map.setView(L.latLng(data[1], lng_layer[0]), data[0]);
            hashLayer(lng_layer[1]);
        } else if (hash.substring(0, 6) == '#zoom=') {
            hash = hash.replace('#zoom=', '');
            hash = hash.replace('lat=', '');
            hash = hash.replace('lon=', '');
            data = hash.split('&');
            map.setView(L.latLng(data[1], data[2]), data[0]);
            hashLayer('');
        } else {
            defaultMap();
        }
    } else {
        defaultMap();
    }
}

function onLayersUpdate(layers) {
    _layers = layers;
    generatePermalinkP('');
}

function generatePermalinkP(e) {
    var permalink_url = _url + '#map=' + map.getZoom() + '/' + map.getCenter().lat.toFixed(5) + '/' + map.getCenter().lng.toFixed(5) + '&layers=' + _layers;
    permalink.setAttribute('href', permalink_url);
}