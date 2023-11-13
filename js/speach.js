let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.getElementById('voiceSelect')


function loadVoices() {
    voices = window.speechSynthesis.getVoices();
}

window.speechSynthesis.onvoiceschanged = loadVoices


function setVoice(id) {
    loadVoices()

    var voiceSelected = voices[id];
    speech.voice = voiceSelected;
}

setVoice(4)

voiceSelect.addEventListener('change',()=>{
    window.speechSynthesis.cancel()
    setVoice(voiceSelect.value)
})

function say(texto) {
    speech.text = ReturnData()[texto].response.replaceAll("/n", " ")
    window.speechSynthesis.speak(speech);
}
