function streamFromAudioElement(audioElement, interval) {
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let source = audioCtx.createMediaElementSource(audioElement);
    let analyser = audioCtx.createAnalyser();
    source.connect(analyser);
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.0;
    let bufferLength = analyser.frequencyBinCount;
    analyser.connect(audioCtx.destination);

    let intervalStream = Rx.Observable.interval(interval);

    let subject = new Rx.Subject();
    intervalStream.subscribe(function() {
        var dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);
        subject.next(dataArray);
    });

    return subject;
}
