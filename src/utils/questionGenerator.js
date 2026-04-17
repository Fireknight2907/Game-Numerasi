import { CLASS_CONFIG, TOPICS } from './levelConfig';

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomFloat = (min, max, decimals = 1) => {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
}

const genPenjumlahan = (max) => {
  const num1 = getRandomInt(1, max);
  const num2 = getRandomInt(1, max);
  return { question: `${num1} + ${num2}`, ans: (num1 + num2).toString(), type: TOPICS.PENJUMLAHAN };
};

const genPengurangan = (max) => {
  const num1 = getRandomInt(1, max);
  const num2 = getRandomInt(1, max);
  const a = Math.max(num1, num2);
  const b = Math.min(num1, num2);
  return { question: `${a} - ${b}`, ans: (a - b).toString(), type: TOPICS.PENGURANGAN };
};

const genPerkalian = (classLvl) => {
  let max = classLvl <= 3 ? 10 : 20;
  const num1 = getRandomInt(1, max);
  const num2 = getRandomInt(1, 10);
  return { question: `${num1} × ${num2}`, ans: (num1 * num2).toString(), type: TOPICS.PERKALIAN };
};

const genPembagian = (classLvl) => {
  let maxDivisor = classLvl <= 3 ? 10 : 20;
  const divisor = getRandomInt(2, maxDivisor);
  const answer = getRandomInt(2, 10);
  const dividend = divisor * answer;
  return { question: `${dividend} ÷ ${divisor}`, ans: answer.toString(), type: TOPICS.PEMBAGIAN };
};

const genPositifNegatif = (max) => {
  const ops = ['+', '-'];
  const op = ops[getRandomInt(0, 1)];
  let num1 = getRandomInt(1, Math.min(max, 50)) * (getRandomInt(0,1) ? 1 : -1);
  let num2 = getRandomInt(1, Math.min(max, 50)) * (getRandomInt(0,1) ? 1 : -1);
  const ans = op === '+' ? num1 + num2 : num1 - num2;
  const n2Str = num2 < 0 ? `(${num2})` : `${num2}`;
  return { question: `${num1} ${op} ${n2Str}`, ans: ans.toString(), type: TOPICS.POSITIF_NEGATIF };
}

const genCampuran = () => {
  const B = getRandomInt(1, 10);
  const C = getRandomInt(1, 10);
  const A = getRandomInt(1, 20);
  if (getRandomInt(0, 1) === 0) {
    return { question: `${A} + ${B} × ${C}`, ans: (A + B * C).toString(), type: TOPICS.CAMPURAN };
  } else {
    return { question: `${B} × ${C} - ${A}`, ans: (B * C - A).toString(), type: TOPICS.CAMPURAN };
  }
}

const genDesimal = () => {
  const num1 = getRandomFloat(1, 10, 1);
  const num2 = getRandomFloat(1, 10, 1);
  const op = getRandomInt(0, 1) === 0 ? '+' : '-';
  let a = num1, b = num2;
  if (op === '-' && num2 > num1) { a = num2; b = num1; }
  const ans = op === '+' ? Math.round((a + b)*10)/10 : Math.round((a - b)*10)/10;
  return { question: `${a} ${op} ${b}`, ans: ans.toString(), type: TOPICS.DESIMAL };
}

const genPecahan = () => {
    const denoms = [2, 3, 4, 5, 6, 8, 10];
    let d1 = denoms[getRandomInt(0, denoms.length - 1)];
    let d2 = denoms[getRandomInt(0, denoms.length - 1)];
    
    if (getRandomInt(0, 1) === 0) d2 = d1;
  
    let n1 = getRandomInt(1, d1 - 1) || 1;
    let n2 = getRandomInt(1, d2 - 1) || 1;
    
    const op = getRandomInt(0, 1) === 0 ? '+' : '-';
    
    if (op === '-' && (n1/d1 < n2/d2)) {
      let t = n1; n1 = n2; n2 = t;
      t = d1; d1 = d2; d2 = t;
    }
  
    let top = op === '+' ? n1 * d2 + n2 * d1 : n1 * d2 - n2 * d1;
    let bot = d1 * d2;
    
    return { 
        question: `${n1}/${d1} ${op} ${n2}/${d2}`, 
        ans: { num: top, den: bot }, 
        type: TOPICS.PECAHAN 
    };
};

