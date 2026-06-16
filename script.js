const app = document.getElementById("app");

/* =====================================================
   CYBER LEGENDS
===================================================== */

/* =====================================================
   КАРТИНКИ
===================================================== */

const ASSETS = {

  /* ФОНИ */

  start: "fon/fon_start.png",
  map: "fon/NEW_FON_KARTA.png",
  heroSelect: "fon/fon_vubir_heroiv.png",

  level1: "fon/fon_book.png",
  level2: "fon/fon_forest.png",
  level3: "fon/fon_ozero.png",
  level4: "fon/fon_kajjian.png",
  level5: "fon/fon_vylkan.png",

  citadel: "fon/Fon_mordor_1.png",

  /* ЛОГО */

  logo: "artefaktu/logo_game.png",

  /* ГЕРОЇ */

  boy: "geroi/boy.png",
  girl: "geroi/diva.png",

  raifik: "geroi/raif.png",
  mordor: "geroi/mordor.png",

  /* НАСТАВНИКИ */

  totus: "geroi/nastavnuk_sova.png",
  foxita: "geroi/nastavnuk_fox.png",
  nereus: "geroi/nastavnuk_som.png",
  anubisa: "geroi/nastavnuk_kajjian.png",
  tifon: "geroi/nastavnuk_drakon.png",

  /* АРТЕФАКТИ */

  book: "artefaktu/artefakt_knuga.png",
  lupa: "artefaktu/artefakt_lupa.png",
  mirror: "artefaktu/artefakt_dzerkalo.png",
  sphere: "artefaktu/artefakt_sfera.png",
  sword: "artefaktu/artefakt_mech.png",

  /* КРИСТАЛИ */

  yellowOff: "artefaktu/yellow_kristal_1.png",
  yellowOn: "artefaktu/yellow_kristal_2.png",

  greenOff: "artefaktu/green_kristal_1.png",
  greenOn: "artefaktu/green_kristal_2.png",

  blueOff: "artefaktu/blue_kristal_1.png",
  blueOn: "artefaktu/blue_kristal_2.png",

  pinkOff: "artefaktu/pink_kristal_1.png",
  pinkOn: "artefaktu/pink_kristal_2.png",

  redOff: "artefaktu/red_kristal_1.png",
  redOn: "artefaktu/red_kristal_2.png",

  purpleOff: "artefaktu/purple_kristal_1.png",
  purpleOn: "artefaktu/purple_kristal_2.png",

  /* МЕДАЛЬЙОНИ */

  medalTotus: "artefaktu/medaliony_1.png",
  medalFoxita: "artefaktu/medaliony_2.png",
  medalNereus: "artefaktu/medaliony_3.png",
  medalAnubisa: "artefaktu/medaliony_4.png",
  medalTifon: "artefaktu/medaliony_5.png"
};

/* =====================================================
   ЗВУКИ
   ПОКИ НЕ ЧІПАЄМО
===================================================== */

/*

const SOUNDS = {
  bg: new Audio("audio/bg_music.mp3"),
  click: new Audio("audio/click.mp3"),
  success: new Audio("audio/success.mp3"),
  wrong: new Audio("audio/wrong.mp3"),
  crystal: new Audio("audio/crystal.mp3"),
  storm: new Audio("audio/storm.mp3"),
  final: new Audio("audio/final_win.mp3")
};

*/

/* =====================================================
   СТАН ГРИ
===================================================== */

let selectedHero = "boy";
let heroName = "";

let theoryRead = {};
let completedTasks = {};
let completedLevels = [];

/* =====================================================
   ДОПОМІЖНІ ФУНКЦІЇ
===================================================== */

function bg(img){
  return `style="--bg:url('${img}')"`;
}

function closeModal(){
  const modal = document.getElementById("modal");

  if(modal){
    modal.remove();
  }
}


/* =====================================================
   РІВНІ
===================================================== */

