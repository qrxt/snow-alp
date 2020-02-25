"use strict";

const burgerBtn = document
  .querySelector(".burger-btn");
const menu = document
  .querySelector(".main-header__menu-wrapper");

if (burgerBtn && menu) {
  burgerBtn
    .addEventListener("click", () => {
      burgerBtn.classList
        .toggle("burger-btn--active");

      menu.classList
        .toggle("main-header__menu-wrapper--opened");
    });
}
