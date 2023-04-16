const loader = document.querySelector(".loading-container");
const content = document.querySelector(".content");
const cardsWrapper = document.querySelector(".cards-wrapper");
const searchBtn = document.querySelector(".search-btn");
const search = document.querySelector(".search");
const logutBtn = document.querySelector(".logout-icon");

let products = [];

logutBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const response = await fetch("../php/logout.php");
  const data = await response.json();
  if (data.status === "success") {
    window.location.href = "../login.html";
  }
});

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  searchProduct();
});

const fetchData = async () => {
  const response = await fetch("../php/index.php");
  const data = await response.json();

  products = data.data;
  console.log(products);
  return data;
};

const validateSession = async () => {
  const response = await fetch("../php/validateSession.php");
  const data = await response.json();
  console.log(data);
  if (data.status !== "success") {
    window.location.href = "../login.html";
  } else {
    console.log("session validated");
    document.querySelector(".username").innerText = data.user;
  }
};

const searchProduct = () => {
  console.log("searching");
  const searchKeyword = search.value;

  const filteredProducts = products.filter((product) => {
    const regex = new RegExp(searchKeyword, "gi");
    return product.name.match(regex);
  });

  console.log(filteredProducts);
  cardsWrapper.innerHTML = "";
  displayData(filteredProducts);
};

const addToCart = async (id, name) => {
  let data = { id, name, action: "add" };
  $.ajax({
    type: "POST",
    url: "../php/cart.php",
    data: data,
    success: function (response) {
      let res = JSON.parse(response);
      console.log(res);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
};

const displayData = (data) => {
  data.map((item) => {
    let template = `<div class="card">
    <div class="content-wrapper" key=${item.id}>
      <img
        src='${item.image}'
        class="card-img"
        alt="product image"
      />
      <p class="product-name">${item.name}</p>
      <p class="product-price">&#8377; ${item.price}</p>
      <p class="product-left">${item.qtyleft} left</p>
      <p class="description">
        ${item.description}
      </p>
      <input
        type="submit"
        value="Add to Cart"
        class="add-to-cart-btn"
      />
    </div>
  </div>`;
    cardsWrapper.innerHTML += template;
  });

  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.parentNode.getAttribute("key");
      //get the product name
      const productName =
        event.target.parentNode.querySelector(".product-name").innerText;
      console.log("Product added to cart:", productId, productName);
      addCartItems(productId, productName);
    });
  });
};

const renderData = async () => {
  content.style.display = "none";
  loader.style.display = "block";

  validateSession();
  const data = await fetchData();
  displayData(data.data);

  loader.style.display = "none";
  content.style.display = "block";
};

const addCartItems = async (productId, productName) => {
  let formData = { action: "add", id: productId, name: productName };
  $.ajax({
    type: "POST",
    url: "../php/cart.php",
    data: formData,
    success: function (response) {
      let data = JSON.parse(response);
      console.log(data);
      showNotification(data.message, data.status);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
};
renderData();

function showNotification(message, status) {
  var notification = document.createElement("div");
  notification.innerText = message;
  notification.style.position = "fixed";
  notification.style.bottom = "-50px";
  notification.style.left = "50%";
  notification.style.transform = "translateX(-50%)";
  notification.style.background = status === "success" ? "#4CAF50" : "#f44336";
  notification.style.color = "#fff";
  notification.style.padding = "10px";
  notification.style.borderRadius = "5px";
  notification.style.opacity = "0";
  document.body.appendChild(notification);
  setTimeout(function () {
    notification.style.bottom = "20px";
    notification.style.opacity = "1";
    notification.style.transition = "bottom 0.3s ease-in-out";
  }, 100);
  setTimeout(function () {
    notification.style.bottom = "-50px";
    notification.style.opacity = "0";
    notification.style.transition =
      "bottom 0.3s ease-in-out, opacity 0.5s ease-out";
    setTimeout(function () {
      document.body.removeChild(notification);
    }, 500);
  }, 3000);
}
