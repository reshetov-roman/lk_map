class BonusClubCard {
    constructor(addToCard, mainCreatedButton, cardButton, buttonCancelForm, noMapImage, inputPhone, buttonFormDisabled, getInputSmsCode, buttonConfirmForm, hideForm, formSms, buttonSmsCancel,timer,resend ) {
        this.addToCard = document.querySelector(addToCard);
        this.mainCreatedButton = document.querySelector(mainCreatedButton);
        this.cardButton = document.querySelector(cardButton);
        this.buttonCancelForm = document.querySelector(buttonCancelForm);
        this.noMapImage = document.querySelector(noMapImage);
        this.inputPhone = document.querySelector(inputPhone);
        this.buttonFormDisabled = document.querySelector(buttonFormDisabled);
        this.getInputSmsCode = document.querySelector(getInputSmsCode);
        this.buttonConfirmForm = document.querySelector(buttonConfirmForm);
        this.hideForm = document.querySelector(hideForm);
        this.formSms = document.querySelector(formSms);
        this.buttonSmsCancel = document.querySelector(buttonSmsCancel);
        this.timer = document.getElementById(timer);
        this.resend = document.querySelector(resend);
    }
    cardCheck() {
        if(this.addToCard) {
            this.mainCreatedButton.style.display = 'none';
        }
    }
    ClickaddToCard() {
        this.cardButton.addEventListener('click', e => {
            const parent = e.target.closest('.page-card-wrapper');
                  parent.querySelector('.page-card-wrapper__card').classList.add('not-active');
                  parent.querySelector('.page-card-wrapper__card--form').classList.add('block');
            if(this.noMapImage) {
                this.noMapImage.remove();
            }
        });

        this.buttonCancelForm.addEventListener('click', () => { location.reload(); });
    }
    validPhoneForm() {
        this.inputPhone.addEventListener('input', e => {
            const length = e.target.value.length >= 17;
        
            if(length) {
                this.buttonFormDisabled.disabled = false;
                this.buttonFormDisabled.classList.add('active');
            }else {
                this.buttonFormDisabled.disabled = true;
                this.buttonFormDisabled.classList.remove('active');
            }
        });
    }
    validSmsForm() {
        this.getInputSmsCode.addEventListener('input', e => {
            const length = e.target.value.length == 4;
            
            if(length) {
                this.buttonConfirmForm.disabled = false;
                this.buttonConfirmForm.classList.add('active');
            }else {
                this.buttonConfirmForm.disabled = true;
                this.buttonConfirmForm.classList.remove('active');
            }
        });
    }
    buttonsForm() {
        this.buttonFormDisabled.addEventListener('click', () => {
    
            this.hideForm.classList.remove('block');
            this.formSms.classList.add('block');
            if(this.formSms.classList.contains('block')) smsTimer();
        });
        
        this.resend.addEventListener('click', () => {
            if(this.timerSecond !== 40) {
                this.timerSecond = 4;
                this.resend.disabled = true;
                this.resend.classList.remove('active');
                smsTimer();
            }
        });

        this.resend.disabled = true;
        this.timerSecond = 4;

        const th = this;

        function smsTimer() {
            const clearInteval = setInterval(() => {
                th.timer.innerHTML = th.timerSecond--;
                if(th.timerSecond === -1) { 
                    th.resend.classList.add('active');
                    th.resend.disabled = false;
                    clearInterval(clearInteval);
                }
            }, 1000);
        }


        this.buttonSmsCancel.addEventListener('click', () => {
            location.reload();
        });


    }
    
    phoneMask() {
        let eventCalllback = (e) => {
            let el = e.target,
            pattern = el.dataset.phonePattern,
            matrix_def = "+7(___) ___-__-__",
            matrix = pattern ? pattern : matrix_def,
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = e.target.value.replace(/\D/g, "");
            if (def.length >= val.length) val = def;
            e.target.value = matrix.replace(/./g,  (a) => {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
            });
        }
        let phone_inputs = document.querySelectorAll('[data-phone-pattern]');
        for (let elem of phone_inputs) {
            for (let ev of ['input', 'blur', 'focus']) {
                elem.addEventListener(ev, eventCalllback);
            }
        }
    
    }
    
}

const exampleBonusClubCard = new BonusClubCard(
    '.page-card-wrapper__add-to-cart',
    '.page-card-wrapper__card--button',
    '.page-card-wrapper__card--button',
    '.page-card-wrapper__card--form--cancel',
    '.page-card-wrapper__no-cart',
    '.page-card-wrapper__card--form--phone',
    '.page-card-wrapper__card--form--code',
    '.page-card-wrapper__card--sms--code',
    '.page-card-wrapper__card--sms--confirm',
    '.page-card-wrapper__card--form',
    '.page-card-wrapper__card--sms',
    '.page-card-wrapper__card--sms--cancel',
    'timer',
    '.page-card-wrapper__card--sms--resend'
);


exampleBonusClubCard.cardCheck();
exampleBonusClubCard.ClickaddToCard();
exampleBonusClubCard.validPhoneForm();
exampleBonusClubCard.validSmsForm();
exampleBonusClubCard.buttonsForm();
exampleBonusClubCard.phoneMask();