const genBangunDatar = (max) => {
    const m = Math.min(max, 30);
    const shapes = ['Persegi', 'Persegi Panjang', 'Segitiga'];
    const shape = shapes[getRandomInt(0, shapes.length - 1)];
    const isLuas = getRandomInt(0, 1) === 0;
    
    let qStr = isLuas ? 'Luas' : 'Keliling';
    let ans = 0;
    
    if (shape === 'Persegi') {
      const s = getRandomInt(1, m);
      qStr += ` Persegi (sisi=${s})`;
      ans = isLuas ? s * s : 4 * s;
    } else if (shape === 'Persegi Panjang') {
      const p = getRandomInt(2, m);
      const l = getRandomInt(1, p - 1) || 1;
      qStr += ` Persegi Panjang (panjang=${p}, lebar=${l})`;
      ans = isLuas ? p * l : 2 * (p + l);
    } else {
      const s = getRandomInt(2, m);
      if (!isLuas) {
          qStr += ` Segitiga Sama Sisi (sisi=${s})`;
          ans = 3 * s;
      } else {
          let t = getRandomInt(2, 10);
          if (s % 2 !== 0 && t % 2 !== 0) t++;
          qStr += ` Segitiga (alas=${s}, tinggi=${t})`;
          ans = (s * t) / 2;
      }
    }
    return { question: qStr, ans: ans.toString(), type: TOPICS.BANGUN_DATAR };
};

export const generateQuestion = (classLvl, activeTopics = []) => {
    const config = CLASS_CONFIG[classLvl];
    if (!config) return genPenjumlahan(20);

    const max = config.max;
    if (activeTopics.length === 0) activeTopics = config.topics; 
    const topic = activeTopics[getRandomInt(0, activeTopics.length - 1)];

    switch (topic) {
        case TOPICS.PENJUMLAHAN: return genPenjumlahan(max);
        case TOPICS.PENGURANGAN: return genPengurangan(max);
        case TOPICS.PERKALIAN: return genPerkalian(classLvl);
        case TOPICS.PEMBAGIAN: return genPembagian(classLvl);
        case TOPICS.DESIMAL: return genDesimal();
        case TOPICS.PECAHAN: return genPecahan();
        case TOPICS.POSITIF_NEGATIF: return genPositifNegatif(max);
        case TOPICS.CAMPURAN: return genCampuran();
        case TOPICS.BANGUN_DATAR: return genBangunDatar(max);
        default: return genPenjumlahan(max);
    }
};

export const checkAnswer = (questionObj, userInput) => {
    if (!userInput) return false;
    
    if (questionObj.type === TOPICS.PECAHAN) {
        let uNum, uDen;
        if (userInput.includes('/')) {
            const parts = userInput.split('/');
            uNum = parseInt(parts[0], 10);
            uDen = parseInt(parts[1], 10);
        } else {
            // Bisa jadi mereka isi num saja
            uNum = parseFloat(userInput);
            if (userInput.includes('.')) {
                // jika desimal diijinkan untuk pecahan? Prompt: "Pecahan bisa dijawab tidak simple form 4/40"
                // Desimal tidak lazim untuk Pecahan UI kids, tapi fallback
                return Math.abs(uNum - (questionObj.ans.num / questionObj.ans.den)) < 0.01;
            }
            uDen = 1;
        }
        
        const qNum = questionObj.ans.num;
        const qDen = questionObj.ans.den;
        
        if (isNaN(uNum) || isNaN(uDen) || uDen === 0) return false;
        
        return uNum * qDen === qNum * uDen; 
    }
    
    return userInput.trim() === questionObj.ans.toString();
};
