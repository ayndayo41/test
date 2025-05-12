try {
  const { ipcRenderer } = require('electron');
  window.ipcRenderer = ipcRenderer;
  window.jQuery = window.$ = require('./js/jquery-3.5.1.min');
} catch(e) {

}

const eventtype = 'click'; // click touchstart

const audioElement = new Audio("sound/button.mp3");
const audioElementClosed = new Audio("sound/close.mp3");

let soudVolume = 0.5;
let panoramaVolume = 0.5;


fetch('config.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    soudVolume = data.soundVolume;
    panoramaVolume = data.panoramaVolume;

    $("audio#sound01").each((i,e) => {
      e.volume = panoramaVolume;
    });
    $("audio#sound02").each((i,e) => {
      e.volume = panoramaVolume;
    });
    $("audio#sound03").each((i,e) => {
      e.volume = panoramaVolume;
    });
    
  });


const clickSound = () => {
  audioElement.currentTime = 0;
  audioElement.volume = soudVolume;
  audioElement.play();
}
const closedSound = () => {
  audioElementClosed.currentTime = 0;
  audioElementClosed.volume = soudVolume;
  audioElementClosed.play();
}
const clickSoundChild = () => {
  window.parent.postMessage({"msg":"clickSound"},'*');
}
window.addEventListener("message", (response) => {
  if(response.data.msg=='clickSound') {
    clickSound();
  }
}) 

