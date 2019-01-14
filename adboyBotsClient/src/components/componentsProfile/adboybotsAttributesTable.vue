<template>
 <v-layout row wrap >
  <v-flex  xs12   >
    <v-card light color="white"  class="pa-5 elevation-1"  >
        <v-card-title class="title">Attributes <v-btn class="info" small v-on:click="dialogAddCat()">Add category</v-btn></v-card-title>
        <template v-for="(category,categoryIndex) in categories">
          <v-expansion-panel  :key="categoryIndex"   v-model="categories[categoryIndex].panel" expand :id="'category-'+categoryIndex">
            <v-expansion-panel-content style="border-bottom:1px rgba(128,128,128,0.5) solid;">
              <div slot="header"  ><span class="subheading">{{category.categoryName}} </span><span><v-icon v-if="category.categoryIsEditable ==true"  small @click="dialogDeleteCat(categoryIndex)" color="#007bff" class="pl-2">fas fa-trash</v-icon></span></div>
              <v-flex xs12>
                <v-btn class="info" v-if="category.categoryIsEditable ==true" small v-on:click="displayDialogAddAttributes(categoryIndex)">Add attribute</v-btn>
                <v-btn class="info" small v-on:click="addItem(categoryIndex)">Add Item</v-btn>
              </v-flex>
               
                  <v-data-table
                  :headers="categories[categoryIndex].headers"
                  :items="categories[categoryIndex].myRows"
                  pagination.sync ={rowsPerPage:25}
                  class="elevation-1 text-xs-center"
                  :key="categoryIndex"
                  
                  >
                  <template slot="headerCell" slot-scope="props"   >
                      <span   >
                        {{ props.header.text }} <v-icon v-if="isEditable(props.header.text)" v-on:click="displayDialogEditAttributes(props.header.text,categoryIndex)"  style="font-size: 14px; color:#007bff;">fas fa-edit</v-icon>
                      </span>
                    
                  </template>
                  <template slot="items" slot-scope="props"  >
                   
                      <td align="center"  >
                        <v-icon
                          small
                          @click="deleteItem(props.index,categoryIndex)"
                        >
                          delete
                        </v-icon>
                      </td>
                      <template v-for="(header, index) in categories[categoryIndex].headers"  >
                        <td    :key="index" align="center" v-if="isHeader(header.text)"  >
                          <v-edit-dialog
                            lazy
                            
                          > {{ props.item[header.value] }}
                          
                            <v-text-field
                            
                              slot="input"
                              v-model="props.item[header.value]"
                              label="Property value"
                              single-line
                              counter
                              class="pa-3"
                              v-on:change="myRowsOnChange(props.item,header,categoryIndex)"
                             
                            ></v-text-field>
                          
                          </v-edit-dialog>
                        </td>
                        <template v-if="header.text =='Button'">
                          <td    :key="index" align="left"  v-if="categories[categoryIndex].sameButtonAllCategory"  >
                          {{props.item.button}}
                          </td>
                          <td    :key="index" align="left"  v-if="!categories[categoryIndex].sameButtonAllCategory"  >
                          <v-select
                                :items="categories[categoryIndex].buttonList"
                                :item-value="props.item.button"
                                label="Button:"
                                item-text
                                @input="onButtonSelectedIndividually($event,categoryIndex,props.index)"
                            >
                            </v-select>
                          </td>
                        </template>
                      </template>
                      <v-dialog
                          v-model="categories[categoryIndex].dialogConfirmDeleteAttribute"
                          max-width="290"
                          :key="categoryIndex+'-3'"
                        >
                          <v-card>
                          <v-container>
                            <v-layout row wrap>
                              <v-flex xs12>
                              Do you want to delete this Attribute?
                              </v-flex>
                              <v-flex xs6>
                                <v-btn class="info" small @click="closeDialogConfirmDeleteAttribute(categoryIndex)">Cancel</v-btn>
                              
                              </v-flex>
                              <v-flex xs6>
                                <v-btn class="error" small @click="confirmDeleteAttribute(categoryIndex,categories[categoryIndex].posAttributeOnheaders)">Delete</v-btn>
                              </v-flex>
                            </v-layout>
                          </v-container>
                            
                          </v-card>
                        </v-dialog>
                    
                      
                  </template>
                  </v-data-table>
                 <v-dialog
                    v-model="categories[categoryIndex].dialogChangePropertiesAttributes"
                    max-width="290"
                     :key="categoryIndex+'-1'"
                  >
                    <v-card >
                     <v-container>
                      <v-layout row wrap v-if="categories[categoryIndex].myAttributeText !== 'Button'">

                       
                        <v-flex  xs12>
                          <v-text-field
                            label="Attribute Name:"
                            placeholder="type a max of 20 characters"
                            :value="categories[categoryIndex].myAttributeText"
                            @keyup="changeMyAttributeText($event)"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap v-if="categories[categoryIndex].myAttributeText == 'Button'">
                        <v-flex  xs12>
                          <v-checkbox
                            light
                            :label="categories[categoryIndex].labelCheckboxbutton"
                            v-model="categories[categoryIndex].sameButtonAllCategory"
                            color="#007bff"
                          ></v-checkbox>
                        </v-flex>
                        <v-flex v-if="categories[categoryIndex].sameButtonAllCategory" xs12>
                        
                            <v-select
                              :items="categories[categoryIndex].buttonList"
                              :label='categories[categoryIndex].buttonSelected'
                              item-text
                              @input="onButtonSelected($event,categoryIndex)"
                            ></v-select>
                        </v-flex>
                      </v-layout>
                     </v-container>
                      <v-card-actions >
                            <v-spacer></v-spacer>
                            <v-btn class="info" v-if="categories[categoryIndex].myAttributeText !== 'Button'" small @click="hideDialogEditAttributes(categoryIndex)">Cancel</v-btn>
                             <v-btn class="error" v-if="categories[categoryIndex].myAttributeText !== 'Button'" small @click="openDialogConfirmDeleteAttribute(categoryIndex,categories[categoryIndex].myAttributeText)">Delete Attribute</v-btn>
                            <v-btn class="info" v-if="categories[categoryIndex].myAttributeText == 'Button'" small @click="hideDialogEditAttributes(categoryIndex)">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog
                    v-model="categories[categoryIndex].dialogAddNewAttribute"
                    max-width="290"
                    :key="categoryIndex+'-2'"
                  >
                    <v-card>
                     <v-container>
                      <v-layout row wrap>

                       
                        <v-flex xs12>
                          <v-text-field
                            label="Attribute Name:"
                            placeholder="type a max of 20 characters"
                            :value="categories[categoryIndex].myAttributeText"
                            @keyup="addMyAttributeText($event,categoryIndex)"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                     </v-container>
                      <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="info" small @click="displayDialogAddAttributes(categoryIndex)">Cancel</v-btn>
                            <v-btn class="info" small @click="addNewAttribute(categories[categoryIndex].myAttributeText,categoryIndex)">Add Attribute</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                   
                  <v-dialog
                    v-model="categories[categoryIndex].dialogDeleteCategory"
                    max-width="290"
                     :key="categoryIndex+'-4'"
                  >
                    <v-card>
                     <v-container>
                      <v-layout row wrap>
                         <v-flex xs12>
                         Do you want to delete this Category?
                        </v-flex>
                        <v-flex xs6>
                          <v-btn class="info" small @click="dialogDeleteCat(categoryIndex)">Cancel</v-btn>
                         
                        </v-flex>
                        <v-flex xs6>
                          <v-btn class="error" small @click="confirmDeleteCategory(categoryIndex)">Delete</v-btn>
                        </v-flex>
                      </v-layout>
                     </v-container>
                      
                    </v-card>
                  </v-dialog>
                  <v-dialog
                    v-model="dialogAddCategory"
                    max-width="290"
                     :key="categoryIndex+'-5'"
                  >
                    <v-card>
                     <v-container>
                      <v-layout row wrap>
                         <v-flex xs12>
                         <v-text-field
                          v-model="nameNewCategory"
                          :counter="80"
                          label="Name Category"
                          required
                        ></v-text-field>
                        <p v-if="!validateCategoryTitle()" class="text-xs-center" style="color:red;" >It is necessary a valid name and must be unique.</p>
                        </v-flex>
                        <v-flex xs6>
                          <v-btn class="info" small @click="dialogAddCat()">Cancel</v-btn>
                         
                        </v-flex>
                        <v-flex xs6>
                          <template v-if="!validateCategoryTitle()">
                            <v-btn  class="info" small @click="addCategory(nameNewCategory)" disabled>Add</v-btn>
                          </template>
                          <template v-if="validateCategoryTitle()">
                            <v-btn  class="info" small @click="addCategory(nameNewCategory)" >Add</v-btn>
                          </template>
                          
                        </v-flex>
                      </v-layout>
                     </v-container>
                      
                    </v-card>
                  </v-dialog>
                  
             
             </v-expansion-panel-content>
           </v-expansion-panel>
           </template>
    </v-card>
  </v-flex>
   <v-btn
      :color="saveButtonColor"
      key="save-button"
      dark
      fab
      fixed
      bottom
      right
      class="mb-5 mr-5"
      v-on:click="saveCategories()"
  >
      <v-icon>fas fa-save</v-icon>
      <v-icon>close</v-icon>
  </v-btn>    
 </v-layout>
    
