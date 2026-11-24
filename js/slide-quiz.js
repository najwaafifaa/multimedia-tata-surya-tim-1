/**
 * SLIDE-QUIZ.JS - PLANET MISSION LAB
 * Modul untuk Slide 7: Evaluasi Kuis Klasikal 10 Soal + Final Result Page
 */

const SlideQuiz = (() => {
  let currentQuestionIndex = 0;
  let score = 0;
  let hasAnsweredCurrent = false;

  function init() {
    initControls();
    resetQuiz();
  }

  function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    hasAnsweredCurrent = false;
    showQuizQuestionView();
    renderQuestion(0);
  }

  function initControls() {
    // Tombol Ulang Quiz di Halaman Hasil Akhir
    const btnRetry = document.getElementById('btn-quiz-retry');
    if (btnRetry) {
      btnRetry.addEventListener('click', () => {
        App.playSound('button');
        resetQuiz();
      });
    }

    // Tombol Halaman Utama di Hasil Akhir
    const btnHome = document.getElementById('btn-quiz-home');
    if (btnHome) {
      btnHome.addEventListener('click', () => {
        App.playSound('button');
        App.goToSlide('slide-dashboard');
      });
    }

    // Tombol Nav Prev di Kuis
    const btnPrev = document.getElementById('btn-quiz-prev');
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        App.playSound('click');
        if (currentQuestionIndex > 0) {
          currentQuestionIndex--;
          renderQuestion(currentQuestionIndex);
        } else {
          App.goToSlide('slide-mission');
        }
      });
    }
  }

  function showQuizQuestionView() {
    const qView = document.getElementById('quiz-questions-view');
    const rView = document.getElementById('quiz-result-view');
    if (qView) qView.style.display = 'flex';
    if (rView) rView.classList.remove('active');
  }

  function showQuizResultView() {
    const qView = document.getElementById('quiz-questions-view');
    const rView = document.getElementById('quiz-result-view');
    if (qView) qView.style.display = 'none';
    if (rView) rView.classList.add('active');

    const scoreDigits = document.getElementById('result-score-digits');
    if (scoreDigits) {
      scoreDigits.textContent = `${score}/10`;
    }

    App.playSound('fanfare');
  }

  function renderQuestion(index) {
    const questions = PLANET_DATA.quizQuestions;
    const qData = questions[index];
    if (!qData) return;

    hasAnsweredCurrent = false;

    const numBadge = document.getElementById('quiz-number-badge');
    const qText = document.getElementById('quiz-question-text');
    const optionsContainer = document.getElementById('quiz-options-list');

    if (numBadge) numBadge.textContent = qData.id;
    if (qText) qText.textContent = qData.question;

    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      qData.options.forEach((optText, optIndex) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.textContent = optText;

        btn.addEventListener('click', () => {
          if (hasAnsweredCurrent) return;
          hasAnsweredCurrent = true;
          handleAnswerSelect(optIndex, qData.correctIndex);
        });

        optionsContainer.appendChild(btn);
      });
    }
  }

  function handleAnswerSelect(selectedIndex, correctIndex) {
    const isCorrect = selectedIndex === correctIndex;
    const isLastQuestion = currentQuestionIndex >= PLANET_DATA.quizQuestions.length - 1;

    if (isCorrect) {
      score++;
      App.playSound('correct');
      App.showFeedbackModal({
        type: 'success',
        isQuiz: true,
        message: 'Jawabanmu benar!',
        btnIcon: 'next',
        onConfirm: () => {
          App.hideFeedbackModal();
          proceedNextQuestion(isLastQuestion);
        }
      });
    } else {
      App.playSound('wrong');
      App.showFeedbackModal({
        type: 'failure',
        isQuiz: true,
        message: 'Jawabanmu salah!',
        btnIcon: 'next',
        onConfirm: () => {
          App.hideFeedbackModal();
          proceedNextQuestion(isLastQuestion);
        }
      });
    }
  }

  function proceedNextQuestion(isLastQuestion) {
    if (!isLastQuestion) {
      currentQuestionIndex++;
      renderQuestion(currentQuestionIndex);
    } else {
      showQuizResultView();
    }
  }

  return {
    init,
    resetQuiz
  };
})();

window.SlideQuiz = SlideQuiz;
