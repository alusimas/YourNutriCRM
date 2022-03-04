/**
 * @description       : 
 * @author            : aahamjik
 * @group             : 
 * @last modified on  : 03-03-2022
 * @last modified by  : aahamjik
**/
public with sharing class YN_PlanDiet {

    @AuraEnabled(cacheable=true)
    public static String getOpenOpportunity(String userId){
        System.debug('S user:'+userId);
         User user=null;
        // //Opportunity planDiet=null;
        // try {
             user=[Select Id, AccountId from User where id=:userId limit 1 ];
        //     System.debug('user:'+user);
         Opportunity planDiet=[Select Id,Name, Weigh__c,Height__c, IMC__c,Excercise_plan__c, Food_plan__c from Opportunity where AccountId =:user.AccountId and IsClosed =false Limit 1];
            System.debug('plan'+planDiet);
        // } catch (Exception e) {
        //     System.debug('msg'+e.getMessage());
        // }
         String s=JSON.serialize('s'+planDiet);
         System.debug('p:'+s);
         
        return s;
    }
}