(function(){

  'use strict';

  var i, len, fragment, observer, disconnectButton, box;

  fragment = document.createDocumentFragment();

  observer = new IntersectionObserver(function(changes) {
    changes.forEach(function(change) {
      console.log(change);
      change.target.textContent = change.intersectionRatio;
    });
  }, {
    // root: ,
    threshold: [
      0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0,
    ],
    rootMargin: '0px',
  });

  disconnectButton = document.getElementById('js-button-disconnect');
  disconnectButton.addEventListener('click', function() {
    var boxes = document.querySelectorAll('.box'),
        i, len;

    for (i = 0, len = boxes.length; i < len; ++i) {
      boxes[i].style.backgroundColor = 'lightgreen';
    }

    observer.disconnect();
  }, false);

  window.observer = observer;

  function onClickBox(event) {
    var el = event.target;

    el.removeEventListener('click', onClickBox, false);
    el.style.backgroundColor = 'lightgreen';

    observer.unobserve(el);
  }

  for (i = 0, len = 10; i < len; ++i) {
    box = document.createElement('div');

    box.id = 'box-' + (i + 1)
    box.setAttribute('data-id', i + 1);
    box.classList.add('box');
    box.style.top = ((i + 1) * 600) + 'px';
    box.style.left = (Math.random() * 400 >> 0) + 'px';

    box.addEventListener('click', onClickBox, false);

    fragment.appendChild(box);

    observer.observe(box);
  }

  document.body.appendChild(fragment);

}());
