function randomColor(){
  let rgb = [1,1,1];
  let rnd = Math.floor(Math.random() * 255);
  const map = rgb.map(value => value * rnd );
  return `rgba(${map[0]},${map[1]},${map[2]},1)`;
}

function buildAboutMe(){
  let col = randomColor();
  let html = `..<span id="about" class="load-section" style="color:${randomColor()}">about</span>.....`
  return html;
}

function buildPortfolio(){
  let col = randomColor();
  let html = `...<span id="portfolio" class="load-section"style="color:${randomColor()}">portfolio</span>`
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
    $(div).text('............')
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