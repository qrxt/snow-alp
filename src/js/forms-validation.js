"use strict";

const callbackForms = document
  .querySelectorAll(".js-callback-form");

if (callbackForms.length > 0) {
  callbackForms.forEach(form => {
    const submitBtn = form
      .querySelector(".js-callback-form-submit");

    if (!submitBtn) {
      return null;
    }

    submitBtn.addEventListener("click", () => {
      form.classList.add("form--invalid");
    });
  });
}
