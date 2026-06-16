const app = document.getElementById("app");

/* =========================
   КАРТИНКИ
========================= */

const ASSETS = {
  start: "fon/fon_start.png",
  map: "fon/NEW_FON_KARTA.png",
  heroSelect: "fon/fon_vubir_heroiv.png",

  level1: "fon/fon_book.png",
  level2: "fon/fon_forest.png",
  level3: "fon/fon_ozero.png",
  level4: "fon/fon_kajjian.png",
  level5: "fon/fon_vylkan.png",
  citadel: "fon/Fon_mordor_1.png",

  boy: "geroi/boy.png",
  girl: "geroi/diva.png",

  totus: "geroi/nastavnuk_sova.png",
  foxita: "geroi/nastavnuk_fox.png",
  nereus: "geroi/nastavnuk_som.png",
  anubisa: "geroi/nastavnuk_kajjian.png",
  tifon: "geroi/nastavnuk_drakon.png",
  mordor: "geroi/mordor.png",
  raif: "geroi/raif.png",

  book: "artefaktu/artefakt_knuga.png",
  lupa: "artefaktu/artefakt_lupa.png",
  mirror: "artefaktu/artefakt_dzerkalo.png",
  sphere: "artefaktu/artefakt_sfera.png",
  sword: "artefaktu/artefakt_mech.png",

  yellowCrystal: "artefaktu/yellow_kristal.png",
  greenCrystal: "artefaktu/green_kristal.png",
  blueCrystal: "artefaktu/blue_kristal.png",
  pinkCrystal: "artefaktu/pink_kristal.png",
  redCrystal: "artefaktu/red_kristal.png",
  purpleCrystal: "artefaktu/purple_kristal.png",

  logo: "artefaktu/logo_game.png",
  medalions: "artefaktu/medaliony.png"
};

/* =========================
   СТАН ГРИ
========================= */

let selectedHero = "boy";
let heroName = "";
let theoryRead = {};
let completedTasks = {};
let completedLevels = [];

/* =========================
   РІВНІ
========================= */

const LEVELS = [
  {
    id: 1,
    title: "Бібліотека Знань",
    mentor: "Тотус",
    bg: ASSETS.level1,
    mentorImg: ASSETS.totus,
    artifact: ASSETS.book,
    artifactName: "Книга знань",
    crystal: ASSETS.yellowCrystal,
    color: "#ffd54a",
    theory: [
      "Пароль — це ключ до твого цифрового замку.",
      "Надійний пароль має бути довгим, складним і різним для різних сайтів.",
      "Не використовуй дату народження, ім’я або прості комбінації.",
      "Нікому не передавай свій пароль."
    ]
  },
  {
    id: 2,
    title: "Ліс Приманок",
    mentor: "Фоксіта",
    bg: ASSETS.level2,
    mentorImg: ASSETS.foxita,
    artifact: ASSETS.lupa,
    artifactName: "Лупа істини",
    crystal: ASSETS.greenCrystal,
    color: "#4ee86b",
    theory: [
      "Фішинг — це пастка, коли шахраї хочуть виманити пароль або дані.",
      "Перед натисканням на посилання перевір адресу сайту.",
      "Не довіряй повідомленням, які лякають або дуже поспішають.",
      "Якщо сумніваєшся — запитай дорослого."
    ]
  },
  {
    id: 3,
    title: "Озеро Фейків",
    mentor: "Нереус",
    bg: ASSETS.level3,
    mentorImg: ASSETS.nereus,
    artifact: ASSETS.mirror,
    artifactName: "Дзеркало правди",
    crystal: ASSETS.blueCrystal,
    color: "#39b7ff",
    theory: [
      "Фейк — це неправдива або перекручена інформація.",
      "Не все, що написано в інтернеті, є правдою.",
      "Перевіряй джерело, дату, автора та інші підтвердження.",
      "Якщо новина дуже емоційна — спочатку перевір її."
    ]
  },
  {
    id: 4,
    title: "Печера Даних",
    mentor: "Анубіса",
    bg: ASSETS.level4,
    mentorImg: ASSETS.anubisa,
    artifact: ASSETS.sphere,
    artifactName: "Сфера даних",
    crystal: ASSETS.pinkCrystal,
    color: "#ff78d7",
    theory: [
      "Особисті дані — це інформація, за якою можна впізнати людину.",
      "Адреса, номер телефону, паролі й фото документів треба берегти.",
      "Не публікуй особисті дані у відкритому доступі.",
      "Перед тим як щось відправити, подумай: хто це побачить."
    ]
  },
  {
    id: 5,
    title: "Фортеця Захисту",
    mentor: "Тіфон",
    bg: ASSETS.level5,
    mentorImg: ASSETS.tifon,
    artifact: ASSETS.sword,
    artifactName: "Меч захисту",
    crystal: ASSETS.redCrystal,
    color: "#ff4a35",
    theory: [
      "Віруси можуть потрапити на пристрій через підозрілі файли або посилання.",
      "Не відкривай файли від незнайомих людей.",
      "Оновлення допомагають захищати пристрій.",
      "Якщо файл дивний — не відкривай його і звернись до дорослого."
    ]
  }
];

