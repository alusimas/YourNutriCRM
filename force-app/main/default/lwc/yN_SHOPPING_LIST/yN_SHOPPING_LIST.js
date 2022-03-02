/**
 * @description       : 
 * @author            : aahamjik
 * @group             : 
 * @last modified on  : 03-02-2022
 * @last modified by  : aahamjik
**/
import SystemModstamp from '@salesforce/schema/Account.SystemModstamp';
import { LightningElement, wire } from 'lwc';
import insertShoppingList from "@salesforce/apex/YN_ShoppingList.insertList";
import USERID from "@salesforce/user/Id";
import getAccountId from '@salesforce/apex/YN_ShoppingList.getAccountId';
import getUserShoppingLists from '@salesforce/apex/YN_ShoppingList.getUserShoppingLists';
import getSearchListItems from '@salesforce/apex/YN_ShoppingList.getSearchListItems';

export default class YN_SHOPPING_LIST extends LightningElement {
    productValue;
    amountValue;
    checkNewList=false;
    checkExistingList=false;
    listNameValue;
    articlesList =new Array();
    currentUserId;
    currentAccount;
    userShoppingLists;
    selectedListValue;
    chosenValue;
    /*Recoger las recomendaciones y actualizar la lista y actulizar combobox listas*/
    constructor(){
        super();
        this.initialize();
    }
    //initilize the userId variable
    initialize(){
        this.currentUserId=USERID;
        this.userShoppingLists=[];//this will hold key, value pair
        this.selectedListValue='';//initilize combobox
    }

    //get AccountId to 
    @wire(getAccountId,{userId:"$currentUserId"})
    wireAccountId(result){
        this.wireResult=result;
        if(result.data){
            this.currentAccount=result.data.AccountId;
            console.log('acc id:'+this.currentAccount);
        }else if(result.error){
            this.currentAccount=undefined;
            console.log('error en acc id:'+result.error);
        }
    }

    //load all shopping list
   
    handleListChange(event){
        const selectedOption=event.detail.value;
        console.log('selected value=' + selectedOption);
        this.chosenValue = selectedOption;
        this.searchlistItems(selectedOption);

    }
    get selectedValue(){
        console.log('Valor elegido:'+this.chosenValue);
        return this.chosenValue;
    }
    searchlistItems(selectedOption){
        getSearchListItems({listId:selectedOption})
        .then((result)=>{
            this.data=result;
            this.searchItems=this.data;
            console.log('resultado Listas:'+this.searchItems);
            if(this.searchItems){
                //quitar de stringfy
                this.articlesList=JSON.parse(this.data);
                this.printTable();
            }
        })
    }

    newListChangeValue(event){
        this.listNameValue=event.target.value;
        console.log(this.listNameValue);
        
    }

    fillCombobox(){
        getUserShoppingLists({accountId: this.currentAccount})
        .then((result)=>{
            this.data=result;
            this.lists=this.data;
            console.log('resultado Listas:'+this.lists);
            if(this.lists){
                for (let i in this.lists) {
                    this.userShoppingLists =[...this.userShoppingLists, {value:this.lists[i].Id, label: this.lists[i].Name}];
                    
                }
                console.log('userlist:'+this.userShoppingLists);
                
            }
        })
        .catch((error)=>{
            this.error=error;
            this.data=undefined;
            console.debug('Error en Apex'+this.error);
        })
    }
    //getter to return the list
    get optionList(){
        return this.userShoppingLists;
    }



    handleSave(){
        console.log('**nombre lista Nueva:'+this.listNameValue);
        console.log('**ID de la cuenta:'+this.currentAccount);
        console.log('userId'+this.currentUserId);
        console.log('nombre lista existente:'+this.chosenValue);
        if(((this.checkNewList == true && this.listNameValue != '' ) || (this.checkExistingList==true && this.chosenValue)) && (this.articlesList.length !=0)){
            
            let newList;
            if(this.checkNewList){
                newList=true;
            }
             if(this.checkExistingList){
                 newList=false;
             }

            const jsonArraySend=JSON.stringify(this.articlesList);
            console.log('**JSON::'+jsonArraySend);
             console.log('**es nueva lista Boolean:'+this.newList);
            //const patientAccountID='0017Q000006kJDFQA2';
            
            //enviar a apex crear lista
            insertShoppingList({listName: this.listNameValue, Jsonlist:jsonArraySend,accountID:this.currentAccount,newList:newList,listID:this.chosenValue })
            .then((result)=>{
                this.data=result;
                this.isInserted=this.data;
                this.error=undefined;
                console.log('resultado:'+this.isInserted);
                
                if(this.isInserted){

                    console.log('Si se registró:'+this.isInserted);
                    window.alert('Se ha registrado tu lista!! :)');
                    
                }else{
                    console.log('No se registró:'+this.isInserted);
                    window.alert('No se ha registrado tu lista :( ');
                }
            })
            .catch((error)=>{
                this.error=error;
                this.data=undefined;
                console.debug('Error en Apex'+this.error);
            }
            )
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
            this.fillCombobox();
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