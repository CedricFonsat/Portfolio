/*
document.querySelector("#burger").style.display = "none";
window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
setTimeout(function () {
    let loading_page = document.querySelector('#loading');
    loading_page.classList.add('anime_loading');

},5000);

setTimeout(function () {
    document.querySelector("#burger").style.display = "flex";
    document.querySelector('#loading').style.display = "none";
    document.querySelectorAll(".spline-watermark")[0].style.display = "none"
    console.log(  document.querySelectorAll(".spline-watermark")[0]);
},8000);
*/

function closeBurger(){
    document.querySelector("#btnBurger").click()
}


