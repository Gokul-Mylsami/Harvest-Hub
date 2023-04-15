let cartItems;
const getCartItems = async () => {
  let formData = { action: "get" };
  $.ajax({
    type: "POST",
    url: "../php/cart.php",
    data: formData,
    success: function (response) {
      let data = JSON.parse(response);
      console.log(data);
      //   upadateUI(data.data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
};

const addCartItems = async () => {
  let formData = { action: "add", id: 5, name: "mongo" };
  $.ajax({
    type: "POST",
    url: "../php/cart.php",
    data: formData,
    success: function (response) {
      let data = JSON.parse(response);
      console.log(JSON.parse(data.data));
      //   upadateUI(data.data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
};

const upadateUI = (data) => {};

// getCartItems();
addCartItems();
