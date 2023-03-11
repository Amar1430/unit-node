const loginUser = document.querySelector("#loginUser");
const profillUser = document.querySelector("#profillUser");
const user = document.querySelector("#user").innerText;
console.log(user)
if (user != "") {
  loginUser.classList.add("dn");
  profillUser.classList.remove("dn");
} else {
  loginUser.classList.remove("dn");
  profillUser.classList.add("dn");
}
