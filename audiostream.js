function audioElementAnalyzer(audioElement, presicion, smoothness) {
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let source = audioCtx.createMediaElementSource(audioElement);
    let analyser = audioCtx.createAnalyser();
    source.connect(analyser);
    analyser.fftSize = Math.pow(2, precision);
    analyser.smoothingTimeConstant = smoothness;
    let bufferLength = analyser.frequencyBinCount;
    analyser.connect(audioCtx.destination);

    return function() {
        var dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);
        return dataArray
    }
}
