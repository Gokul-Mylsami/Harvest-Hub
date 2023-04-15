const email = document.getElementById("email");
const password = document.getElementById("password");

const form = document.getElementById("form");

const showMessage = (message, type) => {
  const messageContainer = document.querySelector(".msg-container");
  const mesage = document.querySelector(".msg");
  messageContainer.classList.add(type);
  mesage.textContent = message;
  setTimeout(() => {
    messageContainer.classList.remove(type);
    mesage.textContent = "";
  }, 3000);
};

const sendRequest = async () => {
  let formData = {
    email: email.value,
    password: password.value,
  };
  console.log(formData);
  $.ajax({
    type: "POST",
    url: "../php/login.php",
    data: formData,

    success: function (response) {
      let res = JSON.parse(response);
      console.log(res);
      if (res.status == "success") {
        showMessage(res.message, "success");
        email.value = "";
        password.value = "";
      } else {
        showMessage(res.message, "error");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendRequest();
});
