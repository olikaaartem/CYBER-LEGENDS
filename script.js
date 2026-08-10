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
   
  /*міні гра 1 рівень 1 БУДІВЕЛЬНИК СЕЙФУ */
   
   safeBuilderBg: "fon/fon_safe_builder.png",
   safeBuilderSafe: "artefaktu/safe_builder.png",

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
  storm: new Audio("music/storm.mp3")
  
};

function playSound(name){

  const sound = SOUNDS[name];

  if(!sound) return;

  sound.currentTime = 0;

  sound.play().catch(() => {});
}

function startMusic(){

  SOUNDS.bg.loop = true;
   
  SOUNDS.bg.volume = 0.03;

  SOUNDS.click.volume = 0.8;
  SOUNDS.crystal.volume = 1;
  SOUNDS.correct.volume = 0.9;
  SOUNDS.wrong.volume = 0.9;
  SOUNDS.final.volume = 0.8;
  SOUNDS.storm.volume = 0.25;
  SOUNDS.bg.play().catch(() => {});
  SOUNDS.storm.loop = true;
  SOUNDS.storm.play().catch(() => {});
   
}

document.addEventListener(
  "click",
  startMusic,
  { once:true }
);

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

function bg(image){

  return `style="--bg:url('${image}')"`;
}

function closeModal(){

  const modals =
    document.querySelectorAll(".modal-bg");

  if(modals.length > 0){
    modals[modals.length - 1].remove();
  }

}

