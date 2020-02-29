"use strict";

const openCallbackPopupBtnSelector = ".js-open-callback-modal";
const callbackPopupSelector = ".js-callback-modal";

const openCallbackSuccessPopupSelector = ".js-open-success-modal";
const callbackSuccessPopupSelector = ".js-callback-success-modal";

const callbackForms = document
  .querySelectorAll(".js-callback-form");

const callbackModal = new window.Modal(
  openCallbackPopupBtnSelector,
  callbackPopupSelector
);

callbackModal.init();

const callbackSuccessModal = new window.Modal(
  openCallbackSuccessPopupSelector,
  callbackSuccessPopupSelector
);

callbackSuccessModal.init();

if (callbackForms.length > 0) {
  callbackForms.forEach(form => {
    form.addEventListener("submit", evt => {
      evt.preventDefault();

      callbackModal.close();

      callbackSuccessModal.open();
    });
  });
}
