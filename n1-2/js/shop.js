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
    document.getElementById("cart_modal_btns_div").classList.add("d-none");
    document.getElementById("count_product").textContent=cart.length;
}

// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
    total=0;
    for (let i=0; i<cartList.length; i++){
        total+=cartList[i].price;
    }
    total=total.toFixed(2);//¿esta solución es correcta al problema de los decimales?
}

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
    
}

// Exercise 4
function generateCart() {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
    cart.length=0;
    for (let i=0; i<cartList.length; i++){
        //versión con While, pero entiendo que en este ejercicio hay que usar un solo Loop
        // let found=false;
        // let index=0;
        // while (index<cart.length && !found){
        //     if (cart[index].id==cartList[i].id){
        //         found=true;
        //     } else{
        //         index++;
        //     }
        // }
        // if (!found){
        //     cart.push(cartList[i]);
        //     cart[cart.length-1].quantity=1;
        // } else{
        //     cart[index].quantity+=1;
        // }
        
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

// Exercise 6
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
    let product, pName, pPrice, pQuantity, pTotal;
    let cartListTable = document.getElementById("cart_list");
    cartListTable.innerHTML="";
    let totalPriceSpan = document.getElementById("total_price");
    totalPriceSpan.textContent=total; 

    for (let i=0; i<cart.length; i++){
        product=document.createElement("tr");
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
        pQuantity.textContent=cart[i].quantity;
        pTotal=document.createElement("td");
        if (cart[i].offer!= undefined && cart[i].quantity>=cart[i].offer.number){
            pTotal.innerHTML="$"+cart[i].subtotalWithDiscount.toFixed(2)+"<br>(with discount)";
        } else{
            pTotal.textContent="$"+cart[i].subtotal.toFixed(2);
        }
        product.appendChild(pName);
        product.appendChild(pPrice);
        product.appendChild(pQuantity);
        product.appendChild(pTotal);
        cartListTable.appendChild(product);
    }   
}


// ** Nivell II **

// Exercise 7
function addToCart(id) {
    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.
    for (let i=0; i<products.length; i++){
        if (products[i].id==id){
            let indexFound=cart.findIndex(producto => producto.id == id);
            if (indexFound==-1){
                //cart.push(structuredClone(products[i]));//método para deep copy pero no soporte en browsers más viejos
                cart.push(products[i]);
                cart[cart.length-1].quantity=1;
                cart[cart.length-1].subtotal= products[i].price;
            } else{
                cart[indexFound].quantity+=1;
                cart[indexFound].subtotal+=cart[indexFound].price;
            }
            break;
        }
    }
    document.getElementById("count_product").textContent=cart.length;
}

// Exercise 8
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
    for (let i=0; i<cart.length; i++){
        if (cart[i].id==id){
            if (cart[i].quantity>1){
                cart[i].quantity-=1;
                cart[i].subtotal-=cart[i].price;
                if (cart[i].subtotalWithDiscount!= undefined && cart[i].quantity>=cart[i].offer.number){
                    cart[i].subtotalWithDiscount=cart[i].subtotal-(cart[i].subtotal*cart[i].offer.percent)/100;
                } else if  (cart[i].subtotalWithDiscount!= undefined && cart[i].quantity==cart[i].offer.number-1){
                    cart[i].subtotalWithDiscount=undefined;
                }
            } else{
                cart.splice(i, 1);
            }
            break;
        }
    }
    document.getElementById("count_product").textContent=cart.length;
}

function open_modal(){
	if (cart.length>0){
        document.getElementById("cart_modal_btns_div").classList.remove("d-none");
    } else{
        document.getElementById("cart_modal_btns_div").classList.add("d-none");
    }
}