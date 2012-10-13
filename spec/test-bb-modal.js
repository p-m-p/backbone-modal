;(function () {

  var env = jasmine.getEnv()
    , $window = $(window)
    , report = new jasmine.HtmlReporter
    , view;

  env.addReporter(report);

  view = new (Backbone.View.extend({
    className: 'test-view',
    template: _.template('<p style="background: blue">Hello world!</p>'),
    render: function () { this.$el.html(this.template()); return this; }
  }));

  describe('Modal life cycle', function () {
    var modal = new Backbone.Modal;

    it('should create the Modal', function () {
      var $modal = $('.bb-modal-overlay');

      // check the overlay
      expect($modal.length).toBe(1);
      expect($modal.width()).toEqual($window.width());
      expect($modal.height()).toEqual($window.height());

      // check the modal contaimer
      expect(modal.$('> .bb-modal').length).toBe(1);
      expect(modal.$('> .bb-modal > .bb-modal-content').length).toBe(1);
      expect(modal.$('> .bb-modal > .bb-modal-close').length).toBe(1);
      expect(modal.$('> .bb-modal > .bb-modal-close').text()).toBe('x');
      expect(modal.$el.is(':hidden')).toBe(true);
    });

    it('should open the Modal to display a view', function () {
      modal.open(view.render());

      // check the modal is displayed and the view is added
      expect(modal.$el.is(':visible')).toBe(true);
      expect(modal.$('p').text()).toEqual('Hello world!');
    });

    it('should close the Modal', function () {
      modal.close();

      expect(modal.$el.is(':hidden')).toBe(true);
    });

    it('should destroy the Modal', function () {
      modal.destroy();

      expect($('.bb-modal-overlay').length).toBe(0);
    });
  });

  describe('Modal Hooks', function () {
    
  });

  env.execute();

}());
