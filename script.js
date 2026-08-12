const app = document.getElementById("app");

/* =====================================================
   CYBER LEGENDS
   Таємниця П'яти Кристалів
===================================================== */


/* =====================================================
   КАРТИНКИ
===================================================== */

const ASSETS = {

  /* ФОНИ */

  start: "fon/fon_start.png",
  map: "fon/NEW_FON_KARTAa.png",
  heroSelect: "fon/fon_vubir_heroiv.png",

  level1: "fon/fon_book.png",
  level2: "fon/fon_forest.png",
  level3: "fon/fon_ozero.png",
  level4: "fon/fon_kajjian.png",
  level5: "fon/fon_vylkan.png",

  citadel: "fon/Fon_mordor_1.png",

  /* міні ігри фони для 1 рівня */

  safeBuilderBg: "fon/fon_safe_builder.png",
  safeBuilderSafe: "artefaktu/safe_builder.png",
  weakHunterBg: "fon/weak-password-hunter-bg.png",
  keyManagerBg: "fon/key-manager-bg.png",
  syncKeyBg: "fon/sync-key-bg.png",
  /* ЛОГО */

  logo: "artefaktu/logo_game.png",

  /* АРТЕФАКТИ НАСТАВНИКІВ */

  artifactBook: "artefaktu/artefakt_knuga.png",
  artifactMagnifier: "artefaktu/artefakt_lupa.png",
  artifactMirror: "artefaktu/artefakt_dzerkalo.png",
  artifactSphere: "artefaktu/artefakt_sfera.png",
  artifactSword: "artefaktu/artefakt_mech.png",

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
   
 /* ПРОВІДНИК КІБЕРКОРОЛІВСТВА */

kodus: "geroi/did_kodys.png",

  /* МЕДАЛЬЙОНИ */

  medalTotus: "artefaktu/medaliony_1.png",
  medalFoxita: "artefaktu/medaliony_2.png",
  medalNereus: "artefaktu/medaliony_3.png",
  medalAnubisa: "artefaktu/medaliony_4.png",
  medalTifon: "artefaktu/medaliony_5.png",
  medalMordor: "artefaktu/maska_medaliony.png",

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
  purpleOn: "artefaktu/purple_kristal_2.png"
};


/* =====================================================
   ЗВУКИ
===================================================== */

const SOUNDS = {

  bg: new Audio("music/bg.mp3"),
  click: new Audio("music/click.mp3"),
  crystal: new Audio("music/crystal.mp3"),
  correct: new Audio("music/correct.mp3"),
  wrong: new Audio("music/wrong.mp3"),
  final: new Audio("music/final.mp3"),
  storm: new Audio("music/storm.mp3"),
     
 /* ОЗВУЧКА ВІЩУНА КОДУСА */
  kodusStart: new Audio("audio codyc/did_kodys_start.mp3")

};


function playSound(name) {

  const sound = SOUNDS[name];

  if (!sound) return;

  sound.currentTime = 0;

  sound.play().catch(() => {});
}


function startMusic() {

  SOUNDS.bg.loop = true;
  SOUNDS.bg.volume = 0.03;

  SOUNDS.click.volume = 0.8;
  SOUNDS.crystal.volume = 1;
  SOUNDS.correct.volume = 0.9;
  SOUNDS.wrong.volume = 0.9;
  SOUNDS.final.volume = 0.8;
  SOUNDS.storm.volume = 0.25;

   /* ВІЩУН КОДУС */
  SOUNDS.kodusStart.volume = 1;
  SOUNDS.kodusStart.playbackRate = 1,3;

  SOUNDS.bg.play().catch(() => {});

  SOUNDS.storm.loop = true;
  SOUNDS.storm.play().catch(() => {});
}

/*===================
document.addEventListener(
  "click",
  startMusic,
  { once: true }
);
===============*/

/* =====================================================
   ВСТУП — ВІЩУН КОДУС
===================================================== */

let kodusIntroOpened = false;


/* =====================================================
   ТЕКСТ ВСТУПУ КОДУСА
===================================================== */

const KODUS_INTRO_TEXT = `
Вітаю, юний герою! Я – Віщун Кодус, і я буду твоїм провідником у цій пригоді.
Колись наше КіберКоролівство сяяло завдяки Великому Кристалу Безпеки. 
Шість Хранителів берегли його силу. 
Серед них був і Мордер. Наставник, який мав захищати мешканців від хаосу. 
Але жага знати всі таємниці світу та володіти всією владою отруїла його серце. 
Мордер вирішив підкорити Кристал собі!
Щоб урятувати світ, головний хранитель Райфик розділив Кристал на п’ять частин і довірив їх Наставникам: Тотусу, Фоксіті, Нереусу, Байті та Айро.»
Лютий Мордер викрав Райфика і зачинив у Цитаделі Хаосу, а Королівство заполонили фейки, пастки та віруси. 
Легенда каже, що це ТИ — наша остання надія! Звільнити Райфика може лише той, хто поверне сяйво всім Кристалам! 
Пройди випробування Наставників, об’єднай силу п'яти Кристалів та здолай Мордера!
`;


/* =====================================================
   ДРУКАРСЬКА МАШИНКА
===================================================== */

function typeKodusText(element, text, speed = 35) {

  element.innerHTML = "";

  let index = 0;

  function typeNextCharacter() {

    if (index >= text.length) {
      return;
    }

    const character = text[index];

    if (character === "\n") {

      element.innerHTML += "<br>";

    } else {

      element.append(
        document.createTextNode(character)
      );

    }

    index++;

    setTimeout(
      typeNextCharacter,
      speed
    );
  }

  typeNextCharacter();
}


/* =====================================================
   ВІДКРИТИ ВСТУП КОДУСА
===================================================== */

function openKodusIntro() {

  if (kodusIntroOpened) return;

  kodusIntroOpened = true;


  /* ---------- ЗАТЕМНЕННЯ ---------- */

  const overlay =
    document.createElement("div");

  overlay.className =
    "kodus-intro-overlay";


  /* ---------- СЦЕНА ---------- */

  const scene =
    document.createElement("div");

  scene.className =
    "kodus-intro-scene";


  /* ---------- КОДУС ---------- */

  const kodus =
    document.createElement("img");

  kodus.className =
    "kodus-intro-character";

  kodus.src =
    ASSETS.kodus;

  kodus.alt =
    "Віщун Кодус";


  /* ---------- ДІАЛОГ ---------- */

  const dialogue =
    document.createElement("div");

  dialogue.className =
    "kodus-intro-dialogue";


  /* ---------- ІМ'Я ---------- */

  const name =
    document.createElement("div");

  name.className =
    "kodus-intro-name";

  name.textContent =
    "Віщун Кодус";


  /* ---------- ТЕКСТ ---------- */

  const text =
    document.createElement("div");

  text.className =
    "kodus-intro-text";


  /* ---------- КНОПКА ---------- */

  const button =
    document.createElement("button");

  button.className =
    "kodus-intro-button";

  button.textContent =
    "ДАЛІ";

  button.style.display =
    "none";


  dialogue.appendChild(name);

  dialogue.appendChild(text);

  dialogue.appendChild(button);


  scene.appendChild(kodus);

  scene.appendChild(dialogue);

  overlay.appendChild(scene);

  document.body.appendChild(overlay);


  /* =====================================================
     ЗАПУСК ОЗВУЧКИ
  ===================================================== */

  SOUNDS.kodusStart.currentTime = 0;

  SOUNDS.kodusStart.volume = 1;

  SOUNDS.kodusStart.playbackRate = 0.9;


  SOUNDS.kodusStart
    .play()
    .catch(() => {});


  /* =====================================================
     ЗАПУСК ДРУКУ ТЕКСТУ
  ===================================================== */

  typeKodusText(
    text,
    KODUS_INTRO_TEXT,
    55
  );


  /* =====================================================
     КОЛИ КОДУС ЗАКІНЧИВ ГОВОРИТИ
  ===================================================== */

  SOUNDS.kodusStart.onended = () => {

    button.style.display =
      "block";

    button.classList.add(
      "show"
    );
  };


  /* =====================================================
     КНОПКА "СТВОРИТИ ГЕРОЯ"
  ===================================================== */

  button.addEventListener(
    "click",
    () => {

      playSound("click");


      SOUNDS.kodusStart.pause();

      SOUNDS.kodusStart.currentTime = 0;


      overlay.classList.add(
        "hide"
      );


     setTimeout(() => {

    overlay.remove();

    /* Відкриваємо карту */
    showMap();

    /* Запускаємо музику вже на карті */
    startMusic();

    /* Показуємо Кодуса на карті */
    setTimeout(() => {
        showKodusMapHint();
    }, 700);

}, 700);
});

}

/* =====================================================
   ЗАПУСТИТИ КОДУСА ПІСЛЯ КНОПКИ "ПОЧАТИ ГРУ"
===================================================== */

function startKodusIntro() {

  openKodusIntro();

}
/* =====================================================
   КОДУС — ПІДКАЗКА НА КАРТІ
===================================================== */

function showKodusMapHint() {

    const oldHint = document.querySelector(".kodus-map-hint");

    if (oldHint) {
        oldHint.remove();
    }

    const hint = document.createElement("div");

    hint.className = "kodus-map-hint";

    hint.innerHTML = `
        <img
            class="kodus-map-character"
            src="${ASSETS.kodus}"
            alt="Віщун Кодус"
        >

        <div class="kodus-map-dialogue">

            <div class="kodus-map-name">
                Віщун Кодус
            </div>

            <div class="kodus-map-text">
                Твоя подорож починається!
                Але перш ніж вирушити до першої локації,
                створи свого Героя.
            </div>

            <button
                class="kodus-map-button"
                onclick="closeKodusMapHint()"
            >
                ЗРОЗУМІЛО
            </button>

        </div>
    `;

    document.body.appendChild(hint);
}


function closeKodusMapHint() {

    const hint = document.querySelector(".kodus-map-hint");

    if (hint) {
        hint.remove();
    }
}
       
/* =====================================================
   СТАН ГРИ
===================================================== */

let selectedHero = "boy";
let heroName = "";

let completedLevels = [];
let completedTasks = {};
let theoryRead = {};


/* =====================================================
   ДОПОМІЖНІ ФУНКЦІЇ
===================================================== */

function bg(image) {

  return `style="--bg:url('${image}')"`;
}


function closeModal() {

  const modals =
    document.querySelectorAll(".modal-bg");

  if (modals.length > 0) {
    modals[modals.length - 1].remove();
  }
}


function getHeroImage() {

  return selectedHero === "girl"
    ? ASSETS.girl
    : ASSETS.boy;
}


/* =====================================================
   ЛЕГЕНДА КОРОЛІВСТВА
===================================================== */

const KINGDOM_STORY = `
  <div class="kingdom-story">

    <div class="story-highlight">

      <p>
        Колись у Королівстві КіберЛегенд панували мир,
        знання та безпека.
        У самому центрі королівства сяяв могутній
        Кристал БЕЗПЕКИ.
      </p>

      <p>
        Він допомагав мешканцям відрізняти правду
        від брехні, берегти особисті секрети
        та безпечно подорожувати цифровими світами.
      </p>

    </div>

    <p>
      Кристал охороняли п'ять великих наставників:
      Тотус, Фоксіта, Нереус, Анубіса та Тіфон.
      Разом із ними жив вірний друг королівства —
      кіберкінь Райфик.
    </p>

    <p>
      Але колишній хранитель Мордор захотів отримати
      всю силу знань лише для себе.
      Він викрав Райфика, накрив королівство цифровою
      грозою та розколов Кристал Мудрості
      на п'ять частин.
    </p>

    <p>
      Тепер новий герой має пройти всі локації,
      зарядити п'ять кристалів,
      звільнити Райфика та зупинити Мордора.
    </p>

    <h3>Наставники Королівства</h3>

    <div id="storyMentorsHere"></div>

  </div>
`;


/* =====================================================
   НАСТАВНИКИ
===================================================== */

const MENTORS = [

  {
    id: 1,
    name: "Тотус",
    role: "Хранитель Замку Паролів",
    img: ASSETS.totus,
    medal: ASSETS.medalTotus,
    artifact: "Книга знань",

    story: `
      Тотус є найстарішим наставником Королівства КіберЛегенд.
      Його велика бібліотека містить знання про всі паролі світу.
      Він навчає мешканців створювати надійні секретні коди
      та нікому їх не розповідати.
      Кажуть, що жоден злий чаклун не зміг відкрити двері його замку.
      Тотус вірить, що сильний пароль — це перший щит будь-якого героя.
      Саме він зберігає Жовтий Кристал Мудрості.
    `
  },

  {
    id: 2,
    name: "Фоксіта",
    role: "Хранителька Лісу Приманок",
    img: ASSETS.foxita,
    medal: ASSETS.medalFoxita,
    artifact: "Лупа істини",

    story: `
      Фоксіта живе серед чарівного лісу,
      де ховаються підступні пастки та фальшиві повідомлення.
      Вона має надзвичайно гострий зір
      і помічає навіть найменший обман.
      Фоксіта навчає дітей перевіряти посилання,
      адреси сайтів та підозрілі листи.
      Завдяки її уважності жодна приманка
      не може довго залишатися прихованою.
      Вона охороняє Зелений Кристал Пильності.
    `
  },

  {
    id: 3,
    name: "Нереус",
    role: "Хранитель Озера Фейків",
    img: ASSETS.nereus,
    medal: ASSETS.medalNereus,
    artifact: "Дзеркало правди",

    story: `
      У глибинах чарівного озера мешкає мудрий Нереус.
      Його дзеркало показує правду навіть тоді,
      коли навколо панує брехня.
      Він навчає героїв перевіряти інформацію
      та не довіряти всьому,
      що вони бачать в Інтернеті.
      Нереус знає, що правда іноді ховається дуже глибоко.
      Під його захистом знаходиться Блакитний Кристал Правди.
    `
  },

  {
    id: 4,
    name: "Анубіса",
    role: "Хранителька Печери Даних",
    img: ASSETS.anubisa,
    medal: ASSETS.medalAnubisa,
    artifact: "Сфера даних",

    story: `
      Анубіса охороняє найцінніші секрети королівства.
      Вона живе у сяючій печері кристалів,
      де зберігаються особисті дані мешканців.
      Її магічна сфера попереджає про небезпеку,
      коли хтось намагається викрасти чужу інформацію.
      Анубіса навчає ніколи не розповідати свої паролі,
      адреси чи особисті таємниці незнайомцям.
      Вона є хранителькою Рожевого Кристала Таємниць.
    `
  },

  {
    id: 5,
    name: "Тіфон",
    role: "Хранитель Фортеці Захисту",
    img: ASSETS.tifon,
    medal: ASSETS.medalTifon,
    artifact: "Меч захисту",

    story: `
      Тіфон охороняє могутню Фортецю Захисту біля Вогняних Гір.
      Його вогняний меч знищує небезпечні віруси
      та шкідливі програми.
      Він навчає героїв оновлювати пристрої
      та бути обережними з невідомими файлами.
      Тіфон знає, що навіть маленька помилка
      може відкрити двері великій небезпеці.
      Саме тому він завжди стоїть на варті безпеки.
      Під його захистом знаходиться Червоний Кристал Сили.
    `
  }

];


function renderStoryMentorButtons() {

  return MENTORS.map(mentor => `

    <button
      class="story-mentor-card"
      onclick="openMentorInfo(${mentor.id})"
    >

      <img
        src="${mentor.medal}"
        alt="${mentor.name}"
      >

      <span>
        ${mentor.name}
      </span>

    </button>

  `).join("");
}


/* =====================================================
   ЦИФРОВА ГРОЗА
===================================================== */

function renderDigitalStorm() {

  const columns = [];

  for (let i = 0; i < 16; i++) {

    columns.push(`

      <span
        class="rain-column"
        style="
          left:${4 + i * 6}%;
          animation-delay:${(i % 6) * 0.7}s;
        "
      >
        1<br>0<br>1<br>🔒<br>0<br>1
      </span>

    `);
  }

  return `
    <div class="digital-storm">
      ${columns.join("")}
    </div>
  `;
}


/* =====================================================
   СТАРТОВИЙ ЕКРАН
===================================================== */

function showStartScreen() {

  app.innerHTML = `

    <section
      class="screen start-screen"
      ${bg(ASSETS.start)}
    >

      ${renderDigitalStorm()}

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
            onclick="playSound('click'); startKodusIntro()"
          >
            Почати пригоду
          </button>

          <button
            class="btn"
            onclick="playSound('click'); openKingdomStory()"
          >
            Історія
          </button>

          <button
            class="btn"
            onclick="playSound('click'); openSettings()"
          >
            Налаштування
          </button>

        </div>

      </div>

    </section>
  `;
}


/* =====================================================
   МОДАЛЬНІ ВІКНА
===================================================== */

