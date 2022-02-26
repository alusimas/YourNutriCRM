/**
 * @description       : 
 * @author            : aahamjik
 * @group             : 
 * @last modified on  : 02-19-2022
 * @last modified by  : aahamjik
**/
import { LightningElement } from 'lwc';
import searchMyFood from '@salesforce/apex/YN_WS_GetFood.getFoods';

export default class YN_Show_food extends LightningElement {

    foodValue;
    path;
    foodlabel;
    foodCategory;
    foodCarbo;
    foodKcal;
    foodFat;
    foodFIBTG;
    foodPROCNT;
    show=false;

   changeValue(event){
    this.foodValue=event.target.value;
   
   }
    handleClick(){
        let objetoResultado;
        console.log('He apretado:'+this.foodValue);
        searchMyFood({food: this.foodValue})
        .then((result)=>{
            this.data=result;
            this.listFoodMy=this.data;
            this.error=undefined;
            console.log('aqui2::'+this.listFoodMy);
            objetoResultado=JSON.parse(this.listFoodMy);
            console.log('category:'+objetoResultado.category);
            console.log('categoryLabel:'+objetoResultado.categoryLabel);
            console.log('image:'+objetoResultado.image);
            console.log('label:'+objetoResultado.label);
            console.log('CHOCDF:'+objetoResultado.CHOCDF);
            console.log('ENERC_KCAL:'+objetoResultado.ENERC_KCAL);
            console.log('FAT:'+objetoResultado.FAT);
            console.log('FIBTG:'+objetoResultado.FIBTG);
            console.log('PROCNT:'+objetoResultado.PROCNT);
            this.show=true;
            this.path=objetoResultado.image;
            this.foodlabel=objetoResultado.label;
            this.foodCategory=objetoResultado.category;
            this.foodCarbo=objetoResultado.CHOCDF;
            this.foodKcal=objetoResultado.ENERC_KCAL;
            this.foodFat=objetoResultado.FAT;
            this.foodFIBTG=objetoResultado.FIBTG;
            this.foodPROCNT=objetoResultado.PROCNT;

           
        })
        .catch((error)=>{
            this.error = error;
            this.data = undefined;
        });

    }


}