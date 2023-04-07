let login = document.querySelector(".login-form");

document.querySelector('#login-btn').onclick = () =>{
    login.classList.toggle('active');
}

var swiper = new Swiper(".review-slider", {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

function loader(){
  document.querySelector(".loader-container").classList.add("fade-out");
}

function fadeOut(){
  setInterval(loader,4000);
}

window.onload = fadeOut;