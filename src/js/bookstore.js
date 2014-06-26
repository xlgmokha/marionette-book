var BookStoreApp = new Backbone.Marionette.Application();
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
