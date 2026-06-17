const app = document.getElementById("app");

/* =====================================================
   CYBER LEGENDS — JS CLEAN
   Таємниця П'яти Кристалів
===================================================== */

/* =====================================================
   КАРТИНКИ
===================================================== */

const ASSETS = {
  start: "fon/fon_start.png",
  newMap2026: "fon/NEW_FON_KARTAa.png?v=999999",
  heroSelect: "fon/fon_vubir_heroiv.png",

  level1: "fon/fon_book.png",
  level2: "fon/fon_forest.png",
  level3: "fon/fon_ozero.png",
  level4: "fon/fon_kajjian.png",
  level5: "fon/fon_vylkan.png",
  citadel: "fon/Fon_mordor_1.png",

  logo: "artefaktu/logo_game.png",

  boy: "geroi/boy.png",
  girl: "geroi/diva.png",
  raifik: "geroi/raif.png",
  mordor: "geroi/mordor.png",

  totus: "geroi/nastavnuk_sova.png",
  foxita: "geroi/nastavnuk_fox.png",
  nereus: "geroi/nastavnuk_som.png",
  anubisa: "geroi/nastavnuk_kajjian.png",
  tifon: "geroi/nastavnuk_drakon.png",

  book: "artefaktu/artefakt_knuga.png",
  lupa: "artefaktu/artefakt_lupa.png",
  mirror: "artefaktu/artefakt_dzerkalo.png",
  sphere: "artefaktu/artefakt_sfera.png",
  sword: "artefaktu/artefakt_mech.png",

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

  medalTotus: "artefaktu/medaliony_1.png",
  medalFoxita: "artefaktu/medaliony_2.png",
  medalNereus: "artefaktu/medaliony_3.png",
  medalAnubisa: "artefaktu/medaliony_4.png",
  medalTifon: "artefaktu/medaliony_5.png"
};

/* =====================================================
   ЗВУКИ — ПОКИ ЗАКОМЕНТОВАНО
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

function playSound(name){
  const sound = SOUNDS[name];
  if(!sound) return;

  sound.currentTime = 0;
  sound.play().catch(() => {});
}

function startMusic(){
  SOUNDS.bg.loop = true;
  SOUNDS.bg.volume = 0.25;
  SOUNDS.bg.play().catch(() => {});
}

*/

/* =====================================================
   ЗВУКИ  частково
===================================================== */
const SOUNDS = {
  bg: new Audio("music/bg.mp3"),
  click: new Audio("music/click.mp3"),
  crystal: new Audio("music/crystal.mp3"),
 };
function startMusic(){
  SOUNDS.bg.loop = true;
  SOUNDS.bg.volume = 0.04;
  SOUNDS.bg.play().catch(() => {});
}
function playSound(name) {
    const sound = SOUNDS[name];

    if (!sound) return;

    sound.currentTime = 0;
    sound.play().catch(() => {});
}

document.addEventListener("click", () => {
    startMusic();
}, { once: true });

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

function getHeroImage(){
  return selectedHero === "girl" ? ASSETS.girl : ASSETS.boy;
}

