//namespace
$.Tabs = function (el) {
  //el passed in as a HTML element
  this.$el = $(el);
  this.$contentTabs = $(this.$el.data("content-tabs"));
  this.$activeTab = $(this.$contentTabs.find(".active"));

  this.$el.on('click','a',this.clickTab.bind(this));

};

$.Tabs.prototype.clickTab = function(e) {

};

//extends jquery functions 
$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};