/* =========================
   ЗАВДАННЯ
========================= */

const TASKS = {
  1: [
    { q: "Який пароль найнадійніший?", a: ["123456", "qwerty", "Kiber!2026_Legend"], c: 2 },
    { q: "Чи можна ділитися паролем?", a: ["Так", "Ні", "Тільки з другом"], c: 1 },
    { q: "Що краще захищає акаунт?", a: ["Один пароль всюди", "Двофакторна автентифікація", "Пароль у нотатках"], c: 1 },
    { q: "Що не варто використовувати як пароль?", a: ["Ім’я і дату народження", "Довгу фразу", "Символи й цифри"], c: 0 }
  ],
  2: [
    { q: "Що зробити перед переходом за посиланням?", a: ["Перевірити адресу", "Натиснути одразу", "Скинути друзям"], c: 0 },
    { q: "Фішинг — це коли...", a: ["Шахраї виманюють дані", "Оновлюється гра", "Змінюється фон"], c: 0 },
    { q: "Підозрілий лист просить пароль. Що робити?", a: ["Ввести пароль", "Повідомити дорослим", "Переслати всім"], c: 1 },
    { q: "Ознака шахрайства:", a: ["Помилки в тексті", "Терміновий тиск", "Обидва варіанти"], c: 2 }
  ],
  3: [
    { q: "Що зробити з гучною новиною?", a: ["Одразу поширити", "Перевірити джерело", "Повірити заголовку"], c: 1 },
    { q: "Фейк — це...", a: ["Неправдива інформація", "Корисна підказка", "Сильний пароль"], c: 0 },
    { q: "Якому джерелу краще довіряти?", a: ["Анонімному чату", "Офіційному сайту", "Невідомому скріну"], c: 1 },
    { q: "Якщо інформація викликає сумнів:", a: ["Перевірити в кількох джерелах", "Повірити одразу", "Поширити швидше"], c: 0 }
  ],
  4: [
    { q: "Які дані не можна публікувати відкрито?", a: ["Адресу і телефон", "Улюблений колір", "Назву гри"], c: 0 },
    { q: "Особиста інформація — це...", a: ["Дані про людину", "Назва рівня", "Колір кнопки"], c: 0 },
    { q: "Що робити з фото документів?", a: ["Публікувати всюди", "Зберігати обережно", "Кидати в чат"], c: 1 },
    { q: "Чому важливо берегти дані?", a: ["Щоб шахраї їх не використали", "Бо так красивіше", "Щоб було більше файлів"], c: 0 }
  ],
  5: [
    { q: "Що робити з підозрілим файлом?", a: ["Відкрити", "Не відкривати", "Запустити одразу"], c: 1 },
    { q: "Навіщо оновлювати пристрій?", a: ["Для захисту", "Щоб було повільніше", "Щоб зник інтернет"], c: 0 },
    { q: "Антивірус допомагає...", a: ["Захищати пристрій", "Створювати фейки", "Ламати пароль"], c: 0 },
    { q: "Як діяти, якщо файл дивний?", a: ["Порадитись з дорослим", "Відкрити", "Надіслати всім"], c: 0 }
  ]
};

/* =========================
   ДОПОМІЖНЕ
========================= */

function bg(img) {
  return `style="--bg:url('${img}')"`;
}

function getHeroImage() {
  return selectedHero === "girl" ? ASSETS.girl : ASSETS.boy;
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.remove();
}

/* =========================
   СТАРТ
========================= */

