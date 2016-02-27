function frame_export_loaded() {
    var src = 'http://edward17.github.io/LayersCollection/frame.html' + window.location.hash;
    document.getElementById('frame_code').innerHTML = '&ltiframe src="'+ src + '" style="height: 300px; width: 400px; border-width: 0px;"&gt;&lt/iframe&gt;'
    document.getElementById('example_frame').setAttribute('src', src);
}