var _map;
var _permalink;
var _url;
var _layers;

function registerPermalinkButton(map, permalink, url, defaultMap, hashLayer) {
    _map = map;
    _permalink = permalink;
    _url = url;

    map.on('move', generatePermalinkP);

    if (window.location.hash.toString().length > 0) {
        var hash = new String(window.location.hash.toString());
        hash = hash.replace('#map=', '');
        var data = hash.split('/');
        var zoom = data[0];
        var lat = data[1];
        var lng_layer = data[2].split('&layers=');
        var lng = lng_layer[0];
        var layer = lng_layer[1];

        map.setView(L.latLng(lat, lng), zoom);
        hashLayer(layer);
    } else {
        defaultMap();
    }
}

function onLayersUpdate(layers) {
    _layers = layers;
    generatePermalinkP('');
}

function generatePermalinkP(e) {
    var permalink_url = _url + '#map=' + map.getZoom() + '/' + map.getCenter().lat + '/' + map.getCenter().lng + '&layers=' + _layers;
    permalink.setAttribute('href', permalink_url);
}