const name = document.getElementById("name");
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
    name: name.value,
    email: email.value,
    password: password.value,
  };
  $.ajax({
    type: "POST",
    url: "../php/signup.php",
    data: formData,

    success: function (response) {
      let res = JSON.parse(response);
      console.log(res);
      if (res.status == "success") {
        showMessage(res.message, "success");
        name.value = "";
        email.value = "";
        password.value = "";
        window.location.href = "../login.html";
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
  //   console.log(name.value, email.value, password.value);
  sendRequest();
});
