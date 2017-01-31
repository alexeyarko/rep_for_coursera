(function () {
'use strict';

angular.module('MenuCategoriesApp', [])
.controller('MenuCategoriesController', MenuCategoriesController)
.service('MenuCategoriesService', MenuCategoriesService)
.directive('shoppingList', ShoppingListDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function ShoppingListDirective() {
  var ddo = {
    templateUrl: 'shoppingList.html',
    
	scope: {
    items2: '=', 
    onRemove: '&'
    }, 
    controller: ShoppingListDirectiveController,
    controllerAs: 'list',
    bindToController: true 
  };

  return ddo;
}

function ShoppingListDirectiveController() {
  var list = this;

  list.cookiesInList = function () {    
	if (list.items2.length == 0) {
//	console.log("cookiesInList - true");
	return true;
	}
	else
	{
//    console.log("cookiesInList - false");
	return false;
	}
  };
 //////
  list.cookiesInList2 = function () {     

    return true;
  }; 
  
}





 MenuCategoriesController.$inject = ['MenuCategoriesService'];
function MenuCategoriesController(MenuCategoriesService) {
  var menu = this;
 // var i = false;
 menu.foundItems = [];
menu.errorMessage = "";
 menu.CountFoundItems = function () {
 var countFoundItems = 0;
 countFoundItems = MenuCategoriesService.getColFoundItems();
 return countFoundItems;
 }
 
menu.searchMenuItems = function () {   
 
if(menu.searchTerm){                 
  menu.foundItems = [];
  
  var i = false;

  var promise = MenuCategoriesService.getMenuForCategory(); // delete getMenuCategories();
   
   promise
   

  
    .then(function (response) {   
    
	menu.menu_it = response.data.menu_items;        // !!!!!        
	

	 MenuCategoriesService.ClearArray();
                

	 
		for (var index = 0; index < menu.menu_it.length; index++) { 
          var m = menu.menu_it[index].short_name;

		  var vv = function (m) {
           return m.indexOf(menu.searchTerm) !== -1;
           }
		  
		  if (vv(m)) {
 
			i = true;

            menu.foundItems.push(menu.menu_it[index]);

			MenuCategoriesService.AddFoundItem(menu.menu_it[index]);

          }
        } 

        if (i == true) {
		    menu.errorMessage = "";
        
        }
        else
        {
			menu.errorMessage = "Nothing found";
          
        } 		

	
	
	
  })
  .catch(function (error) {
 
  }); 
}
else{                                     
    menu.errorMessage = "Nothing found";
	
	
  }
  }
  


   menu.removeItem = function (itemIndex) {


	MenuCategoriesService.DelItem(itemIndex);
	
	
  }
  
    menu.remLog = function (itemIndex) {
	

  }


  menu.getItems = function () {
    return MenuCategoriesService.getFoundItems();
	

  }
  } 

MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];

function MenuCategoriesService($http, ApiBasePath) {
  var service = this;
  var items = [];
  var foundItems2 = [];

   service.getMenuForCategory = function (searchTerm) {     
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    });
	

    return response;
  }; 
  
  service.getColFoundItems = function () {
	return foundItems2.length;
  };
  
    service.getFoundItems = function () {
    return foundItems2;
  };
  
    service.AddFoundItem = function (ind) {
    var i = ind;
	foundItems2.push(i);

  };
  
    service.DelItem = function (ind) {
    var i = ind;
	foundItems2.splice(ind, 1);

  };
    service.ClearArray = function () {

	foundItems2 = [];

  };
 
}

})();
