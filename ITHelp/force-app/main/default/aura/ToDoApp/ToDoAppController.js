({
    doInit : function(component, event, helper) { 
        
    helper.getdata(component);
    helper.getColumns(component);
 
	},
    

 
    handleRowAction: function (component, event, helper) {
        var action = event.getParam('action');
        switch (action.name) {
            case 'edit':
                helper.editRecord(component, event);
                break;
            case 'delete':
                helper.deleteRecord(component, event);
                break;
            case 'view':
                helper.viewRecord(component, event);
                break;
        }
    },
   
     //Method gets called by onsort action,
    handleSort : function(component,event,helper){
        //Returns the field which has to be sorted
        var sortBy = event.getParam("fieldName");
        //returns the direction of sorting like asc or desc
        var sortDirection = event.getParam("sortDirection");
        //Set the sortBy and SortDirection attributes
        component.set("v.sortBy",sortBy);
        component.set("v.sortDirection",sortDirection);
        // call sortData helper function
        helper.sortData(component,sortBy,sortDirection);
    },
    createRecord : function (component, event, helper) {
        
        helper.savedata(component);
        helper.getdata(component);
        component.set("v.isOpen", false);
         
    
         },
     openModel: function(component, event, helper) {
      // for Display Model,set the "isOpen" attribute to "true"
       component.set("v.isOpen", true);
   },
 
   closeModel: function(component, event, helper) {
      // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
      component.set("v.isOpen", false);
       
   },
})