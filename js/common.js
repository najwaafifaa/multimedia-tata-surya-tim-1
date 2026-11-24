/**
 * COMMON.JS - PLANET MISSION LAB
 * Shared library untuk audio synthesizer, state persistence (localStorage),
 * modal dialogs (Audio, Tujuan, Tim Pengembang), dan HUD controls.
 */

// --- 1. STATE PERSISTENCE (LOCAL STORAGE) ---
const CommonState = {
  getUnlockedMission() {
    const val = localStorage.getItem('pml_unlocked_mission');
    return val ? parseInt(val, 10) : 1; // Default Misi 1 terbuka
  },
  unlockMission(missionNum) {
    const current = this.getUnlockedMission();
    if (missionNum > current) {
      localStorage.setItem('pml_unlocked_mission', missionNum);
    }
  },
  isTeacherMode() {
    return localStorage.getItem('pml_teacher_mode') === 'true';
  },
  setTeacherMode(enabled) {
    localStorage.setItem('pml_teacher_mode', enabled ? 'true' : 'false');
  },
  saveQuizScore(score, total) {
    localStorage.setItem('pml_quiz_score', score);
    localStorage.setItem('pml_quiz_total', total);
    localStorage.setItem('pml_quiz_timestamp', new Date().toISOString());
  },
  getQuizScore() {
    const score = localStorage.getItem('pml_quiz_score');
    const total = localStorage.getItem('pml_quiz_total');
    return {
      score: score !== null ? parseInt(score, 10) : 10,
      total: total !== null ? parseInt(total, 10) : 10
    };
  },
  isAudioMuted() {
    return localStorage.getItem('pml_audio_muted') === 'true';
  },
  setAudioMuted(muted) {
    localStorage.setItem('pml_audio_muted', muted ? 'true' : 'false');
  },
  getVolume() {
    const v = localStorage.getItem('pml_volume');
    return v !== null ? parseFloat(v) : 0.8;
  },
  setVolume(vol) {
    localStorage.setItem('pml_volume', vol);
  },
  resetAll() {
    localStorage.removeItem('pml_unlocked_mission');
    localStorage.removeItem('pml_quiz_score');
    localStorage.removeItem('pml_quiz_total');
    localStorage.removeItem('pml_quiz_timestamp');
    localStorage.removeItem('planetMission_usedQuestionIds');
  }
};

// --- 2. WEB AUDIO API SYNTHESIZER ---
const CommonAudio = {
  ctx: null,
  bgmInterval: null,
  isBgmPlaying: false,

  init() {
    const unlock = () => {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      document.removeEventListener('click', unlock);
      document.removeEventListener('keydown', unlock);
    };
    document.addEventListener('click', unlock);
    document.addEventListener('keydown', unlock);
  },

  play(type) {
    if (CommonState.isAudioMuted()) return;
    if (!this.ctx) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      } catch (e) {
        return;
      }
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const t = this.ctx.currentTime;
    const vol = CommonState.getVolume();

    switch (type) {
      case 'click': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, t);
        osc.frequency.exponentialRampToValueAtTime(400, t + 0.05);
        gain.gain.setValueAtTime(0.25 * vol, t);
        gain.gain.linearRampToValueAtTime(0.001, t + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.05);
        break;
      }
      case 'button': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, t); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, t + 0.08); // E5
        gain.gain.setValueAtTime(0.3 * vol, t);
        gain.gain.linearRampToValueAtTime(0.001, t + 0.09);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.09);
        break;
      }
      case 'correct': {
        this.playTone(523.25, t, 0.1, 'sine', 0.25 * vol); // C5
        this.playTone(783.99, t + 0.1, 0.2, 'sine', 0.28 * vol); // G5
        break;
      }
      case 'wrong': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, t);
        osc.frequency.linearRampToValueAtTime(90, t + 0.25);
        gain.gain.setValueAtTime(0.3 * vol, t);
        gain.gain.linearRampToValueAtTime(0.001, t + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.25);
        break;
      }
      case 'success': {
        this.playTone(523.25, t, 0.08, 'triangle', 0.25 * vol); // C5
        this.playTone(659.25, t + 0.08, 0.08, 'triangle', 0.25 * vol); // E5
        this.playTone(783.99, t + 0.16, 0.08, 'triangle', 0.28 * vol); // G5
        this.playTone(1046.50, t + 0.24, 0.3, 'sine', 0.3 * vol); // C6
        break;
      }
      case 'fanfare': {
        const notes = [523.25, 659.25, 783.99, 1046.50, 880, 1046.50];
        notes.forEach((freq, idx) => {
          this.playTone(freq, t + (idx * 0.12), 0.2, 'triangle', 0.3 * vol);
        });
        break;
      }
      case 'transition': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, t);
        osc.frequency.exponentialRampToValueAtTime(960, t + 0.18);
        gain.gain.setValueAtTime(0.2 * vol, t);
        gain.gain.linearRampToValueAtTime(0.001, t + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.18);
        break;
      }
    }
  },

  playTone(freq, startTime, duration, type = 'sine', gainVal = 0.25) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);
    gain.gain.setValueAtTime(gainVal, startTime);
    gain.gain.linearRampToValueAtTime(0.001, startTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration);
  }
};

