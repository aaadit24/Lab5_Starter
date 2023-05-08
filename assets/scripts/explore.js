window.addEventListener('DOMContentLoaded', function() {
    var synth = window.speechSynthesis;
    var voice_select = document.querySelector("#voice-select");
    var button = document.querySelector("button");
    var text_to_speak = document.querySelector("#text_to_speak");
    var smilling = document.querySelector("img[src='./assets/images/smiling.png']");
    var open_mouth = document.querySelector("img[src='./assets/images/open-mouth.png']");
    var voices = [];
  
    function populateVoiceList() {
      voices = synth.getVoices();
      var voice_selectInnerHTML = '';
      for (var i = 0; i < voices.length; i++) {
        voice_selectInnerHTML += '<option value="' + voices[i].name + '">' + voices[i].name + ' (' + voices[i].lang + ')</option>';
      }
      voice_select.innerHTML = voice_selectInnerHTML;
    }
  
    populateVoiceList();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = populateVoiceList;
    }
  
    button.addEventListener("click", function() {
      if (synth.speaking || text_to_speak.value === "") {
        return;
      }
  
      var utterThis = new SpeechSynthesisUtterance(text_to_speak.value);
      for (var i = 0; i < voices.length; i++) {
        if (voices[i].name === voice_select.value) {
          utterThis.voice = voices[i];
          break;
        }
      }
      synth.speak(utterThis);
  
      smilling.style.display = "assets/images/smiling.png";
      open_mouth.style.display = "assets/images/open-mouth.png";
  
      utterThis.onend = function(event) {
        smilling.style.display = "assets/images/smiling.png";
        open_mouth.style.display = "assets/images/open-mouth.png";
      };
  
      utterThis.onerror = function(event) {
        console.error("SpeechSynthesisUtterance.onerror", event);
      };
    });
  });
  