function showStartScreen() {
  app.innerHTML = `
    <section class="screen" ${bg(ASSETS.start)}>
      <div class="main-menu">
        <button class="btn" onclick="showMap()">Почати пригоду</button>
        <button class="btn" onclick="openGameStory()">Історія</button>
        <button class="btn" onclick="openSettings()">Налаштування</button>
      </div>
    </section>
  `;
}

/* =========================
   КАРТА
========================= */

function showMap() {
  app.innerHTML = `
    <section class="screen map-screen" ${bg(ASSETS.map)}>
      <img class="game-logo" src="${ASSETS.logo}" alt="Cyber Legends">

      <button class="btn back-btn" onclick="showStartScreen()">← Назад</button>

      <button class="btn hero-map-btn" onclick="showHeroSelect()">
        ${heroName ? "Герой: " + heroName : "Створити героя"}
      </button>

      ${renderMapLevelButtons()}

      ${completedLevels.length >= 5 ? "" : `<div class="digital-storm"></div>`}
    </section>
  `;
}

function renderMapLevelButtons() {
  const positions = [
    { cls: "library", id: 1 },
    { cls: "forest", id: 2 },
    { cls: "lake", id: 3 },
    { cls: "cave", id: 4 },
    { cls: "fortress", id: 5 }
  ];

  let html = "";

  positions.forEach(p => {
    const level = LEVELS.find(l => l.id === p.id);
    const done = completedLevels.includes(level.id);

    html += `
      <button class="map-level ${p.cls} ${done ? "done" : ""}" onclick="showLevel(${level.id})">
        <img src="${level.crystal}" alt="${level.title}">
        <span>${level.title}</span>
        ${done ? "<b>✓</b>" : ""}
      </button>
    `;
  });

  const finalOpen = completedLevels.length >= 5;

  html += `
    <button class="map-level citadel ${finalOpen ? "done" : "locked"}" onclick="${finalOpen ? "showCitadel()" : "citadelLocked()"}">
      <img src="${ASSETS.purpleCrystal}" alt="Цитадель">
      <span>Цитадель</span>
      ${finalOpen ? "<b>✓</b>" : "<b>🔒</b>"}
    </button>
  `;

  return html;
}

/* =========================
   ГЕРОЙ
========================= */

function showHeroSelect() {
  app.innerHTML = `
    <section class="screen hero-select-screen" ${bg(ASSETS.heroSelect)}>
      <button class="btn back-btn" onclick="showMap()">← Назад</button>

      <h1 class="hero-title">Вибери героя для проходження пригоди</h1>

      <div class="mentor-medals">
        ${LEVELS.map(l => `
          <button onclick="openMentorInfo(${l.id})">
            <img src="${l.mentorImg}">
          </button>
        `).join("")}
        <button onclick="openRaifInfo()">
          <img src="${ASSETS.raif}">
        </button>
      </div>

      <img class="hero-choice hero-boy" src="${ASSETS.boy}" onclick="chooseHero('boy')">
      <img class="hero-choice hero-girl" src="${ASSETS.girl}" onclick="chooseHero('girl')">

      <img class="selected-preview" id="heroPreview" src="${getHeroImage()}">

      <input id="heroNameInput" class="hero-name-input" placeholder="Введи ім’я героя" value="${heroName}">

      <button class="btn create-final-btn" onclick="createHero()">Створити героя</button>
    </section>
  `;
}

function chooseHero(type) {
  selectedHero = type;
  document.getElementById("heroPreview").src = getHeroImage();
}

function createHero() {
  const input = document.getElementById("heroNameInput");
  heroName = input.value.trim();

  if (!heroName) {
    openSimpleModal("Введи ім’я героя", "Спочатку напиши ім’я героя.");
    return;
  }

  const greeting = selectedHero === "girl"
    ? `Вітаю тебе, красуне ${heroName}!`
    : `Вітаю тебе, юначе ${heroName}!`;

  openSimpleModal("Героя створено!", `${greeting}<br><br>Попереду велика пригода.`);
}

/* =========================
   РІВЕНЬ
========================= */