function openModal(
  title,
  content,
  extraClass = ""
) {

  app.innerHTML += `

    <div
      class="modal-bg"
      id="modal"
    >

      <div class="modal ${extraClass}">

        <button
          class="close-modal"
          onclick="closeModal()"
        >
          ×
        </button>

        <div class="modal-content">

          <h2>
            ${title}
          </h2>

          ${content}

        </div>

      </div>

    </div>
  `;
}


function openKingdomStory() {

  openModal(

    "Легенда Королівства КіберЛегенд",

    `
      ${KINGDOM_STORY}

      <div class="story-mentors-row">
        ${renderStoryMentorButtons()}
      </div>
    `,

    "story-modal"

  );
}


function openSettings() {

  openModal(

    "Налаштування",

    `
      <p>
        Тут пізніше можна буде керувати
        музикою, підказками та озвучкою.
      </p>

      <ul>
        <li>фонова музика;</li>
        <li>звук кліків;</li>
        <li>звук зарядження кристала;</li>
        <li>правильна та неправильна відповідь;</li>
        <li>фінальна перемога.</li>
      </ul>
    `
  );
}


/* =====================================================
   КАРТКА НАСТАВНИКА
===================================================== */

function openMentorInfo(mentorId) {

  const mentor =
    MENTORS.find(item => item.id === mentorId);

  if (!mentor) return;

  openModal(

    mentor.name,

    `
      <div class="mentor-modal-layout">

        <img
          class="mentor-modal-image"
          src="${mentor.img}"
          alt="${mentor.name}"
        >

        <div class="mentor-modal-text">

          <h2>
            ${mentor.name}
          </h2>

          <div class="mentor-role">
            ${mentor.role}
          </div>

          <p>
            <b>Артефакт:</b>
            ${mentor.artifact}
          </p>

          <p>
            ${mentor.story}
          </p>

        </div>

      </div>
    `
  );
}


/* =====================================================
   РІВНІ / ЛОКАЦІЇ
===================================================== */

const LEVELS = [

  {
    id: 1,
    title: "Замок Паролів",
    mentorId: 1,
    bg: ASSETS.level1,
    medal: ASSETS.medalTotus,
    artifact: ASSETS.artifactBook,
    crystalOff: ASSETS.yellowOff,
    crystalOn: ASSETS.yellowOn,
    color: "#ffd54a",
    x: 37,
    y: 75
  },

  {
    id: 2,
    title: "Ліс Приманок",
    mentorId: 2,
    bg: ASSETS.level2,
    medal: ASSETS.medalFoxita,
    artifact: ASSETS.artifactMagnifier,
    crystalOff: ASSETS.greenOff,
    crystalOn: ASSETS.greenOn,
    color: "#42e66f",
    x: 48,
    y: 54
  },

  {
    id: 3,
    title: "Озеро Фейків",
    mentorId: 3,
    bg: ASSETS.level3,
    medal: ASSETS.medalNereus,
    artifact: ASSETS.artifactMirror,
    crystalOff: ASSETS.blueOff,
    crystalOn: ASSETS.blueOn,
    color: "#39b7ff",
    x: 64,
    y: 61
  },

  {
    id: 4,
    title: "Печера Даних",
    mentorId: 4,
    bg: ASSETS.level4,
    medal: ASSETS.medalAnubisa,
    artifact: ASSETS.artifactSphere,
    crystalOff: ASSETS.pinkOff,
    crystalOn: ASSETS.pinkOn,
    color: "#ff78d7",
    x: 64,
    y: 36
  },

  {
    id: 5,
    title: "Фортеця Захисту",
    mentorId: 5,
    bg: ASSETS.level5,
    medal: ASSETS.medalTifon,
    artifact: ASSETS.artifactSword,
    crystalOff: ASSETS.redOff,
    crystalOn: ASSETS.redOn,
    color: "#ff4a35",
    x: 77,
    y: 50
  }

];


const CITADEL = {

  title: "Цитадель Хаосу",

  crystalOff: ASSETS.purpleOff,
  crystalOn: ASSETS.purpleOn,

  medal: ASSETS.medalMordor,

  x: 70,
  y: 10
};


/* =====================================================
   КАРТА
===================================================== */

function showMap() {

  const allDone =
    completedLevels.length >= 5;

  app.innerHTML = `

    <section
      class="screen map-screen"
      ${bg(ASSETS.map)}
    >

      ${!allDone ? renderDigitalStorm() : ""}

      <button
        class="btn back-btn"
        onclick="
          playSound('click');
          showStartScreen();
        "
      >
        ← Назад
      </button>

      <button
        class="btn map-story-button"
        onclick="
          playSound('click');
          openKingdomStory();
        "
      >
        Історія
      </button>

      <div class="map-hero-button">

        <button
          class="btn"
          onclick="
            playSound('click');
            showHeroSelect();
          "
        >
          ${
            heroName
              ? "Герой: " + heroName
              : "Створити героя"
          }
        </button>

      </div>

      ${renderCrystalPanel()}

      ${
        LEVELS
          .map(level => renderMapLevel(level))
          .join("")
      }

      ${renderCitadelButton(allDone)}

    </section>
  `;
}


function renderMapLevel(level) {

  return `

    <button
      class="map-level"
      style="
        left:${level.x}%;
        top:${level.y}%;
      "
      onclick="
        playSound('click');
        showLevel(${level.id});
      "
    >

      <img
        class="map-level-medal"
        src="${level.medal}"
        alt="${level.title}"
      >

      <div class="map-level-title">
        ${level.title}
      </div>

    </button>
  `;
}


function renderCitadelButton(allDone) {

  return `

    <button
      class="map-level"
      style="
        left:${CITADEL.x}%;
        top:${CITADEL.y}%;
      "
      onclick="
        playSound('click');
        ${
          allDone
            ? "showCitadel()"
            : "citadelLocked()"
        }
      "
    >

      <img
        class="map-level-medal"
        src="${
          allDone
            ? CITADEL.crystalOn
            : CITADEL.crystalOff
        }"
        alt="Цитадель Хаосу"
      >

      <div class="map-level-title">
        ${CITADEL.title}
      </div>

    </button>
  `;
}


/* =====================================================
   ЛІВА ПАНЕЛЬ КРИСТАЛІВ
===================================================== */

function renderCrystalPanel() {

  const completedCount =
    completedLevels.length;

  const totalPercent =
    completedCount * 20;


  const rows =
    LEVELS.map(level => {

      const doneTasks =
        completedTasks[level.id] || [];

      const percent =
        doneTasks.length * 25;

      const done =
        completedLevels.includes(level.id);


      return `

        <div
          class="
            crystal-row
            ${done ? "active" : ""}
          "
          style="color:${level.color}"
        >

          <span class="crystal-check">
            ${done ? "✅" : "🔒"}
          </span>

          <img
            src="${
              done
                ? level.crystalOn
                : level.crystalOff
            }"
            alt="${level.title}"
          >

          <span>
            ${level.title}
          </span>

          <span class="crystal-percent">
            ${percent}%
          </span>

        </div>
      `;

    }).join("");


  const allDone =
    completedLevels.length >= 5;


  return `

    <div class="crystal-panel">

      <div class="crystal-panel-title">
        Зарядження кристалів
      </div>

      <div class="crystal-total">
        ${completedCount} / 5 відновлено • ${totalPercent}%
      </div>

      ${rows}

      <div
        class="
          crystal-row
          ${allDone ? "active" : ""}
        "
        style="color:#b95cff"
      >

        <span class="crystal-check">
          ${allDone ? "✅" : "🔒"}
        </span>

        <img
          src="${
            allDone
              ? ASSETS.purpleOn
              : ASSETS.purpleOff
          }"
          alt="Цитадель Хаосу"
        >

        <span>
          Цитадель Хаосу
        </span>

        <span class="crystal-percent">
          ${allDone ? "100%" : "0%"}
        </span>

      </div>

    </div>
  `;
}


/* =====================================================
   ВИБІР ГЕРОЯ
===================================================== */

function showHeroSelect() {

  app.innerHTML = `

    <section
      class="screen hero-select-screen"
      ${bg(ASSETS.heroSelect)}
    >

      <button
        class="btn back-btn"
        onclick="
          playSound('click');
          showMap();
        "
      >
        ← Назад
      </button>

      <div class="mentor-side">

        <div class="mentor-side-title">
          Натискай на наставника
        </div>

        ${
          MENTORS.map(mentor => `

            <img
              class="mentor-medal"
              src="${mentor.medal}"
              alt="${mentor.name}"
              onclick="
                playSound('click');
                openMentorInfo(${mentor.id});
              "
            >

          `).join("")
        }

      </div>

      <div class="hero-stage">

        <div class="hero-podium"></div>

        <img
          class="hero-stage-preview"
          src="${getHeroImage()}"
          alt="Обраний герой"
        >

      </div>

      <img
        class="hero-small-logo"
        src="${ASSETS.logo}"
        alt="Cyber Legends"
      >

      <div class="hero-curtain">

        <h1>
          Вибери героя для проходження пригоди
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
            alt="Хлопчик"
            onclick="
              playSound('click');
              chooseHero('boy');
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
            alt="Дівчинка"
            onclick="
              playSound('click');
              chooseHero('girl');
            "
          >

        </div>

        <input
          id="heroNameInput"
          class="hero-name-input"
          placeholder="Введи ім’я героя"
          value="${heroName}"
        >

        <button
          class="btn"
          onclick="
            playSound('click');
            createHero();
          "
        >
          Створити героя
        </button>

      </div>

    </section>
  `;
}


function chooseHero(type) {

  selectedHero = type;

  showHeroSelect();
}


function createHero() {

  const input =
    document.getElementById("heroNameInput");

  heroName =
    input.value.trim();

  if (!heroName) {

    openModal(
      "Введи ім’я героя",
      "<p>Спочатку напиши ім’я героя.</p>"
    );

    return;
  }

  const greeting =
    selectedHero === "girl"
      ? `Вітаємо тебе, красуне ${heroName}!`
      : `Вітаємо тебе, юначе ${heroName}!`;

  openHeroScroll(greeting);
}


function openHeroScroll(greeting) {

  openModal(

    "Героя створено",

    `
      <div class="scroll-modal">

        <h2>
          ${greeting}
        </h2>

        <p>
          Попереду на тебе чекає велика пригода.
        </p>

        <p>
          П'ять наставників,
          п'ять артефактів
          та П'ять Кристалів.
        </p>

        <p>
          Врятуй Райфіка та переможи Мордора.
        </p>

        <button
          class="btn"
          onclick="
            playSound('click');
            closeModal();
            showMap();
          "
        >
          Повернутись до карти
        </button>

      </div>
    `
  );
}


/* =====================================================
   ТЕКСТИ РІВНІВ
===================================================== */

const LEVEL_CONTENT = {

  1: {

    storyTitle: "Замок Паролів",

    intro: `
      <p>
        Тотус зустрічає героя біля воріт Замку Паролів.
        У цьому замку зберігаються секретні ключі
        мешканців Королівства.
      </p>

      <p>
        Мордор намагається підібрати слабкі паролі
        та відкрити захисні брами.
        Щоб зупинити його,
        потрібно навчитися створювати надійні паролі.
      </p>
    `,

    theory: [
      "Пароль — це секретний ключ до акаунта.",
      "Надійний пароль має бути довгим.",
      "Не використовуй своє ім’я, дату народження або прості слова.",
      "Краще поєднувати літери, цифри та символи.",
      "Не використовуй один пароль всюди.",
      "Нікому не передавай свій пароль.",
      "Двофакторна автентифікація додає ще один рівень захисту."
    ]
  },


  2: {

    storyTitle: "Ліс Приманок",

    intro: `
      <p>
        Фоксіта веде героя стежкою крізь Ліс Приманок.
        Тут усе може виглядати безпечно,
        але за гарними обіцянками часто ховаються пастки.
      </p>

      <p>
        Мордор залишив у лісі фальшиві листи,
        дивні посилання та повідомлення з подарунками.
        Завдання героя — навчитися розпізнавати фішинг.
      </p>
    `,

    theory: [
      "Фішинг — це спроба виманити паролі або особисті дані.",
      "Шахраї часто пишуть: «Терміново!» або «Ви виграли подарунок!».",
      "Перед переходом за посиланням перевір адресу сайту.",
      "Не вводь пароль на невідомих сторінках.",
      "Не відкривай підозрілі вкладення.",
      "Якщо сумніваєшся — запитай дорослого.",
      "Справжні сервіси не просять пароль у повідомленнях."
    ]
  },


  3: {

    storyTitle: "Озеро Фейків",

    intro: `
      <p>
        Нереус показує герою Озеро Фейків.
        У його водах відображаються новини,
        фото та повідомлення з усього цифрового світу.
      </p>

      <p>
        Але Мордор змішав правду з вигадками.
        Тепер герой має навчитися перевіряти інформацію.
      </p>
    `,

    theory: [
      "Фейк — це неправдива або перекручена інформація.",
      "Не все, що написано в Інтернеті, є правдою.",
      "Перевіряй джерело інформації.",
      "Дивись на дату публікації.",
      "Не довіряй лише гучному заголовку.",
      "Шукай підтвердження в кількох надійних джерелах.",
      "Якщо новина дуже емоційна — краще перевірити її ще раз."
    ]
  },


  4: {

    storyTitle: "Печера Даних",

    intro: `
      <p>
        Анубіса запрошує героя до Печери Даних.
        Тут зберігаються найцінніші скарби Королівства —
        особисті дані мешканців.
      </p>

      <p>
        Мордор хоче викрасти ці дані,
        щоб послабити захист Королівства.
        Герой має навчитися відрізняти
        безпечну інформацію від приватної.
      </p>
    `,

    theory: [
      "Особисті дані — це інформація, за якою можна впізнати людину.",
      "До особистих даних належать адреса, номер телефону, паролі, документи.",
      "Фото документів не можна публікувати у відкритому доступі.",
      "Не повідомляй незнайомцям, де ти живеш або навчаєшся.",
      "Перед тим як щось опублікувати, подумай, хто це побачить.",
      "Якщо хтось просить особисті дані — звернись до дорослого.",
      "Дані потрібно берегти так само, як справжні скарби."
    ]
  },


  5: {

    storyTitle: "Фортеця Захисту",

    intro: `
      <p>
        Тіфон зустрічає героя біля Фортеці Захисту.
        Навколо літають іскри,
        а біля воріт з’являються віруси Мордора.
      </p>

      <p>
        Щоб захистити Королівство,
        герой має навчитися розпізнавати небезпечні файли
        та не відкривати підозрілі посилання.
      </p>
    `,

    theory: [
      "Віруси можуть потрапити на пристрій через підозрілі файли.",
      "Не відкривай файли від незнайомих людей.",
      "Оновлення допомагають закривати слабкі місця системи.",
      "Антивірус допомагає знаходити загрози.",
      "Не завантажуй програми з невідомих сайтів.",
      "Якщо файл виглядає дивно — не відкривай його.",
      "Краще запитати дорослого, ніж ризикувати безпекою."
    ]
  }

};


/* =====================================================
   ЕКРАН РІВНЯ
===================================================== */

function showLevel(levelId) {

  const level =
    LEVELS.find(item => item.id === levelId);

  if (!level) return;

  const mentor =
    MENTORS.find(item => item.id === level.mentorId);

  const done =
    completedTasks[levelId] || [];

  const progress =
    done.length * 25;


  app.innerHTML = `

    <section
      class="screen level-screen"
      ${bg(level.bg)}
    >

      <button
        class="btn back-btn"
        onclick="
          playSound('click');
          showMap();
        "
      >
        ← До карти
      </button>

      <div class="level-progress">

        <div class="level-progress-title">
          ${level.title}
        </div>

        <div class="level-progress-text">
          Кристал заряджено: ${progress}%
        </div>

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
        src="${mentor.img}"
        alt="${mentor.name}"
        onclick="
          playSound('click');
          openLevelTheory(${levelId});
        "
      >

      <div class="level-actions">

        <button
          class="btn"
          onclick="
            playSound('click');
            openLevelTheory(${levelId});
          "
        >
          Історія і теорія
        </button>

        <button
          class="btn"
          onclick="
            playSound('click');
            openChallenge(${levelId});
          "
        >
          Почати випробування
        </button>

      </div>

    </section>
  `;
}


/* =====================================================
   ІСТОРІЯ + ТЕОРІЯ
===================================================== */

function openLevelTheory(levelId) {

  const level =
    LEVELS.find(item => item.id === levelId);

  if (!level) return;

  const mentor =
    MENTORS.find(item => item.id === level.mentorId);

  const content =
    LEVEL_CONTENT[levelId];

  if (!mentor || !content) return;


  openModal(

    content.storyTitle,

    `
      <div class="theory-box">

        <img
          src="${mentor.img}"
          alt="${mentor.name}"
        >

        <div class="theory-text">

          <h3>
            ${mentor.name} пояснює
          </h3>

          ${content.intro}

          <div class="task-instruction">
            Що потрібно запам’ятати:
          </div>

          <ol class="theory-list">

            ${
              content.theory
                .map(item => `<li>${item}</li>`)
                .join("")
            }

          </ol>

          <button
            class="btn"
            onclick="
              playSound('click');
              closeModal();
              openChallenge(${levelId});
            "
          >
            Почати випробування
          </button>

        </div>

      </div>
    `
  );
}


