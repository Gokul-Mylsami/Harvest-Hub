const logutBtn = document.querySelector(".logout-icon");

logutBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const response = await fetch("../php/logout.php");
  const data = await response.json();
  if (data.status === "success") {
    window.location.href = "../login.html";
  }
});

let cartItems;
let cost = 0;
const itemsWrapper = document.querySelector(".items-wrapper");
const tfoot = document.querySelector("#price");
const getCartItems = async () => {
  let formData = { action: "get" };
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "../php/cart.php",
      data: formData,
      success: function (response) {
        let data = JSON.parse(response);
        cartItems = data.data;
        console.log(data);
        resolve(data);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
        reject(errorThrown);
      },
    });
  });
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

const increaseItems = (id) => {
  cost = 0;
  cartItems.forEach((item) => {
    if (item.id == id && item.quantity < parseInt(item.qtyleft)) {
      item.quantity++;
      quantity = item.quantity;
      let qty = document.querySelector(`.qty-${id}`);
      qty.textContent = parseInt(qty.textContent) + 1;
      let total = document.querySelector(`.prod-total-${id}`);
      total.textContent = `₹ ${item.quantity * item.price}`;
    }
  });

  displayData(cartItems);
  updateTheCart();
};

const decreaseItems = (id) => {
  cartItems.forEach((item) => {
    if (item.id == id && item.quantity > 1) {
      item.quantity--;
      let qty = document.querySelector(`.qty-${id}`);
      qty.textContent = parseInt(qty.textContent) - 1;
      let total = document.querySelector(`.prod-total-${id}`);
      total.textContent = `₹ ${item.quantity * item.price}`;
    }
  });

  displayData(cartItems);
  updateTheCart();
};

const displayData = (data) => {
  cost = 0;
  itemsWrapper.innerHTML = "";
  if (data.length == 0) {
    itemsWrapper.innerHTML = `<tr><td colspan="4" style="text-align: center; font-size: 20px; font-weight: 600;">No items in cart</td></tr>`;
    return;
  }
  data.map((item) => {
    cost += item.quantity * item.price;
    let template = `<tr class="prod-row" key=${item.id}>
          <td class="tab-col">
            <div class="prod-details-col">
                <img src='${item.image}' class="prod-img"/>
              <div class="prod-details">
                    <p class="prod-name" >${item.name}</p>
                    <p class="prod-desc">
                      ${item.description}
                    </p>
                    <p class="prod-remove" onclick=deleteData(${
                      item.id
                    })>Remove</p>
                  </div>
                </div>
              </td>
              <td class="tab-col">
                <div class="quantity-col">
                  <button class="plus-qty">+</button>
                  <p class='qty-${item.id}'>${item.quantity}</p>
                  <button class="minus-qty">-</button>
                </div>
              </td>
              <td class="tab-col">
                <p class="prod-price">₹ ${item.price}</p>
              </td>
              <td>
                <p class="prod-total-${item.id}">₹ ${
      item.quantity * item.price
    }</p>
            </td>
            </tr>
`;
    itemsWrapper.innerHTML += template;
  });
  price.innerHTML = `<td>₹ ${cost}</td>`;

  document.querySelectorAll(".plus-qty").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId =
        event.target.parentNode.parentNode.parentNode.getAttribute("key");
      increaseItems(productId);
      updateTheCart();
    });
  });
  document.querySelectorAll(".minus-qty").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId =
        event.target.parentNode.parentNode.parentNode.getAttribute("key");
      decreaseItems(productId);
      updateTheCart();
    });
  });

  document.querySelectorAll(".minus-qty").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId =
        event.target.parentNode.parentNode.parentNode.getAttribute("key");
      decreaseItems(productId);
    });
  });
};

const updateTheCart = async () => {
  console.log("update the cart");
  let temp = [];
  cartItems.forEach((item) => {
    temp.push({
      id: item.id,
      quantity: item.quantity,
    });
  });

  let formData = { action: "update", data: temp };

  $.ajax({
    type: "POST",
    url: "../php/cart.php",
    data: formData,
    success: function (response) {
      let data = JSON.parse(response);
      console.log(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
      reject(errorThrown);
    },
  });

  renderData();
};

const deleteData = async (id) => {
  let temp = [];
  cartItems.forEach((item) => {
    if (item.id != id) {
      temp.push({
        id: item.id,
        quantity: item.quantity,
      });
    }
  });

  let formData = { action: "update", data: temp };

  $.ajax({
    type: "POST",
    url: "../php/cart.php",
    data: formData,
    success: function (response) {
      let data = JSON.parse(response);
      renderData();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
      reject(errorThrown);
    },
  });
};

const renderData = async () => {
  validateSession();
  let data = await getCartItems();
  displayData(data.data);
};

renderData();
