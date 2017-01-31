(function () {
'use strict';

angular.module('MenuCategoriesApp', [])
.controller('MenuCategoriesController', MenuCategoriesController)
//.controller('NarrowitDownController', NarrowitDownController)
.service('MenuCategoriesService', MenuCategoriesService)
//.directive('foundItems', FoundItemsDirective)
//.constant('ApiBasePath', "http://cours.com:8080/lecture25")
.directive('shoppingList', ShoppingListDirective)

.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

function ShoppingListDirective() {
  var ddo = {
    templateUrl: 'shoppingList.html',
    
	scope: {
    items2: '=', //lecture 29
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

  list.cookiesInList = function () {     // ЕСЛИ ЭЛЕМЕНТЫ НЕ НАЙДЕНЫ!!!!!
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
  list.cookiesInList2 = function () {     // ЕСЛИ ЭЛЕМЕНТЫ НЕ НАЙДЕНЫ!!!!!
	 //console.log('cookiesInList');
/*      for (var i = 0; i < list.items.length; i++) {
      var name = list.items[i].name;
      if (name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }  */
/*     if (items.foundItems.length == 0) {
	return true;
	} */
//	console.log('cookiesInList2');
    return true;
  }; 
  
}



/* function NarrowitDownController(MenuSearchService) {
  var menu = this; 
  
  menu.searchMenuItems = function () {
  menu.items = [];
  if(menu.searchTerm){
    console.log('menu.searchTerm  '+menu.searchTerm)
    var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
    promise.then(function (response) {
      
      console.log('response '+response);
      if(response.length == 0) {
            menu.items = [];
            menu.errorMessage = "Nothing found";
			console.log('menu.errorMessage '+menu.errorMessage);
          } else {
            menu.items = response;
            menu.errorMessage = "";
          }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  else{
    menu.errorMessage = "Nothing found";
  }
};

 menu.removeItem = function (itemIndex) {
    menu.items.splice(itemIndex,1);
  }
}; */

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
 
menu.searchMenuItems = function () {   //КНОПКА НАЖАТА!!!!	 
 
if(menu.searchTerm){                   // ЕСЛИ ПОЛЕ НЕ ПУСТОЕ
  menu.foundItems = [];
  
  var i = false;
console.log("Кнопка нажата и в Поле ввода есть текст!");
  var promise = MenuCategoriesService.getMenuForCategory(); // delete getMenuCategories();
   
   promise
   
    /* .then(function () {
        return MenuCategoriesService.ClearArray();
      })   */ 
  
  
    .then(function (response) {   // ДОБАВИТЬ ПРОВЕРКУ ПУСТОГО МАССИВА!!------------------------------------
    
	menu.menu_it = response.data.menu_items;        // !!!!!        
	
	//console.log("menu.menu_it "+menu.menu_it);   ///  G O O D ! !
	//console.log("menu.menu_it.length "+menu.menu_it.length);  // 219
	 MenuCategoriesService.ClearArray();
                
	console.log("получено записей "+menu.menu_it.length);
	 
		for (var index = 0; index < menu.menu_it.length; index++) { 
          var m = menu.menu_it[index].short_name;
		  //var i = false;
		  var vv = function (m) {
           return m.indexOf(menu.searchTerm) !== -1;
           }
		  
		  if (vv(m)) {
            //console.log("Кнопка нажата и Поле ввода заполнено! Нашли записи!!!!!!");
			i = true;
			//замена
            menu.foundItems.push(menu.menu_it[index]);
			//menu.AddFoundItem(index);
			MenuCategoriesService.AddFoundItem(menu.menu_it[index]);
			//console.log("index "+index); // insert new items !!!
			//console.log(menu.getItems());
			//console.log("m "+m);
			//console.log("vv "+vv(m));
          }
        } 

        if (i == true) {
		    menu.errorMessage = "";
            console.log("i = true. Поле заполнено и Кнопка нажата! Нашли записи!!!!!!");
        }
        else
        {
			menu.errorMessage = "Nothing found";
            console.log("i = false. Поле заполнено и Кнопка нажата! Nothing found!!!!!!!");
        } 		
	//console.log("menu.searchTerm "+menu.searchTerm);
//	console.log("foundItems -------------------"+menu.foundItems.length); //МАССИВ ИЗ РЕЗУЛЬТАТАМИ ФИЛЬТРА
//	console.log("foundItems2 (не очищается!!)--"+MenuCategoriesService.getColFoundItems());
	
	
	
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");     //   Nothing found!
  }); 
}
else{                                      // ЕСЛИ ПОЛЕ ПУСТОЕ
    menu.errorMessage = "Nothing found";
	//если нажата кнопка, то - Nothing found!
	console.log("Поле не заполнено и Кнопка нажата! Nothing found!");  
  }
  }
  
   menu.addItem = function () {
     //menu.foundItems = [];   
   //shoppingList.addItem(list.itemName, list.itemQuantity);
   console.log("add --");
  }
   // ! ! !  О Ш И Б К А ! ! ! ! ! !
   menu.removeItem = function (itemIndex) {
    console.log("delete 1 --"+itemIndex);
    //menu.foundItems.splice(itemIndex,1);
	MenuCategoriesService.DelItem(itemIndex);
	
	
  }
  
    menu.remLog = function (itemIndex) {
    console.log("delete 2 --"+itemIndex);	
	//menu.foundItems.splice(itemIndex,1);
  }
  //замена foundItems
 // menu.getItems = MenuCategoriesService.getFoundItems();
  //showList.boughtList = ShoppingListCheckOffService.getItemsList2();

  menu.getItems = function () {
    return MenuCategoriesService.getFoundItems();
	
	//console.log("delete 2 --"+itemIndex);	
	//menu.foundItems.splice(itemIndex,1);
  }
  } 

// OK!!!
MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];

function MenuCategoriesService($http, ApiBasePath) {
  var service = this;
  var items = [];
  var foundItems2 = [];

   service.getMenuForCategory = function (searchTerm) {     //del par shortName
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    });
	
	 //console.log("items --	"+items); 
     //console.log("response --	"+response); 
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
	//to_buy.splice(ind, 1);
  };
  
    service.DelItem = function (ind) {
    var i = ind;
	foundItems2.splice(ind, 1);
	//to_buy.splice(ind, 1);
  };
    service.ClearArray = function () {
    //var i = ind;
	foundItems2 = [];
//	console.log("Array foundItems2 is empty!!!"); 
  };
 
}

})();
