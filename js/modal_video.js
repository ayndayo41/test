$(document).ready(function() {
  // モーダルのHTMLを動的に生成（VR用 / ビデオ用モーダル）
  var modalHtml = `
    <div id="video_modal" class="video_modal">
      <div class="vr_modal_content">
        <button class="modal_close">&times;</button>
        <div class="modal_video_container">
          <iframe id="modal_iframe" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    </div>

    <div id="content_modal" class="video_modal">
      <div class="modal_content">
        <button class="modal_close">&times;</button>
        <div class="modal_video_container">
          <iframe id="modal_content_iframe" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  `;
  
  // bodyの最後にモーダルHTMLを追加
  $('body').append(modalHtml);
  
  // VR（フルスクリーンモーダル）
  $(document).on('click', '#kagome_vr_fujimi', function() {
    clickSoundChild();
    $('#modal_iframe').attr('src', 'vr_fujimi.html');
    $('#video_modal').fadeIn(300);
  });

  $(document).on('click', '#kagome_vr_tomato', function() {
    clickSoundChild();
    $('#modal_iframe').attr('src', 'vr_tomato.html');
    $('#video_modal').fadeIn(300);
  });
  
  $(document).on('click', '#kagome_vr_carrot', function() {
    clickSoundChild();
    $('#modal_iframe').attr('src', 'vr_carrot.html');
    $('#video_modal').fadeIn(300);
  });

  $(document).on('click', '#factory_board_01', function() {
    clickSoundChild();
    $('#modal_iframe').attr('src', 'vr_tomato.html');
    $('#video_modal').fadeIn(300);
  });

  $(document).on('click', '#factory_board_02', function() {
    clickSoundChild();
    $('#modal_iframe').attr('src', 'vr_carrot.html');
    $('#video_modal').fadeIn(300);
  });

  // 通常の動画
  $(document).on('click', '#factory_nasu', function() {
    clickSoundChild();
    $('#modal_content_iframe').attr('src', 'factory_nasu.html');
    $('#content_modal').fadeIn(300);
  });

  $(document).on('click', '#factory_nasu2', function() {
    clickSoundChild();
    $('#modal_content_iframe').attr('src', 'factory_nasu2.html');
    $('#content_modal').fadeIn(300);
  });

  $(document).on('click', '#factory_ibaraki', function() {
    clickSoundChild();
    $('#modal_content_iframe').attr('src', 'factory_ibaraki.html');
    $('#content_modal').fadeIn(300);
  });

  $(document).on('click', '#factory_ibaraki1', function() {
    clickSoundChild();
    $('#modal_content_iframe').attr('src', 'factory_ibaraki1.html');
    $('#content_modal').fadeIn(300);
  });

  $(document).on('click', '#factory_fujimi', function() {
    clickSoundChild();
    $('#modal_content_iframe').attr('src', 'factory_fujimi.html');
    $('#content_modal').fadeIn(300);
  });

  $(document).on('click', '#factory_ueno', function() {
    clickSoundChild();
    $('#modal_content_iframe').attr('src', 'factory_ueno.html');
    $('#content_modal').fadeIn(300);
  });

  $(document).on('click', '#factory_kosakai', function() {
    clickSoundChild();
    $('#modal_content_iframe').attr('src', 'factory_kosakai.html');
    $('#content_modal').fadeIn(300);
  });

  // company.html用
  $(document).on('click', '#company_pop02mv', function() {
    clickSoundChild();
    $('#modal_content_iframe').attr('src', 'company_pop02mv.html');
    $('#content_modal').fadeIn(300);
  });

  $(document).on('click', '#company_pop07mv', function() {
    clickSoundChild();
    $('#modal_content_iframe').attr('src', 'company_pop07mv.html');
    $('#content_modal').fadeIn(300);
  });
  
  // リンク要素のクリック処理
  $(document).on('click', 'a.area02', function(e) {
    e.preventDefault();
    clickSoundChild();

    var targetUrl = $(this).attr('href');

    $('#modal_content_iframe').attr('src', targetUrl);

    $('#content_modal').fadeIn(300);
  });

  // $(document).on('click', '.area01 video', function(e) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   clickSoundChild();
  
  //   const $originalVideo = $(this);
  
  //   // 元動画の再生を止める
  //   this.pause();
  //   this.currentTime = 0; // 動画位置も先頭に戻す
  
  //   // クリック時に自動再生されるのを防ぐために controls 一時削除 → 後で戻す
  //   $originalVideo.removeAttr('controls');
  //   setTimeout(() => {
  //     $originalVideo.attr('controls', true);
  //   }, 500);
  
  //   // ソースとポスターを取得してモーダルに設定
  //   var videoSrc = $originalVideo.attr('src');
  //   var posterSrc = $originalVideo.attr('poster');
  
  //   $('#modal_main_video').attr('src', videoSrc);
  //   $('#modal_main_video').attr('poster', posterSrc);
  
  //   // モーダル表示して再生
  //   $('#main_video_modal').fadeIn(300);
  //   setTimeout(function() {
  //     document.getElementById('modal_main_video').play();
  //   }, 300);
  // });
  
  // 閉じるボタンの処理
  $(document).on('click', '.modal_close', function() {
    closedSound();

    var modal = $(this).closest('.video_modal');
    modal.fadeOut(300);
    
    // モーダル内のメディアをリセット
    setTimeout(function() {
      if (modal.attr('id') === 'video_modal') {
        $('#modal_iframe').attr('src', '');
      } else if (modal.attr('id') === 'main_video_modal') {
        var video = document.getElementById('modal_main_video');
        video.pause();
      } else if (modal.attr('id') === 'content_modal') {
        $('#modal_content_iframe').attr('src', '');
      }
    }, 300);
  });
  
  // モーダル内のコンテンツエリアクリック時のイベント伝播を停止
  $(document).on('click', '.modal_content, .vr_modal_content', function(e) {
    e.stopPropagation();
  });
});