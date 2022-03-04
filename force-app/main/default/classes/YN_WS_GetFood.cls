/**
 * @description       : 
 * @author            : aahamjik
 * @group             : 
 * @last modified on  : 02-19-2022
 * @last modified by  : aahamjik
**/
public with sharing class YN_WS_GetFood {
    
    
    @AuraEnabled(cacheable=true)
    public static String  getFoods(String food) {
        String objetoFood='';
        //String parameterFood=food;
        String foodS=food.replace(' ', '-');
        System.debug('food:'+foodS);
        Http http= new Http();
        //create request
        HttpRequest request = new HttpRequest();
        String urlWS = 'https://api.edamam.com/api/food-database/v2/parser?';
        String username='app_id=1732ac5e&app';
        String password='&app_key=57d636dfdb3c164c44be1c547f6e7494&';
        String parameterFood='ingr='+foodS;
        request.setEndpoint(urlWS + username + password + parameterFood );
        request.setMethod('GET');
        System.debug('URL:'+urlWS + parameterFood);
        //create response
        HttpResponse response = http.send(request);
        
        if(response.getStatusCode()== 200){
            System.debug('Status code 200');
            Map<String, Object> myJson = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            System.debug('myJson'+myJson);
            List<Object> resultslist = (List<Object>)myJson.get('hints');
            List<Object> myOBJ=new List<Object>();
            for(Object mapa:resultslist){
                Map<String,Object> tempMap = (Map<String,Object>)mapa;
                Object ob=tempMap.get('food');
                myOBJ.add(ob);
               
              
            }
          System.debug('List:'+myOBJ);
          Integer cont=0;
          for(Object o:myOBJ){
            String s=o.toString()+'';
            System.debug('contador:'+cont);
            System.debug(s);
            cont++;
            /**Split para sacar los datos  */
          }
         if(myOBJ!=null || !myOBJ.isEmpty()){
              objetoFood=myOBJ.get(0)+'';
              objetoFood=objetoFood.remove('{');
              objetoFood=objetoFood.remove('}');
              objetoFood=objetoFood.remove('nutrients=');
              objetoFood=objetoFood.replaceAll('=', '":"');
              objetoFood=objetoFood.replaceAll(',', '","');
              objetoFood='{"'+objetoFood+'"}';
              objetoFood=objetoFood.replaceAll('\\s', '');
             System.debug('devuelvo:'+objetoFood);
             return objetoFood;
         }

          
        }else{
            System.debug('Status code:'+response.getStatusCode());
            return objetoFood;
        }
        return objetoFood;
    }    
   
}