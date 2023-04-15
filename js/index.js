const loader = document.querySelector(".loading-container");
const content = document.querySelector(".content");
const cardsWrapper = document.querySelector(".cards-wrapper");

const fetchData = async () => {
  content.style.display = "none";
  loader.style.display = "block";
  const response = await fetch("../php/index.php");
  const data = await response.json();
  loader.style.display = "none";
  content.style.display = "block";

  return data;
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
      addToCart(productId, productName);
    });
  });
};

const renderData = async () => {
  const data = await fetchData();
  console.log(data.data);
  displayData(data.data);
};

renderData();