/* =====================================================
   ЗАВДАННЯ РІВНІВ
===================================================== */

const CHALLENGES = {


  /* ===================================================
     РІВЕНЬ 1 — ТОТУС
  =================================================== */

  1: [

    {
      type: "password-builder",
      title: "Будівельник сейфу"
    },

    {
      type: "weak-password-hunter",
      title: "Полювальник за слабкостями"
    },

    {
      type: "password-manager",
      title: "Менеджер ключів"
    },

    {
      type: "two-factor",
      title: "Синхронний ключ"
    }

  ],


  /* ===================================================
     РІВЕНЬ 2 — ФОКСІТА
  =================================================== */

  2: [

    {
      title: "Підозріле посилання",
      question:
        "Що треба зробити перед переходом за посиланням?",

      answers: [
        "Перевірити адресу сайту",
        "Натиснути одразу",
        "Скинути друзям"
      ],

      correct: 0
    },

    {
      title: "Що таке фішинг?",

      question:
        "Фішинг — це коли...",

      answers: [
        "Шахраї виманюють дані",
        "Оновлюється гра",
        "Змінюється фон"
      ],

      correct: 0
    },

    {
      title: "Лист-пастка",

      question:
        "Підозрілий лист просить пароль. Що робити?",

      answers: [
        "Ввести пароль",
        "Повідомити дорослим",
        "Переслати всім"
      ],

      correct: 1
    },

    {
      title: "Ознаки шахрайства",

      question:
        "Що може бути ознакою шахрайства?",

      answers: [
        "Помилки в тексті",
        "Тиск і терміновість",
        "Обидва варіанти"
      ],

      correct: 2
    }

  ],


  /* ===================================================
     РІВЕНЬ 3 — НЕРЕУС
  =================================================== */

  3: [

    {
      title: "Гучна новина",

      question:
        "Що треба зробити з гучною новиною?",

      answers: [
        "Одразу поширити",
        "Перевірити джерело",
        "Повірити заголовку"
      ],

      correct: 1
    },

    {
      title: "Фейк чи правда",

      question:
        "Фейк — це...",

      answers: [
        "Неправдива інформація",
        "Корисна підказка",
        "Сильний пароль"
      ],

      correct: 0
    },

    {
      title: "Надійне джерело",

      question:
        "Якому джерелу краще довіряти?",

      answers: [
        "Анонімному чату",
        "Офіційному сайту",
        "Невідомому скріну"
      ],

      correct: 1
    },

    {
      title: "Перевірка",

      question:
        "Якщо інформація викликає сумнів:",

      answers: [
        "Перевірити в кількох джерелах",
        "Повірити одразу",
        "Поширити швидше"
      ],

      correct: 0
    }

  ],


  /* ===================================================
     РІВЕНЬ 4 — АНУБІСА
  =================================================== */

  4: [

    {
      title: "Особисті дані",

      question:
        "Які дані не можна публікувати відкрито?",

      answers: [
        "Адресу і телефон",
        "Улюблений колір",
        "Назву гри"
      ],

      correct: 0
    },

    {
      title: "Що таке дані?",

      question:
        "Особиста інформація — це...",

      answers: [
        "Дані про людину",
        "Назва рівня",
        "Колір кнопки"
      ],

      correct: 0
    },

    {
      title: "Фото документів",

      question:
        "Що робити з фото документів?",

      answers: [
        "Публікувати всюди",
        "Зберігати обережно",
        "Кидати в чат"
      ],

      correct: 1
    },

    {
      title: "Скарби Анубіси",

      question:
        "Чому важливо берегти дані?",

      answers: [
        "Щоб шахраї їх не використали",
        "Бо так красивіше",
        "Щоб було більше файлів"
      ],

      correct: 0
    }

  ],


  /* ===================================================
     РІВЕНЬ 5 — ТІФОН
  =================================================== */

  5: [

    {
      title: "Підозрілий файл",

      question:
        "Що робити з підозрілим файлом?",

      answers: [
        "Відкрити",
        "Не відкривати",
        "Запустити одразу"
      ],

      correct: 1
    },

    {
      title: "Оновлення",

      question:
        "Навіщо оновлювати пристрій?",

      answers: [
        "Для захисту",
        "Щоб було повільніше",
        "Щоб зник інтернет"
      ],

      correct: 0
    },

    {
      title: "Антивірус",

      question:
        "Антивірус допомагає...",

      answers: [
        "Захищати пристрій",
        "Створювати фейки",
        "Ламати пароль"
      ],

      correct: 0
    },

    {
      title: "Порада Тіфона",

      question:
        "Як діяти, якщо файл дивний?",

      answers: [
        "Порадитись з дорослим",
        "Відкрити",
        "Надіслати всім"
      ],

      correct: 0
    }

  ]

};


/* =====================================================
   ВІДКРИТИ ВИПРОБУВАННЯ
===================================================== */

function openChallenge(levelId) {

  const level =
    LEVELS.find(item => item.id === levelId);

  const tasks =
    CHALLENGES[levelId];

  const done =
    completedTasks[levelId] || [];


  if (!level || !tasks) {

    openModal(

      "Помилка",

      `
        <p>
          Не вдалося відкрити
          випробування цього рівня.
        </p>
      `
    );

    return;
  }


  openModal(

    "Випробування: " + level.title,

    `
      <div class="task-instruction">
        Виконай 4 завдання,
        щоб зарядити кристал на 100%.
      </div>

      <div class="challenge-grid">

        ${
          tasks.map((task, index) => `

            <button
              class="challenge-card"
              onclick="
                playSound('click');
                openTask(${levelId}, ${index});
              "
            >

              <img
                src="${level.artifact}"
                alt="Артефакт рівня ${level.title}"
              >

              <div class="challenge-card-title">
                ${task.title}
              </div>

              <div class="challenge-card-status">

                ${
                  done.includes(index)
                    ? "✅ виконано"
                    : "почати"
                }

              </div>

            </button>

          `).join("")
        }

      </div>
    `
  );
}

/* =====================================================
   ВІДКРИТИ ЗАВДАННЯ
===================================================== */

function openTask(levelId, taskIndex) {

  const task =
    CHALLENGES[levelId]?.[taskIndex];

  if (!task) {
    console.error(
      "Не знайдено завдання:",
      levelId,
      taskIndex
    );

    return;
  }

  closeModal();


  /* ===================================================
     РІВЕНЬ 1 — ЗАМОК ПАРОЛІВ
  =================================================== */

  if (levelId === 1) {

    /* -----------------------------------------------
       КНИГА 1
       БУДІВЕЛЬНИК СЕЙФУ
    ----------------------------------------------- */

    if (
      taskIndex === 0 ||
      task.type === "password-builder"
    ) {

      openPasswordBuilder(
        levelId,
        taskIndex
      );

      return;
    }


    /* -----------------------------------------------
       КНИГА 2
       ПОЛЮВАННЯ ЗА СЛАБКОСТЯМИ
    ----------------------------------------------- */

    if (
      taskIndex === 1 ||
      task.type === "weak-password-hunter"
    ) {

      openWeakPasswordHunter(
        levelId,
        taskIndex
      );

      return;
    }


    /* -----------------------------------------------
       КНИГА 3
       МЕНЕДЖЕР КЛЮЧІВ
    ----------------------------------------------- */

    if (
      taskIndex === 2 ||
      task.type === "password-manager"
    ) {

      openKeyManager(
        levelId,
        taskIndex
      );

      return;
    }


    /* -----------------------------------------------
       КНИГА 4
       СИНХРОННИЙ КЛЮЧ
    ----------------------------------------------- */

    if (
      taskIndex === 3 ||
      task.type === "two-factor"
    ) {

      openSyncKeyGame(
        levelId,
        taskIndex
      );

      return;
    }

  }


  /* ===================================================
     ІНШІ РІВНІ
     Поки залишаємо стандартну логіку
  =================================================== */

  if (
    typeof openStandardTask === "function"
  ) {

    openStandardTask(
      levelId,
      taskIndex
    );

    return;
  }


  console.warn(
    "Для цього завдання поки немає окремої мінігри:",
    levelId,
    taskIndex,
    task.type
  );

}


 


/* =====================================================
   ЗАВЕРШЕННЯ МІНІГРИ
===================================================== */

function completeMiniGame(
  levelId,
  taskIndex,
  message
) {

  if (!completedTasks[levelId]) {
    completedTasks[levelId] = [];
  }


  if (
    !completedTasks[levelId]
      .includes(taskIndex)
  ) {

    completedTasks[levelId]
      .push(taskIndex);
  }


  const progress =
    completedTasks[levelId].length * 25;


  playSound("correct");


  if (progress >= 100) {

    if (
      !completedLevels.includes(levelId)
    ) {

      completedLevels.push(levelId);
    }


    playSound("crystal");

    closeModal();

    openLevelReward(levelId);

    return;
  }


  const resultBox =
    document.getElementById("result");


  if (!resultBox) return;


  resultBox.innerHTML = `

    <div class="story-highlight">

      <p>
        ✅ ${message}
      </p>

      <p>
        Жовтий кристал заряджено
        на ${progress}%.
      </p>

    </div>

    <button
      class="btn"
      onclick="
        playSound('click');
        closeModal();
        openChallenge(${levelId});
      "
    >
      До наступного завдання
    </button>
  `;
}

/* =====================================================
   РІВЕНЬ 1 — ЗАМОК ПАРОЛІВ
   4 МІНІГРИ
===================================================== */


/* =====================================================
   СПІЛЬНА ЛОГІКА ПРОГРЕСУ РІВНЯ 1
===================================================== */

function registerPasswordCastleTask(
  levelId,
  taskIndex
) {

  if (!completedTasks[levelId]) {
    completedTasks[levelId] = [];
  }

  if (
    !completedTasks[levelId]
      .includes(taskIndex)
  ) {

    completedTasks[levelId]
      .push(taskIndex);
  }

  const progress =
    Math.min(
      completedTasks[levelId].length * 25,
      100
    );

  if (
    progress >= 100 &&
    !completedLevels.includes(levelId)
  ) {

    completedLevels.push(levelId);
  }

  return progress;
}


/* =====================================================
   ПОВЕРНЕННЯ ПІСЛЯ МІНІГРИ
===================================================== */

function returnFromPasswordCastleTask(
  levelId,
  progress
) {

  playSound("click");

  if (progress >= 100) {

    showPasswordCastleFinal(
      levelId
    );

    return;
  }

  showLevel(levelId);

  openChallenge(levelId);
}


/* =====================================================
   МІНІГРА 1 — БУДІВЕЛЬНИК СЕЙФУ
===================================================== */

let passwordBuilderState = {

  word: "",
  customWord: "",
  symbol: "",
  length: "",
  letterCase: ""

};


let safeSelectedCard = null;


/* =====================================================
   ВІДКРИТТЯ БУДІВЕЛЬНИКА
===================================================== */

function openPasswordBuilder(
  levelId,
  taskIndex
) {

  closeModal();

  passwordBuilderState = {

    word: "",
    customWord: "",
    symbol: "",
    length: "",
    letterCase: ""

  };

  safeSelectedCard = null;

  app.innerHTML = `

    <section
      class="screen safe-builder-screen"
      ${bg(ASSETS.safeBuilderBg)}
    >

      <button
        class="btn safe-builder-back"
        onclick="
          playSound('click');
          showLevel(${levelId});
          openChallenge(${levelId});
        "
      >
        ← До випробувань
      </button>


      <div
        id="safeBuilderGameArea"
        class="safe-builder-game-area"
      ></div>


      <div
        id="safeBuilderMentorStage"
        class="safe-builder-mentor-stage"
      >

        <button
          type="button"
          class="safe-builder-mentor-button"
          onclick="
            showSafeBuilderInstructions(
              ${levelId},
              ${taskIndex}
            )
          "
        >

          <img
            class="safe-builder-mentor"
            src="${ASSETS.totus}"
            alt="Наставник Тотус"
          >

        </button>

        <div class="safe-builder-mentor-hint">
          Натисни на наставника
        </div>

      </div>

    </section>
  `;

  playSound("click");
}


/* =====================================================
   ТОТУС — ПРАВИЛА 1 ГРИ
===================================================== */

function showSafeBuilderInstructions(
  levelId,
  taskIndex
) {

  playSound("click");

  const stage =
    document.getElementById(
      "safeBuilderMentorStage"
    );

  if (!stage) return;

  stage.innerHTML = `

    <div class="safe-builder-dialog-scene">

      <img
        class="safe-builder-dialog-mentor"
        src="${ASSETS.totus}"
        alt="Тотус"
      >

      <div class="safe-builder-dialog">

        <h2>
          Будівельник сейфу
        </h2>

        <p>
          Мордер намагається
          зламати наш сейф.
        </p>

        <p>
          Створи сильний пароль:
          обери
          <strong>
            основу, спецсимвол,
            довжину та регістр.
          </strong>
        </p>

        <p>
          Можеш використати готову основу
          або придумати власну.
        </p>

        <div class="safe-intro-note">

          ⚠️ Не вводь свій справжній пароль.

          <br>

          Придумай приклад спеціально
          для цієї гри.

        </div>

        <button
          class="btn"
          onclick="
            startSafeBuilderGame(
              ${levelId},
              ${taskIndex}
            )
          "
        >
          Почати випробування
        </button>

      </div>

    </div>
  `;
}


/* =====================================================
   ЗАПУСК 1 ГРИ
===================================================== */

function startSafeBuilderGame(
  levelId,
  taskIndex
) {

  const mentorStage =
    document.getElementById(
      "safeBuilderMentorStage"
    );

  const gameArea =
    document.getElementById(
      "safeBuilderGameArea"
    );

  if (!gameArea) return;

  if (mentorStage) {
    mentorStage.classList.add("hidden");
  }

  gameArea.innerHTML = `

    <div
      class="safe-hearts"
      id="safeHearts"
    >
      ❤️ ❤️ ❤️
    </div>


    <div class="safe-builder-title">
      Будівельник сейфу
    </div>


    <div
      class="
        safe-builder-column
        safe-left
      "
    >

      ${renderSafeGroup(

        "word",

        "1. Основа пароля",

        [
          ["Cat", "Cat"],
          ["MyDog2015", "MyDog2015"],
          ["__custom__", "Свій варіант ✍️"]
        ]

      )}


      <div
        id="safeCustomWordBox"
        class="safe-custom-word-box"
        style="display:none;"
      >

        <label>
          Придумай власну основу
        </label>

        <input
          id="safeCustomWordInput"
          class="safe-custom-word-input"
          type="text"
          maxlength="30"
          placeholder="Наприклад: KotykMurkотyk"
          oninput="
            setSafeCustomWord(this.value)
          "
        >

        <small>
          Не використовуй свій справжній пароль.
          Чим довша фраза — тим краще.
        </small>

      </div>


      ${renderSafeGroup(

        "symbol",

        "2. Спецсимвол",

        [
          ["none", "Без символів"],
          ["#", "#"],
          ["@", "@"],
          ["!", "!"]
        ]

      )}

    </div>


    <div class="safe-builder-center">

      <div
        class="safe-drop-zone"
        id="safeDropZone"
        ondragover="allowSafeDrop(event)"
        ondragleave="leaveSafeDrop(event)"
        ondrop="dropOnSafe(event)"
        onclick="placeSelectedCardOnSafe()"
      >

        <div
          class="safe-red-effect"
          id="safeRedEffect"
        ></div>

        <div
          class="safe-gold-effect"
          id="safeGoldEffect"
        ></div>

        <img
          id="safeImage"
          class="safe-builder-image"
          src="${ASSETS.safeBuilderSafe}"
          alt="Сейф"
        >

        <div
          class="safe-drop-hint"
          id="safeDropHint"
        >
          Перетягни блок сюди
        </div>

      </div>


      <div class="safe-installed">

        <div class="safe-installed-slot">

          <span>
            Основа
          </span>

          <strong id="installed-word">
            —
          </strong>

        </div>


        <div class="safe-installed-slot">

          <span>
            Символ
          </span>

          <strong id="installed-symbol">
            —
          </strong>

        </div>


        <div class="safe-installed-slot">

          <span>
            Довжина
          </span>

          <strong id="installed-length">
            —
          </strong>

        </div>


        <div class="safe-installed-slot">

          <span>
            Регістр
          </span>

          <strong id="installed-letterCase">
            —
          </strong>

        </div>

      </div>


      <div class="safe-password-box">

        <span>
          Створений пароль
        </span>

        <strong id="safePasswordPreview">
          Обери елементи
        </strong>

      </div>


      <div class="safe-strength">

        <div class="safe-strength-header">

          <span>
            Міцність захисту
          </span>

          <strong id="safeStrengthPercent">
            0%
          </strong>

        </div>


        <div class="safe-strength-track">

          <div
            class="safe-strength-fill"
            id="safeStrengthFill"
          ></div>

        </div>


        <div
          class="safe-strength-status"
          id="safeStrengthStatus"
        >
          Захист ще не створено
        </div>

      </div>


      <button
        class="btn safe-lock-button"
        id="safeLockButton"
        onclick="
          checkSafeBuilder(
            ${levelId},
            ${taskIndex}
          )
        "
      >
        🔐 Замкнути сейф
      </button>


      <div
        class="safe-result-message"
        id="safeResultMessage"
      ></div>

    </div>


    <div
      class="
        safe-builder-column
        safe-right
      "
    >

      ${renderSafeGroup(

        "length",

        "3. Довжина",

        [
          ["4", "4 символи"],
          ["8", "8 символів"],
          ["12", "12+ символів"]
        ]

      )}


      ${renderSafeGroup(

        "letterCase",

        "4. Регістр",

        [
          ["lower", "abc"],
          ["upper", "ABC"],
          ["mixed", "aBc"]
        ]

      )}

    </div>
  `;

  playSound("click");
}


