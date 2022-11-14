let captcha = document.querySelector(".captcha");
let captcha_content = document.querySelector(".captcha-content");
let captcha_title = document.querySelector(".captcha-title");
let reg_submit_btn = document.querySelector(".auth-btn");
let close_cross = document.querySelector(".close-cross");
let captcha_field = document.querySelector(".captcha-input");
let submit_captcha = document.querySelector(".captcha-confirm-btn");
let succsessfull_captcha = document.querySelector(".succsessfull-captcha");
let unsuccsessfull_captcha = document.querySelector(".unsuccsessfull-captcha");

var isTextCaptcha = true;
var first;
var second;

submit_captcha.addEventListener("click", () => {
    
    if (isTextCaptcha) {
        if (captcha_field.value == captcha_content.textContent) {
            captcha_title.textContent = `Успешно! Регистрация подтверждена.`;
            hideCaptcha();  
        } else {
            isTextCaptcha = false;
            captcha_title.textContent = `Вы ошиблись! Для продолжения введите ответ:`;
            first = Math.floor(Math.random() * 100);
            second = Math.floor(Math.random() * 100);
            captcha_content.textContent = generateExpressionCaptcha(first, second);
        }
    } else {
        if (first + second == parseInt(captcha_field.value)) {
            captcha_title.textContent = `Успешно! Регистрация подтверждена.`;
            hideCaptcha();
        } else {
            captcha_title.textContent = `Вы не справились! Попробуйте заново.`;
            hideCaptcha();
        }
    }
    
})


function hideCaptcha() {
    captcha_content.style.display = "none";
    captcha_field.style.display = "none";
    submit_captcha.style.display = "none";
}


reg_submit_btn.addEventListener("click", () => {
    captcha.style.display = "inline"
    captcha_content.style.display = "block"
    captcha_field.style.display = "block"
    submit_captcha.style.display = "block"
    captcha_title.textContent = `Для продолжения введите каптчу:`;
    captcha_content.textContent = generateTextCaptcha(8);
    isTextCaptcha = true;
})

close_cross.addEventListener("click", () => {
    captcha.style.display = "none"
})


function generateTextCaptcha(len) {
    let ABC = "AaBbCcDdEeFfGgHhIiJiKkLlMmNnJjPpQqRrSsTtUuVvWwXxYyZz";
    let result = '';
    while (result.length < len) {
        result += ABC[Math.floor(Math.random() * ABC.length)];
    }
        
  return result;
}


function generateExpressionCaptcha(first, second) {
    let result = '';
    result += first + '+' + second;
    return result;
}