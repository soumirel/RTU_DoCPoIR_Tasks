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

var cart = [];
var goodCards = [];
var boxes = document.querySelectorAll(".box");
initialiseGoods();

function initialiseGoods() {
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
    let newCartCard = document.createElement('div');
    if (good.company == "AMD") {
        newCartCard.className = "cart-good amd-good";
    } else {
        newCartCard.className = "cart-good intel-good";
    }
    newCartCard.innerHTML = good.name + good.price + "$";
    cart_content.append(newCartCard);
    cart.push(good);
}

