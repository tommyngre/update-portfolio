function randomColor() {
  let r = Math.floor(Math.random() * 255)
  return r;
}

function assignRandomColor() {
  let init = [1, 1, 1];
  let rgb = init.map(element => element * randomColor());
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},1)`;
}

function getDots(whichLink) {
  let dots = "";
  let dotsNeeded = 12 - whichLink.length - 2;
  for (let i = 0; i<dotsNeeded; i++){
    dots = dots + ".";
  }
  return dots;
}

function buildLink(whichLink) {
  let dots = getDots(whichLink);
  let col = assignRandomColor();
  let html = `<span id="${whichLink}" data-name="${whichLink}" class="cent load-section" style="color:${assignRandomColor()}; background-color:${assignRandomColor()}">{${whichLink}}${dots}</span>`
  return html;
}

function getDiv(i, aboutmePos, portfolioPos) {
  let div = $('<div class="cent row animated bounce">')
  if (i == aboutmePos) {
    let html = buildLink("about");
    $(div).addClass('somethin some-some').html(html);
    return div;
  } else if (i == portfolioPos) {
    let html = buildLink("portfolio");
    $(div).addClass('somethin some-some').html(html);
    return div;
  } else {
    $(div).addClass('nuthin')
      .html(`<span class="cent" style="color:${assignRandomColor()}; background-color:${assignRandomColor()}">............</span>`)
  }
  return div;
}

function loadingDialog() {
  let dh = $('#loading-dialog').outerHeight(true);

  let wh = window.innerHeight;
  let ww = window.innerWidth;

  console.log(dh);
  console.log(wh);

  let whByDh = Math.floor((wh - dh) / dh) - 1;

  console.log(whByDh);

  //get monospace char width
  //printed random char instead of '...'

  let i = 0
  let t = 300;

  let aboutMePos = Math.floor(Math.random() * whByDh);
  let portfolioPos = Math.floor(Math.random() * whByDh);

  if (aboutMePos == portfolioPos) {
    do {
      portfolioPos = Math.floor(Math.random() * whByDh);
    } while (aboutMePos == portfolioPos)
  }

  do {
    let div = getDiv(i, aboutMePos, portfolioPos);

    setTimeout(function () {
      $('#loading-container').append($(div).clone())
    }, t);

    t = t + 400;
    i++;
  } while (i < whByDh);
}

function loadSection(section) {
  $('#section-wrap').html("");
  let sec = $('<div id="sec">')
    .css('color', $(section).css('color'))
    //.css('background-color', $(section).css('background-color'))

  let html = `
    <p style="background-color:${$(section).css('background-color')}; text-align:center">${$(section).attr('data-name')}</p>
  `;

  html += `
  <p>Here's where we put some info...</p>
  `

  $(sec).html(html);

  $("#section-wrap").append(sec);
}

function toLeft(section) {
  $('.nuthin').addClass('fadeOutLeft');

  setTimeout(function () {
    $('.nuthin').remove();

      //animate the move from center to left
  $('.cent').css('margin','0 auto');

  $('.somethin').css('margin','0 auto');

  $('#loading-container').addClass('col s12 m6 l4')
  .append($('#icons-wrapper'));

  loadSection(section);

  }, 800);

}

$(document.body).on('click', '#about', function () {
  toLeft('#about');
})

$(document.body).on('click', '#portfolio', function () {
  toLeft('#portfolio');
})

$(document).ready(function () {
  loadingDialog();
})