function showLevel(levelId) {
  const level = LEVELS.find(l => l.id === levelId);
  const done = completedTasks[levelId] || [];
  const progress = done.length * 25;
  const theoryDone = theoryRead[levelId];

  app.innerHTML = `
    <section class="screen level-screen" ${bg(level.bg)}>
      <button class="btn back-btn" onclick="showMap()">← До карти</button>

      <div class="level-progress" style="--level-color:${level.color}">
        <b>${level.title}</b>
        <span>Кристал заряджено: ${progress}%</span>
        <div class="progress-bar">
          <div class="progress-fill" style="width:${progress}%"></div>
        </div>
      </div>

      <img class="chosen-hero-small" src="${getHeroImage()}" alt="Герой">

      <img class="level-mentor" src="${level.mentorImg}" onclick="openTheory(${levelId})">

      ${
        theoryDone
          ? `<button class="btn level-action-btn" onclick="openChallenge(${levelId})">Почати випробування</button>`
          : `<button class="btn level-action-btn" onclick="openTheory(${levelId})">Натисни на наставника</button>`
      }
    </section>
  `;
}

function openTheory(levelId) {
  const level = LEVELS.find(l => l.id === levelId);

  app.innerHTML += `
    <div class="modal-bg" id="modal">
      <div class="modal">
        <button class="close-modal" onclick="closeModal()">×</button>

        <img class="modal-character" src="${level.mentorImg}" alt="${level.mentor}">

        <div class="modal-content">
          <h2>${level.mentor}: теорія</h2>
          <p><b>${level.title}</b></p>
          <ol>
            ${level.theory.map(t => `<li>${t}</li>`).join("")}
          </ol>

          <button class="btn" onclick="finishTheory(${levelId})">
            Я зрозумів / зрозуміла
          </button>
        </div>
      </div>
    </div>
  `;
}

function finishTheory(levelId) {
  theoryRead[levelId] = true;
  closeModal();
  showLevel(levelId);
}

/* =========================
   ВИПРОБУВАННЯ
========================= */

function openChallenge(levelId) {
  const level = LEVELS.find(l => l.id === levelId);
  const done = completedTasks[levelId] || [];

  app.innerHTML += `
    <div class="modal-bg" id="modal">
      <div class="modal">
        <button class="close-modal" onclick="closeModal()">×</button>

        <img class="modal-artifact" src="${level.artifact}" alt="${level.artifactName}">

        <div class="modal-content">
          <h2>Випробування: ${level.artifactName}</h2>
          <p>Виконай 4 завдання, щоб зарядити кристал на 100%.</p>

          <div class="artifact-grid">
            ${TASKS[levelId].map((task, index) => `
              <button class="artifact-task" onclick="openTask(${levelId}, ${index})">
                <img src="${level.artifact}">
                <b>Завдання ${index + 1}</b>
                <span>${done.includes(index) ? "✅ виконано" : "почати"}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
}

function openTask(levelId, taskIndex) {
  const level = LEVELS.find(l => l.id === levelId);
  const task = TASKS[levelId][taskIndex];

  closeModal();

  app.innerHTML += `
    <div class="modal-bg" id="modal">
      <div class="modal">
        <button class="close-modal" onclick="closeModal()">×</button>

        <img class="modal-artifact" src="${level.artifact}" alt="${level.artifactName}">

        <div class="modal-content">
          <h2>${level.mentor}: завдання ${taskIndex + 1}</h2>
          <p><b>${task.q}</b></p>

          ${task.a.map((answer, index) => `
            <button class="answer-btn" onclick="checkAnswer(${levelId}, ${taskIndex}, ${index})">
              ${answer}
            </button>
          `).join("")}

          <p id="result"></p>
        </div>
      </div>
    </div>
  `;
}

function checkAnswer(levelId, taskIndex, answerIndex) {
  const task = TASKS[levelId][taskIndex];
  const level = LEVELS.find(l => l.id === levelId);

  if (answerIndex !== task.c) {
    document.getElementById("result").innerHTML = "❌ Спробуй ще раз. Подумай уважніше.";
    return;
  }

  if (!completedTasks[levelId]) completedTasks[levelId] = [];

  if (!completedTasks[levelId].includes(taskIndex)) {
    completedTasks[levelId].push(taskIndex);
  }

  const progress = completedTasks[levelId].length * 25;

  if (progress >= 100) {
    if (!completedLevels.includes(levelId)) {
      completedLevels.push(levelId);
    }

    closeModal();
    openVictoryScroll(levelId);
  } else {
    document.getElementById("result").innerHTML = `
      ✅ Правильно! Кристал заряджено на ${progress}%.<br><br>
      <button class="btn" onclick="closeModal(); showLevel(${levelId}); openChallenge(${levelId});">
        До наступного завдання
      </button>
    `;
  }
}

