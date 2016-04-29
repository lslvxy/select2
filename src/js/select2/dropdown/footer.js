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

    var $search = $(
      '<span class="select2-search select2-search--dropdown pull-right" style="cursor: pointer;">' +
      '<i class="glyphicon glyphicon-plus">新增</i>' +
      '</span>'
    );

    $rendered.append($search);
    this.$search = $search;
    return $rendered;
  };

  Footer.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    this.$search.on('click', function (evt) {
      self.trigger('click', evt);
      self._keyUpPrevented = evt.isDefaultPrevented();
      self.options.options.footerCallback && self.options.options.footerCallback();
    });


    container.on('open', function () {
      self.$search.attr('tabindex', 0);

      self.$search.focus();

      window.setTimeout(function () {
        self.$search.focus();
      }, 0);
    });

    container.on('close', function () {
      self.$search.attr('tabindex', -1);

      self.$search.val('');
    });

    container.on('results:all', function (params) {
      if (params.query.term == null || params.query.term === '') {
        var showSearch = self.showSearch(params);

        if (showSearch) {
          self.$searchContainer.removeClass('select2-search--hide');
        } else {
          self.$searchContainer.addClass('select2-search--hide');
        }
      }
    });
  };

  Footer.prototype.handleSearch = function (evt) {
    if (!this._keyUpPrevented) {
      var input = this.$search.val();

      this.trigger('query', {
        term: input
      });
    }

    this._keyUpPrevented = false;
  };

  Footer.prototype.showSearch = function (_, params) {
    return true;
  };

  return Footer;
});
