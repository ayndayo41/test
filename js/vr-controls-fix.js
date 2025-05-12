document.addEventListener('DOMContentLoaded', function() {
  AFRAME.registerComponent('enhanced-look-controls', {
    init: function() {
      // 元のlook-controlsコンポーネントを取得
      var lookControls = this.el.components['look-controls'];
      
      if (lookControls) {
        // 上下の回転制限を変更
        // 垂直方向の制限を緩和（より大きな視野角を許可）
        lookControls.pitchObject.rotation.x = 0;
        
        // タッチイベントの上書き
        this.el.sceneEl.canvas.addEventListener('touchmove', function(evt) {
          if (evt.touches.length === 1) {
            var touch = evt.touches[0];
            var movementY = touch.pageY - (lookControls.touchPrevY || touch.pageY);
            lookControls.touchPrevY = touch.pageY;
            
            lookControls.pitchObject.rotation.x += movementY * 0.004;
            
            // 過度な回転を防ぐための制限（180度近く回転できるように）
            lookControls.pitchObject.rotation.x = Math.max(-Math.PI/2 + 0.01, 
                                                   Math.min(Math.PI/2 - 0.01, 
                                                   lookControls.pitchObject.rotation.x));
          }
        }, { passive: false });
      }
    }
  });
  
  // orbit-controlsコンポーネントの拡張
  var orbitControlsComponent = AFRAME.components['orbit-controls'];
  if (orbitControlsComponent) {
    // スキーマを修正
    var originalSchema = orbitControlsComponent.schema;
    originalSchema.maxPolarAngle = {default: 180}; // モバイルでも180度に設定
  }
});