/* =====================================================
   КАРТКИ 1 ГРИ
===================================================== */

function renderSafeGroup(
  category,
  title,
  options
) {

  return `

    <div class="safe-category">

      <h3>
        ${title}
      </h3>

      <div class="safe-cards">

        ${
          options.map(
            ([value, label]) => `

              <div
                class="safe-drag-card"
                draggable="true"
                data-category="${category}"
                data-value="${value}"
                data-label="${label}"

                ondragstart="
                  startSafeDrag(event)
                "

                ondragend="
                  endSafeDrag(event)
                "

                onclick="
                  selectSafeCard(
                    '${category}',
                    '${value}',
                    '${label}',
                    this
                  )
                "
              >
                ${label}
              </div>

            `
          ).join("")
        }

      </div>

    </div>
  `;
}


/* =====================================================
   ВЛАСНА ОСНОВА
===================================================== */

function setSafeCustomWord(value) {

  passwordBuilderState.word =
    "__custom__";

  passwordBuilderState.customWord =
    value.trim();

  const installed =
    document.getElementById(
      "installed-word"
    );

  if (installed) {

    installed.textContent =
      passwordBuilderState.customWord ||
      "Свій варіант";
  }

  updateSafeBuilderGame();
}


/* =====================================================
   DRAG & DROP
===================================================== */

function startSafeDrag(event) {

  const card =
    event.currentTarget;

  event.dataTransfer.setData(
    "category",
    card.dataset.category
  );

  event.dataTransfer.setData(
    "value",
    card.dataset.value
  );

  event.dataTransfer.setData(
    "label",
    card.dataset.label
  );

  event.dataTransfer.effectAllowed =
    "move";

  card.classList.add(
    "dragging"
  );
}


function endSafeDrag(event) {

  event.currentTarget
    .classList
    .remove("dragging");

  const zone =
    document.getElementById(
      "safeDropZone"
    );

  if (zone) {
    zone.classList.remove(
      "drag-over"
    );
  }
}


function allowSafeDrop(event) {

  event.preventDefault();

  event.dataTransfer.dropEffect =
    "move";

  const zone =
    document.getElementById(
      "safeDropZone"
    );

  if (zone) {
    zone.classList.add(
      "drag-over"
    );
  }
}


function leaveSafeDrop(event) {

  const zone =
    document.getElementById(
      "safeDropZone"
    );

  if (
    zone &&
    !zone.contains(
      event.relatedTarget
    )
  ) {

    zone.classList.remove(
      "drag-over"
    );
  }
}


function dropOnSafe(event) {

  event.preventDefault();
  event.stopPropagation();

  const category =
    event.dataTransfer.getData(
      "category"
    );

  const value =
    event.dataTransfer.getData(
      "value"
    );

  const label =
    event.dataTransfer.getData(
      "label"
    );

  if (
    !category ||
    value === ""
  ) {
    return;
  }

  installSafePart(
    category,
    value,
    label
  );
}


/* =====================================================
   НАТИСКАННЯ КАРТКИ
===================================================== */

function selectSafeCard(
  category,
  value,
  label,
  element
) {

  safeSelectedCard = {
    category,
    value,
    label
  };

  document
    .querySelectorAll(
      ".safe-drag-card"
    )
    .forEach(card => {

      card.classList.remove(
        "touch-selected"
      );
    });

  if (element) {

    element.classList.add(
      "touch-selected"
    );
  }

  if (
    category === "word" &&
    value === "__custom__"
  ) {

    passwordBuilderState.word =
      "__custom__";

    const customBox =
      document.getElementById(
        "safeCustomWordBox"
      );

    if (customBox) {
      customBox.style.display =
        "block";
    }

    const customInput =
      document.getElementById(
        "safeCustomWordInput"
      );

    if (customInput) {
      customInput.focus();
    }
  }

  const hint =
    document.getElementById(
      "safeDropHint"
    );

  if (hint) {

    hint.textContent =
      "Тепер натисни на сейф";
  }

  playSound("click");
}


function placeSelectedCardOnSafe() {

  if (!safeSelectedCard) return;

  installSafePart(
    safeSelectedCard.category,
    safeSelectedCard.value,
    safeSelectedCard.label
  );

  safeSelectedCard = null;

  document
    .querySelectorAll(
      ".safe-drag-card"
    )
    .forEach(card => {

      card.classList.remove(
        "touch-selected"
      );
    });
}


/* =====================================================
   ВСТАНОВИТИ ЕЛЕМЕНТ
===================================================== */

function installSafePart(
  category,
  value,
  label
) {

  passwordBuilderState[
    category
  ] = value;


  if (
    category === "word"
  ) {

    const customBox =
      document.getElementById(
        "safeCustomWordBox"
      );

    if (
      value === "__custom__"
    ) {

      if (customBox) {
        customBox.style.display =
          "block";
      }

    } else {

      passwordBuilderState.customWord =
        "";

      if (customBox) {
        customBox.style.display =
          "none";
      }
    }
  }


  const slot =
    document.getElementById(
      `installed-${category}`
    );

  if (slot) {

    if (
      category === "word" &&
      value === "__custom__"
    ) {

      slot.textContent =
        passwordBuilderState
          .customWord ||
        "Свій варіант";

    } else {

      slot.textContent =
        label;
    }

    slot.parentElement
      .classList
      .add("filled");
  }


  document
    .querySelectorAll(
      `.safe-drag-card[data-category="${category}"]`
    )
    .forEach(card => {

      card.classList.remove(
        "installed"
      );

      if (
        card.dataset.value === value
      ) {

        card.classList.add(
          "installed"
        );
      }
    });


  const hint =
    document.getElementById(
      "safeDropHint"
    );

  if (hint) {

    hint.textContent =
      "Елемент встановлено!";
  }

  playSound("click");

  updateSafeBuilderGame();
}


/* =====================================================
   СТВОРЕННЯ ПАРОЛЯ
===================================================== */

function buildSafePassword() {

  let word = "";

  if (
    passwordBuilderState.word ===
    "__custom__"
  ) {

    word =
      passwordBuilderState
        .customWord || "";

  } else {

    word =
      passwordBuilderState.word || "";
  }


  if (
    passwordBuilderState
      .letterCase === "lower"
  ) {

    word =
      word.toLowerCase();
  }


  if (
    passwordBuilderState
      .letterCase === "upper"
  ) {

    word =
      word.toUpperCase();
  }


  if (
    passwordBuilderState
      .letterCase === "mixed"
  ) {

    let upperNext = true;

    word =
      word
        .split("")
        .map(char => {

          if (
            !/[a-zA-Zа-яА-ЯіІїЇєЄґҐ]/
              .test(char)
          ) {

            return char;
          }

          const result =
            upperNext
              ? char.toUpperCase()
              : char.toLowerCase();

          upperNext =
            !upperNext;

          return result;
        })
        .join("");
  }


  let symbol = "";

  if (
    passwordBuilderState.symbol &&
    passwordBuilderState.symbol !==
      "none"
  ) {

    symbol =
      passwordBuilderState.symbol;
  }


  let password =
    word + symbol;


  const targetLength =
    Number(
      passwordBuilderState.length ||
      0
    );


  const extraCharacters =
    "27A9x4B8m5Q2026";


  let index = 0;


  while (
    targetLength > 0 &&
    password.length <
      targetLength
  ) {

    password +=
      extraCharacters[
        index %
        extraCharacters.length
      ];

    index += 1;
  }


  return password;
}


/* =====================================================
   МІЦНІСТЬ ПАРОЛЯ
===================================================== */

function calculateSafeBuilderStrength() {

  let score = 0;


  if (
    passwordBuilderState.word ===
    "Cat"
  ) {

    score += 5;
  }


  if (
    passwordBuilderState.word ===
    "MyDog2015"
  ) {

    score += 15;
  }


  if (
    passwordBuilderState.word ===
    "__custom__"
  ) {

    const customLength =
      passwordBuilderState
        .customWord.length;

    if (customLength <= 5) {

      score += 5;

    } else if (
      customLength <= 9
    ) {

      score += 18;

    } else {

      score += 30;
    }
  }


  if (
    passwordBuilderState.symbol &&
    passwordBuilderState.symbol !==
      "none"
  ) {

    score += 20;
  }


  if (
    passwordBuilderState.length ===
    "4"
  ) {

    score += 5;
  }


  if (
    passwordBuilderState.length ===
    "8"
  ) {

    score += 15;
  }


  if (
    passwordBuilderState.length ===
    "12"
  ) {

    score += 30;
  }


  if (
    passwordBuilderState
      .letterCase === "lower"
  ) {

    score += 5;
  }


  if (
    passwordBuilderState
      .letterCase === "upper"
  ) {

    score += 10;
  }


  if (
    passwordBuilderState
      .letterCase === "mixed"
  ) {

    score += 20;
  }


  return Math.min(
    score,
    100
  );
}


/* =====================================================
   ОНОВЛЕННЯ 1 ГРИ
===================================================== */

function updateSafeBuilderGame() {

  const preview =
    document.getElementById(
      "safePasswordPreview"
    );

  const percent =
    document.getElementById(
      "safeStrengthPercent"
    );

  const fill =
    document.getElementById(
      "safeStrengthFill"
    );

  const status =
    document.getElementById(
      "safeStrengthStatus"
    );


  const password =
    buildSafePassword();


  const wordReady =
    passwordBuilderState.word &&
    (
      passwordBuilderState.word !==
        "__custom__" ||
      passwordBuilderState
        .customWord.length > 0
    );


  const count = [

    wordReady
      ? "word"
      : "",

    passwordBuilderState.symbol,
    passwordBuilderState.length,
    passwordBuilderState.letterCase

  ].filter(Boolean).length;


  const strength =
    calculateSafeBuilderStrength();


  if (preview) {

    preview.textContent =
      count
        ? password ||
          "Введи власну основу"
        : "Обери елементи";
  }


  if (percent) {

    percent.textContent =
      `${strength}%`;
  }


  if (fill) {

    fill.style.width =
      `${strength}%`;

    fill.classList.remove(
      "weak",
      "medium",
      "strong"
    );

    if (strength < 50) {

      fill.classList.add("weak");

    } else if (
      strength < 85
    ) {

      fill.classList.add("medium");

    } else {

      fill.classList.add("strong");
    }
  }


  if (!status) return;


  if (count < 4) {

    status.textContent =
      `Встановлено ${count} з 4 елементів`;

    return;
  }


  if (strength < 50) {

    status.textContent =
      "Слабкий пароль";

    return;
  }


  if (strength < 85) {

    status.textContent =
      "Захист можна посилити";

    return;
  }


  status.textContent =
    "Надійний пароль!";
}


/* =====================================================
   ПЕРЕВІРКА 1 ГРИ
===================================================== */

function checkSafeBuilder(
  levelId,
  taskIndex
) {

  const customIsValid =
    passwordBuilderState.word !==
      "__custom__" ||
    passwordBuilderState
      .customWord.length >= 3;


  if (!customIsValid) {

    safeBuilderMistake(
      "Введи власну основу пароля хоча б із 3 символів."
    );

    return;
  }


  const count = [

    passwordBuilderState.word,
    passwordBuilderState.symbol,
    passwordBuilderState.length,
    passwordBuilderState.letterCase

  ].filter(Boolean).length;


  if (count < 4) {

    safeBuilderMistake(
      "Обери всі чотири елементи."
    );

    shakeSafeBuilder("medium");

    return;
  }


  const strength =
    calculateSafeBuilderStrength();


  if (strength < 50) {

    safeBuilderMistake(
      "Зламано за 1 секунду! Мордер легко підібрав цей пароль."
    );

    shakeSafeBuilder("strong");

    return;
  }


  if (strength < 85) {

    safeBuilderMistake(
      "Майже! Спробуй довшу основу, спецсимвол, 12+ символів і різний регістр."
    );

    shakeSafeBuilder("medium");

    return;
  }


  finishSafeBuilder(
    levelId,
    taskIndex
  );
}


/* =====================================================
   ПОМИЛКА 1 ГРИ
===================================================== */

function safeBuilderMistake(text) {

  playSound("wrong");

  const hearts =
    document.getElementById(
      "safeHearts"
    );

  const message =
    document.getElementById(
      "safeResultMessage"
    );

  if (hearts) {

    hearts.innerHTML =
      "❤️ 💔 ❤️";

    hearts.classList.add(
      "heart-hit"
    );

    window.setTimeout(() => {

      hearts.innerHTML =
        "❤️ ❤️ ❤️";

      hearts.classList.remove(
        "heart-hit"
      );

    }, 850);
  }

  if (message) {

    message.innerHTML = `

      ❌ ${text}

      <br>

      <b>
        Спробуй ще раз.
      </b>
    `;
  }
}


/* =====================================================
   ТРЯСКА СЕЙФА
===================================================== */

function shakeSafeBuilder(
  strength = "strong"
) {

  const safe =
    document.getElementById(
      "safeDropZone"
    );

  const red =
    document.getElementById(
      "safeRedEffect"
    );

  if (!safe) return;

  safe.classList.remove(
    "shake-medium",
    "shake-strong"
  );

  void safe.offsetWidth;

  safe.classList.add(
    strength === "medium"
      ? "shake-medium"
      : "shake-strong"
  );

  if (red) {
    red.classList.add("active");
  }

  window.setTimeout(() => {

    safe.classList.remove(
      "shake-medium",
      "shake-strong"
    );

    if (red) {
      red.classList.remove("active");
    }

  }, 900);
}


/* =====================================================
   ПЕРЕМОГА 1 ГРИ
===================================================== */

function finishSafeBuilder(
  levelId,
  taskIndex
) {

  playSound("correct");

  const safe =
    document.getElementById(
      "safeDropZone"
    );

  const gold =
    document.getElementById(
      "safeGoldEffect"
    );

  const fill =
    document.getElementById(
      "safeStrengthFill"
    );

  const percent =
    document.getElementById(
      "safeStrengthPercent"
    );

  const status =
    document.getElementById(
      "safeStrengthStatus"
    );


  if (fill) {

    fill.style.width = "100%";

    fill.classList.remove(
      "weak",
      "medium"
    );

    fill.classList.add(
      "strong"
    );
  }


  if (percent) {
    percent.textContent = "100%";
  }


  if (status) {

    status.textContent =
      "Сейф надійно замкнено!";
  }


  if (safe) {
    safe.classList.add("safe-win");
  }


  if (gold) {
    gold.classList.add("active");
  }


  window.setTimeout(() => {

    const progress =
      registerPasswordCastleTask(
        levelId,
        taskIndex
      );

    openSafeBuilderVictory(
      levelId,
      progress
    );

  }, 1200);
}


/* =====================================================
   ФІНАЛ 1 ГРИ
===================================================== */

function openSafeBuilderVictory(
  levelId,
  progress
) {

  openModal(

    "Сейф надійно замкнено!",

    `
      <div class="scroll-modal">

        <div
          style="
            font-size:64px;
            margin-bottom:12px;
          "
        >
          🔐✨
        </div>

        <h2>
          Вітаємо!
        </h2>

        <p>
          Ти створив / створила
          надійний пароль.
        </p>

        <p>
          Мордер не зміг
          зламати сейф!
        </p>

        <p
          style="
            color:#ffd84d;
            font-weight:900;
          "
        >
          Жовтий кристал:
          ${progress}%
        </p>

        <button
          class="btn"
          onclick="
            closeModal();
            returnFromPasswordCastleTask(
              ${levelId},
              ${progress}
            );
          "
        >

          ${
            progress >= 100
              ? "✨ Завершити рівень"
              : "← Назад до випробувань"
          }

        </button>

      </div>
    `
  );
}


/* =====================================================
   МІНІГРА 2 — ПОЛЮВАЛЬНИК ЗА СЛАБКОСТЯМИ
===================================================== */

const WEAK_HUNTER_CONFIG = {

  duration: 30,
  targetScore: 15,
  maxLives: 3,
  maxPasswordsOnScreen: 7,
  spawnInterval: 720

};


