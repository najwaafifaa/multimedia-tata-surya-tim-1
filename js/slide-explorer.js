/**
 * SLIDE-EXPLORER.JS - PLANET MISSION LAB
 * Modul untuk Slide 3 (Dashboard Navigasi) & Slide 4 (Planet Explorer Materi Interaktif)
 */

const SlideExplorer = (() => {
  let currentPlanetIndex = 0; // 0 = Matahari, 1 = Merkurius, ..., 8 = Neptunus
  let currentSubview = 'overview'; // 'overview', 'orbit-map', 'detail', 'dalam-luar'

  // Daftar urutan benda antariksa untuk navigasi slider
  const explorerBodies = PLANET_DATA.bodies.filter(b => b.id !== 'sabuk-asteroid');

  function init() {
    initDashboard();
    initExplorerTabs();
    initOrbitMap();
    initDetailControls();
    renderPlanetDetail(0);
  }

  // --- 1. INISIALISASI DASHBOARD NAVIGASI (SLIDE 3) ---
  function initDashboard() {
    const modules = document.querySelectorAll('.module-card');
    modules.forEach(card => {
      card.addEventListener('click', () => {
        const target = card.getAttribute('data-target');
        App.playSound('transition');
        App.goToSlide(target);
      });
    });
  }

  // --- 2. SUBVIEW SWITCHER DALAM SLIDE 4 (PLANET EXPLORER) ---
  function initExplorerTabs() {
    const tabBtns = document.querySelectorAll('.explorer-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        App.playSound('click');
        switchSubview(view);
      });
    });

    // Tombol "Misi selanjutnya" dari overview -> Peta Orbit
    const btnOverviewNext = document.getElementById('btn-overview-next');
    if (btnOverviewNext) {
      btnOverviewNext.addEventListener('click', () => {
        App.playSound('button');
        switchSubview('orbit-map');
      });
    }

    // Tombol dari Ringkasan Dalam & Luar -> Dashboard atau Lab
    const btnDalamLuarNext = document.getElementById('btn-dalam-luar-next');
    if (btnDalamLuarNext) {
      btnDalamLuarNext.addEventListener('click', () => {
        App.playSound('button');
        App.goToSlide('slide-lab');
      });
    }

    const btnDalamLuarPrev = document.getElementById('btn-dalam-luar-prev');
    if (btnDalamLuarPrev) {
      btnDalamLuarPrev.addEventListener('click', () => {
        App.playSound('button');
        switchSubview('detail');
        renderPlanetDetail(explorerBodies.length - 1);
      });
    }
  }

  function switchSubview(viewName) {
    currentSubview = viewName;
    const subviews = document.querySelectorAll('.explorer-subview');
    subviews.forEach(view => {
      if (view.id === `subview-${viewName}`) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    const tabBtns = document.querySelectorAll('.explorer-tab-btn');
    tabBtns.forEach(btn => {
      if (btn.getAttribute('data-view') === viewName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // --- 3. PETA ORBIT TATA SURYA INTERAKTIF ---
  function initOrbitMap() {
    const sunEl = document.getElementById('orbit-sun');
    if (sunEl) {
      sunEl.addEventListener('click', () => {
        App.playSound('click');
        openPlanetDetail(0);
      });
    }

    const planetPins = document.querySelectorAll('.orbit-map-planet-item');
    planetPins.forEach(item => {
      item.addEventListener('click', () => {
        const planetId = item.getAttribute('data-planet');
        const idx = explorerBodies.findIndex(b => b.id === planetId);
        if (idx !== -1) {
          App.playSound('click');
          openPlanetDetail(idx);
        }
      });
    });

    const asteroidBelt = document.getElementById('orbit-asteroid-belt');
    if (asteroidBelt) {
      asteroidBelt.addEventListener('click', () => {
        App.playSound('click');
        switchSubview('dalam-luar');
      });
    }
  }

  function openPlanetDetail(index) {
    currentPlanetIndex = index;
    renderPlanetDetail(index);
    switchSubview('detail');
  }

  // --- 4. DETAIL KARTU MATERI PLANET (SLIDER PREV / NEXT) ---
  function initDetailControls() {
    const btnPrev = document.getElementById('btn-planet-prev');
    const btnNext = document.getElementById('btn-planet-next');

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        App.playSound('click');
        if (currentPlanetIndex > 0) {
          currentPlanetIndex--;
          renderPlanetDetail(currentPlanetIndex);
        } else {
          switchSubview('orbit-map');
        }
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        App.playSound('click');
        if (currentPlanetIndex < explorerBodies.length - 1) {
          currentPlanetIndex++;
          renderPlanetDetail(currentPlanetIndex);
        } else {
          // Setelah Neptunus -> Masuk ke Ringkasan Planet Dalam & Luar
          switchSubview('dalam-luar');
        }
      });
    }
  }

  function renderPlanetDetail(index) {
    const planet = explorerBodies[index];
    if (!planet) return;

    const numEl = document.getElementById('detail-number');
    const nameEl = document.getElementById('detail-name');
    const summaryEl = document.getElementById('detail-summary');
    const textEl = document.getElementById('detail-body-text');
    const imgEl = document.getElementById('detail-planet-img');
    const metaGrid = document.getElementById('detail-meta-grid');
    const labelPrev = document.getElementById('label-planet-prev');
    const labelNext = document.getElementById('label-planet-next');

    if (numEl) {
      numEl.textContent = planet.number === 0 ? "★" : planet.number;
    }
    if (nameEl) {
      nameEl.textContent = planet.name;
    }
    if (summaryEl) {
      summaryEl.textContent = planet.summary;
    }
    if (textEl) {
      textEl.textContent = planet.description;
    }
    if (imgEl) {
      imgEl.src = planet.image;
      imgEl.alt = planet.name;
    }

    // Render metadata tabel
    if (metaGrid) {
      if (planet.id === 'matahari') {
        metaGrid.innerHTML = `
          <div class="planet-meta-item"><strong>Jenis:</strong> ${planet.type}</div>
          <div class="planet-meta-item"><strong>Diameter:</strong> ${planet.diameter}</div>
          <div class="planet-meta-item"><strong>Suhu Permukaan:</strong> ${planet.surfaceTemp}</div>
          <div class="planet-meta-item"><strong>Kala Rotasi:</strong> ${planet.rotation}</div>
        `;
      } else {
        metaGrid.innerHTML = `
          <div class="planet-meta-item"><strong>Kelompok:</strong> ${planet.group}</div>
          <div class="planet-meta-item"><strong>Jarak ke Matahari:</strong> ${planet.distance}</div>
          <div class="planet-meta-item"><strong>Kala Revolusi:</strong> ${planet.revolution}</div>
          <div class="planet-meta-item"><strong>Kala Rotasi:</strong> ${planet.rotation}</div>
          <div class="planet-meta-item"><strong>Satelit:</strong> ${planet.satellites} (${planet.satelliteList})</div>
          <div class="planet-meta-item"><strong>Cincin:</strong> ${planet.rings ? 'Ada' : 'Tidak Ada'}</div>
        `;
      }
    }

    // Update Label Prev / Next
    if (labelPrev) {
      if (index === 0) {
        labelPrev.textContent = "Peta Tata Surya";
      } else {
        labelPrev.textContent = `Planet sebelumnya (${explorerBodies[index - 1].name})`;
      }
    }

    if (labelNext) {
      if (index === explorerBodies.length - 1) {
        labelNext.textContent = "Planet Dalam & Luar";
      } else {
        labelNext.textContent = `Planet setelahnya (${explorerBodies[index + 1].name})`;
      }
    }
  }

  return {
    init,
    openPlanetDetail,
    switchSubview
  };
})();

window.SlideExplorer = SlideExplorer;
