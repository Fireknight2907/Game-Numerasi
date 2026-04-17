const STORAGE_KEY = 'NUMERASI_ADMIN_CONFIG';

const DEFAULT_CONFIG = {
  classBoundaries: {
    1: 20,
    2: 100,
    3: 1000,
    4: 50,
    5: 500,
    6: 1000
  },
  timers: {
    TIMER: 2, // dalam menit
    STOPWATCH: 20, // jumlah soal untuk waktu tercepat
    RATING_FAST_SEC: 120, // 2 menit (Flash jika <= 2 menit)
    RATING_MEDIUM_SEC: 240 // 4 menit (Kelinci jika <= 4 menit, lebih = Kura-kura)
  }
};

export const getAdminConfig = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with default to ensure all keys exist even if older version
      return {
        classBoundaries: { ...DEFAULT_CONFIG.classBoundaries, ...(parsed.classBoundaries || {}) },
        timers: { ...DEFAULT_CONFIG.timers, ...(parsed.timers || {}) }
      };
    }
  } catch (e) {
    console.error("Gagal membaca konfigurasi admin", e);
  }
  return DEFAULT_CONFIG;
};

export const saveAdminConfig = (newConfig) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
  } catch (e) {
    console.error("Gagal menyimpan konfigurasi admin", e);
  }
};
