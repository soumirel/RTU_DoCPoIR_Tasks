
let check_cart_btn = document.querySelector(".check-cart-btn");
let add_to_cart_btns = document.querySelectorAll(".add-to-cart-btn");

var accumulator = new Accumulator(0);
addListeners();

function addListeners() {
    for (i = 0; i < add_to_cart_btns.length; i++) { 
        add_to_cart_btns[i].addEventListener("click", () => {
            accumulator.read();
        });
    }
}

check_cart_btn.addEventListener("click", () => {
    alert('В вашей корзине: ' + accumulator.value + ' товаров');
}) 


function Accumulator(startingValue) {
    this.value = startingValue;
  
    this.read = function() {
      this.value += +prompt('Сколько товаров нужно добавить?', 0);
    };
  
  }