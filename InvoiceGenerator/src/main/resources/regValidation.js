var app = angular.module('regForm', []);

app.controller('Validation', Validation);

function Validation() {
    this.enter = function () {
        if (localStorage.getItem(this.email1).length > 0) {
            let obj = JSON.parse(localStorage.getItem(this.email1));
            if(this.psw1 === obj.psw)
                document.location.replace('userPage.html');
            else
                alert('Email or password is incorrect');
        } else {
            alert('Email or password is incorrect');
        }
    }

    this.reg = function () {
        let i = 1;
        let msg = '';
        const letter = /[a-zA-Z]/;
        const number = /[0-9]/;
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let val = re.test(String(this.email).toLowerCase())
        let psw1 = letter.test(this.psw)
        let psw2 = number.test(this.psw)
        if(!val){
            msg = msg + i.toString() + '. Email is incorrect\n';
            i++;
        }
        if(this.psw.length < 8 || !psw1 || !psw2) {
            msg = msg + i.toString() + '. Passwords is not correct\n';
            i++;
        }else {
            if (this.psw !== this.confpsw) {
                msg = msg + i.toString() + '. Passwords are not equals\n';
                i++;
            }
        }
        if(!this.conf){
            msg = msg + i.toString() + '. You are not agree with smth';
        }

        if(i !== 1){
            alert(msg);
        } else {
            let obj = {"login": this.email, "psw": this.psw};
            if(localStorage.getItem(this.email).length > 0){
                alert('This email is already used');
            }else {
                localStorage.setItem(this.email, JSON.stringify(obj));
                document.location.replace('userPage.html');
            }
        }
    }
}