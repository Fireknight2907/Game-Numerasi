import React, { useState, useEffect, useRef } from 'react';
import { EnumModePermainan, EnumOperasi } from '../models/Enums';
import { Permainan } from '../models/Permainan';
import { ambilKonfigurasiAdmin } from '../utils/adminConfig';

import mikirJawab from '../assets/mikirjawab.png';
import tenSecSound from '../assets/10 sec.mp3';

function GameScreen({ config, onEnd, onCancel }) {
    const engineRef = useRef(null);
    

    const isTimeAttack = config.mode === EnumModePermainan.TIMER;
    const adminConfig = ambilKonfigurasiAdmin();
    const timerLimit = (adminConfig.pengaturanWaktu?.TIMER || 2) * 60;
    const TOTAL_STOPWATCH_Q = adminConfig.pengaturanWaktu?.STOPWATCH || 20;

    const [currentQ, setCurrentQ] = useState(null);
    const [qIndex, setQIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [currentInput, setCurrentInput] = useState('');

    // time = countdown from timerLimit (Time Attack) or countUp from 0 (Stopwatch)
    const [time, setTime] = useState(isTimeAttack ? timerLimit : 0);
    const timerRef = useRef(null);
    const tenSecAudioRef = useRef(new Audio(tenSecSound));

    useEffect(() => {
        // Ensure BGM plays when game starts again
        const bgm = document.getElementById('bgm');
        if (bgm) bgm.play().catch(e => console.log('Audio warn:', e));

        // 1. Instansiasi Class Engine (Composition OOP)
        engineRef.current = new Permainan(config.selectedClass.toString(), config.mode, config.selectedTopics);
        const firstQ = engineRef.current.buatSoalBerikutnya();
        setCurrentQ(firstQ);
        setQIndex(1);

        // 2. Start Timer
        timerRef.current = setInterval(() => {
            setTime(prev => {
                if (isTimeAttack) {
                    const nextTime = prev - 1;
                    if (nextTime === 10) {
                        tenSecAudioRef.current.play().catch(e => console.log('Audio error:', e));
                        const bgm = document.getElementById('bgm');
                        if (bgm) bgm.pause();
                    }
                    if (prev <= 1) {
                        endGameHandler();
                        return 0;
                    }
                    return nextTime;
                } else {
                    return prev + 1;
                }
            });
        }, 1000);

        return () => {
            clearInterval(timerRef.current);
            if (tenSecAudioRef.current) {
                tenSecAudioRef.current.pause();
                tenSecAudioRef.current.currentTime = 0;
            }
        };
    }, []);

    const endGameHandler = () => {
        clearInterval(timerRef.current);
        if (engineRef.current) {
            const skorObj = engineRef.current.akhiriPermainan();
            setTimeout(() => {
                onEnd({
                    correctAnswers: skorObj.jawabanBenar,
                    // Jika Time Attack, total soal yang terjawab adalah array.length - 1 (karena yg terakhir tidak terjawab).
                    totalQuestions: isTimeAttack ? engineRef.current.daftarSoal.length - 1 : TOTAL_STOPWATCH_Q,
                    timeSpent: isTimeAttack ? timerLimit - currentTimeRef.current : currentTimeRef.current,
                    mode: config.mode
                });
            }, 300);
        }
    };

    const currentTimeRef = useRef(time);
    useEffect(() => { currentTimeRef.current = time; }, [time]);

    // Fitur text-to-speech pakai API bawaan dengan fallback yang lebih presisi
    useEffect(() => {
        if (currentQ && (config.selectedClass.toString() === '1' || config.selectedClass.toString() === '2')) {
            window.speechSynthesis.cancel();
            
            let textToRead = currentQ.teksSoal;
            textToRead = textToRead.replace(/\+/g, ' ditambah ');
            textToRead = textToRead.replace(/-/g, ' dikurang ');
            textToRead = textToRead.replace(/x/ig, ' dikali ');
            textToRead = textToRead.replace(/:/g, ' dibagi ');
            textToRead += ' sama dengan berapa?';

            const playVoice = () => {
                const msg = new SpeechSynthesisUtterance(textToRead);
                msg.lang = 'id-ID';
                msg.rate = 0.85; 

                const voices = window.speechSynthesis.getVoices();
                // Utamakan mencari yang namanya mengandung kata 'indonesia'
                const idVoice = voices.find(v => 
                    (v.name && v.name.toLowerCase().includes('indonesi')) || 
                    (v.lang && (v.lang.toLowerCase().startsWith('id') || v.lang.toLowerCase().startsWith('in-')))
                );
                
                if (idVoice) {
                    msg.voice = idVoice;
                }

                window.speechSynthesis.speak(msg);
            };

            // Di Chrome, getVoices() sering mereturn array kosong pada awal load
            let voices = window.speechSynthesis.getVoices();
            if (voices.length === 0) {
                // Jangan panggil speak dulu, tunggu daftar voices siap
                const onVoicesReady = () => {
                    playVoice();
                    window.speechSynthesis.removeEventListener('voiceschanged', onVoicesReady);
                };
                window.speechSynthesis.addEventListener('voiceschanged', onVoicesReady);
            } else {
                // Jika sudah siap
                playVoice();
            }
        }
        
        return () => {
            window.speechSynthesis.cancel();
        }
    }, [currentQ, config.selectedClass]);

    const handleKeyPress = (val) => {
        if (val === 'DEL') {
            setCurrentInput(prev => prev.slice(0, -1));
        } else if (val === '-') {
            if (!currentInput.includes('-')) setCurrentInput(prev => '-' + prev);
        } else if (val === '.') {
            if (!currentInput.includes('.')) setCurrentInput(prev => prev + '.');
        } else if (val === '/') {
            if (!currentInput.includes('/')) setCurrentInput(prev => prev + '/');
        } else {
            if (currentInput.length < 10) setCurrentInput(prev => prev + val);
        }
    };

    const handleSubmit = () => {
        if (!currentInput || !currentQ || !engineRef.current) return;

        const isBenar = engineRef.current.catatJawaban(currentInput);
        if (isBenar) setCorrectAnswers(prev => prev + 1);

        setCurrentInput('');

        if (!isTimeAttack && qIndex >= TOTAL_STOPWATCH_Q) {
            endGameHandler();
        } else {
            const nextQ = engineRef.current.buatSoalBerikutnya();
            setCurrentQ(nextQ);
            setQIndex(prev => prev + 1);
        }
    };

    const hasPecahan = config.selectedTopics.includes(EnumOperasi.PECAHAN);
    const hasDesimal = config.selectedTopics.includes(EnumOperasi.DESIMAL);

    // Keyboard Event
    useEffect(() => {
        const handleGlobalKeyDown = (e) => {
            if (e.ctrlKey || e.altKey || e.metaKey) return;

            const key = e.key;
            if (key === 'Enter') {
                e.preventDefault();
                handleSubmit();
            } else if (key === 'Backspace') {
                e.preventDefault();
                handleKeyPress('DEL');
            } else if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '/', '.'].includes(key)) {
                e.preventDefault();

                // Block invalid char entries based on settings
                if (key === '.' && !hasDesimal && !hasPecahan) return;
                if (key === '/' && !hasPecahan) return;

                handleKeyPress(key);
            }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [currentInput, currentQ]);

    if (!currentQ) return null;

    const formatTime = (t) => {
        const m = Math.floor(t / 60).toString().padStart(2, '0');
        const s = (t % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const modeName = isTimeAttack ? 'BATAS WAKTU' : 'WAKTU TERCEPAT';

    return (
        <div className="w-full h-full overflow-y-auto overflow-x-hidden \
        flex flex-col pt-4 sm:pt-8 px-4 sm:px-12 pb-4 sm:pb-6 max-w-6xl mx-auto">
            {/* Header Black Capsule */}
            <div className="w-full flex justify-between items-center mb-3 sm:mb-8 z-10 shrink-0">
                <div className="bg-black text-white px-3 py-2 sm:px-5 sm:py-3 rounded-[30px] 
                font-bold text-sm sm:text-lg border-2 sm:border-4 border-[#333] flex items-center 
                gap-2 sm:gap-4 shadow-xl ">
                    <span className="uppercase whitespace-nowrap">{modeName}</span>
                    <span className="opacity-50 hidden sm:inline">|</span>
                    <span className={`tracking-widest flex items-center whitespace-nowrap ${(isTimeAttack && time <= 10) ? 'animate-pulse text-red-500' : ''}`}>
                        <svg className={`w-4 h-4 sm:w-6 sm:h-6 mr-1 sm:mr-2 inline-block ${(isTimeAttack && time <= 10) ? 'text-red-500' : ''}`} 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" 
                        strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formatTime(time)}
                    </span>
                </div>
                <div className="text-white font-black text-xl sm:text-3xl tracking-widest text-shadow-md">
                    {isTimeAttack ? `${correctAnswers} \u2714` : `${Math.min(qIndex, TOTAL_STOPWATCH_Q)}/${TOTAL_STOPWATCH_Q}`}
                </div>
            </div>

            {/* Main Split Layout */}
            <div className="w-full flex-1 flex flex-col md:flex-row gap-2 
            sm:gap-8 items-center pb-4">
                {/* Left: Illustration */}
                <div className="w-full md:w-[40%] flex justify-center items-end 
                flex h-[150px] sm:h-[250px] shrink drop-shadow-[0_20px_20px_rgba(0,0,0,0.6)] 
                mt-2 sm:mt-30">
                    <img src={mikirJawab} alt="Belajar" 
                    className="w-40 sm:w-70 h-40 sm:h-70 object-contain" />
                </div> 

                {/* Right: Question Box & Numpad */}
                <div className="w-full md:w-[60%] flex flex-col justify-center items-center h-full">

                    <div className="w-full max-w-[400px] flex flex-col items-center mb-2">
                        <h2 className="text-white text-xl sm:text-3xl font-black 
                        tracking-widest text-shadow-none drop-shadow-md uppercase 
                        text-center w-full">SOAL {qIndex}</h2> 
                    </div>

                        {/* The Gray Question Card */}
                        <div className="w-[95%] bg-[#D9D9D9] rounded-2xl border-[4px] sm:border-[6px] border-white 
                        shadow-[0_6px_0_#9e9e9e] sm:shadow-[0_10px_0_#9e9e9e] p-2 sm:p-3 flex 
                        items-center justify-center mb-6 sm:mb-5 relative min-h-[80px] md:min-h-30 max-w-[400px]">
                            <h3 className={`text-black font-black tracking-tight sm:tracking-widest text-shadow-none 
                                text-center leading-tight whitespace-pre-wrap break-words w-full
                                ${currentQ.teksSoal.length > 30 ? 'text-[4vw] sm:text-xl' : 
                                currentQ.teksSoal.length > 20 ? 'text-[5.5vw] sm:text-2xl' : 
                                currentQ.teksSoal.length > 10 ? 'text-[7vw] sm:text-4xl' : 
                                'text-4xl sm:text-6xl'}`} style={{ textShadow: "none" }}>
                                {currentQ.teksSoal} =
                            </h3>
                        </div>

                        {/* The Lavender Input Container */}
                        <div className="w-full max-w-[300px] bg-[#b3bce6] border-4 border-black 
                        rounded-full px-8 py-2 min-h-[60px] sm:min-h-[65px] shadow-[0_6px_0_#000] 
                        mb-6 flex items-center justify-center text-4xl sm:text-4xl font-bold 
                        text-black tracking-wider shadow-inner" style={{ textShadow: "none" }}>
                            {currentInput}
                        </div>

                        {/* Unified Numpad + Lanjut Box */}
                        <div className="w-full max-w-[290px] mx-auto mt-auto sm:mt-0 flex flex-col">
                            <div className="grid grid-cols-3 gap-1 sm:gap-3 mb-2 sm:mb-3 -mt-4">
                                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '0'].map(k => (
                                    <button
                                        key={k} onClick={() => handleKeyPress(k)}
                                        className="font-black text-lg sm:text-xl py-1
                                        sm:py-3 rounded-lg border-2 border-black bg-[#d9d9d9] text-black 
                                        shadow-[0_6px_0_#9e9e9e] active:shadow-[0_2px_0_#9e9e9e] ml-0
                                        active:translate-y-1 transition-all"
                                        style={{ textShadow: "none" }}
                                    >
                                        {k}
                                    </button>
                                ))}
                                <button
                                    onClick={() => handleKeyPress(hasDesimal ? '.' : (hasPecahan ? '/' : '.'))}
                                    className="font-black text-2xl sm:text-3xl py-2 sm:py-3 rounded-lg border-2 
                                    border-black bg-[#d9d9d9] text-black shadow-[0_6px_0_#9e9e9e] 
                                    active:shadow-[0_2px_0_#9e9e9e] 
                                    active:translate-y-1 transition-all"
                                    style={{ textShadow: "none" }}
                                >
                                    {hasDesimal ? '.' : (hasPecahan ? '/' : '.')}
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-1 relative z-20 pb-4">
                                <button
                                    onClick={() => handleKeyPress('DEL')}
                                    className="font-black text-xs sm:text-xl py-3 rounded-lg border-2 border-black 
                                    bg-[#ff5252] text-white shadow-[0_6px_0_#a80000] 
                                    active:translate-y-1 transition-all uppercase tracking-widest"
                                    style={{ textShadow: "none" }}
                                >
                                    HAPUS
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="rounded-lg py-3 text-xs sm:text-xl font-black text-black 
                                    tracking-widest 
                                    border-2 bg-[#dee053] border-black shadow-[0_5px_0_#dee003] 
                                    active:shadow-[0_2px_0_#dee053] 
                                    w-full h-full"
                                    style={{ textShadow: "none" }}
                                >
                                    LANJUT
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        
    );
}

export default GameScreen;
