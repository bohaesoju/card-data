var auth, displayName, userInfo, photoURL;
let scoreWrap = [];

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCEp7t1natGWVDUypPxsVOuhFS6V1uGtVk",
    authDomain: "awesomeflow-e21fe.firebaseapp.com",
    databaseURL: "https://awesomeflow-e21fe.firebaseio.com",
    projectId: "awesomeflow-e21fe",
    storageBucket: "awesomeflow-e21fe.appspot.com",
    messagingSenderId: "596340068555"
  };

  firebase.initializeApp(config);

  auth = firebase.auth();
  database = firebase.database();
  var authProvider = new firebase.auth.GoogleAuthProvider();

  auth.onAuthStateChanged(function(user){
    if(user){
      //인증성공후
      userInfo = user;
      displayName = userInfo.displayName;
      photoURL = userInfo.photoURL;
      gameStart();
      
    } else {
      auth.signInWithPopup(authProvider);
    }
  });

  function get_memo_list(){
    // var memoRef = database.ref('memos/'+ userInfo.uid );
    var memoRef = database.ref('memos/');
    memoRef.on('child_added' , on_child_added);
    memoRef.on('child_changed' , function(data){
        console.log('changed-data');
        // var key = data.key;
        // var memoData = data.val();
        // var html =
        // "<li class=\"rankingLi\">" +
        //     "<p class=\"title0\">1위</p>" +
        //     "<img class=\"pic\" src=" + photoURL + ">" +
        //     "<p class=\"title1\">" + key + "</p>" +
        //     "<p class=\"title2\">" + memoData + "</p>" +
        // "</li>"
        // $('.rankingUl').append(html);
    });
}

function on_child_added(data){
    // var key = data.key;
    var second = data.val();
    var playerName = second.key;
    var playerScore = second.second;
    scoreWrap.push(second);
    //현재 객체 배열을 정렬
    scoreWrap.sort(function (a, b) { 
        return a.second < b.second ? -1 : a.second > b.second ? 1 : 0;  
    });
    writeMaximumRanking();
    // return playerScore;
    // console.log(second);
    // var txt = memoData.txt;
    // var title = txt.substr(0, txt.indexOf('\n'));
    // var firstTxt = txt.substr(0, 1);
    // var html =
    //     "<li id='"+key+"' class=\"collection-item avatar\" onclick=\"fn_get_data_one(this.id);\" >" +
    //     "<i class=\"material-icons circle red\">" + firstTxt + "</i>" +
    //     "<span class=\"title\">" + title + "</span>" +
    //     "<p class='txt'>" + txt + "<br>" +
    //     "</p>" +
    //     "<a href=\"#!\" onclick=\"fn_delete_data('"+key+"')\" class=\"secondary-content\"><i class=\"material-icons\">grade</i></a>" +
    //     "</li>";

    //     $('.collection').append(html);
    // for(let i = 0; i <= scoreWrap.length; i += 1){
    //     var html =
    //         "<li class=\"rankingLi\">" +
    //             "<p class=\"title0\">1위</p>" +
    //             "<img class=\"pic\" src=" + photoURL + ">" +
    //             "<p class=\"title1\">" + scoreWrap[i].key + "</p>" +
    //             "<p class=\"title2\">" + scoreWrap[i].second + "</p>" +
    //         "</li>"
    //     $('.rankingUl').append(html);
    // }
}

function score_sort(){
    for(let i = 0; i < scoreWrap.length; i += 1){
        var html =
            // console.log(scoreWrap[0].second);
            "<li class=\"rankingLi\">" +
                "<p class=\"title0\">" + [i + 1] + "위</p>" +
                "<img class=\"pic\" src=" + scoreWrap[i].photoURL + ">" +
                "<p class=\"title1\">" + scoreWrap[i].key + "</p>" +
                "<p class=\"title2\">" + scoreWrap[i].second + "초</p>" +
            "</li>";
        $('.rankingUl').append(html);
    }
}

function save_data(){
    // var memoRef = database.ref('memos/'+ userInfo.uid );
    var memoRef = database.ref('memos/');
    // var txt = $(".textarea").val();

    memoRef.push({
        key : displayName,
        second : successTime2,
        photoURL : photoURL
        })

    // if(selectedKey){
    //     var memoRef = database.ref('memos/'+ userInfo.uid + '/' + selectedKey );
    //     memoRef.update({
    //     txt : txt,
    //     createDate : new Date().getTime(),
    //     updateDate : new Date().getTime()
    //     });
    // } else {
    //     memoRef.push({
    //     txt : txt,
    //     createDate : new Date().getTime()
    //     })
    // }
    }   

// 레이어
$('.rankingList').click(function(){
    var $href = $(this).attr('href');
    $('.rankingLi').remove();
    score_sort();
    layer_popup($href);
});
function layer_popup(el){

    var $el = $(el);        //레이어의 id를 $el 변수에 저장
    var isDim = $el.prev().hasClass('dimBg');   //dimmed 레이어를 감지하기 위한 boolean 변수

    isDim ? $('.dim-layer').fadeIn() : $el.fadeIn();

    var $elWidth = ~~($el.outerWidth()),
        $elHeight = ~~($el.outerHeight()),
        docWidth = $(document).width(),
        docHeight = $(document).height();

    // 화면의 중앙에 레이어를 띄운다.
    if ($elHeight < docHeight || $elWidth < docWidth) {
        $el.css({
            marginTop: -$elHeight /2,
            marginLeft: -$elWidth/2
        })
    } else {
        $el.css({top: 0, left: 0});
    }

    $el.find('a.btn-layerClose').click(function(){
        isDim ? $('.dim-layer').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
        return false;
    });

    $('.layer .dimBg').click(function(){
        $('.dim-layer').fadeOut();
        return false;
    });
}

function writeMaximumRanking(){
    $('.maximumRanking span').text('')
    $('.maximumRanking span').text(scoreWrap[0].second + '초');
}

function gameStart(){
    shuffle();
    cardSetting(width, height);
    $('.displayPic').attr("src", photoURL)
    $('.user-name').text(displayName)
    get_memo_list();
}

// writeMaximumRanking();