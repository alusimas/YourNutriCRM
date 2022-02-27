/**
 * @description       : 
 * @author            : aahamjik
 * @group             : 
 * @last modified on  : 02-27-2022
 * @last modified by  : aahamjik
**/
import { LightningElement } from 'lwc';

export default class YN_SHOPPING_LIST extends LightningElement {
    productValue;
    amountValue;
    checkNewList=false;
    checkExistingList=false;
    listNameValue;
    articlesList =new Array();
    /*Recoger las recomendaciones y actualizar la lista y actulizar combobox listas*/

    handleSave(){
        
        if(((this.checkNewList == true && this.listNameValue != '' ) || this.checkExistingList==true) && (this.articlesList.length !=0)){
            const jsonArraySend=JSON.stringify(this.articlesList);
            console.log('JSON::'+jsonArraySend);
            //enviar a apex crear lista

             //limpiar datos
        }else{
            
            window.alert("Review the form before send");
        }

    }

    onChangeExistingList(){
        this.checkNewList=false;
        if(this.checkExistingList){
            this.checkExistingList=false;
            console.log('IN existing:'+this.checkExistingList);
        }else{
            this.checkExistingList=true;
            console.log('else existing:'+this.checkExistingList);
        }
    }
    onChangeNewList(){
        this.checkExistingList=false;
        if(this.checkNewList){
            this.checkNewList=false;
            
            console.log('IN check New:'+this.checkNewList);
        }else{
            this.checkNewList=true;
            console.log('else check New:'+this.checkNewList);
        }
        console.log('After, check New:'+this.checkNewList);
    }

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

    printTable(){
        //vaciamos la lista
        let targetDiv=this.template.querySelector(".list");
        targetDiv.innerHTML='';
        //encabezado
        let table=document.createElement("table");
        table.setAttribute("class","tableCSS");
        //creo fila encabezado
        let tr=document.createElement("tr");
        //encabezado PRODUCT
        let th=document.createElement("th");
        th.innerText="Product";
        tr.appendChild(th);
         //encabezado AMOUNT
        th=document.createElement("th");
        th.innerText="Amount";
        tr.appendChild(th);
        table.appendChild(tr);

        
        for(const i in this.articlesList){
            let arti=this.articlesList[i];
            console.log(arti.nameProd+"--"+arti.amountProd);
            //fila
             tr=document.createElement("tr");

            //celda articulo
            let td=document.createElement("td");
            td.innerText=arti.nameProd;
            tr.appendChild(td);

            //celda cantidad
            td=document.createElement("td");
            td.innerText=arti.amountProd;
            tr.appendChild(td);
            table.appendChild(tr);
        }
         targetDiv=this.template.querySelector(".list");
          
         targetDiv.appendChild(table);
    }
    handleClick(){
        
        if(this.productValue!=null && this.productValue!='' && this.amountValue>0){
            //guardo en array
            let article={
                nameProd:this.productValue,
                amountProd:this.amountValue
            };
            console.log('arti:'+article.nameProd);
            this.articlesList.push(article);
            console.log('List arti:'+this.articlesList);
            this.printTable();
            //limpiar campos
            this.productValue='';
            this.amountValue='';
            
           
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