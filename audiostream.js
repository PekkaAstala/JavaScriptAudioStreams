function audioElementAnalyzer(audioElement) {
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let source = audioCtx.createMediaElementSource(audioElement);
    let analyser = audioCtx.createAnalyser();
    source.connect(analyser);
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.0;
    let bufferLength = analyser.frequencyBinCount;
    analyser.connect(audioCtx.destination);

    return function() {
        var dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);
        return dataArray
    }
}
