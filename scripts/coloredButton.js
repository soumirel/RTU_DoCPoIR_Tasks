
let btn = document.querySelector('.btn-reg');


btn.addEventListener('click', () => {
    if (!btn.classList.contains('active')) {
        btn.classList.add('active');
        $('body').on('mousemove', draw);

        
    } else {
        btn.classList.remove('active');
        $('body').off('mousemove', draw);
    }
});

function draw(e) {
    var x = e.clientX;
    var y = e.clientY;

    var div = document.createElement('div');

    div.style.position = 'absolute';
    div.style.left = x + 'px';   // Координаты дива X и Y не забываем указать еденицы измерения,
    div.style.top = y + 'px';    // например 40px или 20%
    div.style.pointerEvents = 'none';

    var img = document.createElement('img');
    img.src='../images/pngegg.png';
    div.appendChild(img);

    document.body.appendChild(div);   //  Добавим наш див на страницу
}