function loadingDialog(){
  let w = window.innerHeight;
  let h = $('#loading-dialog').outerHeight(true);
  let wByH = Math.floor((w-h)/h);

  let div = $('<div class="row animated bounce">')
    .text("you wonder if the page is loading...");

  let t = 300;

  let i =0
  do {
    setTimeout(function(){
      $('#loading-container').append($(div).clone())
      //$(div).addClass('bounce');
    },t);
    t = t+400;
    i++;
  } while (i<wByH);
}

$(document).ready(function(){
  loadingDialog();
})