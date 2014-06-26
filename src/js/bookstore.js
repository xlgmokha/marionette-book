BookStoreApp = new Backbone.Marionette.Application();
BookStoreApp.addRegions({
  mainRegion: '#main',
});
BookStoreApp.mainRegion.on('show', function(view) {
  console.log('loaded main region.');
});
BookStoreApp.mainRegion.on('close', function(view) {
  console.log('closing main region.');
});

var BookStoreController = Backbone.Marionette.Controller.extend({
  displayBooks: function() {
    console.log('display books.');
  }
});

var BookStoreRouter = Backbone.Marionette.AppRouter.extend({
  controller: BookStoreController,
  appRoutes: {
    "": "displayBooks"
  }
});

BookStoreApp.addInitializer(function() {
  var controller = new BookStoreController();
  var router = new BookStoreRouter({controller: controller});
  console.log('addInitializer');
});

BookStoreApp.on('initialize:after', function(){
  if (Backbone.history) {
    Backbone.history.start();
  }
  console.log('message from initialize:after method.');
});
BookStoreApp.start();

var BookModel = Backbone.Model.extend({
  defaults: {
    id: "1",
    name: "First",
  }
});

var BookCollection = Backbone.Collection.extend({
  model: BookModel
});

var bookModel = new BookModel();
var bookModel2 = new BookModel({id: "2", name: "second"});
var bookModel3 = new BookModel({id: "3", name: "third"});
var bookCollection = new BookCollection();
bookCollection.add(bookModel);
bookCollection.add(bookModel2);
bookCollection.add(bookModel3);

var BookListView = Marionette.ItemView.extend({
  template: '#books-template'
});
var view = new BookListView({
  collection: bookCollection
});
view.render();

var CategoryView = Backbone.Marionette.ItemView.extend({
  tagName: 'li',
  template: '#categoryTemplate',
});

var CategoriesView = Backbone.Marionette.CollectionView.extend({
  tagName: 'ul',
  className: 'unstyled',
  itemView: CategoryView
});

//var categoriesView = new CategoriesView({collection: categories});
//categoriesView.render();

var CatalogLayout = Backbone.Marionette.LayoutView.extend({
  template: '#CatalogLayout',
  regions: {
    categories: '#categories',
    products: '#products',
    order: '#order',
    book: '#book'
  }
});

var catalogLayout = new CatalogLayout();
BookStoreApp.mainRegion.show(catalogLayout)
catalogLayout.categories.show(new CategoriesView());
//catalogLayout.products.show(new ProductsView());

var HandyView = Backbone.Marionette.ItemView.extend({
  initialize: function(){
    Backbone.Marionette.ItemView.prototype.initialize.apply(this, arguments);
  },
  logMessage: function(message) {
    console.log(message);
  }
});

var BookView = HandyView.extend({
  alertMessage: function(message) {
    alert(message);
  }
});

var bookView = new BookView();
bookView.logMessage('hi');
bookView.alertMessage('bye');

var regionManager = new Marionette.RegionManager();

Books = (function(Backbone, Marionette) {
  'use strict';
  var App = new Marionette.Application();
  
  App.on('initialize:after', function(){
    if (Backbone.history) {
      Backbone.history.start();
    }
  });

  App.startSubApp = function(appName, args){
    var currentApp = App.module(appName);
    if (App.currentApp === currentApp) { return; }

    if (App.currentApp) {
      App.currentApp.stop();
    }

    App.currentApp = currentApp;
    currentApp.start(args);
  };
  return App;
})(Backbone, Backbone.Marionette);

Books.module('CartApp', {
  startWithParent: false,
  define: function(CartApp, App, Backbone, Marionette, $, _){
    'use strict';
    var Router = Backbone.Router.extend({
      routes: {
        "(:category)(/:id)": "init"
      },
      before: function() {
        App.startSubApp('CartApp');
      },
      init: function(category, id) {
        // call cart app controller
      }
    });
    App.addInitializer(function(){
      var router = new Router();
    });
  }
});

Books.module('HistoryApp', {
  startWithParent: false,
  define: function(HistoryApp, App, Backbone, Marionette, $, _) {
    var Router = Backbone.Router.extend({
      routes: {
        'history/orders': 'showHistory',
      },
      before: function(){
        App.startSubApp('HistoryApp');
      },
      showHistory: function(){
        // call history app controller
      }
    });
    App.addInitializer(function(){
      var router = new Router();
    });
  }
});

Books.module('HistoryApp', function(HistoryApp, App) {
  'use strict';

  HistoryApp.Controller = Marionette.Controller.extend({
  });
  HistoryApp.addInitializer(function(args) { 
    HistoryApp.controller = new HistoryApp.Controller();
  });
  HistoryApp.addFinalizer(function(){
    if (HistoryApp.controller) { 
      HistoryApp.controller.close();
      delete HistoryApp.controller;
    }
  });
});
