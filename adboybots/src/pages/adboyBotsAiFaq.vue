<template>
        <v-app>
        <adboyBotsUsersHeader></adboyBotsUsersHeader>
        <v-content>
        <v-container fixed grid-list-md text-xs-center>
            <v-toolbar dark color="primary">
                    <v-toolbar-side-icon>
                        <v-icon small>fas fa-brain</v-icon>
                    </v-toolbar-side-icon>

                    <v-toolbar-title class="white--text">Ai faqs</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon @click="createDialogGroup()">
                    <v-icon>fas fa-layer-group</v-icon>
                    </v-btn>

                    <v-btn icon @click="createDialogFaq()">
                    <v-icon>question_answer</v-icon>
                    </v-btn>
            </v-toolbar>
            <v-layout row wrap>
                <v-flex  xs6 >
                    <v-card light color="white" style= "height:450px; overflow-y: scroll; " class="pa-3"  >
                        <p class="title">Faq Groups:</p>
                        <template  v-for="(faqGroup,indexFaqGroup) in faqGroups">
                           
                                <v-card color="white" light class="mt-3"  :key="'index-Faq-Group'+indexFaqGroup">
                                    <v-card-title primary-title >
                                        <v-expansion-panel class="elevation-0" v-model="faqGroup.panel" expand >
                                        <v-expansion-panel-content>
                                        <div slot="header" class="subheading"><v-icon color="#007bff" small class="pr-2" v-on:click="dialogEditGroup(faqGroups[indexFaqGroup].faqGroupName,indexFaqGroup)">fas fa-edit</v-icon>Faq Group: {{faqGroup.faqGroupName}} <v-icon small color="#007bff" v-if="faqGroup.faqGroupName !=='General'" class="pl-2" v-on:click="deleteDialogFaqGroup(faqGroups[indexFaqGroup].faqGroupName,indexFaqGroup)">fas fa-trash</v-icon></div>
                                         
                                            <v-card >
                                                <v-list two-line>
                                                    <template v-for="(faq, indexFaq) in faqGroup.groupOfFaqs">
                                                    <v-hover :key="'v-hover-index-Faq'+indexFaq">
                                                    <div :key="'myFaq'+indexFaq" slot-scope="{ hover }" :class="`elevation-${hover ? 1 : 0}`" v-on:click="selectFaq(indexFaqGroup,indexFaq)">  
                                                        <v-divider></v-divider>
                                                        <v-list-tile>
                                                            <v-list-tile-avatar>
                                                                <v-checkbox
                                                                v-model="faq.isSelected"
                                                                light
                                                                color="#007bff"
                                                                checkbox
                                                                ></v-checkbox>
                                                            </v-list-tile-avatar>
                                                            <v-list-tile-content>
                                                                <template v-if="selectedGroup == indexFaqGroup">
                                                                    <v-list-tile-title v-if="selectedFaq == faqGroup.groupOfFaqs[indexFaq].faqName"><div class="title" style="color:#007bff;">Faq: {{faq.faqName}}</div></v-list-tile-title>
                                                                    <v-list-tile-title v-if="selectedFaq !== faqGroup.groupOfFaqs[indexFaq].faqName"><div class="subheading">Faq: {{faq.faqName}}</div></v-list-tile-title>
                                                                </template>
                                                                <template v-if="selectedGroup !== indexFaqGroup">
                                                                    <v-list-tile-title ><div class="subheading">Faq: {{faq.faqName}}</div></v-list-tile-title>
                                                                </template>
                                                                <v-list-tile-sub-title ><div class="body-1">Script selected: {{faq.scriptSelected}}</div></v-list-tile-sub-title>
                                                            </v-list-tile-content>
                                                        </v-list-tile>
                                                    </div>
                                                    </v-hover>
                                                    </template>
                                                    </v-list>
                                            </v-card>
                                         
                                        </v-expansion-panel-content>
                                        </v-expansion-panel>
                                    </v-card-title>
                                </v-card>
                            <v-dialog
                                v-model="dialogCreateGroup"
                                max-width="290"
                                :key="indexFaqGroup+'-1'"
                            >
                                <v-card>
                                <v-container>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                    <v-text-field
                                        v-model="myGroupName"
                                        :counter="80"
                                        label="Group Name"
                                        required
                                        v-on:keyup="validateNameGroup()"
                                    ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                    <p v-if="myGroupNameIsValid==false" style="color:red;">It is necessary a unique name with a maximum of 80 characters</p>
                                    </v-flex>
                                    <v-flex xs6>
                                    <v-btn class="info" small @click="createDialogGroup()">Cancel</v-btn>
                                    
                                    </v-flex>
                                    <v-flex xs6>
                                    <v-btn class="info" v-if="myGroupNameIsValid==true"   small @click="createGroup()">Create Group</v-btn>
                                    <v-btn class="info" v-if="myGroupNameIsValid==false"   small  disabled>Create Group</v-btn>
                                    </v-flex>
                                </v-layout>
                                </v-container>
                                
                                </v-card>
                            </v-dialog>
                            <v-dialog
                                v-model="dialogEditGroupControl"
                                max-width="290"
                                :key="indexFaqGroup+'-2'"
                            >
                                <v-card>
                                <v-container>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                    <v-text-field
                                        v-model="myGroupName"
                                        :counter="80"
                                        label="Group Name"
                                        required
                                        v-on:keyup="validateNameGroupEdit(myGroupName,indexFaqGroup)"
                                        v-on:change="validateNameGroupEdit(myGroupName,indexFaqGroup)"
                                    ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                    
                                    <p v-if="myGroupNameIsValid==false" style="color:red;">It is necessary a unique name with a maximum of 80 characters</p>
                                    
                                    </v-flex>
                                    <v-flex xs6>
                                    <v-btn class="info" small @click="dialogEditGroup(myGroupName,indexFaqGroup)">Cancel</v-btn>
                                    
                                    </v-flex>
                                    <v-flex xs6>
                                    <v-btn class="info" v-if="myGroupNameIsValid==true"   small @click="createGroup()">Edit Group</v-btn>
                                    <v-btn class="info" v-if="myGroupNameIsValid==false"   small  disabled>Edit Group</v-btn>
                                    </v-flex>
                                </v-layout>
                                </v-container>
                                
                                </v-card>
                            </v-dialog>
                            <v-dialog
                                v-model="deleteDialogFaqGroupControl"
                                max-width="290"
                                :key="indexFaqGroup+'-3'"
                            >
                                <v-card>
                                <v-container>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        Do you really want to delete this Faq group...<strong>{{myGroupName}}</strong> ?
                                    </v-flex>
                                    <v-flex xs12>
                                    <v-btn class="info"  small @click="deleteDialogFaqGroup()">Cancel</v-btn>
                                    <v-btn class="error" small @click="confirmDeleteFaqGroup(groupIndex)">Delete Group</v-btn>
                                    </v-flex>
                                </v-layout>
                                </v-container>
                                
                                </v-card>
                            </v-dialog>
                            <v-dialog
                                v-model="editDialogFaqControl"
                                max-width="290"
                                :key="indexFaqGroup+'-4'"
                            >
                                <v-card>
                                <v-container>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                       <v-text-field
                                        v-model="myFaqName"
                                        :counter="40"
                                        label="Faq Name"
                                        required
                                        v-on:keyup="validateNameFaqEdit(myFaqName,myfaqPosition)"
                                    ></v-text-field>
                                     <p v-if="faqNameIsvalid==false" style="color:red;">It is necessary a unique name with a maximum of 40 characters</p>
                                    
                                    </v-flex>
                                    <v-flex xs12>
                                    <v-btn class="info"  small @click="dialogEditFaq(myFaqName,myfaqPosition)">Cancel</v-btn>
                                    <v-btn class="info" v-if="faqNameIsvalid==true"  small @click="updateFaq(myFaqName,myfaqPosition)">Update Faq</v-btn>
                                    <v-btn class="info" v-if="faqNameIsvalid==false" small @click="updateFaq(myFaqName,myfaqPosition)" disabled>Update Faq</v-btn>
                                    </v-flex>
                                </v-layout>
                                </v-container>
                                
                                </v-card>
                            </v-dialog>
                             <v-dialog
                                v-model="createDialogFaqControl"
                                max-width="290"
                                :key="indexFaqGroup+'-5'"
                            >
                                <v-card>
                                <v-container>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                       <v-text-field
                                        v-model="myFaqName"
                                        :counter="40"
                                        label="Faq Name"
                                        required
                                        v-on:keyup="validateNameFaq()"
                                    ></v-text-field>
                                     <p v-if="faqNameIsvalid==false" style="color:red;">It is necessary a unique name with a maximum of 40 characters</p>
                                    
                                    </v-flex>
                                    <v-flex xs12>
                                    <v-btn class="info"  small @click="createDialogFaq()">Cancel</v-btn>
                                    <v-btn class="info" v-if="faqNameIsvalid==true"  small @click="createFaq()">Create Faq</v-btn>
                                    <v-btn class="info" v-if="faqNameIsvalid==false" small  disabled>Create Faq</v-btn>
                                    </v-flex>
                                </v-layout>
                                </v-container>
                                
                                </v-card>
                            </v-dialog>
                        </template>
                    </v-card>
                </v-flex>
                <v-flex  xs6 >
                    <v-card light color="white" style= "height:450px; overflow-y: scroll; " class="pa-3" >
                        <template  v-for="(faq,indexFaq) in faqs" >
                             <v-fade-transition :key="'trans-'+indexFaq" leave-absolute>
                                <div v-if="selectedFaq == faq.faqName" :key="'index-Faq'+indexFaq">
                                    <p class="title"  ><v-icon small class="pb-1" v-if="faq.isModifiable == true" v-on:click="dialogEditFaq(indexFaq,faq.faqName)" color="#007bff">fas fa-edit</v-icon> Faq: {{faq.faqName}} <v-icon small color="#007bff" v-if="faq.isModifiable == true" class="pl-1 pb-1" v-on:click="deleteDialogFaq()">fas fa-trash</v-icon></p>
                                    <v-layout>
                                    <v-flex  xs6 class="pt-4 text-xs-left subheading" >
                                        Show people your script:
                                    </v-flex>
                                    <v-flex  xs6 class="text-xs-left subheading" >
                                        <v-select :items="myScripts" v-model="faq.scriptSelected" label="Select an Script"></v-select>
                                    </v-flex>
                                    </v-layout>
                                
                                    <v-layout>
                                    <v-flex  xs6 class="text-xs-left subheading pt-4" >
                                        Enter keywords or phrases:
                                    </v-flex>
                                        <v-flex  xs6 class="text-xs-left subheading" >
                                        <v-text-field
                                            v-model="myKeyWord"
                                            @keyup.enter.native="addKeyword(myKeyWord,indexFaq)"
                                            v-on:keyup=" isvalidKeyword(myKeyWord)"
                                            ></v-text-field>
                                        <p style="color:red;" v-if="keyWordExists">Key word or phrase already exists</p>
                                    </v-flex>    
                                    </v-layout>
                                    <v-layout>
                                        <v-flex  xs12 class="text-xs-center subheading pt-4" >
                                        
                                        <template v-for="(tag,indexTag) in faq.tags" >
                                            <v-chip
                                            v-if="!tag.isModifiable" 
                                            
                                            :key="'tag-id'+indexTag" 
                                            v-model="tag.isOpen"
                                            color="#007bff"
                                            text-color="white"
                                            >
                                            {{tag.text}}
                                            </v-chip>
                                         <v-chip
                                            v-if="tag.isModifiable" 
                                            :key="'tag-id'+indexTag" 
                                            v-model="tag.isOpen"
                                            @input="onDeleteChip(indexFaq,indexTag)"
                                            close
                                            color="#007bff"
                                            text-color="white"
                                            >
                                            {{tag.text}}
                                            </v-chip>
                                        </template>
                                        
                                        
                                    
                                    </v-flex>
                                    </v-layout>
                                </div>
                             </v-fade-transition>
                        </template>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        </v-content>
        </v-app>
