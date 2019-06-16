app.controller("confirmationCtrl", function($scope) {
  $scope.confirmationDialogConfig = {};
  
  $scope.confirmationDialog = function() {
    $scope.confirmationDialogConfig = {
      title: "Caution!!!",
      message: "ToDo is not completed. Are you sure you want to delete?",
      buttons: [{
        label: "Delete",
        action: "delete"
      }]
    };
    $scope.showDialog(true);
  };

  /*
  $scope.multiConfirmationDialog = function() {
    $scope.confirmationDialogConfig = {
      title: "Select Operation...",
      message: "Please select which operation you would like to perform.",
      buttons: [{
        label: "Reset",
        action: "reset"
      }, {
        label: "Delete",
        action: "delete"
      }, {
        label: "Save",
        action: "save"
      }]
    };
    $scope.showDialog(true);
  };
  */

  $scope.executeDialogAction = function(action) {
    if(typeof $scope[action] === "function") {
    		  $scope[action]();
    	}
  };

  
  $scope.delete = function() {
    console.log("Deleting...");
    $scope.showDialog();
  };
  
  
  
  $scope.showDialog = function(flag) {
    jQuery("#confirmation-dialog .modal").modal(flag ? 'show' : 'hide');
  };
});