// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
   {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]
// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

document.getElementById("count_product").textContent=cart.length;

// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
    for (let i=0; i<products.length; i++){
        if (products[i].id==id){
            cartList.push(products[i]);
            break;
        }
    }

}

// Exercise 2
function cleanCart() {
    cartList.length=0;
    cart.length=0;
    document.getElementById("cart_list").innerHTML="";
    document.getElementById("total_price").textContent="0";
    document.getElementById("cart_modal_btns_div").classList.add("d-none")
    document.getElementById("count_product").textContent=cart.length;
    const countProductDivs=document.querySelectorAll('.count_product_div');
    for (let countProductDiv of countProductDivs) {
        countProductDiv.classList.add("d-none");
    }
}

// Exercise 3

// agrego esta función para calcular total con descuento
function calculateTotalWithDiscount() {
    // Calculate total price of the cart using the "cartList" array
    total=0;
    for (let i=0; i<cart.length; i++){
        if (cart[i].offer!= undefined && cart[i].quantity>=cart[i].offer.number){
            total+=cart[i].subtotalWithDiscount;
        } else{
            total+=cart[i].subtotal;
        }
    }
    total=total.toFixed(2);
    return total;
}

function cleanFromCart(id) {
    for (let i=0; i<cart.length; i++){
        if (cart[i].id==id){
            cart.splice(i, 1);
        }
    }
    document.getElementById("list_prod_row_"+id).remove();
    document.getElementById("count_product_"+id).classList.add("d-none");
    document.getElementById("count_product_"+id).textContent="0";
    document.getElementById("total_price").textContent=calculateTotalWithDiscount();
    document.getElementById("count_product").textContent=cart.length;
    if (cart.length==0){
        document.getElementById("cart_modal_btns_div").classList.add("d-none")
    }
}

function calculateProductTotalWithDiscount(id) {
    // Calculate total price of the cart using the "cartList" array
    let totalProdWithDiscount=0;
    for (let i=0; i<cart.length; i++){
        if (cart[i].id==id){
            if (cart[i].offer!= undefined && cart[i].quantity>=cart[i].offer.number){
                cart[i].subtotalWithDiscount=cart[i].subtotal-(cart[i].subtotal*cart[i].offer.percent)/100;
                totalProdWithDiscount=cart[i].subtotalWithDiscount.toFixed(2);
            }
        }
    }
    return totalProdWithDiscount;
}

// Exercise 4
function generateCart() {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
    cart.length=0;
    for (let i=0; i<cartList.length; i++){
        
        let indexFound=cart.findIndex(producto => producto.id == id);
        if (indexFound==-1){
            cartList[i].quantity=1;
            cartList[i].subtotal= cartList[i].price;
            cart.push(cartList[i]);
        } else{
            cart[indexFound].quantity+=1;
            cart[indexFound].subtotal+=cart[indexFound].price;
        }
    }
}

// Exercise 5
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"
    for (let i=0; i<cart.length; i++){
        if (cart[i].offer!= undefined && cart[i].quantity>=cart[i].offer.number){
            cart[i].subtotalWithDiscount=cart[i].subtotal-(cart[i].subtotal*cart[i].offer.percent)/100;
        }
    }
}

function addToCart(id) {
    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.
    let product_count, product_subtotal;
    for (let i=0; i<products.length; i++){
        if (products[i].id==id){
            let indexFound=cart.findIndex(producto => producto.id == id);
            if (indexFound==-1){
                //cart.push(structuredClone(products[i]));//método para deep copy pero no soporte en browsers más viejos
                cart.push(products[i]);
                cart[cart.length-1].quantity=1;
                cart[cart.length-1].subtotal= products[i].price;
                product_count=cart[cart.length-1].quantity;
            } else{
                cart[indexFound].quantity+=1;
                cart[indexFound].subtotal+=cart[indexFound].price;
                product_subtotal=cart[indexFound].subtotal;
                product_count=cart[indexFound].quantity;
            }
            break;
        }
    }
    document.getElementById("count_product").textContent=cart.length;
    document.getElementById("count_product_"+id).classList.remove("d-none");
    document.getElementById("count_product_"+id).textContent=product_count;
    if (document.body.contains(document.getElementById("list_prod_quantity_"+id))){
        document.getElementById("list_prod_quantity_"+id).textContent=product_count;
        let checkDiscount=calculateProductTotalWithDiscount(id);
        if (checkDiscount==0){
            document.getElementById("list_prod_subtotal_"+id).textContent="$"+product_subtotal;
        } else{
            document.getElementById("list_prod_subtotal_"+id).innerHTML="$"+checkDiscount+"<br>(with discount)";
        }
        document.getElementById("total_price").textContent=calculateTotalWithDiscount();
    }

}

