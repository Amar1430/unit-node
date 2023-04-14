const loginUser = document.querySelector("#loginUser");
const profillUser = document.querySelector("#profillUser");
const loginUserA = document.querySelector("#loginUserA");
const profillUserA = document.querySelector("#profillUserA");
const user = document.querySelector("#user").innerText;
const menu = document.querySelector("#menu")
const headerA = document.querySelectorAll(".headerA")





menu.addEventListener("click", (e) => {
  menu.classList.toggle("menuActive")
  headerA.forEach(item => {
    item.classList.toggle("db")
  });
})


if (user != "") {
  loginUser.classList.add("dn");
  profillUser.classList.remove("dn");
} else {
  loginUser.classList.remove("dn");
  profillUser.classList.add("dn");
}

if (user != "") {
  loginUserA.classList.add("dn");
  profillUserA.classList.remove("dn");
} else {
  loginUserA.classList.remove("dn");
  profillUserA.classList.add("dn");
}
