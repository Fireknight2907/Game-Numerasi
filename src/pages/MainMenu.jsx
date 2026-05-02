import React, { useState, useEffect } from 'react';
import { EnumModePermainan, EnumOperasi } from '../models/Enums';
import { KONFIGURASI_KELAS } from '../utils/levelConfig';
import logoDela from '../assets/logoDela.png';
import logoSD from '../assets/logoSD.png';
import mikir from '../assets/mikir.png';
import P1 from '../assets/P1.png';
import P2 from '../assets/P2.png';
import P3 from '../assets/P3.png';
import P4 from '../assets/P4.png'
import { motion, AnimatePresence } from "framer-motion";
import { ambilKonfigurasiAdmin, simpanKonfigurasiAdmin } from '../utils/adminConfig';

function MainMenu({ onStart }) {
  const [screen, setScreen] = useState('HOME');
  const [history, setHistory] = useState(['HOME']);

  useEffect(() => {
    const bgm = document.getElementById('bgm');
    if (bgm) bgm.play().catch(e => console.log('Audio warn:', e));
  }, []);

  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [mode, setMode] = useState(null);

  const [adminUname, setAdminUname] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [adminError, setAdminError] = useState('');
  const [adminCfg, setAdminCfg] = useState(ambilKonfigurasiAdmin());
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const bgm = document.getElementById('bgm');
    if (bgm) {
      setIsMuted(bgm.muted);
    }
  }, []);

  const toggleMute = () => {
    const bgm = document.getElementById('bgm');
    if (bgm) {
      bgm.muted = !bgm.muted;
      setIsMuted(bgm.muted);
    }
  };

  const handleAdminLogin = () => {
    if (adminUname === 'admin' && adminPass === 'SDN88MANADO') {
      setAdminError('');
      setAdminUname('');
      setAdminPass('');
      // Reload config just in case
      setAdminCfg(ambilKonfigurasiAdmin());
      navigateTo('ADMIN_PANEL');
    } else {
      setAdminError('Username atau password salah!');
    }
  };

  const handleAdminSave = () => {
    simpanKonfigurasiAdmin(adminCfg);
    navigateTo('HOME');
  };

  const isFormComplete = selectedClass !== null && selectedTopics.length > 0 && mode != null;

  const isClassSelected = selectedClass !== null;
  const isTopicSelected = selectedTopics.length > 0;
  const isModeSelected = mode !== null;


  const handleStart = () => {
    if (!isFormComplete) return;

    onStart({
      selectedClass,
      selectedTopics,
      mode
    });
  };

  const titleMap = {
    CLASS_SELECT: 'PILIH KELAS',
    TOPIC_SELECT: 'PILIH MATERI',
    MODE_SELECT: 'PILIH MODE',
    ADMIN_LOGIN: 'ADMIN LOGIN',
    ADMIN_PANEL: 'PENGATURAN'
  };

  const navigateTo = (nextScreen) => {
    setHistory(prev => [...prev, nextScreen]);
    setScreen(nextScreen);
  }

  const goBack = () => {
    setHistory(prev => {
      if (prev.length <= 1) return prev;

      const newHistory = [...prev];
      newHistory.pop();
      const prevScreen = newHistory[newHistory.length - 1];

      setScreen(prevScreen);
      return newHistory;
    });
  };

  const handleClassSelect = (c) => {
    setSelectedClass(c);
    setSelectedTopics([]);
  };

  const toggleTopic = (t) => {
    setSelectedTopics(prev => {
      if (prev.includes(t)) {
        if (prev.length === 1) return prev;
        return prev.filter(x => x !== t);
      } else {
        return [...prev, t];
      }
    });
  };


  const HeaderBack = () => (
    <div className="fixed top-4 left-4 z-20">
      <button
        onClick={goBack}
        className="bg-gray-900 w-10 h-10 sm:w-12 sm:h-12 flex items-center 
        justify-center rounded-lg font-bold text-xl shadow-md shadow-yellow-300 transition-all duration-300
        hover:shadow-lg hover:shadow-white/90"
      >
        &#10094;
      </button>
    </div>
  );

  const TitleBlock = ({ showSubtitle = true }) => (
    <div className="text-center px-4 mb-4">
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-widest 
      whitespace-normal sm:whitespace-nowrap mt-2 sm:mt-4 text-shadow-lg text-shadow-black">
        PERMAINAN NUMERASI
      </h1>
      {showSubtitle && (
        <p className="text-base sm:text-xl md:text-3xl mt-2 tracking-widest">
          SDN 88 MANADO
        </p>
      )}
    </div>
  );

  const backMap = {
    SPLASH: 'HOME',
    CLASS_SELECT: 'SPLASH',
    TOPIC_SELECT: 'SPLASH',
    MODE_SELECT: 'SPLASH',
    INSTRUCTIONS: 'HOME',
    ADMIN_LOGIN: 'HOME',
    ADMIN_PANEL: 'HOME'
  };

  return (
    <div className="w-full max-w-4xl flex flex-col items-center justify-between min-h-screen fit-screen">

      {screen !== 'HOME' && <HeaderBack />}

      {/* ================= SPLASH ================= */}
      {screen === 'HOME' && (
        <motion.div
          key="splash"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl flex flex-col items-center justify-between h-full"
        >
          <div className="w-full max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl flex flex-col items-center justify-between h-full">

            {/* LOGO */}
            <div className="flex justify-between items-center w-full px-4 sm:px-12 mt-5">
              <img src={logoDela} className="w-16 sm:w-20 md:w-22 lg:w-30 object-contain" />
              <img src={logoSD} className="w-20 sm:w-24 md:w-32 lg:w-40 object-contain" />
            </div>

            {/* TITLE */}
            <div className="mt-8 sm:mt-10 w-full">
              <TitleBlock />
            </div>

            {/* CONTENT */}
            <div className="flex flex-col items-center gap-4 w-full mt-24 mb-10 px-4">

              <div className="relative w-[80%] sm:w-3/4 md:w-1/2 lg:w-1/3">
                <img
                  src={mikir}
                  className="absolute w-24 sm:w-32 -top-16 sm:-top-20 -left-10 sm:-left-16 drop-shadow-xl z-0"
                />
                <button
                  onClick={() => navigateTo('SPLASH')}
                  className="relative z-10 w-full py-3 md:py-4 text-lg md:text-3xl rounded-xl bg-gray-300
                  text-black font-bold transition duration-350 hover:shadow-lg hover:-translate-y-1 shadow-white"
                >
                  MULAI
                </button>
              </div>

              <button
                onClick={() => navigateTo('INSTRUCTIONS')}
                className="w-full max-w-md py-3 md:py-4 text-lg md:text-3xl rounded-xl bg-gray-300
              text-black font-bold transition duration-350 hover:shadow-lg hover:-translate-y-1 shadow-white"
              >
                PETUNJUK BERMAIN
              </button>


              <p className="text-lg text-center mt-4 glow-text">
                Ayo latih kemampuan berhitungmu!
              </p>
            </div>

            <button onClick={() => navigateTo('ADMIN_LOGIN')} className="fixed bottom-10 right-4 sm:bottom-4 sm:right-4 text-gray-500 bg-white/30 sm:bg-transparent rounded-full p-2 opacity-60 sm:opacity-30 hover:opacity-100 z-50 transition duration-300">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287-.947c.886.54 2.042.061 2.287-.947 1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
            </button>

            <button onClick={toggleMute} className="fixed bottom-10 left-4 sm:bottom-4 sm:left-4 text-gray-500 bg-white/30 sm:bg-transparent rounded-full p-2 opacity-60 sm:opacity-30 hover:opacity-100 z-50 transition duration-300">
              {isMuted ? (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 5v14l-4.5-4.5H6v-5h3.5L14 5zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>
          </div>
        </motion.div>
      )}

      {/* ================= HOME ================= */}
      {screen === 'SPLASH' && (
        <motion.div
          key="splash"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className='w-full px-4 lg:max-w-4xl flex flex-col items-center gap-6'
        >

          <div className="w-full max-w-4xl flex flex-col items-center 
        gap-6 mt-16 px-4 pb-20">
            <TitleBlock />

            <div className='w-full max-w-sm sm:max-w-md flex flex-col items-center gap-4 sm:gap-6 mt-10'>

              <button onClick={() => navigateTo('CLASS_SELECT')} className="w-full py-4 rounded-xl 
          bg-gray-300 font-extrabold! text-xl sm:text-2xl text-black 
          shadow-amber-50 transition duration-300 hover:shadow-lg hover:-translate-y-1">
                <span>PILIH KELAS</span>
                {!isClassSelected && <span className="text-red-500 text-3xl ml-2">⚠️</span>}
              </button>

              <button onClick={() => navigateTo('TOPIC_SELECT')} className="w-full py-4 rounded-xl 
          bg-gray-300 font-extrabold! text-xl sm:text-2xl text-black 
          shadow-amber-50 transition duration-300 hover:shadow-lg hover:-translate-y-1">
                <span>TOPIK MATERI</span>
                {!isTopicSelected && <span className="text-red-500 text-3xl ml-2">⚠️</span>}
              </button>

              <button onClick={() => navigateTo('MODE_SELECT')} className="w-full py-4 rounded-xl 
          bg-gray-300 font-extrabold! text-xl sm:text-2xl text-black shadow-amber-50 transition duration-300 hover:shadow-lg hover:-translate-y-1">
                <span>MODE GAME</span>
                {!isModeSelected && <span className="text-red-500 text-3xl ml-2">⚠️</span>}
              </button>
            </div>

            <div className='w-full max-w-xs sm:max-w-sm flex flex-col items-center gap-2 mt-10'>
              <button
                onClick={handleStart}
                disabled={!isFormComplete}
                className={`relative w-full py-4 rounded-2xl 
            bg-yellow-300 text-black text-xl sm:text-2xl font-bold
              transition-all duration-300
              hover:shadow-lg hover:shadow-white/80
              hover:translate-y-1
              active:translate-y-2 
              ${isFormComplete ?
                    'bg-yellow-300 text-black hover:shadow-lg hover:translate-y' :
                    'bg-gray-400 text-gray-700 opacity-50 cursor-not-allowed'}`}
              >
                <span className="relative z-0">MULAI BERMAIN</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ================= SETTINGS ================= */}
      {(screen === 'CLASS_SELECT' || screen === 'MODE_SELECT' || screen === 'TOPIC_SELECT') && (
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl flex flex-col items-center gap-6 mt-12 sm:mt-16">

          <TitleBlock />

          <div className={`max-w-4xl bg-[#D9D9D9] text-black p-4 sm:p-6 rounded-2xl shadow-2xl ${screen === 'MODE_SELECT' ? 'w-[95%] sm:w-md md:w-140' : 'w-80'}`}>
            <div className='flex flex-col items-center mb-5 bg-white shadow-xl shadow-[#1B0F3B] border-4 py-2 sm:py-3 rounded-xl text-xl sm:text-3xl font-extrabold'>
              {titleMap[screen] || 'MENU'}
            </div>

            {screen === 'CLASS_SELECT' &&
              Object.keys(KONFIGURASI_KELAS).map(c => (
                <button
                  key={c}
                  onClick={() => handleClassSelect(c)}
                  className={`w-full py-2 mb-2 rounded-2xl text-lg 
                    font-bold font-sans transition-all duration-150 hover:translate-y-2 ${selectedClass == c ? 'bg-black text-yellow-300' : 'bg-white'
                      ? 'opacity-100 scale-105 shadow-lg border' : 'opacity-40 scale-95 blur-[1px]'

                    }`}
                >
                  KELAS {c}
                </button>
              ))
            }

            {screen === 'TOPIC_SELECT' && selectedClass &&
              KONFIGURASI_KELAS[selectedClass].materi.map(t => (

                <button
                  key={t}
                  onClick={() => toggleTopic(t)}
                  className={`w-full py-2 mb-2 rounded-2xl text-lg font-bold font-sans transition duration-150 hover:translate-y-1  ${selectedTopics.includes(t) ? 'bg-black text-yellow-300' : 'bg-white'
                    ? 'opacity-100 scale-105 shadow-lg border' : 'opacity-40 scale-95 blur-[1px]'
                    }`}
                >
                  {t}
                </button>
              ))
            }

            {screen === 'MODE_SELECT' && (() => {
              const timerVal = ambilKonfigurasiAdmin().pengaturanWaktu?.TIMER || 2;
              const m = Math.floor(timerVal);
              const s = Math.round((timerVal % 1) * 60);
              const timerText = m > 0 && s > 0 ? `${m} MENIT ${s} DETIK` : m > 0 ? `${m} MENIT` : `${s} DETIK`;

              return [
                {
                  id: EnumModePermainan.TIMER,
                  titleLine1: 'BATAS',
                  titleLine2: 'WAKTU',
                  desc: ['JAWAB SOAL DALAM', `WAKTU ${timerText}`]
                },
                {
                  id: EnumModePermainan.STOPWATCH,
                  titleLine1: 'WAKTU',
                  titleLine2: 'TERCEPAT',
                  desc: ['KEJAR WAKTU', 'TERBAIKMU DALAM', `MENYELESAIKAN ${ambilKonfigurasiAdmin().pengaturanWaktu?.STOPWATCH || 20} SOAL`]
                }
              ].map((m, index) => {
                const isSelected = mode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={`w-full flex items-center justify-between py-3 sm:py-5 px-3 sm:px-4 mb-4 rounded-[2rem] sm:rounded-[3rem] transition-all duration-300 hover:scale-[1.02] ${isSelected
                      ? 'bg-black text-yellow-400 border-2 border-black shadow-xl'
                      : 'bg-transparent text-black border-2 border-black hover:bg-black/5'
                      }`}
                  >
                    <div className="flex flex-col items-center justify-center font-extrabold text-base sm:text-2xl md:text-3xl tracking-tighter leading-tight w-[45%] sm:w-[45%]">
                      <span className="whitespace-nowrap">{m.titleLine1}</span>
                      <span className="whitespace-nowrap">{m.titleLine2}</span>
                    </div>

                    <div className={`w-0.5 h-10 sm:h-12 md:h-16 ${isSelected ? 'bg-yellow-400' : 'bg-black'}`}></div>

                    <div className="flex flex-col text-[10px] sm:text-base md:text-lg tracking-tighter leading-tight text-center flex-1 font-bold px-1 sm:px-2">
                      {m.desc.map((line, i) => (
                        <span key={i}>{line}</span>
                      ))}
                    </div>
                  </button>
                );
              });
            })()}

          </div>

          <button onClick={() => navigateTo('SPLASH')} className="w-full md:w-60 py-4 bg-yellow-300 
          rounded-xl font-bold text-black text-3xl transition duration-300 shadow-lg hover:shadow-amber-100 hover:translate-y-1">
            SIMPAN
          </button>
        </div>
      )}

      {/* ================= INSTRUCTIONS ================= */}
      {screen === 'INSTRUCTIONS' && (
        <div className="w-full max-w-4xl flex flex-col px-4 items-center gap-6 mt-16 sm:mt-10 pb-10 text-center">
          <TitleBlock />

          <h3 className='mt-5 font-bold text-lg sm:text-xl text-black bg-[#a6a6a6] rounded-lg py-2 w-full max-w-sm'>
            PETUNJUK BERMAIN
          </h3>

          <div className='w-full max-w-2xl sm:max-w-4xl bg-[#a6a6a6] rounded-2xl p-4 sm:p-10 shadow-black shadow-2xl flex items-center justify-center'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 justify-items-center w-full'>
              <img src={P1} alt="Petunjuk 1" className='w-28 sm:w-44 object-contain shadow-lg rounded-xl' />
              <img src={P2} alt="Petunjuk 2" className='w-28 sm:w-44 object-contain shadow-lg rounded-xl' />
              <img src={P3} alt="Petunjuk 3" className='w-28 sm:w-44 object-contain shadow-lg rounded-xl' />
              <img src={P4} alt="Petunjuk 4" className='w-28 sm:w-44 object-contain shadow-lg rounded-xl' />
            </div>
          </div>

          <button onClick={() => navigateTo('HOME')} className="py-4 mt-6 w-full max-w-sm bg-yellow-300 text-black 
            rounded-xl font-bold text-2xl sm:text-3xl transition duration-150 shadow-lg hover:shadow-amber-100 hover:-translate-y-1">
            KEMBALI
          </button>
        </div>
      )}

      {/* ================= ADMIN LOGIN ================= */}
      {screen === 'ADMIN_LOGIN' && (
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl flex flex-col items-center gap-6 mt-10">
          <TitleBlock />

          <div className="max-w-xl bg-[#D9D9D9] text-black p-6 sm:p-10 rounded-3xl w-11/12 mt-10 shadow-2xl flex flex-col items-center">
            <h2 className="text-3xl font-extrabold mb-6 tracking-widest text-[#1B0F3B]">ADMIN LOGIN</h2>

            <input
              type="text"
              placeholder="Username"
              value={adminUname}
              onChange={(e) => setAdminUname(e.target.value)}
              className="w-full mb-4 px-4 py-3 rounded-xl border-4 border-white shadow-inner text-xl font-bold bg-[#b3bce6] placeholder-gray-600 focus:outline-none focus:border-yellow-400 transition"
            />

            <input
              type="password"
              placeholder="Password"
              value={adminPass}
              onChange={(e) => setAdminPass(e.target.value)}
              // enable pressing enter to logic
              onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
              className="w-full mb-2 px-4 py-3 rounded-xl border-4 border-white shadow-inner text-xl font-bold bg-[#b3bce6] placeholder-gray-600 focus:outline-none focus:border-yellow-400 transition"
            />

            {adminError && <p className="text-red-500 font-bold mb-4 w-full text-center">{adminError}</p>}

            <button
              onClick={handleAdminLogin}
              className="w-full py-4 mt-4 bg-yellow-400 rounded-xl font-bold text-black text-2xl transition duration-300 shadow-[0_5px_0_#b59a00] hover:translate-y-1 hover:shadow-[0_2px_0_#b59a00] active:translate-y-2 active:shadow-none uppercase tracking-widest"
            >
              Masuk
            </button>
          </div>
        </div>
      )}

      {/* ================= ADMIN PANEL ================= */}
      {screen === 'ADMIN_PANEL' && (
        <div className="w-full max-w-md md:max-w-4xl lg:max-w-5xl flex flex-col items-center gap-4 py-8 pb-32 mb-10 h-full overflow-y-auto">
          <TitleBlock showSubtitle={false} />

          <div className="w-11/12 md:w-full bg-[#D9D9D9] text-black p-6 rounded-3xl shadow-xl flex flex-col items-center border-[6px] border-white">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 tracking-widest bg-white px-8 py-3 rounded-xl shadow-md border-4 border-black">PENGATURAN</h2>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Kelas Boundaries */}
              <div className="flex flex-col gap-3">
                <h3 className="font-extrabold text-lg text-center bg-[#fcd144] py-2 px-4 rounded-xl mb-2 border-2 border-black shadow-[0_3px_0_#000]">BATAS ANGKA KELAS</h3>
                {[1, 2, 3, 4, 5, 6].map(k => (
                  <div key={k} className="flex justify-between items-center bg-white px-4 py-2 rounded-xl border-2 border-gray-400 shadow-sm">
                    <span className="font-bold text-lg">Kelas {k}</span>
                    <div className="flex items-center">
                      <span className="mr-2 font-semibold text-gray-500">Maks:</span>
                      <input
                        type="number"
                        min="1"
                        value={adminCfg.batasAngkaKelas[k] || ''}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          setAdminCfg(prev => ({
                            ...prev,
                            batasAngkaKelas: { ...prev.batasAngkaKelas, [k]: val }
                          }));
                        }}
                        className="w-24 px-2 py-1 border-2 border-blue-400 rounded-lg text-center font-bold text-xl bg-[#b3bce6] focus:outline-none focus:border-yellow-400"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Game Settings */}
              <div className="flex flex-col gap-4">

                {/* PENGATURAN BATAS WAKTU */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-extrabold text-lg text-center bg-[#fcd144] py-2 px-4 rounded-xl border-2 border-black shadow-[0_3px_0_#000]">PENGATURAN BATAS WAKTU</h3>
                  <div className="flex flex-col bg-white p-4 rounded-xl border-2 border-gray-400 shadow-sm gap-4">
                    <p className="text-sm font-bold text-black leading-tight">Pada mode ini, pemain berlomba mengumpulkan skor sebanyak-banyaknya dalam batas waktu yang ditentukan.</p>

                    <div className="flex flex-col gap-1">
                      <span className="font-extrabold text-md">Batas Waktu Keseluruhan</span>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="number" min="0"
                          value={Math.floor(adminCfg.pengaturanWaktu?.TIMER ?? 2) || ''}
                          onChange={(e) => {
                            const m = parseInt(e.target.value) || 0;
                            const s = Math.round(((adminCfg.pengaturanWaktu?.TIMER ?? 2) % 1) * 60) || 0;
                            setAdminCfg(prev => ({ ...prev, pengaturanWaktu: { ...prev.pengaturanWaktu, TIMER: m + (s / 60) } }));
                          }}
                          className="w-16 px-2 py-1 border-2 border-blue-400 rounded-lg text-center font-bold text-lg bg-[#b3bce6] focus:outline-none"
                        />
                        <span className="font-bold text-sm">Menit</span>
                        <input
                          type="number" min="0" max="59"
                          value={Math.round(((adminCfg.pengaturanWaktu?.TIMER ?? 2) % 1) * 60) || ''}
                          onChange={(e) => {
                            const s = parseInt(e.target.value) || 0;
                            const m = Math.floor(adminCfg.pengaturanWaktu?.TIMER ?? 2);
                            setAdminCfg(prev => ({ ...prev, pengaturanWaktu: { ...prev.pengaturanWaktu, TIMER: m + (s / 60) } }));
                          }}
                          className="w-16 px-2 py-1 border-2 border-blue-400 rounded-lg text-center font-bold text-lg bg-[#b3bce6] focus:outline-none"
                        />
                        <span className="font-bold text-sm">Detik</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PENGATURAN WAKTU TERCEPAT */}
                <div className="flex flex-col gap-2 mt-2">
                  <h3 className="font-extrabold text-lg text-center bg-[#fcd144] py-2 px-4 rounded-xl border-2 border-black shadow-[0_3px_0_#000]">PENGATURAN WAKTU TERCEPAT</h3>
                  <div className="flex flex-col bg-white p-4 rounded-xl border-2 border-gray-400 shadow-sm gap-4">
                    <p className="text-sm font-bold text-black leading-tight">Pada mode ini, pemain berlomba menyelesaikan sejumlah soal secepat mungkin untuk mendapatkan rating karakter (Flash, Kelinci, Kura-kura).</p>

                    <div className="flex flex-col gap-1">
                      <span className="font-extrabold text-md">Batas Jumlah Soal</span>
                      <p className="text-xs text-gray-600 leading-tight">Jumlah target soal yang harus diselesaikan secepat mungkin.</p>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="number" min="1"
                          value={adminCfg.pengaturanWaktu?.STOPWATCH || ''}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            setAdminCfg(prev => ({ ...prev, pengaturanWaktu: { ...prev.pengaturanWaktu, STOPWATCH: val } }));
                          }}
                          className="w-full px-2 py-2 border-2 border-blue-400 rounded-lg text-center font-bold text-xl bg-[#b3bce6] focus:outline-none"
                        />
                        <span className="font-bold text-sm whitespace-nowrap">Soal</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="font-extrabold text-md">Target Waktu (Bintang 3 / Flash)</span>
                      <p className="text-xs text-gray-600 leading-tight">Waktu pengerjaan: 00:00 - {String(Math.floor((adminCfg.pengaturanWaktu?.RATING_CEPAT_DETIK ?? 120) / 60)).padStart(2, '0')}:{String(Math.round((adminCfg.pengaturanWaktu?.RATING_CEPAT_DETIK ?? 120) % 60)).padStart(2, '0')}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="number" min="0"
                          value={Math.floor((adminCfg.pengaturanWaktu?.RATING_CEPAT_DETIK ?? 120) / 60) || ''}
                          onChange={(e) => {
                            const m = parseInt(e.target.value) || 0;
                            const s = Math.round((adminCfg.pengaturanWaktu?.RATING_CEPAT_DETIK ?? 120) % 60);
                            setAdminCfg(prev => ({ ...prev, pengaturanWaktu: { ...prev.pengaturanWaktu, RATING_CEPAT_DETIK: (m * 60) + s } }));
                          }}
                          className="w-16 px-2 py-1 border-2 border-blue-400 rounded-lg text-center font-bold text-lg bg-[#b3bce6] focus:outline-none"
                        />
                        <span className="font-bold text-sm">Menit</span>
                        <input
                          type="number" min="0" max="59"
                          value={Math.round((adminCfg.pengaturanWaktu?.RATING_CEPAT_DETIK ?? 120) % 60) || ''}
                          onChange={(e) => {
                            const s = parseInt(e.target.value) || 0;
                            const m = Math.floor((adminCfg.pengaturanWaktu?.RATING_CEPAT_DETIK ?? 120) / 60);
                            setAdminCfg(prev => ({ ...prev, pengaturanWaktu: { ...prev.pengaturanWaktu, RATING_CEPAT_DETIK: (m * 60) + s } }));
                          }}
                          className="w-16 px-2 py-1 border-2 border-blue-400 rounded-lg text-center font-bold text-lg bg-[#b3bce6] focus:outline-none"
                        />
                        <span className="font-bold text-sm">Detik</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="font-extrabold text-md">Target Waktu (Bintang 2 / Kelinci)</span>
                      <p className="text-xs text-gray-600 leading-tight">Waktu pengerjaan: {String(Math.floor((adminCfg.pengaturanWaktu?.RATING_CEPAT_DETIK ?? 120) / 60)).padStart(2, '0')}:{String(Math.round((adminCfg.pengaturanWaktu?.RATING_CEPAT_DETIK ?? 120) % 60)).padStart(2, '0')} - {String(Math.floor((adminCfg.pengaturanWaktu?.RATING_SEDANG_DETIK ?? 240) / 60)).padStart(2, '0')}:{String(Math.round((adminCfg.pengaturanWaktu?.RATING_SEDANG_DETIK ?? 240) % 60)).padStart(2, '0')}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="number" min="0"
                          value={Math.floor((adminCfg.pengaturanWaktu?.RATING_SEDANG_DETIK ?? 240) / 60) || ''}
                          onChange={(e) => {
                            const m = parseInt(e.target.value) || 0;
                            const s = Math.round((adminCfg.pengaturanWaktu?.RATING_SEDANG_DETIK ?? 240) % 60);
                            setAdminCfg(prev => ({ ...prev, pengaturanWaktu: { ...prev.pengaturanWaktu, RATING_SEDANG_DETIK: (m * 60) + s } }));
                          }}
                          className="w-16 px-2 py-1 border-2 border-blue-400 rounded-lg text-center font-bold text-lg bg-[#b3bce6] focus:outline-none"
                        />
                        <span className="font-bold text-sm">Menit</span>
                        <input
                          type="number" min="0" max="59"
                          value={Math.round((adminCfg.pengaturanWaktu?.RATING_SEDANG_DETIK ?? 240) % 60) || ''}
                          onChange={(e) => {
                            const s = parseInt(e.target.value) || 0;
                            const m = Math.floor((adminCfg.pengaturanWaktu?.RATING_SEDANG_DETIK ?? 240) / 60);
                            setAdminCfg(prev => ({ ...prev, pengaturanWaktu: { ...prev.pengaturanWaktu, RATING_SEDANG_DETIK: (m * 60) + s } }));
                          }}
                          className="w-16 px-2 py-1 border-2 border-blue-400 rounded-lg text-center font-bold text-lg bg-[#b3bce6] focus:outline-none"
                        />
                        <span className="font-bold text-sm">Detik</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="font-extrabold text-md">Target Waktu (Bintang 1 / Kura-kura)</span>
                      <p className="text-xs text-black font-bold leading-tight">Waktu pengerjaan: &gt; {String(Math.floor((adminCfg.pengaturanWaktu?.RATING_SEDANG_DETIK ?? 240) / 60)).padStart(2, '0')}:{String(Math.round((adminCfg.pengaturanWaktu?.RATING_SEDANG_DETIK ?? 240) % 60)).padStart(2, '0')}</p>
                    </div>

                  </div>
                </div>

              </div>

            </div>

            <div className="mt-10 flex gap-4 w-full md:w-1/2">
              <button
                onClick={() => navigateTo('HOME')}
                className="flex-1 py-4 bg-gray-400 rounded-xl font-bold text-black text-xl transition shadow-[0_5px_0_#757575] hover:translate-y-1 active:translate-y-2 uppercase"
              >
                Batal
              </button>
              <button
                onClick={handleAdminSave}
                className="flex-1 py-4 bg-yellow-400 rounded-xl font-bold text-black text-xl transition shadow-[0_5px_0_#b59a00] hover:translate-y-1 hover:shadow-[0_2px_0_#b59a00] active:translate-y-2 active:shadow-none uppercase"
              >
                Simpan
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default MainMenu;