const LEVELS = [
  {
    id: 1,
    title: "Замок Паролів",
    mentor: "Тотус",
    bg: ASSETS.level1,
    mentorImg: ASSETS.totus,
    medal: ASSETS.medalTotus,
    artifact: ASSETS.book,
    artifactName: "Книга знань",
    crystalOff: ASSETS.yellowOff,
    crystalOn: ASSETS.yellowOn,
    color: "#ffd54a",
    x: 34,
    y: 70,
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
    medal: ASSETS.medalFoxita,
    artifact: ASSETS.lupa,
    artifactName: "Лупа істини",
    crystalOff: ASSETS.greenOff,
    crystalOn: ASSETS.greenOn,
    color: "#42e66f",
    x: 29,
    y: 55,
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
    medal: ASSETS.medalNereus,
    artifact: ASSETS.mirror,
    artifactName: "Дзеркало правди",
    crystalOff: ASSETS.blueOff,
    crystalOn: ASSETS.blueOn,
    color: "#39b7ff",
    x: 50,
    y: 48,
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
    medal: ASSETS.medalAnubisa,
    artifact: ASSETS.sphere,
    artifactName: "Сфера даних",
    crystalOff: ASSETS.pinkOff,
    crystalOn: ASSETS.pinkOn,
    color: "#ff78d7",
    x: 46,
    y: 34,
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
    medal: ASSETS.medalTifon,
    artifact: ASSETS.sword,
    artifactName: "Меч захисту",
    crystalOff: ASSETS.redOff,
    crystalOn: ASSETS.redOn,
    color: "#ff4a35",
    x: 66,
    y: 30,
    theory: [
      "Віруси можуть потрапити на пристрій через підозрілі файли або посилання.",
      "Не відкривай файли від незнайомих людей.",
      "Оновлення допомагають захищати пристрій.",
      "Якщо файл дивний — не відкривай його і звернись до дорослого."
    ]
  }
];

/* =====================================================
   ЗАВДАННЯ
===================================================== */

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



/* =====================================================
   СТАРТОВИЙ ЕКРАН
===================================================== */

function showStartScreen(){
  app.innerHTML = `
    <section class="screen start-screen" ${bg(ASSETS.start)}>

      <div class="storm-strip start-storm">
        <div class="storm-rain">
          0101 ⚡ 1010 🔒 0011 ⚡ 0110 ⚡ 1001 🔒 0101
        </div>
      </div>

      <div class="start-panel">
        <img class="start-logo" src="${ASSETS.logo}" alt="Cyber Legends">

        <div class="season-title">
          Таємниця П'яти Кристалів
        </div>

        <div class="start-buttons">
          <button class="btn" onclick="showMap()">Почати пригоду</button>
          <button class="btn" onclick="openGameStory()">Історія</button>
          <button class="btn" onclick="openSettings()">Налаштування</button>
        </div>
      </div>

    </section>
  `;
}





/* =====================================================
   КАРТА
===================================================== */

function showMap(){
  const allDone = completedLevels.length >= 5;

  app.innerHTML = `
    <section class="screen map-screen" ${bg(ASSETS.map)}>

      ${
        allDone
          ? ""
          : `
            <div class="storm-strip">
              <div class="storm-rain">
                0101 ⚡ 1010 🔒 0011 ⚡ 0110
              </div>
            </div>
          `
      }

      <button class="btn back-btn" onclick="showStartScreen()">
        ← Назад
      </button>

      <div class="map-hero-button">
        <button class="btn" onclick="showHeroSelect()">
          ${heroName ? "Герой: " + heroName : "Створити героя"}
        </button>
      </div>

      ${LEVELS.map(level => renderMapLevel(level)).join("")}

      <button
        class="map-level citadel ${allDone ? "completed" : "locked"}"
        style="left:57%; top:18%;"
        onclick="${allDone ? "showCitadel()" : "citadelLocked()"}"
      >
        <img
          class="map-crystal"
          src="${allDone ? ASSETS.purpleOn : ASSETS.purpleOff}"
          alt="Цитадель Хаосу"
        >

        <div class="map-label">
          Цитадель Хаосу
        </div>

        <div class="map-check">
          ${allDone ? "✅" : "🔒"}
        </div>
      </button>

    </section>
  `;
}

function renderMapLevel(level){
  const done = completedLevels.includes(level.id);

  return `
    <button
      class="map-level ${done ? "completed" : ""}"
      style="left:${level.x}%; top:${level.y}%;"
      onclick="showLevel(${level.id})"
    >
      <img
        class="map-crystal"
        src="${done ? level.crystalOn : level.crystalOff}"
        alt="${level.title}"
      >

      <div class="map-label">
        ${level.title}
      </div>

      <div class="map-check">
        ${done ? "✅" : ""}
      </div>
    </button>
  `;
}


/* =====================================================
   ВИБІР ГЕРОЯ
===================================================== */

