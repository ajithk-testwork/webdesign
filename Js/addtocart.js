let cartIcon =document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closecart = document.querySelector("#cart-close");



cartIcon.addEventListener("click", ()=>{
    cart.classList.add("active");
});

closecart.addEventListener("click", ()=>{
    cart.classList.remove("active");
});




        // start the function

if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", start);
}else{
    start();
}

function start(){
    addEvents()

}

function update(){
    addEvents();
    updatetotal();
}

function addEvents(){
    let cartRemove_btns = document.querySelectorAll(".cart-remove");
    console.log(cartRemove_btns);
    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removecartItem);
    });

    //change item quantity

    let cartquantity_input = document.querySelectorAll(".cart-quantity");
    cartquantity_input.forEach(input =>{
        input.addEventListener("change", handle_changeItemQuantity);
    });

    //add item quantity

    let addcart_btns = document.querySelectorAll(".add-cart");
    addcart_btns.forEach((btn) => {
        btn.addEventListener("click", handle_addcartItem)
    });

    //buy order
    let buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click", handle_buyOrder);
    
}

let itemsAdded = [];

function handle_addcartItem(){
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;
    console.log(title, price, imgSrc);

    let newToAdd = {
        title,
        price,
        imgSrc,
    };

    //handle item is already exist

    if(itemsAdded.find(el => el.title == newToAdd.title)){
        alert("This Item is Already Exist! ");
        return;
    }else{
        itemsAdded.push(newToAdd);
    }

    //All product to cart
    let cartBoxElement = CartBoxComponent(title, price, imgSrc );
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    update();
}

function handle_removecartItem(){
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(el => el.title != this.parentElement.querySelector(".cart-product-title").innerHTML)

    update();
}

function handle_changeItemQuantity(){
    if(isNaN(this.value) || this.value < 1 ){
        this.value = 1;
    }
    this.value = Math.floor(this.value);

    update();
}

function handle_buyOrder(){
    if(itemsAdded.length <= 0){
        alert("There is No Order to Place Yet! \n Please Make an Order frist.");
        return;
    }
   const cartContent = cart.querySelector(".cart-content");
   cartContent.innerHTML = "";
   alert("Your Order is Place Successfully :)");
   itemsAdded = [];

   update();
}

               // Update  function
function updatetotal(){
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price");
    let total = 0;
    cartBoxes.forEach((cartBox) =>{
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    });

    totalElement.innerHTML = "$" + total;

}

function CartBoxComponent(title, price, imgSrc ){
    return `
        <div class="cart-box">
            <img class="cart-img" src="${imgSrc}">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <i class='bx bx-trash cart-remove'></i>
         </div>`
    

}
                   































