/* =========================
   СУВІЙ ПЕРЕМОГИ
========================= */

function openVictoryScroll(levelId) {
  const level = LEVELS.find(l => l.id === levelId);

  app.innerHTML += `
    <div class="modal-bg" id="modal">
      <div class="victory-scroll">
        <h2>Вітаємо!</h2>

        <p>
          Ти успішно пройшов / пройшла випробування наставника
          <b>${level.mentor}</b>.
        </p>

        <img src="${level.artifact}" alt="${level.artifactName}">

        <p>
          Ти здобув / здобула артефакт:
          <br>
          <b>${level.artifactName}</b>
        </p>

        <p>
          Сила кристала повернулася до Королівства КіберЛегенд.
        </p>

        <button class="btn" onclick="closeModal(); showMap();">
          Продовжити подорож
        </button>
      </div>
    </div>
  `;
}

/* =========================
   ФІНАЛ
========================= */

function citadelLocked() {
  openSimpleModal(
    "Цитадель ще закрита",
    "Спочатку заряди всі 5 кристалів і збери артефакти наставників."
  );
}

function showCitadel() {
  app.innerHTML = `
    <section class="screen" ${bg(ASSETS.citadel)}>
      <button class="btn back-btn" onclick="showMap()">← До карти</button>
      <button class="btn level-action-btn" onclick="openFinalBattle()">Визволити Райфіка</button>
    </section>
  `;
}

function openFinalBattle() {
  app.innerHTML += `
    <div class="modal-bg" id="modal">
      <div class="modal">
        <button class="close-modal" onclick="closeModal()">×</button>

        <img class="modal-character" src="${ASSETS.mordor}" alt="Мордер">

        <div class="modal-content">
          <h2>Фінальне випробування</h2>
          <p>Мордер сховав Райфіка. Щоб зруйнувати Маску Обману, дай правильну відповідь.</p>

          <p><b>Що робити, якщо отримав підозріле посилання?</b></p>

          <button class="answer-btn" onclick="winGame()">Перевірити відправника і не вводити пароль</button>
          <button class="answer-btn" onclick="wrongFinal()">Одразу натиснути</button>
          <button class="answer-btn" onclick="wrongFinal()">Ввести пароль</button>

          <p id="result"></p>
        </div>
      </div>
    </div>
  `;
}

function wrongFinal() {
  document.getElementById("result").innerHTML = "❌ Мордер майже тебе обманув. Спробуй ще раз.";
}

function winGame() {
  document.getElementById("result").innerHTML = `
    ✅ Маску Обману зруйновано!<br><br>
    Райфік вільний, а цифрова гроза над Королівством зникає.<br><br>
    <button class="btn" onclick="showMap()">Повернутися до Королівства</button>
  `;
}

/* =========================
   ІСТОРІЇ
========================= */

function openMentorInfo(levelId) {
  const level = LEVELS.find(l => l.id === levelId);

  openSimpleModal(
    level.mentor,
    `<img class="story-img" src="${level.mentorImg}">
    <br><br>
    Наставник локації <b>${level.title}</b> допомагає героям здобути артефакт:
    <b>${level.artifactName}</b>.`
  );
}

function openRaifInfo() {
  openSimpleModal(
    "Райфік",
    `<img class="story-img" src="${ASSETS.raif}">
    <br><br>
    Райфік — вірний кінь Королівства. Мордер хоче захопити його силу, але герой має врятувати Райфіка.`
  );
}

function openGameStory() {
  openSimpleModal(
    "Cyber Legends: Таємниця П'яти Кристалів",
    "Мордер накрив Королівство цифровою грозою. Щоб її зупинити, герой має пройти 5 локацій, здобути артефакти наставників і зарядити кристали."
  );
}

function openSettings() {
  openSimpleModal(
    "Налаштування",
    "Тут пізніше можна буде додати музику, озвучку та підказки."
  );
}

function openSimpleModal(title, text) {
  app.innerHTML += `
    <div class="modal-bg" id="modal">
      <div class="modal simple-modal">
        <button class="close-modal" onclick="closeModal()">×</button>
        <div class="modal-content">
          <h2>${title}</h2>
          <p>${text}</p>
        </div>
      </div>
    </div>
  `;
}

/* =========================
   ЗАПУСК
========================= */

showStartScreen();
