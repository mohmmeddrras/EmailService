({
    getColumns : function(component) {
        var actions = [
            {label: 'Edit', name: 'edit'},
            {label: 'Delete', name: 'delete'},
            {label: 'View', name: 'view'}
        ];
        component.set('v.columns', [
            {label: "Name", fieldName: "Name", type: 'text' , sortable : true},
            {label: "Description", fieldName: "Description__c", type: 'text'},
            {label: "ReminderDate", fieldName: "ReminderDate__c", type: 'Date', sortable : true},
            {label: "DueDate", fieldName: "DueDate__c", type: 'Date', sortable : true},
            {type: 'action', typeAttributes: { rowActions: actions } } 
        ]);
       
    },
     
    getdata : function(component) {
        var action = component.get("c.getdata");
       
        action.setCallback(this,function(response) {
            console.log('in call back');
            var state = response.getState();
            if (state === "SUCCESS") {
             var resultData = response.getReturnValue();
                component.set("v.data", resultData);
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } 
                else {
                    console.log("Unknown Error");
                }
            }
        });
        $A.enqueueAction(action);
    },
     
    viewRecord : function(component, event) {
        var row = event.getParam('row');
        var recordId = row.Id;
        var navEvt = $A.get("event.force:navigateToSObject");
        navEvt.setParams({
            "recordId": recordId,
            "slideDevName": "detail"
        });
        navEvt.fire();
    },
     
    deleteRecord : function(component, event) {
        var action = event.getParam('action');
        var row = event.getParam('row');
         
        var action = component.get("c.deleteObject");
        action.setParams({
            "SOBJ": row
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS" ) {
                var rows = component.get('v.data');
                var rowIndex = rows.indexOf(row);
                rows.splice(rowIndex, 1);
                component.set('v.data', rows);
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "type": 'success',
                    "message": "The record has been delete successfully."
                    
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
    },
     
    editRecord : function(component, event) {
        var row = event.getParam('row');
        var recordId = row.Id;
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
            "recordId": recordId
        });
        editRecordEvent.fire();
    }, 
     
    sortData : function(component,fieldName,sortDirection){
        var data = component.get("v.data");
        //function to return the value stored in the field
        var key = function(a) { return a[fieldName]; }
        var reverse = sortDirection == 'asc' ? 1: -1;
        
        // to handel number/currency type fields 
        if(fieldName == 'NumberOfEmployees'){ 
            data.sort(function(a,b){
                var a = key(a) ? key(a) : '';
                var b = key(b) ? key(b) : '';
                return reverse * ((a>b) - (b>a));
            }); 
        }
        else{// to handel text type fields 
            data.sort(function(a,b){ 
                var a = key(a) ? key(a).toLowerCase() : '';//To handle null values , uppercase records during sorting
                var b = key(b) ? key(b).toLowerCase() : '';
                return reverse * ((a>b) - (b>a));
            });    
        }
        //set sorted data to accountData attribute
        component.set("v.data",data);
    },
    
     savedata : function(component) {
          var action = component.get("c.savedata");
          var des = component.find("Descriptionid").get("v.value");
          var duedate = component.find("DueDateid").get("v.value");
          var reminderdate = component.find("ReminderDateid").get("v.value");
         
          
         
        action.setParams({
            "des": des,
            "RD" : reminderdate ,
            "DD" : duedate 
        });
        action.setCallback(this,function(response) {
            
            var state = response.getState();
            if (state === "SUCCESS") {
                var toastEvent = $A.get("e.force:showToast");
          toastEvent.setParams({
        "title": "Success!",
          "type": 'success',
        "message": "The record has been successfully created."
              
                });
    toastEvent.fire();
             
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } 
                else {
                    console.log("Unknown Error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    
})