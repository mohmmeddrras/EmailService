public without sharing class ToDoList {
    
    @AuraEnabled
    public static void deleteObject(sObject SOBJ){
        Delete SOBJ;
    }
    
     @AuraEnabled
    public static List<ToDo__c> getdata(){
        
       return [SELECT Name,Description__c,ReminderDate__c,DueDate__c FROM ToDo__c];
        
    }
    
     @AuraEnabled
    public static void savedata(string des,date RD , date DD){
       
        ToDo__c td = new ToDo__c();
        
        td.Description__c=des;
        td.ReminderDate__c=RD;
        td.DueDate__c=DD;
       
       insert td;
        
    }

}