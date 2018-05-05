let portfolio = [
  {
    name: 'Toger Trivia',
    description: "A slick, timed trivia game currently loaded with nonsense questions.",
    url: 'https://tommyngre.github.io/TriviaGame/',
    image: './gallery/Trivia.png',
  },
  {
    name: 'Legendary One-Up',
    description: "A tongue-in-cheek 'fighting game' inspired by the oneupsmanship of co-workers.",
    url: 'https://tommyngre.github.io/week-4-game/',
    image: './gallery/RPG.png',
  },
  {
    name: "Giphy Search",
    description: "A nifty front-end for the Giphy API.",
    url: 'https://tommyngre.github.io/giphy-api-app/',
    image: './gallery/giphy.png',
  },
  {
    name: "Who Hangin?",
    description: "An irreverant take on hangman, where correctly guessing 'who hangin?' wins the game.",
    url: 'https://tommyngre.github.io/Hangman-Game/',
    image: './gallery/hangman.png',
  },
  {
    name: "listen hear",
    description: "a local music & dining app. spotify users can enter a zip, then preview nearby music acts performing that night. ",
    url: 'https://tommyngre.github.io/listen-hear/',
    image: './gallery/listenhear.png',
  }
]

function randomColor() {
  let r = Math.floor(Math.random() * 255)
  return r;
}

//risky but fun
function assignRandomColor() {
  let init = [1, 1, 1];
  let rgb = init.map(element => element * randomColor());
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},1)`;
}

//this was more useful when font was monotype. now, eh.
function getDots(whichLink) {
  let dots = "";
  let dotsNeeded = 12 - whichLink.length - 3;
  for (let i = 0; i < dotsNeeded; i++) {
    dots = dots + "&nbsp;";
  }
  return `<span>${dots}</span>`;
}

function buildLink(whichLink) {
  let dots = getDots(whichLink);
  let col = assignRandomColor();
  let html = `<span id="${whichLink}" data-name="${whichLink}" class="cent load-section" style="color:${assignRandomColor()}">&lt;${whichLink}${dots}&gt;</span>`
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
      .html(`<span class="cent" style="color:${assignRandomColor()}">&lt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</span>`)
  }
  return div;
}

function loadingDialog() {
  $('#loading-dialog').addClass('bounce').css('display','table');
  //determine how many links
  ///will fit on pg w/o scrolling
  let dh = $('#loading-dialog').outerHeight(true) + $('#icons').outerHeight(true);
  let wh = window.innerHeight;
  let ww = window.innerWidth;
  let whByDh = 2; //Math.floor((wh - dh) / dh) - 1;

  let i = 0; //link position
  let t = 300; //speed links are drawn

  let aboutMePos = Math.floor(Math.random() * whByDh);
  let portfolioPos = Math.floor(Math.random() * whByDh);

  //make sure About and Portfolio not assigned same 'i'
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

  setTimeout(function(){
    $('#loading-container').append(`<div id="signature" class="cent">~ <a id="hire-me" href="mailto:tommyn.gre@gmail.com"><b>HIRE</b></a> TOMMY GREENFIELD ~</div>`);
  },1000);

}

function getSectionContent(section) {
  let html = '';

  switch (section) {
    case "#ABOUT":
      html += `
      <ul class="sm-txt">
        <li>Grew up in Chicago suburbs</li>
        <li>Undergraduate at UW Madison</li>
        <li>5+ years as QA and <b>Technical Support Engineer</b> at <a class="underline-link" href="https://www.epic.com/" style="color:${assignRandomColor()}"><b>Epic</b></a>, a healthcare software vendor in Verona, Wisconsin</li>
        <li>Since Feb 2017, working as an <b>EDA Analyst</b> on at <a class="underline-link" href="https://www.labcorp.com/" style="color:${assignRandomColor()}"><b>LabCorp</b></a>, a clinical laboratory network headquartered in Burlington, North Carolina</li>
        <li>Since Feb 2018, enrolled in a 24 week <b>full stack web dev</b> program through Trilogy Education Services and UNC Chapel Hill
      </ul> 
      `
      return html;
      break;

    case "#PORTFOLIO":
      portfolio.forEach(project => {
        
        html += `
        <div class="sm-txt t-card">
          
          <div class="row t-card-pad">
          <div class="obscure"></div>

            <div class="col l12 xl8">
            <p class="t-card-title center-align">${project.name}</p>  
            <p class="t-card-desc">${project.description}</p>
            </div>
          
            <div class="col l12 xl4 proj-image-wrapper">
              <a class="valign-wrapper" href="${project.url}" target="_blank">
                <img alt="${project.name} gif" class="proj-pic" src="${project.image}">
              </a>
            </div>

          </div>
        </div>
        `

      });
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
    <p id='sec-title'>${$(section).attr('data-name')}</p>
  `;

  html += getSectionContent(section);

  $(sec).html(html);

  $("#section-wrap").append(sec)
    .addClass('animatedFast fadeInDown')

  //remove fadeIn after delay, so can be reactivated
  setTimeout(function(){
    $("#section-wrap").removeClass('fadeInDown');
  },500);

  $("#loading-container")
    .addClass('animatedFast fadeInDown')

}

function toLeft(section) {
  $('.nuthin').removeClass('animated')
    .addClass('animatedFast fadeOutLeft');

  setTimeout(function () {
    $('#loading-container').addClass('fadeInLeft');

    $('.nuthin').remove();
    $('#tommy').remove();

    $('.cent').css('margin', '5px auto');

    $('#loading-container').addClass('col s12 m6 l4')
      .append($('#icons-wrapper'))
      .append($('#signature').addClass('signature-sm').css('margin-top','30px'));
    loadSection(section);

  }, 200);

}

$(document.body).on('click', '#ABOUT', function () {
  toLeft('#ABOUT');
});

$(document.body).on('click', '#PORTFOLIO', function () {
  toLeft('#PORTFOLIO');
});

$(document).ready(function () {
  loadingDialog();
});