export const say = (string) => {
  if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) return;
  speechSynthesis.speak(new SpeechSynthesisUtterance(string));
}