const WEAK_HUNTER_PASSWORDS = [

  { value: "12345678", weak: true },
  { value: "password", weak: true },
  { value: "qwerty", weak: true },
  { value: "katya2014", weak: true },
  { value: "iloveyou", weak: true },
  { value: "123456789", weak: true },
  { value: "admin123", weak: true },
  { value: "11111111", weak: true },
  { value: "football", weak: true },
  { value: "princess", weak: true },

  { value: "K7#mP9!xL", weak: false },
  { value: "R0bL0x_P4ss!", weak: false },
  { value: "S3cur3_S4fe#9", weak: false },
  { value: "BlueDragon1827!", weak: false },
  { value: "M0on#River_84", weak: false },
  { value: "Cyb3r!Castle#27", weak: false }

];


let weakHunterState = {

  levelId: null,
  taskIndex: null,

  timeLeft:
    WEAK_HUNTER_CONFIG.duration,

  score: 0,

  lives:
    WEAK_HUNTER_CONFIG.maxLives,

  running: false,
  finished: false,

  timerId: null,
  spawnId: null,

  passwordTimeouts: []

};


/* =====================================================
   ВІДКРИТТЯ 2 ГРИ
===================================================== */

function openWeakPasswordHunter(
  levelId,
  taskIndex
) {

  closeModal();

  cleanupWeakHunter();

  weakHunterState = {

    levelId,
    taskIndex,

    timeLeft:
      WEAK_HUNTER_CONFIG.duration,

    score: 0,

    lives:
      WEAK_HUNTER_CONFIG.maxLives,

    running: false,
    finished: false,

    timerId: null,
    spawnId: null,

    passwordTimeouts: []

  };


  app.innerHTML = `

    <section
      class="screen weak-hunter-screen"
      ${bg(ASSETS.weakHunterBg)}
    >

      <button
        class="btn weak-hunter-back"
        onclick="leaveWeakHunter()"
      >
        ← До випробувань
      </button>


      <div
        class="weak-hunter-dark-overlay"
      ></div>


      <div
        id="weakHunterGameArea"
        class="weak-hunter-game-area"
      ></div>


      <div
        id="weakHunterMentorStage"
        class="weak-hunter-mentor-stage"
      >

        <button
          class="weak-hunter-mentor-button"
          onclick="
            showWeakHunterInstructions()
          "
        >

          <img
            class="weak-hunter-mentor"
            src="${ASSETS.totus}"
            alt="Тотус"
          >

        </button>


        <div class="weak-hunter-mentor-hint">
          Натисни на наставника
        </div>

      </div>

    </section>
  `;

  playSound("click");
}


/* =====================================================
   ТОТУС — 2 ГРА
===================================================== */

function showWeakHunterInstructions() {

  playSound("click");

  const stage =
    document.getElementById(
      "weakHunterMentorStage"
    );

  if (!stage) return;

  stage.innerHTML = `

    <div class="weak-hunter-dialog-scene">

      <img
        class="weak-hunter-dialog-mentor"
        src="${ASSETS.totus}"
        alt="Тотус"
      >

      <div class="weak-hunter-dialog">

        <h2>
          Полювання за слабкостями
        </h2>

        <p>
          Мордер випустив
          у Замок слабкі паролі.
        </p>

        <p>
          Натискай тільки на
          <strong>
            слабкі паролі.
          </strong>
        </p>

        <p>
          Сильні паролі
          залишай у спокої.
        </p>

        <div class="weak-hunter-rules">

          <span>
            ⏱️ 30 секунд
          </span>

          <span>
            🎯 15 паролів
          </span>

          <span>
            💎 3 життя
          </span>

        </div>

        <div class="story-highlight">

          <p>
            Увага:
            всі паролі виглядають однаково.
          </p>

          <p>
            Дивись на сам пароль,
            а не на його колір.
          </p>

        </div>

        <button
          class="btn weak-hunter-start-button"
          onclick="
            startWeakHunterGame()
          "
        >
          Розпочати полювання
        </button>

      </div>

    </div>
  `;
}


/* =====================================================
   ЗАПУСК 2 ГРИ
===================================================== */

function startWeakHunterGame() {

  cleanupWeakHunter();

  weakHunterState.timeLeft =
    WEAK_HUNTER_CONFIG.duration;

  weakHunterState.score = 0;

  weakHunterState.lives =
    WEAK_HUNTER_CONFIG.maxLives;

  weakHunterState.running = true;
  weakHunterState.finished = false;


  const gameArea =
    document.getElementById(
      "weakHunterGameArea"
    );

  const mentorStage =
    document.getElementById(
      "weakHunterMentorStage"
    );

  if (
    !gameArea ||
    !mentorStage
  ) {
    return;
  }


  mentorStage.classList.add(
    "hidden"
  );


  gameArea.innerHTML = `

    <div class="weak-hunter-hud">

      <div class="weak-hunter-hud-box">

        <span class="weak-hunter-hud-label">
          Час
        </span>

        <strong id="weakHunterTimer">
          00:30
        </strong>

      </div>


      <div class="weak-hunter-hud-box">

        <span class="weak-hunter-hud-label">
          Знайдено
        </span>

        <strong id="weakHunterScore">
          0 / ${WEAK_HUNTER_CONFIG.targetScore}
        </strong>

      </div>


      <div class="weak-hunter-hud-box">

        <span class="weak-hunter-hud-label">
          Життя
        </span>

        <div
          id="weakHunterLives"
          class="weak-hunter-lives"
        >
          ${renderWeakHunterLives()}
        </div>

      </div>

    </div>


    <div
      id="weakHunterPasswords"
      class="weak-hunter-password-zone"
    ></div>


    <div
      class="weak-hunter-center-crystal-wrap"
    >

      <div
        id="weakHunterCrystalGlow"
        class="weak-hunter-crystal-glow"
      ></div>

      <img
        id="weakHunterCenterCrystal"
        class="weak-hunter-center-crystal"
        src="${ASSETS.yellowOn}"
        alt="Жовтий кристал"
      >

    </div>


    <div
      id="weakHunterMessage"
      class="weak-hunter-message"
    ></div>
  `;


  updateWeakHunterHud();

  playSound("click");


  for (
    let i = 0;
    i < 5;
    i += 1
  ) {

    window.setTimeout(() => {

      if (
        weakHunterState.running
      ) {

        spawnWeakHunterPassword();
      }

    }, i * 170);
  }


  weakHunterState.spawnId =
    window.setInterval(
      spawnWeakHunterPassword,
      WEAK_HUNTER_CONFIG
        .spawnInterval
    );


  weakHunterState.timerId =
    window.setInterval(() => {

      weakHunterState.timeLeft -= 1;

      updateWeakHunterHud();

      if (
        weakHunterState.timeLeft <= 0
      ) {

        failWeakHunter(
          "Час завершився. Спробуй ще раз!"
        );
      }

    }, 1000);
}


/* =====================================================
   ЖИТТЯ-КРИСТАЛИ
===================================================== */

function renderWeakHunterLives() {

  let html = "";

  for (
    let i = 0;
    i <
      WEAK_HUNTER_CONFIG.maxLives;
    i += 1
  ) {

    html += `

      <img
        src="${ASSETS.yellowOn}"
        class="
          weak-hunter-life-crystal
          ${
            i <
            weakHunterState.lives
              ? "active"
              : "inactive"
          }
        "
        alt=""
      >
    `;
  }

  return html;
}


/* =====================================================
   ЛІТАЮЧІ ПАРОЛІ
===================================================== */

function spawnWeakHunterPassword() {

  if (
    !weakHunterState.running ||
    weakHunterState.finished
  ) {
    return;
  }


  const zone =
    document.getElementById(
      "weakHunterPasswords"
    );

  if (!zone) return;


  if (
    zone.querySelectorAll(
      ".weak-hunter-password"
    ).length >=
    WEAK_HUNTER_CONFIG
      .maxPasswordsOnScreen
  ) {
    return;
  }


  const passwordData =
    getRandomWeakHunterPassword();


  const element =
    document.createElement(
      "button"
    );


  /*
    ВАЖЛИВО:
    слабкі та сильні паролі
    МАЮТЬ ОДНАКОВИЙ КЛАС І КОЛІР.
  */

  element.className =
    "weak-hunter-password";

  element.type = "button";

  element.textContent =
    passwordData.value;


  const startX =
    randomWeakHunterNumber(
      8,
      78
    );

  const startY =
    randomWeakHunterNumber(
      18,
      74
    );

  const moveX =
    randomWeakHunterNumber(
      -120,
      120
    );

  const moveY =
    randomWeakHunterNumber(
      -80,
      80
    );

  const rotation =
    randomWeakHunterNumber(
      -10,
      10
    );

  const lifetime =
    randomWeakHunterNumber(
      4800,
      6800
    );


  element.style.left =
    `${startX}%`;

  element.style.top =
    `${startY}%`;

  element.style.setProperty(
    "--weak-hunter-move-x",
    `${moveX}px`
  );

  element.style.setProperty(
    "--weak-hunter-move-y",
    `${moveY}px`
  );

  element.style.setProperty(
    "--weak-hunter-rotation",
    `${rotation}deg`
  );

  element.style.setProperty(
    "--weak-hunter-duration",
    `${lifetime}ms`
  );


  element.addEventListener(
    "click",
    () => {

      handleWeakHunterPassword(
        element,
        passwordData
      );
    }
  );


  zone.appendChild(element);


  const timeout =
    window.setTimeout(() => {

      expireWeakHunterPassword(
        element
      );

    }, lifetime);


  weakHunterState
    .passwordTimeouts
    .push(timeout);
}


/* =====================================================
   ВИПАДКОВИЙ ПАРОЛЬ
===================================================== */

function getRandomWeakHunterPassword() {

  const shouldBeWeak =
    Math.random() < 0.65;


  const available =
    WEAK_HUNTER_PASSWORDS
      .filter(
        item =>
          item.weak === shouldBeWeak
      );


  return available[
    Math.floor(
      Math.random() *
      available.length
    )
  ];
}


/* =====================================================
   КЛІК ПО ПАРОЛЮ
===================================================== */

function handleWeakHunterPassword(
  element,
  data
) {

  if (
    !weakHunterState.running ||
    weakHunterState.finished ||
    element.classList.contains(
      "destroyed"
    )
  ) {
    return;
  }


  element.classList.add(
    "destroyed"
  );

  element.disabled = true;


  if (data.weak) {

    playSound("correct");

    weakHunterState.score += 1;

    element.classList.add(
      "correct-hit"
    );

    createWeakHunterParticles(
      element,
      "gold"
    );

    showWeakHunterMessage(
      "+1",
      "success"
    );

    pulseWeakHunterCrystal(
      "success"
    );

    updateWeakHunterHud();


    if (
      weakHunterState.score >=
      WEAK_HUNTER_CONFIG.targetScore
    ) {

      window.setTimeout(
        completeWeakHunter,
        250
      );
    }

  } else {

    playSound("wrong");

    element.classList.add(
      "wrong-hit"
    );

    createWeakHunterParticles(
      element,
      "red"
    );

    showWeakHunterMessage(
      "Це сильний пароль!",
      "error"
    );

    loseWeakHunterLife();
  }


  window.setTimeout(() => {

    element.remove();

  }, 430);
}


/* =====================================================
   ПАРОЛЬ ЗНИК
===================================================== */

function expireWeakHunterPassword(
  element
) {

  if (
    !element ||
    !element.isConnected ||
    element.classList.contains(
      "destroyed"
    )
  ) {
    return;
  }

  element.classList.add(
    "expired"
  );

  window.setTimeout(() => {

    element.remove();

  }, 300);
}


/* =====================================================
   ВТРАТА ЖИТТЯ
===================================================== */

function loseWeakHunterLife() {

  if (
    !weakHunterState.running ||
    weakHunterState.finished
  ) {
    return;
  }


  weakHunterState.lives -= 1;

  updateWeakHunterHud();

  pulseWeakHunterCrystal(
    "damage"
  );


  if (
    weakHunterState.lives <= 0
  ) {

    window.setTimeout(() => {

      failWeakHunter(
        "Усі три кристали життя згасли."
      );

    }, 400);
  }
}


/* =====================================================
   HUD 2 ГРИ
===================================================== */

function updateWeakHunterHud() {

  const timer =
    document.getElementById(
      "weakHunterTimer"
    );

  const score =
    document.getElementById(
      "weakHunterScore"
    );

  const lives =
    document.getElementById(
      "weakHunterLives"
    );


  if (timer) {

    timer.textContent =
      `00:${String(
        Math.max(
          weakHunterState.timeLeft,
          0
        )
      ).padStart(2, "0")}`;

    timer.classList.toggle(
      "danger",
      weakHunterState.timeLeft <= 7
    );
  }


  if (score) {

    score.textContent =
      `${weakHunterState.score} / ${
        WEAK_HUNTER_CONFIG.targetScore
      }`;
  }


  if (lives) {

    lives.innerHTML =
      renderWeakHunterLives();
  }
}


/* =====================================================
   КРИСТАЛ — РЕАКЦІЯ
===================================================== */

function pulseWeakHunterCrystal(
  type
) {

  const crystal =
    document.getElementById(
      "weakHunterCenterCrystal"
    );

  if (!crystal) return;


  crystal.classList.remove(
    "weak-hunter-crystal-success-hit",
    "weak-hunter-crystal-damage-hit"
  );


  void crystal.offsetWidth;


  crystal.classList.add(
    type === "damage"
      ? "weak-hunter-crystal-damage-hit"
      : "weak-hunter-crystal-success-hit"
  );
}


/* =====================================================
   ПОВІДОМЛЕННЯ 2 ГРИ
===================================================== */

function showWeakHunterMessage(
  text,
  type = "success"
) {

  const message =
    document.getElementById(
      "weakHunterMessage"
    );

  if (!message) return;

  message.textContent =
    text;

  message.className =
    `weak-hunter-message ${type} active`;

  window.setTimeout(() => {

    message.classList.remove(
      "active"
    );

  }, 850);
}


/* =====================================================
   ЧАСТИНКИ
===================================================== */

function createWeakHunterParticles(
  target,
  type = "gold"
) {

  const area =
    document.getElementById(
      "weakHunterGameArea"
    );

  if (!area || !target) return;


  const targetRect =
    target.getBoundingClientRect();

  const areaRect =
    area.getBoundingClientRect();


  const centerX =
    targetRect.left -
    areaRect.left +
    targetRect.width / 2;

  const centerY =
    targetRect.top -
    areaRect.top +
    targetRect.height / 2;


  for (
    let i = 0;
    i < 9;
    i += 1
  ) {

    const particle =
      document.createElement(
        "span"
      );

    particle.className =
      `weak-hunter-particle ${type}`;

    particle.style.left =
      `${centerX}px`;

    particle.style.top =
      `${centerY}px`;

    particle.style.setProperty(
      "--particle-x",
      `${randomWeakHunterNumber(
        -70,
        70
      )}px`
    );

    particle.style.setProperty(
      "--particle-y",
      `${randomWeakHunterNumber(
        -70,
        70
      )}px`
    );

    area.appendChild(
      particle
    );

    window.setTimeout(() => {

      particle.remove();

    }, 700);
  }
}


/* =====================================================
   ПЕРЕМОГА 2 ГРИ
===================================================== */

function completeWeakHunter() {

  if (
    weakHunterState.finished
  ) {
    return;
  }


  weakHunterState.finished = true;
  weakHunterState.running = false;

  stopWeakHunterTimers();

  removeWeakHunterPasswords();

  playSound("correct");


  const progress =
    registerPasswordCastleTask(
      weakHunterState.levelId,
      weakHunterState.taskIndex
    );


  showWeakHunterEndOverlay({

    success: true,

    title:
      "Випробування пройдено!",

    text:
      `Ти знайшов / знайшла 15 слабких паролів. Жовтий кристал: ${progress}%.`,

    progress
  });
}


/* =====================================================
   ПРОГРАШ 2 ГРИ
===================================================== */

function failWeakHunter(
  message
) {

  if (
    weakHunterState.finished
  ) {
    return;
  }


  weakHunterState.finished = true;
  weakHunterState.running = false;

  stopWeakHunterTimers();

  removeWeakHunterPasswords();

  playSound("wrong");


  showWeakHunterEndOverlay({

    success: false,

    title:
      "Спробуй ще раз",

    text:
      message ||
      "Цього разу Мордер виявився швидшим.",

    progress: 0
  });
}


/* =====================================================
   ФІНАЛЬНЕ ВІКНО 2 ГРИ
===================================================== */

