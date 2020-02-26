"use strict";

const openCallbackPopupBtnSelector = ".about__string-link--callback";
const callbackPopupSelector = ".js-open-callback-modal";

const modal = new window.Modal(openCallbackPopupBtnSelector, callbackPopupSelector);

window.modal = modal;

modal.init();
