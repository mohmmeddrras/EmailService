function getdata()
   { 
      
   
   let empdata= document.getElementById('P:PB:FM:PB1:empid').value;
       
         if(empdata.length >9 )
        {
    let thediv= document.getElementById('theDiv');
   thediv.classList.remove('slds-hidden');
   thediv.classList.add('slds-visible');
        }
       
   let q = "Select FirstName,LastName,FederationIdentifier, Designation__c,Supervisor__c,Phone,Email__c from User Where Employee_ID__c = '"+String(empdata)+"'";
   result = sforce.connection.query(String(q));
   records = result.getArray("records"); 
   let q2 = "Select Name from User Where Id = '"+String(records[0].Supervisor__c)+"'";
   result2 = sforce.connection.query(String(q2));
   records2 = result2.getArray("records");
   let phone = document.getElementById('P:PB:FM:PB2:Phone');
   let FName = document.getElementById('P:PB:FM:PB2:FName');
   let LName = document.getElementById('P:PB:FM:PB2:LName');
   let Designation = document.getElementById('P:PB:FM:PB2:Designation');
   let Email = document.getElementById('P:PB:FM:PB2:Email');
   let Supervisor = document.getElementById('P:PB:FM:PB2:Supervisor');
   let FID = document.getElementById('P:PB:FM:PB2:FID');
       
   phone.innerHTML=records[0].Phone;
   FName.innerHTML=records[0].FirstName;
   LName.innerHTML=records[0].LastName;
   Designation.innerHTML=records[0].Designation__c;
   Email.innerHTML=records[0].Email__c;
   Supervisor.innerHTML=records2[0].Name;
   FID.innerHTML=records[0].FederationIdentifier;
   }
    
    function Check()
    { 
     let empdata= document.getElementById('P:PB:FM:PB1:empid').value;
     if(empdata.length < 9 )
         {
       let thediv= document.getElementById('theDiv');
      thediv.classList.remove('slds-visible');
      thediv.classList.add('slds-hidden');
             }
        
        }
    
    function createCase()
    {
      
      let L1C = document.getElementById('P:PB:FM:PB2:L1C');
      let L2C = document.getElementById('P:PB:FM:PB2:L2C');
      let L3C = document.getElementById('P:PB:FM:PB2:L3C');
      let CDescription = document.getElementById('P:PB:FM:PB2:CDescription');
      let Status = document.getElementById('P:PB:FM:PB2:Status');
      let q = "select Id from Group where  Type = 'Queue' AND NAME = 'ITHelpDesk'";
      result = sforce.connection.query(String(q));
      records = result.getArray("records"); 
       var Case = new sforce.SObject("Case");
       Case.L1_Comments__c = L1C.value;
       Case.L2_Comments__c= L2C.value;
       Case.L3_Comments__c=L3C.value;
       Case.Description=CDescription.value;
       Case.Status=Status.value;
       Case.OwnerId=records[0].Id;
       var result = sforce.connection.create([Case]);
       alert(result);
 
  
    }