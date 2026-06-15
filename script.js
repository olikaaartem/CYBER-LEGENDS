const app = document.getElementById("app");

/* ======================================
   ШЛЯХИ ДО ФАЙЛІВ GITHUB
====================================== */

const ASSETS = {

  /* ФОНИ */

  start: "fon/fon_start.png",
  map: "fon/fon_karta_1.png",
  heroSelect: "fon/fon_vubir_heroiv.png",

  level1: "fon/fon_book.png",
  level2: "fon/fon_forest.png",
  level3: "fon/fon_ozero.png",
  level4: "fon/fon_kajjian.png",
  level5: "fon/fon_vylkan.png",

  mordor: "fon/Fon_mordor_1.png",

  /* ГЕРОЇ */

  boy: "geroi/boy.png",
  girl: "geroi/diva.png",

  /* НАСТАВНИКИ */

  totus: "geroi/nastavnuk_sova.png",
  foxita: "geroi/nastavnuk_fox.png",
  nereus: "geroi/nastavnuk_som.png",
  anubisa: "geroi/nastavnuk_kajjian.png",
  tifon: "geroi/nastavnuk_drakon.png",

  mordorHero: "geroi/mordor.png",
  raifik: "geroi/raif.png",

  /* КАРТКИ */

  cardTotus: "Kartka_nastavnuka/kartka_totus.png",
  cardFoxita: "Kartka_nastavnuka/kartka_foxita.png",
  cardNereus: "Kartka_nastavnuka/kartka_nereys.png",
  cardAnubisa: "Kartka_nastavnuka/kartka_anybisa.png",
  cardTifon: "Kartka_nastavnuka/kartka_tifon.png",

  cardRaifik: "Kartka_nastavnuka/kartka_raif.png",
  cardMordor: "Kartka_nastavnuka/kartka_mordor.png"
};

let selectedHero = "boy";
let heroName = "";

/* ======================================
   РІВНІ
====================================== */

const LEVELS = [
{
  id:1,
  title:"Замок Паролів",
  mentor:"Тотус",
  bg:ASSETS.level1,
  mentorImage:ASSETS.totus,
  card:ASSETS.cardTotus,
  crystal:"yellow"
},
{
  id:2,
  title:"Ліс Приманок",
  mentor:"Фоксіта",
  bg:ASSETS.level2,
  mentorImage:ASSETS.foxita,
  card:ASSETS.cardFoxita,
  crystal:"green"
},
{
  id:3,
  title:"Озеро Фейків",
  mentor:"Нереус",
  bg:ASSETS.level3,
  mentorImage:ASSETS.nereus,
  card:ASSETS.cardNereus,
  crystal:"blue"
},
{
  id:4,
  title:"Печера Даних",
  mentor:"Анубіса",
  bg:ASSETS.level4,
  mentorImage:ASSETS.anubisa,
  card:ASSETS.cardAnubisa,
  crystal:"pink"
},
{
  id:5,
  title:"Фортеця Вірусів",
  mentor:"Тіфон",
  bg:ASSETS.level5,
  mentorImage:ASSETS.tifon,
  card:ASSETS.cardTifon,
  crystal:"red"
}
];
/* ======================================
   АРТЕФАКТИ
====================================== */

ASSETS.book = "artefaktu/artefakt_knuga.png";
ASSETS.lupa = "artefaktu/artefakt_lupa.png";
ASSETS.mirror = "artefaktu/artefakt_dzerkalo.png";
ASSETS.sphere = "artefaktu/artefakt_sfera.png";
ASSETS.sword = "artefaktu/artefakt_mech.png";

/* ======================================
   СТАН ГРИ
====================================== */

const GAME = {
  currentLevel: null,
  completedLevels: [],
  theoryRead: {},
  tasksDone: {}
};

/* ======================================
   ДОПОВНЮЄМО РІВНІ
====================================== */

LEVELS[0].artifact = ASSETS.book;
LEVELS[0].artifactName = "Книга знань";
LEVELS[0].theory = [
  "Пароль — це ключ до твого цифрового замку.",
  "Надійний пароль має бути довгим, складним і різним для різних сайтів.",
  "Не використовуй дату народження, ім’я або прості комбінації.",
  "Нікому не передавай свій пароль."
];

LEVELS[1].artifact = ASSETS.lupa;
LEVELS[1].artifactName = "Лупа істини";
LEVELS[1].theory = [
  "Фішинг — це пастка, коли шахраї хочуть виманити пароль або дані.",
  "Перед натисканням на посилання перевір адресу сайту.",
  "Не довіряй повідомленням, які лякають або дуже поспішають.",
  "Якщо сумніваєшся — запитай дорослого."
];

LEVELS[2].artifact = ASSETS.mirror;
LEVELS[2].artifactName = "Дзеркало правди";
LEVELS[2].theory = [
  "Фейк — це неправдива або перекручена інформація.",
  "Не все, що написано в інтернеті, є правдою.",
  "Перевіряй джерело, дату, автора та інші підтвердження.",
  "Якщо новина дуже емоційна — спочатку перевір її."
];

