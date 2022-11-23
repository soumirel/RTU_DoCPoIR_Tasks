let expand_cart_btn = document.getElementById("cart-expand");
let expand_cart_arrow = document.getElementById("cart-arrow");
let cart_content = document.querySelector(".cart-content");

let expand_filters_btn = document.getElementById("filters-expand");
let expand_filters_arrow = document.getElementById("filters-arrow");
let filters_content = document.querySelector(".filter-content");

expand_cart_btn.addEventListener('click', () => 
{
    if (!expand_cart_btn.classList.contains('active')) 
    {
        expand_cart_btn.classList.add('active');
        showExpandedContent(cart_content);
        rotateArrow(expand_cart_arrow)
    } 
    else 
    {
        expand_cart_btn.classList.remove('active');
        hideExpandedContent(cart_content);
        disableRotationArrow(expand_cart_arrow)
    }
});

expand_filters_btn.addEventListener('click', () => 
{
    if (!expand_filters_btn.classList.contains('active')) 
    {
        expand_filters_btn.classList.add('active');
        showExpandedContent(filters_content);
        rotateArrow(expand_filters_arrow);
    } 
    else 
    {
        expand_filters_btn.classList.remove('active');
        hideExpandedContent(filters_content);
        disableRotationArrow(expand_filters_arrow)
    }
});

function showExpandedContent(content) 
{
    content.style.display = "flex";
    content.style.flexDirection = "column";
    content.style.gap = "10px";
}

function hideExpandedContent(content) 
{
    content.style.display = "none";
}

function rotateArrow(arrow) 
{
    arrow.classList.add("rotated-arrow")
}

function disableRotationArrow(arrow) 
{
    arrow.classList.remove("rotated-arrow")
}

class Good {
    company = "company";
    name = "name";
    price = 0;
    constructor(company, name, price) {
        this.company = company;
        this.name = name;
        this.price = price;
    }
}

class GoodCard {
    good = null;
    addToCartButton = null;
    constructor(good, addToCardButton) {
        this.good = good;
        this.addToCardButton = addToCardButton;
    }
}

class GoodInCart {
    good = null;
    cartNode = null;
    constructor(good, cartNode) {
        this.good = good;
        this.cartNode = cartNode;
    }
}

var cart = [];
var goodCards = [];
var boxes = document.querySelectorAll(".box");
var goodCardPrototype = document.querySelector(".cart-good");
initializeGoods();

function initializeGoods() {
    for (i = 0; i < boxes.length; i++) 
    {
        let currentName = boxes[i].querySelector(".box-name").textContent;
        let currentCompany = "";
        if (boxes[i].classList.contains("amd")) {
            currentCompany = "AMD";
        } else {
            currentCompany = "Intel"
        }
        let currentPrice = boxes[i].querySelector(".price").textContent;
        currentPrice = parseInt(currentPrice.slice(0, -1));
        let currentGood = new Good(currentCompany, currentName, currentPrice);
        let currentAddToCartButton = boxes[i].querySelector(".add-to-cart-btn");
        currentAddToCartButton.addEventListener("click", () => {
            addToCart(currentGood);
        });
        let currentGoodCard = new GoodCard(currentGood, currentAddToCartButton);
        goodCards.push(currentGoodCard);
        
    }
}

function addToCart(good) {
    let newCartNode = goodCardPrototype.cloneNode(true);
    let newGoodInCart = new GoodInCart(Object.assign({}, good), newCartNode);
    
    if (newGoodInCart.good.company == "AMD") {
        newGoodInCart.cartNode.className = "cart-good amd-good";
    } else {
        newGoodInCart.cartNode.className = "cart-good intel-good";
    }
    newGoodInCart.cartNode.querySelector(".good-name").textContent = newGoodInCart.good.name;

    newGoodInCart.cartNode.querySelector(".good-price").textContent = newGoodInCart.good.price;

    newGoodInCart.cartNode.querySelector(".goods-amount").textContent = "1";

    newGoodInCart.cartNode.querySelector(".cart-minus-btn").classList.add("disabled");

    showToltalPrice(newGoodInCart);
    
    newGoodInCart.cartNode.querySelector(".cart-plus-btn").addEventListener('click', () => {
        plus(newGoodInCart);
    });

    newGoodInCart.cartNode.querySelector(".cart-minus-btn").addEventListener('click', () => {
        minus(newGoodInCart);
    });

    newGoodInCart.cartNode.querySelector(".cart-bin-btn").addEventListener('click', () => {
        bin(newGoodInCart);
    });

    cart_content.append(newGoodInCart.cartNode);
    newGoodInCart.cartNode.classList.remove("hidden-cart-good");
    cart.push(newGoodInCart);
}

function showToltalPrice(goodInCart) {
    let amount =  parseInt(goodInCart.cartNode.querySelector(".goods-amount").textContent);
    let totalPrice = goodInCart.good.price * amount;
    goodInCart.cartNode.querySelector(".total-good-price").textContent = totalPrice + '$';
}


function plus(goodInCart) {
    let amount =  parseInt(goodInCart.cartNode.querySelector(".goods-amount").textContent);
    amount++;
    goodInCart.cartNode.querySelector(".goods-amount").textContent = amount;
    showToltalPrice(goodInCart);
    if (amount > 1) {
        goodInCart.cartNode.querySelector(".cart-minus-btn").classList.remove("disabled");
    }
}

function minus(goodInCart) {
    let amount =  parseInt(goodInCart.cartNode.querySelector(".goods-amount").textContent);
    if (amount > 1) {
        amount--;
        goodInCart.cartNode.querySelector(".goods-amount").textContent = amount;
        showToltalPrice(goodInCart);
    }
    if (amount == 1) {
        goodInCart.cartNode.querySelector(".cart-minus-btn").classList.add("disabled");
    }
}

function bin(goodInCart) {
    let index = cart.indexOf(goodInCart);
    cart.splice(index, 1);
    goodInCart.cartNode.remove();
}

