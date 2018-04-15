function randomColor(){
  let r = Math.floor(Math.random() * 255) 
  return r ;
}

function assignRandomColor(){
  let init = [1,1,1];
  let rgb = init.map(element => element * randomColor() );
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},1)`;
}

function buildAboutMe(){
  let col = assignRandomColor();
  let html = `<span id="about" class="load-section" style="color:${assignRandomColor()}">..about.....</span>`
  return html;
}

function buildPortfolio(){
  let col = assignRandomColor();
  let html = `<span id="portfolio" class="load-section" style="color:${assignRandomColor()}">...portfolio</span>`
  return html;
}

function getDiv(i,aboutmePos,portfolioPos){
  let div = $('<div class="row center-align animated bounce">')
  if (i == aboutmePos){
    let html = buildAboutMe();
    $(div).html(html);
    return div;
  } else if (i == portfolioPos) {
    let html = buildPortfolio();
    $(div).html(html);
    return div;
  } else {
    $(div).text('............').css('color',assignRandomColor())
  }
  return div;
 }

function loadingDialog(){
  let dh = $('#loading-dialog').outerHeight(true);

  let wh = window.innerHeight;
  let ww = window.innerWidth;

  let whByDh = Math.floor((wh-dh)/dh);

  //get monospace char width
  //printed random char instead of '...'

  let i = 0
  let t = 300;

  let aboutMePos = Math.floor(Math.random() * whByDh);
  let portfolioPos = Math.floor(Math.random() * whByDh);

  if (aboutMePos == portfolioPos){
    do {
      portfolioPos = Math.floor(Math.random() * whByDh);
    } while (aboutMePos == portfolioPos)
  } 

  console.log("about", aboutMePos);
  console.log("port", portfolioPos);

  do {
    let div = getDiv(i,aboutMePos,portfolioPos);
    
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