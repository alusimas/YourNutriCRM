/**
 * @description       : 
 * @author            : aahamjik
 * @group             : 
 * @last modified on  : 02-26-2022
 * @last modified by  : aahamjik
**/
import { LightningElement } from 'lwc';

export default class YN_SHOPPING_LIST extends LightningElement {
    productValue;
    amountValue;

    /*Recoger las recomendaciones y actualizar la lista */

    cleanMessage( cmpName){
        const error=this.template.querySelector(cmpName);
        error.setCustomValidity("");
        error.reportValidity();
    }
    productChangeValue(event){
        this.productValue=event.target.value;
       this.cleanMessage(".productCSS");
    }
    amountChangeValue(event){
        this.amountValue=event.target.value;
        this.cleanMessage(".amountCSS");
    }

    handleClick(){
        
        if(this.productValue!=null && this.productValue!='' && this.amountValue>0){
            let targetDiv=this.template.querySelector(".list");
            let content=document.createTextNode("datos:"+this.productValue+"- "+this.amountValue);
           
            targetDiv.appendChild(content);
            // enviar a Apex
           
        }else{
            if(this.productValue==null || this.productValue=='' ){
                const prodError=this.template.querySelector(".productCSS");
                 prodError.setCustomValidity("Review this data");
                 prodError.reportValidity();
                
            }
            if(this.amountValue<=0 || this.amountValue==null ||this.amountValue==''){
                const amountError=this.template.querySelector(".amountCSS");
                 amountError.setCustomValidity("Review this data");
                 amountError.reportValidity();
                
            }
        }
    }
    
}