function getHeroImage(){

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
        Колись у Королівстві КіберЛегенд панували мир, знання та безпека.
        У самому центрі королівства сяяв могутній Кристал БЕЗПЕКИ.
      </p>

      <p>
        Він допомагав мешканцям відрізняти правду від брехні,
        берегти особисті секрети та безпечно подорожувати цифровими світами.
      </p>
    </div>

    <p>
      Кристал охороняли п'ять великих наставників:
      Тотус, Фоксіта, Нереус, Анубіса та Тіфон.
      Разом із ними жив вірний друг королівства — кіберкінь Райфик.
    </p>

    <p>
      Але колишній хранитель Мордор захотів отримати всю силу знань лише для себе.
      Він викрав Райфика, накрив королівство цифровою грозою
      та розколов Кристал Мудрості на п'ять частин.
    </p>

    <p>
      Тепер новий герой має пройти всі локації, зарядити п'ять кристалів,
      звільнити Райфика та зупинити Мордора.
    </p>

    <h3>Наставники Королівства</h3>
 <div id="storyMentorsHere">
  </div>
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
      Він навчає мешканців створювати надійні секретні коди та нікому їх не розповідати.
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
      Фоксіта живе серед чарівного лісу, де ховаються підступні пастки та фальшиві повідомлення.
      Вона має надзвичайно гострий зір і помічає навіть найменший обман.
      Фоксіта навчає дітей перевіряти посилання, адреси сайтів та підозрілі листи.
      Завдяки її уважності жодна приманка не може довго залишатися прихованою.
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
      Його дзеркало показує правду навіть тоді, коли навколо панує брехня.
      Він навчає героїв перевіряти інформацію та не довіряти всьому,
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
      Вона живе у сяючій печері кристалів, де зберігаються особисті дані мешканців.
      Її магічна сфера попереджає про небезпеку, коли хтось намагається викрасти чужу інформацію.
      Анубіса навчає ніколи не розповідати свої паролі, адреси чи особисті таємниці незнайомцям.
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
      Його вогняний меч знищує небезпечні віруси та шкідливі програми.
      Він навчає героїв оновлювати пристрої та бути обережними з невідомими файлами.
      Тіфон знає, що навіть маленька помилка може відкрити двері великій небезпеці.
      Саме тому він завжди стоїть на варті безпеки.
      Під його захистом знаходиться Червоний Кристал Сили.
    `
  }
];

function renderStoryMentorButtons(){

  return MENTORS.map(mentor => `
    <button class="story-mentor-card" onclick="openMentorInfo(${mentor.id})">
      <img src="${mentor.medal}" alt="${mentor.name}">
      <span>${mentor.name}</span>
    </button>
  `).join("");
}

/* =====================================================
   ЦИФРОВА ГРОЗА
===================================================== */

function renderDigitalStorm(){

  const columns = [];

  for(let i = 0; i < 16; i++){
    columns.push(`
      <span
        class="rain-column"
        style="left:${4 + i * 6}%; animation-delay:${(i % 6) * 0.7}s;"
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

function showStartScreen(){

  app.innerHTML = `
    <section class="screen start-screen" ${bg(ASSETS.start)}>

      ${renderDigitalStorm()}

      <div class="start-panel">

        <img class="start-logo" src="${ASSETS.logo}" alt="Cyber Legends">

        <div class="season-title">
          Таємниця П'яти Кристалів
        </div>

        <div class="start-buttons">
          <button class="btn" onclick="playSound('click'); showMap()">Почати пригоду</button>
          <button class="btn" onclick="playSound('click'); openKingdomStory()">Історія</button>
          <button class="btn" onclick="playSound('click'); openSettings()">Налаштування</button>
        </div>

      </div>

      

    </section>
  `;
}


/* =====================================================
   МОДАЛЬНІ ВІКНА
===================================================== */

function openModal(title, content, extraClass = ""){

  app.innerHTML += `
    <div class="modal-bg" id="modal">
      <div class="modal ${extraClass}">

        <button class="close-modal" onclick="closeModal()">×</button>

        <div class="modal-content">
          <h2>${title}</h2>
          ${content}
        </div>

      </div>
    </div>
  `;
}

function openKingdomStory(){

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
 
  


function openSettings(){

  openModal(
    "Налаштування",
    `
      <p>Тут пізніше можна буде керувати музикою, підказками та озвучкою.</p>

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

function openMentorInfo(mentorId){

  const mentor = MENTORS.find(item => item.id === mentorId);

  if(!mentor) return;

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
          <h2>${mentor.name}</h2>

          <div class="mentor-role">
            ${mentor.role}
          </div>

          <p>
            <b>Артефакт:</b> ${mentor.artifact}
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

function showMap(){

  const allDone = completedLevels.length >= 5;

  app.innerHTML = `
    <section class="screen map-screen" ${bg(ASSETS.map)}>

      ${!allDone ? renderDigitalStorm() : ""}

      <button class="btn back-btn" onclick="playSound('click'); showStartScreen()">
        ← Назад
      </button>

      <button class="btn map-story-button" onclick="playSound('click'); openKingdomStory()">
        Історія
      </button>

      <div class="map-hero-button">
        <button class="btn" onclick="playSound('click'); showHeroSelect()">
          ${heroName ? "Герой: " + heroName : "Створити героя"}
        </button>
      </div>

      ${renderCrystalPanel()}

      ${LEVELS.map(level => renderMapLevel(level)).join("")}

      ${renderCitadelButton(allDone)}

    </section>
  `;
}

function renderMapLevel(level){

  const done = completedLevels.includes(level.id);

  return `
    <button
      class="map-level"
      style="left:${level.x}%; top:${level.y}%;"
      onclick="playSound('click'); showLevel(${level.id})"
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

function renderCitadelButton(allDone){

  return `
    <button
      class="map-level"
      style="left:${CITADEL.x}%; top:${CITADEL.y}%;"
      onclick="playSound('click'); ${allDone ? "showCitadel()" : "citadelLocked()"}"
    >
      <img
        class="map-level-medal"
        src="${allDone ? CITADEL.crystalOn : CITADEL.crystalOff}"
        alt="Цитадель Хаосу"
      >

      <div class="map-level-title">
        ${CITADEL.title}
      </div>
    </button>
  `;
}

/* =====================================================
   ЛІВА ПАНЕЛЬ ЗАРЯДЖЕННЯ КРИСТАЛІВ
===================================================== */

function renderCrystalPanel(){
 const completedCount = completedLevels.length;
 const totalPercent = completedCount * 20;
 const rows = LEVELS.map(level => {
   const doneTasks = completedTasks[level.id] || [];
   const percent = doneTasks.length * 25;
   const done = completedLevels.includes(level.id);
   return `
<div class="crystal-row ${done ? "active" : ""}" style="color:${level.color}">
<span class="crystal-check">${done ? "✅" : "🔒"}</span>
<img
         src="${done ? level.crystalOn : level.crystalOff}"
         alt="${level.title}"
>
<span>${level.title}</span>
<span class="crystal-percent">${percent}%</span>
</div>
   `;
 }).join("");
 const allDone = completedLevels.length >= 5;
 return `
<div class="crystal-panel">
<div class="crystal-panel-title">
       Зарядження кристалів
</div>
<div class="crystal-total">
       ${completedCount} / 5 відновлено • ${totalPercent}%
</div>
     ${rows}
<div class="crystal-row ${allDone ? "active" : ""}" style="color:#b95cff">
<span class="crystal-check">${allDone ? "✅" : "🔒"}</span>
<img
         src="${allDone ? ASSETS.purpleOn : ASSETS.purpleOff}"
         alt="Цитадель Хаосу"
>
<span>Цитадель Хаосу</span>
<span class="crystal-percent">${allDone ? "100%" : "0%"}</span>
</div>
</div>
 `;
}


/* =====================================================
   ВИБІР ГЕРОЯ
===================================================== */

function showHeroSelect(){

  app.innerHTML = `
    <section class="screen hero-select-screen" ${bg(ASSETS.heroSelect)}>

      <button class="btn back-btn" onclick="playSound('click'); showMap()">
        ← Назад
      </button>

      <div class="mentor-side">
        <div class="mentor-side-title">
          Натискай на наставника
        </div>

        ${MENTORS.map(mentor => `
          <img
            class="mentor-medal"
            src="${mentor.medal}"
            alt="${mentor.name}"
            onclick="playSound('click'); openMentorInfo(${mentor.id})"
          >
        `).join("")}
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
            class="hero-choice ${selectedHero === "boy" ? "selected" : ""}"
            src="${ASSETS.boy}"
            alt="Хлопчик"
            onclick="playSound('click'); chooseHero('boy')"
          >

          <img
            class="hero-choice ${selectedHero === "girl" ? "selected" : ""}"
            src="${ASSETS.girl}"
            alt="Дівчинка"
            onclick="playSound('click'); chooseHero('girl')"
          >

        </div>

        <input
          id="heroNameInput"
          class="hero-name-input"
          placeholder="Введи ім’я героя"
          value="${heroName}"
        >

        <button class="btn" onclick="playSound('click'); createHero()">
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

function openHeroScroll(greeting){

  openModal(
    "Героя створено",
    `
      <div class="scroll-modal">

        <h2>${greeting}</h2>

        <p>
          Попереду на тебе чекає велика пригода.
        </p>

        <p>
          П'ять наставників, п'ять артефактів
          та П'ять Кристалів.
        </p>

        <p>
          Врятуй Райфіка та переможи Мордора.
        </p>

        <button class="btn" onclick="playSound('click'); closeModal(); showMap();">
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
        У цьому замку зберігаються секретні ключі мешканців Королівства.
      </p>
      <p>
        Мордор намагається підібрати слабкі паролі та відкрити захисні брами.
        Щоб зупинити його, потрібно навчитися створювати надійні паролі.
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
        Тут усе може виглядати безпечно, але за гарними обіцянками часто ховаються пастки.
      </p>
      <p>
        Мордор залишив у лісі фальшиві листи, дивні посилання та повідомлення з подарунками.
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
        У його водах відображаються новини, фото та повідомлення з усього цифрового світу.
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
        Тут зберігаються найцінніші скарби Королівства — особисті дані мешканців.
      </p>
      <p>
        Мордор хоче викрасти ці дані, щоб послабити захист Королівства.
        Герой має навчитися відрізняти безпечну інформацію від приватної.
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
        Навколо літають іскри, а біля воріт з’являються віруси Мордора.
      </p>
      <p>
        Щоб захистити Королівство, герой має навчитися розпізнавати небезпечні файли
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

function showLevel(levelId){

  const level = LEVELS.find(item => item.id === levelId);
  const mentor = MENTORS.find(item => item.id === level.mentorId);
  const done = completedTasks[levelId] || [];
  const progress = done.length * 25;

  app.innerHTML = `
    <section class="screen level-screen" ${bg(level.bg)}>

      <button class="btn back-btn" onclick="playSound('click'); showMap()">
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
            style="width:${progress}%; background:${level.color};"
          ></div>
        </div>
      </div>

      <img
        class="level-mentor"
        src="${mentor.img}"
        alt="${mentor.name}"
        onclick="playSound('click'); openLevelTheory(${levelId})"
      >

      <div class="level-actions">
        <button class="btn" onclick="playSound('click'); openLevelTheory(${levelId})">
          Історія і теорія
        </button>

        <button class="btn" onclick="playSound('click'); openChallenge(${levelId})">
          Почати випробування
        </button>
      </div>

    </section>
  `;
}

/* =====================================================
   ІСТОРІЯ + ТЕОРІЯ РІВНЯ
===================================================== */

function openLevelTheory(levelId){

  const level = LEVELS.find(item => item.id === levelId);
  const mentor = MENTORS.find(item => item.id === level.mentorId);
  const content = LEVEL_CONTENT[levelId];

  openModal(
    content.storyTitle,
    `
      <div class="theory-box">

        <img src="${mentor.img}" alt="${mentor.name}">

        <div class="theory-text">
          <h3>${mentor.name} пояснює</h3>

          ${content.intro}

          <div class="task-instruction">
            Що потрібно запам’ятати:
          </div>

          <ol class="theory-list">
            ${content.theory.map(item => `<li>${item}</li>`).join("")}
          </ol>

          <button class="btn" onclick="playSound('click'); closeModal(); openChallenge(${levelId})">
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


/* =====================================================
Рівень 1 - наставник ТОТУС
===================================================== */

const CHALLENGES = {
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

/* =====================================================
Рівень 2 - наставник ФОКСІТА
===================================================== */

  2: [
    {
      title: "Підозріле посилання",
      icon: ASSETS.greenOn,
      question: "Що треба зробити перед переходом за посиланням?",
      answers: [
        "Перевірити адресу сайту",
        "Натиснути одразу",
        "Скинути друзям"
      ],
      correct: 0
    },
    {
      title: "Що таке фішинг?",
      icon: ASSETS.greenOn,
      question: "Фішинг — це коли...",
      answers: [
        "Шахраї виманюють дані",
        "Оновлюється гра",
        "Змінюється фон"
      ],
      correct: 0
    },
    {
      title: "Лист-пастка",
      icon: ASSETS.greenOn,
      question: "Підозрілий лист просить пароль. Що робити?",
      answers: [
        "Ввести пароль",
        "Повідомити дорослим",
        "Переслати всім"
      ],
      correct: 1
    },
    {
      title: "Ознаки шахрайства",
      icon: ASSETS.greenOn,
      question: "Що може бути ознакою шахрайства?",
      answers: [
        "Помилки в тексті",
        "Тиск і терміновість",
        "Обидва варіанти"
      ],
      correct: 2
    }
  ],

/* =====================================================
Рівень 3 - наставник НЕРЕУС
===================================================== */

  3: [
    {
      title: "Гучна новина",
      icon: ASSETS.blueOn,
      question: "Що треба зробити з гучною новиною?",
      answers: [
        "Одразу поширити",
        "Перевірити джерело",
        "Повірити заголовку"
      ],
      correct: 1
    },
    {
      title: "Фейк чи правда",
      icon: ASSETS.blueOn,
      question: "Фейк — це...",
      answers: [
        "Неправдива інформація",
        "Корисна підказка",
        "Сильний пароль"
      ],
      correct: 0
    },
    {
      title: "Надійне джерело",
      icon: ASSETS.blueOn,
      question: "Якому джерелу краще довіряти?",
      answers: [
        "Анонімному чату",
        "Офіційному сайту",
        "Невідомому скріну"
      ],
      correct: 1
    },
    {
      title: "Перевірка",
      icon: ASSETS.blueOn,
      question: "Якщо інформація викликає сумнів:",
      answers: [
        "Перевірити в кількох джерелах",
        "Повірити одразу",
        "Поширити швидше"
      ],
      correct: 0
    }
  ],
/* =====================================================
Рівень 4 - наставник АНУБІСА
===================================================== */
  4: [
    {
      title: "Особисті дані",
      icon: ASSETS.pinkOn,
      question: "Які дані не можна публікувати відкрито?",
      answers: [
        "Адресу і телефон",
        "Улюблений колір",
        "Назву гри"
      ],
      correct: 0
    },
    {
      title: "Що таке дані?",
      icon: ASSETS.pinkOn,
      question: "Особиста інформація — це...",
      answers: [
        "Дані про людину",
        "Назва рівня",
        "Колір кнопки"
      ],
      correct: 0
    },
    {
      title: "Фото документів",
      icon: ASSETS.pinkOn,
      question: "Що робити з фото документів?",
      answers: [
        "Публікувати всюди",
        "Зберігати обережно",
        "Кидати в чат"
      ],
      correct: 1
    },
    {
      title: "Скарби Анубіси",
      icon: ASSETS.pinkOn,
      question: "Чому важливо берегти дані?",
      answers: [
        "Щоб шахраї їх не використали",
        "Бо так красивіше",
        "Щоб було більше файлів"
      ],
      correct: 0
    }
  ],
/* =====================================================
Рівень5 - наставник ТІФОН АЛЕ БУДЕ  РОБОТ
===================================================== */
  5: [
    {
      title: "Підозрілий файл",
      icon: ASSETS.redOn,
      question: "Що робити з підозрілим файлом?",
      answers: [
        "Відкрити",
        "Не відкривати",
        "Запустити одразу"
      ],
      correct: 1
    },
    {
      title: "Оновлення",
      icon: ASSETS.redOn,
      question: "Навіщо оновлювати пристрій?",
      answers: [
        "Для захисту",
        "Щоб було повільніше",
        "Щоб зник інтернет"
      ],
      correct: 0
    },
    {
      title: "Антивірус",
      icon: ASSETS.redOn,
      question: "Антивірус допомагає...",
      answers: [
        "Захищати пристрій",
        "Створювати фейки",
        "Ламати пароль"
      ],
      correct: 0
    },
    {
      title: "Порада Тіфона",
      icon: ASSETS.redOn,
      question: "Як діяти, якщо файл дивний?",
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
 const level = LEVELS.find(item => item.id === levelId);
 const tasks = CHALLENGES[levelId];
 const done = completedTasks[levelId] || [];
 if (!level || !tasks) {
   openModal(
     "Помилка",
     "<p>Не вдалося відкрити випробування цього рівня.</p>"
   );
   return;
 }
 openModal(
   "Випробування: " + level.title,
   `
<div class="task-instruction">
       Виконай 4 завдання, щоб зарядити кристал на 100%.
</div>
<div class="challenge-grid">
       ${tasks.map((task, index) => `
<button
           class="challenge-card"
           onclick="playSound('click'); openTask(${levelId}, ${index})"
>
<img
             src="${level.artifact}"
             alt="Артефакт рівня ${level.title}"
>
<div class="challenge-card-title">
             ${task.title}
</div>
<div class="challenge-card-status">
             ${done.includes(index) ? "✅ виконано" : "почати"}
</div>
</button>
       `).join("")}
</div>
   `
 );
}

/* =====================================================
   ВІДКРИТИ ЗАВДАННЯ
===================================================== */

function openTask(levelId, taskIndex) {
 const task = CHALLENGES[levelId][taskIndex];
 if (!task) return;
 closeModal();
 if (levelId === 1) {
   if (task.type === "password-builder") {
     openPasswordBuilder(levelId, taskIndex);
     return;
   }
   if (task.type === "weak-password-hunter") {
     openWeakPasswordHunter(levelId, taskIndex);
     return;
   }
   if (task.type === "password-manager") {
     openPasswordManager(levelId, taskIndex);
     return;
   }
   if (task.type === "two-factor") {
     openTwoFactorTask(levelId, taskIndex);
     return;
   }
 }
 /* Старий формат для інших рівнів */
 openModal(
   task.title,
   `
<p class="task-instruction">
       ${task.question}
</p>
     ${task.answers.map((answer, index) => `
<button
         class="answer-btn"
         onclick="checkAnswer(${levelId}, ${taskIndex}, ${index})"
>
         ${answer}
</button>
     `).join("")}
<div class="result-box" id="result"></div>
   `
 );
}
/* =====================================================
   МІНІІГРИ: ЗАМОК ПАРОЛІВ
===================================================== */


/* =====================================================
   ЗАВЕРШЕННЯ МІНІІГРИ
===================================================== */

function completeMiniGame(levelId, taskIndex, message) {

  if (!completedTasks[levelId]) {
    completedTasks[levelId] = [];
  }

  if (!completedTasks[levelId].includes(taskIndex)) {
    completedTasks[levelId].push(taskIndex);
  }

  const progress = completedTasks[levelId].length * 25;

  playSound("correct");

  if (progress >= 100) {

    if (!completedLevels.includes(levelId)) {
      completedLevels.push(levelId);
    }

    playSound("crystal");

    closeModal();
    openLevelReward(levelId);

    return;
  }

  const resultBox = document.getElementById("result");

  if (!resultBox) return;

  resultBox.innerHTML = `
    <div class="story-highlight">
      <p>✅ ${message}</p>
      <p>Жовтий кристал заряджено на ${progress}%.</p>
    </div>

    <button
      class="btn"
      onclick="playSound('click'); closeModal(); openChallenge(${levelId})"
    >
      До наступного завдання
    </button>
  `;
}


/* =====================================================
   1. БУДІВЕЛЬНИК СЕЙФУ
===================================================== */
/* =====================================================
   МІНІГРА 1 — БУДІВЕЛЬНИК СЕЙФУ
===================================================== */

let passwordBuilderState = {
  word: "",
  symbol: "",
  length: "",
  letterCase: ""
};


/* =====================================================
   ВІДКРИТТЯ МІНІГРИ
===================================================== */

function openPasswordBuilder(levelId, taskIndex) {

  closeModal();

  passwordBuilderState = {
    word: "",
    symbol: "",
    length: "",
    letterCase: ""
  };

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

      <div class="safe-builder-header">

        <h1>
          Будівельник сейфу
        </h1>

        <p>
          Обери по одному елементу з кожної категорії
          та створи пароль, який Мордор не зламає.
        </p>

      </div>

      <div class="safe-builder-layout">

        <div class="safe-builder-left-panel">

          ${renderPasswordCategory(
            "word",
            "1. Основа пароля",
            [
              {
                value: "Cat",
                label: "Cat",
                hint: "Коротке просте слово"
              },
              {
                value: "MyDog2015",
                label: "MyDog2015",
                hint: "Ім’я та рік"
              },
              {
                value: "P1zz4_S3cr3t",
                label: "P1zz4_S3cr3t",
                hint: "Складна фраза"
              }
            ]
          )}

          ${renderPasswordCategory(
            "symbol",
            "2. Спеціальний символ",
            [
              {
                value: "none",
                label: "Без символів",
                hint: "Не додавати"
              },
              {
                value: "#",
                label: "#",
                hint: "Решітка"
              },
              {
                value: "@",
                label: "@",
                hint: "Символ @"
              },
              {
                value: "!",
                label: "!",
                hint: "Знак оклику"
              }
            ]
          )}

        </div>

        <div class="safe-builder-center">

          <div
            id="safeVisual"
            class="safe-builder-safe-wrap"
          >
            <div
              id="safeRedFlash"
              class="safe-red-flash"
            ></div>

            <div
              id="safeGoldenFlash"
              class="safe-golden-flash"
            ></div>

            <img
              id="safeImage"
              class="safe-builder-safe"
              src="${ASSETS.safeBuilderSafe}"
              alt="Магічний сейф"
            >

            <div
              id="safeCrackText"
              class="safe-crack-text"
            >
              ЗЛАМАНО!
            </div>
          </div>

          <div class="safe-password-display">

            <div class="safe-password-label">
              Створений пароль
            </div>

            <div
              id="passwordPreview"
              class="safe-password-value"
            >
              Обери елементи
            </div>

          </div>

          <div class="safe-strength-panel">

            <div class="safe-strength-top">

              <span>
                Міцність захисту
              </span>

              <strong id="strengthPercent">
                0%
              </strong>

            </div>

            <div class="safe-strength-track">

              <div
                id="strengthFill"
                class="safe-strength-fill"
                style="width:0%;"
              ></div>

            </div>

            <div
              id="strengthLabel"
              class="safe-strength-label strength-empty"
            >
              Захист ще не створено
            </div>

          </div>

          <button
            id="lockSafeButton"
            class="btn safe-lock-button"
            onclick="checkSafePassword(${levelId}, ${taskIndex})"
          >
            🔐 Замкнути сейф
          </button>

          <div
            id="safeBuilderResult"
            class="safe-builder-result"
          ></div>

        </div>

        <div class="safe-builder-right-panel">

          ${renderPasswordCategory(
            "length",
            "3. Довжина пароля",
            [
              {
                value: "4",
                label: "4 символи",
                hint: "Короткий"
              },
              {
                value: "8",
                label: "8 символів",
                hint: "Середній"
              },
              {
                value: "12",
                label: "12+ символів",
                hint: "Довгий"
              }
            ]
          )}

          ${renderPasswordCategory(
            "letterCase",
            "4. Регістр",
            [
              {
                value: "lower",
                label: "abc",
                hint: "Лише малі"
              },
              {
                value: "upper",
                label: "ABC",
                hint: "Лише великі"
              },
              {
                value: "mixed",
                label: "aBc",
                hint: "Великі та малі"
              }
            ]
          )}

        </div>

      </div>

    </section>
  `;

  updateSafeBuilder();
}


/* =====================================================
   СТВОРЕННЯ КАТЕГОРІЙ
===================================================== */

function renderPasswordCategory(category, title, options) {

  return `
    <div class="safe-option-group">

      <h3>
        ${title}
      </h3>

      <div class="safe-option-list">

        ${options.map(option => `
          <button
            type="button"
            class="safe-option-card"
            data-category="${category}"
            data-value="${option.value}"
            onclick="
/* =====================================================
МІНІГРА 1 — БУДІВЕЛЬНИК СЕЙФУ  РІВЕНЬ 1 НАСТАВНИК ТОТУС
===================================================== */

let passwordBuilderState = {
word: "",
symbol: "",
length: "",
letterCase: ""
};

let safeSelectedCard = null;


/* =====================================================
ВІДКРИТТЯ ГРИ
===================================================== */

function openPasswordBuilder(levelId, taskIndex) {

closeModal();

passwordBuilderState = {
word: "",
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
← До завдань
</button>


<!-- ЖИТТЯ / СПРОБИ -->

<div class="safe-hearts" id="safeHearts">
❤️ ❤️ ❤️
</div>


<!-- НАЗВА -->

<div class="safe-builder-title">
Будівельник сейфу
</div>


<!-- ЛІВА СТОРОНА -->

<div class="safe-builder-column safe-left">

${renderSafeGroup(
"word",
"1. Основа пароля",
[
["Cat", "Cat"],
["MyDog2015", "MyDog2015"],
["P1zz4_S3cr3t", "P1zz4_S3cr3t"]
]
)}

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


<!-- ЦЕНТР -->

<div class="safe-builder-center">

<div
class="safe-drop-zone"
id="safeDropZone"
ondragover="allowSafeDrop(event)"
ondrop="dropOnSafe(event)"
onclick="placeSelectedCardOnSafe()"
>

<div class="safe-red-effect" id="safeRedEffect"></div>
<div class="safe-gold-effect" id="safeGoldEffect"></div>

<img
id="safeImage"
class="safe-builder-image"
src="${ASSETS.safeBuilderSafe}"
alt="Сейф"
>

<div class="safe-drop-hint" id="safeDropHint">
Перетягни блок сюди
</div>

</div>


<!-- ВИБРАНІ ЕЛЕМЕНТИ -->

<div class="safe-installed">

<div class="safe-installed-slot">
<span>Основа</span>
<strong id="installed-word">—</strong>
</div>

<div class="safe-installed-slot">
<span>Символ</span>
<strong id="installed-symbol">—</strong>
</div>

<div class="safe-installed-slot">
<span>Довжина</span>
<strong id="installed-length">—</strong>
</div>

<div class="safe-installed-slot">
<span>Регістр</span>
<strong id="installed-letterCase">—</strong>
</div>

</div>


<!-- ПАРОЛЬ -->

<div class="safe-password-box">

<span>Створений пароль</span>

<strong id="safePasswordPreview">
Обери елементи
</strong>

</div>


<!-- ШКАЛА -->

<div class="safe-strength">

<div class="safe-strength-header">
<span>Міцність захисту</span>
<strong id="safeStrengthPercent">0%</strong>
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
onclick="checkSafeBuilder(${levelId}, ${taskIndex})"
>
🔐 Замкнути сейф
</button>


<div
class="safe-result-message"
id="safeResultMessage"
></div>

</div>


<!-- ПРАВА СТОРОНА -->

<div class="safe-builder-column safe-right">

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


<!-- ВСТУП ТОТУСА -->

<div class="safe-intro-overlay" id="safeIntroOverlay">

<div class="safe-intro-card">

<img
src="${ASSETS.totus}"
class="safe-intro-totus"
alt="Тотус"
>

<div class="safe-intro-text">

<h2>
Тотус пояснює
</h2>

<p>
Мордор намагається зламати наш сейф!
</p>

<p>
Тобі потрібно створити надійний пароль.
Перетягни на сейф по одному блоку
з кожної категорії:
</p>

<p>
<b>
основу → спецсимвол → довжину → регістр.
</b>
</p>

<div class="safe-example">

<span>Наприклад:</span>

<strong>
P1zz4_S3cr3t + # + 12+ + aBc
</strong>

<span>
🔐 = сильний пароль
</span>

</div>

<p class="safe-intro-note">
Якщо помилишся — нічого страшного.
Можна пробувати стільки разів,
скільки потрібно.
</p>

<button
class="btn"
onclick="startSafeBuilderGame()"
>
Почати випробування
</button>

</div>

</div>

</div>

</section>
`;

}


/* =====================================================
СТВОРЕННЯ БЛОКІВ
===================================================== */

function renderSafeGroup(category, title, options) {

return `
<div class="safe-category">

<h3>${title}</h3>

<div class="safe-cards">

${options.map(([value, label]) => `
<div
class="safe-drag-card"
draggable="true"
data-category="${category}"
data-value="${value}"
data-label="${label}"

ondragstart="startSafeDrag(event)"

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
`).join("")}

</div>

</div>
`;
}


/* =====================================================
ПОЧАТОК ПІСЛЯ ПОЯСНЕННЯ ТОТУСА
===================================================== */

function startSafeBuilderGame() {

const overlay =
document.getElementById("safeIntroOverlay");

if (overlay) {
overlay.classList.add("hide");
}

playSound("click");
}


/* =====================================================
DRAG & DROP
===================================================== */

function startSafeDrag(event) {

const card = event.currentTarget;

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

card.classList.add("dragging");
}


function allowSafeDrop(event) {

event.preventDefault();

const zone =
document.getElementById("safeDropZone");

if (zone) {
zone.classList.add("drag-over");
}
}


function dropOnSafe(event) {

event.preventDefault();

const category =
event.dataTransfer.getData("category");

const value =
event.dataTransfer.getData("value");

const label =
event.dataTransfer.getData("label");

installSafePart(
category,
value,
label
);

document
.querySelectorAll(".safe-drag-card")
.forEach(card => {
card.classList.remove("dragging");
});

const zone =
document.getElementById("safeDropZone");

if (zone) {
zone.classList.remove("drag-over");
}
}


/* =====================================================
НАТИСКАННЯ — ДЛЯ ТЕЛЕФОНА / ПЛАНШЕТА
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
.querySelectorAll(".safe-drag-card")
.forEach(card => {
card.classList.remove("touch-selected");
});

element.classList.add("touch-selected");

const hint =
document.getElementById("safeDropHint");

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
.querySelectorAll(".safe-drag-card")
.forEach(card => {
card.classList.remove("touch-selected");
});
}


/* =====================================================
ВСТАНОВЛЕННЯ БЛОКУ НА СЕЙФ
===================================================== */

function installSafePart(
category,
value,
label
) {

passwordBuilderState[category] = value;

const slot =
document.getElementById(
`installed-${category}`
);

if (slot) {
slot.textContent = label;
slot.parentElement.classList.add("filled");
}

document
.querySelectorAll(
`.safe-drag-card[data-category="${category}"]`
)
.forEach(card => {

card.classList.remove("installed");

if (
card.dataset.value === value
) {
card.classList.add("installed");
}

});

const hint =
document.getElementById("safeDropHint");

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

let word =
passwordBuilderState.word || "";

if (
passwordBuilderState.letterCase === "lower"
) {
word = word.toLowerCase();
}

if (
passwordBuilderState.letterCase === "upper"
) {
word = word.toUpperCase();
}

if (
passwordBuilderState.letterCase === "mixed"
) {

word = word
.split("")
.map((char, index) => {

if (!/[a-zA-Z]/.test(char)) {
return char;
}

return index % 2 === 0
? char.toUpperCase()
: char.toLowerCase();

})
.join("");
}


let symbol = "";

if (
passwordBuilderState.symbol &&
passwordBuilderState.symbol !== "none"
) {
symbol = passwordBuilderState.symbol;
}


let password =
word + symbol;


const targetLength =
Number(
passwordBuilderState.length || 0
);


const extra = [
"27",
"84",
"51",
"2026"
];

let i = 0;

while (
targetLength &&
password.length < targetLength
) {

password += extra[i];

i =
(i + 1) % extra.length;
}


return password;
}


/* =====================================================
МІЦНІСТЬ
===================================================== */

function calculateSafeBuilderStrength() {

let score = 0;


if (passwordBuilderState.word === "Cat") {
score += 5;
}

if (
passwordBuilderState.word === "MyDog2015"
) {
score += 15;
}

if (
passwordBuilderState.word ===
"P1zz4_S3cr3t"
) {
score += 30;
}


if (
passwordBuilderState.symbol &&
passwordBuilderState.symbol !== "none"
) {
score += 20;
}


if (
passwordBuilderState.length === "4"
) {
score += 5;
}

if (
passwordBuilderState.length === "8"
) {
score += 15;
}

if (
passwordBuilderState.length === "12"
) {
score += 30;
}


if (
passwordBuilderState.letterCase === "lower"
) {
score += 5;
}

if (
passwordBuilderState.letterCase === "upper"
) {
score += 10;
}

if (
passwordBuilderState.letterCase === "mixed"
) {
score += 20;
}


return Math.min(
score,
100
);
}


/* =====================================================
ОНОВЛЕННЯ ЕКРАНА
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


const count =
Object
.values(passwordBuilderState)
.filter(Boolean)
.length;


const strength =
calculateSafeBuilderStrength();


if (preview) {

preview.textContent =
count
? password
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
}

else if (strength < 85) {
fill.classList.add("medium");
}

else {
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
ПЕРЕВІРКА
===================================================== */

function checkSafeBuilder(
levelId,
taskIndex
) {

const message =
document.getElementById(
"safeResultMessage"
);


const count =
Object
.values(passwordBuilderState)
.filter(Boolean)
.length;


if (count < 4) {

safeBuilderMistake(
"Обери всі чотири елементи."
);

return;
}


const strength =
calculateSafeBuilderStrength();


if (strength < 50) {

safeBuilderMistake(
"Зламано за 1 секунду! Мордор легко підібрав цей пароль."
);

shakeSafeBuilder("strong");

return;
}


if (strength < 85) {

safeBuilderMistake(
"Майже! Спробуй додати сильнішу основу, більшу довжину, спецсимвол або різний регістр."
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
ПОМИЛКА — БЕЗ GAME OVER
===================================================== */

function safeBuilderMistake(text) {

playSound("wrong");


const hearts =
document.getElementById("safeHearts");

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


setTimeout(() => {

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
<b>Спробуй ще раз.</b>
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


setTimeout(() => {

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
ПЕРЕМОГА
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


if (safe) {
safe.classList.add(
"safe-win"
);
}


if (gold) {
gold.classList.add(
"active"
);
}


setTimeout(() => {

registerSafeBuilderSuccess(
levelId,
taskIndex
);

}, 1300);
}


/* =====================================================
ЗАПИС +25%
===================================================== */

function registerSafeBuilderSuccess(
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
completedTasks[levelId].length * 25;


if (
progress >= 100 &&
!completedLevels.includes(levelId)
) {

completedLevels.push(levelId);
}


openSafeBuilderVictory(
levelId,
progress
);
}


/* =====================================================
ФІНАЛЬНЕ ВІКНО
===================================================== */

function openSafeBuilderVictory(
levelId,
progress
) {

openModal(

"Сейф надійно замкнено!",

`
<div class="scroll-modal">

<div style="
font-size:64px;
margin-bottom:12px;
">
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
Мордор не зміг зламати сейф!
</p>

<p style="
color:#ffd84d;
font-weight:900;
">
Жовтий кристал:
${progress}%
</p>

<button
class="btn"
onclick="
playSound('click');
closeModal();
showLevel(${levelId});
openChallenge(${levelId});
"
>
← Назад до завдань
</button>

</div>
`
);
}

/* =====================================================
   МІНІГРА 2 — ПОЛЮВАЛЬНИК ЗА СЛАБКОСТЯМИ
===================================================== */
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
  {
    value: "12345678",
    weak: true
  },
  {
    value: "password",
    weak: true
  },
  {
    value: "qwerty",
    weak: true
  },
  {
    value: "katya2014",
    weak: true
  },
  {
    value: "iloveyou",
    weak: true
  },
  {
    value: "123456789",
    weak: true
  },
  {
    value: "admin123",
    weak: true
  },
  {
    value: "11111111",
    weak: true
  },
  {
    value: "football",
    weak: true
  },
  {
    value: "princess",
    weak: true
  },

  {
    value: "K7#mP9!xL",
    weak: false
  },
  {
    value: "R0bL0x_P4ss!",
    weak: false
  },
  {
    value: "S3cur3_S4fe#9",
    weak: false
  },
  {
    value: "BlueDragon1827!",
    weak: false
  },
  {
    value: "M0on#River_84",
    weak: false
  },
  {
    value: "Cyb3r!Castle#27",
    weak: false
  }
];


let weakHunterState = {
  levelId: null,
  taskIndex: null,

  timeLeft: WEAK_HUNTER_CONFIG.duration,
  score: 0,
  lives: WEAK_HUNTER_CONFIG.maxLives,

  running: false,
  finished: false,

  timerId: null,
  spawnId: null,

  passwordTimeouts: []
};


/* =====================================================
   ВІДКРИТТЯ МІНІГРИ
===================================================== */

function openWeakPasswordHunter(levelId, taskIndex) {

  closeModal();

  cleanupWeakHunter();

  weakHunterState = {
    levelId,
    taskIndex,

    timeLeft: WEAK_HUNTER_CONFIG.duration,
    score: 0,
    lives: WEAK_HUNTER_CONFIG.maxLives,

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
        type="button"
        class="btn weak-hunter-back"
        onclick="leaveWeakHunter()"
      >
        ← До випробувань
      </button>

      <div class="weak-hunter-dark-overlay"></div>

      <div
        id="weakHunterGameArea"
        class="weak-hunter-game-area"
      ></div>

      <div
        id="weakHunterMentorStage"
        class="weak-hunter-mentor-stage"
      >

        <button
          type="button"
          class="weak-hunter-mentor-button"
          onclick="showWeakHunterInstructions()"
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
   ПОЯСНЕННЯ ТОТУСА
===================================================== */

function showWeakHunterInstructions() {

  playSound("click");

  const mentorStage =
    document.getElementById("weakHunterMentorStage");

  if (!mentorStage) return;

  mentorStage.innerHTML = `
    <div class="weak-hunter-dialog-scene">

      <img
        class="weak-hunter-dialog-mentor"
        src="${ASSETS.totus}"
        alt="Наставник Тотус"
      >

      <div class="weak-hunter-dialog">

        <h2>
          Полювання за слабкостями
        </h2>

        <p>
          Мордор випустив у Замок слабкі паролі.
        </p>

        <p>
          Натискай лише на
          <strong>слабкі паролі</strong>,
          щоб знищити їх.
        </p>

        <p>
          <strong>Сильні паролі не чіпай!</strong>
          За помилку згасне один кристал життя.
        </p>

        <div class="weak-hunter-rules">

          <span>
            ⏱️ 30 секунд
          </span>

          <span>
            🎯 15 слабких паролів
          </span>

          <span>
            💎 3 життя
          </span>

        </div>

        <button
          type="button"
          class="btn weak-hunter-start-button"
          onclick="startWeakHunterGame()"
        >
          Розпочати полювання
        </button>

      </div>

    </div>
  `;
}


/* =====================================================
   ЗАПУСК ГРИ
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
    document.getElementById("weakHunterGameArea");

  const mentorStage =
    document.getElementById("weakHunterMentorStage");

  if (!gameArea || !mentorStage) return;

  mentorStage.classList.add("hidden");

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
          Знищено
        </span>

        <strong id="weakHunterScore">
          0 / ${WEAK_HUNTER_CONFIG.targetScore}
        </strong>

      </div>

      <div class="weak-hunter-hud-box weak-hunter-lives-box">

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

    <div class="weak-hunter-center-crystal-wrap">

      <div
        id="weakHunterCrystalGlow"
        class="weak-hunter-crystal-glow"
      ></div>

      <img
        id="weakHunterCenterCrystal"
        class="weak-hunter-center-crystal"
        src="${ASSETS.yellowCrystal}"
        alt="Кристал Замку Паролів"
      >

    </div>

    <div
      id="weakHunterMessage"
      class="weak-hunter-message"
    ></div>
  `;

  updateWeakHunterHud();

  playSound("click");

  for (let index = 0; index < 5; index += 1) {

    window.setTimeout(() => {

      if (weakHunterState.running) {
        spawnWeakHunterPassword();
      }

    }, index * 180);
  }

  weakHunterState.spawnId =
    window.setInterval(() => {

      spawnWeakHunterPassword();

    }, WEAK_HUNTER_CONFIG.spawnInterval);

  weakHunterState.timerId =
    window.setInterval(() => {

      weakHunterState.timeLeft -= 1;

      updateWeakHunterHud();

      if (weakHunterState.timeLeft <= 0) {

        failWeakHunter(
          "Час завершився. Спробуй ще раз!"
        );
      }

    }, 1000);
}


/* =====================================================
   ВІДОБРАЖЕННЯ ЖИТТІВ
===================================================== */

function renderWeakHunterLives() {

  return Array
    .from(
      {
        length: WEAK_HUNTER_CONFIG.maxLives
      },
      (_, index) => `
        <img
          class="
            weak-hunter-life-crystal
            ${index < weakHunterState.lives
              ? "active"
              : "inactive"}
          "
          src="${ASSETS.yellowCrystal}"
          alt=""
        >
      `
    )
    .join("");
}


/* =====================================================
   СТВОРЕННЯ ЛІТАЮЧОГО ПАРОЛЯ
===================================================== */

function spawnWeakHunterPassword() {

  if (
    !weakHunterState.running ||
    weakHunterState.finished
  ) {
    return;
  }

  const passwordZone =
    document.getElementById(
      "weakHunterPasswords"
    );

  if (!passwordZone) return;

  const currentPasswords =
    passwordZone.querySelectorAll(
      ".weak-hunter-password"
    );

  if (
    currentPasswords.length >=
    WEAK_HUNTER_CONFIG.maxPasswordsOnScreen
  ) {
    return;
  }

  const passwordData =
    getRandomWeakHunterPassword();

  const passwordElement =
    document.createElement("button");

  passwordElement.type = "button";

  passwordElement.className =
    `weak-hunter-password ${
      passwordData.weak
        ? "weak-password"
        : "strong-password"
    }`;

  passwordElement.textContent =
    passwordData.value;

  passwordElement.dataset.weak =
    String(passwordData.weak);

  const startX =
    randomWeakHunterNumber(8, 78);

  const startY =
    randomWeakHunterNumber(17, 75);

  const moveX =
    randomWeakHunterNumber(-120, 120);

  const moveY =
    randomWeakHunterNumber(-80, 80);

  const rotation =
    randomWeakHunterNumber(-10, 10);

  const lifetime =
    randomWeakHunterNumber(4800, 6800);

  passwordElement.style.left =
    `${startX}%`;

  passwordElement.style.top =
    `${startY}%`;

  passwordElement.style.setProperty(
    "--weak-hunter-move-x",
    `${moveX}px`
  );

  passwordElement.style.setProperty(
    "--weak-hunter-move-y",
    `${moveY}px`
  );

  passwordElement.style.setProperty(
    "--weak-hunter-rotation",
    `${rotation}deg`
  );

  passwordElement.style.setProperty(
    "--weak-hunter-duration",
    `${lifetime}ms`
  );

  passwordElement.addEventListener(
    "click",
    () => {

      handleWeakHunterPassword(
        passwordElement,
        passwordData
      );
    }
  );

  passwordZone.appendChild(passwordElement);

  const timeoutId =
    window.setTimeout(() => {

      expireWeakHunterPassword(
        passwordElement,
        passwordData
      );

    }, lifetime);

  weakHunterState.passwordTimeouts.push(
    timeoutId
  );
}


/* =====================================================
   ВИПАДКОВИЙ ПАРОЛЬ
===================================================== */

function getRandomWeakHunterPassword() {

  /*
    Приблизно 65% паролів будуть слабкими,
    щоб дитина встигла набрати 15 балів.
  */

  const shouldBeWeak =
    Math.random() < 0.65;

  const availablePasswords =
    WEAK_HUNTER_PASSWORDS.filter(
      item => item.weak === shouldBeWeak
    );

  return availablePasswords[
    Math.floor(
      Math.random() *
      availablePasswords.length
    )
  ];
}


/* =====================================================
   КЛІК ПО ПАРОЛЮ
===================================================== */

function handleWeakHunterPassword(
  passwordElement,
  passwordData
) {

  if (
    !weakHunterState.running ||
    weakHunterState.finished ||
    passwordElement.classList.contains(
      "destroyed"
    )
  ) {
    return;
  }

  passwordElement.classList.add(
    "destroyed"
  );

  passwordElement.disabled = true;

  if (passwordData.weak) {

    playSound("correct");

    weakHunterState.score += 1;

    passwordElement.classList.add(
      "correct-hit"
    );

    createWeakHunterParticles(
      passwordElement,
      "gold"
    );

    showWeakHunterMessage(
      "+1",
      "success"
    );

    pulseWeakHunterCrystal("success");

    updateWeakHunterHud();

    if (
      weakHunterState.score >=
      WEAK_HUNTER_CONFIG.targetScore
    ) {

      window.setTimeout(() => {

        completeWeakHunter();

      }, 260);
    }

  } else {

    playSound("wrong");

    passwordElement.classList.add(
      "wrong-hit"
    );

    createWeakHunterParticles(
      passwordElement,
      "red"
    );

    showWeakHunterMessage(
      "Сильний пароль! Не чіпай його",
      "error"
    );

    loseWeakHunterLife();
  }

  window.setTimeout(() => {

    passwordElement.remove();

  }, 430);
}


/* =====================================================
   ПАРОЛЬ ЗНИК ІЗ ЕКРАНА
===================================================== */

function expireWeakHunterPassword(
  passwordElement,
  passwordData
) {

  if (
    !passwordElement ||
    !passwordElement.isConnected ||
    passwordElement.classList.contains(
      "destroyed"
    )
  ) {
    return;
  }

  passwordElement.classList.add(
    "expired"
  );

  /*
    Якщо слабкий пароль не натиснули,
    життя поки не забираємо.

    Це робить мінігру зрозумілішою:
    життя втрачається лише за помилковий
    клік на сильний пароль.
  */

  window.setTimeout(() => {

    passwordElement.remove();

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

  pulseWeakHunterCrystal("damage");

  const lifeCrystals =
    document.querySelectorAll(
      ".weak-hunter-life-crystal"
    );

  const lostCrystal =
    lifeCrystals[
      weakHunterState.lives
    ];

  if (lostCrystal) {

    lostCrystal.classList.add(
      "just-lost"
    );
  }

  if (weakHunterState.lives <= 0) {

    window.setTimeout(() => {

      failWeakHunter(
        "Усі кристали життя згасли."
      );

    }, 450);
  }
}


/* =====================================================
   ОНОВЛЕННЯ HUD
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
   РЕАКЦІЯ ЦЕНТРАЛЬНОГО КРИСТАЛА
===================================================== */

function pulseWeakHunterCrystal(type) {

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

  if (type === "damage") {

    crystal.classList.add(
      "weak-hunter-crystal-damage-hit"
    );

  } else {

    crystal.classList.add(
      "weak-hunter-crystal-success-hit"
    );
  }
}


/* =====================================================
   КОРОТКЕ ПОВІДОМЛЕННЯ
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

  message.textContent = text;

  message.className =
    `weak-hunter-message ${type} active`;

  window.setTimeout(() => {

    if (message) {

      message.classList.remove("active");
    }

  }, 850);
}


/* =====================================================
   ЧАСТИНКИ ПІСЛЯ КЛІКУ
===================================================== */

function createWeakHunterParticles(
  target,
  type = "gold"
) {

  const gameArea =
    document.getElementById(
      "weakHunterGameArea"
    );

  if (!gameArea || !target) return;

  const targetRect =
    target.getBoundingClientRect();

  const areaRect =
    gameArea.getBoundingClientRect();

  const centerX =
    targetRect.left -
    areaRect.left +
    targetRect.width / 2;

  const centerY =
    targetRect.top -
    areaRect.top +
    targetRect.height / 2;

  for (let index = 0; index < 9; index += 1) {

    const particle =
      document.createElement("span");

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

    gameArea.appendChild(particle);

    window.setTimeout(() => {

      particle.remove();

    }, 700);
  }
}


/* =====================================================
   ПЕРЕМОГА
===================================================== */

function completeWeakHunter() {

  if (weakHunterState.finished) return;

  weakHunterState.finished = true;
  weakHunterState.running = false;

  stopWeakHunterTimers();

  removeWeakHunterPasswords();

  playSound("correct");

  const crystal =
    document.getElementById(
      "weakHunterCenterCrystal"
    );

  const crystalGlow =
    document.getElementById(
      "weakHunterCrystalGlow"
    );

  if (crystal) {

    crystal.classList.add(
      "weak-hunter-final-crystal"
    );
  }

  if (crystalGlow) {

    crystalGlow.classList.add(
      "active"
    );
  }

  showWeakHunterEndOverlay({
    success: true,
    title: "Випробування пройдено!",
    text:
      "Ти знищив усі слабкі паролі та захистив Замок."
  });

  window.setTimeout(() => {

    completeMiniGame(
      weakHunterState.levelId,
      weakHunterState.taskIndex,
      "Слабкі паролі знищено!"
    );

  }, 2100);
}


/* =====================================================
   ПОРАЗКА
===================================================== */

function failWeakHunter(message) {

  if (weakHunterState.finished) return;

  weakHunterState.finished = true;
  weakHunterState.running = false;

  stopWeakHunterTimers();

  removeWeakHunterPasswords();

  playSound("wrong");

  const crystal =
    document.getElementById(
      "weakHunterCenterCrystal"
    );

  if (crystal) {

    crystal.classList.add(
      "weak-hunter-failed-crystal"
    );
  }

  showWeakHunterEndOverlay({
    success: false,
    title: "Спробуй ще раз",
    text:
      message ||
      "Цього разу Мордор виявився швидшим."
  });
}


/* =====================================================
   ФІНАЛЬНЕ ВІКНО
===================================================== */

function showWeakHunterEndOverlay({
  success,
  title,
  text
}) {

  const gameArea =
    document.getElementById(
      "weakHunterGameArea"
    );

  if (!gameArea) return;

  const overlay =
    document.createElement("div");

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
            <div class="weak-hunter-fanfare">
              Кристал Паролів сяє!
            </div>
          `
          : `
            <button
              type="button"
              class="btn weak-hunter-restart-button"
              onclick="restartWeakHunter()"
            >
              Почати заново
            </button>

            <button
              type="button"
              class="btn weak-hunter-challenges-button"
              onclick="leaveWeakHunter()"
            >
              До випробувань
            </button>
          `
      }

    </div>
  `;

  gameArea.appendChild(overlay);
}


/* =====================================================
   ПЕРЕЗАПУСК
===================================================== */

function restartWeakHunter() {

  playSound("click");

  startWeakHunterGame();
}


/* =====================================================
   ВИХІД ДО ЧОТИРЬОХ КНИГ
===================================================== */

function leaveWeakHunter() {

  const levelId =
    weakHunterState.levelId;

  cleanupWeakHunter();

  playSound("click");

  showLevel(levelId);

  openChallenge(levelId);
}


/* =====================================================
   ЗУПИНКА ТАЙМЕРІВ
===================================================== */

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

  weakHunterState.passwordTimeouts
    .forEach(timeoutId => {

      window.clearTimeout(timeoutId);
    });

  weakHunterState.passwordTimeouts = [];
}


/* =====================================================
   ПРИБИРАННЯ ПАРОЛІВ
===================================================== */

function removeWeakHunterPasswords() {

  document
    .querySelectorAll(
      ".weak-hunter-password"
    )
    .forEach(password => {

      password.classList.add("expired");

      window.setTimeout(() => {

        password.remove();

      }, 250);
    });
}


/* =====================================================
   ПОВНЕ ОЧИЩЕННЯ МІНІГРИ
===================================================== */

function cleanupWeakHunter() {

  stopWeakHunterTimers();

  weakHunterState.running = false;

  document
    .querySelectorAll(
      ".weak-hunter-password"
    )
    .forEach(password => {

      password.remove();
    });
}


/* =====================================================
   ВИПАДКОВЕ ЧИСЛО
===================================================== */

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
   3. МЕНЕДЖЕР КЛЮЧІВ
===================================================== */

let accountPasswords = {
  roblox: "",
  tiktok: "",
  personal: ""
};

let selectedAccount = null;

function openPasswordManager(levelId, taskIndex) {

  accountPasswords = {
    roblox: "",
    tiktok: "",
    personal: ""
  };

  selectedAccount = null;

  openModal(
    "Менеджер ключів",
    `
      <div class="task-instruction">
        Розподіли різні сильні паролі між трьома акаунтами.

        <br><br>

        Спочатку натисни на акаунт, а потім обери для нього пароль.
        Один пароль не можна використовувати всюди.
      </div>

      <div class="account-list">

        <button
          id="account-roblox"
          class="answer-btn"
          onclick="selectAccount('roblox', this)"
        >
          🎮 Roblox:
          <span id="password-roblox">пароль не обрано</span>
        </button>

        <button
          id="account-tiktok"
          class="answer-btn"
          onclick="selectAccount('tiktok', this)"
        >
          🎵 TikTok:
          <span id="password-tiktok">пароль не обрано</span>
        </button>

        <button
          id="account-personal"
          class="answer-btn"
          onclick="selectAccount('personal', this)"
        >
          👤 Особистий акаунт:
          <span id="password-personal">пароль не обрано</span>
        </button>

      </div>

      <h3>Ключі-паролі</h3>

      <div class="answer-grid">

        <button
          class="answer-btn"
          onclick="assignPassword('SuperNinja!2026')"
        >
          SuperNinja!2026
        </button>

        <button
          class="answer-btn"
          onclick="assignPassword('F0xita#Green77')"
        >
          F0xita#Green77
        </button>

        <button
          class="answer-btn"
          onclick="assignPassword('Lake_Truth!482')"
        >
          Lake_Truth!482
        </button>

        <button
          class="answer-btn"
          onclick="assignPassword('12345678')"
        >
          12345678
        </button>

      </div>

      <button
        class="btn"
        onclick="checkPasswordManager(${levelId}, ${taskIndex})"
      >
        Перевірити ключі
      </button>

      <div class="result-box" id="result"></div>
    `
  );
}

function selectAccount(account, button) {

  selectedAccount = account;

  document
    .querySelectorAll(".account-list .answer-btn")
    .forEach(item => {
      item.classList.remove("selected-answer");
    });

  button.classList.add("selected-answer");
}

function assignPassword(password) {

  const resultBox = document.getElementById("result");

  if (!selectedAccount) {

    playSound("wrong");

    resultBox.innerHTML =
      "Спочатку обери акаунт.";

    return;
  }

  accountPasswords[selectedAccount] = password;

  const passwordText =
    document.getElementById(
      "password-" + selectedAccount
    );

  if (passwordText) {
    passwordText.textContent = password;
  }

  resultBox.innerHTML =
    "Ключ додано до обраного акаунта.";
}

function checkPasswordManager(levelId, taskIndex) {

  const resultBox = document.getElementById("result");

  const passwords = Object.values(accountPasswords);

  const allSelected =
    passwords.every(password => password !== "");

  if (!allSelected) {

    playSound("wrong");

    resultBox.innerHTML =
      "❌ Додай пароль до кожного акаунта.";

    return;
  }

  if (passwords.includes("12345678")) {

    playSound("wrong");

    resultBox.innerHTML =
      "❌ Слабкий пароль 12345678 не можна використовувати.";

    return;
  }

  const uniquePasswords = new Set(passwords);

  if (uniquePasswords.size !== passwords.length) {

    playSound("wrong");

    resultBox.innerHTML = `
      ❌ Для різних акаунтів потрібно використовувати різні паролі.
    `;

    return;
  }

  completeMiniGame(
    levelId,
    taskIndex,
    "Усі акаунти отримали різні надійні ключі!"
  );
}


/* =====================================================
   4. СИНХРОННИЙ КЛЮЧ — 2FA
===================================================== */

let currentTwoFactorCode = "";
let twoFactorStagePassed = false;

function generateTwoFactorCode() {

  return String(
    Math.floor(100000 + Math.random() * 900000)
  );
}

function openTwoFactorTask(levelId, taskIndex) {

  currentTwoFactorCode = generateTwoFactorCode();
  twoFactorStagePassed = false;

  openModal(
    "Синхронний ключ",
    `
      <div class="task-instruction">
        Мордор намагається увійти до акаунта героя.

        <br><br>

        На смартфон надійшло сповіщення:
      </div>

      <div class="story-highlight">
        <p>
          🔔 Вхід із міста Готем
        </p>

        <p>
          Пристрій: невідомий комп’ютер
        </p>

        <p>
          Це ви?
        </p>
      </div>

      <button
        class="answer-btn"
        onclick="acceptUnknownLogin()"
      >
        ✅ Так, дозволити вхід
      </button>

      <button
        class="answer-btn"
        onclick="rejectUnknownLogin(${levelId}, ${taskIndex})"
      >
        ❌ Ні, заблокувати
      </button>

      <div class="result-box" id="result"></div>
    `
  );
}

function acceptUnknownLogin() {

  const resultBox = document.getElementById("result");

  playSound("wrong");

  resultBox.innerHTML = `
    ❌ Це був Мордор!

    <br><br>

    Не підтверджуй вхід, якщо ти його не здійснював.
  `;
}

function rejectUnknownLogin(levelId, taskIndex) {

  twoFactorStagePassed = true;

  const resultBox = document.getElementById("result");

  playSound("correct");

  resultBox.innerHTML = `
    ✅ Невідомий вхід заблоковано!

    <br><br>

    Для завершення захисту введи одноразовий код:

    <div
      style="
        margin:18px 0;
        font-size:30px;
        font-weight:900;
        letter-spacing:6px;
      "
    >
      ${currentTwoFactorCode}
    </div>

    <input
      id="twoFactorInput"
      class="hero-name-input"
      maxlength="6"
      inputmode="numeric"
      placeholder="Введи 6 цифр"
    >

    <br><br>

    <button
      class="btn"
      onclick="checkTwoFactorCode(${levelId}, ${taskIndex})"
    >
      Підтвердити код
    </button>
  `;
}

function checkTwoFactorCode(levelId, taskIndex) {

  const input =
    document.getElementById("twoFactorInput");

  const resultBox =
    document.getElementById("result");

  if (!twoFactorStagePassed || !input) return;

  if (input.value.trim() !== currentTwoFactorCode) {

    playSound("wrong");

    resultBox.innerHTML += `
      <p>
        ❌ Код неправильний. Перевір цифри та спробуй ще раз.
      </p>
    `;

    return;
  }

  completeMiniGame(
    levelId,
    taskIndex,
    "Двофакторний захист активовано!"
  );
}

/* =====================================================
   ПЕРЕВІРКА ВІДПОВІДІ
===================================================== */

function checkAnswer(levelId, taskIndex, answerIndex){

  const task = CHALLENGES[levelId][taskIndex];

  const resultBox = document.getElementById("result");

  if(answerIndex !== task.correct){

     playSound("wrong");

    resultBox.innerHTML =
      "❌ Спробуй ще раз. Подумай уважніше.";

    return;
  }

   playSound("correct");

  if(!completedTasks[levelId]){
    completedTasks[levelId] = [];
  }

  if(!completedTasks[levelId].includes(taskIndex)){
    completedTasks[levelId].push(taskIndex);
  }

  const progress = completedTasks[levelId].length * 25;

  if(progress >= 100){

    if(!completedLevels.includes(levelId)){
      completedLevels.push(levelId);
    }

    playSound("crystal");

    closeModal();

    openLevelReward(levelId);

    return;
  }

  resultBox.innerHTML = `
    ✅ Правильно! Кристал заряджено на ${progress}%.

    <br><br>

    <button
      class="btn"
      onclick="playSound('click'); closeModal(); openChallenge(${levelId})"
    >
      До наступного завдання
    </button>
  `;
}

/* =====================================================
   СУВІЙ ПІСЛЯ РІВНЯ
===================================================== */

function openLevelReward(levelId){

  const level = LEVELS.find(item => item.id === levelId);
  const mentor = MENTORS.find(item => item.id === level.mentorId);

  openModal(
    "Кристал заряджено!",
    `
      <div class="scroll-modal">

        <img
          class="scroll-artifact crystal-active"
          src="${level.crystalOn}"
          alt="${level.title}"
        >

        <h2>Вітаємо!</h2>

        <p>
          Ти успішно пройшов / пройшла рівень:
        </p>

        <p>
          <b>${level.title}</b>
        </p>

        <p>
          Наставник <b>${mentor.name}</b> передає тобі силу кристала.
        </p>

        <p style="color:${level.color}; font-weight:700;">
          Кристал заряджено на 100%.
        </p>

        <button
          class="btn"
          onclick="playSound('click'); closeModal(); showMap();"
        >
          Повернутись до карти
        </button>

      </div>
    `
  );
}


/* =====================================================
   ЦИТАДЕЛЬ ХАОСУ
===================================================== */

function citadelLocked(){

  openModal(
    "Цитадель ще закрита",
    `
      <p>
        Спочатку заряди всі П'ять Кристалів.
      </p>

      <p>
        Лише тоді шлях до Цитаделі Хаосу відкриється.
      </p>
    `
  );
}

function showCitadel(){

  app.innerHTML = `
    <section class="screen level-screen" ${bg(ASSETS.citadel)}>

      <button class="btn back-btn" onclick="playSound('click'); showMap()">
        ← До карти
      </button>

      <div class="level-actions">
        <button class="btn" onclick="playSound('click'); openFinalBattle()">
          Визволити Райфіка
        </button>
      </div>

    </section>
  `;
}

/* =====================================================
   ФІНАЛЬНА БИТВА
===================================================== */

function openFinalBattle(){

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
            Мордор ховається у Цитаделі Хаосу.
            Він намагається втримати Райфіка та силу Кристалів.
          </p>

          <p>
            Щоб зруйнувати Маску Обману, дай відповідь на фінальне питання.
          </p>

          <div class="task-instruction">
            Що робити, якщо отримав підозріле посилання?
          </div>

          <button class="answer-btn" onclick="winGame()">
            Перевірити відправника і не вводити пароль
          </button>

          <button class="answer-btn" onclick="finalWrong()">
            Одразу натиснути
          </button>

          <button class="answer-btn" onclick="finalWrong()">
            Ввести пароль
          </button>

          <div class="result-box" id="result"></div>

        </div>

      </div>
    `
  );
}

function finalWrong(){

  const resultBox = document.getElementById("result");

  // playSound("wrong");

  resultBox.innerHTML =
    "❌ Мордор майже тебе обманув. Спробуй ще раз.";
}

/* =====================================================
   ПЕРЕМОГА
===================================================== */

function winGame(){

   playSound("final");

  const resultBox = document.getElementById("result");

  resultBox.innerHTML = `
    ✅ Маску Обману зруйновано!

    <br><br>

    <button class="btn" onclick="showVictoryScreen()">
      Завершити гру
    </button>
  `;
}

function showVictoryScreen(){

  app.innerHTML = `
    <section class="screen" ${bg(ASSETS.map)}>

      <div class="victory-screen">

        <h1>🏆 Перемога!</h1>

        <p>
          Райфік врятований, а П'ять Кристалів знову
          захищають Королівство КіберЛегенд.
        </p>

        <p>
          Ти став / стала справжньою Легендою КіберБезпеки!
        </p>

        <button class="btn" onclick="playSound('click'); openAfterCredits()">
          Далі
        </button>

      </div>

    </section>
  `;
}

/* =====================================================
   СЦЕНА ПІСЛЯ ТИТРІВ
===================================================== */

function openAfterCredits(){

  openModal(
    "Сцена після титрів",
    `
      <p>
        Коли всі святкують перемогу, серед уламків трону
        залишається маленька фіолетова іскра.
      </p>

      <p>
        Вона поступово перетворюється на цифровий силует Мордора.
      </p>

      <p>
        І він тихо промовляє:
      </p>

      <div class="story-highlight">
        <p>
          “Ти переміг мене сьогодні...
        </p>

        <p>
          Але кіберзагрози ніколи не зникають назавжди.
        </p>

        <p>
          Ми ще зустрінемося, Герою...
        </p>

        <p>
          До наступної пригоди...”
        </p>
      </div>

      <p>
        <b>Кінець першого сезону.</b>
      </p>

      <button class="btn" onclick="playSound('click'); closeModal(); showStartScreen()">
        Нова пригода
      </button>
    `
  );
}

/* =====================================================
   ЗАПУСК ГРИ
===================================================== */

showStartScreen();
