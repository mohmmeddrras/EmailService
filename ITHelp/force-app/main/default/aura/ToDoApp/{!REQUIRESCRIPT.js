{!REQUIRESCRIPT("/soap/ajax/35.0/connection.js")}
 
  
   var myid ="{!Opportunity.Id}";
   let q = "Select Id,Type,StageName from Opportunity Where Id = '"+String(myid)+"'";
   result = sforce.connection.query(String(q));
   records = result.getArray("records"); 
   var Opportunity1 = new sforce.SObject("Opportunity");
   Opportunity1=records[0];
  if(Opportunity1.StageName=="Closed Won")
 {
   alert("Opportunity is closed won cant change it ");
 }
 else
 {  
    Opportunity1.Type= "New Customer";
    result = sforce.connection.update([Opportunity1]);
    alert("Opportunity has been change to New Customer ");
 }
  window.location.reload();