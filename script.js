/* =====================================================
  КОРОЛІВСТВО КІБЕРЛЕГЕНД — JAVASCRIPT v3
  Тут вся логіка гри:
  - стартовий екран
  - карта
  - вибір героя
  - рівні
  - Мордор
  - завдання
  - історії наставників
===================================================== */

const app = document.getElementById("app");

/* =====================================================
  1. УСІ КАРТИНКИ
===================================================== */

const ASSETS = {
  start: "https://i.postimg.cc/yNqvs4Lx/DFD0BD22-E458-4020-94E2-0E700F6C0A35.png",
  map: "https://i.postimg.cc/4Nm5cNM6/D51BF37C-3B26-4B2F-B003-1586F9F5ECF3.png",
  heroSelect: "https://i.postimg.cc/nzFKhHBX/2E85EFD6-BBAA-49C8-B8EF-56336A95C736.png",

  level1: "https://i.postimg.cc/6pCCV7hX/AF446C6D-3F3E-4914-81BA-F7441B63A4E4.png",
  level2: "https://i.postimg.cc/9Mg9XycL/6E996DFA-C827-43BD-AA70-A08D20A4F840.png",
  level3: "https://i.postimg.cc/Vk9brxYR/9B78E35A-6157-4128-8B15-8531447BDA6A.png",
  level4: "https://i.postimg.cc/667c2pFd/8A287455-114C-4FEE-BC9D-064668C5BA5D.png",
  level5: "https://i.postimg.cc/YqK6vf18/FB40A4BD-0988-4FBD-8256-C86AD241B043.png",
  mordor: "https://i.postimg.cc/d0KpnyPS/201001D0-1E32-4D2D-A28C-A69ADF0F5914.png",

  boy: "https://i.postimg.cc/hPBmD4BH/2DE1C8A1-160E-4000-932C-6961E1E58F6A.png",
  girl: "https://i.postimg.cc/02nz9pZM/A3703B9F-2B57-4D7B-8C53-3D605D2AD79E.png",

  totus: "https://i.postimg.cc/mDgd63Xx/AC7DED94-C121-44FA-A2E1-1E4877C53F6C.png",
  foxita: "https://i.postimg.cc/hv71H2Vx/7452F87E-1C36-4266-BF76-EA7593B00D84.png",
  nereus: "https://i.postimg.cc/15wLFHbc/A8BCA949-D4F3-477D-8D61-C0B91EAFAB5C.png",
  anubisa: "https://i.postimg.cc/05J3gnkC/56395AD2-D3DE-4743-AC15-53177BEB6888.png",
  dragon: "https://i.postimg.cc/W43W56Y7/FB663721-574D-45B9-8EE5-DF77ADA9C5F1.png",
  lord: "https://i.postimg.cc/sfSnH2mb/849A55BC-537D-4634-A842-B952DC45C112.png",

  cardTotus: "https://i.postimg.cc/qRGNgy4d/73C069BE-EAEA-4C33-ADBD-0B435B043BAD.png",
  cardFoxita: "https://i.postimg.cc/BvBSC3yB/1C8AE7F7-4CD2-4A04-9000-A80A723571C2.png",
  cardNereus: "https://i.postimg.cc/d1SKWV9s/EC540D92-952F-40B4-A480-A95EBC8B4CFE.png",
  cardAnubisa: "https://i.postimg.cc/2yBg2Fyp/EC7EC6F3-1D48-46AC-B2B8-05A305EC0BEA.png",
  cardDragon: "https://i.postimg.cc/6379xZqb/1F115E88-1D0B-4CC8-849D-CB6F8019E04D.png",
  cardLord: "https://i.postimg.cc/85rV0VXM/86A412C7-EF4E-461B-800C-1C54350CAC2B.png"
};

/* =====================================================
  2. СТАН ГРИ
===================================================== */

let selectedHeroType = "boy";
let selectedHeroName = "";
let completedTasks = {};

/* =====================================================
  3. ДАНІ РІВНІВ
===================================================== */

