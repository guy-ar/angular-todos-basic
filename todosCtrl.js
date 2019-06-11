app.controller("todosCtrl", function($scope){

    $scope.todoArr = [];
    function Todo(text, done) {
        this.text = text;
        this.done = done;
    }


    $scope.todoArr.push(new Todo("Learn Angular", false));
    $scope.todoArr.push(new Todo("Take Noa homer", true));

    
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
    }

    $scope.removeAll = function() {
        $scope.todoArr = [];
    }
});