var notificationsAmount = 0;
var notificationBtn = document.querySelector('.notification-btn')
var notificationBtnBox = document.querySelector('.notification-btn-box')
var notificationBtnBadge = document.querySelector('.notification-btn-badge');
var notificationBtnContent = document.querySelector('.notification-btn-content');

updateNotificationButton();
var notificationTimerID = notificationInterval();

function notificationInterval() {
    return setInterval(sendNotification, 3000);
}

function sendNotification() {
    notificationsAmount++;
    createNewNotification();
    updateNotificationButton();
}

function createNewNotification() {
    let li_notification = document.createElement('li');
    li_notification.className = "notification";
    li_notification.innerHTML = "Уведомление " + notificationsAmount;
    notificationBtnContent.append(li_notification);
}

function updateNotificationButton() {
    notificationBtnBadge.textContent = notificationsAmount;
}


notificationBtnBox.addEventListener("click", function() {
    clearInterval(notificationTimerID);
    setTimeout(() => {notificationTimerID = notificationInterval();}, 10000);
	notificationBtn.classList.add('notification-btn-open-animation');
    notificationBtn.style.overflowY = "auto";
    notificationBtn.style.overflowX = "hidden";
});

notificationBtn.addEventListener("animationend", AnimationHandler_1, false);

function AnimationHandler_1() {
    notificationBtnBox.addEventListener("mouseleave", AnimationHandler, false);
}

function AnimationHandler () {
	notificationBtn.classList.remove('notification-btn-open-animation');
    notificationBtn.style.overflowY = "visible";
    notificationBtn.style.overflowX = "visible";
    notificationBtnBox.removeEventListener("mouseleave", AnimationHandler)
}