function showWeakHunterEndOverlay({
  success,
  title,
  text,
  progress
}) {

  const gameArea =
    document.getElementById(
      "weakHunterGameArea"
    );

  if (!gameArea) return;


  const overlay =
    document.createElement(
      "div"
    );

  overlay.className =
    `weak-hunter-end-overlay ${
      success
        ? "success"
        : "failure"
    }`;


  overlay.innerHTML = `

    <div class="weak-hunter-end-card">

      <div class="weak-hunter-end-icon">
        ${success ? "✨" : "💫"}
      </div>

      <h2>
        ${title}
      </h2>

      <p>
        ${text}
      </p>


      ${
        success
          ? `

            <button
              class="btn"
              onclick="
                finishWeakHunterAndReturn(
                  ${progress}
                )
              "
            >

              ${
                progress >= 100
                  ? "✨ Завершити рівень"
                  : "← Назад до випробувань"
              }

            </button>

          `
          : `

            <button
              class="btn"
              onclick="
                restartWeakHunter()
              "
            >
              Спробувати ще раз
            </button>

            <button
              class="btn"
              onclick="
                leaveWeakHunter()
              "
            >
              До випробувань
            </button>
          `
      }

    </div>
  `;


  gameArea.appendChild(
    overlay
  );
}


/* =====================================================
   ПОВЕРНЕННЯ 2 ГРИ
===================================================== */

function finishWeakHunterAndReturn(
  progress
) {

  const levelId =
    weakHunterState.levelId;

  cleanupWeakHunter();

  returnFromPasswordCastleTask(
    levelId,
    progress
  );
}


function restartWeakHunter() {

  playSound("click");

  startWeakHunterGame();
}


function leaveWeakHunter() {

  const levelId =
    weakHunterState.levelId;

  cleanupWeakHunter();

  playSound("click");

  showLevel(levelId);

  openChallenge(levelId);
}


function stopWeakHunterTimers() {

  if (weakHunterState.timerId) {

    window.clearInterval(
      weakHunterState.timerId
    );

    weakHunterState.timerId = null;
  }


  if (weakHunterState.spawnId) {

    window.clearInterval(
      weakHunterState.spawnId
    );

    weakHunterState.spawnId = null;
  }


  weakHunterState
    .passwordTimeouts
    .forEach(timeout => {

      window.clearTimeout(
        timeout
      );
    });


  weakHunterState
    .passwordTimeouts = [];
}


function removeWeakHunterPasswords() {

  document
    .querySelectorAll(
      ".weak-hunter-password"
    )
    .forEach(element => {

      element.classList.add(
        "expired"
      );

      window.setTimeout(() => {

        element.remove();

      }, 250);
    });
}


function cleanupWeakHunter() {

  stopWeakHunterTimers();

  weakHunterState.running =
    false;

  document
    .querySelectorAll(
      ".weak-hunter-password"
    )
    .forEach(element => {

      element.remove();
    });
}


function randomWeakHunterNumber(
  min,
  max
) {

  return Math.floor(
    Math.random() *
    (max - min + 1)
  ) + min;
}


/* =====================================================
   МІНІГРА 3 — МЕНЕДЖЕР КЛЮЧІВ
===================================================== */

const KEY_MANAGER_PASSWORDS = [

  "Dragon#Sky84",
  "Fox!River729",
  "Moon$Castle47"

];


let keyManagerState = {

  levelId: null,
  taskIndex: null,

  stage: 1,

  accounts: {
    roblox: null,
    tiktok: null,
    mail: null
  },

  finished: false,
  trapTriggered: false

};


let selectedKeyManagerPassword =
  null;

let selectedKeyManagerElement =
  null;


/* =====================================================
   ВІДКРИТТЯ 3 ГРИ
===================================================== */

function openKeyManager(
  levelId,
  taskIndex
) {

  closeModal();

  cleanupKeyManager();


  keyManagerState = {

    levelId,
    taskIndex,

    stage: 1,

    accounts: {
      roblox: null,
      tiktok: null,
      mail: null
    },

    finished: false,
    trapTriggered: false
  };


  app.innerHTML = `

    <section
      class="screen key-manager-screen"
      ${bg(ASSETS.keyManagerBg)}
    >

      <button
        class="btn key-manager-back"
        onclick="
          leaveKeyManager()
        "
      >
        ← До випробувань
      </button>


      <div
        class="key-manager-dark-overlay"
      ></div>


      <div
        id="keyManagerGameArea"
        class="key-manager-game-area"
      ></div>


      <div
        id="keyManagerMentorStage"
        class="key-manager-mentor-stage"
      >

        <button
          class="key-manager-mentor-button"
          onclick="
            showKeyManagerInstructions()
          "
        >

          <img
            class="key-manager-mentor"
            src="${ASSETS.totus}"
            alt="Тотус"
          >

        </button>


        <div class="key-manager-mentor-hint">
          Натисни на наставника
        </div>

      </div>

    </section>
  `;


  playSound("click");
}


/* =====================================================
   ТОТУС — 3 ГРА
===================================================== */

function showKeyManagerInstructions() {

  playSound("click");

  const stage =
    document.getElementById(
      "keyManagerMentorStage"
    );

  if (!stage) return;


  stage.innerHTML = `

    <div class="key-manager-dialog-scene">

      <img
        class="key-manager-dialog-mentor"
        src="${ASSETS.totus}"
        alt="Тотус"
      >

      <div class="key-manager-dialog">

        <h2>
          Менеджер ключів
        </h2>

        <p>
          Перед тобою три акаунти:
          <strong>
            Roblox, TikTok
            та особиста пошта.
          </strong>
        </p>

        <p>
          Мордер хоче переконати тебе,
          що одного пароля
          достатньо для всього.
        </p>

        <p>
          Перевір його пастку,
          створи різні ключі
          та обери безпечне місце
          для їх зберігання.
        </p>

        <button
          class="btn key-manager-start-button"
          onclick="
            startKeyManagerGame()
          "
        >
          Розпочати випробування
        </button>

      </div>

    </div>
  `;
}


/* =====================================================
   ЗАПУСК 3 ГРИ
===================================================== */

function startKeyManagerGame() {

  keyManagerState.stage = 1;

  keyManagerState.accounts = {
    roblox: null,
    tiktok: null,
    mail: null
  };

  keyManagerState.finished =
    false;

  keyManagerState.trapTriggered =
    false;

  selectedKeyManagerPassword =
    null;

  selectedKeyManagerElement =
    null;


  const gameArea =
    document.getElementById(
      "keyManagerGameArea"
    );

  const mentorStage =
    document.getElementById(
      "keyManagerMentorStage"
    );


  if (
    !gameArea ||
    !mentorStage
  ) {
    return;
  }


  mentorStage.classList.add(
    "hidden"
  );

  playSound("click");

  renderKeyManagerStageOne();
}


/* =====================================================
   HUD 3 ГРИ
===================================================== */

function renderKeyManagerHud() {

  return `

    <div class="key-manager-hud">

      <div class="key-manager-hud-box">

        <span class="key-manager-hud-label">
          Етап
        </span>

        <strong>
          ${keyManagerState.stage} / 3
        </strong>

      </div>


      <div class="key-manager-hud-box">

        <span class="key-manager-hud-label">
          Захищено
        </span>

        <strong id="keyManagerProtectedCount">
          ${getKeyManagerProtectedCount()} / 3
        </strong>

      </div>

    </div>
  `;
}


/* =====================================================
   ЕТАП 1 — ПАСТКА МОРДЕРА
===================================================== */

function renderKeyManagerStageOne() {

  keyManagerState.stage = 1;

  const area =
    document.getElementById(
      "keyManagerGameArea"
    );

  if (!area) return;


  area.innerHTML = `

    ${renderKeyManagerHud()}

    <div class="key-manager-stage-title">

      Мордер пропонує
      один пароль для всіх акаунтів.

      <br>

      Спробуй використати його.

    </div>


    ${renderKeyManagerAccounts()}


    <div class="key-manager-keys-zone">

      ${[1, 2, 3]
        .map(() => `

          <button
            class="key-manager-key"
            draggable="true"
            data-password="SuperNinja2026!"
            onclick="
              selectKeyManagerKey(this)
            "
            ondragstart="
              startKeyManagerDrag(event)
            "
          >
            SuperNinja2026!
          </button>

        `)
        .join("")}

    </div>


    <div
      id="keyManagerMessage"
      class="key-manager-message"
    ></div>
  `;


  setupKeyManagerDropZones();
}


/* =====================================================
   АКАУНТИ
===================================================== */

function renderKeyManagerAccounts() {

  return `

    <div class="key-manager-accounts">

      ${renderKeyManagerAccount(
        "roblox",
        "🎮",
        "Roblox"
      )}

      ${renderKeyManagerAccount(
        "tiktok",
        "🎵",
        "TikTok"
      )}

      ${renderKeyManagerAccount(
        "mail",
        "📧",
        "Особиста пошта"
      )}

    </div>
  `;
}


function renderKeyManagerAccount(
  id,
  icon,
  title
) {

  const password =
    keyManagerState.accounts[id];


  return `

    <div
      class="
        key-manager-account
        ${password ? "protected" : ""}
      "
      id="keyManagerAccount-${id}"
    >

      <div class="key-manager-account-icon">
        ${icon}
      </div>

      <div class="key-manager-account-name">
        ${title}
      </div>

      <div
        class="key-manager-drop-zone"
        data-account="${id}"

        ondragover="
          allowKeyManagerDrop(event)
        "

        ondragleave="
          leaveKeyManagerDrop(event)
        "

        ondrop="
          dropKeyManagerPassword(event)
        "

        onclick="
          dropSelectedKeyManagerPassword(
            '${id}'
          )
        "
      >

        ${
          password
            ? `🔐 ${password}`
            : "Перетягни ключ сюди"
        }

      </div>

    </div>
  `;
}


/* =====================================================
   DRAG 3 ГРИ
===================================================== */

function startKeyManagerDrag(
  event
) {

  const target =
    event.currentTarget;

  if (
    target.classList.contains(
      "used"
    )
  ) {
    return;
  }


  const password =
    target.dataset.password;


  event.dataTransfer.setData(
    "text/plain",
    password
  );


  selectedKeyManagerElement =
    target;

  selectedKeyManagerPassword =
    password;


  target.classList.add(
    "dragging"
  );
}


function allowKeyManagerDrop(
  event
) {

  event.preventDefault();

  event.currentTarget
    .classList.add(
      "drag-over"
    );
}


function leaveKeyManagerDrop(
  event
) {

  event.currentTarget
    .classList.remove(
      "drag-over"
    );
}


function dropKeyManagerPassword(
  event
) {

  event.preventDefault();

  const zone =
    event.currentTarget;

  zone.classList.remove(
    "drag-over"
  );


  const accountId =
    zone.dataset.account;


  const password =
    event.dataTransfer.getData(
      "text/plain"
    );


  handleKeyManagerPasswordDrop(
    accountId,
    password
  );
}


/* =====================================================
   КЛІК — МОБІЛЬНА ВЕРСІЯ
===================================================== */

function selectKeyManagerKey(
  element
) {

  if (
    element.classList.contains(
      "used"
    )
  ) {
    return;
  }


  document
    .querySelectorAll(
      ".key-manager-key"
    )
    .forEach(key => {

      key.classList.remove(
        "selected"
      );
    });


  selectedKeyManagerPassword =
    element.dataset.password;

  selectedKeyManagerElement =
    element;


  element.classList.add(
    "selected"
  );


  playSound("click");
}


function dropSelectedKeyManagerPassword(
  accountId
) {

  if (
    !selectedKeyManagerPassword
  ) {

    showKeyManagerMessage(
      "Спочатку обери ключ-пароль.",
      "error"
    );

    return;
  }


  handleKeyManagerPasswordDrop(
    accountId,
    selectedKeyManagerPassword
  );
}


/* =====================================================
   ОБРОБКА КЛЮЧА
===================================================== */

function handleKeyManagerPasswordDrop(
  accountId,
  password
) {

  if (
    keyManagerState.finished
  ) {
    return;
  }


  if (
    keyManagerState.stage === 1
  ) {

    handleKeyManagerTrap(
      accountId,
      password
    );

    return;
  }


  if (
    keyManagerState.stage === 2
  ) {

    handleKeyManagerStrongPassword(
      accountId,
      password
    );
  }
}


/* =====================================================
   ПАСТКА
===================================================== */

function handleKeyManagerTrap(
  accountId,
  password
) {

  if (
    keyManagerState.accounts[
      accountId
    ]
  ) {

    showKeyManagerMessage(
      "Цей акаунт уже має ключ.",
      "error"
    );

    return;
  }


  const used =
    Object.values(
      keyManagerState.accounts
    ).filter(Boolean);


  if (!used.includes(password)) {

    keyManagerState.accounts[
      accountId
    ] = password;

    playSound("correct");

    refreshKeyManagerAccounts();

    markSelectedKeyManagerKeyUsed();

    updateKeyManagerHud();

    showKeyManagerMessage(
      "Перший замок закрито.",
      "success"
    );

    return;
  }


  triggerKeyManagerTrap(
    accountId
  );
}


function triggerKeyManagerTrap(
  accountId
) {

  if (
    keyManagerState.trapTriggered
  ) {
    return;
  }


  keyManagerState.trapTriggered =
    true;

  playSound("wrong");


  const account =
    document.getElementById(
      `keyManagerAccount-${accountId}`
    );


  if (account) {

    account.classList.add(
      "danger"
    );
  }


  showKeyManagerMessage(
    "Пастка! Якщо один пароль зламають — під загрозою будуть усі акаунти.",
    "error"
  );


  window.setTimeout(() => {

    renderKeyManagerTrapLesson();

  }, 1700);
}


function renderKeyManagerTrapLesson() {

  const area =
    document.getElementById(
      "keyManagerGameArea"
    );

  if (!area) return;


  area.innerHTML = `

    <div class="key-manager-end-overlay">

      <div class="key-manager-end-card">

        <div class="key-manager-end-icon">
          ⚠️
        </div>

        <h2>
          Пастка Мордера!
        </h2>

        <p>
          Один пароль не можна
          використовувати
          для різних акаунтів.
        </p>

        <p>
          Якщо його викрадуть,
          злочинець спробує
          той самий пароль
          на інших сервісах.
        </p>

        <button
          class="btn"
          onclick="
            startKeyManagerStageTwo()
          "
        >
          Створити різні ключі
        </button>

      </div>

    </div>
  `;
}


/* =====================================================
   ЕТАП 2
===================================================== */

function startKeyManagerStageTwo() {

  playSound("click");

  keyManagerState.stage = 2;

  keyManagerState.accounts = {
    roblox: null,
    tiktok: null,
    mail: null
  };

  selectedKeyManagerPassword =
    null;

  selectedKeyManagerElement =
    null;


  const area =
    document.getElementById(
      "keyManagerGameArea"
    );

  if (!area) return;


  area.innerHTML = `

    ${renderKeyManagerHud()}

    <div class="key-manager-stage-title">

      Тепер розподіли
      три різні сильні паролі
      між трьома акаунтами.

    </div>


    ${renderKeyManagerAccounts()}


    <div class="key-manager-keys-zone">

      ${
        KEY_MANAGER_PASSWORDS
          .map(password => `

            <button
              class="key-manager-key"
              draggable="true"
              data-password="${password}"

              onclick="
                selectKeyManagerKey(this)
              "

              ondragstart="
                startKeyManagerDrag(event)
              "
            >
              ${password}
            </button>

          `)
          .join("")
      }

    </div>


    <div
      id="keyManagerMessage"
      class="key-manager-message"
    ></div>
  `;


  setupKeyManagerDropZones();
}


/* =====================================================
   РІЗНІ ПАРОЛІ
===================================================== */

function handleKeyManagerStrongPassword(
  accountId,
  password
) {

  if (
    keyManagerState.accounts[
      accountId
    ]
  ) {

    showKeyManagerMessage(
      "Цей акаунт уже захищено.",
      "error"
    );

    return;
  }


  const used =
    Object.values(
      keyManagerState.accounts
    ).filter(Boolean);


  if (
    used.includes(password)
  ) {

    playSound("wrong");

    showKeyManagerMessage(
      "Для кожного акаунта потрібен інший пароль.",
      "error"
    );

    return;
  }


  keyManagerState.accounts[
    accountId
  ] = password;


  playSound("correct");

  refreshKeyManagerAccounts();

  markPasswordKeyUsed(
    password
  );


  selectedKeyManagerPassword =
    null;

  selectedKeyManagerElement =
    null;


  updateKeyManagerHud();


  showKeyManagerMessage(
    "Акаунт захищено!",
    "success"
  );


  if (
    getKeyManagerProtectedCount() ===
    3
  ) {

    window.setTimeout(() => {

      startKeyManagerStageThree();

    }, 1000);
  }
}


/* =====================================================
   ВИКОРИСТАНИЙ КЛЮЧ
===================================================== */

function markPasswordKeyUsed(
  password
) {

  document
    .querySelectorAll(
      ".key-manager-key"
    )
    .forEach(key => {

      if (
        key.dataset.password ===
        password
      ) {

        key.classList.add(
          "used"
        );

        key.draggable = false;
      }
    });
}