function closeModal(){
  const modal = document.getElementById("modal");
  if(modal) modal.remove();
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

  x: 36,
  y: 78,

  theory: [
    "Пароль — це ключ до твого цифрового замку.",
    "Надійний пароль має бути довгим.",
    "Не використовуй ім'я або дату народження.",
    "Нікому не передавай пароль."
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

  x: 25,
  y: 66,

  theory: [
    "Фішинг — це пастка.",
    "Перевіряй адресу сайту.",
    "Не поспішай відкривати посилання.",
    "Запитай дорослого якщо сумніваєшся."
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
  y: 63,

  theory: [
    "Не все в інтернеті правда.",
    "Перевіряй джерела.",
    "Дивись на дату.",
    "Шукай підтвердження."
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

  x: 43,
  y: 50,

  theory: [
    "Особисті дані треба берегти.",
    "Не публікуй адресу.",
    "Не показуй документи.",
    "Думай перед відправкою."
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
  y: 53,

  theory: [
    "Віруси можуть бути небезпечні.",
    "Не відкривай дивні файли.",
    "Оновлюй пристрій.",
    "Користуйся захистом."
  ]
}
];

/* =====================================================
   ЦИФРОВИЙ ДОЩ
===================================================== */

function renderRain(){

  const columns = [];

  for(let i = 0; i < 15; i++){

    columns.push(`
      <span
        style="
          left:${5 + i * 6}%;
          animation-delay:${(i % 5) * 0.8}s;
        "
      >
        1<br>
        0<br>
        1<br>
        🔒<br>
        0<br>
        1
      </span>
    `);

  }

  return `
    <div class="storm-strip">

      <div class="digital-rain">

        ${columns.join("")}

      </div>

    </div>
  `;
}

/* =====================================================
   ЗАВДАННЯ
===================================================== */

const TASKS = {

1: [
  { q:"Який пароль найнадійніший?", a:["123456","qwerty","Kiber!2026_Legend"], c:2 },
  { q:"Чи можна ділитися паролем?", a:["Так","Ні","Тільки з другом"], c:1 },
  { q:"Що краще захищає акаунт?", a:["Один пароль","2FA","Пароль в нотатках"], c:1 },
  { q:"Що не можна ставити в пароль?", a:["Ім'я і дату","Символи","Довгу фразу"], c:0 }
],

2: [
  { q:"Перед посиланням потрібно?", a:["Перевірити адресу","Відкрити","Надіслати друзям"], c:0 },
  { q:"Фішинг це?", a:["Шахрайство","Гра","Оновлення"], c:0 },
  { q:"Підозрілий лист просить пароль?", a:["Ввести","Сказати дорослим","Переслати"], c:1 },
  { q:"Ознака шахрайства?", a:["Помилки","Тиск","Обидва"], c:2 }
],

3: [
  { q:"Що робити з новиною?", a:["Поширити","Перевірити","Повірити"], c:1 },
  { q:"Фейк це?", a:["Неправда","Пароль","Гра"], c:0 },
  { q:"Кому довіряти?", a:["Чату","Офіційному сайту","Скріну"], c:1 },
  { q:"Якщо сумніваєшся?", a:["Перевірити","Повірити","Поширити"], c:0 }
],

4: [
  { q:"Що не можна публікувати?", a:["Адресу","Колір","Назву гри"], c:0 },
  { q:"Особисті дані це?", a:["Дані людини","Рівень","Кнопка"], c:0 },
  { q:"Фото документів?", a:["Публікувати","Берегти","Кидати в чат"], c:1 },
  { q:"Навіщо берегти дані?", a:["Від шахраїв","Для краси","Для файлів"], c:0 }
],

5: [
  { q:"Підозрілий файл?", a:["Відкрити","Не відкривати","Запустити"], c:1 },
  { q:"Навіщо оновлення?", a:["Захист","Повільність","Без інтернету"], c:0 },
  { q:"Антивірус?", a:["Захищає","Ламає","Створює фейки"], c:0 },
  { q:"Файл дивний?", a:["Порадитись","Відкрити","Надіслати"], c:0 }
]

};


/* =====================================================
   СТАРТОВИЙ ЕКРАН
===================================================== */

function showStartScreen(){

  app.innerHTML = `

    <section class="screen start-screen" ${bg(ASSETS.start)}>

      ${renderRain()}

      <div class="start-panel">

        <img
          class="start-logo"
          src="${ASSETS.logo}"
          alt="Cyber Legends"
        >

        <div class="season-title">
          Таємниця П'яти Кристалів
        </div>

        <div class="start-buttons">

          <button
            class="btn"
            onclick="showMap()"
          >
            Почати пригоду
          </button>

          <button
            class="btn"
            onclick="openGameStory()"
          >
            Історія
          </button>

          <button
            class="btn"
            onclick="openSettings()"
          >
            Налаштування
          </button>

        </div>

      </div>

    </section>

  `;
}

/* =====================================================
   КАРТА
===================================================== */

function showMap(){

  const allDone =
    completedLevels.length >= 5;

  app.innerHTML = `

    <section
      class="screen map-screen"
      ${bg(ASSETS.newMap2026)}
    >

      ${!allDone ? renderRain() : ""}

      <button
        class="btn back-btn"
        onclick="showStartScreen()"
      >
        ← Назад
      </button>

      <div class="map-hero-button">

        <button
          class="btn"
          onclick="showHeroSelect()"
        >

          ${
            heroName
            ? "Герой: " + heroName
            : "Створити героя"
          }

        </button>

      </div>

      ${LEVELS.map(level =>
        renderMapLevel(level)
      ).join("")}

      <button
        class="
          map-level
          citadel
          ${allDone ? "completed" : "locked"}
        "

        style="
          left:73%;
          top:38%;
        "

        onclick="
          ${
            allDone
            ? "showCitadel()"
            : "citadelLocked()"
          }
        "
      >

        <img
          class="map-crystal"
          src="
            ${
              allDone
              ? ASSETS.purpleOn
              : ASSETS.purpleOff
            }
          "
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

/* =====================================================
   КРИСТАЛ НА КАРТІ
===================================================== */

function renderMapLevel(level){

  const done =
    completedLevels.includes(level.id);

  return `

    <button

      class="
        map-level
        ${done ? "completed" : ""}
      "

      style="
        left:${level.x}%;
        top:${level.y}%;
      "

      onclick="
        showLevel(${level.id})
      "
    >

      <img
        class="map-crystal"
        src="
          ${
            done
            ? level.crystalOn
            : level.crystalOff
          }
        "
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

    <section
      class="screen hero-select-screen"
      ${bg(ASSETS.heroSelect)}
    >

      <button
        class="btn back-btn"
        onclick="showMap()"
      >
        ← Назад
      </button>

      <div class="mentor-side">

        <div class="mentor-side-title">

          Натискай на наставника

          <br>

          та дізнайся більше

        </div>

        ${LEVELS.map(level => `

          <img

            class="mentor-medal"

            src="${level.medal}"

            alt="${level.mentor}"

            onclick="
              openMentorInfo(
                ${level.id}
              )
            "

          >

        `).join("")}

      </div>

      <img

        class="hero-stage-preview"

        src="${getHeroImage()}"

      >

      <div class="hero-curtain">

        <h1>
          Вибери героя
          для проходження пригоди
        </h1>

        <div class="hero-pair">

          <img

            class="
              hero-choice
              ${
                selectedHero === "boy"
                ? "selected"
                : ""
              }
            "

            src="${ASSETS.boy}"

            onclick="
              chooseHero('boy')
            "
          >

          <img

            class="
              hero-choice
              ${
                selectedHero === "girl"
                ? "selected"
                : ""
              }
            "

            src="${ASSETS.girl}"

            onclick="
              chooseHero('girl')
            "
          >

        </div>

        <input

          id="heroNameInput"

          class="hero-name-input"

          placeholder="Введи ім'я героя"

          value="${heroName}"

        >

        <button
          class="btn"
          onclick="createHero()"
        >
          Створити героя
        </button>

      </div>

    </section>

  `;
}


/* =====================================================
   ВИБІР ГЕРОЯ
===================================================== */

function chooseHero(type){
  selectedHero = type;
  showHeroSelect();
}

function createHero(){

  const input =
    document.getElementById("heroNameInput");

  heroName = input.value.trim();

  if(!heroName){

    openSimpleModal(
      "Введи ім'я героя",
      "Спочатку напиши ім'я героя."
    );

    return;
  }

  const greeting =
    selectedHero === "girl"
      ? `Вітаємо тебе, красуне ${heroName}!`
      : `Вітаємо тебе, юначе ${heroName}!`;

  openHeroScroll(greeting);
}

/* =====================================================
   СУВІЙ ГЕРОЯ
===================================================== */

function openHeroScroll(greeting){

  app.innerHTML += `

    <div
      class="modal-bg"
      id="modal"
    >

      <div class="scroll-modal">

        <h2>${greeting}</h2>

        <p>
          Попереду на тебе чекає
          велика пригода.
        </p>

        <p>
          П'ять наставників,
          п'ять артефактів
          та П'ять Кристалів.
        </p>

        <p>
          Врятуй Райфіка
          та переможи Мордера.
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
   НАСТАВНИКИ
===================================================== */

function openMentorInfo(levelId){

  const level =
    LEVELS.find(
      item => item.id === levelId
    );

  openSimpleModal(

    level.mentor,

    `
      <div style="text-align:center">

        <img
          src="${level.mentorImg}"
          style="
            width:180px;
            max-height:240px;
            object-fit:contain;
          "
        >

        <p>
          Наставник локації:
          <b>${level.title}</b>
        </p>

        <p>
          Артефакт:
          <b>${level.artifactName}</b>
        </p>

      </div>
    `

  );

}

/* =====================================================
   РІВЕНЬ
===================================================== */

function showLevel(levelId){

  const level =
    LEVELS.find(
      item => item.id === levelId
    );

  const done =
    completedTasks[levelId] || [];

  const progress =
    done.length * 25;

  app.innerHTML = `

    <section
      class="screen"
      ${bg(level.bg)}
    >

      <button
        class="btn back-btn"
        onclick="showMap()"
      >
        ← До карти
      </button>

      <div class="level-progress">

        <b>${level.title}</b>

        <br>

        Кристал заряджено:
        ${progress}%

        <div class="progress-bar">

          <div

            class="progress-fill"

            style="
              width:${progress}%;
              background:${level.color};
            "

          ></div>

        </div>

      </div>

      <img

        class="level-mentor"

        src="${level.mentorImg}"

        onclick="
          openTheory(${level.id})
        "

      >

      <div class="level-action">

        <button

          class="btn"

          onclick="
            openTheory(${level.id})
          "

        >

          Натисни на наставника

        </button>

      </div>

    </section>

  `;
}

/* =====================================================
   ТЕОРІЯ
===================================================== */

function openTheory(levelId){

  const level =
    LEVELS.find(
      item => item.id === levelId
    );

  openSimpleModal(

    level.title,

    `
      <ol>

        ${level.theory
          .map(item => `<li>${item}</li>`)
          .join("")}

      </ol>

      <br>

      <button
        class="btn"
        onclick="
          theoryRead[${levelId}] = true;
          closeModal();
          openChallenge(${levelId});
        "
      >

        Почати випробування

      </button>
    `

  );

}

/* =====================================================
   УНІВЕРСАЛЬНА МОДАЛКА
===================================================== */

function openSimpleModal(title,text){

  app.innerHTML += `

    <div
      class="modal-bg"
      id="modal"
    >

      <div class="modal">

        <button

          class="close-modal"

          onclick="
            closeModal()
          "

        >
          ×
        </button>

        <div class="modal-content">

          <h2>${title}</h2>

          ${text}

        </div>

      </div>

    </div>

  `;
}

/* =====================================================
   ТИМЧАСОВО
   ЩОБ ГРА ЗАПУСТИЛАСЯ
===================================================== */

function openChallenge(levelId){

  openSimpleModal(

    "Випробування",

    `
      Завдання для рівня
      ${levelId}

      <br><br>

      Наступним кроком
      додамо всі питання,
      сувої та фінальну битву.
    `

  );

}

/* =====================================================
   ЗАПУСК
===================================================== */

showStartScreen();

