"use strict";

var answer;
while (true) {
    var answer = prompt("Желаете пройти регистрацию на сайте?");
    if (answer == 'Да') {
        alert('Круто!');
        break;
    }
    else {
        alert('Попробуй ещё раз');
    }
}

var login = prompt("Введите логин");
if (login == 'Админ') {
    var password = prompt("Введите пароль.");
    if (password == 'Я главный') {
        alert('Здравствуйте!');
    }
    else {
        alert('Отменено');
    }
}
else {
    alert('Я вас не знаю.')
}

