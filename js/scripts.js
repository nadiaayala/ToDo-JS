//Create the following modules: UI Controller, List Controller, Controller
var listController = (function () {
    var Item = function (description) {
        this.desc = description;
    };
    var data = [];

    return {
        addItem: function (description) {
            var newItem;
            newItem = new Item(description);
            data.push(newItem);
            console.log(data);
            return newItem;
        }
    }
})();


var UIController = (function() {
    var DOMStrings = {
        inputToDo: '.inputDesc',
        btnAdd: '.create',
        divItems: '.items'

    };
    return {
        getInput: function () {
            return {
                description: document.querySelector(DOMStrings.inputToDo).value,
            }
        },
        getDOMStrings: function () {
            return DOMStrings;

        },
        addListItem: function(input){
            var html, element;
            html = "<div class='novaDiv'><li class='novoElTarefa'>" + input +"</li></div>";
            element = document.querySelector(DOMStrings.divItems);
            element.insertAdjacentHTML('beforeend', html);            
        },
        clearFields: function(){
            document.querySelector(DOMStrings.inputToDo).value = '';
            document.querySelector(DOMStrings.inputToDo).focus();
        }
    }
})();


var controller = (function (listCtrl, UICtrl) {
    var setupEventListeners = function () {
        var DOMStrings = UICtrl.getDOMStrings();
        document.querySelector(DOMStrings.btnAdd).addEventListener('click', ctrlAddItem);
    };

    var ctrlAddItem = function () {
        var input, newItem;
        //1. Get the input field data
        input = UICtrl.getInput();
        if (input.description !== '') {
        //2. Add the item to the budget controller
        //Create a new variable to store the object that is returned from the addItem method
         newItem = listCtrl.addItem(input);
        // //3. Add the item to the UI
        UICtrl.addListItem(input.description);
        // //4. Clear the fields
        UICtrl.clearFields();
        }
    }
    return {
        init: function () {
            console.log('Applicaiton is running.');
            setupEventListeners();
        }

    };
})(listController, UIController);

controller.init();