LEVELS[3].artifact = ASSETS.sphere;
LEVELS[3].artifactName = "Сфера даних";
LEVELS[3].theory = [
  "Особисті дані — це інформація, за якою можна впізнати людину.",
  "Адреса, номер телефону, паролі й фото документів треба берегти.",
  "Не публікуй особисті дані у відкритому доступі.",
  "Перед тим як щось відправити, подумай: хто це побачить?"
];

LEVELS[4].artifact = ASSETS.sword;
LEVELS[4].artifactName = "Меч захисту";
LEVELS[4].theory = [
  "Віруси можуть потрапити на пристрій через підозрілі файли або посилання.",
  "Не відкривай файли від незнайомих людей.",
  "Оновлення допомагають захищати пристрій.",
  "Якщо файл дивний — не відкривай його і звернись до дорослого."
];

/* ======================================
   ЗАВДАННЯ
====================================== */

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

function screenStyle(img) {
  return `style="--bg:url('${img}')"`;
}

function showStartScreen() {
  app.innerHTML = `
    <section class="screen" ${screenStyle(ASSETS.start)}>
      <div class="main-menu">
        <button class="btn" onclick="showMap()">Почати пригоду</button>
        <button class="btn" onclick="openGameStory()">Історія</button>
        <button class="btn" onclick="openSettings()">Налаштування</button>
      </div>
    </section>
  `;
}

function showMap() {
  app.innerHTML = `
    <section class="screen" ${screenStyle(ASSETS.map)}>
      <button class="btn back-btn" onclick="showStartScreen()">← Назад</button>
      <button class="btn center-bottom-btn" onclick="showHeroSelect()">Створити героя</button>

      <div class="map-point" style="left:12%; bottom:18%; width:22%; height:9%;" onclick="showLevel(1)"></div>
      <div class="map-point" style="left:43%; bottom:28%; width:22%; height:9%;" onclick="showLevel(2)"></div>
      <div class="map-point" style="right:8%; bottom:36%; width:23%; height:9%;" onclick="showLevel(3)"></div>
      <div class="map-point" style="left:8%; top:34%; width:24%; height:9%;" onclick="showLevel(4)"></div>
      <div class="map-point" style="right:13%; top:34%; width:22%; height:9%;" onclick="showLevel(5)"></div>
      <div class="map-point" style="right:12%; top:13%; width:12%; height:12%;" onclick="showMordor()"></div>
    </section>
  `;
}


/* ======================================
   ВИБІР ГЕРОЯ
====================================== */

function showHeroSelect() {
  const preview = selectedHero === "girl" ? ASSETS.girl : ASSETS.boy;

  app.innerHTML = `
    <section class="screen" ${screenStyle(ASSETS.heroSelect)}>
      <button class="btn back-btn" onclick="showMap()">← Назад</button>

      <img class="hero-choice hero-boy" src="${ASSETS.boy}" onclick="chooseHero('boy')">
      <img class="hero-choice hero-girl" src="${ASSETS.girl}" onclick="chooseHero('girl')">

      <img class="selected-preview" id="heroPreview" src="${preview}">

      <input id="heroNameInput" class="hero-name-input" placeholder="Введи ім’я героя" value="${heroName}">

      <button class="btn center-bottom-btn" onclick="createHero()">Створити героя</button>
    </section>
  `;
}

function chooseHero(type) {
  selectedHero = type;
  document.getElementById("heroPreview").src = type === "girl" ? ASSETS.girl : ASSETS.boy;
}

function createHero() {
  const input = document.getElementById("heroNameInput");
  heroName = input.value.trim();

  if (!heroName) {
    openSimpleModal("Введи ім’я героя", "Спочатку напиши ім’я героя.");
    return;
  }

  openSimpleModal("Героя створено!", `${heroName} готовий / готова до пригоди.`);
}

/* ======================================
   РІВЕНЬ
====================================== */

function showLevel(levelId) {
  const level = LEVELS.find(l => l.id === levelId);
  const done = GAME.tasksDone[levelId] || [];
  const progress = done.length * 25;

  app.innerHTML = `
    <section class="screen" ${screenStyle(level.bg)}>
      <button class="btn back-btn" onclick="showMap()">← До карти</button>

      <div class="level-progress">
        <b>${level.title}</b>
        <div>Кристал заряджено: ${progress}%</div>
        <div class="progress-bar">
          <div class="progress-fill" style="width:${progress}%"></div>
        </div>
      </div>

      <img class="level-mentor" src="${level.mentorImage}" onclick="openTheory(${levelId})">
      <div class="mentor-hint">Натисни на наставника</div>

      ${
        GAME.theoryRead[levelId]
          ? `<button class="btn center-bottom-btn" onclick="openChallenge(${levelId})">Почати випробування</button>`
          : ""
      }
    </section>
  `;
}

