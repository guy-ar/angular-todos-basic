app.controller("todosCtrl", function($scope){

    $scope.stateQuery = -1;
    $scope.todoArr = [];
    // used for error message
    $scope.confirmationDialogConfig = {};
        
   
    function Todo(text, done) {
        this.text = text;
        this.done = done;
    }

    
    $scope.todoArr.push(new Todo("Learn Angular", false));
    $scope.todoArr.push(new Todo("Take Noa homer", true));

    
    
    $scope.setFilterState = function(value) {
        $scope.stateQuery = value;
    }

    $scope.filterByState = function(item){
        if ($scope.stateQuery == -1) {
            // if want to see all entries - return true in anycase
            return true;
        } else {
            return (($scope.stateQuery && item.done) || (!$scope.stateQuery && !item.done))
        }
    }
  

    
    $scope.total = function() {
        console.log("num of entries in array: " + $scope.todoArr.length);
        return $scope.todoArr.length;
    };

    $scope.uncheckedSum = function() {
        let cnt = 0;
        // go over the list and count the items that are still not done
        for(let i=0, len=$scope.todoArr.length; i < len; i++){
            if (!$scope.todoArr[i].done) {
                cnt++;
            }
        }
        return cnt;
        
    }

    $scope.addItem = function() {
        console.log("new task:" + $scope.newItem)
        $scope.todoArr.push(new Todo($scope.newItem, false));  
        $scope.newItem = "";
    }

    $scope.cleanItem = function(item) {
        
        if (!item.done) {
            
            /* try to open modal instead confirmation message 
            // set message and message ind
            if (confirm('ToDo item is not completed. Are you sure you want to delete it?')) {
                // continue to delete it!
            } else {
                return;
            }*/
            // set the message configuration
            $scope.confirmationDialogConfig = {
                title: "Caution!!!",
                message: "ToDo is not completed. Are you sure you want to delete?",
                buttons: [{
                    label: "Delete",
                    action: "deleteItem", 
                    param: item
                }]
            };
            
            $scope.confirmationDialog(item);
        } else {
            $scope.deleteItem(item);
        }
        
    }

    $scope.cleanDoneItems = function() {
        let tempArr = [];
        // go over the list and copy the once that are not yet done
        for(let i=0, len=$scope.todoArr.length; i < len; i++){
            if (!$scope.todoArr[i].done) {
                tempArr.push($scope.todoArr[i]);
            
            }
        }
        // override the todoArr with temp array
        $scope.todoArr = tempArr;
        // reset to show all
        $scope.stateQuery=-1;
    }

    $scope.removeAll = function() {
        $scope.todoArr = [];
        // reset to show all
        $scope.stateQuery=-1;
    }

    // *************************** - related to error message logic

   
    $scope.confirmationDialog = function(item) {
        $scope.showDialog(true);
    };

    $scope.executeDialogAction = function(action, param) {
        if(typeof $scope[action] === "function") {
                  $scope[action](param);
        }
    };
    
      
    $scope.deleteItem = function(item) {
        console.log("Deleting...");
        // hide the modal
        $scope.showDialog();
        // addition for actual delete logic
        // go over the todos and look for the item
        let index = -1;
        for( let i=0, len= $scope.todoArr.length; i<len; i++){
            if ($scope.todoArr[i] == item){
                index = i;
                break;
            }
        }
        if (index == -1) {
            console.error("cleanItem() faied to find item");
            return;
        } else {
            // check if the item is still not done
            
            $scope.todoArr.splice(index, 1);
        }
        // reset to show all
        $scope.stateQuery=-1; 
    };
      
      
      
    $scope.showDialog = function(flag) {
        jQuery("#confirmation-dialog .modal").modal(flag ? 'show' : 'hide');
    };
    
});