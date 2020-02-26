"use strict";

const Modal = function (triggerBtnSelector, modalElementSelector) {
  this.triggerBtnSelector = triggerBtnSelector;
  this.modalElementSelector = modalElementSelector;
  this._modalElement = document
    .querySelector(this.modalElementSelector);
};

Modal.prototype.init = function () {
  const context = this;

  if (!this._modalElement) {
    return;
  }

  const modalCloseBtn = this._modalElement
    .querySelector('.modal__close-btn');

  const triggerBtns = document
    .querySelectorAll(this.triggerBtnSelector);

  triggerBtns
    .forEach(triggerBtn => {
      triggerBtn.addEventListener('click', evt => {
        evt.preventDefault();
        context.open();
      });
    });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      context.close();
    });
  }
};

const disableScroll = function () {
  window.scrollTo(0, 0);
};

Modal.prototype.open = function () {
  const context = this;
  const overlay = this._modalElement;
  const modal = this._modalElement.querySelector('.modal__modal');
  const onEscKeydown = function (evt) {
    if (evt.key === 'Escape') {
      context.close();
      document.removeEventListener('keydown', onEscKeydown);
    }
  };
  const onOverlayClick = function (evt) {
    evt.preventDefault();
    context.close();
  };

  if (overlay && modal) {
    this._modalElement.classList
      .add('modal--show');
    overlay.classList.add('overlay--show');

    modal.addEventListener('click', evt => {
      evt.stopPropagation();
    });
    document.addEventListener('keydown', onEscKeydown);
    overlay.addEventListener('click', onOverlayClick);

    const firstInput = modal.querySelector('input');

    if (firstInput) {
      firstInput.focus();
    }

    document.body.style.position = 'fixed';
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
    document.addEventListener('scroll', disableScroll);
  }
};

Modal.prototype.close = function () {
  this._modalElement.classList
    .remove('modal--show');

  document.body.style.position = 'static';
  document.body.style.height = 'auto';
  document.body.style.overflow = 'visible';
  document.removeEventListener('scroll', disableScroll);
};

if (!window.Modal) {
  window.Modal = Modal;
}
