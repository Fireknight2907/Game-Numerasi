import React, { useEffect } from 'react';
import { EnumModePermainan } from '../models/Enums';
import flash from '../assets/flash.png';
import kelinciImg from '../assets/kelinci.png';
import kuraKuraImg from '../assets/kura_kura.png';
import hooraySound from '../assets/hooray.mp3';
import { getAdminConfig } from '../utils/adminConfig';

function ResultScreen({ result, onPlayAgain }) {
  const { correctAnswers, totalQuestions, timeSpent, mode } = result;
  const adminConfig = getAdminConfig();

  useEffect(() => {
    const bgm = document.getElementById('bgm');
    if (bgm) bgm.pause();
  }, []);

  const isTimeAttack = mode === EnumModePermainan.TIMER;
  // Score formula
  const score = isTimeAttack 
    ? (totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0)
    : Math.round((correctAnswers / 20) * 100);

  // Determine Animal Speed Rating
  let animal = '';
  let imageFlash = '';
  let isCheetah = false;
  
  if (isTimeAttack) {
      if (correctAnswers >= 30) {
          animal = 'Flash'; 
          imageFlash = flash; 
          isCheetah = true;
      } else if (correctAnswers >= 15) {
          animal = 'Kelinci'; 
          imageFlash = kelinciImg;
      } else {
          animal = 'Kura - Kura'; 
          imageFlash = kuraKuraImg;
      }
  } else {
      const fastSec = adminConfig.timers?.RATING_FAST_SEC || 120;
      const mediumSec = adminConfig.timers?.RATING_MEDIUM_SEC || 240;

      if (timeSpent <= fastSec) {
          animal = 'Flash'; 
          imageFlash = flash; 
          isCheetah = true;
      } else if (timeSpent <= mediumSec) {
          animal = 'Kelinci'; 
          imageFlash = kelinciImg;
      } else {
          animal = 'Kura - Kura';
          imageFlash = kuraKuraImg;
      }
  }

  const formatTime = (t) => {
      const m = Math.floor(t / 60).toString().padStart(2, '0');
      const s = (t % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
  };

  const modeName = isTimeAttack ? 'BATAS WAKTU' : 'WAKTU TERCEPAT';

  const reloadGame = () => {
       window.location.reload();
  };

  return (
<div className="w-full min-h-screen flex flex-col relative">
  <audio src={hooraySound} autoPlay />
  <div className="fixed inset-0 bg-hore z-10 animate-win-down rotate-180"></div>
  <div className='absolute top-0 left-0 w-full h-full -z-10'></div>
  <div className="relative z-10 flex flex-col items-center pt-10 px-4">
      <h1 className="text-white text-xl sm:text-2xl md:text-3xl l:text-2xl font-black text-center mb-8 drop-shadow-md 
      tracking-widest leading-tight w-full max-w-3xl px-1 font-"
      >
        SELESAI!
      </h1>
      </div>

      <div className="w-full flex justify-center">
        <div className="bg-black text-white px-6 py-4 rounded-[35px] font-bold text-lg sm:text-3xl border-4 border-[#333] flex items-center justify-center gap-4 shadow-2xl -mb-2 z-10"> 
          <span className="uppercase whitespace-nowrap">{modeName}</span>
          <span className="text-white opacity-50">|</span>
          <span className="flex items-center gap-2">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 mr-2 inline-block object-contain"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {formatTime(timeSpent)}
          </span>
        </div>
      </div>

      <div className="flex flex-col w-full max-w-5xl justify-center items-center gap-6 sm:gap-8 relative -mb-13 px-4 pt-6">
        
        <div className="bg-black text-white px-6 py-4 rounded-[35px] font-bold text-lg sm:text-3xl border-4 border-[#333] flex items-center justify-center gap-4 shadow-2xl w-auto z-10 mb-2"> 
          <span className="uppercase whitespace-nowrap text-[#c5d636]">✔ BENAR: {correctAnswers}</span>
          <span className="text-white opacity-50">|</span>
          <span className="uppercase whitespace-nowrap text-[#ff5252]">✖ SALAH: {Math.max(0, totalQuestions - correctAnswers)}</span>
        </div>

        <div className="flex text-white px-8 py-2 sm:px-12 items-center justify-center tracking-widest z-10">
          <span className="text-xl sm:text-4xl font-black mr-4 items-center font-sans"
          style={{ textShadow: `-4px -2px 0 black, 2px -2px 0 black, -2px  2px 0 black, 2px  2px 0 black` }}>
            SKOR =
          </span>
          <span className="text-3xl sm:text-4xl font-black text-[#d1dc3e] font-sans">
            {score}
          </span>
        </div>

        {/* Avatar Section */}
        {!isTimeAttack && (
          <div className="flex flex-col relative md:absolute items-center justify-center z-10 mt-4 md:mt-90 md:-right-40">
            <div className={`flex flex-col items-center justify-center transition-transform duration-500 hover:scale-110 
              ${animal === 'Flash' ? 'animate-bounce' : 
                animal === 'Kelinci' ? 'animate-[bounce_2s_infinite]' : 
                'animate-[pulse_3s_ease-in-out_infinite]'}`}>
              <img
              src={imageFlash}
              alt={animal}
              className="w-24 sm:w-40 md:w-48 drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] mb-2"/>
              <span className={`font-black tracking-widest text-3xl sm:text-5xl uppercase ${isCheetah ? 'text-yellow-400' : 'text-white'}`}
                style={{
                  textShadow: `
                    -3px -3px 0 black,
                    3px -3px 0 black,
                    -3px  3px 0 black,
                    3px  3px 0 black,
                    0px 6px 0px rgba(0,0,0,0.5)
                  `
                }}>
                {animal}
              </span>
              {isCheetah && (
                <div className="mt-6 bg-[#c5d636] border-4 border-black px-4 py-2 rounded-xl transform -rotate-3 animate-pulse">
                  <span className="text-black font-black text-xl sm:text-2xl tracking-widest uppercase">
                    SANGAT CEPAT!
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto mt-10 md:mt-40 z-10 px-4">
        <button
          onClick={reloadGame}
          className="btn-pixel btn-yellow w-full md:w-48 py-3 text-2xl sm:text-3xl font-extrabold! h-16 sm:h-18 text-black tracking-widest shadow-[0_6px_0_#9da924] bg-[#c5d636] border-2 border-black hover:translate-y-1 transition-all"
          style={{ textShadow: "none" }}
        >
          SELESAI
        </button>
        <button
          onClick={onPlayAgain}
          className="btn-pixel btn-yellow w-full md:w-55 py-5 text-3xl sm:text-4xl text-black font-extrabold! tracking-widest shadow-[0_6px_0_#9da924] bg-[#c5d636] border-2 border-black"
          style={{ textShadow: "none" }}
        >
          MULAI LAGI
        </button>
      </div>
      
    </div>
  );
}

export default ResultScreen;
