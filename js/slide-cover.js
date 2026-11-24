/**
 * SLIDE-COVER.JS - PLANET MISSION LAB
 * Modul untuk Slide 1 (Landing Page / Cover) & Slide 2 (Tujuan Pembelajaran)
 */

const SlideCover = (() => {
  // Inisialisasi elemen dan event listener
  function init() {
    const btnPlay = document.getElementById('btn-play-arcade');
    const btnStartToObjectives = document.getElementById('btn-start-adventure');
    const btnObjectivesToDashboard = document.getElementById('btn-objectives-next');
    const btnObjectivesBack = document.getElementById('btn-objectives-prev');

    // Klik tombol play arcade pada Cover -> Pindah ke Tujuan Pembelajaran (Slide 2)
    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        App.playSound('button');
        App.goToSlide('slide-objectives');
      });
    }

    if (btnStartToObjectives) {
      btnStartToObjectives.addEventListener('click', () => {
        App.playSound('button');
        App.goToSlide('slide-objectives');
      });
    }

    // Navigasi Slide 2 (Tujuan Pembelajaran) -> Slide 3 (Dashboard)
    if (btnObjectivesToDashboard) {
      btnObjectivesToDashboard.addEventListener('click', () => {
        App.playSound('button');
        App.goToSlide('slide-dashboard');
      });
    }

    // Navigasi Kembali dari Slide 2 -> Slide 1
    if (btnObjectivesBack) {
      btnObjectivesBack.addEventListener('click', () => {
        App.playSound('button');
        App.goToSlide('slide-cover');
      });
    }
  }

  return {
    init
  };
})();

window.SlideCover = SlideCover;
