function audioElementAnalyzer(audioElement, config) {

    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let source = audioCtx.createMediaElementSource(audioElement);
    let analyser = audioCtx.createAnalyser();
    source.connect(analyser);
    analyser.fftSize = Math.pow(2, 9);
    analyser.smoothingTimeConstant = 0.8;
    let bufferLength = analyser.frequencyBinCount;
    analyser.connect(audioCtx.destination);

    config.subscribe(x => {
        analyser.fftSize = Math.pow(2, x.precision);
        analyser.smoothingTimeConstant = x.smoothness;
        bufferLength = analyser.frequencyBinCount;
    });

    return function() {
        var dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);
        return dataArray
    }
}
