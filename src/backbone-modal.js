;(function ($, undefined) {

  var $window = $(window);

  /**
   * Backbone Modal is a lightweight view for 
   * rendering your content within a modal window
  */
  Backbone.Modal = Backbone.View.extend({

    className: 'bb-modal-overlay',

    events: {
      'click .bb-modal-close': 'close'
    },

    template: _.template([
      '<div class="bb-modal">',
        '<button class="bb-modal-close">',
          '<%= closeButtonText %>', 
        '</button>',
        '<div class="bb-modal-content"></div>',
      '</div>'
    ].join('')),

    // setup the view and attach any external events
    initialize: function (options) {
      var settings = _.extend({closeButtonText: 'x'}, options);

      this.$el
        .css('display', 'none')
        .append(this.template(settings))
        .appendTo('body');
      this.resize();
      $window.on('resize', _.bind(this.resize, this));

      return this;
    },

    // render the modal and apply any custom css
    render: function (options) {
      var settings = _.extend({
        css: {
          width: '320px',
          height: 'auto' 
        }
      }, options);

      this.$('.bb-modal-content').html(this.subject.el);
      this.$('.bb-modal').css(settings.css);

      return this;
    },

    // open the modal and bring it into view
    open: function (view, settings) {
      var that = this;

      if (view) {
        this.subject = view;
        this.render(settings);
      }

      this.$el.fadeIn(150, function () {
        that.trigger('open');
      });

      return this;
    },

    // close the modal but leave in the dom ready to reopen
    close: function (ev) {
      var canClose = true;

      if (typeof this.subject.beforeModalClase === 'function') {
        canClase = this.subject.beforeModalClose();
      }
      
      if (canClose) {
        this.$el.hide();
        this.trigger('close');

        if (typeof this.subject.afterModalClose === 'function') {
          this.subject.afterModalClose();
        }
      }

      if (ev) ev.preventDefault();
      return this;
    },

    // display a loading overlay over the modal content area
    showLoadingOverlay: function () {
      var $overlay = $('<div class="bb-modal-loading-overlay" />');

      this.$('.bb-modal-content').append($overlay);
      this._killOverlay = function () {
        $overlay.fadeOut(250, function () {
          $overlay.remove();
        });
      };

      return this._killOverlay;
    },

    // remove the loading overlay, don't need to bother with 
    // this if you are removing directly by swapping out the HTML
    removeLoadingOverlay: function () {
      if (typeof this._killOverlay === 'function') {
        this._killOverlay();
      }

      return this;
    },

    // trigger the modal to resize
    resize: function () {
      this.$el.css({
        width: $window.width(),
        height: $window.height()
      });
      this.trigger('resize');
    },

    // destroy the modal and remove all
    // external event listeners
    destroy: function () {
      this.$el.remove();
      $window.off('resize', this.resize);
      this.trigger('destroy');
    }
  });

}(jQuery || Zepto));
