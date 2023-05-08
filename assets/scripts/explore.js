// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const synth = window.speechSynthesis;
  let voices = [];

  function populateVoiceList() {
    voices = synth.getVoices();

    const voiceSelect = document.querySelector("#voice-select");
    voiceSelect.innerHTML = "";
    voices.forEach((voice) => {
      const option = document.createElement("option");
      option.textContent = voice.name + " (" + voice.lang + ")";
      option.value = voice.name;
      voiceSelect.appendChild(option);
    });
    voiceSelect.selectedIndex = 0;
  }

  populateVoiceList();
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoiceList;
  }

  const speakBtn = document.querySelector("button");
  const textToSpeak = document.querySelector("#text-to-speak");
  const smilingFace = document.querySelector("img[src='assets/images/smiling.png']");
  const openMouthFace = document.querySelector("img[src='assets/images/open-mouth.png']");

  speakBtn.addEventListener("click", () => {
    if (synth.speaking) {
      console.log("speechSynthesis.speaking");
      return;
    }
    if (textToSpeak.value !== "") {
      const utterThis = new SpeechSynthesisUtterance(textToSpeak.value);
      const selectedVoice = voices.find((voice) => voice.name === document.querySelector("#voice-select").value);
      utterThis.voice = selectedVoice;
      synth.speak(utterThis);

      smilingFace.style.display = "none";
      openMouthFace.style.display = "block";

      utterThis.onend = () => {
        console.log("SpeechSynthesisUtterance.onend");
        smilingFace.style.display = "block";
        openMouthFace.style.display = "none";
      };

      utterThis.onerror = (event) => {
        console.error("SpeechSynthesisUtterance.onerror", event);
      };
    }
  });
}
