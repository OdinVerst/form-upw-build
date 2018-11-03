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
    var _url = 'http://api.intelligenthookah.com/serv.php';

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhY2tlbmQuanMiLCJtYWluLmpzIiwidmFpbGQtY2xhc3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcbiAgICB3aW5kb3cuQmFja2VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy54aHIyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHRoaXMueGhyMi5yZXNwb25zZVR5cGUgPSAnanNvbic7XG4gICAgfTtcbiAgICBCYWNrZW5kLnByb3RvdHlwZS5zYXZlRGF0YSA9IGZ1bmN0aW9uKFVSTF9TRU5ELGRhdGEsb25TdWNjZXNzLCBvbkVycm9yKXtcbiAgICAgICAgdGhpcy54aHIyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgIG9uU3VjY2Vzcyh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb25FcnJvcignc2VydmVyIHN0YXR1czogJyArIHRoaXMuc3RhdHVzICsgJyAnICsgdGhpcy5zdGF0dXNUZXh0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy54aHIyLm9wZW4oJ1BPU1QnLCBVUkxfU0VORCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMueGhyMi5zZW5kKGRhdGEpO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgIH07XG59KSgpOyIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNvbm5lY3QgPSBuZXcgd2luZG93LkJhY2tlbmQoKTtcbiAgICB2YXIgX3VybCA9ICdodHRwOi8vYXBpLmludGVsbGlnZW50aG9va2FoLmNvbS9zZXJ2LnBocCc7XG5cbiAgICB2YXIgc2VuZEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybV9fYnRuJyk7XG5cbiAgICB2YXIgb25TdWNjZXNzRGVsaXZlciA9IGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybV9fYm9keScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHZhciBtc2dTdWNjc2VzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBtc2dTdWNjc2Vzcy5jbGFzc0xpc3QuYWRkKCdtc2ctb2snKTtcbiAgICAgICAgbXNnU3VjY3Nlc3MuaW5uZXJIVE1MID0gJzxpbWcgc3JjPVwiaW1nL3N1Y2Nlc3MucG5nXCI+PHA+WW91ciBtZXNzYWdlIHNlbmQhPC9wPic7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19jb250ZW50JykuYXBwZW5kQ2hpbGQobXNnU3VjY3Nlc3MpO1xuICAgIH07XG5cbiAgICB2YXIgb25GYXRhbERlbGl2ZXIgPSBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICB9O1xuXG4gICAgc2VuZEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB3aW5kb3cudmFsaWRDbGFzcy5jaGVja0VtcHR5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZXF1aXJlZCcpKTtcbiAgICAgICAgaWYoIWdyZWNhcHRjaGEuZ2V0UmVzcG9uc2UoKSl7XG4gICAgICAgICAgICB2YXIgZXJyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBlcnIuY2xhc3NMaXN0LmFkZCgnZXJyLWNhcHRjaGEnKTtcbiAgICAgICAgICAgIGVyci5pbm5lclRleHQgPSAnQ2FwdGNoYSBpcyBlbXB0eSEnO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcGNoYV9fd3JhcCcpLmFwcGVuZENoaWxkKGVycik7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FwY2hhX193cmFwJykucmVtb3ZlQ2hpbGQoZXJyKTtcbiAgICAgICAgICAgIH0sMTAwMCk7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGlmKHdpbmRvdy52YWxpZENsYXNzLmNoZWNrRW1wdHkoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlcXVpcmVkJykpKXtcbiAgICAgICAgICAgICAgICBpZih3aW5kb3cudmFsaWRDbGFzcy5jaGVja0VtYWlsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbWFpbCcpKSl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25hbWUnKS52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbWFpbCcpLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21lc3NhZ2UnKS52YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBzZW5kRm9ybS5pbm5lckhUTUw9JzxkaXYgY2xhc3M9XCJ3aW5kb3dzOFwiPlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ3QmFsbFwiIGlkPVwid0JhbGxfMVwiPlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ3SW5uZXJCYWxsXCI+PC9kaXY+XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIndCYWxsXCIgaWQ9XCJ3QmFsbF8yXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIndJbm5lckJhbGxcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwid0JhbGxcIiBpZD1cIndCYWxsXzNcIj5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwid0lubmVyQmFsbFwiPjwvZGl2PlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ3QmFsbFwiIGlkPVwid0JhbGxfNFwiPlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ3SW5uZXJCYWxsXCI+PC9kaXY+XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIndCYWxsXCIgaWQ9XCJ3QmFsbF81XCI+XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIndJbm5lckJhbGxcIj48L2Rpdj5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICBzZW5kRm9ybS5zdHlsZS5wYWRkaW5nID0nOXB4IDM3cHgnO1xuICAgICAgICAgICAgICAgICAgICBzZW5kRm9ybS5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywnJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Quc2F2ZURhdGEoX3VybCwgSlNPTi5zdHJpbmdpZnkoZGF0YSksIG9uU3VjY2Vzc0RlbGl2ZXIsIG9uRmF0YWxEZWxpdmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxufSkoKTsiLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgVmFsaWREYXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmRhdGEgPSB7fTtcbiAgICB9O1xuXG4gICAgVmFsaWREYXRhLnByb3RvdHlwZS5jaGVja0VtYWlsID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgIHZhciByZSA9IC9cXFMrQFxcUytcXC5cXFMrLztcbiAgICAgICAgLy8gaWYgKCFpbnB1dC52YWx1ZSkge1xuICAgICAgICAvLyAgICAgcmV0dXJuIHRoaXMubXNnLmVtcHR5TXNnO1xuICAgICAgICAvLyB9XG4gICAgICAgIGlmICghcmUudGVzdChpbnB1dC52YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhciBlcnIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGVyci5jbGFzc0xpc3QuYWRkKCdlcnItaW5wdXQnKTtcbiAgICAgICAgICAgIGVyci5pbm5lclRleHQgPSAnRXJyb3IgZW1haWwhJztcbiAgICAgICAgICAgIGlucHV0LnBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoZXJyKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlucHV0LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZXJyKTtcbiAgICAgICAgICAgIH0sMTAwMCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIFZhbGlkRGF0YS5wcm90b3R5cGUubnVtYmVySW5wdXQgPSBmdW5jdGlvbigpe1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA8IDQ4IHx8IGV2ZW50LmtleUNvZGUgPiA1NylcbiAgICAgICAgICAgIGV2ZW50LnJldHVyblZhbHVlPSBmYWxzZTtcbiAgICB9O1xuICAgIFZhbGlkRGF0YS5wcm90b3R5cGUuY2hlY2tQaG9uZSA9IGZ1bmN0aW9uKGlucHV0KXtcbiAgICAgICAgY29uc29sZS5sb2coaW5wdXQpO1xuICAgICAgICBjb25zb2xlLmxvZyhpbnB1dC52YWx1ZSk7XG4gICAgICAgIGlucHV0LnZhbHVlID0gaW5wdXQudmFsdWUucmVwbGFjZSgvW14wLTldL2csXCJcIik7XG4gICAgfTtcblxuICAgIFZhbGlkRGF0YS5wcm90b3R5cGUuY2hlY2tFbXB0eSA9IGZ1bmN0aW9uIChhcnJJbnB1dCkge1xuICAgICAgICB2YXIgY2hlY2tWYWwgPSBbXTtcbiAgICAgICAgYXJySW5wdXQuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgdmFyIGFsbENoaWxkcmVuID0gaXRlbS5wYXJlbnRFbGVtZW50LmNoaWxkcmVuO1xuXG4gICAgICAgICAgICBpZiAoIWl0ZW0udmFsdWUpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB0YWtlID0gMDsgdGFrZSA8IGFsbENoaWxkcmVuLmxlbmd0aDsgdGFrZSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhbGxDaGlsZHJlblt0YWtlXS5jbGFzc0xpc3QuY29udGFpbnMoJ2Vyci1pbnB1dCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhbGxDaGlsZHJlblt0YWtlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhbGxDaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxDaGlsZHJlblt0YWtlXS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBlcnIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBlcnIuY2xhc3NMaXN0LmFkZCgnZXJyLWlucHV0Jyk7XG4gICAgICAgICAgICAgICAgZXJyLmlubmVyVGV4dCA9ICdJbnB1dCBpcyBFbXB0eSEnO1xuICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChlcnIpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZXJyKTtcbiAgICAgICAgICAgICAgICB9LDEwMDApXG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5wYXJlbnRFbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFsbENoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBlbGVtID0gMDsgZWxlbSA8IGFsbENoaWxkcmVuLmxlbmd0aDsgZWxlbSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhbGxDaGlsZHJlbltlbGVtXS5jbGFzc0xpc3QuY29udGFpbnMoJ2Vyci1pbnB1dCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhbGxDaGlsZHJlbltlbGVtXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhbGxDaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxDaGlsZHJlbltlbGVtXS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGFycklucHV0LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIGlmICghaXRlbS52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGNoZWNrVmFsLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gIWNoZWNrVmFsLmxlbmd0aDtcbiAgICB9O1xuXG5cbiAgICB3aW5kb3cudmFsaWRDbGFzcyA9IG5ldyBWYWxpZERhdGEoKTtcbn0pKCk7Il19
