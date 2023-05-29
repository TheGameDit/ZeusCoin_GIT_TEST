//! Слайдер для текста
import { arrowControls } from "/utils/slider.js";

//! Скрол навигации на странице
import { scrollNav } from "./utils/scrollNav.js";

//! Show or hide window reister or login
import { createWindow } from "./utils/createWindow.js";

// const header = document.querySelector(".header");
// const whiteSection = document.querySelectorAll(".white-sec, .purple-sec");

// const options = {
//    rootMargin: "86px",
//    threshold: 1,
// threshold: 0.875,
// };

// const observer = new IntersectionObserver(function (entries) {
// const header = document.querySelector(".header");
// const section = entries[0].target;
// const isWhiteSection = section.classList.contains("white-sec");
// console.log(isWhiteSection);
// if (entries[0].isIntersecting) {
//    if (isWhiteSection) {
//       header.style.backgroundColor = "purple";
//    } else {
//       header.style.backgroundColor = "white";
//    }
// }
//    if (entries[0].isIntersecting) {
//       header.classList.add("purple-sec");
//    } else {
//       header.classList.remove("purple-sec");
//    }
// }, options);

// whiteSection.forEach((sec) => observer.observe(sec));
//!---------------------------------------
//!---------------------------------------
//!---------------------------------------
//!---------------------------------------
//!---------------------------------------
//!---------------------------------------
//!---------------------------------------
//!---------------------------------------

const reg = document.querySelector(".button-register");
const log = document.querySelector(".button-join");

const overlay = document.querySelector(".overlay");
const bodySite = document.querySelector(".body-site");
const menuRegLog = document.querySelector(".menu-reg-log");

const windowTrash = document.querySelector(".trash-window");

//!Implimatation close window reg/log
function closeWindow() {
   document.addEventListener("keydown", function (e) {
      if (e.which === 27) {
         overlay.classList.add("hide");
         menuRegLog.classList.add("hide");
         windowTrash.classList.add("hide");
      }
   });

   overlay.addEventListener("click", function (e) {
      e.preventDefault();
      overlay.classList.add("hide");
      menuRegLog.classList.add("hide");
      windowTrash.classList.add("hide");
   });
}

let isFunctionCalled = false;
let localStorageUsers;

reg.addEventListener("click", function (e) {
   closeWindow();
   e.preventDefault();
   overlay.classList.remove("hide");
   menuRegLog.classList.remove("hide");
   menuRegLog.innerHTML = createWindow(
      "Регистрация",
      "input-reg-log",
      "input-reg-pass"
   );

   document.querySelector(".button-x").addEventListener("click", function (e) {
      e.preventDefault();

      const userLogin = document.querySelector(".input-reg-log").value;
      const userPassword = document.querySelector(".input-reg-pass").value;

      // function matchUser(userLog) {
      //    const localStorageUsers = JSON.parse(localStorage.getItem("users"));
      //    console.log(localStorageUsers);
      //    return localStorageUsers.some((el) => (el.email = userLog));
      // }
      localStorageUsers = JSON.parse(localStorage.getItem("users_obj")) || [];

      const errPass = document.querySelector(".error-pass");
      const errLog = document.querySelector(".error-log");
      let passError = userPassword.length < 2 ? "Пароль меньше 8 символов" : "";
      let logError = !userLogin.includes("@")
         ? "Вы не указали '@' в вашем email"
         : "";
      if (localStorageUsers.some((el) => el.email === userLogin)) {
         logError = "";
         passError = "Такой пользователь уже существует!";
      }

      errPass.textContent = passError;
      errLog.textContent = logError;
      if (passError === "" && logError === "") {
         localStorageUsers.push({
            email: userLogin,
            password: userPassword,
            trash: [],
         });
         localStorage.setItem("users_obj", JSON.stringify(localStorageUsers));
         overlay.classList.add("hide");
         menuRegLog.classList.add("hide");
      }
   });
});

let activeUser;

