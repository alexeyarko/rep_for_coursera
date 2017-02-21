(function () {
'use strict';
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController )
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'shoppingList.html',
  scope: {
    getitems: '<', 
    infoMsg: '<',
    moreThanZerro: '<',
    countItems: '<',
    onRemove: '&'
    }, 
    controller: NarrowItDownController ,
    controllerAs: 'list',
    bindToController: true 
  };
  return ddo;
}

NarrowItDownController .$inject = ['MenuSearchService', '$filter'];
function NarrowItDownController (MenuSearchService, $filter) {
  var menu = this;

 menu.infoMsg = false;
 
 menu.CountFoundItems = function () {
 var countFoundItems = 0;
 countFoundItems = MenuSearchService.getColFoundItems();
 return countFoundItems;
 }
 
 menu.CountMoreThanZerro = function () {
 var rez = 0;
 rez = MenuSearchService.getColFoundItems();
 if (rez > 0) 
 {
 return true;
 }
 else
 {
 return false;
 }
 }
 
menu.searchMenuItems = function () {     
 
if(menu.searchTerm){                   
  var itemWasAdded = false;
  var promise = MenuSearchService.getMatchedMenuItems(); 
   promise
    .then(function (response) {   
  menu.menu_it = response.data.menu_items;               
  MenuSearchService.ClearArray();  
    for (var index = 0; index < menu.menu_it.length; index++) {
            
          var searchTerm = $filter('lowercase')(menu.searchTerm);
          var shortName = $filter('lowercase')(menu.menu_it[index].short_name);
          var name = $filter('lowercase')(menu.menu_it[index].name);
          var description = $filter('lowercase')(menu.menu_it[index].description);

      var vv = function (shortName,name,description) {
           if ((shortName.indexOf(searchTerm) !== -1) ||
              (name.indexOf(searchTerm) !== -1) ||
              (description.indexOf(searchTerm) !== -1))
           {
              return true;
           }
           else
           {
              return false;
           }
           }

      if (vv(shortName,name,description)) {
      itemWasAdded = true;
      MenuSearchService.AddFoundItem(menu.menu_it[index]);
          }
        } 
        if (itemWasAdded == true) {
      menu.infoMsg = false;
        }
        else
        {
      menu.infoMsg = true;
        }       
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");     
  }); 
}
else{                                      
  MenuSearchService.ClearArray();
  menu.infoMsg = true;
  }
  }  
   
   menu.removeItem = function (itemIndex) {
  MenuSearchService.DelFoundItem(itemIndex);
  }

   menu.getItems = function () {
    return MenuSearchService.getFoundItems();
  }
  } 

MenuSearchService.$inject = ['$http', 'ApiBasePath'];

function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var ArrayFoundItems = [];
  
  service.getMatchedMenuItems = function (searchTerm) {     
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    });
    return response;
  }; 
  
  service.getColFoundItems = function () {
  return ArrayFoundItems.length;
  };
  
  service.getFoundItems = function () {
    return ArrayFoundItems;
  };
  
  service.AddFoundItem = function (ind) {
  ArrayFoundItems.push(ind);
  };
  
  service.DelFoundItem = function (ind) {
  ArrayFoundItems.splice(ind, 1);
  };
  
  service.ClearArray = function () {
    ArrayFoundItems = [];
  };
}
})();
