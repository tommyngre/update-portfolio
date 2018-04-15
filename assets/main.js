function loadingDialog(){
  let dh = $('#loading-dialog').outerHeight(true);

  let wh = window.innerHeight;
  let ww = window.innerWidth;

  let whByDh = Math.floor((wh-dh)/dh);

  //get monospace char width
  //printed random char instead of '...'

  let div = $('<div class="row animated bounce">')
    .text("...");

  let i = 0
  let t = 300;

  do {
    setTimeout(function(){
      $('#loading-container').append($(div).clone())
    },t);
    t = t+400;
    i++;
  } while (i<whByDh);
}

$(document).ready(function(){
  loadingDialog();
})