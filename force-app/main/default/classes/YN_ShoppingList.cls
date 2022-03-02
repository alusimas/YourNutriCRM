/**
 * @description       : 
 * @author            : aahamjik
 * @group             : 
 * @last modified on  : 03-02-2022
 * @last modified by  : aahamjik
**/
public with sharing class YN_ShoppingList {
    
    @AuraEnabled
    public static Boolean insertList(String listName, String Jsonlist, Id accountID, Boolean newList, Id listID){
        System.debug('list name:'+listName+' jsonlist:'+Jsonlist+' accountId:'+accountID);
        Shopping_list__c shoppingList=new Shopping_list__c();
        //insert
        if(newList){
            
        Account acc=[Select Id, Name from Account where id=:accountID limit 1 ];
        System.debug('acc'+acc);
        try{
        
        shoppingList.Account__c=acc.ID;
        shoppingList.YN_Products_to_buy__c=Jsonlist;
        shoppingList.Name=listName;
            
                insert shoppingList;
                return true;
            }catch(Exception e){
                System.debug('msg'+e.getMessage());
                return false;
            }
        }else{
            //update
            try{
            shoppingList.id=listID;
            shoppingList.YN_Products_to_buy__c=Jsonlist;
            update shoppingList;
            return true;
            }catch(Exception e ){
                System.debug('msg'+e.getMessage());
                return false;
            }

        }
        
    }
    @AuraEnabled(cacheable=true)
    public static User getAccountId(String userId){
        User user=null;
        try{
            user=[Select Id, AccountId from User where id=:userId limit 1 ];
        System.debug('acc'+user);
        
        }catch(Exception e){
           System.debug('ex:'+e.getMessage());
        }
        return user;
    }
    @AuraEnabled(cacheable=true)
    public static List<Shopping_list__c> getUserShoppingLists(String accountId){
        List<Shopping_list__c> userLists=null;
        try{
        userLists=[Select Id, Name from Shopping_list__c where Account__c=: accountId ];
        System.debug('ListasAPEx:'+userLists);
        }catch(Exception e){
            System.debug('ex:'+e.getMessage());
        }
        return userLists;
    }
    @AuraEnabled(cacheable=true)
    public static String getSearchListItems(String listId){
        String jsonItems=null;
        try {
            jsonItems=[Select YN_Products_to_buy__c from Shopping_list__c where id=:listId Limit 1].YN_Products_to_buy__c;
            System.debug('Apex list:'+jsonItems);
        } catch (Exception e) {
            System.debug('ex:'+e.getMessage());
        }
        return jsonItems;
    }
}
