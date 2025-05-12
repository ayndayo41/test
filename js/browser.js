'use strict';
let inputurl = null;
let prev = null;
let next = null;
let reload = null;
let go = null;

window.addEventListener( 'load', function() {
  inputurl = document.getElementById('urlin');

  prev = document.getElementById('prev');
  next = document.getElementById('next');
  reload = document.getElementById('reload');
  go = document.getElementById('go');


  prev.addEventListener('click', () => {
    window.electronAPI.sendNavigation("prev");
  })
  next.addEventListener('click', () => {
    window.electronAPI.sendNavigation("next");
  })
  reload.addEventListener('click', () => {
    window.electronAPI.sendNavigation("reload");
  })

  

  go.addEventListener('click', () => {
    window.electronAPI.sendUrl(inputurl.value);
  })


}, false);
 


function KeyPressed(key) {
  if( key!=13) return;
  inputurl.blur();
  window.electronAPI.sendUrl(inputurl.value);
}


window.electronAPI.onUrl((value) => {
  console.log(value);
  inputurl.value = value;
})
