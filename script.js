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
    crystalOff: ASSETS.yellowOff,
    crystalOn: ASSETS.yellowOn,
    color: "#ffd54a",
    x: 42,
    y: 69
  },
  {
    id: 2,
    title: "Ліс Приманок",
    mentorId: 2,
    bg: ASSETS.level2,
    medal: ASSETS.medalFoxita,
    crystalOff: ASSETS.greenOff,
    crystalOn: ASSETS.greenOn,
    color: "#42e66f",
    x: 38,
    y: 54
  },
  {
    id: 3,
    title: "Озеро Фейків",
    mentorId: 3,
    bg: ASSETS.level3,
    medal: ASSETS.medalNereus,
    crystalOff: ASSETS.blueOff,
    crystalOn: ASSETS.blueOn,
    color: "#39b7ff",
    x: 56,
    y: 39
  },
  {
    id: 4,
    title: "Печера Даних",
    mentorId: 4,
    bg: ASSETS.level4,
    medal: ASSETS.medalAnubisa,
    crystalOff: ASSETS.pinkOff,
    crystalOn: ASSETS.pinkOn,
    color: "#ff78d7",
    x: 53,
    y: 44
  },
  {
    id: 5,
    title: "Фортеця Захисту",
    mentorId: 5,
    bg: ASSETS.level5,
    medal: ASSETS.medalTifon,
    crystalOff: ASSETS.redOff,
    crystalOn: ASSETS.redOn,
    color: "#ff4a35",
    x: 67,
    y: 44
  }
];

const CITADEL = {
  title: "Цитадель Хаосу",
  crystalOff: ASSETS.purpleOff,
  crystalOn: ASSETS.purpleOn,
  medal: ASSETS.medalMordor,
  x: 78,
  y: 34
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

  const rows = LEVELS.map(level => {
    const done = completedLevels.includes(level.id);

    return `
      <div class="crystal-row ${done ? "active" : ""}" style="color:${level.color}">
        <img
          src="${done ? level.crystalOn : level.crystalOff}"
          alt="${level.title}"
        >
        <span>${level.title}</span>
      </div>
    `;
  }).join("");

  const allDone = completedLevels.length >= 5;

  return `
    <div class="crystal-panel">
      <div class="crystal-panel-title">
        Зарядження кристалів
      </div>

      ${rows}

      <div class="crystal-row ${allDone ? "active" : ""}" style="color:#b95cff">
        <img
          src="${allDone ? ASSETS.purpleOn : ASSETS.purpleOff}"
          alt="Цитадель Хаосу"
        >
        <span>Цитадель Хаосу</span>
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

const CHALLENGES = {
  1: [
    {
      title: "Знайди сильний пароль",
      icon: ASSETS.yellowOn,
      question: "Який пароль найнадійніший?",
      answers: [
        "123456",
        "qwerty",
        "Kiber!2026_Legend"
      ],
      correct: 2
    },
    {
      title: "Парольний секрет",
      icon: ASSETS.yellowOn,
      question: "Чи можна ділитися паролем з другом?",
      answers: [
        "Так",
        "Ні",
        "Тільки один раз"
      ],
      correct: 1
    },
    {
      title: "Додатковий щит",
      icon: ASSETS.yellowOn,
      question: "Що краще захищає акаунт?",
      answers: [
        "Один пароль для всіх сайтів",
        "Двофакторна автентифікація",
        "Пароль у нотатках"
      ],
      correct: 1
    },
    {
      title: "Слабке місце",
      icon: ASSETS.yellowOn,
      question: "Що не варто використовувати як пароль?",
      answers: [
        "Ім’я і дату народження",
        "Довгу фразу",
        "Символи та цифри"
      ],
      correct: 0
    }
  ],

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

function openChallenge(levelId){

  const level = LEVELS.find(item => item.id === levelId);
  const tasks = CHALLENGES[levelId];
  const done = completedTasks[levelId] || [];

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
            <img src="${task.icon}" alt="${task.title}">

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

function openTask(levelId, taskIndex){

  const task = CHALLENGES[levelId][taskIndex];

  closeModal();

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
   ПЕРЕВІРКА ВІДПОВІДІ
===================================================== */

function checkAnswer(levelId, taskIndex, answerIndex){

  const task = CHALLENGES[levelId][taskIndex];

  const resultBox = document.getElementById("result");

  if(answerIndex !== task.correct){

    // playSound("wrong");

    resultBox.innerHTML =
      "❌ Спробуй ще раз. Подумай уважніше.";

    return;
  }

  // playSound("correct");

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

  // playSound("final");

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
