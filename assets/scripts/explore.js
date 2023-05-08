window.addEventListener('DOMContentLoaded', function() {
    var synth = window.speechSynthesis;
    var voiceSelect = document.querySelector("#voice-select");
    var speakBtn = document.querySelector("button");
    var textToSpeak = document.querySelector("#text-to-speak");
    var smilingFace = document.querySelector("img[src='assets/images/smiling.png']");
    var openMouthFace = document.querySelector("img[src='assets/images/open-mouth.png']");
    var voices = [];
  
    function populateVoiceList() {
      voices = synth.getVoices();
      var voiceSelectInnerHTML = '';
      for (var i = 0; i < voices.length; i++) {
        voiceSelectInnerHTML += '<option value="' + voices[i].name + '">' + voices[i].name + ' (' + voices[i].lang + ')</option>';
      }
      voiceSelect.innerHTML = voiceSelectInnerHTML;
    }
  
    populateVoiceList();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = populateVoiceList;
    }
  
    speakBtn.addEventListener("click", function() {
      if (synth.speaking || textToSpeak.value === "") {
        return;
      }
  
      var utterThis = new SpeechSynthesisUtterance(textToSpeak.value);
      for (var i = 0; i < voices.length; i++) {
        if (voices[i].name === voiceSelect.value) {
          utterThis.voice = voices[i];
          break;
        }
      }
      synth.speak(utterThis);
  
      smilingFace.style.display = "none";
      openMouthFace.style.display = "block";
  
      utterThis.onend = function(event) {
        smilingFace.style.display = "block";
        openMouthFace.style.display = "none";
      };
  
      utterThis.onerror = function(event) {
        console.error("SpeechSynthesisUtterance.onerror", event);
      };
    });
  });
  