function showHeroSelect(){
  app.innerHTML = `
    <section class="screen hero-select-screen" ${bg(ASSETS.heroSelect)}>
      
      <button class="btn back-btn" onclick="showMap()">
        ← Назад
      </button>

      <div class="mentor-side">
        <div class="mentor-side-title">
          Натискай на наставника<br>
          та дізнайся більше
        </div>

        ${LEVELS.map(level => `
          <img
            class="mentor-medal"
            src="${level.medal}"
            alt="${level.mentor}"
            onclick="openMentorInfo(${level.id})"
          >
        `).join("")}
      </div>

      <div class="hero-curtain">
        <h1>Вибери героя для проходження пригоди</h1>

        <div class="hero-pair">
          <img
            class="hero-choice ${selectedHero === "boy" ? "selected" : ""}"
            src="${ASSETS.boy}"
            onclick="chooseHero('boy')"
          >

          <img
            class="hero-choice ${selectedHero === "girl" ? "selected" : ""}"
            src="${ASSETS.girl}"
            onclick="chooseHero('girl')"
          >
        </div>

        <input
          id="heroNameInput"
          class="hero-name-input"
          placeholder="Введи ім’я героя"
          value="${heroName}"
        >

        <button class="btn" onclick="createHero()">
          Створити героя
        </button>
      </div>

    </section>
  `;
}

function chooseHero(type){
  selectedHero = type;
  showHeroSelect();
}

function createHero(){
  const input = document.getElementById("heroNameInput");
  heroName = input.value.trim();

  if(!heroName){
    openSimpleModal(
      "Введи ім’я героя",
      "Спочатку напиши ім’я героя."
    );
    return;
  }

  const greeting =
    selectedHero === "girl"
      ? `Вітаємо тебе, красуне ${heroName}!`
      : `Вітаємо тебе, юначе ${heroName}!`;

  openHeroScroll(greeting);
}

function openHeroScroll(greeting){
  app.innerHTML += `
    <div class="modal-bg" id="modal">
      <div class="scroll-modal">
        <h2>${greeting}</h2>

        <p>
          Твоя пригода починається просто зараз.
        </p>

        <p>
          Попереду п'ять кристалів, п'ять наставників
          і велика місія — врятувати Райфіка.
        </p>

        <button class="btn" onclick="closeModal(); showMap();">
          Повернутись до карти та почати пригоду
        </button>
      </div>
    </div>
  `;
}


/* =====================================================
   ЕКРАН РІВНЯ
===================================================== */

function showLevel(levelId){
  const level = LEVELS.find(item => item.id === levelId);
  const done = completedTasks[levelId] || [];
  const progress = done.length * 25;

  app.innerHTML = `
    <section class="screen level-screen" ${bg(level.bg)}>

      <button class="btn back-btn" onclick="showMap()">
        ← До карти
      </button>

      <div class="level-progress">
        <b>${level.title}</b><br>
        <span>Кристал заряджено: ${progress}%</span>

        <div class="progress-bar">
          <div
            class="progress-fill"
            style="width:${progress}%; background:${level.color};"
          ></div>
        </div>
      </div>

      <img
        class="level-mentor"
        src="${level.mentorImg}"
        alt="${level.mentor}"
        onclick="openTheory(${levelId})"
      >

      <div class="level-action">
        ${
          theoryRead[levelId]
            ? `<button class="btn" onclick="openChallenge(${levelId})">Почати випробування</button>`
            : `<button class="btn" onclick="openTheory(${levelId})">Натисни на наставника</button>`
        }
      </div>

    </section>
  `;
}

/* =====================================================
   ТЕОРІЯ НАСТАВНИКА
===================================================== */

function openTheory(levelId){
  const level = LEVELS.find(item => item.id === levelId);

  app.innerHTML += `
    <div class="modal-bg" id="modal">
      <div class="modal">

        <button class="close-modal" onclick="closeModal()">×</button>

        <img
          src="${level.mentorImg}"
          alt="${level.mentor}"
        >

        <div class="modal-content">
          <h2>${level.mentor}: теорія</h2>

          <p><b>${level.title}</b></p>

          <ol>
            ${level.theory.map(item => `<li>${item}</li>`).join("")}
          </ol>

          <button class="btn" onclick="finishTheory(${levelId})">
            Я зрозумів / зрозуміла
          </button>
        </div>

      </div>
    </div>
  `;
}

function finishTheory(levelId){
  theoryRead[levelId] = true;
  closeModal();
  showLevel(levelId);
}

