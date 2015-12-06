//namespace
$.Tabs = function (el) {
  //el passed in as a HTML element
  //this.$el is the ul
  this.$el = $(el);
  //section
  this.$contentTabs = $(this.$el.data("content-tabs"));
  //article
  this.$activeTab = $(this.$contentTabs.find(".active"));
  this.$el.on('click','a',this.clickTab.bind(this));

};

$.Tabs.prototype.clickTab = function(e) {
  //e.currentTarget is the anchor tag clicked on
  e.preventDefault();

  //remove active from current anchor
  this.$el.find("a").removeClass("active");

  //remove active from prev tab
  this.$activeTab.toggleClass("active").addClass("transitioning");

  //add active to new anchor tag
  $(e.currentTarget).toggleClass("active");

  this.$activeTab.one("transitionend", function() {
    this.$activeTab.removeClass("transitioning");
    //add active to new tab, find takes a selector!
    var tabName = $(e.currentTarget).attr("href");
    this.$activeTab = this.$contentTabs.find(tabName).toggleClass("active");

  }.bind(this))

};

//extends jquery functions
$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};
