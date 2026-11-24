/**
 * SLIDE-LAB.JS - PLANET MISSION LAB
 * Modul untuk Slide 5: Interactive Planet Lab (Pencarian & Filter Karakteristik Planet)
 */

const SlideLab = (() => {
  // State filter terpilih
  const currentFilters = {
    size: null,        // 'Kecil', 'Sedang', 'Besar'
    satellites: null,  // 'Sedikit', 'Banyak', 'Tidak punya'
    rings: null,       // 'Ada', 'Tidak'
    group: null,       // 'Dalam', 'Luar'
    distance: null     // 'Dekat', 'Jauh'
  };

  function init() {
    initOptionPills();
    initFindButton();
    initPresets();
    initNav();
  }

  // Inisialisasi klik pada tombol opsi pill
  function initOptionPills() {
    const pills = document.querySelectorAll('.lab-option-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        const category = pill.getAttribute('data-category'); // 'size', 'satellites', etc.
        const val = pill.getAttribute('data-val');

        // Toggle aktif jika sudah dipilih sebelumnya, atau ganti
        const siblingPills = document.querySelectorAll(`.lab-option-pill[data-category="${category}"]`);
        
        if (currentFilters[category] === val) {
          // Deselect
          currentFilters[category] = null;
          pill.classList.remove('active');
        } else {
          siblingPills.forEach(p => p.classList.remove('active'));
          currentFilters[category] = val;
          pill.classList.add('active');
        }

        // Sinkronkan ke input select box (jika ada)
        const selectBox = document.querySelector(`.lab-select[data-category="${category}"]`);
        if (selectBox) {
          selectBox.value = currentFilters[category] || '';
        }

        App.playSound('click');
      });
    });

    // Support select box dropdown jika digunakan di layar kecil
    const selects = document.querySelectorAll('.lab-select');
    selects.forEach(sel => {
      sel.addEventListener('change', () => {
        const category = sel.getAttribute('data-category');
        const val = sel.value || null;
        currentFilters[category] = val;

        const siblingPills = document.querySelectorAll(`.lab-option-pill[data-category="${category}"]`);
        siblingPills.forEach(p => {
          if (p.getAttribute('data-val') === val) {
            p.classList.add('active');
          } else {
            p.classList.remove('active');
          }
        });

        App.playSound('click');
      });
    });
  }

  // Tombol "Temukan planet!"
  function initFindButton() {
    const btnFind = document.getElementById('btn-find-planet');
    if (btnFind) {
      btnFind.addEventListener('click', () => {
        App.playSound('button');
        executeFilter();
      });
    }
  }

  // Eksekusi filter dan render hasil
  function executeFilter() {
    const resultsContainer = document.getElementById('lab-results-stage');
    if (!resultsContainer) return;

    // Filter data planet
    const filtered = PLANET_DATA.labPlanets.filter(planet => {
      // Ukuran
      if (currentFilters.size) {
        const sizeMatch = planet.size === currentFilters.size || planet.sizeAlt === currentFilters.size;
        if (!sizeMatch) return false;
      }
      // Satelit
      if (currentFilters.satellites && planet.satellites !== currentFilters.satellites) {
        return false;
      }
      // Cincin
      if (currentFilters.rings && planet.rings !== currentFilters.rings) {
        return false;
      }
      // Kelompok Planet (Dalam / Luar)
      if (currentFilters.group && planet.group !== currentFilters.group) {
        return false;
      }
      // Jarak ke Matahari (Dekat / Jauh)
      if (currentFilters.distance && planet.distance !== currentFilters.distance) {
        return false;
      }
      return true;
    });

    // Render hasil
    renderResults(filtered);
  }

  function renderResults(planets) {
    const resultsContainer = document.getElementById('lab-results-stage');
    resultsContainer.innerHTML = '';

    if (planets.length === 0) {
      resultsContainer.innerHTML = `
        <div style="text-align: center; color: #FCA5A5; font-weight: 700;">
          <p style="font-size: 18px; margin-bottom: 6px;">❌ Tidak ada planet yang cocok dengan kombinasi filter ini.</p>
          <p style="font-size: 14px; color: #E2E8F0;">Coba sesuaikan pilihan kriteria atau gunakan preset guru di bawah!</p>
        </div>
      `;
      App.playSound('wrong');
      return;
    }

    App.playSound('correct');

    planets.forEach(p => {
      const card = document.createElement('div');
      card.className = 'lab-result-card';
      card.innerHTML = `
        <img class="lab-result-img" src="${p.image}" alt="${p.name}">
        <div class="lab-result-name">${p.name}</div>
      `;
      // Klik planet hasil pencarian untuk melihat detail lengkap di Explorer
      card.style.cursor = 'pointer';
      card.title = `Klik untuk pelajari materi ${p.name}`;
      card.addEventListener('click', () => {
        const idx = PLANET_DATA.bodies.findIndex(b => b.name.toLowerCase() === p.name.toLowerCase());
        if (idx !== -1) {
          App.goToSlide('slide-explorer');
          SlideExplorer.openPlanetDetail(idx);
        }
      });

      resultsContainer.appendChild(card);
    });
  }

  // Preset Demonstrasi untuk Guru di Kelas Klasikal
  function initPresets() {
    const presetChips = document.querySelectorAll('.lab-preset-chip');
    presetChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const presetKey = chip.getAttribute('data-preset');
        applyPreset(presetKey);
      });
    });
  }

  function applyPreset(presetKey) {
    // Reset filters
    Object.keys(currentFilters).forEach(k => currentFilters[k] = null);
    document.querySelectorAll('.lab-option-pill').forEach(p => p.classList.remove('active'));

    switch(presetKey) {
      case 'bumi-mars': // Slide 40-41
        setFilterValue('size', 'Sedang');
        setFilterValue('satellites', 'Sedikit');
        setFilterValue('rings', 'Tidak');
        setFilterValue('group', 'Dalam');
        setFilterValue('distance', 'Dekat');
        break;
      case 'merkurius-venus': // Slide 42-43
        setFilterValue('size', 'Kecil');
        setFilterValue('satellites', 'Tidak punya');
        setFilterValue('rings', 'Tidak');
        setFilterValue('group', 'Dalam');
        setFilterValue('distance', 'Dekat');
        break;
      case 'jupiter': // Slide 44-45
        setFilterValue('size', 'Besar');
        setFilterValue('satellites', 'Banyak');
        setFilterValue('rings', 'Tidak');
        setFilterValue('group', 'Luar');
        setFilterValue('distance', 'Jauh');
        break;
      case 'saturnus': // Slide 46-47
        setFilterValue('size', 'Besar');
        setFilterValue('satellites', 'Banyak');
        setFilterValue('rings', 'Ada');
        setFilterValue('group', 'Luar');
        setFilterValue('distance', 'Jauh');
        break;
      case 'uranus': // Slide 48-49
        setFilterValue('size', 'Sedang');
        setFilterValue('satellites', 'Banyak');
        setFilterValue('rings', 'Ada');
        setFilterValue('group', 'Luar');
        setFilterValue('distance', 'Jauh');
        break;
      case 'neptunus': // Slide 50-51
        setFilterValue('size', 'Sedang');
        setFilterValue('satellites', 'Banyak');
        setFilterValue('rings', 'Tidak');
        setFilterValue('group', 'Luar');
        setFilterValue('distance', 'Jauh');
        break;
      case 'reset':
        // Sudah direset di atas
        document.getElementById('lab-results-stage').innerHTML = '';
        return;
    }

    App.playSound('click');
    executeFilter();
  }

  function setFilterValue(category, value) {
    currentFilters[category] = value;
    const pill = document.querySelector(`.lab-option-pill[data-category="${category}"][data-val="${value}"]`);
    if (pill) {
      pill.classList.add('active');
    }
    const select = document.querySelector(`.lab-select[data-category="${category}"]`);
    if (select) {
      select.value = value;
    }
  }

  function initNav() {
    const btnNext = document.getElementById('btn-lab-next');
    const btnPrev = document.getElementById('btn-lab-prev');

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        App.playSound('button');
        App.goToSlide('slide-mission');
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        App.playSound('button');
        App.goToSlide('slide-explorer');
      });
    }
  }

  return {
    init,
    applyPreset
  };
})();

window.SlideLab = SlideLab;
