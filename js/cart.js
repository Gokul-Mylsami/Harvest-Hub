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

        resolve(data);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
        reject(errorThrown);
      },
    });
  });
};

const increaseItems = (id) => {
  //upadte the quantity in the UI
  let qty = document.querySelector(`.qty-${id}`);
  qty.textContent = parseInt(qty.textContent) + 1;
  cartItems.forEach((item) => {
    if (item.id == id) {
      item.quantity++;
    }
  });
  // Update the total cost
  cost += parseInt(qty.parentNode.nextElementSibling.textContent.slice(2));
  document.querySelector(".total-price").textContent = `₹ ${cost}`;
};

const decreaseItems = (id) => {
  //upadte the quantity in the UI
  let qty = document.querySelector(`#qty-${id}`);
  console.log(qty);
};

const displayData = (data) => {
  data.map((item) => {
    cost = cost + item.quantity * item.price;

    let template = `<tr class="prod-row" key=${item.id}>
    <td class="tab-col">
<div class="prod-details-col">
    <img src='${item.image}' class="prod-img"/>
      <div class="prod-details">
                    <p class="prod-name" >${item.name}</p>
                    <p class="prod-desc">
                      ${item.description}
                    </p>
                    <p class="prod-remove">Remove</p>
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
                <p class="prod-total">₹ ${item.quantity * item.price}</p>
              </td>
            </tr>
`;
    itemsWrapper.innerHTML += template;
  });

  //update the quantity when i click on + or -
  document.querySelectorAll(".plus-qty").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId =
        event.target.parentNode.parentNode.parentNode.parentNode.getAttribute(
          "key"
        );
      increaseItems(productId);
    });
  });

  document.querySelectorAll(".minus-qty").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId =
        event.target.parentNode.parentNode.parentNode.parentNode.getAttribute(
          "key"
        );
      decreaseItems(productId);
    });
  });
};
const renderData = async () => {
  let data = await getCartItems();
  displayData(data.data);
  let temp = `<p class="total-price">₹ ${cost}</p>`;
  tfoot.innerHTML += temp;
};

renderData();
