({
   
	convert : function(component, event, helper) {
		
       
        var id = component.get("v.recordId");
        var action = component.get("c.updateop");
        
        action.setParams({
            "opportunityId" : id
        });
        
        action.setCallback(this,
    
            function(response){
                
            	var state = response.getState();
            	if(state === "SUCCESS"){
                  var check = response.getReturnValue();
                    if(check)
                    {
                        var resultsToast = $A.get("e.force:showToast");
                        resultsToast.setParams({
                            "title" : "Success",
                            "message" : "The opportunity was updated.",
                            "type" : "success"
                        });
                        resultsToast.fire();
                        var refreshPageAction = $A.get("e.force:refreshView").fire();
                        var closeModalAction = $A.get("e.force:closeQuickAction").fire();
                    }
                    else{
                        var resultsToast = $A.get("e.force:showToast");
                        resultsToast.setParams({
                            "title" : "Error",
                            "message" : "Cannot update the opportunity is ClosedWon",
                            "type" : "error"
                        });
                         resultsToast.fire();
                        var closeModalAction = $A.get("e.force:closeQuickAction").fire();
                    }

                   
            	}else{
                    //This is a common way to handle possible errors.
                	var errors = response.getError();
                    if(errors){
                        if(errors[0] && errors[0].message){
                            console.log("Error Message: " + errors[0].message);
                        }else{
                            console.log("Unknown error");
                        }
                    }
            	}
        	}
        );
        $A.enqueueAction(action);
	},
    
    cancel : function(component, event, helper){
        $A.get("e.force:closeQuickAction").fire();
    }
    
    
})