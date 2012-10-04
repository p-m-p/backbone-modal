;(function () {

  var env = jasmine.getEnv()
    , report = new jasmine.HtmlReporter
    , view;

  env.addReporter(report);

  view = new (Backbone.View.extend({
    className: 'test-view',
    template: _.template('<p style="background: blue">Hello world!</p>'),
    render: function () { this.$el.html(this.template()); return this; }
  }));

  describe('Create modal and add to DOM', function () {
    var modal = new Backbone.Modal();

    it('should create the modal', function () {
      modal.open(view.render());
      expect(modal.$el.is(':visible')).toBe(true);
      expect(modal.$('p').text()).toEqual('Hello world!');
    });
  });

  env.execute();

}());
