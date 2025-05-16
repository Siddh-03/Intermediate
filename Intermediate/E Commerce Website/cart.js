let cart = []

function displayCart() {
    let cartdata = localStorage.getItem("cart")
    let cart = cartdata ? JSON.parse(cartdata) : []

    let cartItemsDiv = document.getElementById("cart-items")
    let totalDiv = document.getElementById("total")
    let totalItemCount = document.getElementById("total-item-count")

    cartItemsDiv.innerHTML = ""
    let total = 0
    let totalitem = 0


    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty 😔</p>"
        totalDiv.textContent = "Total: ₹0"
        return
    }

    cart.forEach(item => {
        cartItemsDiv.innerHTML += `<div class="cart-item">
                                        <div class="individual-item">
                                        <img src="${item.image}" alt="${item.name}">
                                        <div class="item-details">
                                        <h3>${item.name}</h3>
                                        <div class="Quantity">
                                        <button class="minus" data-id=${item.id}><span class="material-symbols-outlined">remove</span></button>
                                        
                                        <span class="count" data-id="${item.id}">${item.quantity}</span>
                                        
                                        <button class="plus" data-id="${item.id}"><span class="material-symbols-outlined">add</span></button>
                                        </div>
                                        <p>Price: ₹${item.price * item.quantity}</p>
                                        <button class="remove-item" onclick="remove(${item.id})" id="remove"><span class="material-symbols-outlined">delete</span></button>
                                        </div>
                                        </div>
                                    </div>`
        total += item.price * item.quantity
        totalitem += item.quantity
    });

    totalDiv.textContent = "Total: ₹" + total
    totalItemCount.innerHTML = `<h2>Total Items: ${totalitem}</h2>`


    document.querySelectorAll(".plus").forEach(btn => {
        btn.addEventListener("click", function () {
            let id = parseInt(this.getAttribute("data-id"))
            let countspan = document.querySelector(`.count[data-id = "${id}"]`)

            if (countspan) {
                let startcount = parseInt(countspan.innerText) || 0
                startcount += 1
                countspan.innerText = startcount
                updatedQuantity(id, 1)
            } else {
                console.log(`Count Span with data id="${id}" not found`);

            }
        })
    })

    document.querySelectorAll(".minus").forEach(btn => {
        btn.addEventListener("click", function () {
            let id = parseInt(this.getAttribute("data-id"))
            updatedQuantity(id, -1)
        })
    })

}

function updatedQuantity(id, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    let item = cart.find(item => item.id === id)

    if (item) {
        item.quantity += change

        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id)
        }

        localStorage.setItem("cart", JSON.stringify(cart))
        displayCart()
    }
}

function remove(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    cart = cart.filter(item => item.id !== id)
    localStorage.setItem("cart", JSON.stringify(cart))
    displayCart()
}

let footer = document.querySelector(".footer")
let clearCartButton = document.getElementById("clear-cart")
let cartdata = localStorage.getItem("cart")
cart = cartdata ? JSON.parse(cartdata) : []
if (cart !== null && cart.length > 0) {
    clearCartButton.style.display = ""
} else {
    clearCartButton.style.display = "none"
    let additemsbtn = document.createElement("button")
    additemsbtn.innerText = "Add Items to Cart"
    footer.appendChild(additemsbtn)
    additemsbtn.addEventListener("click", function () {
        window.location.href = "index.html";
    })
}


let clearcart = document.getElementById("clear-cart").addEventListener("click", function () {
    localStorage.removeItem("cart")
    displayCart()
    // clearcart.style.display = "none"
    // let totalItemCount = document.getElementById("total-item-count")
    // if(totalItemCount) {
    //     totalItemCount.innerHTML = `<h2>Total Items: 0</h2>`
    // }

    // let footer = document.querySelector(".footer")
    // if(footer && !document.getElementById("add-items-btn")) {
    //     let additemsbtn = document.createElement("button")
    //     additemsbtn.innerText = "Add Items to Cart"
    //     additemsbtn.id = "add-items-btn"
    //     footer.appendChild(additemsbtn)
    //     additemsbtn.addEventListener("click", function () {
    //         window.location.href = "index.html";
    //     })
    //     footer.appendChild(additemsbtn)

    // }

})

document.addEventListener("DOMContentLoaded", displayCart)

document.getElementById("home").addEventListener("click", function () {
    window.location.href = "index.html";
})

