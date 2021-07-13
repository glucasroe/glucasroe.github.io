
smoothScroll.init({selector: '.anchor-links',speed: 500,easing: 'easeInOutQuint',updateURL: true,offset: 16});
//Pulled from https://github.com/cferdinandi/smooth-scroll/issues/54 Just in case

document.addEventListener('DOMContentLoaded', function() {
  if (window.location.hash ){smoothScroll.animateScroll(  null, window.location.hash  );}
  if(localStorage.getItem('dark-mode') == 'true'){
    document.body.classList.add('dark-mode');
  }
});

var trigger = document.getElementById('view-toggle');

trigger.addEventListener('click', function () {
  if (localStorage.getItem('dark-mode') === 'true'){
    document.body.classList.remove('dark-mode');
    localStorage.setItem('dark-mode', 'false')
    if(localStorage.getItem('inline-style') === 'true'){
      sheet.deleteRule(0);
      sheet.deleteRule(1);
    }

  }else{
    document.body.classList.add('dark-mode');
    localStorage.setItem('dark-mode', 'true');
  }
});

init();
function init() {
  localStorage.setItem('StorageTest', 'true');
  if(localStorage.getItem('StorageTest') === 'true'){
    trigger.classList.add('visible');
  }
  return;
}
