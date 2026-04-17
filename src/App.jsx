import React, { useEffect, useState} from 'react';
import MainMenu from './pages/MainMenu';
import GameScreen from './pages/GameScreen';
import ResultScreen from './pages/ResultScreen';
import bgMusic from './assets/acb.mp3';

const MobileScaler = ({ children }) => {
  const [scaleInfo, setScaleInfo] = useState({ isMobile: false, scale: 1, vHeight: 1000 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (width < 768) {
        const TARGET_WIDTH = 480;
        const calculateScale = width / TARGET_WIDTH;
        setScaleInfo({
          isMobile: true,
          scale: calculateScale,
          vHeight: height / calculateScale
        });
      } else {
        setScaleInfo({ isMobile: false, scale: 1, vHeight: height });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!scaleInfo.isMobile) return <>{children}</>;

  return (
    <div style={{ width: '100vw', minHeight: '100vh', overflow: 'hidden' }}>
      <div style={{
        width: '480px',
        minHeight: `${scaleInfo.vHeight}px`,
        transform: `scale(${scaleInfo.scale})`,
        transformOrigin: 'top left',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {children}
      </div>
    </div>
  );
};

function App() {
  const [currentScreen, setCurrentScreen] = useState('MAIN_MENU'); // MAIN_MENU, GAME, RESULT
  const [gameConfig, setGameConfig] = useState(null);
  const [gameResult, setGameResult] = useState(null);

  // Fungsi untuk memicu putaran musik pada interaksi pertama (untuk mengatasi blokir autoplay Chrome)
  useEffect(() => {
    const playAudio = () => {
      const audioEl = document.getElementById('bgm');
      if (audioEl) {
        audioEl.play().catch(() => {});
      }
      window.removeEventListener('click', playAudio);
    };
    window.addEventListener('click', playAudio);
    return () => window.removeEventListener('click', playAudio);
  }, []);

  const startGame = (config) => {
    setGameConfig(config);
    setCurrentScreen('GAME');
  };

  const endGame = (result) => {
    setGameResult(result);
    setCurrentScreen('RESULT');
  };

  const goToMainMenu = () => {
    setCurrentScreen('MAIN_MENU');
    setGameConfig(null);
    setGameResult(null);
  };

  const replayGame = () => {
    setGameResult(null);
    setCurrentScreen('GAME');
  };

  return (
    <MobileScaler>
      <div className="w-full max-w-4xl mx-auto h-full min-h-screen"> 
        <audio id="bgm" src={bgMusic} autoPlay loop />
        {currentScreen === 'MAIN_MENU' && <MainMenu onStart={startGame} />}
        {currentScreen === 'GAME' && <GameScreen config={gameConfig} onEnd={endGame} onCancel={goToMainMenu} />}
        {currentScreen === 'RESULT' && <ResultScreen result={gameResult} onPlayAgain={replayGame} />}
      </div>
    </MobileScaler>
  );
}

export default App;
