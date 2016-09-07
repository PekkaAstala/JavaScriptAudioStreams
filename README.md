# JavaScriptAudioStreams
Audio visualizer based on WebGl, web audio api and RxJS.

Just trying out reactive programming, WebGl and Web Audio Api:
* Web audio analyser is connected to an audio source (in this case: audio element)
* Page contains a couple of input elements which are combined and transformed to a stream of config objects
* The analyser subscribes to config stream and alters parameters on the fly
* Output of the analyser is sent to a WebGL visualizer

Thus resulting in a crude visualizer that can be altered/modified on the fly.
