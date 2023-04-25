const textarea = document.querySelector("textarea"),
    voiceList = document.querySelector("select"),
    speechBtn = document.querySelector("button");

let synth = speechSynthesis,
    isSpeaking = true;

voices();

function voices() {
  for (let voice of synth.getVoices()) {
    const selected = voice.name === "Google US English" ? "selected" : "";
    const option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option`;
    voiceList.insertAdjacentHTML("beforeend", option);
  }
}

speechBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (textarea.value !== "") {
    // Verificar se não está falando, fala o texto da área de texto
    if (!synth.speaking) {
      textToSpeech(textarea.value);
    }
    // Se o texto for longo, adicione a função Retomar e Pausar
    if (textarea.value.length > 80) {
      setInterval(() => {
        if (!synth.speaking && !isSpeaking) {
          isSpeaking = true;
          speechBtn.innerText = "Converter em Voz";
        } else {
        }
      }, 500);
      if (isSpeaking) {
        synth.resume();
        isSpeaking = false;
        speechBtn.innerText = "Pausar fala";
      } else {
        synth.pause();
        isSpeaking = true;
        speechBtn.innerText = "Rotomar fala";
      }
    } else {
      speechBtn.innerText = "Converter em Voz";
    }
  }
});