function markSelectedKeyManagerKeyUsed() {

  if (
    !selectedKeyManagerElement
  ) {
    return;
  }


  selectedKeyManagerElement
    .classList.add(
      "used"
    );


  selectedKeyManagerElement
    .draggable = false;


  selectedKeyManagerPassword =
    null;

  selectedKeyManagerElement =
    null;
}


/* =====================================================
   ОНОВИТИ АКАУНТИ
===================================================== */

function refreshKeyManagerAccounts() {

  const accounts =
    document.querySelector(
      ".key-manager-accounts"
    );

  if (!accounts) return;


  accounts.outerHTML =
    renderKeyManagerAccounts();


  setupKeyManagerDropZones();
}


function getKeyManagerProtectedCount() {

  return Object.values(
    keyManagerState.accounts
  ).filter(Boolean).length;
}


function updateKeyManagerHud() {

  const counter =
    document.getElementById(
      "keyManagerProtectedCount"
    );

  if (counter) {

    counter.textContent =
      `${getKeyManagerProtectedCount()} / 3`;
  }
}


function setupKeyManagerDropZones() {

  document
    .querySelectorAll(
      ".key-manager-drop-zone"
    )
    .forEach(zone => {

      zone.addEventListener(
        "dragover",
        event => {

          event.preventDefault();
        }
      );
    });
}


/* =====================================================
   ЕТАП 3 — ЗБЕРІГАННЯ
===================================================== */

function startKeyManagerStageThree() {

  keyManagerState.stage = 3;

  playSound("correct");


  const area =
    document.getElementById(
      "keyManagerGameArea"
    );

  if (!area) return;


  area.innerHTML = `

    ${renderKeyManagerHud()}

    <div class="key-manager-stage-title">

      Три акаунти захищено.

      <br>

      Де безпечно
      зберігати паролі?

    </div>


    <div class="key-manager-storage-options">

      <button
        class="key-manager-storage-option"
        onclick="
          chooseKeyManagerStorage(
            this,
            'stickers'
          )
        "
      >

        <div class="key-manager-storage-icon">
          📝
        </div>

        <div class="key-manager-storage-title">
          Стікери під клавіатурою
        </div>

      </button>


      <button
        class="key-manager-storage-option"
        onclick="
          chooseKeyManagerStorage(
            this,
            'notes'
          )
        "
      >

        <div class="key-manager-storage-icon">
          📱
        </div>

        <div class="key-manager-storage-title">
          Звичайні нотатки
          у телефоні
        </div>

      </button>


      <button
        class="key-manager-storage-option"
        onclick="
          chooseKeyManagerStorage(
            this,
            'manager'
          )
        "
      >

        <div class="key-manager-storage-icon">
          🛡️
        </div>

        <div class="key-manager-storage-title">
          Захищений менеджер паролів
        </div>

      </button>

    </div>


    <div
      id="keyManagerMessage"
      class="key-manager-message"
    ></div>
  `;
}


/* =====================================================
   ВИБІР СХОВИЩА
===================================================== */

function chooseKeyManagerStorage(
  element,
  type
) {

  if (
    keyManagerState.finished
  ) {
    return;
  }


  if (
    type === "manager"
  ) {

    playSound("correct");

    element.classList.add(
      "correct"
    );

    showKeyManagerMessage(
      "Так! Менеджер паролів — безпечніше місце для зберігання ключів.",
      "success"
    );


    window.setTimeout(() => {

      completeKeyManager();

    }, 900);

    return;
  }


  playSound("wrong");

  element.classList.add(
    "wrong"
  );


  showKeyManagerMessage(

    type === "stickers"
      ? "Стікер можуть побачити або загубити."
      : "Звичайні нотатки не призначені для безпечного зберігання паролів.",

    "error"
  );


  window.setTimeout(() => {

    element.classList.remove(
      "wrong"
    );

  }, 800);
}


/* =====================================================
   ПЕРЕМОГА 3 ГРИ
===================================================== */

function completeKeyManager() {

  if (
    keyManagerState.finished
  ) {
    return;
  }


  keyManagerState.finished =
    true;


  playSound("correct");


  const progress =
    registerPasswordCastleTask(
      keyManagerState.levelId,
      keyManagerState.taskIndex
    );


  const area =
    document.getElementById(
      "keyManagerGameArea"
    );

  if (!area) return;


  area.innerHTML = `

    <div class="key-manager-end-overlay">

      <div class="key-manager-end-card">

        <div class="key-manager-end-icon">
          ✨
        </div>

        <h2>
          Випробування пройдено!
        </h2>

        <p>
          Усі акаунти отримали
          різні сильні паролі,
          а ключі збережено безпечно.
        </p>

        <p class="key-manager-fanfare">
          Жовтий кристал:
          ${progress}%
        </p>

        <button
          class="btn"
          onclick="
            finishKeyManagerAndReturn(
              ${progress}
            )
          "
        >

          ${
            progress >= 100
              ? "✨ Завершити рівень"
              : "← Назад до випробувань"
          }

        </button>

      </div>

    </div>
  `;
}


/* =====================================================
   ПОВІДОМЛЕННЯ 3 ГРИ
===================================================== */

function showKeyManagerMessage(
  text,
  type = "success"
) {

  const message =
    document.getElementById(
      "keyManagerMessage"
    );

  if (!message) return;


  message.textContent =
    text;

  message.className =
    `key-manager-message ${type} active`;


  window.setTimeout(() => {

    message.classList.remove(
      "active"
    );

  }, 1250);
}


/* =====================================================
   ВИХІД 3 ГРИ
===================================================== */

function finishKeyManagerAndReturn(
  progress
) {

  const levelId =
    keyManagerState.levelId;

  cleanupKeyManager();

  returnFromPasswordCastleTask(
    levelId,
    progress
  );
}


function leaveKeyManager() {

  const levelId =
    keyManagerState.levelId;

  cleanupKeyManager();

  playSound("click");

  showLevel(levelId);

  openChallenge(levelId);
}


function cleanupKeyManager() {

  selectedKeyManagerPassword =
    null;

  selectedKeyManagerElement =
    null;
}


/* =====================================================
   МІНІГРА 4 — СИНХРОННИЙ КЛЮЧ / 2FA
===================================================== */
let syncKeyState = {

  levelId: null,
  taskIndex: null,

  stage: "intro",

  activeCode: "",
  codeSeconds: 7,

  attack: 0,

  gameEnded: false,

  codeTimer: null,
  attackTimer: null

};


/* =====================================================
   ВІДКРИТТЯ 4 ГРИ
===================================================== */

function openSyncKeyGame(
  levelId,
  taskIndex
) {

  closeModal();

  clearSyncKeyTimers();


  syncKeyState = {

    levelId,
    taskIndex,

    stage: "intro",

    activeCode: "",
    codeSeconds: 7,

    attack: 0,

    gameEnded: false,

    codeTimer: null,
    attackTimer: null

  };


  app.innerHTML = `

    <section
      class="screen sync-key-screen"
      ${bg(ASSETS.syncKeyBg)}
    >

      <button
        class="btn sync-key-back"
        onclick="leaveSyncKeyGame()"
      >
        ← До випробувань
      </button>


      <div
        class="sync-key-dark-overlay"
      ></div>


      <div
        id="syncKeyGameArea"
        class="sync-key-game-area"
      ></div>


      <div
        id="syncKeyMentorStage"
        class="weak-hunter-mentor-stage"
      >

        <button
          type="button"
          class="weak-hunter-mentor-button"
          onclick="showSyncKeyInstructions()"
          aria-label="Натисни на наставника Тотуса"
        >

          <img
            class="weak-hunter-mentor"
            src="${ASSETS.totus}"
            alt="Наставник Тотус"
          >

        </button>


        <div class="weak-hunter-mentor-hint">
          Натисни на наставника
        </div>

      </div>

    </section>
  `;


  playSound("click");
}


/* =====================================================
   ТОТУС — ПРАВИЛА 4 ГРИ
===================================================== */

function showSyncKeyInstructions() {

  playSound("click");


  const stage =
    document.getElementById(
      "syncKeyMentorStage"
    );


  if (!stage) return;


  stage.innerHTML = `

    <div class="weak-hunter-dialog-scene">

      <img
        class="weak-hunter-dialog-mentor"
        src="${ASSETS.totus}"
        alt="Наставник Тотус"
      >


      <div class="weak-hunter-dialog">

        <h2>
          Синхронний ключ
        </h2>

        <p>
          Мордер намагається
          увійти до акаунта героя.
        </p>

        <p>
          Спочатку виріши,
          чи потрібно дозволяти
          невідомий вхід.
        </p>

        <p>
          Потім використай
          <strong>
            другий фактор захисту
          </strong>
          і введи актуальний код.
        </p>

        <p>
          Код змінюється кожні
          <strong>7 секунд</strong>,
          тому будь уважним.
        </p>


        <div class="weak-hunter-rules">

          <span>
            🔐 Заблокуй чужий вхід
          </span>

          <span>
            📱 Перевір код
          </span>

          <span>
            ⏱️ Код змінюється
          </span>

        </div>


        <button
          type="button"
          class="btn weak-hunter-start-button"
          onclick="startSyncKeyGame()"
        >
          Розпочати випробування
        </button>

      </div>

    </div>
  `;
}


/* =====================================================
   ЗАПУСК 4 ГРИ
===================================================== */

function startSyncKeyGame() {

  clearSyncKeyTimers();


  syncKeyState.stage =
    "push";

  syncKeyState.activeCode =
    "";

  syncKeyState.codeSeconds =
    7;

  syncKeyState.attack =
    0;

  syncKeyState.gameEnded =
    false;


  const mentorStage =
    document.getElementById(
      "syncKeyMentorStage"
    );


  const gameArea =
    document.getElementById(
      "syncKeyGameArea"
    );


  if (
    !gameArea ||
    !mentorStage
  ) {
    return;
  }


  mentorStage.classList.add(
    "hidden"
  );


  gameArea.innerHTML = `

    <div class="sync-key-topbar">

      <div class="sync-key-title">

        <h2>
[12.08.2026 12:34] Ольчик❤️: Синхронний ключ
        </h2>

        <p>
          Захисти акаунт
          за допомогою 2FA
        </p>

      </div>

    </div>


    <div class="sync-key-game">

      <div class="sync-computer-side">

        <div class="sync-computer">

          <div class="sync-computer-label">
            Комп'ютер Замку
          </div>


          <h3>
            🔐 Вхід до системи
          </h3>


          <p class="sync-computer-text">
            Мордер намагається отримати доступ.
            Використай смартфон Героя,
            щоб захистити систему.
          </p>


          <div class="sync-attack-box">

            <div class="sync-attack-heading">

              <span>
                ⚠️ АТАКА МОРДЕРА
              </span>

              <span id="syncAttackPercent">
                0%
              </span>

            </div>


            <div class="sync-attack-track">

              <div
                class="sync-attack-bar"
                id="syncAttackBar"
              ></div>

            </div>

          </div>


          <label class="sync-code-label">
            Код підтвердження
          </label>


          <input
            id="syncCodeInput"
            class="sync-code-input"
            type="text"
            inputmode="numeric"
            maxlength="6"
            autocomplete="off"
            placeholder="••••••"
            disabled
          >


          <button
            id="syncSubmitButton"
            class="sync-submit"
            onclick="checkSyncCode()"
            disabled
          >
            ПІДТВЕРДИТИ
          </button>


          <div
            id="syncComputerMessage"
            class="sync-computer-message"
          ></div>

        </div>

      </div>


      <div class="sync-phone-side">

        <div class="sync-phone">

          <div class="sync-phone-screen">

            <div class="sync-phone-status">

              <span>
                Смартфон Героя
              </span>

              <span>
                🔒 2FA
              </span>

            </div>


            <div
              id="syncPhoneContent"
            ></div>

          </div>

        </div>

      </div>

    </div>
  `;


  const input =
    document.getElementById(
      "syncCodeInput"
    );


  if (input) {

    input.addEventListener(
      "input",
      function () {

        this.value =
          this.value
            .replace(/\D/g, "")
            .slice(0, 6);

      }
    );


    input.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter"
        ) {

          checkSyncCode();

        }

      }
    );

  }


  renderSyncPush();

  updateSyncAttackUI();

  playSound("click");
}


/* =====================================================
   PUSH-ПОВІДОМЛЕННЯ
===================================================== */

function renderSyncPush() {

  const phone =
    document.getElementById(
      "syncPhoneContent"
    );


  if (!phone) return;


  phone.innerHTML = `

    <div class="sync-push-card">

      <div class="sync-alert-icon">
        ⚠️
      </div>


      <h4>
        Спроба входу
      </h4>


      <div class="sync-device-info">

        <strong>
          Новий вхід у систему
        </strong>

        <br><br>

        Пристрій:
        <strong>
          Невідомий ПК
        </strong>

        <br>

        Локація:
        <strong>
          Невідома
        </strong>

      </div>


      <div class="sync-push-question">
        Це ви?
      </div>


      <div class="sync-phone-buttons">

        <button
          class="sync-allow"
          onclick="allowUnknownLogin()"
        >
          ✓ ДОЗВОЛИТИ
        </button>


        <button
          class="sync-block"
          onclick="blockUnknownLogin()"
        >
          ✕ ЗАБЛОКУВАТИ
        </button>

      </div>

    </div>
  `;
}


/* =====================================================
   НЕПРАВИЛЬНА ДІЯ
===================================================== */

function allowUnknownLogin() {

  if (syncKeyState.gameEnded
  ) {
    return;
  }


  const message =
    document.getElementById(
      "syncComputerMessage"
    );


  if (message) {

    message.textContent =
      "⚠️ Це невідомий пристрій! Не дозволяй такий вхід.";

    message.className =
      "sync-computer-message error";

  }


  increaseSyncAttack(18);

  playSound("wrong");
}


/* =====================================================
   ПРАВИЛЬНА ДІЯ
===================================================== */

function blockUnknownLogin() {

  if (
    syncKeyState.gameEnded
  ) {
    return;
  }


  syncKeyState.stage =
    "code";


  const message =
    document.getElementById(
      "syncComputerMessage"
    );


  if (message) {

    message.textContent =
      "✓ Невідомий вхід заблоковано. Тепер підтвердь свій вхід кодом.";

    message.className =
      "sync-computer-message success";

  }


  playSound("correct");


  window.setTimeout(() => {

    renderSyncCodeStage();

    startSyncAttack();

  }, 700);
}


/* =====================================================
   ГЕНЕРАЦІЯ КОДУ
===================================================== */

function generateSyncCode() {

  const number =
    Math.floor(
      100000 +
      Math.random() * 900000
    );


  syncKeyState.activeCode =
    String(number);


  return syncKeyState.activeCode;
}


/* =====================================================
   ЕКРАН КОДУ
===================================================== */

function renderSyncCodeStage() {

  if (
    syncKeyState.gameEnded
  ) {
    return;
  }


  generateSyncCode();


  const phone =
    document.getElementById(
      "syncPhoneContent"
    );


  if (!phone) return;


  phone.innerHTML = `

    <div class="sync-code-card">

      <div class="sync-shield">
        🔐
      </div>


      <h4>
        Код синхронізації
      </h4>


      <p class="sync-code-help">
        Введи цей код
        на комп'ютері,
        поки він не змінився.
      </p>


      <div
        id="syncLiveCode"
        class="sync-live-code"
        onclick="copySyncCodeToInput()"
      >
        ${formatSyncCode(
          syncKeyState.activeCode
        )}
      </div>


      <div class="sync-code-countdown">

        Новий код через

        <span
          id="syncCodeSeconds"
          class="sync-code-seconds"
        >
          7
        </span>

        с

      </div>


      <div class="sync-mini-track">

        <div
          id="syncMiniBar"
          class="sync-mini-bar"
        ></div>

      </div>

    </div>
  `;


  const input =
    document.getElementById(
      "syncCodeInput"
    );


  const button =
    document.getElementById(
      "syncSubmitButton"
    );


  if (input) {

    input.disabled = false;

    input.value = "";

    input.focus();

  }


  if (button) {

    button.disabled = false;

  }


  startCodeCountdown();
}


/* =====================================================
   ФОРМАТ КОДУ
===================================================== */

function formatSyncCode(code) {

  return (
    code.slice(0, 3) +
    " " +
    code.slice(3)
  );
}


/* =====================================================
   ТАЙМЕР КОДУ
===================================================== */

function startCodeCountdown() {

  clearInterval(
    syncKeyState.codeTimer
  );


  syncKeyState.codeSeconds =
    7;


  const startedAt =
    Date.now();


  syncKeyState.codeTimer =
    setInterval(() => {

      if (
        syncKeyState.gameEnded ||
        syncKeyState.stage !== "code"
      ) {

        clearInterval(
          syncKeyState.codeTimer
        );

        syncKeyState.codeTimer =
          null;

        return;
      }


      const elapsed =
        Date.now() -
        startedAt;


      const remaining =
        Math.max(
          0,
          7000 - elapsed
        );


      const seconds =
        Math.ceil(
          remaining / 1000
        );


      syncKeyState.codeSeconds =
        seconds;


      const secondsNode =
        document.getElementById(
          "syncCodeSeconds"
        );
const miniBar =
        document.getElementById(
          "syncMiniBar"
        );


      if (secondsNode) {

        secondsNode.textContent =
          seconds;

      }


      if (miniBar) {

        miniBar.style.transformOrigin =
          "left center";

        miniBar.style.transform =
          `scaleX(${
            remaining / 7000
          })`;

      }


      if (
        remaining <= 0
      ) {

        clearInterval(
          syncKeyState.codeTimer
        );

        syncKeyState.codeTimer =
          null;

        changeSyncCode();

      }

    }, 50);
}


