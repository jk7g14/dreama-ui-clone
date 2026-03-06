// Set up observers to capture all state changes
window.__specLog = [];
window.__specStart = Date.now();

// 1. DOM Mutation Observer - track loading spinners, class changes, new elements
window.__mutObs = new MutationObserver(function(mutations) {
  mutations.forEach(function(m) {
    if (m.type === 'childList' && m.addedNodes.length > 0) {
      m.addedNodes.forEach(function(n) {
        if (n.nodeType === 1) {
          var cls = n.className ? String(n.className).substring(0, 100) : '';
          if (cls.includes('loading') || cls.includes('spinner') || cls.includes('progress') || cls.includes('skeleton') || cls.includes('toast') || cls.includes('modal') || cls.includes('overlay') || cls.includes('reference') || cls.includes('upload')) {
            window.__specLog.push({ t: Date.now() - window.__specStart, type: 'dom-add', tag: n.tagName, cls: cls });
          }
        }
      });
    }
    if (m.type === 'attributes' && m.attributeName === 'class') {
      var el = m.target;
      var cls = String(el.className || '').substring(0, 100);
      if (cls.includes('loading') || cls.includes('active') || cls.includes('visible') || cls.includes('expanded') || cls.includes('collapsed') || cls.includes('enter') || cls.includes('exit') || cls.includes('fade')) {
        window.__specLog.push({ t: Date.now() - window.__specStart, type: 'cls-change', tag: el.tagName, cls: cls });
      }
    }
  });
});
window.__mutObs.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] });

// 2. Network requests (fetch/XHR)
var origFetch = window.fetch;
window.fetch = function() {
  var url = arguments[0];
  if (typeof url === 'object') url = url.url;
  window.__specLog.push({ t: Date.now() - window.__specStart, type: 'fetch', url: String(url).substring(0, 150) });
  return origFetch.apply(this, arguments).then(function(r) {
    window.__specLog.push({ t: Date.now() - window.__specStart, type: 'fetch-done', status: r.status, url: String(url).substring(0, 150) });
    return r;
  });
};

// 3. CSS transition/animation events
document.addEventListener('transitionstart', function(e) {
  var cls = String(e.target.className || '').substring(0, 80);
  window.__specLog.push({ t: Date.now() - window.__specStart, type: 'transition-start', prop: e.propertyName, cls: cls });
}, true);
document.addEventListener('transitionend', function(e) {
  var cls = String(e.target.className || '').substring(0, 80);
  window.__specLog.push({ t: Date.now() - window.__specStart, type: 'transition-end', prop: e.propertyName, cls: cls });
}, true);
document.addEventListener('animationstart', function(e) {
  window.__specLog.push({ t: Date.now() - window.__specStart, type: 'anim-start', name: e.animationName });
}, true);
document.addEventListener('animationend', function(e) {
  window.__specLog.push({ t: Date.now() - window.__specStart, type: 'anim-end', name: e.animationName });
}, true);

"Observers ready: mutation, network, transitions, animations";
