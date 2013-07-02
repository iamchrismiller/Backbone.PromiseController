Backbone.PromiseController
===========================

Backbone Promise Based Controller

A Flexible Backbone/Marionette General Purpose Controller

## Getting Started

This library is built on top of Backbone and used with Marionette, providing a Promise based controller solution.


- Example Usage:

```
  var BlogPromiseController = Backbone.PromiseController.extend({

    initialize : function (options,resolve, reject) {
        var model = options.model;

        //Ad-hoc Filtering
        var privacy = options.model.get('privacy');
        if (!privacy) reject(this.getRejection(options));

        var blogs = model.blogs();

        blogs.fetch()
          .then(function() {
            if (blogs.length) {
              resolve(this.getResolution(options,blogs));
            } else {
              reject(this.getRejection(options));
            }
          }.bind(this))
          .fail(function () {
            reject(this.getRejection(options));
          }.bind(this));
      },

      getResolution : function(options, blogs) {
        return {
          user  : options.model,
          collection : blogs
        };
      },

      getRejection : function (options) {
        return {
          user  : options.model,
          collection : null
        };
      }
  });

  var BlogController = new BlogPromiseController({
    model : new Backbone.Model({
        //...
        blogs : function() {
          //...
        }
    })
  });

  controller.then(function(model,collection) {
    //...
  });

  controller.fail(function(model,collection) {
    //...
  });

```

I use this in conjunction with **AyncViewLoader (coming soon)** to load views asynchronously while attaching them to a region on the DOM with a title and a spinner.
This creates a simple, reusable, and testable controller for loading views. Allowing you to keep the business logic out of the view logic.

### Dependencies

- Backbone - v1.0.0+

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using grunt.

## Release History

- 0.1.0 Initial release

## License

Licensed under the MIT license.

## Author

Chris Miller
