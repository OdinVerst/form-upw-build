'use strict';

(function () {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    window.Backend = function () {
        this.xhr2 = new XMLHttpRequest();
        this.xhr2.responseType = 'json';
    };
    Backend.prototype.saveData = function(URL_SEND,data,onSuccess, onError){
        this.xhr2.addEventListener('load', function () {
            if (this.status === 200) {
                onSuccess(this.response);
            } else {
                onError('server status: ' + this.status + ' ' + this.statusText);
            }

        });
        this.xhr2.open('POST', URL_SEND, true);
        this.xhr2.send(data);
        console.log(data)
    };
})();
'use strict';
(function () {
    var connect = new window.Backend();
    var _url = 'https://intelligenthookah.com/serv.php';

    var sendForm = document.querySelector('.form__btn');

    var onSuccessDeliver = function(data){
        document.querySelector('.form__body').style.display = 'none';
        var msgSuccsess = document.createElement('div');
        msgSuccsess.classList.add('msg-ok');
        msgSuccsess.innerHTML = '<img src="img/success.png"><p>Your message send!</p>';
        document.querySelector('.form__content').appendChild(msgSuccsess);
    };

    var onFatalDeliver = function(data){
        console.log(data)
    };

    sendForm.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.validClass.checkEmpty(document.querySelectorAll('.required'));
        if(!grecaptcha.getResponse()){
            var err = document.createElement('div');
            err.classList.add('err-captcha');
            err.innerText = 'Captcha is empty!';
            document.querySelector('.capcha__wrap').appendChild(err);
            setTimeout(function () {
                document.querySelector('.capcha__wrap').removeChild(err);
            },1000);
        }else {
            if(window.validClass.checkEmpty(document.querySelectorAll('.required'))){
                if(window.validClass.checkEmail(document.querySelector('#email'))){
                    var data = {
                        name: document.querySelector('#name').value,
                        mail: document.querySelector('#email').value,
                        message: document.querySelector('#message').value
                    };
                    sendForm.innerHTML='<div class="windows8">\n' +
                        '<div class="wBall" id="wBall_1">\n' +
                        '<div class="wInnerBall"></div>\n' +
                        '</div>' +
                        '<div class="wBall" id="wBall_2">' +
                        '<div class="wInnerBall"></div>' +
                        '</div>' +
                        '<div class="wBall" id="wBall_3">\n' +
                        '<div class="wInnerBall"></div>\n' +
                        '</div>\n' +
                        '<div class="wBall" id="wBall_4">\n' +
                        '<div class="wInnerBall"></div>\n' +
                        '</div>\n' +
                        '<div class="wBall" id="wBall_5">\n' +
                        '<div class="wInnerBall"></div>\n' +
                        '</div>\n' +
                        '</div>';
                    sendForm.style.padding ='9px 37px';
                    sendForm.setAttribute('disabled','');
                    connect.saveData(_url, JSON.stringify(data), onSuccessDeliver, onFatalDeliver);
                }
            }
        }
    })
})();
'use strict';

(function () {

    var ValidData = function () {
        this.data = {};
    };

    ValidData.prototype.checkEmail = function (input) {
        var re = /\S+@\S+\.\S+/;
        // if (!input.value) {
        //     return this.msg.emptyMsg;
        // }
        if (!re.test(input.value)) {
            var err = document.createElement('div');
            err.classList.add('err-input');
            err.innerText = 'Error email!';
            input.parentElement.appendChild(err);
            setTimeout(function () {
                input.parentElement.removeChild(err);
            },1000);
            return false
        }
        return true;
    };
    ValidData.prototype.numberInput = function(){
        if (event.keyCode < 48 || event.keyCode > 57)
            event.returnValue= false;
    };
    ValidData.prototype.checkPhone = function(input){
        console.log(input);
        console.log(input.value);
        input.value = input.value.replace(/[^0-9]/g,"");
    };

    ValidData.prototype.checkEmpty = function (arrInput) {
        var checkVal = [];
        arrInput.forEach(function (item) {
            var allChildren = item.parentElement.children;

            if (!item.value) {
                for (var take = 0; take < allChildren.length; take++) {
                    if (allChildren[take].classList.contains('err-input')) {
                        console.log(allChildren[take]);
                        console.log(allChildren);
                        allChildren[take].remove();
                    }
                }

                var err = document.createElement('div');
                err.classList.add('err-input');
                err.innerText = 'Input is Empty!';
                item.parentElement.appendChild(err);
                setTimeout(function () {
                    item.parentElement.removeChild(err);
                },1000)

            } else if (item.parentElement.hasChildNodes()) {
                console.log(allChildren);
                for (var elem = 0; elem < allChildren.length; elem++) {
                    if (allChildren[elem].classList.contains('err-input')) {
                        console.log(allChildren[elem]);
                        console.log(allChildren);
                        allChildren[elem].remove();
                    }
                }
            }
        });
        arrInput.forEach(function (item) {
            if (!item.value) {
                checkVal.push(item);
            }
        });
        return !checkVal.length;
    };


    window.validClass = new ValidData();
})();