function openTheory(levelId) {
  const level = LEVELS.find(l => l.id === levelId);

  app.innerHTML += `
    <div class="modal-bg" id="modal">
      <div class="modal">
        <div class="close-modal" onclick="closeModal()">×</div>
        <img src="${level.card}" alt="${level.mentor}">

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
  GAME.theoryRead[levelId] = true;
  closeModal();
  showLevel(levelId);
}

/* ======================================
   ВИПРОБУВАННЯ
====================================== */

function openChallenge(levelId) {
  const level = LEVELS.find(l => l.id === levelId);
  const done = GAME.tasksDone[levelId] || [];

  app.innerHTML += `
    <div class="modal-bg" id="modal">
      <div class="modal">
        <div class="close-modal" onclick="closeModal()">×</div>
        <img src="${level.artifact}" alt="${level.artifactName}">

        <div class="modal-content">
          <h2>Випробування: ${level.artifactName}</h2>
          <p>Виконай 4 завдання, щоб зарядити кристал на 100%.</p>

          <div class="artifact-grid">
            ${TASKS[levelId].map((task, index) => `
              <div class="artifact-task" onclick="openTask(${levelId}, ${index})">
                <img src="${level.artifact}">
                <b>Завдання ${index + 1}</b>
                <div>${done.includes(index) ? "✅ виконано" : "🔒 не виконано"}</div>
              </div>
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
        <div class="close-modal" onclick="closeModal()">×</div>
        <img src="${level.artifact}" alt="${level.artifactName}">

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

  if (!GAME.tasksDone[levelId]) GAME.tasksDone[levelId] = [];

  if (!GAME.tasksDone[levelId].includes(taskIndex)) {
    GAME.tasksDone[levelId].push(taskIndex);
  }

  const progress = GAME.tasksDone[levelId].length * 25;

  if (progress >= 100) {
    if (!GAME.completedLevels.includes(levelId)) {
      GAME.completedLevels.push(levelId);
    }

    document.getElementById("result").innerHTML = `
      ✅ Кристал заряджено на 100%!<br><br>
      Ти отримав артефакт: <b>${level.artifactName}</b>.<br><br>
      <button class="btn" onclick="closeModal(); showMap();">Повернутися на карту</button>
    `;
  } else {
    document.getElementById("result").innerHTML = `
      ✅ Правильно! Кристал заряджено на ${progress}%.<br><br>
      <button class="btn" onclick="closeModal(); showLevel(${levelId}); openChallenge(${levelId});">
        До наступного завдання
      </button>
    `;
  }
}

/* ======================================
   МОРДЕР І ФІНАЛ
====================================== */

function showMordor() {
  app.innerHTML = `
    <section class="screen" ${screenStyle(ASSETS.mordor)}>
      <button class="btn back-btn" onclick="showMap()">← До карти</button>
      <button class="btn center-bottom-btn" onclick="openFinalBattle()">Визволити Райфіка</button>
    </section>
  `;
}

function openFinalBattle() {
  app.innerHTML += `
    <div class="modal-bg" id="modal">
      <div class="modal">
        <div class="close-modal" onclick="closeModal()">×</div>
        <img src="${ASSETS.cardMordor}" alt="Мордер">

        <div class="modal-content">
          <h2>Фінальне випробування</h2>
          <p>Мордер сховав Райфіка у Цитаделі Хаосу. Щоб зруйнувати Маску Обману, дай правильну відповідь.</p>

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
    Райфік вільний, а П'ять Кристалів знову захищають КіберКоролівство.<br><br>
    <button class="btn" onclick="showVictoryScreen()">Завершити гру</button>
  `;
}

function showVictoryScreen() {
  app.innerHTML = `
    <section class="screen" ${screenStyle(ASSETS.map)}>
      <button class="btn center-bottom-btn" onclick="showStartScreen()">Нова пригода</button>
    </section>
  `;
}

/* ======================================
   ПРОСТІ МОДАЛКИ
====================================== */

function openGameStory() {
  openSimpleModal(
    "Cyber Legends: Таємниця П'яти Кристалів",
    "Мордер викрав Райфіка та послабив захист КіберКоролівства. Щоб його врятувати, герой має пройти 5 локацій, отримати артефакти наставників і зарядити П'ять Кристалів."
  );
}

function openSettings() {
  openSimpleModal("Налаштування", "Тут пізніше можна буде додати музику, озвучку та підказки.");
}

function openSimpleModal(title, text) {
  app.innerHTML += `
    <div class="modal-bg" id="modal">
      <div class="modal">
        <div class="close-modal" onclick="closeModal()">×</div>
        <div class="modal-content">
          <h2>${title}</h2>
          <p>${text}</p>
        </div>
      </div>
    </div>
  `;
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.remove();
}

/* ======================================
   ЗАПУСК ГРИ
====================================== */

showStartScreen();