// Exercise 8
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
    let product_count, product_subtotal;
    for (let i=0; i<cart.length; i++){
        if (cart[i].id==id){
            if (cart[i].quantity>1){
                cart[i].quantity-=1;
                cart[i].subtotal-=cart[i].price;
                product_count=cart[i].quantity;
                if (cart[i].subtotalWithDiscount!= undefined && cart[i].quantity>=cart[i].offer.number){
                    cart[i].subtotalWithDiscount=cart[i].subtotal-(cart[i].subtotal*cart[i].offer.percent)/100;
                    product_subtotal="$"+cart[i].subtotalWithDiscount+"<br>(with discount)";
                } else if  (cart[i].subtotalWithDiscount!= undefined && cart[i].quantity==cart[i].offer.number-1){
                    cart[i].subtotalWithDiscount=undefined;
                    product_subtotal="$"+cart[i].subtotal;
                } else{
                    product_subtotal="$"+cart[i].subtotal;
                }
                document.getElementById("count_product_"+id).textContent=product_count;
                if (document.body.contains(document.getElementById("list_prod_quantity_"+id))){
                    document.getElementById("list_prod_quantity_"+id).textContent=product_count;
                    document.getElementById("list_prod_subtotal_"+id).innerHTML=product_subtotal;
                    document.getElementById("total_price").textContent=calculateTotalWithDiscount();
                }
            } else{
                cart.splice(i, 1);
                document.getElementById("count_product_"+id).classList.add("d-none");
                document.getElementById("count_product_"+id).textContent="0";
                if (document.body.contains(document.getElementById("list_prod_row_"+id))){
                    document.getElementById("list_prod_row_"+id).remove();
                    document.getElementById("total_price").textContent=calculateTotalWithDiscount();
                }
                if (cart.length==0){
                    document.getElementById("cart_modal_btns_div").classList.add("d-none")
                }
            }
            break;
        }
    }
    document.getElementById("count_product").textContent=cart.length;
}

// Exercise 6
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
    let product, pName, pPrice, pQuantity, pTotal, plusMinusTd, plusBtn, minusBtn, removeTd, removeIcon;
    let cartListTable = document.getElementById("cart_list");
    cartListTable.innerHTML="";
    let totalPriceSpan = document.getElementById("total_price");
    totalPriceSpan.textContent=calculateTotalWithDiscount(); 

    for (let i=0; i<cart.length; i++){
        product=document.createElement("tr");
        product.setAttribute("id", "list_prod_row_"+cart[i].id);
        pName=document.createElement("th");
        pName.setAttribute("scope", "row");
        let pNameArr = cart[i].name.split(" ");
        for (let j = 0; j < pNameArr.length; j++) {
            pNameArr[j] = pNameArr[j].charAt(0).toUpperCase()+pNameArr[j].slice(1);
        }
        let pNametoUpper = pNameArr.join(" ");
        pName.textContent=pNametoUpper;
        pPrice=document.createElement("td");
        pPrice.textContent=cart[i].price;
        pQuantity=document.createElement("td");
        pQuantity.setAttribute("id", "list_prod_quantity_"+cart[i].id);
        pQuantity.textContent=cart[i].quantity;
        pTotal=document.createElement("td");
        pTotal.setAttribute("id", "list_prod_subtotal_"+cart[i].id);
        if (cart[i].offer!= undefined && cart[i].quantity>=cart[i].offer.number){
            pTotal.innerHTML="$"+cart[i].subtotalWithDiscount.toFixed(2)+"<br>(with discount)";
        } else{
            pTotal.textContent="$"+cart[i].subtotal.toFixed(2);
        }
        plusMinusTd=document.createElement("td");
        plusBtn=document.createElement("a");
        plusBtn.classList.add("btn", "btn-outline-primary");
        plusBtn.innerHTML="<i class='fa-solid fa-plus'></i>";
        //plusBtn.addEventListener("click", addToCart(cart[i].id));//bug de bootstrap; no funciona addEventListener en modal
        plusBtn.setAttribute("href", "javascript:void(0)");
        plusBtn.setAttribute("onclick", "addToCart("+cart[i].id+")");
        minusBtn=document.createElement("a");
        minusBtn.classList.add("btn", "btn-outline-primary");
        minusBtn.innerHTML="<i class='fa-solid fa-minus'></i>";
        //minusBtn.addEventListener("click", removeFromCart(cart[i].id));
        minusBtn.setAttribute("href", "javascript:void(0)");
        minusBtn.setAttribute("onclick", "removeFromCart("+cart[i].id+")");
        plusMinusTd.appendChild(plusBtn);
        plusMinusTd.appendChild(minusBtn);
        removeTd=document.createElement("td");
        removeTd.classList.add("text-center");
        removeIcon=document.createElement("a");
        removeIcon.classList.add("btn", "btn-outline-primary");
        removeIcon.innerHTML="<i class='fa-solid fa-trash'></i>";
        //removeIcon.addEventListener("click", cleanFromCart(cart[i].id));
        removeIcon.setAttribute("href", "javascript:void(0)");
        removeIcon.setAttribute("onclick", "cleanFromCart("+cart[i].id+")");
        removeTd.appendChild(removeIcon);
        product.appendChild(pName);
        product.appendChild(pPrice);
        product.appendChild(pQuantity);
        product.appendChild(plusMinusTd);
        product.appendChild(pTotal);
        product.appendChild(removeTd);
        cartListTable.appendChild(product);
    }
 
}


// ** Nivell II **

// Exercise 7


function open_modal(){
	if (cart.length>0){
        document.getElementById("cart_modal_btns_div").classList.remove("d-none");
    } else{
        document.getElementById("cart_modal_btns_div").classList.add("d-none");
    }
}