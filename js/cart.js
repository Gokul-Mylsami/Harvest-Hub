let cartItems;
let cost=0;
const itemsWrapper = document.querySelector(".items-wrapper");
const tfoot = document.querySelector("#price");
const getCartItems = async () => {
  let formData = { action: "get" };
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "../php/cart.php",
      data: formData,
      success: function(response) {
        let data = JSON.parse(response);
        console.log(data);
        resolve(data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
        reject(errorThrown);
      },
    });
  });
};

const displayData = (data) => {
  data.map((item) => {
    cost=cost+ (item.quantity * item.price);
    
    let template = `<tr class="prod-row">
    <td class="tab-col">
<div class="prod-details-col">
    <img src='${item.image}' class="prod-img"/>
      <div class="prod-details">
                    <p class="prod-name">${item.name}</p>
                    <p class="prod-desc">
                      ${item.description}
                    </p>
                    <p class="prod-remove">Remove</p>
                  </div>
                </div>
              </td>
<td class="tab-col">
                <div class="quantity-col">
                  <button>+</button>
                  <p>${item.quantity}</p>
                  <button>-</button>
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
};
const renderData = async () => {
  let data = await getCartItems();
  displayData(data.data);
  let temp=`<p class="total-price">₹ ${cost}</p>`
  tfoot.innerHTML+=temp;
};

const upadateUI = (data) => {};

renderData();
