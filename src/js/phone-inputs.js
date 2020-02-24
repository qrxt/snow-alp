"use strict";

const phoneInputs = document
  .querySelectorAll("input[type=\"tel\"]");

const maskOptions = {
  mask: "+{7} ( 000 ) 000 - 00 - 00"
};

const maskPhoneNumberInput =
  input => new window.IMask(input, maskOptions);

phoneInputs
  .forEach(phoneInput => {
    maskPhoneNumberInput(phoneInput)
  });