log.addEventListener("click", function (e) {
   e.preventDefault();
   closeWindow();
   overlay.classList.remove("hide");
   menuRegLog.classList.remove("hide");
   menuRegLog.innerHTML = createWindow(
      "Вход",
      "input-log-log",
      "input-log-pass"
   );

   document.querySelector(".button-x").addEventListener("click", function (e) {
      e.preventDefault();
      const userLogin = document.querySelector(".input-log-log").value;
      const userPass = document.querySelector(".input-log-pass").value;
      const errPass = document.querySelector(".error-pass");

      localStorageUsers = JSON.parse(localStorage.getItem("users_obj")) || [];
      activeUser = JSON.parse(localStorage.getItem("users_obj")).find(
         (user) => (user = user.email === userLogin)
      );

      createItemForTrash();

      const isValid = !JSON.parse(localStorage.getItem("users_obj")).some(
         (el) => {
            return el.email === userLogin && el.password === userPass;
         }
      );
      if (isValid) {
         errPass.textContent = "Вы ввели неверный логин или пароль";
      } else {
         const welcomeMessage = document.querySelector(".register-or-join");
         welcomeMessage.textContent = `Привет, ${userLogin}!`;
         errPass.textContent = "";
         overlay.classList.add("hide");
         menuRegLog.classList.add("hide");

         viewTrashBuyIcon();
         showTrashBuyWindow();

         isFunctionCalled = true;
         const existingErrorMessage =
            document.querySelectorAll(".error-message");
         if (existingErrorMessage) {
            existingErrorMessage.forEach((el) => {
               el.remove();
            });
         }
      }
   });
});

function viewTrashBuyIcon() {
   showValueTrashNum();
   const newButtonForTrashBuy = document.createElement("button");
   newButtonForTrashBuy.classList.add("button-trash");
   newButtonForTrashBuy.innerHTML = "&#128722;";
   document.querySelector(".wrapper-reg-log").appendChild(newButtonForTrashBuy);
   isFunctionCalled = true;
}

function showTrashBuyWindow() {
   document
      .querySelector(".button-trash")
      .addEventListener("click", function () {
         closeWindow();
         overlay.classList.remove("hide");
         const trashBuyWindow = document.createElement("div");
         trashBuyWindow.classList.add("trash-buy-window");
         bodySite.appendChild(trashBuyWindow);

         windowTrash.classList.remove("hide");
      });
}

function showValueTrashNum() {
   const trashValue = document.createElement("h3");
   trashValue.classList.add("trash-value");
   trashValue.textContent = activeUser.trash.length;
   console.log(trashValue);
   document.querySelector(".wrapper-reg-log").appendChild(trashValue);
}

//! Add to card
function addToCart() {
   const buttonsAddToCart = document.querySelectorAll(".add-to-cart");
   buttonsAddToCart.forEach((el) => {
      el.addEventListener("click", function () {
         if (isFunctionCalled) {
            const dataCoins = el.dataset.coins;
            switch (dataCoins) {
               case "100c":
                  activeUser.trash.push({
                     name: "ZeusCoin 100 монет",
                     price: 30,
                  });
                  break;
               case "500c":
                  activeUser.trash.push({
                     name: "ZeusCoin 500 монет",
                     price: 150,
                  });
                  break;
               case "1000c":
                  activeUser.trash.push({
                     name: "ZeusCoin 1000 монет",
                     price: 300,
                  });
                  break;
            }
            localStorageUsers.forEach((user, index) => {
               if (user.email === activeUser.email) {
                  localStorageUsers[index] = activeUser;
               }
            });
            localStorage.setItem(
               "users_obj",
               JSON.stringify(localStorageUsers)
            );
            showValueTrashNum();
            createItemForTrash();
         } else {
            errMessageCart();
         }
      });
   });
}
addToCart();

function createItemForTrash() {
   const userInLogin = JSON.parse(localStorage.getItem("users_obj")).find(
      (user) => user.email === activeUser.email
   );
   const wrapperP = document.querySelector(".wrapper-product");
   wrapperP.innerHTML = "";

   userInLogin.trash.forEach((item) => {
      const itemName = document.createElement("div");
      itemName.innerHTML = item.name;

      const itemPrice = document.createElement("div");
      itemPrice.innerHTML = `${item.price}$`;

      const itemContainer = document.createElement("div");
      itemContainer.classList.add("item-for-trash");
      itemContainer.appendChild(itemName);
      itemContainer.appendChild(itemPrice);

      wrapperP.appendChild(itemContainer);
   });
}

function errMessageCart() {
   const existingErrorMessage = document.querySelectorAll(".error-message");
   if (existingErrorMessage.length === 0) {
      const errMessageCart = document.createElement("h5");
      errMessageCart.textContent = "Авторизируйтесь!";
      errMessageCart.classList.add("error-message");
      errMessageCart.style.color = "red";

      document.querySelectorAll(".product").forEach((el) => {
         if (!isFunctionCalled) el.appendChild(errMessageCart.cloneNode(true));
      });
   } else {
      existingErrorMessage.forEach((el) => {
         el.remove();
      });
   }
}
