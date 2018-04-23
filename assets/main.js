let portfolio = [
  {
    name: 'Toger Trivia',
    description: "a minimalist, timed trivia game currently loaded with nonsense questions",
    url: 'https://tommyngre.github.io/TriviaGame/',
    image: './gallery/toger-trivia.gif',
  },
  {
    name: 'Legendary One-Up',
    description: "a tongue-in-cheek 'fighting game' inspired by the oneupsmanship of former co-workers",
    url: 'https://tommyngre.github.io/week-4-game/',
    image: './gallery/week-4-game.gif',
  },
  {
    name: "Who Hangin'?",
    description: "a goofy take on hangman asks players 'who hangin?' correct guesses result in that person not 'hangin' after all",
    url: 'https://tommyngre.github.io/Hangman-Game/',
    image: './gallery/hangman.gif',
  }
]

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
      <ul class="sm-txt">
        <li>Grew up in Chicago suburbs</li>
        <li>Undergraduate at UW Madison</li>
        <li>5+ years as QA and Technical Support Engineer at Epic, a healthcare software vendor in Verona, Wisconsin</li>
        <li>Since Feb 2017, working as an EDA Analyst on reverse reference interfaces for LabCorp, a clinical laboratory network headquartered in Burlington, North Carolina</li>
        <li>Since Feb 2018, enrolled in 24 week full stack web dev program offered by Trilogy Education Services in partnership with UNC Chapel Hill
      </ul>  
      `
      return html;
      break;

    case "#PORTFOLIO":
      portfolio.forEach(project => {
        
        html += `
        <div class="sm-txt t-card">
          
          <div class="row t-pad">

            <div class="col s12 m8">
            <p>${project.name}</p>  
            <p>${project.description}</p>
            </div>
          
            <div class="col s12 m4 center-align">
              <a class="valign-wrapper" href="${project.url}">
                <img alt="${project.name} gif" class="proj-pic" style="border: 5px solid ${assignRandomColor()}" src="${project.image}">
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
    <p style="text-align:center">${$(section).attr('data-name')}</p>
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
    $('#loading-dialog').remove();

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