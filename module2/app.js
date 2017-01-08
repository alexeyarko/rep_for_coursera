(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
 var itemAdder = this;
    itemAdder.itemName = "";
    itemAdder.itemQuantity = "";

    itemAdder.addItem = function () {
		ShoppingListCheckOffService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
		itemAdder.itemName = "";
		itemAdder.itemQuantity = "";	
    }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var showList = this;

  showList.toBuyList = ShoppingListCheckOffService.getItemsList1();
  
    showList.CountList1 = function () {
	var count = 0;
	count = ShoppingListCheckOffService.getColItemsList1();
	return count;
  }
    showList.CountList2 = function () {
	var count = 0;
	count = ShoppingListCheckOffService.getColItemsList2();
	return count;
  }
  showList.AddItemToList2 = function (ind) {
    ShoppingListCheckOffService.AddItemToList2(ind);
  }
  showList.AddItemToList1 = function (ind) {
    ShoppingListCheckOffService.AddItemToList1(ind);
  }
  showList.boughtList = ShoppingListCheckOffService.getItemsList2();
}

function ShoppingListCheckOffService() {
  var service = this;
  var to_buy = [
  {
	name: "Milk",
	quantity: "3"
  },
  {
	name: "Donuts",
	quantity: "2"
  },
  {
	name: "Cookies",
	quantity: "12"
  },
  {
	name: "Chocolate",
	quantity: "7"
  },
  {
	name: "Peanut Butter",
	quantity: "4"
  },
  {
	name: "Apple",
	quantity: "8"
  }
  ];
   var bought = [];

  
   service.getColItemsList1 = function () {
    return to_buy.length;
  };
  
   service.getColItemsList2 = function () {
    return bought.length;
  };
  
   service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    to_buy.push(item);
  };

  service.getItemsList1 = function () {
    return to_buy;
  };

  service.getItemsList2 = function () {
    return bought;
  };

  service.AddItemToList2 = function (ind) {
    var i = ind;
	bought.push(to_buy[i]);
	to_buy.splice(ind, 1);
  };

    service.AddItemToList1 = function (ind) {
    var i = ind;
	to_buy.push(bought[i]);
	bought.splice(ind, 1);
  };
  
}

})();
