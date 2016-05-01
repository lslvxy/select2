/**
 * Created by lise on 2016/4/29.
 */
define([
  'jquery',
  '../utils'
], function ($, Utils) {
  function Footer() {
  }

  Footer.prototype.render = function (decorated) {
    var $rendered = decorated.call(this);

    var $footer = $(
      '<span class="select2-search select2-search--dropdown cui-btn pull-right" style="cursor: pointer;">' +
      '<i class="glyphicon glyphicon-plus">新增</i>' +
      '</span>'
    );

    $rendered.append($footer);
    this.$footer = $footer;
    return $rendered;
  };

  Footer.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    this.$footer.on('click', function (evt) {
      self.trigger('click', evt);
      self.options.options.footerCallback && self.options.options.footerCallback();
    });
 };
  return Footer;
});
