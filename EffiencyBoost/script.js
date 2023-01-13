/*** const for createUtilsAndCalls ***/
const utilsCopy = document.querySelector(".utilsCopy");
const utilsCopyBtn = document.querySelector(".utilsCopyBtn");
const callsCopy = document.querySelector(".callsCopy");

/*** const for createRightMenu ***/
const callsCopyContainer = document.getElementById("callsCopyContainer");
const callsCopyBtn = document.getElementById("callsCopyBtn");
const main = document.querySelector("main");

/*** const for createPlaceholderBtn ***/
const checkboxListContainer = document.getElementById(
  "placeholderCheckboxList"
);

/*** const for Reset ***/
const resetBtn = document.getElementById("resetSave");

let utilsData = [
  {
    name: `align-items: center; <hr> justify-content: center;`,
    id: "flexAlignCenterJustifCenter",
    call: "@extend %flex-alignCenter-justifCenter;",
    property: `%flex-alignCenter-justifCenter {
            display: flex;
            align-items: center;
            justify-content: center;
        }`,
  },
  {
    name: `align-items: center;`,
    id: "flexAlignCenter",
    call: "@extend %flex-alignCenter;",
    property: `%flex-alignCenter {
            display: flex;
            align-items: center;
        }`,
  },
  {
    name: `justify-content: center;`,
    id: "flexJustifCenter",
    call: "@extend %flex-justifCenter;",
    property: `%flex-justifCenter {
            display: flex;
            justify-content: center;
          }`,
  },
  {
    name: `align-items: center; <hr> justify-content:space-between;`,
    id: "flexAlignCenterJustifBetw",
    call: "@extend %flex-alignCenter-justifCenter;",
    property: `%flex-alignCenter-justifBetw {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }`,
  },
  {
    name: `align-items: center; <hr> justify-content:space-around;`,
    id: "flexAlignCenterJustifArou",
    call: "@extend %flex-alignCenter-justifCenter;",
    property: `%flex-alignCenter-justifArou {
            display: flex;
            align-items: center;
            justify-content: space-around;
          }`,
  },
];

function createPlaceholderBtn() {
  function removePlaceholderBtn(utilId) {
    let cross = document.getElementById("cross" + utilId);

    cross.addEventListener("click", () => {
      for (let i = 0; i < utilsData.length; i++) {
        if (utilsData[i].id === utilId) {
          utilsData.splice(i, 1);
          createPlaceholderBtn();
        }
      }
    });
  }

  checkboxListContainer.innerHTML = "";

  utilsData.map((util) => {
    checkboxListContainer.innerHTML += `<input type="checkbox" id="${util.id}" />
        <label for="${util.id}" class="checkbox-btn">${util.name}<button class="small-btn cross-btn" id="cross${util.id}">X</button></label>
        `;

    setTimeout(() => {
      removePlaceholderBtn(util.id);
    }, 100);
  });

  utilsDataSave();
}

function createUtilsAndCalls() {
  function utilsCopyButton() {
    utilsCopyBtn.addEventListener("click", () => {
      let text = utilsCopy.innerHTML;
      let textArea = document.createElement("textarea");

      textArea.value = text
        .replace(/<pre>/g, "")
        .replace(/<\/pre>/g, "")
        .replace(/<br>/g, "\n \n")
        .trim(); // remove <pre>, </pre> and change <br> to two space

      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    });
  }

  function callsCopyButton(utilId) {
    let btn = document.getElementById("btn" + utilId);
    let text = document.getElementById("call" + utilId);

    btn.addEventListener("click", () => {
      text.select();
      document.execCommand("copy");
    });
  }

  sassForm.addEventListener("submit", (e) => {
    e.preventDefault();
    utilsCopy.innerHTML =
      "<pre> /******************************  Placeholders  ******************************/ </pre> <br>";
    callsCopy.innerHTML = "";

    let inputsList = document.querySelectorAll('[type="checkbox"]');

    inputsList.forEach((input) => {
      if (input.checked) {
        utilsData.map((util) => {
          if (input.id == util.id) {
            utilsCopy.innerHTML += `<pre> ${util.property} </pre> <br>`;
            callsCopy.innerHTML += `<input type="text" id="call${util.id}" value="${util.call}" class="calls" readonly>
                    <button id="btn${util.id}" class="small-btn">Copier</button>`;

            setTimeout(() => {
              callsCopyButton(util.id);
            }, 100);
          }
        });
      }
    });
  });

  utilsCopyButton();
}

function createRightMenu() {
  callsCopyBtn.addEventListener("click", () => {
    callsCopyContainer.classList.toggle("callsCopy-container-open");
    callsCopyContainer.style.height = `${document.body.offsetHeight}px`;
    callsCopyBtn.classList.toggle("callsCopy-btn-open");
    main.classList.toggle("main-callsCopyOpen");
  });
  main.addEventListener("click", () => {
    callsCopyContainer.classList.remove("callsCopy-container-open");
    callsCopyBtn.classList.remove("callsCopy-btn-open");
    main.classList.remove("main-callsCopyOpen");
  });
}

function addNewPlaceholderBtn() {
  newPlaceholder.addEventListener("submit", (e) => {
    e.preventDefault();
    let PHname = newPlaceholderName.value;
    let PHproperty = newPlaceholderProperty.value
      .replace(/\n/g, "\n          ")
      .replace(/^/g, "  ");
    let PHid = PHname.replace(/-/g, "");
    newPlaceholderName.value = "";
    newPlaceholderProperty.value = "";

    utilsData.push({
      name: PHname,
      id: PHid,
      call: `@extend %${PHname};`,
      property: `%${PHname} {
        ${PHproperty}
        }`,
    });

    createPlaceholderBtn();
  });
}

function utilsDataSave() {
  localStorage.setItem("utilsData", JSON.stringify(utilsData));
}

function resetAll() {
  resetBtn.addEventListener("click", () => {
    localStorage.removeItem("utilsData");
    location.reload();
  });
}

if (window.localStorage.utilsData != undefined) {
  utilsData = JSON.parse(localStorage.getItem("utilsData"));
}

createPlaceholderBtn();
createUtilsAndCalls();
createRightMenu();
addNewPlaceholderBtn();
resetAll();
