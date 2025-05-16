document.addEventListener("DOMContentLoaded", () => {
    fetch("data.json")
        .then(response => response.json())
        .then(data => displayproducts(data))
        .catch(error => console.error(error))
});

function displayproducts(products) {
    let main = document.querySelector(".main");
    main.innerHTML = "";
    products.forEach(product => {
        let productcard = `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p id="desc">${product.description}</p>
                <p id="price">Price: ₹${product.price}</p>
                    <button onclick="addToCart(${product.id})" id="add">Add To Cart</button>
        </div>`

        main.innerHTML += productcard;
    });
}

let searchbtn = document.querySelector("#searchbtn").addEventListener("click", function() {
    let search = document.querySelector("input").value;
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            let searchproducts = data.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
            displayproducts(searchproducts);
        })
        .catch(error => console.error(error))
});

let filter = document.querySelector("#filter").addEventListener("click",function(){
    let dropdown = document.querySelector("#dropdown")
    if(dropdown.innerHTML === ""){
        let dropdownlist = document.createElement("select")
        dropdownlist.id = "category"
    dropdownlist.innerHTML = `<Option value="all">All Categories</Option>
    <Option value="Electronics">Electronics</Option>
    <Option value="Accessories">Accessories</Option>
    <Option value="Clothing">Clothing</Option>
    <Option value="Footwear">Footwear</Option>`
    dropdown.appendChild(dropdownlist)  
    dropdownlist.addEventListener("change",filterproducts)      
    }    
})

function filterproducts(){
    let category = document.querySelector("#category")
    let filter =  document.querySelector("#filter")
    fetch("data.json")
    .then(response => response.json())
    .then (data => {
        
            if(category.value === "all"){
               filter.style.display = "block"
               category.style.display = "none"
               displayproducts(data)
            }else{
                filter.style.display = "none"
                category.style.display = "block"
                let filteredproducts = data.filter(product => 
                    product.category === category.value);
                    displayproducts(filteredproducts);
                }
        });
}

document.querySelector("#filter").addEventListener("click", function () {
    let category = document.querySelector("#category");

    // Toggle the dropdown visibility when clicking the filter button
    if (category.style.display === "none") {
        category.style.display = "block";
    }
})

document.querySelector("#cart").addEventListener("click", function () {
    window.location.href = "cart.html";
})

let cart = [];
function addToCart(id) {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            let product = data.find(product => product.id === id);
            if (product) {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                let existingItem = cart.find(item => item.id === id)

                if(existingItem){
                    existingItem.quantity + 1
                } else {
                    product.quantity = 1;
                    cart.push(product)
                }
                localStorage.setItem("cart", JSON.stringify(cart));
                alert(`${product.name} added to cart!`);
            }
        })
        .catch(error => console.error(error))
}