</template>

<script>
 
 import adboyBotsUsersHeader from '@/components/adboyBotsUsersHeader'

 export default {
 components:{adboyBotsUsersHeader},
 data: () => ({
     keyWordExists:false,
     faqNameIsvalid:false,
     createDialogFaqControl:false,
     editDialogFaqControl:false,
     myFaqName:null,
     myfaqPosition:null,
     deleteDialogFaqGroupControl:false,
     dialogEditGroupControl:false,
     myGroupName:null,
     selectedFaq:"Get Started",
     selectedGroup:0,
     groupIndex:null,
     myGroupNameIsValid:false,
     dialogCreateGroup:false,
     facebookPageId:"xxxxxx",
     myScripts:["Welcome","Prices","About Us","Pricing","Services"],
     botName:"Dentist in Melbourne",
     myKeyWord:null,
     faqs:[
            {faqName:"Get Started",scriptSelected:"Welcome",tags:[{text:"Get Started",isOpen:true,isModifiable:false},{text:"Hello",isOpen:true,isModifiable:true},{text:"Hi",isOpen:true,isModifiable:true},{text:"How are you?",isOpen:true,isModifiable:true}],isModifiable:false},
            {faqName:"Services",scriptSelected:"Services",tags:[{text:"Your services",isOpen:true,isModifiable:true},{text:"Services",isOpen:true,isModifiable:true},{text:"services",isOpen:true,isModifiable:true}],isModifiable:true},
            {faqName:"Prices",scriptSelected:"Pricing",tags:[{text:"About your prices",isOpen:true,isModifiable:true},{text:"Pricing",isOpen:true,isModifiable:true},{text:"Cost",isOpen:true,isModifiable:true}],isModifiable:true}
         ],

     faqGroups:
     [
         {
            faqGroupName:'General',
            panel:[false],
            groupOfFaqs:
            [
                {
                    isSelected:true,   
                    faqName:'Get Started',
                },
                {
                    isSelected:false,   
                    faqName:'Services',
                },
                {
                    isSelected:true,   
                    faqName:'Prices',
                   
                }
            ]
           
         },
         {
            faqGroupName:'Prices',
            panel:[false],
            groupOfFaqs:
            [
                {
                     isSelected:true,   
                    faqName:'Get Started',
                },
                {
                    isSelected:false,   
                    faqName:'Services',
                },
                {
                    isSelected:false,   
                    faqName:'Prices',
                   
                }
               

            ]
            
         }
     ]
 }),
  methods:
  {

      createFaq()
      {
         //alert("this.myFaqName..."+this.myFaqName); 
         let newFaq = {faqName:this.myFaqName,scriptSelected:"",tags:[],isModifiable:true};
         this.faqs.push(newFaq);
        for(var j=0; j<this.faqGroups.length; j++)
        {
            let newTag = {isSelected:true,faqName:this.myFaqName};
            this.faqGroups[j].groupOfFaqs.push(newFaq);
        }

         this.$set(this,'createDialogFaqControl',false); 
         this.$set(this,'myFaqName',"");


      },
      createDialogFaq()
      {
          
          //alert("Create Faq");
          if(!this.createDialogFaqControl)
          {
            
               this.$set(this,'createDialogFaqControl',true); 
          }
         else
          {
            
               this.$set(this,'createDialogFaqControl',false); 
               this.$set(this,'myFaqName',"");
          }
      },
      onDeleteChip(indexFaq,indexTag)
      {
         this.$delete(this.faqs[indexFaq].tags,indexTag);  
      },
      isvalidKeyword(myKeyWord)
      {
          if(myKeyWord==""|| myKeyWord==null)
          {
              this.$set(this,'keyWordExists',false); 
              return false;
          }
          else
          {
               for(var j=0; j<this.faqs.length; j++)
               {
                   for(var k=0; k<this.faqs[j].tags.length; k++)
                   {
                       if(this.faqs[j].tags[k].text ==myKeyWord)
                       {
                           this.$set(this,'keyWordExists',true); 
                           return false;
                       }   
                   }

               }
               this.$set(this,'keyWordExists',false); 
               return true
            }
              
          
      },
      addKeyword(myKeyWord,indexFaq)
      {
          //alert(myKeyWord);
          if(this.isvalidKeyword(myKeyWord))
          {
          let newTag ={text:myKeyWord,isOpen:true,isModifiable:true};
          this.faqs[indexFaq].tags.push(newTag);
          this.$set(this,'myKeyWord',null); 
          }
      },
      updateFaq(myFaqName,myfaqPosition)
      {
          this.$set(this.faqs[myfaqPosition],'faqName',myFaqName); 
          this.$set(this,'editDialogFaqControl',false);
          this.$set(this,'myFaqName',null);
          this.$set(this,'myfaqPosition',null);
          this.$set(this,'faqNameIsvalid',true); 
          console.log("faqs..."+JSON.stringify(this.faqs));
          for(var j=0; j<this.faqGroups.length; j++)
          {
                this.$set(this.faqGroups[j].groupOfFaqs[myfaqPosition],'faqName',this.faqs[myfaqPosition].faqName); 
                console.log(this.faqGroups[j].groupOfFaqs[myfaqPosition].faqName);    
          }

           this.$set(this,'selectedFaq',myFaqName); 
          

          
      },
      validateNameFaqEdit(myFaqName,myfaqPosition)
      {
          console.log("myFaqName..."+myFaqName+"myfaqPosition..."+myfaqPosition);
          for(var j=0; j<this.faqs.length; j++)
          {
              if(myfaqPosition == j)
              {
                  if(myFaqName ==""||myFaqName.length>40 )
                  {
                      console.log("wrong");
                      this.$set(this,'faqNameIsvalid',false); 
                  }
                  else
                  {
                       this.$set(this,'faqNameIsvalid',true); 
                  }
              }
              if(myfaqPosition !== j)
              {
                  if(myFaqName ==""||myFaqName.length>40 ||  myFaqName.trim() == this.faqs[j].faqName)
                  {
                       console.log("wrong because name...")
                       this.$set(this,'faqNameIsvalid',false); 
                       

                  }
                  else
                  {
                       this.$set(this,'faqNameIsvalid',true); 
                  }
              }
          }
      },
      validateNameFaq()
      {
          console.log("myFaqName..."+this.myFaqName);
          for(var j=0; j<this.faqs.length; j++)
          {
              
            if(this.myFaqName ==""||this.myFaqName.length>40 ||  this.myFaqName.trim() == this.faqs[j].faqName)
            {
                console.log("wrong because name...")
                this.$set(this,'faqNameIsvalid',false); 
                

            }
            else
            {
                this.$set(this,'faqNameIsvalid',true); 
            }
              
          }
      },
      dialogEditFaq(indexFaq,faqName)
      {
          if(!this.editDialogFaqControl)
          {
              //console.log("this.myGroupName"+this.myGroupName);
              this.$set(this,'editDialogFaqControl',true);
              this.$set(this,'faqNameIsvalid',true); 
              this.$set(this,'myFaqName',faqName);
              this.$set(this,'myfaqPosition',indexFaq);
              //alert("this.myGroupName.."+this.myGroupName+"this.groupIndex..."+this.groupIndex);
              
          }
          else
          {
               this.$set(this,'editDialogFaqControl',false);
               this.$set(this,'myFaqName',null);
               this.$set(this,'myfaqPosition',null);
               this.$set(this,'faqNameIsvalid',true); 
          }
      },
      confirmDeleteFaqGroup(indexFaqGroup)
      {
          if(this.myGroupName !== "General")
          {
          this.$delete(this.faqGroups, indexFaqGroup);
          this.$set(this,'deleteDialogFaqGroupControl',false);
          this.$set(this,'myGroupName',null);
          this.$set(this,'groupIndex',null);
          }
      },
      deleteDialogFaqGroup(faqGroupName,indexFaqGroup)
      {
         
        
          if(!this.deleteDialogFaqGroupControl)
          {
              //console.log("this.myGroupName"+this.myGroupName);
              this.$set(this,'deleteDialogFaqGroupControl',true);
              this.$set(this,'myGroupName',faqGroupName);
              this.$set(this,'groupIndex',indexFaqGroup);
              //alert("this.myGroupName.."+this.myGroupName+"this.groupIndex..."+this.groupIndex);
              
          }
          else
          {
               this.$set(this,'deleteDialogFaqGroupControl',false);
               this.$set(this,'myGroupName',null);
               this.$set(this,'groupIndex',null);
          }


      },
      dialogEditGroup(faqGroupName,indexFaqGroup)
      {
          this.myGroupName = faqGroupName; 
          this.validateNameGroupEdit(this.myGroupName,indexFaqGroup);
          if(!this.dialogEditGroupControl)
          {
              //console.log("this.myGroupName"+this.myGroupName);
              this.$set(this,'dialogEditGroupControl',true);
          }
          else
          {
               this.$set(this,'dialogEditGroupControl',false);
               this.$set(this,'myGroupNameIsValid',true);
               //alert("myGroupNameIsValid..."+this.myGroupNameIsValid);
               this.$set(this,'myGroupName',"");
          }
      },
      selectFaq(indexFaqGroup,indexFaq)
      {
          //alert("indexFaqGroup.."+indexFaqGroup+"indexFaq..."+ indexFaq);
          let selectedFaq = this.faqs[indexFaq].faqName;
          //alert("selectedFaq.."+selectedFaq);
         
          this.$set(this,'faqNameIsvalid',null);
          this.$set(this,'editDialogFaqControl',null);
          this.$set(this,'myFaqName',null);
          this.$set(this,'myfaqPosition',null);

          this.$set(this,'selectedFaq',selectedFaq);
          this.$set(this,'selectedGroup',indexFaqGroup);

      },
      validateNameGroupEdit(faqGroupName,indexFaqGroup)
      {
            //alert("indexFaqGroup..."+indexFaqGroup);
            //console.log("this.myGroupName..."+this.myGroupName+"..and faqGroupName"+faqGroupName);
            for(var j=0; j<this.faqGroups.length; j++)
            {
            
                if(j !==indexFaqGroup)
                {
                    if(faqGroupName =="" ||  faqGroupName.length>80 || faqGroupName == this.faqGroups[j].faqGroupName)
                    {
                        console.log("faqGroupName..."+faqGroupName+" this.faqGroups[j].faqGroupName..."+this.faqGroups[j].faqGroupName);
                        console.log("It is failing here");
                        this.$set(this,'myGroupNameIsValid',false);
                    }
                    else
                    {
                        this.$set(this,'myGroupNameIsValid',true);
                    }
                }

                
                if(j ==indexFaqGroup)
                {
                    
                    if(faqGroupName =="" ||  faqGroupName.length>80 )
                    {
                        this.$set(this,'myGroupNameIsValid',false);
                    }
                    else
                    {
                        this.$set(this,'myGroupNameIsValid',true);
                    }
                }
                
                
                
            }
            
      },
      validateNameGroup()
      {
         this.faqGroups.forEach(faqGroup => {

             if(this.myGroupName =="" || faqGroup.faqGroupName == this.myGroupName.trim() || this.myGroupName.length>80)
             {
                 this.$set(this,'myGroupNameIsValid',false);
             }
             else
             {
                 this.$set(this,'myGroupNameIsValid',true);
             }
             
         });
         console.log(this.myGroupName);
      },
      createDialogGroup()
      {
          if(!this.dialogCreateGroup)
          {
              this.$set(this,'dialogCreateGroup',true);
          }
          else
          {
               this.$set(this,'dialogCreateGroup',false);
               this.$set(this,'myGroupNameIsValid',false);
               this.$set(this,'myGroupName',"");
          }
          
      },
      createGroup()
      {
          //alert(this.myGroupName);

          let newFaqGroup = {
            faqGroupName:this.myGroupName,
            panel:[false],
            groupOfFaqs:
            [
                {
                    isSelected:true,   
                    displaytags:true,
                    faqName:'Services',
                    tags:[{text:"Your services"},{text:"Services"},{text:"services"}],
                    scriptSelected:'Services'
                },
                {
                    isSelected:true,   
                    displaytags:true,
                    faqName:'Prices',
                    tags:[{text:"About your prices"},{text:"Pricing"},{text:"Cost"}],
                    scriptSelected:'Pricing'
                }
            ]
           
         };

         this.faqGroups.push(newFaqGroup);
         this.$set(this,'dialogCreateGroup',false);
         this.$set(this,'myGroupNameIsValid',false);
         this.$set(this,'myGroupName',"");

          
      }
  }
 }
 </script>