// --- 3. GLOBAL HUD & MODAL CONTROLLERS ---
const CommonHUD = {
  init(activePage = '') {
    CommonAudio.init();

    // Toggle Audio
    const btnAudio = document.getElementById('btn-global-audio');
    const audioOn = document.getElementById('audio-icon-on');
    const audioOff = document.getElementById('audio-icon-off');

    const updateAudioIcon = () => {
      const isMuted = CommonState.isAudioMuted();
      if (audioOn && audioOff) {
        audioOn.style.display = isMuted ? 'none' : 'block';
        audioOff.style.display = isMuted ? 'block' : 'none';
      }
    };
    updateAudioIcon();

    if (btnAudio) {
      btnAudio.addEventListener('click', () => {
        // Buka Modal Pengaturan Audio
        const modal = document.getElementById('modal-audio-settings');
        if (modal) {
          modal.classList.add('active');
        } else {
          // Toggle Mute langsung jika tidak ada modal
          const newMuted = !CommonState.isAudioMuted();
          CommonState.setAudioMuted(newMuted);
          updateAudioIcon();
          if (!newMuted) CommonAudio.play('button');
        }
      });
    }

    // Fullscreen Toggle
    const btnFs = document.getElementById('btn-global-fullscreen');
    if (btnFs) {
      btnFs.addEventListener('click', () => {
        CommonAudio.play('click');
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          if (document.exitFullscreen) document.exitFullscreen();
        }
      });
    }

    // Modal Tim Pengembang
    const btnDevs = document.getElementById('btn-show-developers');
    const modalDevs = document.getElementById('modal-developers');
    if (btnDevs && modalDevs) {
      btnDevs.addEventListener('click', () => {
        CommonAudio.play('button');
        modalDevs.classList.add('active');
      });
    }

    // Modal Tujuan Pembelajaran
    const btnObj = document.getElementById('btn-show-objectives');
    const modalObj = document.getElementById('modal-objectives');
    if (btnObj && modalObj) {
      btnObj.addEventListener('click', () => {
        CommonAudio.play('button');
        modalObj.classList.add('active');
      });
    }

    // Tombol Close Semua Modal
    document.querySelectorAll('.btn-close-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        CommonAudio.play('click');
        document.querySelectorAll('.modal-feedback-overlay, .custom-modal-overlay').forEach(m => {
          m.classList.remove('active');
        });
      });
    });

    // Audio Settings Slider & Toggles
    const sfxCheckbox = document.getElementById('setting-sfx-toggle');
    const volSlider = document.getElementById('setting-volume-slider');

    if (sfxCheckbox) {
      sfxCheckbox.checked = !CommonState.isAudioMuted();
      sfxCheckbox.addEventListener('change', () => {
        CommonState.setAudioMuted(!sfxCheckbox.checked);
        updateAudioIcon();
        if (sfxCheckbox.checked) CommonAudio.play('click');
      });
    }

    if (volSlider) {
      volSlider.value = CommonState.getVolume() * 100;
      volSlider.addEventListener('input', () => {
        CommonState.setVolume(volSlider.value / 100);
      });
    }

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'f' || e.key === 'F') {
        const btn = document.getElementById('btn-global-fullscreen');
        if (btn) btn.click();
      } else if (e.key === 'm' || e.key === 'M') {
        const isMuted = !CommonState.isAudioMuted();
        CommonState.setAudioMuted(isMuted);
        updateAudioIcon();
        if (sfxCheckbox) sfxCheckbox.checked = !isMuted;
        if (!isMuted) CommonAudio.play('click');
      } else if (e.key === 'Escape') {
        document.querySelectorAll('.modal-feedback-overlay, .custom-modal-overlay').forEach(m => {
          m.classList.remove('active');
        });
      }
    });
  },

  navigate(url) {
    CommonAudio.play('transition');
    setTimeout(() => {
      window.location.href = url;
    }, 180);
  }
};

window.CommonState = CommonState;
window.CommonAudio = CommonAudio;
window.CommonHUD = CommonHUD;
