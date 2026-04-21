import React, { useEffect, useState} from 'react';
import MainMenu from './pages/MainMenu';
import GameScreen from './pages/GameScreen';
import ResultScreen from './pages/ResultScreen';
import bgMusic from './assets/acb.mp3';

function App() {
  const [currentScreen, setCurrentScreen] = useState('MAIN_MENU'); // MAIN_MENU, GAME, RESULT
  const [gameConfig, setGameConfig] = useState(null);
  const [gameResult, setGameResult] = useState(null);

  // Fungsi untuk memicu putaran musik pada interaksi pertama (untuk mengatasi blokir autoplay Chrome)
  useEffect(() => {
    const playAudio = () => {
      const audioEl = document.getElementById('bgm');
      if (audioEl) {
        audioEl.volume = 0.5;
        audioEl.play().catch(() => {});
      }
      window.removeEventListener('click', playAudio);
    };
    window.addEventListener('click', playAudio);
    return () => window.removeEventListener('click', playAudio);
  }, []);

  const startGame = (config) => {
    const audioEl = document.getElementById('bgm');
    if (audioEl) {
      audioEl.volume = 0.5;
      audioEl.play().catch(() => {});
    }
    setGameConfig(config);
    setCurrentScreen('GAME');
  };

  const endGame = (result) => {
    setGameResult(result);
    setCurrentScreen('RESULT');
  };

  const goToMainMenu = () => {
    const audioEl = document.getElementById('bgm');
    if (audioEl) {
      audioEl.volume = 0.5;
      audioEl.play().catch(() => {});
    }
    setCurrentScreen('MAIN_MENU');
    setGameConfig(null);
    setGameResult(null);
  };

  const replayGame = () => {
    const audioEl = document.getElementById('bgm');
    if (audioEl) {
      audioEl.volume = 0.5;
      audioEl.play().catch(() => {});
    }
    setGameResult(null);
    setCurrentScreen('GAME');
  };

  return (
    <div className="w-full max-w-[500px] md:max-w-4xl mx-auto h-full min-h-screen flex flex-col pt-4"> 
      <audio id="bgm" src={bgMusic} autoPlay loop />
      {currentScreen === 'MAIN_MENU' && <MainMenu onStart={startGame} />}
      {currentScreen === 'GAME' && <GameScreen config={gameConfig} onEnd={endGame} onCancel={goToMainMenu} />}
      {currentScreen === 'RESULT' && <ResultScreen result={gameResult} onPlayAgain={replayGame} />}
    </div>
  );
}

export default App;
