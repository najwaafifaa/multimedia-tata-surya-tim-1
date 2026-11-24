/**
 * APP.JS - PLANET MISSION LAB
 * Master State Router, Web Audio Synthesizer, & Global HUD Controller
 */

const App = (() => {
  let currentSlideId = 'slide-cover';
  let isAudioEnabled = true;
  let audioCtx = null;
  let feedbackConfirmCallback = null;

  // Inisialisasi Aplikasi Utama
  function init() {
    initAudioEngine();
    initGlobalHUD();
    initKeyboardShortcuts();
    initFeedbackModal();

    // Inisialisasi Modul per Slide
    if (window.SlideCover) SlideCover.init();
    if (window.SlideExplorer) SlideExplorer.init();
    if (window.SlideLab) SlideLab.init();
    if (window.SlideMission) SlideMission.init();
    if (window.SlideQuiz) SlideQuiz.init();

    // Tampilkan slide awal (Cover)
    goToSlide('slide-cover');
  }

  // --- 1. ROUTER / STATE SWITCHER ---
  function goToSlide(slideId) {
    const slides = document.querySelectorAll('.slide');
    let targetSlide = document.getElementById(slideId);

    if (!targetSlide) {
      console.warn(`Slide "${slideId}" not found. Falling back to slide-cover.`);
      slideId = 'slide-cover';
      targetSlide = document.getElementById('slide-cover');
    }

    slides.forEach(s => {
      s.classList.remove('active');
    });

    targetSlide.classList.add('active');
    currentSlideId = slideId;

    // Reset scroll posisi slide jika ada
    targetSlide.scrollTop = 0;

    // Update visibility tombol Home di HUD (sembunyikan di cover)
    const btnHome = document.getElementById('btn-global-home');
    if (btnHome) {
      if (slideId === 'slide-cover') {
        btnHome.style.display = 'none';
      } else {
        btnHome.style.display = 'flex';
      }
    }
  }

  // --- 2. WEB AUDIO API SYNTHESIZER (ZERO EXTERNAL FILE DEPENDENCY) ---
  function initAudioEngine() {
    // Audio context dibuat on user interaction pertama untuk mematuhi kebijakan autoplay browser
    const unlockAudio = () => {
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
    };

    document.addEventListener('click', unlockAudio);
    document.addEventListener('keydown', unlockAudio);
  }

  function playSound(type) {
    if (!isAudioEnabled) return;
    if (!audioCtx) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
      } catch (e) {
        return;
      }
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const t = audioCtx.currentTime;

    switch (type) {
      case 'click': {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, t);
        osc.frequency.exponentialRampToValueAtTime(400, t + 0.05);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.05);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(t);
        osc.stop(t + 0.05);
        break;
      }
      case 'button': {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, t); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, t + 0.08); // E5
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.09);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(t);
        osc.stop(t + 0.09);
        break;
      }
      case 'correct': {
        // Melodi sukses 2 nada C5 -> G5
        playTone(523.25, t, 0.1, 'sine');
        playTone(783.99, t + 0.1, 0.2, 'sine');
        break;
      }
      case 'wrong': {
        // Arcade low buzz
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, t);
        osc.frequency.linearRampToValueAtTime(90, t + 0.25);
        gain.gain.setValueAtTime(0.3, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.25);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(t);
        osc.stop(t + 0.25);
        break;
      }
      case 'success': {
        // Nada arpeggio kemenangan
        playTone(523.25, t, 0.08, 'triangle'); // C5
        playTone(659.25, t + 0.08, 0.08, 'triangle'); // E5
        playTone(783.99, t + 0.16, 0.08, 'triangle'); // G5
        playTone(1046.50, t + 0.24, 0.3, 'sine'); // C6
        break;
      }
      case 'fanfare': {
        // Fanfare megah
        const notes = [523.25, 659.25, 783.99, 1046.50, 880, 1046.50];
        notes.forEach((freq, idx) => {
          playTone(freq, t + (idx * 0.12), 0.2, 'triangle');
        });
        break;
      }
      case 'transition': {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, t);
        osc.frequency.exponentialRampToValueAtTime(900, t + 0.18);
        gain.gain.setValueAtTime(0.18, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.18);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(t);
        osc.stop(t + 0.18);
        break;
      }
    }
  }

  function playTone(freq, startTime, duration, type = 'sine') {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);
    gain.gain.setValueAtTime(0.22, startTime);
    gain.gain.linearRampToValueAtTime(0.01, startTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  // --- 3. GLOBAL HUD & CONTROLS ---
  function initGlobalHUD() {
    // Tombol Home
    const btnHome = document.getElementById('btn-global-home');
    if (btnHome) {
      btnHome.addEventListener('click', () => {
        playSound('button');
        goToSlide('slide-dashboard');
      });
    }

    // Tombol Mute / Audio Toggle
    const btnAudio = document.getElementById('btn-global-audio');
    const audioIconOn = document.getElementById('audio-icon-on');
    const audioIconOff = document.getElementById('audio-icon-off');

    if (btnAudio) {
      btnAudio.addEventListener('click', () => {
        isAudioEnabled = !isAudioEnabled;
        if (audioIconOn && audioIconOff) {
          audioIconOn.style.display = isAudioEnabled ? 'block' : 'none';
          audioIconOff.style.display = isAudioEnabled ? 'none' : 'block';
        }
        if (isAudioEnabled) playSound('click');
      });
    }

    // Tombol Fullscreen (Sangat penting untuk proyektor klasikal)
    const btnFullscreen = document.getElementById('btn-global-fullscreen');
    if (btnFullscreen) {
      btnFullscreen.addEventListener('click', toggleFullscreen);
    }

    // Tombol Close / Exit
    const btnExit = document.getElementById('btn-global-exit');
    if (btnExit) {
      btnExit.addEventListener('click', () => {
        playSound('button');
        if (currentSlideId !== 'slide-cover') {
          goToSlide('slide-cover');
        }
      });
    }
  }

  function toggleFullscreen() {
    playSound('click');
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  // --- 4. SHORTCUT KEYBOARD UNTUK GURU / PRESENTER ---
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'm' || e.key === 'M') {
        const btnAudio = document.getElementById('btn-global-audio');
        if (btnAudio) btnAudio.click();
      } else if (e.key === 'Escape') {
        hideFeedbackModal();
      }
    });
  }

  // --- 5. MODAL FEEDBACK DIALOG (PERSIS SLIDE 54, 56, 66, 76) ---
  function initFeedbackModal() {
    const modal = document.getElementById('modal-feedback');
    const actionBtn = document.getElementById('feedback-modal-btn');

    if (actionBtn) {
      actionBtn.addEventListener('click', () => {
        playSound('button');
        if (typeof feedbackConfirmCallback === 'function') {
          feedbackConfirmCallback();
        } else {
          hideFeedbackModal();
        }
      });
    }
  }

  function showFeedbackModal({ type, message, isQuiz = false, btnIcon = 'next', onConfirm }) {
    const modal = document.getElementById('modal-feedback');
    const badge = document.getElementById('feedback-badge-icon');
    const msgText = document.getElementById('feedback-message-text');
    const iconNext = document.getElementById('modal-icon-next');
    const iconRetry = document.getElementById('modal-icon-retry');
    const card = document.getElementById('feedback-card-container');

    if (!modal) return;

    feedbackConfirmCallback = onConfirm;

    // Styling sesuai jenis
    if (badge) {
      badge.className = `feedback-badge-icon ${type === 'success' ? 'success' : 'failure'}`;
      badge.innerHTML = type === 'success' 
        ? `<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`
        : `<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`;
    }

    if (msgText) {
      msgText.textContent = message;
    }

    // Toggle icon tombol modal
    if (btnIcon === 'retry') {
      if (iconRetry) iconRetry.style.display = 'block';
      if (iconNext) iconNext.style.display = 'none';
    } else {
      if (iconRetry) iconRetry.style.display = 'none';
      if (iconNext) iconNext.style.display = 'block';
    }

    // Jika kuis salah (Slide 66: Banner merah)
    if (isQuiz && type === 'failure') {
      card.style.background = '#DC2626';
      card.style.borderColor = '#FFFFFF';
      msgText.style.color = '#FFFFFF';
    } else if (isQuiz && type === 'success') {
      card.style.background = '#16A34A';
      card.style.borderColor = '#FFFFFF';
      msgText.style.color = '#FFFFFF';
    } else {
      card.style.background = '#FEF08A';
      card.style.borderColor = '#38BDF8';
      msgText.style.color = '#0F172A';
    }

    modal.classList.add('active');
  }

  function hideFeedbackModal() {
    const modal = document.getElementById('modal-feedback');
    if (modal) {
      modal.classList.remove('active');
    }
    feedbackConfirmCallback = null;
  }

  return {
    init,
    goToSlide,
    playSound,
    showFeedbackModal,
    hideFeedbackModal
  };
})();

// Jalankan ketika DOM siap
document.addEventListener('DOMContentLoaded', App.init);
