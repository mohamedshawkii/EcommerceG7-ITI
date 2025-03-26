const GetAllProduct = async () => {
  try {
    let res = await fetch("data.json")
    if (!res.ok) {
      throw new Error("Network response was not ok")
    }
    let data = await res.json()
    allProduct(data);
  } catch (error) {
    throw error;
  }
}
GetAllProduct()

const GetPrices = async (sequence) => {
  try {
    let res = await fetch("data.json")
    if (!res.ok) {
      throw new Error("Network response was not ok")
    }
    let data = await res.json()
    sortByPrice(data, sequence);
  } catch (error) {
    throw error;
  }
}

const GetCategory = async (category) => {
  try {
    let res = await fetch("data.json")
    if (!res.ok) {
      throw new Error("Network response was not ok")
    }
    let data = await res.json()
    categoryFilter(data, category);
  } catch (error) {
    throw error;
  }
}

function allProduct(data) {
  let container = document.getElementsByClassName("div1")[0];
  container.innerHTML = "";

  data.forEach((item) => {
    let productDiv = document.createElement("div");

    productDiv.innerHTML = `
    <img src="${item.images}" width="150" height="auto">
    <p>${item.title}</p>
    <p>$${item.price}</p>
    <p>${item.description}</p>
    <button class="add-to-cart">Add to Cart</button>
    `;
    let button = productDiv.querySelector(".add-to-cart");
    button.addEventListener("click", () => {
      addToCart(item.title, item.images, item.price);
    });
    container.appendChild(productDiv);
  })
}

function sortByPrice(data, sequence) {
  let container = document.getElementsByClassName("div1")[0];
  container.innerHTML = "";
  let seq = [];
  if (sequence === "ascending") {
    seq = data.sort((a, b) => b.price - a.price)
  } else {
    seq = data.sort((a, b) => a.price - b.price)
  }
  seq.forEach((item) => {
    let productDiv = document.createElement("div");

    productDiv.innerHTML = `
    <img src="${item.images}" width="150" height="auto">
    <p>${item.title}</p>
    <p>$${item.price}</p>
    <p>${item.description}</p>
    <button class="add-to-cart">Add to Cart</button>
    `;
    let button = productDiv.querySelector(".add-to-cart");
    button.addEventListener("click", () => {
      addToCart(item.title, item.images, item.price);
    });
    container.appendChild(productDiv);
  })
}

function categoryFilter(data, category) {
  let container = document.getElementsByClassName("div1")[0];
  container.innerHTML = "";

  let categoryFilter = data.filter((item) => item.category === category)

  categoryFilter.forEach((item) => {
    let productDiv = document.createElement("div");

    productDiv.innerHTML = `
    <img src="${item.images}" width="150" height="auto">
    <p>${item.title}</p>
    <p>$${item.price}</p>
    <p>${item.description}</p>
    <button class="add-to-cart">Add to Cart</button>
    `;
    let button = productDiv.querySelector(".add-to-cart");
    button.addEventListener("click", () => {
      addToCart(item.title, item.images, item.price);
    });
    container.appendChild(productDiv);
  })
}

let cart = [];

function addToCart(title, image, price) {
  let existingItem = cart.find(item => item.title === title);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ title, price, image, quantity: 1 });
  }
  updateCartCount();
}

function removeFromCart(title) {
  cart = cart.filter(item => item.title !== title);
  renderCart();
  updateCartCount();
}

function renderCart() {
  let total = 0;

  const cartDiv = document.getElementById("cartItems");
  cartDiv.innerHTML = "";

  const totalPrice = document.querySelector(".TotalPrice");
  totalPrice.innerHTML = `<hr><strong>Total: $${total}</strong>`;


  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>No items in cart</p>";
    return;
  }

  cart.forEach((item) => {
    total += item.price * item.quantity;
    cartDiv.innerHTML += `
                    <div class="cartItem">
                       <img src="${item.image}" width="150" height="auto">
                        ${item.title} (x${item.quantity}) - $${item.price * item.quantity}
                        <button onclick="removeFromCart('${item.title}')">Remove</button>
                    </div>
                    `;
  });
  totalPrice.innerHTML = `<hr><strong>Total: $${total}</strong>`;
}

function SideBareOpen() {
  document.getElementsByClassName("sideBareContainer")[0].classList.add("open");
  document.getElementsByClassName("sideBare")[0].classList.add("open");
  renderCart();
}

function SideBareClose() {
  document.getElementsByClassName("sideBareContainer")[0].classList.remove("open");
  document.getElementsByClassName("sideBare")[0].classList.remove("open");
}

function updateCartCount() {
  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  let cartCount = document.querySelector("#cartCount");
  cartCount.innerHTML = totalItems;
  cartCount.style.display = totalItems > 0 ? "inline-block" : "none";
}