/* =====================================================
   ВИПРОБУВАННЯ
===================================================== */

function openChallenge(levelId){
  const level = LEVELS.find(item => item.id === levelId);
  const done = completedTasks[levelId] || [];

  app.innerHTML += `
    <div class="modal-bg" id="modal">
      <div class="modal">

        <button class="close-modal" onclick="closeModal()">×</button>

        <img src="${level.artifact}" alt="${level.artifactName}">

        <div class="modal-content">

          <h2>Випробування</h2>

          <p>
            Артефакт:
            <b>${level.artifactName}</b>
          </p>

          <p>
            Виконай усі 4 завдання,
            щоб зарядити кристал.
          </p>

          <div class="artifact-grid">

            ${TASKS[levelId].map((task,index)=>`

              <button
                class="artifact-task"
                onclick="openTask(${levelId},${index})"
              >

                <img src="${level.artifact}">

                <div>
                  Завдання ${index+1}
                </div>

                <div>
                  ${
                    done.includes(index)
                    ? "✅ Виконано"
                    : "🔒 Відкрити"
                  }
                </div>

              </button>

            `).join("")}

          </div>

        </div>

      </div>
    </div>
  `;
}

/* =====================================================
   ВІДКРИТИ ЗАВДАННЯ
===================================================== */

function openTask(levelId,taskIndex){

  const level = LEVELS.find(item => item.id === levelId);
  const task = TASKS[levelId][taskIndex];

  closeModal();

  app.innerHTML += `
    <div class="modal-bg" id="modal">

      <div class="modal">

        <button class="close-modal" onclick="closeModal()">×</button>

        <img src="${level.artifact}" alt="${level.artifactName}">

        <div class="modal-content">

          <h2>
            Завдання ${taskIndex + 1}
          </h2>

          <p>
            <b>${task.q}</b>
          </p>

          ${task.a.map((answer,index)=>`

            <button
              class="answer-btn"
              onclick="checkAnswer(${levelId},${taskIndex},${index})"
            >
              ${answer}
            </button>

          `).join("")}

          <p id="result"></p>

        </div>

      </div>

    </div>
  `;
}

/* =====================================================
   ПЕРЕВІРКА ВІДПОВІДІ
===================================================== */

function checkAnswer(levelId,taskIndex,answerIndex){

  const task = TASKS[levelId][taskIndex];
  const level = LEVELS.find(item => item.id === levelId);

  if(answerIndex !== task.c){

    document.getElementById("result").innerHTML =
      "❌ Спробуй ще раз.";

    return;
  }

  if(!completedTasks[levelId]){
    completedTasks[levelId] = [];
  }

  if(!completedTasks[levelId].includes(taskIndex)){
    completedTasks[levelId].push(taskIndex);
  }

  const progress =
    completedTasks[levelId].length * 25;

  if(progress >= 100){

    if(!completedLevels.includes(levelId)){
      completedLevels.push(levelId);
    }

    closeModal();

    openLevelScroll(levelId);

    return;
  }

  document.getElementById("result").innerHTML = `
    ✅ Правильно!

    <br><br>

    Кристал заряджено на
    <b>${progress}%</b>

    <br><br>

    <button
      class="btn"
      onclick="
        closeModal();
        showLevel(${levelId});
        openChallenge(${levelId});
      "
    >
      До наступного завдання
    </button>
  `;
}

/* =====================================================
   СУВІЙ ПІСЛЯ РІВНЯ
===================================================== */

function openLevelScroll(levelId){

  const level =
    LEVELS.find(item => item.id === levelId);

  app.innerHTML += `
    <div class="modal-bg" id="modal">

      <div class="scroll-modal">

        <img
          class="scroll-artifact"
          src="${level.artifact}"
        >

        <h2>
          Вітаємо!
        </h2>

        <p>
          Ти успішно пройшов /
          пройшла рівень:
        </p>

        <p>
          <b>${level.title}</b>
        </p>

        <p style="color:${level.color}">
          ● Кристал заряджено на 100%
        </p>

        <p>
          Отримано артефакт:
        </p>

        <p>
          <b>${level.artifactName}</b>
        </p>

        <button
          class="btn"
          onclick="
            closeModal();
            showMap();
          "
        >
          Повернутись до карти
        </button>

      </div>

    </div>
  `;
}


/* =====================================================
   ЦИТАДЕЛЬ ХАОСУ
===================================================== */

