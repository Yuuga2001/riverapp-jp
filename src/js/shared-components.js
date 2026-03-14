/**
 * 共有コンポーネント（nav / footer）
 * 全ページで読み込み、DOMContentLoaded で注入する。
 * footer のリンクは data-privacy-href / data-contact-href で上書き可能。
 */
(function () {
  'use strict';

  var year = new Date().getFullYear();

  var navHTML =
    '<div class="nav-inner">' +
      '<a href="/" class="nav-logo">riverapp<span>.jp</span></a>' +
      '<ul class="nav-links">' +
        '<li><a href="/#apps">apps</a></li>' +
        '<li><a href="/#about">about</a></li>' +
      '</ul>' +
    '</div>';

  function buildFooterHTML(el) {
    var privacyHref = el.getAttribute('data-privacy-href') || '#';
    var contactHref = el.getAttribute('data-contact-href') || '#';
    return (
      '<span class="footer-left">&copy; ' + year + ' riverapp.jp</span>' +
      '<div class="footer-right">' +
        '<a href="' + privacyHref + '">privacy policy</a>' +
        '<a href="' + contactHref + '">contact</a>' +
      '</div>'
    );
  }

  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.querySelector('nav');
    if (nav && !nav.children.length) {
      nav.innerHTML = navHTML;
    }

    var footer = document.querySelector('footer');
    if (footer && !footer.children.length) {
      footer.innerHTML = buildFooterHTML(footer);
    }
  });
})();
