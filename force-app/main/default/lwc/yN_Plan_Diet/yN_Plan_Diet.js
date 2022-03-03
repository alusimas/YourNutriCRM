/**
 * @description       : 
 * @author            : aahamjik
 * @group             : 
 * @last modified on  : 03-03-2022
 * @last modified by  : aahamjik
**/
import { LightningElement, wire } from 'lwc';
import USERID from "@salesforce/user/Id";
import getOpenOpportunity from "@salesforce/apex/YN_PlanDiet.getOpenOpportunity";
import getAccountId from '@salesforce/apex/YN_ShoppingList.getAccountId';


export default class YN_Plan_Diet extends LightningElement {
    plan;
    weight;
    height;
    imc;
    foodPlan;
    excercisePlan;

    currentUserId;
    jsonPlan;
    planObj={
        Id:"",
        Name:"",
        Weight:"",
        Height:"",
        IMC:"",
        Food_plan:"",
        Excercise_plan:""
    };
    constructor(){
        super();
        this.initialize();
    }

    initialize(){
        this.currentUserId=USERID;
        console.log('id:'+this.currentUserId);
    }

    // //get AccountId to 
    // @wire(getAccountId,{userId:"$currentUserId"})
    // wireAccountId(result){
    //     this.wireResult=result;
    //     if(result.data){
    //         this.plan=result.data.AccountId;
    //         console.log('acc id:'+this.currentAccount);
    //     }else if(result.error){
    //         this.currentAccount=undefined;
    //         console.log('error en acc id:'+result.error);
    //     }
    // }

    @wire(getOpenOpportunity,{userId:"$currentUserId"})
    wireOpportunity(result){
        this.wireResult=result;
        
        if(result.data){
            console.log('ResultData:'+result.data);
            let stringResult=result.data;
            stringResult=stringResult.replace("{","");
            stringResult=stringResult.replace("}","");
            stringResult=stringResult.replaceAll("\"","");
            
            let array=[];
             array=stringResult.split(",");
           for (const key in array) {
               console.log('index:'+array[key]);
               let str=array[key];
               if(str.includes("Id=")){
              let array2=array[key].split("Id=");
              //ID
              this.planObj.Id=array2[1];
              console.log('i:'+this.planObj.Id);
            }
            if(str.includes("Name=")){
                let array2=array[key].split("Name=");
                //ID
                this.planObj.Name=array2[1];
                console.log('i:'+this.planObj.Name);
              }
              if(str.includes("Weigh__c=")){
                let array2=array[key].split("Weigh__c=");
                //ID
                this.planObj.Weight=array2[1];
                console.log('i:'+this.planObj.Weight);
              }
              if(str.includes("Height__c=")){
                let array2=array[key].split("Height__c=");
                //ID
                this.planObj.Height=array2[1];
                console.log('i:'+this.planObj.Height);
              }
              if(str.includes("IMC__c=")){
                let array2=array[key].split("IMC__c=");
                //ID
                this.planObj.IMC=array2[1];
                console.log('i:'+this.planObj.IMC);
              }
              if(str.includes("Food_plan__c=")){
                let array2=array[key].split("Food_plan__c=");
                //ID
                this.planObj.Food_plan=array2[1];
                console.log('i:'+this.planObj.Food_plan);
              }
              if(str.includes("Excercise_plan__c=")){
                let array2=array[key].split("Excercise_plan__c=");
                //ID
                this.planObj.Excercise_plan=array2[1];
                console.log('i:'+this.planObj.Excercise_plan);
              }
               
           }

          
            console.log('obj:'+this.planObj);
            this.plan=this.planObj.Name;
            this.imc=this.planObj.IMC;
            this.weight=this.planObj.Weight;
            this.height=this.planObj.Height;
            this.foodPlan=this.planObj.Food_plan;
            this.excercisePlan=this.planObj.Excercise_plan;
        }else if(result.error){
            console.log('error en acc id:'+result.error);
        }
    }
}