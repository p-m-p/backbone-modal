Backbone Modal
===

A light-weight modal made especially for use with Backbone.js. Opens
a modal window that can be styled to fit your application to
display a `view` within the modal content area.

Usage
---
`Backbone.Modal` is just a Backbone View so the usual instantiation applies.
A modal can be initialised with the extra options shown in the example below.
```javascript
var modal, view;

modal = new Backbone.Modal({
    closeButtonText: 'close' // default 'x'
});

view = new Backbone.View({
  // implemenation of a view
});

modal.open(view, { width: '600px'});
```

Methods
---
### `open(view [,options])`
Opens the modal to display `view`. The possible attributes for `options` are 
shown below with there default values.
```javascript
modal.open(view, {
    width: '320px'
  , height: 'auto'
});
```

### `close()`
Closes the modal.
```javascript
modal.close();
```

### `resize()`
Trigger the modal to reset it's size and positioning. This method is also bound
to the resize event of the window.
```javascript
modal.resize();
```

### `destroy()`
Removes the modal from the DOM and kills any event listeners.
```javascript
modal.destroy();
```

Events
---
### `close`
Fires once the modal has been successfully closed.

### `open`
Fires once the modal has been successfully opened.

Hooks
---
The view that is displayed within the modal may implement the 
following hook methods to run at certain times during the modal
windows life cycle.

### `onBeforeModalClose`
This hook allows the view to stop the closing process if, for instance,
further actions from the user are required. To stop the modal from closing
this method should return false. If the modal can close the method
should return true.
```javascript
var view = Backbone.view.extend({
  // blah blah
  onBeforeModalClose: function () {
    var okToClose = true;

    if (this.model.hasChanged()) {
      okToClose = confirm('Are you sure you want to disgard your changes?');
    }

    return okToClose;
  }
});
```

### `afterModalClose`
Runs once the modal has finished closing.