$(function(){
  $(window).on('load', () => {
    $("#root").show();
    $("#loading").hide();
    arrowsInit();
  });

  const arrowsInit = () => {
    if($(".arrows").length) {
      const ww = window.innerWidth;
      const sx = window.scrollX;
      if(ww==1920) {
        $(".arrows").show();

        if(sx <= 0) {
          $(".arrows .left").hide();
        } else {
          $(".arrows .left").show();
        }
        if(sx >= 1920 * 2) {
          $(".arrows .right").hide();
        } else {
          $(".arrows .right").show();
        }

      } else {
        $(".arrows").hide();
      }
    }
  }

  $(".arrows .right").on(eventtype, () => {
    clickSound();
    let pos = window.scrollX + 1920;
    if(pos > 1920 * 2) {
      pos=1920 * 2;
    }
    window.scroll({
      left: pos,
      behavior: "smooth",
    });
  });
  $(".arrows .left").on(eventtype, () => {
    clickSound();
    let pos = window.scrollX - 1920;
    if(pos < 0) {
      pos=0;
    }
    window.scroll({
      left: pos,
      behavior: "smooth",
    });
  });
  $(window).on('resize', arrowsInit);
  $(window).on('scroll', arrowsInit);


  // 終了
  let quitcount = 0;
  let quitTimeout = null;
  $(".quitarea").on(eventtype,function(){
    quitcount++;
    if(quitTimeout) {
      clearTimeout(quitTimeout);
    }
    quitTimeout = setTimeout(()=>{
      console.log("clear");
      quitcount = 0;
    },1000);

    if(quitcount >= 5) {
      quitcount=0;
      if(ipcRenderer) {
        ipcRenderer.send('msg', 'quit');
      }
    }
  });
  
  //'click touchstart'

  $(".nav-browser").on(eventtype, () => {
    clickSound();
    if(ipcRenderer) {
      ipcRenderer.send('msg', 'browser');
    }
  })

  $("#saver-top").on(eventtype, () => {
    clickSound();
    console.log("saver-top");
    location.href="seihin1.html";
  })

  $(".nav1-top").on(eventtype, () => {
    clickSound();
    src = 'seihin1.html';
    $("#sub1 iframe").attr('src', src);
  })

  $(".nav1-history").on(eventtype, () => {
    clickSound();
    src = 'history.html';
    $("#sub1 iframe").attr('src', src);
  })

  $(".buttons .history").on(eventtype, () => {
    clickSoundChild();
    src = 'history.html';
    location.href = src;
  })

  $("#btn_go_green").on(eventtype, () => {
    clickSoundChild();
    src = 'environment.html';
    location.href = src;
  });

  $("#factory_mv2").on(eventtype, () => {
    clickSoundChild();
    src = 'environment.html';
    location.href = src;
  });


  $(".btngroup_company").on(eventtype, () => {
    clickSoundChild();
    src = 'company.html';
    location.href = src;
  });

  $(".nav1-product").on(eventtype, () => {
    clickSound();
    src = 'productnew1.html';
    $("#sub1 iframe").attr('src', src);
  })

  $(".buttons .product").on(eventtype, () => {
    clickSoundChild();
    src = 'productnew1.html';
    location.href = src;
  })

  $(".nav1-factory_new").on(eventtype, () => {
    clickSound();
    src = 'factory_new.html';
    $("#sub1 iframe").attr('src', src);
  })

  $(".buttons .nav1-factory_new").on(eventtype, () => {
    clickSoundChild();
    src = 'factory_new.html';
    location.href = src;
  })

  $("#pop-factory").on(eventtype, () => {
    clickSoundChild();
    src = 'factory.html';
    location.href = src;
  })

  $(".nav1-business").on(eventtype, () => {
    clickSound();
    src = 'business.html';
    $("#sub1 iframe").attr('src', src);
  })

  $(".buttons .business").on(eventtype, () => {
    clickSoundChild();
    src = 'business.html';
    location.href = src;
  })

  $(".nav1-ueno1").on(eventtype, () => {
    clickSound();
    src = 'ueno1-mv.html';
    $("#sub1 iframe").attr('src', src);
  })

  $(".nav1-ueno2").on(eventtype, () => {
    clickSound();
    src = 'ueno2-mv.html';
    $("#sub1 iframe").attr('src', src);
  })

  $(".nav1-kagome").on(eventtype, () => {
    clickSound();
    src = 'kagome.html';
    $("#sub1 iframe").attr('src', src);
  })

  $(".nav1-alicebook").on(eventtype, () => {
    clickSound();
    src = 'alicebook.html';
    $("#sub1 iframe").attr('src', src);
  })

  $(".nav1-alice1").on(eventtype, () => {
    clickSound();
    src = 'alice1-mv.html';
    $("#sub1 iframe").attr('src', src);
  })

  $(".nav1-alice2").on(eventtype, () => {
    clickSound();
    src = 'alice2-mv.html';
    $("#sub1 iframe").attr('src', src);
  })

  $(".nav1-360").on(eventtype, () => {
    clickSound();
    src = 'vr.html';
    $("#sub1 iframe").attr('src', src);
  })

  // $("#factory_board_01").on(eventtype, function() {
  //   clickSound();
  //   window.location.href = "vr_tomato.html";
  // });
  // factory_board_01ボタンのクリックイベント変更
  // $("#factory_board_01").on(eventtype, function() {
  //   clickSound();
  //   showInfo('popup_tomato_video');  // 既存のshowInfo関数を使用
  // });
  // $("#factory_board_01").on(eventtype, function() {
  //   clickSound();
  //   showInfo('popup_tomato_video');  // 既存のshowInfo関数を使用
  // });

  // $(document).on(eventtype, '#kagome_vr_tomato', function() {
  //   clickSound();
  //   window.location.href = "vr_tomato.html";
  // });

  // $("#factory_board_02").on(eventtype, function() {
  //   clickSound();
  //   window.location.href = "vr_carrot.html";
  // });

  // $(document).on(eventtype, '#kagome_vr_carrot', function() {
  //   clickSound();
  //   window.location.href = "vr_carrot.html";
  // });

  // $(document).on(eventtype, '#kagome_vr_fujimi', function() {
  //   clickSound();
  //   window.location.href = "vr_fujimi.html";
  // });

  $(".logo").on(eventtype, () => {
    clickSound();
    src = 'top.html';
    location.href = src;
  })


  $(".nav1-360").on(eventtype, () => {
    clickSound();
    src = 'vr.html';
    $("#sub1 iframe").attr('src', src);
  })

  const stopAudios = () => {
    console.log("stopAudios");
    const sounds1 = $("#sub1 iframe")[0].contentWindow.document.querySelectorAll("audio");
    sounds1.forEach((e) => {
      console.log("stopAudios!!");
      e.pause();
    });

  }


  const sub1frameButtonsAction = () =>{
    const flameloc = $("#sub1 iframe")[0].contentWindow.location.href;
    if(flameloc.match(/-mv.html$/)) {
      $('.h-buttons1').toggleClass('hide');
    }
  };


  const sub1frameButtons = (e) =>{
    const flameloc = $("#sub1 iframe")[0].contentWindow.location.href;

    $(".h-buttons1 button").removeClass('active');

    if(flameloc.match(/seihin1.html$/)) {
      $(".h-buttons1 button.nav1-top").addClass('active');
    }
    if(flameloc.match(/history.html$/)) {
      $(".h-buttons1 button.nav1-history").addClass('active');
    }
    if(flameloc.match(/product.html$/)) {
      $(".h-buttons1 button.nav1-product").addClass('active');
    }
    if(flameloc.match(/factory.html$/)) {
      $(".h-buttons1 button.nav1-factory").addClass('active');
    }
    if(flameloc.match(/factory_new.html$/)) {
      $(".h-buttons1 button.nav1-factory_new").addClass('active');
    }
    if(flameloc.match(/business.html$/)) {
      $(".h-buttons1 button.nav1-business").addClass('active');
    }
    if(flameloc.match(/kagome.html$/)) {
      $(".h-buttons1 button.nav1-kagome").addClass('active');
    }
    if(flameloc.match(/ueno1/)) {
      $(".h-buttons1 button.nav1-ueno1").addClass('active');
    }
    if(flameloc.match(/ueno2/)) {
      $(".h-buttons1 button.nav1-ueno2").addClass('active');
    }
    if(flameloc.match(/alicebook/)) {
      $(".h-buttons1 button.nav1-alicebook").addClass('active');
    }
    if(flameloc.match(/alice1/)) {
      $(".h-buttons1 button.nav1-alice1").addClass('active');
    }
    if(flameloc.match(/alice2/)) {
      $(".h-buttons1 button.nav1-alice2").addClass('active');
    }
    if(flameloc.match(/vr.html$/)) {
      $(".h-buttons1 button.nav1-360").addClass('active');
    }

    if(flameloc.match(/vr.html$/)) {
      $('.h-buttons1').removeClass('active');
    } else {
        $('.h-buttons1').addClass('active');

        if(flameloc.match(/-mv.html$/)) {
          $('.h-buttons1').addClass('hide');
    
          $(e.currentTarget).contents().on(eventtype, sub1frameButtonsAction);
        } else {
          $('.h-buttons1').removeClass('hide');
        }
    }
  };

  $("#sub1 iframe").on('load',sub1frameButtons);
  

  $("video.controllable").on(eventtype, () => {
    clickSound();
    $(".videocontroller").addClass('active');
    console.log("videocontroller");
    updateControllerButton();
  });
  $(".videocontroller").on(eventtype, () => {
    clickSound();
    $(".videocontroller").toggleClass('active');
    updateControllerButton();
  });
  $(".videocontroller .rew").on(eventtype, (e) => {
    clickSound();
    e.preventDefault();
    $("video").each((i, e) => {
      e.currentTime -= 10;
    });
    updateControllerButton();
    return false;
  });
  $(".videocontroller .playpause").on(eventtype, (e) => {
    clickSound();
    e.preventDefault();
    $("video").each((i, e) => {
      if(e.paused) {
        e.play();
      } else {
        e.pause();
      }
    });
    updateControllerButton();
    return false;
  });
  $(".videocontroller .ff").on(eventtype, (e) => {
    clickSound();
    e.preventDefault();
    $("video").each((i, e) => {
      e.currentTime += 10;
    });
    updateControllerButton();
    return false;
  });
  const updateControllerButton = (e) => {
    $("video").each((i, e) => {
      if(e.paused) {
        $(".videocontroller .playpause").removeClass('pause');
      } else {
        $(".videocontroller .playpause").addClass('pause');
      }
    });
  }
  

  /*
  $(".nav-360").on(eventtype, () => {
    console.log("saver");
    closeUrl();
    stopMovies();
    $("#screensaver").show();
    $("#screensaver video").each((i,e) => {
      e.play();
    })
  })
  */
  $("#saver-movie01").on(eventtype, () => {
    clickSound();
    $("#screensaver video").each((i,e) => {
      e.src="movie/tomato.mp4";
      e.play();
      $("#cameraRig").attr("rotation", "0 90 0");
    })
    // $("audio").each((i,e) => {
    //   e.pause();
    // });
    // $("audio#sound01").each((i,e) => {
    //   e.play();
    // });
  })
  $("#saver-movie02").on(eventtype, () => {
    clickSound();
    $("#screensaver video").each((i,e) => {
      e.src="movie/track.mp4";
      e.play();
      $("#cameraRig").attr("rotation", "0 90 0");
    })
    // $("audio").each((i,e) => {
    //   e.pause();
    // });
    // $("audio#sound02").each((i,e) => {
    //   e.play();
    // });
  })
  $("#saver-movie03").on(eventtype, () => {
    clickSound();
    $("#screensaver video").each((i,e) => {
      e.src="movie/drone.mp4";
      e.play();
      $("#cameraRig").attr("rotation", "0 90 0");
    })
    // $("audio").each((i,e) => {
    //   e.pause();
    // });
    // $("audio#sound03").each((i,e) => {
    //   e.play();
    // });
  })

  /*  
  $(".nav-kagome").on(eventtype, () => {
    src = 'https://www.kagome.co.jp/';
    showUrl(src,1);
    showUrl(src,2);
    showUrl(src,3);
  })
  $(".nav1-kagome").on(eventtype, () => {
    src = 'https://www.kagome.co.jp/';
    showUrl(src,1);
  })
  */

  /*
  $(".nav-alicebook").on(eventtype, () => {
    src = 'https://www.kagome.co.jp/ftl/ehon/pc/#p=1';
    showUrl(src,1);
    showUrl(src,2);
    showUrl(src,3);
  })
  $(".nav1-alicebook").on(eventtype, () => {
    src = 'https://www.kagome.co.jp/ftl/ehon/pc/#p=1';
    showUrl(src,1);
  })

  $(".nav-alice1").on(eventtype, () => {
    //src = 'https://youtu.be/rd7x7gZghZ8';
    src = 'https://www.youtube.com/embed/rd7x7gZghZ8?si=KKTrGQK7CpJc0YhK&autoplay=1';
    showUrl(src,1);
    showUrl(src,2);
    showUrl(src,3);
  })
  $(".nav1-alice1").on(eventtype, () => {
    //src = 'https://youtu.be/rd7x7gZghZ8';
    src = 'https://www.youtube.com/embed/rd7x7gZghZ8?si=KKTrGQK7CpJc0YhK&autoplay=1';
    showUrl(src,1);
  })

  $(".nav-alice2").on(eventtype, () => {
    //src = 'https://youtu.be/WwFPfeAlbmg';
    src = 'https://www.youtube.com/embed/WwFPfeAlbmg?si=7qvWqjTk5lm1xJ6T&autoplay=1';
    showUrl(src,1);
    showUrl(src,2);
    showUrl(src,3);
  })
  $(".nav1-alice2").on(eventtype, () => {
    //src = 'https://youtu.be/WwFPfeAlbmg';
    src = 'https://www.youtube.com/embed/WwFPfeAlbmg?si=7qvWqjTk5lm1xJ6T&autoplay=1';
    showUrl(src,1);
  })
  */

  function showUrl(src, target) {
    stopMovies();

    let t = '';
    if(target==1) {
      t = '1';
    }
    if(target==3) {
      t = '2';
    }
    if($("#browser" + t).find("iframe") && $("#browser" + t).find("iframe").attr('src') != src) {
      $("#browser" + t).addClass('active');
    } else {
      $("#browser" + t).toggleClass('active');
    }
    $("#browser" + t).find("iframe").remove();
    if($("#browser" + t).hasClass("active")){
      $("#browser" + t).append('<iframe src="' + src + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>')
    }
  }
  function closeUrl() {
    $("#browser").removeClass('active');
    $("#browser").find("iframe").remove();
    $("#browser1").removeClass('active');
    $("#browser1").find("iframe").remove();
    $("#browser2").removeClass('active');
    $("#browser2").find("iframe").remove();
  }


  $("video.content").hide();

  /*
  $(".nav-ueno1").on(eventtype, () => {
    moviePlay("movie/ueno_factory_01.mp4");
  })
  $(".nav-ueno2").on(eventtype, () => {
    moviePlay("movie/ueno_factory_02.mp4");
  })
  */

  function moviePlay(src) {
    closeUrl()

    if($("video.content").is(":visible")) {
      if($(".videos").data("src") != src) {
        $(".videos").data("src", src);
        $("video.content").each((i,e)=>{
          e.src = src;
          e.currentTime =0;
          e.play();
        });
      } else {
        $("video.content").hide();
        $("video.content").each((i,e)=>{e.pause()});
      }
    } else {
      $(".videos").data("src", src);
      $("video.content").show();
      $("video.content").each((i,e)=>{
        if(e.src != src) {
          e.src = src;
        }
        e.currentTime =0;
        e.play();
      });
      $("video.content").each((i,e)=>{
        e.play();
      });
    }

  }
  function stopMovies() {
    $("video.content").hide();
    $("video.content").each((i,e)=>{e.pause()});
  }

  const clickEvent = (e) => {
    //console.log(e);
    //console.log("client : X" + e.clientX + " : Y" + e.clientY);

    const circle = $(`<div class="circle"></div>`); 
    $("#root").append(circle);
    $(circle).css({
      "left": (e.clientX - 25) + "px",
      "top": (e.clientY - 25) + "px",
    }).fadeOut(500, function() { $(this).remove(); });
    
  }

  const touchEvent = (t) => {
    console.log(t.target.tagName);
    if(t.target.tagName=='VIDEO') {
      return true;
    }
    //console.log("client : X" + t.clientX + " : Y" + t.clientY);

    $(t.touches).each((i,e)=>{
      const circle = $(`<div class="circle"></div>`); 
      $("#root").append(circle);
      $(circle).css({
        "left": (e.clientX - 25) + "px",
        "top": (e.clientY - 25) + "px",
      }).fadeOut(500, function() { $(this).remove(); });
    });
  }

  //$("#root").on("click",clickEvent);
  //$("#root").on("touchstart",touchEvent);


  
  $(".history-timeline-click, .history-timeline .clickable").on(eventtype, (e) => {
    clickSound();
    const target = $(e.currentTarget).data('target');
    $(".history-popup." + target).toggleClass('active');
  })
  $(".history-popup").on(eventtype, (e) => {
    $(e.currentTarget).removeClass('active');
    closedSound();
  })


  $(".history-quiz .btn").on(eventtype, (e) => {
    clickSound();
    const target = $(e.currentTarget).data('target');
    $(e.currentTarget).addClass('active');
    $(".history-quiz .quiz." + target).toggleClass('active');
    $(".history-quiz .quiz." + target).removeClass('answer');
  })
  $(".chars .clickable").on(eventtype, (e) => {
    clickSound();
    const target = $(e.currentTarget).data('target');
    if($(".history-quiz .quiz." + target).hasClass('active')) {
      $(".history-quiz .quiz." + target).removeClass('active');
      $(".history-quiz .btn." + target).removeClass('active');
      closedSound();
    } else {
      $(".history-quiz .quiz." + target).addClass('active');
      $(".history-quiz .btn." + target).addClass('active');
    }
    $(".history-quiz .quiz." + target).removeClass('answer');
  })


  $(".history-quiz .quiz .btna").on(eventtype, (e) => {
    clickSound();
    const opacity = getStylePropatyValue(e.currentTarget, 'opacity');
    if(opacity == 1) {
      $(e.currentTarget).parent().addClass('answer');
    }
  });

  $(".history-quiz .quiz .btnc").on(eventtype, (e) => {
    $(e.currentTarget).parent().removeClass('active');
    $(e.currentTarget).parent().removeClass('answer');
    const target = $(e.currentTarget).parent().data('target');
    $(".history-quiz .btn." + target).removeClass('active');
    closedSound();
  });


  let popups = [];

  $(".product-itemline .popupimg").on(eventtype, (e) => {
    clickSound();
    let targetName = $(e.currentTarget).parent('.item').data('popup');
    $(e.currentTarget).parent('.item').children('.popupitem').toggleClass('active');
    $(e.currentTarget).parent('.item').children('.popupitem').find("div").scrollTop(0);
    if(popups[targetName]) {
      clearTimeout(popups[targetName]);
    }
    popups[targetName] = setTimeout(() => {
      $(e.currentTarget).parent('.item').children('.popupitem').removeClass('active');
    }, 1000 * 15);
  });
  $(".product-itemline .popupitem span").on(eventtype, (e) => {
    clickSound();
    $(e.currentTarget).parent('.popupitem').removeClass('active');
  });


  $(".product-quiz .btn").on(eventtype, (e) => {
    clickSound();
    const target = $(e.currentTarget).data('target');
    $(e.currentTarget).addClass('active');
    $(".product-quiz .quiz." + target).toggleClass('active');
    $(".product-quiz .quiz." + target).removeClass('answer');
  })
  $(".chars .clickable").on(eventtype, (e) => {
    clickSound();
    const target = $(e.currentTarget).data('target');
    $(".product-quiz .quiz." + target).toggleClass('active');
    $(".product-quiz .quiz." + target).removeClass('answer');
    $(".product-quiz .btn." + target).toggleClass('active');
  })


  $(".product-quiz .quiz .btna").on(eventtype, (e) => {
    clickSound();
    const opacity = getStylePropatyValue(e.currentTarget, 'opacity');
    if(opacity == 1) {
      $(e.currentTarget).parent().addClass('answer');
    }
  });

  $(".product-quiz .quiz .btnc").on(eventtype, (e) => {
    clickSound();
    $(e.currentTarget).parent().removeClass('active');
    $(e.currentTarget).parent().removeClass('answer');
    const target = $(e.currentTarget).parent().data('target');
    $(".product-quiz .btn." + target).removeClass('active');
  });


  // $(".factory-belt-item .popup-btn").on(eventtype, (e) => {
  //   clickSound();
  //   let targetName = $(e.currentTarget).data('target');
  //   $(e.currentTarget).children('.popupitem').toggleClass('active');
  //   if(popups[targetName]) {
  //     clearTimeout(popups[targetName]);
  //   }
  //   popups[targetName] = setTimeout(() => {
  //     $(e.currentTarget).children('.popupitem').removeClass('active');
  //   }, 1000 * 10);
  // });

  $(".factory-belt-item .popup-btn").on(eventtype, (e) => {
    const popupItem = $(e.currentTarget).children('.popupitem');
    const wasActive = popupItem.hasClass('active');
    
    if (!wasActive) {
      clickSound();
    } else {
      closedSound();
    }
    
    let targetName = $(e.currentTarget).data('target');

    popupItem.toggleClass('active');
    
    if(popups[targetName]) {
      clearTimeout(popups[targetName]);
    }
    popups[targetName] = setTimeout(() => {
      if (popupItem.hasClass('active')) {
        popupItem.removeClass('active');
        closedSound();
      }
    }, 1000 * 10);
  });

  $(".factory-quiz .btn").on(eventtype, (e) => {
    clickSound();
    const target = $(e.currentTarget).data('target');
    if($(".factory-quiz .quiz." + target).hasClass('active')) {
      $(".factory-quiz .quiz." + target).removeClass('active');
      $(".factory-quiz .btn." + target).removeClass('active');
      closedSound();
    } else {
      $(".factory-quiz .quiz." + target).addClass('active');
      $(".factory-quiz .btn." + target).addClass('active');
    }
    $(".factory-quiz .quiz." + target).removeClass('answer');
  })
  $(".chars.factory-quiz-chars .clickable").on(eventtype, (e) => {
    clickSound();
    const target = $(e.currentTarget).data('target');
    if($(".factory-quiz .quiz." + target).hasClass('active')) {
      $(".factory-quiz .quiz." + target).removeClass('active');
      $(".factory-quiz .btn." + target).removeClass('active');
      closedSound();
    } else {
      $(".factory-quiz .quiz." + target).addClass('active');
      $(".factory-quiz .btn." + target).addClass('active');
    }
    $(".factory-quiz .quiz." + target).removeClass('answer');
  })


  $(".factory-quiz .quiz .btna").on(eventtype, (e) => {
    clickSound();
    const opacity = getStylePropatyValue(e.currentTarget, 'opacity');
    if(opacity == 1) {
      $(e.currentTarget).parent().addClass('answer');
    }
  });

  $(".factory-quiz .quiz .btnc").on(eventtype, (e) => {
    $(e.currentTarget).parent().removeClass('active');
    $(e.currentTarget).parent().removeClass('answer');
    const target = $(e.currentTarget).parent().data('target');
    $(".factory-quiz .btn." + target).removeClass('active');
    closedSound();
  });


  $(".business-panels .panel .headline,.business-panels .panel .small").on(eventtype, (e) => {
    clickSound();
    const target = $(e.currentTarget).data('target');

    $("." + target).addClass('hide');
    $("." + target + ".quiz").removeClass('active');
    $("." + target + ".btn").removeClass('active');

    $(e.currentTarget).parents('.business-panels').children('.panel').removeClass('active');
    $(e.currentTarget).parents('.business-panels').children('.panel').addClass('inactive');
    $(e.currentTarget).parents('.panel').addClass('active');
    $(e.currentTarget).parents('.panel').removeClass('inactive');
    $(e.currentTarget).parents('.panel').find(' .main .textarea').scrollTop(0);

  })
  /*
  $(".business-panels .panel .main").on(eventtype, (e) => {
    e.preventDefault();
    return false;
  });
  */

  $(".business-panels .panel .close").on(eventtype, (e) => {
    e.preventDefault();
    closedSound();
    console.log("close!");
    const target = $(e.currentTarget).parents('.panel').data('target');
    console.log(target);
    $("." + target).removeClass('hide');

    $(e.currentTarget).parents('.business-panels').children('.panel').removeClass('active');
    $(e.currentTarget).parents('.business-panels').children('.panel').removeClass('inactive');
    return false;
  });

  $(".business-panels .panel .clickable").on(eventtype, (e) => {
    clickSound();
    const target = $(e.currentTarget).data('target');
    $(e.currentTarget).parent().children(".main").removeClass('active');
    $(e.currentTarget).parent().children(".main.main-" + target).addClass('active');
    $(e.currentTarget).parent().children(".main.main-" + target).find(".textarea").scrollTop(0);
    $(e.currentTarget).parent().children(".clickable").removeClass('active');
    $(e.currentTarget).addClass('active');

  });


  $(".business-quiz .btn").on(eventtype, (e) => {
    if($(e.currentTarget).hasClass('hide')) {
      return;
    }
    clickSound();
    const target = $(e.currentTarget).data('target');
    if($(".business-quiz .quiz." + target).hasClass('active')) {
      $(".business-quiz .quiz." + target).removeClass('active');
      $(".business-quiz .btn." + target).removeClass('active');
    } else {
      $(".business-quiz .quiz." + target).addClass('active');
      $(".business-quiz .btn." + target).addClass('active');
    }
    $(".business-quiz .quiz." + target).removeClass('answer');
  })
  $(".chars.business-quiz-chars .clickable").on(eventtype, (e) => {
    clickSound();
    const target = $(e.currentTarget).data('target');
    if($(".business-quiz .quiz." + target).hasClass('active')) {
      $(".business-quiz .quiz." + target).removeClass('active');
      $(".business-quiz .btn." + target).removeClass('active');
    } else {
      $(".business-quiz .quiz." + target).addClass('active');
      $(".business-quiz .btn." + target).addClass('active');
    }
    $(".business-quiz .quiz." + target).removeClass('answer');
  })


  $(".business-quiz .quiz .btna").on(eventtype, (e) => {
    clickSound();
    const opacity = getStylePropatyValue(e.currentTarget, 'opacity');
    if(opacity == 1) {
      $(e.currentTarget).parent().addClass('answer');
    }
  });

  $(".business-quiz .quiz .btnc").on(eventtype, (e) => {
    closedSound();
    $(e.currentTarget).parent().removeClass('active');
    $(e.currentTarget).parent().removeClass('answer');
    const target = $(e.currentTarget).parent().data('target');
    $(".business-quiz .btn." + target).removeClass('active');
  });


  // // スクリーンセーバー
  // const screensaver = () => {
  //   src = 'shouhin1.html';
  //   $("#sub1 iframe").attr('src', src);
  //   $("#sub1").addClass('active');

  //   $('.h-buttons1').removeClass('active');

  // }
  // // 10分間何も操作がなければスクリーンセーバーを起動
  // let screensaverTimeout = null;
  // $(window).on('load', () => {
  //   screensaverTimeout = setTimeout(screensaver, 1000 * 60 * 10);
  // });
  // // 何か操作があれば、スクリーンセーバーを解除
  // $(window).on(eventtype, () => {
  //   console.log("clear screensaver");
  //   clearTimeout(screensaverTimeout);
  //   screensaverTimeout = setTimeout(screensaver, 1000 * 60 * 10);
  // });

  function getStylePropatyValue(element, propaty) {
    // 指定した要素のcssプロパティ一覧を取得
    const cssStyleDeclaration = getComputedStyle(element, null);
    const getStyleValue = cssStyleDeclaration.getPropertyValue(propaty);
    return getStyleValue;
  }
})


// document.addEventListener("visibilitychange", function () {
//   if (document.visibilityState === "hidden") {
//     // ページが非表示になった場合
//     console.log("hidden");
//     src = 'sleep.html';
//     $("#sub1 iframe").attr('src', src);
//     clearTimeout(screensaverTimeout);
//   } else if (document.visibilityState === "visible") {
//     // ページが再表示された場合
//     console.log("visible");
//     src = 'seihin1.html';
//     $("#sub1 iframe").attr('src', src);
//     screensaverTimeout = setTimeout(screensaver, 1000 * 60 * 10);
//   }
// });

// 2025/03/05 asakura gyro2 start ---
document.addEventListener('DOMContentLoaded', function() {
  // iOSのジャイロセンサー許可を明示的に要求
  const requestDeviceOrientation = function() {
    if (typeof DeviceOrientationEvent !== 'undefined' && 
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      // iOS 13+
      DeviceOrientationEvent.requestPermission()
        .then(function(state) {
          if (state === 'granted') {
            console.log('Device orientation permission granted');
            // ビデオの再生を確実に開始
            document.querySelector('#video').play();
          } else {
            console.error('Device orientation permission denied');
          }
        })
        .catch(console.error);
    } else {
      console.log('DeviceOrientationEvent.requestPermission not available');
    }
  };
  
  // ページロード時や任意のボタンクリック時に許可を要求
  document.body.addEventListener('click', requestDeviceOrientation, { once: true });
  
  // 各ボタンにイベントリスナーを追加
  document.querySelectorAll('.buttons button').forEach(function(button) {
    button.addEventListener('click', function() {
      // ビデオの再生を確実に開始
      document.querySelector('#video').play();
    });
  });

  // video-controlsの自動非表示機能
  const videoControls = document.getElementById('video-controls');
  const screensaver = document.getElementById('screensaver');
  const video = document.getElementById('video');
  
  let controlsTimeout;
  const HIDE_DELAY = 2500; // 2.5秒後に非表示
  
  // 初期状態では表示
  // videoControls.style.opacity = '1';
  videoControls.classList.add("show_ctrl");
  
  // コントロールを非表示にする関数
  function hideControls() {
    // videoControls.style.opacity = '0';
    videoControls.classList.add("hide_ctrl");
  }
  
  // コントロールを表示する関数
  function showControls() {
    // videoControls.style.opacity = '1';
    videoControls.classList.remove("hide_ctrl");
    
    // 既存のタイマーをクリア
    clearTimeout(controlsTimeout);
    
    // 新しいタイマーをセット
    controlsTimeout = setTimeout(hideControls, HIDE_DELAY);
  }
  
  // 画面タッチでコントロールの表示/非表示を切り替え
  screensaver.addEventListener('click', function(e) {
    // コントロール自体がクリックされた場合は、処理をスキップ
    if (e.target.closest('#video-controls')) {
      return;
    }
    
    if (videoControls.style.opacity === '0') {
      showControls();
    } else {
      hideControls();
    }
  });
  
  // マウス移動でコントロールを表示
  screensaver.addEventListener('mousemove', function() {
    showControls();
  });
  
  // タッチ開始でもコントロールを表示
  screensaver.addEventListener('touchstart', function(e) {
    // コントロール自体がタッチされた場合は、処理をスキップ
    if (e.target.closest('#video-controls')) {
      return;
    }
    showControls();
  });
  
  // コントロール上にマウスがある場合は非表示にしない
  videoControls.addEventListener('mouseenter', function() {
    clearTimeout(controlsTimeout);
  });
  
  // コントロールからマウスが離れたら非表示タイマーを開始
  videoControls.addEventListener('mouseleave', function() {
    controlsTimeout = setTimeout(hideControls, HIDE_DELAY);
  });
  
  // ビデオ再生開始時にタイマーを開始
  video.addEventListener('play', function() {
    controlsTimeout = setTimeout(hideControls, HIDE_DELAY);
  });
  
  // 初期表示後のタイマー開始
  controlsTimeout = setTimeout(hideControls, HIDE_DELAY);
});
// 2025/03/05 asakura gyro2 end ---