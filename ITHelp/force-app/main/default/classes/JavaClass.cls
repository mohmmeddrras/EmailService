public with sharing class JavaClass {

    @AuraEnabled
    public static Boolean updateop(string opportunityId){

        opportunity Opportunity1 = [Select Id,Type,StageName from Opportunity Where Id =:opportunityId];
        if(Opportunity1.StageName=='Closed Won')
            {
              return false;
           }
         else
         {  
          Opportunity1.Type= 'New Customer';
           update(Opportunity1);
          return true;
          }
        
    }
   
}