const LEVELS = [
  {
    id: 1,
    title: "Замок Паролів",
    bg: ASSETS.level1,
    mentorName: "Тотус",
    mentor: ASSETS.totus,
    card: ASSETS.cardTotus,
    artifact: "книгу",
    story: [
      "Тотус — хранитель Замку Паролів.",
      "Він охороняє Жовтий Кристал Знань.",
      "Тотус навчає створювати сильні паролі.",
      "Він пояснює, чому не можна ділитися паролями.",
      "Його сила — мудрість, уважність і терпіння."
    ]
  },
  {
    id: 2,
    title: "Ліс Приманок",
    bg: ASSETS.level2,
    mentorName: "Фоксіта",
    mentor: ASSETS.foxita,
    card: ASSETS.cardFoxita,
    artifact: "лупу",
    story: [
      "Фоксіта — детектив Лісу Приманок.",
      "Вона знаходить фішингові пастки.",
      "Її лупа допомагає перевіряти посилання.",
      "Фоксіта навчає бути уважним до деталей.",
      "Її сила — швидкість, логіка і спостережливість."
    ]
  },
  {
    id: 3,
    title: "Озеро Фейків",
    bg: ASSETS.level3,
    mentorName: "Нереус",
    mentor: ASSETS.nereus,
    card: ASSETS.cardNereus,
    artifact: "дзеркало",
    story: [
      "Нереус — хранитель Озера Фейків.",
      "Він охороняє Дзеркало Правди.",
      "Нереус навчає перевіряти інформацію.",
      "Його сила — спокій, мудрість і фактчекінг."
    ]
  },
  {
    id: 4,
    title: "Печера Даних",
    bg: ASSETS.level4,
    mentorName: "Анубіса",
    mentor: ASSETS.anubisa,
    card: ASSETS.cardAnubisa,
    artifact: "сферу даних",
    story: [
      "Анубіса — хранителька Печери Даних.",
      "Вона береже Сферу Даних.",
      "Анубіса навчає захищати особисту інформацію.",
      "Її сила — обережність і захист приватності."
    ]
  },
  {
    id: 5,
    title: "Фортеця Вірусів",
    bg: ASSETS.level5,
    mentorName: "Вірон",
    mentor: ASSETS.dragon,
    card: ASSETS.cardDragon,
    artifact: "меч",
    story: [
      "Вірон — дракон-захисник Фортеці Вірусів.",
      "Він охороняє Меч Кіберзахисту.",
      "Вірон навчає не відкривати підозрілі файли.",
      "Його сила — сміливість і захист."
    ]
  }
];

/* =====================================================
  4. СТАРТОВИЙ ЕКРАН
===================================================== */

function showStartScreen() {
  app.innerHTML = `
    <section class="screen" style="background-image:url('${ASSETS.start}')">
      <div class="main-menu">
        <button class="btn" onclick="showMap()">Почати пригоду</button>
        <button class="btn" onclick="openGameStory()">Історія</button>
        <button class="btn" onclick="openSettings()">Налаштування</button>
      </div>
    </section>
  `;
}

/* =====================================================
  5. КАРТА
  Кліки стоять НЕ на наставниках, а на табличках рівнів.
===================================================== */

function showMap() {
  app.innerHTML = `
    <section class="screen" style="background-image:url('${ASSETS.map}')">

      <button class="btn back-btn" onclick="showStartScreen()">← Назад</button>
      <button class="btn create-hero-btn" onclick="showHeroSelect()">Створити героя</button>

      <div class="map-point" style="left:5%; bottom:19%; width:25%; height:9%;" onclick="showLevel(1)"></div>
      <div class="map-point" style="left:43%; bottom:27%; width:25%; height:9%;" onclick="showLevel(2)"></div>
      <div class="map-point" style="right:3%; bottom:39%; width:25%; height:9%;" onclick="showLevel(3)"></div>
      <div class="map-point" style="left:9%; top:27%; width:25%; height:9%;" onclick="showLevel(4)"></div>
      <div class="map-point" style="right:7%; top:25%; width:27%; height:9%;" onclick="showLevel(5)"></div>

      <div class="map-point" style="right:7%; top:7%; width:24%; height:9%;" onclick="showMordor()"></div>

    </section>
  `;
}

/* =====================================================
  6. ВИБІР ГЕРОЯ
===================================================== */

function showHeroSelect() {
  const preview = selectedHeroType === "girl" ? ASSETS.girl : ASSETS.boy;

  app.innerHTML = `
    <section class="screen" style="background-image:url('${ASSETS.heroSelect}')">
      <button class="btn back-btn" onclick="showMap()">← Назад</button>

      <img class="hero-choice hero-boy" src="${ASSETS.boy}" onclick="chooseHero('boy')" />
      <img class="hero-choice hero-girl" src="${ASSETS.girl}" onclick="chooseHero('girl')" />

      <img class="selected-preview" id="heroPreview" src="${preview}" />

      <input
        id="heroNameInput"
        class="hero-name-input"
        type="text"
        placeholder="Введи ім’я героя"
        value="${selectedHeroName}"
      />

      <button class="btn create-final-btn" onclick="createHero()">Створити героя</button>
    </section>
  `;
}

function chooseHero(type) {
  selectedHeroType = type;
  document.getElementById("heroPreview").src =
    type === "girl" ? ASSETS.girl : ASSETS.boy;
}

function createHero() {
  const input = document.getElementById("heroNameInput");
  selectedHeroName = input.value.trim();

  if (!selectedHeroName) {
    openSimpleModal("Введи ім’я героя", "Спочатку напиши ім’я героя.");
    return;
  }

  openSimpleModal(
    "Героя створено!",
    `Герой ${selectedHeroName} готовий до пригоди.`
  );
}

/* =====================================================
  7. РІВЕНЬ
===================================================== */

