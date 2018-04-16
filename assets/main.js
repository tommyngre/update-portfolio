function randomColor() {
  let r = Math.floor(Math.random() * 255)
  return r;
}

function assignRandomColor() {
  let init = [1, 1, 1];
  let rgb = init.map(element => element * randomColor());
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},1)`;
}

function buildAboutMe() {
  let col = assignRandomColor();
  let html = `<span id="about" data-name="about" class="cent load-section" style="color:${assignRandomColor()}; background-color:${assignRandomColor()}">.{about}....</span>`
  return html;
}

function buildPortfolio() {
  let col = assignRandomColor();
  let html = `<span id="portfolio" data-name="portfolio" class="cent load-section" style="color:${assignRandomColor()}; background-color:${assignRandomColor()}">.{portfolio}</span>`
  return html;
}

function getDiv(i, aboutmePos, portfolioPos) {
  let div = $('<div class="cent row animated bounce">')
  if (i == aboutmePos) {
    let html = buildAboutMe();
    $(div).addClass('somethin some-some').html(html);
    return div;
  } else if (i == portfolioPos) {
    let html = buildPortfolio();
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

  let whByDh = Math.floor((wh - dh) / dh);

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
  console.log(section);
  let sec = $('<section>')
    .css('color', $(section).css('color'))
    .css('background-color', $(section).css('background-color'))

  let html = `
    <p>${$(section).attr('data-name')}</p>
    <p>Whatever...</p>
  `;

  $(sec).html(html);

  $('body').append(sec);
}

function dropDotsToLeft(section) {
  $('.nuthin').addClass('fadeOutLeft');

  setTimeout(function () {
    $('.nuthin').remove();
  }, 100);

  //animate the move from center to left
  $('.somethin').animate({
    'margin-left': 0
  }, "fast");

  loadSection(section);
}

$(document.body).on('click', '#about', function () {
  dropDotsToLeft('#about');
})

$(document.body).on('click', '#portfolio', function () {
  dropDotsToLeft('#portfolio');
})

$(document).ready(function () {
  loadingDialog();
})