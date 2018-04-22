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
  let dotsNeeded = 13 - whichLink.length - 4;
  for (let i = 0; i < dotsNeeded; i++) {
    dots = dots + "&nbsp;";
  }
  return dots;
}

function buildLink(whichLink) {
  let dots = getDots(whichLink);
  let col = assignRandomColor();
  let html = `<span id="${whichLink}" data-name="${whichLink}" class="cent load-section" style="color:${assignRandomColor()}; background-color:white">&lt; ${whichLink} ${dots}&gt;</span>`
  return html;
}

function getDiv(i, aboutmePos, portfolioPos) {
  let div = $('<div class="cent row animated bounce">')
  if (i == aboutmePos) {
    let html = buildLink("ABOUT");
    $(div).addClass('somethin some-some').html(html);
    return div;
  } else if (i == portfolioPos) {
    let html = buildLink("PORTFOLIO");
    $(div).addClass('somethin some-some').html(html);
    return div;
  } else {
    $(div).addClass('nuthin')
      .html(`<span class="cent" style="color:${assignRandomColor()}; background-color:${assignRandomColor()}">&lt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</span>`)
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

function getSectionContent(section) {
  console.log(section);
  let html = '';

  switch (section) {
    case "#ABOUT":
      html += `
      <p>A little bit about me...</p>
      `
      return html;
      break;

    case "#PORTFOLIO":
      html += `
      <p>Some recent projects...</p>
      `
      return html;
      break;

    default:
      //nothin
  }
}

function loadSection(section) {
  $('#section-wrap').html("");
  let sec = $('<div id="sec">')
    .css('color', 'black')
  //.css('color', $(section).css('color'))
  //.css('background-color', $(section).css('background-color'))

  let html = `
    <p style="text-align:center">${$(section).attr('data-name')}</p>
  `;

  html += getSectionContent(section);

  $(sec).html(html);

  $("#section-wrap").append(sec)
    .addClass('animatedFast fadeInDown')

  $("#loading-container")
    .addClass('animatedFast fadeInDown')

}

function toLeft(section) {
  $('.nuthin').removeClass('animated')
    .addClass('animatedFast fadeOutLeft');

  setTimeout(function () {
    $('#loading-container').addClass('fadeInLeft');

    $('.nuthin').remove();

    $('.cent').css('margin', '5px auto');

    $('#loading-container').addClass('col s12 m6 l4')
      .append($('#icons-wrapper'));

    loadSection(section);

  }, 200);

}

$(document.body).on('click', '#ABOUT', function () {
  toLeft('#ABOUT');
})

$(document.body).on('click', '#PORTFOLIO', function () {
  toLeft('#PORTFOLIO');
})

$(document).ready(function () {
  loadingDialog();
})