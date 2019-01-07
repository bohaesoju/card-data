// var putName = function(){
//   var somename = prompt( '접속코드를 입력하시오 (본인의이름)', '' );
//   switch(somename) {
//     case "김의중":
//         alert("어서오세요 주인님");
//         $('.picture').addClass('p1')
//         break;
//     case "박주형":
//         alert("어서오세요 막둥님");
//         $('.picture').addClass('p2')
//         break;
//     case "정지운":
//         alert("어서오세요 매니저님");
//         $('.picture').addClass('p3')
//         break;
//     case "김수빈":
//       alert("어서오세요 팀장님");
//       $('.picture').addClass('p4')
//       break;
//       case "박정원":
//       alert("어서오세요 부모임장님");
//       $('.picture').addClass('p5')
//       break;
//       case "유세인":
//       alert("어서오세요 꼼꼼이님");
//       $('.picture').addClass('p6')
//       break;
//       case "이희연":
//       alert("어서오세요 모임장님");
//       $('.picture').addClass('p7')
//       break;
//       case "김재하":
//       alert("어서오세요 선생님");
//       $('.picture').addClass('p8')
//       break;
        
//     default:
//         alert("당신은 어썸플로우 멤버가 아닙니다.");
//         putName();
//         break;
//   }
// }
// putName();

var width = 4;
var height = 4;
var colors = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink', 'mango', 'mango', 'apple', 'apple'];
var colorCandidate = colors.slice();
var color = [];
var clickplag = true;
var clickcard = [];
var successTime2 = null;
var successCard = [];
var successTimeList = [];
var startTime;
var numCount = [];
var numNumber = 0;

function shuffle() { // 피셔예이츠 shuffle
  for (var i = 0; colorCandidate.length > 0; i += 1) {
    color = color.concat(colorCandidate.splice(Math.floor(Math.random() * colorCandidate.length), 1));
  }
}

function cardSetting(width, height) {
  clickplag = false;
  for (var i = 0; i < width * height; i += 1) {
    var card = document.createElement('div');
    card.className = 'card ' + color[i];
    card.title = 'card' + i;
    // card.className = color[i];
    var cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    var cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    var cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.style.backgroundColor = color[i];
    // cardFront.className = color[i];
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    (function (c) { // 클로저 문제 해결
      card.addEventListener('click', function() {
        if (clickplag && !successCard.includes(c)) {
          c.classList.toggle('flipped');
          clickcard.push(c);
          if (clickcard.length === 2) {
            if ((clickcard[0].className === clickcard[1].className) && (clickcard[0].title !== clickcard[1].title)) {
              successCard.push(clickcard[0]);
              successCard.push(clickcard[1]);
              $(clickcard[0]).addClass('animate');
              $(clickcard[1]).addClass('animate');
              clickcard = [];
              if (successCard.length === 16) {
                pushTime(i);
              }
            } else { // 두 카드의 color이 다르면
              clickplag = false;
              setTimeout(function() {
                clickcard[0].classList.remove('flipped');
                clickcard[1].classList.remove('flipped');
                clickplag = true;
                clickcard = [];
              }, 1000);
            }
          }
        }
      });
    })(card);
    document.querySelector('#wrapper').appendChild(card);
  }

  function pushTime (){
    var endTime = new Date();
    var successTime = (endTime - startTime) / 1000;
    successTime2 = Math.ceil(successTime);
    successTimeList.push(successTime2);
    successTimeList.sort(function(a, b) { // 오름차순
      return a - b;
    });
    recordornot();
  }

  // 신기록과 그냥 기록을 분기시켜주는 함수
  var recordornot = function(){
    if(successTime2 > scoreWrap[0].second){
      finish();
    } else {
      finishRecord();
    }
  }

  function addRotate(){
    return $('.card').addClass('rotate');
  }
  function finish1Record(){
    return $('#wrapper').addClass('bounce-in-top'),$('.card').addClass('rotate');
  }

  function finish (){
    addRotate();
    setTimeout(function(){
      finish2();
    }, 5000)
  }
  function finishRecord (){
    finish1Record();
    save_data();
    setTimeout(function(){
      finish3();
    }, 5000)
  }

  // $(".picture").click(function(){
  //   var n = Math.max.apply(null, numCount);
  //   console.log(n);
  //   numNumber += 1;
  //   var e = n.toString();
  //   $(this).children().removeClass();
  //   $(this).children().addClass(e);
  //   if($(this).children().hasClass('20')){
  //     $(this).children().removeClass();
  //     numCount = [];
  //     numNumber = 0;
  //     debugger;
  //     pushTime();
  //   }
  //   numCount.push(numNumber);
  // });

  var finish2 = function (){
    $('.score li').remove();
    for(var i = 0; i < successTimeList.length; i += 1){
      $('.score').append('<li>' + (i + 1) + '. ' +  successTimeList[i] + '초</li>')
    }
    alert('축하합니다! ' + successTime2 + ' 초 걸렸습니다.');
    document.querySelector('#wrapper').innerHTML = '';
    colorCandidate = colors.slice();
    color = [];
    successCard = [];
    startTime = null;
    shuffle();
    cardSetting(width, height);
    $('.card').removeClass('rotate');
  }

  var finish3 = function (){
    $('.score li').remove();
    for(var i = 0; i < successTimeList.length; i += 1){
      $('.score').append('<li>' + (i + 1) + '. ' +  successTimeList[i] + '초</li>')
    }
    alert('신기록 달성!' + successTime2 + '초 걸렸습니다. 현재까지 전체 1등!!');
    document.querySelector('#wrapper').innerHTML = '';
    colorCandidate = colors.slice();
    color = [];
    successCard = [];
    startTime = null;
    shuffle();
    cardSetting(width, height);
    $('.card').removeClass('rotate');
    $('#wrapper').removeClass('bounce-in-top');
    writeMaximumRanking();
  }

  document.querySelectorAll('.card').forEach(function (card, index) { // 초반 카드 공개
    setTimeout(function() {
      card.classList.add('flipped');
    }, 1000 + 100 * index);
  });

  setTimeout(function() { // 카드 감추기
    document.querySelectorAll('.card').forEach(function (card) {
      card.classList.remove('flipped');
    });
    clickplag = true;
    startTime = new Date();
    // pushTime3();
  }, 5000);
}

function pushTime3 (){
  $('.nowDate').text('');
  var time = 0;
  var timer = setInterval(function(){
    // var startTime2 = new Date();
    // var successTime = new Date().getSeconds();
    // var successTime3 = Math.ceil(successTime);
    // for(let i = 0; i < 120; i += 1){
      time++
    // }
    $('.nowDate').text(time + '초');
  }, 1000);
}