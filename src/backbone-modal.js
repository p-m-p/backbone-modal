;(function (ns, $) {

  var $window = $(window);

  ns.Backbone.Modal = ns.Backbone.View.extend({

    className: 'bb-modal-overlay',

    events: {
      'click .bb-modal-close': 'close'
    },

    template: _.template([
      '<div class="bb-modal">',
        '<button class="bb-modal-close">',
          '<%= buttonText %>', 
        '</button>',
        '<div class="bb-modal-content"></div>',
      '</div>'
    ].join('')),

    initialize: function (options) {
      var settings = _.extend({buttonText: 'x'}, options);

      this.$el
        .css('display', 'none')
        .append(this.template(settings))
        .appendTo('body');
      this.resize();
      $window.on('resize', this.resize);
    },

    render: function (options) {
      var settings = _.extend({
        width: '320px',
        height: 'auto' 
      }, options);

      this.$('.bb-modal-content').html(this.subject.el);
      this.$('.bb-modal').css(settings);
    },

    open: function (view, settings) {
      if (view) {
        this.subject = view;
        this.render(settings);
      }

      this.$el.fadeIn(150);
    },

    close: function (ev) {
      var canClose = true;

      if (typeof this.subject.beforeModalClase === 'function') {
        canClase = this.subject.beforeModalClose();
      }
      
      if (canClose) {
        this.$el.hide();

        if (typeof this.subject.afterModalClose === 'function') {
          this.subject.afterModalClose();
        }
      }

      if (ev) ev.preventDefault();
    },

    resize: function () {
      this.$el.css({
        width: $window.width(),
        height: $window.height()
      });
    },

    destroy: function () {
      this.$el.remove();
      $window.off('resize', this.resize);
    }
  });

}(this, jQuery || Zepto));
