var currentInstrument;
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();


var channels = 1;
var frameCount = 4096;

var source = audioCtx.createBufferSource();

var scriptNode = audioCtx.createScriptProcessor(4096, 0, 1);

scriptNode.onaudioprocess = function(e) {
	var output = e.outputBuffer

	var outputdata = output.getChannelData(0)

	for (var i = 0; i < outputdata.length; i++) {
		yn = sampleAll(currentInstrument)
		outputdata[i] = yn
		ticAll(currentInstrument)
	}
}


function run() {
	var head = document.getElementsByTagName("h1")[0].innerText
	currentInstrument = Keytar
	source.connect(scriptNode);
  	scriptNode.connect(audioCtx.destination);
  	source.start();
}
// When the buffer source stops playing, disconnect everything
source.onended = function() {
  source.disconnect(scriptNode);
  scriptNode.disconnect(audioCtx.destination);
	source.connect(scriptNode);
  	scriptNode.connect(audioCtx.destination);
  	source.start();
}

window.onload = run