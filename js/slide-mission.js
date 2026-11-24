/**
 * SLIDE-MISSION.JS - PLANET MISSION LAB
 * Modul untuk Slide 6: Mini Game Edukasi Mission Room
 * - Mission 1: Susun Urutan Planet dari Matahari (Interactive Drag & Click Slots)
 * - Mission 2: Tebak Planet Berdasarkan Kumpulan Karakteristik (3 Rounds)
 */

const SlideMission = (() => {
  // State Mission 1
  let m1UserSlots = new Array(9).fill(null);
  let m1Pool = [];
  let selectedPoolItem = null;

  // State Mission 2
  let m2CurrentRound = 0; // 0, 1, 2

  function init() {
    initSubTabs();
    initMission1();
    initMission2();
    initNav();
  }

  function initSubTabs() {
    const tabM1 = document.getElementById('tab-mission-1');
    const tabM2 = document.getElementById('tab-mission-2');

    if (tabM1) {
      tabM1.addEventListener('click', () => {
        App.playSound('click');
        switchMissionTab(1);
      });
    }

    if (tabM2) {
      tabM2.addEventListener('click', () => {
        App.playSound('click');
        switchMissionTab(2);
      });
    }
  }

  function switchMissionTab(tabNum) {
    const v1 = document.getElementById('subview-mission-1');
    const v2 = document.getElementById('subview-mission-2');
    const tab1 = document.getElementById('tab-mission-1');
    const tab2 = document.getElementById('tab-mission-2');

    if (tabNum === 1) {
      v1.classList.add('active');
      v2.classList.remove('active');
      tab1.classList.add('active');
      tab2.classList.remove('active');
    } else {
      v1.classList.remove('active');
      v2.classList.add('active');
      tab1.classList.remove('active');
      tab2.classList.add('active');
      renderMission2Round(m2CurrentRound);
    }
  }

  // =========================================================================
  // MISSION 1: SUSUN URUTAN PLANET
  // =========================================================================
  function initMission1() {
    resetMission1();

    const btnCheck = document.getElementById('btn-check-m1');
    if (btnCheck) {
      btnCheck.addEventListener('click', checkMission1Order);
    }

    const btnReset = document.getElementById('btn-reset-m1');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        App.playSound('click');
        resetMission1();
      });
    }
  }

  function resetMission1() {
    m1UserSlots = new Array(9).fill(null);
    selectedPoolItem = null;

    // Duplikasi data dan acak posisi awal di pool
    const correctItems = PLANET_DATA.missions.mission1.correctOrder;
    m1Pool = [...correctItems].sort(() => Math.random() - 0.5);

    renderMission1Slots();
    renderMission1Pool();
  }

  function renderMission1Slots() {
    const slotsRow = document.getElementById('mission1-slots-row');
    if (!slotsRow) return;

    slotsRow.innerHTML = '';

    m1UserSlots.forEach((item, index) => {
      const slot = document.createElement('div');
      slot.className = `mission-slot ${index === 0 ? 'slot-sun' : ''} ${item ? 'filled' : ''}`;
      slot.setAttribute('data-index', index);

      if (item) {
        slot.innerHTML = `<img src="${item.image}" alt="${item.name}" title="${item.name}">`;
        // Klik slot terisi untuk mengembalikan benda ke pool
        slot.style.cursor = 'pointer';
        slot.addEventListener('click', () => {
          App.playSound('click');
          m1Pool.push(item);
          m1UserSlots[index] = null;
          renderMission1Slots();
          renderMission1Pool();
        });
      } else {
        slot.innerHTML = `<span class="slot-question-mark">?</span>`;
        // Klik slot kosong untuk menaruh benda yang sedang dipilih
        slot.addEventListener('click', () => {
          if (selectedPoolItem) {
            App.playSound('click');
            m1UserSlots[index] = selectedPoolItem;
            m1Pool = m1Pool.filter(p => p.id !== selectedPoolItem.id);
            selectedPoolItem = null;
            renderMission1Slots();
            renderMission1Pool();

            // Auto check jika semua slot sudah terisi
            if (m1UserSlots.every(s => s !== null)) {
              setTimeout(checkMission1Order, 400);
            }
          }
        });

        // Dukungan Drag & Drop HTML5
        slot.addEventListener('dragover', (e) => e.preventDefault());
        slot.addEventListener('drop', (e) => {
          e.preventDefault();
          const itemId = e.dataTransfer.getData('text/plain');
          const droppedItem = m1Pool.find(p => p.id === itemId);
          if (droppedItem) {
            App.playSound('click');
            m1UserSlots[index] = droppedItem;
            m1Pool = m1Pool.filter(p => p.id !== itemId);
            renderMission1Slots();
            renderMission1Pool();

            if (m1UserSlots.every(s => s !== null)) {
              setTimeout(checkMission1Order, 400);
            }
          }
        });
      }

      slotsRow.appendChild(slot);
    });
  }

  function renderMission1Pool() {
    const poolRow = document.getElementById('mission1-pool-row');
    if (!poolRow) return;

    poolRow.innerHTML = '';

    if (m1Pool.length === 0) {
      poolRow.innerHTML = `<p style="font-size: 13px; color: #BAE6FD;">Semua benda telah ditempatkan! Klik "Periksa Urutan".</p>`;
      return;
    }

    m1Pool.forEach(item => {
      const el = document.createElement('div');
      el.className = `mission-pool-item ${selectedPoolItem && selectedPoolItem.id === item.id ? 'selected' : ''}`;
      el.setAttribute('draggable', 'true');
      el.innerHTML = `<img src="${item.image}" alt="${item.name}" title="Klik atau Drag: ${item.name}">`;

      // Drag support
      el.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', item.id);
      });

      // Click to select/target
      el.addEventListener('click', () => {
        App.playSound('click');
        if (selectedPoolItem && selectedPoolItem.id === item.id) {
          selectedPoolItem = null;
        } else {
          selectedPoolItem = item;
          // Cari slot kosong pertama otomatis untuk kemudahan klik
          const firstEmptyIndex = m1UserSlots.findIndex(s => s === null);
          if (firstEmptyIndex !== -1) {
            m1UserSlots[firstEmptyIndex] = item;
            m1Pool = m1Pool.filter(p => p.id !== item.id);
            selectedPoolItem = null;
            renderMission1Slots();
            renderMission1Pool();

            if (m1UserSlots.every(s => s !== null)) {
              setTimeout(checkMission1Order, 400);
            }
            return;
          }
        }
        renderMission1Pool();
      });

      poolRow.appendChild(el);
    });
  }

  function checkMission1Order() {
    const correctOrder = PLANET_DATA.missions.mission1.correctOrder;
    let isAllCorrect = true;

    for (let i = 0; i < correctOrder.length; i++) {
      if (!m1UserSlots[i] || m1UserSlots[i].id !== correctOrder[i].id) {
        isAllCorrect = false;
        break;
      }
    }

    if (isAllCorrect) {
      App.playSound('success');
      App.showFeedbackModal({
        type: 'success',
        message: 'Yeay! Urutannya sudah benar, kamu boleh menjelajah ke petualangan selanjutnya!',
        btnIcon: 'next',
        onConfirm: () => {
          App.hideFeedbackModal();
          switchMissionTab(2);
        }
      });
    } else {
      App.playSound('wrong');
      App.showFeedbackModal({
        type: 'failure',
        message: 'Jawabanmu salah, coba kembali pelajari materi sebelumnya, dan kerjakan dengan teliti',
        btnIcon: 'retry',
        onConfirm: () => {
          App.hideFeedbackModal();
          resetMission1();
        }
      });
    }
  }

  // =========================================================================
  // MISSION 2: TEBAK KARAKTERISTIK PLANET
  // =========================================================================
  function initMission2() {
    m2CurrentRound = 0;
    renderMission2Round(0);
  }

  function renderMission2Round(roundIdx) {
    const roundData = PLANET_DATA.missions.mission2Rounds[roundIdx];
    if (!roundData) return;

    const cluesList = document.getElementById('m2-clues-list');
    const optionsRow = document.getElementById('m2-options-row');

    // Render Clues
    if (cluesList) {
      cluesList.innerHTML = '';
      roundData.clues.forEach(clue => {
        const li = document.createElement('li');
        li.textContent = clue;
        cluesList.appendChild(li);
      });
    }

    // Render Options
    if (optionsRow) {
      optionsRow.innerHTML = '';
      roundData.options.forEach(opt => {
        const choice = document.createElement('div');
        choice.className = 'mission2-planet-choice';
        choice.innerHTML = `
          <img class="mission2-choice-img" src="${opt.image}" alt="${opt.name}">
          <span class="mission2-choice-name">${opt.name}</span>
        `;

        choice.addEventListener('click', () => {
          handleMission2Choice(opt.isCorrect);
        });

        optionsRow.appendChild(choice);
      });
    }
  }

  function handleMission2Choice(isCorrect) {
    if (isCorrect) {
      App.playSound('correct');
      const isLastRound = m2CurrentRound >= PLANET_DATA.missions.mission2Rounds.length - 1;

      App.showFeedbackModal({
        type: 'success',
        message: 'Yeay! Jawabanmu benar, kamu boleh menjelajah ke petualangan selanjutnya!',
        btnIcon: 'next',
        onConfirm: () => {
          App.hideFeedbackModal();
          if (!isLastRound) {
            m2CurrentRound++;
            renderMission2Round(m2CurrentRound);
          } else {
            // Selesai semua ronde Mission 2 -> Lanjut ke Quiz!
            App.goToSlide('slide-quiz');
          }
        }
      });
    } else {
      App.playSound('wrong');
      App.showFeedbackModal({
        type: 'failure',
        message: 'Jawabanmu salah, coba kembali pelajari materi sebelumnya, dan kerjakan dengan teliti',
        btnIcon: 'retry',
        onConfirm: () => {
          App.hideFeedbackModal();
        }
      });
    }
  }

  function initNav() {
    const btnNext = document.getElementById('btn-mission-next');
    const btnPrev = document.getElementById('btn-mission-prev');

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        App.playSound('button');
        App.goToSlide('slide-quiz');
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        App.playSound('button');
        App.goToSlide('slide-lab');
      });
    }
  }

  return {
    init,
    resetMission1,
    switchMissionTab
  };
})();

window.SlideMission = SlideMission;