function showLevel(levelId) {
  const level = LEVELS.find(item => item.id === levelId);

  app.innerHTML = `
    <section class="screen" style="background-image:url('${level.bg}')">
      <button class="btn back-btn" onclick="showMap()">← До карти</button>

      <div class="mentor-zone" onclick="openMentorStory(${level.id})"></div>
      <div class="notes-zone" onclick="openNotes(${level.id})"></div>

      <div class="artifact artifact-1" onclick="openTask(${level.id}, 1)"></div>
      <div class="artifact artifact-2" onclick="openTask(${level.id}, 2)"></div>
      <div class="artifact artifact-3" onclick="openTask(${level.id}, 3)"></div>
      <div class="artifact artifact-4" onclick="openTask(${level.id}, 4)"></div>
    </section>
  `;
}

/* =====================================================
  8. МОРДОР
===================================================== */

function showMordor() {
  app.innerHTML = `
    <section class="screen" style="background-image:url('${ASSETS.mordor}')">
      <button class="btn back-btn" onclick="showMap()">← До карти</button>
      <button class="btn create-hero-btn" onclick="openLordBattle()">Фінальна битва</button>
    </section>
  `;
}

/* =====================================================
  9. ЗАВДАННЯ
===================================================== */

function openTask(levelId, taskNumber) {
  const level = LEVELS.find(item => item.id === levelId);
  const key = `level-${levelId}`;

  app.innerHTML += `
    <div class="modal-bg" id="modal">
      <div class="modal">
        <div class="close-modal" onclick="closeModal()">×</div>

        <img src="${level.mentor}" alt="${level.mentorName}" />

        <div class="modal-content">
          <h2>${level.mentorName}: завдання ${taskNumber}</h2>

          <p>
            Ти обрав ${level.artifact}. Тут буде завдання цього рівня.
          </p>

          <p><b>Питання:</b> тут буде текст завдання.</p>

          <button class="answer-btn" onclick="correctAnswer('${key}', ${taskNumber})">Правильна відповідь</button>
          <button class="answer-btn" onclick="wrongAnswer()">Неправильна відповідь</button>
          <button class="answer-btn" onclick="wrongAnswer()">Неправильна відповідь</button>

          <p id="result"></p>
        </div>
      </div>
    </div>
  `;
}

function correctAnswer(levelKey, taskNumber) {
  if (!completedTasks[levelKey]) {
    completedTasks[levelKey] = [];
  }

  if (!completedTasks[levelKey].includes(taskNumber)) {
    completedTasks[levelKey].push(taskNumber);
  }

  const progress = completedTasks[levelKey].length * 25;

  document.getElementById("result").innerHTML =
    `✅ Правильно! Кристал наповнився на ${progress}%.`;
}

function wrongAnswer() {
  document.getElementById("result").innerHTML =
    "❌ Спробуй ще раз. Подумай уважніше.";
}

/* =====================================================
  10. ІСТОРІЯ НАСТАВНИКА
===================================================== */

function openMentorStory(levelId) {
  const level = LEVELS.find(item => item.id === levelId);

  app.innerHTML += `
    <div class="modal-bg" id="modal">
      <div class="modal">
        <div class="close-modal" onclick="closeModal()">×</div>

        <img src="${level.card}" alt="${level.mentorName}" />

        <div class="modal-content">
          <h2>Історія наставника: ${level.mentorName}</h2>
          <ol>
            ${level.story.map(item => `<li>${item}</li>`).join("")}
          </ol>
        </div>
      </div>
    </div>
  `;
}

/* =====================================================
  11. НОТАТКИ НАСТАВНИКА
===================================================== */

function openNotes(levelId) {
  const level = LEVELS.find(item => item.id === levelId);

  openSimpleModal(
    "Нотатки наставника",
    `Тут будуть нотатки для рівня "${level.title}".`
  );
}

/* =====================================================
  12. ДОДАТКОВІ МОДАЛКИ
===================================================== */

function openGameStory() {
  openSimpleModal(
    "Історія Королівства КіберЛегенд",
    "Лорд Мордор відкрив Портал Тіней. Герой має пройти 5 рівнів, зібрати артефакти наставників і перемогти темряву."
  );
}

function openSettings() {
  openSimpleModal(
    "Налаштування",
    "Тут пізніше можна додати звук, музику, мову та підказки."
  );
}

function openLordBattle() {
  app.innerHTML += `
    <div class="modal-bg" id="modal">
      <div class="modal">
        <div class="close-modal" onclick="closeModal()">×</div>
        <img src="${ASSETS.lord}" alt="Лорд Мордор" />
        <div class="modal-content">
          <h2>Лорд Мордор</h2>
          <p>Фінальна битва ще готується.</p>
        </div>
      </div>
    </div>
  `;
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

/* =====================================================
  13. СТАРТ ГРИ
===================================================== */

showStartScreen();