function citadelLocked(){

  openSimpleModal(
    "Цитадель ще закрита",
    "Спочатку заряди всі П'ять Кристалів."
  );

}

function showCitadel(){

  app.innerHTML = `
    <section class="screen" ${bg(ASSETS.citadel)}>

      <button
        class="btn back-btn"
        onclick="showMap()"
      >
        ← До карти
      </button>

      <div class="level-action">

        <button
          class="btn"
          onclick="openFinalBattle()"
        >
          Визволити Райфіка
        </button>

      </div>

    </section>
  `;

}

/* =====================================================
   МОРДЕР
===================================================== */

function openFinalBattle(){

  app.innerHTML += `
    <div class="modal-bg" id="modal">

      <div class="modal">

        <button
          class="close-modal"
          onclick="closeModal()"
        >
          ×
        </button>

        <img
          src="${ASSETS.mordor}"
          alt="Мордер"
        >

        <div class="modal-content">

          <h2>
            Фінальне випробування
          </h2>

          <p>
            Мордер сховав Райфіка
            у Цитаделі Хаосу.
          </p>

          <p>
            Щоб зруйнувати Маску Обману,
            дай правильну відповідь.
          </p>

          <p>
            <b>
            Що робити,
            якщо отримав підозріле посилання?
            </b>
          </p>

          <button
            class="answer-btn"
            onclick="winGame()"
          >
            Перевірити відправника
            і не вводити пароль
          </button>

          <button
            class="answer-btn"
            onclick="wrongFinal()"
          >
            Одразу натиснути
          </button>

          <button
            class="answer-btn"
            onclick="wrongFinal()"
          >
            Ввести пароль
          </button>

          <p id="result"></p>

        </div>

      </div>

    </div>
  `;

}

function wrongFinal(){

  document.getElementById("result").innerHTML =
    "❌ Мордер майже тебе обманув. Спробуй ще раз.";

}

/* =====================================================
   ПЕРЕМОГА
===================================================== */

function winGame(){

  document.getElementById("result").innerHTML = `

    ✅ Маску Обману зруйновано!

    <br><br>

    Райфік врятований.

    <br><br>

    П'ять Кристалів знову
    захищають КіберКоролівство.

    <br><br>

    Цифрова гроза починає зникати.

    <br><br>

    <button
      class="btn"
      onclick="showVictoryScreen()"
    >
      Завершити гру
    </button>

  `;

}

function showVictoryScreen(){

  app.innerHTML = `
    <section class="screen" ${bg(ASSETS.map)}>

      <div class="victory-screen">

        <h1>
          🏆 Перемога!
        </h1>

        <p>
          Райфік врятований,
          а КіберКоролівство
          знову у безпеці.
        </p>

        <button
          class="btn"
          onclick="showStartScreen()"
        >
          Нова пригода
        </button>

      </div>

    </section>
  `;

}

/* =====================================================
   ІСТОРІЯ ГРИ
===================================================== */

function openGameStory(){

  openSimpleModal(

    "Таємниця П'яти Кристалів",

    `
    Колись КіберКоролівство
    захищали П'ять Кристалів.

    <br><br>

    Кожен із них відповідав
    за важливу силу:

    <br><br>

    💛 Знання

    <br>

    💚 Уважність

    <br>

    💙 Правду

    <br>

    🩷 Захист Даних

    <br>

    ❤️ Безпеку

    <br><br>

    Але Мордер накрив
    королівство цифровою грозою
    та викрав Райфіка.

    <br><br>

    Тепер тільки герой може
    врятувати Королівство,
    пройти всі випробування,
    отримати артефакти наставників
    і зарядити всі Кристали.
    `
  );

}

/* =====================================================
   НАЛАШТУВАННЯ
===================================================== */

function openSettings(){

  openSimpleModal(
    "Налаштування",
    "Тут пізніше з'являться музика, озвучка та підказки."
  );

}

/* =====================================================
   УНІВЕРСАЛЬНА МОДАЛКА
===================================================== */

function openSimpleModal(title,text){

  app.innerHTML += `
    <div class="modal-bg" id="modal">

      <div class="modal">

        <button
          class="close-modal"
          onclick="closeModal()"
        >
          ×
        </button>

        <div class="modal-content">
          <h2>${title}</h2>
          <p>${text}</p>
        </div>

      </div>

    </div>
  `;

}

/* =====================================================
   ЗАПУСК ГРИ
===================================================== */

showStartScreen();