</template>

<script>
import axios from 'axios';
  export default {
    
    data () 
    {
      return {
        rules: 
        {
          required: value => !!value || 'Required (At least one character)',
          counter80: value => value.length <= 80 || 'Max 80 characters',

          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        },
        saveButtonColor:"green",
        nameNewCategory:null,
        dialogAddCategory:false,
        categories:null,
        leToken:null,
        fbPgId:null,

      }
    },

    
    created: function () {
        //alert("On mounted Table");
        let leToken = this.$cookie.get('request_adboyBots_token');
        this.$set(this,'leToken',leToken);
        let fbPgId = this.$store.state.currentFbPgId;
        this.$set(this,'fbPgId',fbPgId);
        this.getCategories(fbPgId);


            
        
    },

      
    methods:{
      saveCategories()
          {
              console.log("saving categories..."+JSON.stringify(this.categories));
               this.$set(this,"saveButtonColor","yellow");
              let url ='https://localhost/api/saveCategories'; 
                axios({
                method:'post',
                url:url,
                data:{categories:this.categories,fbPgId:this.fbPgId},
                headers: {'Authorization': `bearer ${this.leToken}`}
                }).then(response => {
                    this.$set(this,"saveButtonColor","green");
                    console.log("response after saving..."+JSON.stringify(response));
                })
                .catch(function (error) {
                    console.log(error);
                });
          },
      getCategories(fbPgId){
          let url = 'https://localhost/api/getChatbot';


        axios({
        method:'get',
        url:url,
        params: {
            fbPgId: fbPgId
        },
        headers: {'Authorization': `bearer ${this.leToken}`}
        })
        .then(chatbot => {
            //console.log("chatbot...getProfileInfo"+JSON.stringify(chatbot));
            //alert("Just about to populate categories");
            this.$set(this,"categories",chatbot.data.categories);
            //alert("this.categories"+this.categories);
        }).catch(function (error) {
            console.log(error);
        });
      },
      validateCategoryTitle(){
        let pos = this.categories.map(function(e) { return e.categoryName; }).indexOf(this.nameNewCategory);
        if(this.nameNewCategory=="")
        {
          return false;
        }
        
        if(this.nameNewCategory !=="" && pos==-1)
        {
          return true;
        }
        
      },
      dialogAddCat(){
          if(this.dialogAddCategory == true)
          {
              this.$set(this,'dialogAddCategory',false);
          }
            
          else
          {
              this.$set(this,'dialogAddCategory',true);
          }
          
      },
      addCategory()
      {
         let categoriesLength = this.categories.length;
         let newCategory =  {
              categoryName:this.nameNewCategory,
              categoryIsEditable:true,
              dialogDeleteCategory:false,
              panel:[true],
              buttonSelected:"Select a button",
              labelCheckboxbutton:"Use same button all category",
              sameButtonAllCategory:true,
              attrEditable:true,
              dialogConfirmDeleteAttribute:false,
              myAttributeText:null,
              posAttributeOnheaders:null,
              dialogAddNewAttribute:false,
              dialogChangePropertiesAttributes: false,
              buttonList:[
                "Send message",
                "Buy Now",
                "Book Now",
                "Get Quote",
                "Pricing",
                "Enquire now",
                "Learn More",
                "Schedule call",
                "Schedule appointment",
                "Request appointment"
              ],
              headers: [
                { text: 'Actions', value: 'actions' ,sortable: false,align:"center"},
                { text: 'Title',value: 'title', sortable: false,align:"left"},
                { text: 'Subtitle', value: 'subtitle', sortable: false ,align:"left"},
                { text: 'Button', value: 'button' , sortable: false,align:"left"},
                { text: 'Image Url', value: 'imageUrl' , sortable: false,align:"left"},
                
              ],
              myRows: [
                {
                  title: 'Title 1',
                  subtitle: 'Subtitle 1',
                  button: "Buy Now!",
                  imageUrl:"http://www.example.com/image.png"
                }
              ]
          }
         this.categories.push(newCategory);
         this.$set(this,'dialogAddCategory',false);
         this.$set(this,'nameNewCategory',"");
         this.saveCategories();
         let categoryTogo ="#category-"+(categoriesLength-1); 
         this.$vuetify.goTo(categoryTogo,{ offset: -300 });
         
      },
      confirmDeleteCategory(categoryIndex){
        this.$delete(this.categories, categoryIndex);
        
      },
      dialogDeleteCat(categoryIndex){
        if(this.categories[categoryIndex].dialogDeleteCategory ==true)
        {
            this.$set(this.categories[categoryIndex],'dialogDeleteCategory',false);
        }
          
        if(this.categories[categoryIndex].dialogDeleteCategory ==false) 
        {
          this.$set(this.categories[categoryIndex],'dialogDeleteCategory',true);
        }
      },
      isServices(categoryIndex){
        if(this.categories[categoryIndex].categoryName=="Services")
        {
          return true;
        }
        else
        {
          return false;
        }
      },
      getRowIndex(propsItem,categoryIndex)
      {
        let myPosition = this.categories[categoryIndex].myRows.map(function(e) { return e.title; }).indexOf(propsItem);
        return myPosition;
      },
      isHeader(headerText)
      {
          //console.log(headerText);
          if(headerText =="Actions" || headerText =="Button"){return false}

          else{return true}
      },
      onButtonSelected(event,categoryIndex) {
          this.categories[categoryIndex].myRows.forEach(row => {
            this.$set(row,'button',event);
             
          });
        },
      onButtonSelectedIndividually($event,categoryIndex,myRowIndex)
      {
          this.$set(this.categories[categoryIndex].myRows[myRowIndex],'button',event.target.value);
           
      },
      myRowsOnChange(propsItem,header,categoryIndex)
      {
         
          this.$set(this.categories[categoryIndex],'myRows',this.categories[categoryIndex].myRows);
           console.log(JSON.stringify(this.categories[categoryIndex].myRows));
          const index = this.categories[categoryIndex].myRows.indexOf(propsItem);
          //console.log("header..."+JSON.stringify(header.value)+"this.myRows[index]..."+JSON.stringify(this.categories[categoryIndex].myRows[index][header.value]));
          if(header.value =="title")
          {
            if(this.categories[categoryIndex].myRows[index][header.value] =="")
            {
              this.categories[categoryIndex].myRows[index][header.value] = `Title ${index+1}`;
            }
          }
          if(header.value =="subtitle")
          {
            if(this.categories[categoryIndex].myRows[index][header.value] =="")
            {
              this.categories[categoryIndex].myRows[index][header.value] = `Subtitle ${index+1}`;
            }
          }
           
          
          
      },
      addItem(categoryIndex)
      {

        if(this.categories[categoryIndex].myRows.length<=10)
        {
        var myNewRowObject = {};
        for(var j=0; j<this.categories[categoryIndex].headers.length; j++)
        {
            if(this.categories[categoryIndex].categoryName=="Services")
            {
                if(this.categories[categoryIndex].headers[j].value !=="actions")
                {
                  if(this.categories[categoryIndex].headers[j].value =="title")
                  {
                    let myRowsLength = this.categories[categoryIndex].myRows.length+1;
                    myNewRowObject[this.categories[categoryIndex].headers[j].value] =`Title ${myRowsLength}`;  
                  }
                  if(this.categories[categoryIndex].headers[j].value =="subtitle")
                  {
                    let myRowsLength = this.categories[categoryIndex].myRows.length+1;
                    myNewRowObject[this.categories[categoryIndex].headers[j].value] =`Subtitle ${myRowsLength}`;  
                  }
                  if(this.categories[categoryIndex].headers[j].value =="button")
                  {
                    let myRowsLength = this.categories[categoryIndex].myRows.length;

                    myNewRowObject[this.categories[categoryIndex].headers[j].value]  = this.categories[categoryIndex].myRows[myRowsLength-1].button;  
                  }
                }
            }
            if(this.categories[categoryIndex].categoryName !=="Services")
            {
                if(this.categories[categoryIndex].headers[j].value !=="actions")
                {
                  if(this.categories[categoryIndex].headers[j].value =="title")
                  {
                    let myRowsLength = this.categories[categoryIndex].myRows.length+1;
                    myNewRowObject[this.categories[categoryIndex].headers[j].value] =`Title ${myRowsLength}`;  
                  }
                  if(this.categories[categoryIndex].headers[j].value =="subtitle")
                  {
                    let myRowsLength = this.categories[categoryIndex].myRows.length+1;
                    myNewRowObject[this.categories[categoryIndex].headers[j].value] =`Subtitle ${myRowsLength}`;  
                  }
                  if(this.categories[categoryIndex].headers[j].value =="button")
                  {
                    let myRowsLength = this.categories[categoryIndex].myRows.length;

                    myNewRowObject[this.categories[categoryIndex].headers[j].value]  = this.categories[categoryIndex].myRows[myRowsLength-1].button;  
                  }
                  if(this.categories[categoryIndex].headers[j].value =="imageUrl")
                  {

                    myNewRowObject[this.categories[categoryIndex].headers[j].value]  = `http://www.example.com/image.png`;  
                  }
                }
            }
            
            
        }

        console.log("myNewObject..."+JSON.stringify(myNewRowObject));   
         this.pushANewRow(myNewRowObject,categoryIndex); 
        }
       
         
      },
      pushANewRow(myNewObject,categoryIndex){
          this.categories[categoryIndex].myRows.push(myNewObject);
          console.log("this.myRows..."+JSON.stringify(this.myRows));
           
        },
      deleteItem(propsIndex,categoryIndex)
      { 
        if(this.categories[categoryIndex].myRows.length>1)
        {
          this.$delete(this.categories[categoryIndex].myRows, propsIndex);
         
        }
        
      },
      addMyAttributeText($event,categoryIndex)
      {
        this.$set(this.categories[categoryIndex], 'myAttributeText', event.target.value);
        console.log(this.categories[categoryIndex].myAttributeText);
         
      },
      changeMyAttributeText(event)
      {
        console.log(event.target.value);
        this.$set(this, 'myAttributeText', event.target.value);
        
      },
      updateAttributeText(newValueAttribute)
      {
         alert(newValueAttribute);
      },
      displayDialogAddAttributes(categoryIndex)
      {
        if(this.categories[categoryIndex].categoryName !=="Services"){
        if(this.categories[categoryIndex].dialogAddNewAttribute){this.$set(this.categories[categoryIndex], 'dialogAddNewAttribute', false); }
        else{this.$set(this.categories[categoryIndex], 'dialogAddNewAttribute', true);  }
        }
      },
      addNewAttribute(myAttributeText,categoryIndex)
      {
        if(this.categories[categoryIndex].categoryName !=="Services"){
        this.categories[categoryIndex].headers.push({ text: myAttributeText,value: myAttributeText, sortable: false,align:"left"});
        this.$set(this.categories[categoryIndex], 'dialogAddNewAttribute', false);
         
        
        for(var k=0;k<this.categories[categoryIndex].myRows.length;k++)
        {
          this.$set(this.categories[categoryIndex].myRows[k], myAttributeText, ""); 
          
        }
        
        this.$set(this.categories[categoryIndex], 'dialogAddNewAttribute', false);
        this.$set(this.categories[categoryIndex], 'myAttributeText', "");
        
        }
        
      },
      openDialogConfirmDeleteAttribute(categoryIndex,myAttributeText)
      {
         console.log("categoryIndex..."+categoryIndex+"propsIndex..."+myAttributeText);
          this.$set(this.categories[categoryIndex], 'dialogChangePropertiesAttributes', false);
          this.$set(this.categories[categoryIndex], 'dialogConfirmDeleteAttribute', true);
      },
      closeDialogConfirmDeleteAttribute(categoryIndex)
      {
        this.$set(this.categories[categoryIndex], 'dialogConfirmDeleteAttribute', false);
      },
      deleteAttribute(indexAttribute)
      {
        this.$delete(this.categories[indexAttribute].headers,indexAttribute);
        this.$set(this, 'dialogChangePropertiesAttributes', false);
        this.$set(this, 'dialogConfirmDeleteAttribute', true);
        
      },
      confirmDeleteAttribute(categoryIndex,posHeaderIndex)
      {
          
          this.$delete(this.categories[categoryIndex].headers,posHeaderIndex);
          let myAttributeText = this.categories[categoryIndex].myAttributeText;
          for(var y=0;y<this.categories[categoryIndex].myRows.length;y++)
          {
            this.$delete(this.categories[categoryIndex].myRows[y],myAttributeText);
            
          }
          
          
          this.$set(this.categories[categoryIndex], 'dialogConfirmDeleteAttribute', false);
          this.$set(this.categories[categoryIndex], 'myAttributeText', null);
          this.$set(this.categories[categoryIndex], 'posAttributeOnheaders', null);
          

      },
      displayDialogEditAttributes(propsHeaderText,categoryIndex)
      {
        let myPosition = this.categories[categoryIndex].headers.map(function(e) { return e.text; }).indexOf(propsHeaderText);
        this.$set(this.categories[categoryIndex], 'myAttributeText', propsHeaderText);
        this.$set(this.categories[categoryIndex], 'posAttributeOnheaders', myPosition);
        this.$set(this.categories[categoryIndex], 'dialogChangePropertiesAttributes', true);
      },

      updateAttribute(myAttributeText,posAttributeOnheaders)
      {
        //alert(myAttributeText+' '+posAttributeOnheaders);
        this.$set(this.headers[posAttributeOnheaders], 'text', myAttributeText);
        this.hideDialogEditAttributes(categoryIndex);
        
      },

      hideDialogEditAttributes(categoryIndex)
      {
        this.$set(this.categories[categoryIndex], 'dialogChangePropertiesAttributes', false);
        this.$set(this.categories[categoryIndex], 'myAttributeText', "");
      },
      isEditable(propsHeaderText)
      {
        
        if( propsHeaderText =='Actions' || propsHeaderText =='Title' || propsHeaderText=='Subtitle' || propsHeaderText=='Image Url'  )
        {
           //console.log("isEditable..."+propsHeaderText);     
          return false;}
        else{return true;}
         
      },
    }
  }
</script>
