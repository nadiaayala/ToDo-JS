

var listController = (function () {
    class Item {
        constructor(desc, idValue){
            this.description = desc;
            this.id = idValue;
        }
    }        
    var data = [];

    return {
        addItem: function (description) {
            var newItem, id;
            if (data.length > 0){
                id = data[data.length - 1].id + 1;
            }
            else{
                id = 0;
            }
            newItem = new Item(description, id);
            data.push(newItem);
            return newItem;
        },
        deleteItem: function(id){
            data.splice(data.find(element => element.id == id), 1);
        }
    }
})();


var UIController = (function() {
    var DOMStrings = {
        inputToDo: '.inputDesc',
        btnAdd: '.create',
        divItems: '.items',
        btnDelete: '.delete'

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
        addListItem: function(input, id){
            var html, element;
            html = `<div class='novaDiv' id='${id}'><li class='novoElTarefa'> ${input}</li><button class='delete'> x </button></div>`;
            element = document.querySelector(DOMStrings.divItems);
            element.insertAdjacentHTML('beforeend', html);            
        },
        deleteListItem: function(el){
            var element = el;
            element.remove();
            
        },
        clearFields: function(){
            document.querySelector(DOMStrings.inputToDo).value = '';
            document.querySelector(DOMStrings.inputToDo).focus();
        }
    }
})();


var controller = (function (listCtrl, UICtrl) {
    var setupEventListeners = function () {
        // var deleteBtns = document
        var DOMStrings = UICtrl.getDOMStrings();
        document.querySelector(DOMStrings.btnAdd).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                console.log(' Enter was pressed.');
                ctrlAddItem();
            }
        });

        document.querySelector(DOMStrings.divItems).addEventListener('click', ctrlDeleteItem);
        ;

    };

    var ctrlAddItem = function () {
        var input, newItem;
        //1. Get the input field data
        input = UICtrl.getInput();
        if (input.description !== '') {
        //2. Add the item to the controller
        //Create a new variable to store the object that is returned from the addItem method
        newItem = listCtrl.addItem(input);
        // //3. Add the item to the UI
        UICtrl.addListItem(input.description, newItem.id);
        // //4. Clear the fields
        UICtrl.clearFields();
        }
    };

    var ctrlDeleteItem = function(event){
        let parent, el, id;
        el = event.target.parentNode;
        id = el.getAttribute("id");
        //Remove item from controller
        listCtrl.deleteItem(id);
        //Delete item from UI
        UICtrl.deleteListItem(el);
    };
    return {
        init: function () {
            console.log('Applicaton is running.');
            setupEventListeners();
        }

    };
})(listController, UIController);

controller.init();