/* =====================================================
   ЗМІНА КОДУ
===================================================== */

function changeSyncCode() {

  if (
    syncKeyState.gameEnded ||
    syncKeyState.stage !== "code"
  ) {
    return;
  }


  generateSyncCode();


  const code =
    document.getElementById(
      "syncLiveCode"
    );


  if (code) {

    code.textContent =
      formatSyncCode(
        syncKeyState.activeCode
      );


    code.animate(
      [
        {
          transform: "scale(0.9)",
          opacity: 0.45
        },
        {
          transform: "scale(1.08)",
          opacity: 1
        },
        {
          transform: "scale(1)",
          opacity: 1
        }
      ],
      {
        duration: 300
      }
    );

  }


  startCodeCountdown();
}


/* =====================================================
   КЛІК ПО КОДУ
===================================================== */

function copySyncCodeToInput() {

  if (
    syncKeyState.stage !== "code" ||
    syncKeyState.gameEnded
  ) {
    return;
  }


  const input =
    document.getElementById(
      "syncCodeInput"
    );


  if (!input) return;


  input.value =
    syncKeyState.activeCode;


  input.focus();
}


/* =====================================================
   ПЕРЕВІРКА КОДУ
===================================================== */

function checkSyncCode() {

  if (
    syncKeyState.stage !== "code" ||
    syncKeyState.gameEnded
  ) {
    return;
  }


  const input =
    document.getElementById(
      "syncCodeInput"
    );


  const message =
    document.getElementById(
      "syncComputerMessage"
    );


  if (
    !input ||
    !message
  ) {
    return;
  }


  const entered =
    input.value.trim();


  if (
    entered.length !== 6
  ) {

    message.textContent =
      "Введи всі 6 цифр коду.";

    message.className =
      "sync-computer-message error";

    playSound("wrong");

    shakeSyncInput();

    return;
  }


  if (
    entered ===
    syncKeyState.activeCode
  ) {

    input.classList.remove(
      "sync-wrong"
    );

    input.classList.add(
      "sync-correct"
    );


    message.textContent =
      "✓ Код підтверджено!";

    message.className =
      "sync-computer-message success";


    playSound("correct");


    winSyncKeyGame();

    return;
  }


  input.value = "";


  message.textContent =
    "⚠️ Код неправильний або вже змінився. Перевір актуальний код.";

  message.className =
    "sync-computer-message error";


  playSound("wrong");


  increaseSyncAttack(10);

  shakeSyncInput();
}


/* =====================================================
   ТРЯСКА КОДУ
===================================================== */

function shakeSyncInput() {

  const input =
    document.getElementById(
      "syncCodeInput"
    );


  if (!input) return;


  input.classList.remove(
    "sync-wrong"
  );


  void input.offsetWidth;


  input.classList.add(
    "sync-wrong"
  );
}


/* =====================================================
   АТАКА МОРДЕРА
===================================================== */

function startSyncAttack() {

  clearInterval(
    syncKeyState.attackTimer
  );


  syncKeyState.attackTimer =
    setInterval(() => {

      if (
        syncKeyState.gameEnded
      ) {

        clearInterval(
          syncKeyState.attackTimer
        );

        syncKeyState.attackTimer =
          null;

        return;
      }


      let speed =
        0.35;


      if (
syncKeyState.attack >= 40
      ) {

        speed =
          0.55;

      }


      if (
        syncKeyState.attack >= 70
      ) {

        speed =
          0.75;

      }


      increaseSyncAttack(
        speed
      );

    }, 150);
}


/* =====================================================
   ЗБІЛЬШЕННЯ АТАКИ
===================================================== */

function increaseSyncAttack(
  amount
) {

  if (
    syncKeyState.gameEnded
  ) {
    return;
  }


  syncKeyState.attack =
    Math.min(
      100,
      syncKeyState.attack +
      amount
    );


  updateSyncAttackUI();


  if (
    syncKeyState.attack >= 100
  ) {

    loseSyncKeyGame();

  }
}


/* =====================================================
   HUD АТАКИ
===================================================== */

function updateSyncAttackUI() {

  const bar =
    document.getElementById(
      "syncAttackBar"
    );


  const percent =
    document.getElementById(
      "syncAttackPercent"
    );


  if (bar) {

    bar.style.width =
      ${syncKeyState.attack}%;

  }


  if (percent) {

    percent.textContent =
      `${Math.round(
        syncKeyState.attack
      )}%`;

  }
}


/* =====================================================
   ПЕРЕМОГА 4 ГРИ
===================================================== */

function winSyncKeyGame() {

  if (
    syncKeyState.gameEnded
  ) {
    return;
  }


  syncKeyState.gameEnded =
    true;


  clearSyncKeyTimers();


  const progress =
    registerPasswordCastleTask(
      syncKeyState.levelId,
      syncKeyState.taskIndex
    );


  window.setTimeout(() => {

    showSyncVictory(
      progress
    );

  }, 500);
}


/* =====================================================
   ВІКНО ПЕРЕМОГИ 4 ГРИ
===================================================== */

function showSyncVictory(
  progress
) {

  const area =
    document.getElementById(
      "syncKeyGameArea"
    );


  if (!area) return;


  const overlay =
    document.createElement(
      "div"
    );


  overlay.className =
    "sync-result-overlay";


  overlay.innerHTML = `

    <div class="sync-result-card">

      <div class="sync-result-icon">
        🛡️
      </div>


      <h2>
        Систему захищено!
      </h2>


      <p>
        Невідомий вхід заблоковано,
        а особу підтверджено
        другим фактором захисту.
      </p>


      <p>
        Жовтий кристал:
        <strong>
          ${progress}%
        </strong>
      </p>


      <button
        class="sync-result-button"
        onclick="
          finishSyncKeyAndReturn(
            ${progress}
          )
        "
      >

        ${
          progress >= 100
            ? "✨ ЗАВЕРШИТИ РІВЕНЬ"
            : "← ДО ВИПРОБУВАНЬ"
        }

      </button>

    </div>
  `;


  area.appendChild(
    overlay
  );
}


/* =====================================================
   ПРОГРАШ 4 ГРИ
===================================================== */

function loseSyncKeyGame() {

  if (
    syncKeyState.gameEnded
  ) {
    return;
  }


  syncKeyState.gameEnded =
    true;


  clearSyncKeyTimers();


  const area =
    document.getElementById(
      "syncKeyGameArea"
    );


  if (!area) return;


  const overlay =
    document.createElement(
      "div"
    );


  overlay.className =
    "sync-result-overlay";


  overlay.innerHTML = `

    <div class="sync-result-card">

      <div class="sync-result-icon">
        💥
      </div>


      <h2>
        Мордер майже прорвався!
      </h2>


      <p>
        Заблокуй невідомий вхід
        і встигни підтвердити
        актуальний код.
      </p>


      <button
        class="sync-result-button"
        onclick="restartSyncKeyGame()"
      >
        СПРОБУВАТИ ЩЕ РАЗ
      </button>


      <button
        class="sync-result-button secondary"
        onclick="leaveSyncKeyGame()"
      >
        ДО ВИПРОБУВАНЬ
      </button>

    </div>
  `;


  area.appendChild(
    overlay
  );
}


/* =====================================================
   ПЕРЕЗАПУСК 4 ГРИ
 ===================================================== */

function restartSyncKeyGame() {

  playSound("click");

  startSyncKeyGame();
}


/* =====================================================
   ПОВЕРНЕННЯ 4 ГРИ
===================================================== */

function finishSyncKeyAndReturn(
  progress
) {

  const levelId =
    syncKeyState.levelId;


  clearSyncKeyTimers();


  returnFromPasswordCastleTask(
    levelId,
    progress
  );
}


/* =====================================================
   ВИХІД ДО ВИПРОБУВАНЬ
===================================================== */

function leaveSyncKeyGame() {

  const levelId =
    syncKeyState.levelId;


  clearSyncKeyTimers();


  playSound("click");


  showLevel(levelId);

  openChallenge(levelId);
}


/* =====================================================
   ОЧИЩЕННЯ ТАЙМЕРІВ
===================================================== */

function clearSyncKeyTimers() {

  if (
    syncKeyState.codeTimer
  ) {

    clearInterval(
      syncKeyState.codeTimer
    );

    syncKeyState.codeTimer =
      null;

  }


  if (
    syncKeyState.attackTimer
  ) {

    clearInterval(
      syncKeyState.attackTimer
    );

    syncKeyState.attackTimer =
      null;

  }
}


/* =====================================================
   ФІНАЛ ЗАМКУ ПАРОЛІВ
===================================================== */

function showPasswordCastleFinal(
  levelId
) {

  clearSyncKeyTimers();

  playSound("crystal");


  app.innerHTML = `

    <section
      class="screen password-final-screen"
      ${bg(ASSETS.level1)}
    >

      <div class="password-final-glow"></div>


      <div class="password-final-card">

        <div class="password-final-eyebrow">
          Локацію завершено
        </div>


        <img
          class="password-final-crystal-image"
          src="${ASSETS.yellowOn}"
          alt="Жовтий кристал"
        >


        <h1>
          Замок Паролів врятовано!
        </h1>


        <p class="password-final-dialogue">

          <strong>
            Тотус:
          </strong>

          <br><br>

          Фантастика, Герою!

          <br><br>

          Ти пройшов усі
          чотири випробування
          Замку Паролів.

          <br><br>

          Тепер ти знаєш,
          як створювати сильні паролі,
          розпізнавати слабкі,
          використовувати різні ключі
          та захищати акаунти
          другим фактором.

          <br><br>

          Жовтий кристал
          відновив свою силу!

        </p>


        <button
          class="password-final-map-button"
          onclick="
            finishPasswordCastleLevel(
              ${levelId}
            )
          "
        >
          🗺️ НА КАРТУ СВІТУ
        </button>

      </div>

    </section>
  `;


  createPasswordFinalParticles();
}


/* =====================================================
   ЧАСТИНКИ ФІНАЛУ
===================================================== */

function createPasswordFinalParticles() {

  const screen =
    document.querySelector(
      ".password-final-screen"
    );

  if (!screen) return;


  for (
    let i = 0;
    i < 35;
    i += 1
  ) {

    const particle =
      document.createElement(
        "div"
      );


    particle.className =
      "password-final-particle";


    particle.style.left =
      `${Math.random() * 100}%`;


    particle.style.top =
      `${35 +
      Math.random() * 65}%`;


    particle.style.animationDuration =
      `${3 +
      Math.random() * 5}s`;


    particle.style.animationDelay =
      `${Math.random() * 4}s`;


    const size =
      3 +
      Math.random() * 5;


    particle.style.width =
      `${size}px`;

    particle.style.height =
      `${size}px`;


    screen.appendChild(
      particle
    );
  }
}


/* =====================================================
   ЗАВЕРШЕННЯ РІВНЯ
===================================================== */

function finishPasswordCastleLevel(
  levelId
) {

  /*
    Якщо у тебе вже є
    своя система localStorage,
    ці записи можна залишити.
  */

  localStorage.setItem(
    "passwordCastleCompleted",
    "true"
  );


  localStorage.setItem(
    "yellowCrystalActivated",
    "true"
  );


  localStorage.setItem(
    "cyberCrystalsCount",
    "1"
  );


  if (
    !completedLevels.includes(
      levelId
    )
  ) {

    completedLevels.push(
      levelId
    );
  }


  playSound("click");


  if (
    typeof showMap ===
    "function"
  ) {

    showMap();

    return;
  }


  if (
    typeof openWorldMap ===
    "function"
  ) {

    openWorldMap();
  }
}


/* =====================================================
   ГЛОБАЛЬНІ ВИКЛИКИ
===================================================== */

window.openPasswordBuilder =
  openPasswordBuilder;

window.openWeakPasswordHunter =
  openWeakPasswordHunter;

window.openKeyManager =
  openKeyManager;

window.openSyncKeyGame =
  openSyncKeyGame;

window.showPasswordCastleFinal =
  showPasswordCastleFinal;

window.finishPasswordCastleLevel =
  finishPasswordCastleLevel;



/* =====================================================
   ЦИТАДЕЛЬ ХАОСУ
===================================================== */

function citadelLocked() {

  openModal(

    "Цитадель ще закрита",

    `
      <p>
        Спочатку заряди
        всі П'ять Кристалів.
      </p>

      <p>
        Лише тоді шлях
        до Цитаделі Хаосу
        відкриється.
      </p>
    `
  );
}


function showCitadel() {

  app.innerHTML = `

    <section
      class="screen level-screen"
      ${bg(ASSETS.citadel)}
    >

      <button
        class="btn back-btn"
        onclick="
          playSound('click');
          showMap();
        "
      >
        ← До карти
      </button>

      <div class="level-actions">

        <button
          class="btn"
          onclick="
            playSound('click');
            openFinalBattle();
          "
        >
          Визволити Райфіка
        </button>

      </div>

    </section>
  `;
}


/* =====================================================
   ФІНАЛЬНА БИТВА
===================================================== */

function openFinalBattle() {

  openModal(

    "Фінальне випробування",

    `
      <div class="final-layout">

        <img
          class="final-character"
          src="${ASSETS.mordor}"
          alt="Мордор"
        >

        <div class="final-text">

          <p>
            Мордор ховається
            у Цитаделі Хаосу.
            Він намагається втримати
            Райфіка та силу Кристалів.
          </p>

          <p>
            Щоб зруйнувати Маску Обману,
            дай відповідь
            на фінальне питання.
          </p>

          <div class="task-instruction">

            Що робити,
            якщо отримав
            підозріле посилання?

          </div>

          <button
            class="answer-btn"
            onclick="winGame()"
          >
            Перевірити відправника
            і не вводити пароль
          </button>

          <button
            class="answer-btn"
            onclick="finalWrong()"
          >
            Одразу натиснути
          </button>

          <button
            class="answer-btn"
            onclick="finalWrong()"
          >
            Ввести пароль
          </button>

          <div
            class="result-box"
            id="result"
          ></div>

        </div>

      </div>
    `
  );
}


function finalWrong() {

  const resultBox =
    document.getElementById(
      "result"
    );


  playSound("wrong");


  resultBox.innerHTML =
    "❌ Мордор майже тебе обманув. Спробуй ще раз.";
}


/* =====================================================
   ПЕРЕМОГА
===================================================== */

function winGame() {

  playSound("final");


  const resultBox =
    document.getElementById(
      "result"
    );


  resultBox.innerHTML = `

    ✅ Маску Обману зруйновано!

    <br><br>

    <button
      class="btn"
      onclick="
        showVictoryScreen()
      "
    >
      Завершити гру
    </button>
  `;
}


function showVictoryScreen() {

  app.innerHTML = `

    <section
      class="screen"
      ${bg(ASSETS.map)}
    >

      <div class="victory-screen">

        <h1>
          🏆 Перемога!
        </h1>

        <p>
          Райфік врятований,
          а П'ять Кристалів
          знову захищають
          Королівство КіберЛегенд.
        </p>

        <p>
          Ти став / стала
          справжньою Легендою
          КіберБезпеки!
        </p>

        <button
          class="btn"
          onclick="
            playSound('click');
            openAfterCredits();
          "
        >
          Далі
        </button>

      </div>

    </section>
  `;
}


/* =====================================================
   СЦЕНА ПІСЛЯ ТИТРІВ
===================================================== */

function openAfterCredits() {

  openModal(

    "Сцена після титрів",

    `
      <p>
        Коли всі святкують перемогу,
        серед уламків трону
        залишається маленька
        фіолетова іскра.
      </p>

      <p>
        Вона поступово
        перетворюється
        на цифровий силует Мордора.
      </p>

      <p>
        І він тихо промовляє:
      </p>

      <div class="story-highlight">

        <p>
          “Ти переміг мене сьогодні...
        </p>

        <p>
          Але кіберзагрози
          ніколи не зникають назавжди.
        </p>

        <p>
          Ми ще зустрінемося,
          Герою...
        </p>

        <p>
          До наступної пригоди...”
        </p>

      </div>

      <p>
        <b>
          Кінець першого сезону.
        </b>
      </p>

      <button
        class="btn"
        onclick="
          playSound('click');
          closeModal();
          showStartScreen();
        "
      >
        Нова пригода
      </button>
    `
  );
}


/* =====================================================
   ЗАПУСК ГРИ
===================================================== */

showStartScreen();
