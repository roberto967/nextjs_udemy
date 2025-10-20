import gravitationalBeep from '../assets/audio/gravitational_beep.mp3';

export function loadBeep() {
  const audio = new Audio(gravitationalBeep);
  audio.load();

  return () => {
    audio.currentTime = 0;

    audio.play().catch(() => {
      // play can fail if not triggered by user interaction
    });
  };
}
