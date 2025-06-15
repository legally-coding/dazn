let login;
let did;

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
let awesomestream = params?.stream;

if (awesomestream) startVideo();

function startVideo() {
    var url = awesomestream;
    window.daznKey = "?dazn-token="+awesomestream.split("dazn-token=")[1];
    var player = dashjs.MediaPlayer().create();
    player.initialize(document.querySelector("#videoPlayer"), url, true);
}

