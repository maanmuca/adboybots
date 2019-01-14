<template>
    <v-app>
        <adboyBotsUsersHeader></adboyBotsUsersHeader>
        <template v-if="templateSelected==''">
          <v-content>
              <v-container grid-list-md text-xs-center >
                  <v-toolbar dark color="primary">
                    <v-toolbar-side-icon>
                        <v-icon small>fas fa-file-alt</v-icon>
                    </v-toolbar-side-icon>
                    

                    <v-toolbar-title class="white--text">Scripty / </v-toolbar-title>
                    
                    <v-toolbar-title class="white--text" >
                           None
                    </v-toolbar-title>
                    
                    <v-spacer></v-spacer>
                    
                  
                </v-toolbar>
                 <v-layout row wrap>
                    <v-flex  xs12 >
                        <v-card light color="white" style= "height:450px;" class="pa-3"  >
                            <p>There is not any Script Template Created</p>
                            <p><span><v-btn class="info" v-on:click="dialogNameTemplate()">Create a template</v-btn></span><v-btn class="info">Use a predefined Template</v-btn><span></span></p>
                            <v-dialog
                        v-model="dialogCreateTemplateControl"
                        max-width="350"
                      
                    >
                        <v-card>
                        <v-container>
                        <v-layout row wrap class="text-xs-center">
                            <v-flex xs12>
                                <v-text-field
                                v-model="myTemplateName"
                                :counter="40"
                                label="Name Template"
                                required
                                v-on:keyup="validateNameTemplate()"
                            ></v-text-field>
                                <p v-if="nameTemplateIsvalid==false" style="color:red;">It is necessary a unique name with a maximum of 40 characters</p>
                            </v-flex>
                            <v-flex xs12>
                            <v-btn class="info"  small @click="dialogNameTemplate()">Cancel</v-btn>
                            <v-btn class="info" v-if="nameTemplateIsvalid==true"  small @click="createTemplate()">Create Template</v-btn>
                            <v-btn class="info" v-if="nameTemplateIsvalid==false" small  disabled>Create Template</v-btn>
                            </v-flex>
                        </v-layout>
                        </v-container>
                        
                        </v-card>
                    </v-dialog>

                        </v-card>
                    </v-flex>
                 </v-layout>
              </v-container>
          </v-content>
        </template>
        <template v-else v-for="(myTemplate,indexTemplate) in myTemplates">
        <v-content v-if="templateSelected == myTemplate.templateName" :key="'template-'+indexTemplate">
            <v-container fixed grid-list-md text-xs-center >
                <v-toolbar dark color="primary">
                    <v-toolbar-side-icon>
                        <v-icon small>fas fa-file-alt</v-icon>
                    </v-toolbar-side-icon>
                    

                    <v-toolbar-title class="white--text">Script / </v-toolbar-title>
                    
                    <v-toolbar-title class="white--text pt-2 display-1" >
                            <v-select
                            class="title"
                            style="width:300px"
                            :items="templatesName"
                            v-model="templateSelected"
                            ></v-select>
                    </v-toolbar-title>
                    <v-tooltip top>
                        <v-btn slot="activator" icon >
                        <v-icon small v-on:click="dialogNameTemplate()">fas fa-plus-circle</v-icon>
                        </v-btn>
                        <span class="pa-4">Create Template</span>
                    </v-tooltip>
                    <v-tooltip top>
                        <v-btn slot="activator" icon >
                        <v-icon small v-on:click="dialogNameTemplateEdit()">fas fa-edit</v-icon>
                        </v-btn>
                        <span class="pa-4">Edit Template Name</span>
                    </v-tooltip>
                    <v-tooltip top>
                        <v-btn slot="activator" icon >
                        <v-icon small v-on:click="dialogDeleteTemplate()" >fas fa-trash</v-icon>
                        </v-btn>
                        <span class="pa-4">Delete Template</span>
                    </v-tooltip>
                   
                    <v-spacer></v-spacer>
                    
                    <template v-for="(templateSection,indexTemplateSection) in myTemplate.templateSections">
                    <v-menu open-on-hover v-if="templateSection.sectionName==sectionSelected" bottom left :key="'v-menu-type-Of-message'+indexTemplateSection">
                        <v-toolbar-title slot="activator">
                        <span class="pa-4">Add Message</span>
                        <v-icon small dark class="pb-1">fas fa-plus-circle</v-icon>
                        </v-toolbar-title>

                        <v-list>
                        <v-list-tile
                            v-for="( item, index) in typeOfMessages"
                            :key="'messageType-'+index"
                            
                        >
                            <v-list-tile-title v-text="item.description"  v-on:click="addMessage(item.type,indexTemplate,indexTemplateSection)"></v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-title v-on:click="getCategories(indexTemplate,indexTemplateSection)">Gallery Template</v-list-tile-title>
                        </v-list-tile>
                        </v-list>
                    </v-menu>
                    </template>
                    
                    <v-dialog
                        v-model="dialogCreateTemplateControl"
                        max-width="350"
                        :key="indexTemplate+'-1'"
                    >
                        <v-card>
                        <v-container>
                        <v-layout row wrap class="text-xs-center">
                            <v-flex xs12>
                                <v-text-field
                                v-model="myTemplateName"
                                :counter="40"
                                label="Name Template"
                                required
                                v-on:keyup="validateNameTemplate()"
                            ></v-text-field>
                                <p v-if="nameTemplateIsvalid==false" style="color:red;">It is necessary a unique name with a maximum of 40 characters</p>
                            </v-flex>
                            <v-flex xs12>
                            <v-btn class="info"  small @click="dialogNameTemplate()">Cancel</v-btn>
                            <v-btn class="info" v-if="nameTemplateIsvalid==true"  small @click="createTemplate()">Create Template</v-btn>
                            <v-btn class="info" v-if="nameTemplateIsvalid==false" small  disabled>Create Template</v-btn>
                            </v-flex>
                        </v-layout>
                        </v-container>
                        
                        </v-card>
                    </v-dialog>

                    <v-dialog
                        v-model="dialogEditTemplateControl"
                        max-width="350"
                        :key="indexTemplate+'-2'"
                    >
                        <v-card>
                        <v-container>
                        <v-layout row wrap class="text-xs-center">
                            <v-flex xs12>
                                <v-text-field
                                v-model ="myTemplateName"
                                :counter="40"
                                label="Name Template"
                                
                                v-on:keyup="validateNameTemplateEdit(indexTemplate)"
                            ></v-text-field>
                                <p v-if="nameTemplateIsvalid==false" style="color:red;">It is necessary a unique name with a maximum of 40 characters</p>
                            </v-flex>
                            <v-flex xs12>
                            <v-btn class="info"  small @click="dialogNameTemplateEdit()">Cancel</v-btn>
                            <v-btn class="info" v-if="nameTemplateIsvalid==true"  small @click="updateNameTemplate(indexTemplate)">Update Template</v-btn>
                            <v-btn class="info" v-if="nameTemplateIsvalid==false" small  disabled>Update Template</v-btn>
                            </v-flex>
                        </v-layout>
                        </v-container>
                        
                        </v-card>
                    </v-dialog>
                    <v-dialog
                        v-model="dialogDeleteTemplateControl"
                        max-width="350"
                        :key="indexTemplate+'-3'"
                    >
                        <v-card>
                        <v-container>
                        <v-layout row wrap class="text-xs-center">
                            <v-flex xs12>
                                
                                <p >Do you really want to delete this Template:{{myTemplates[indexTemplate].templateName}} </p>
                            </v-flex>
                            <v-flex xs12>
                            <v-btn class="info"   small @click="dialogDeleteTemplate()">Cancel</v-btn>
                            <v-btn class="error"   small @click="deleteTemplate(indexTemplate)">Delete Template</v-btn>
                            
                            </v-flex>
                        </v-layout>
                        </v-container>
                        
                        </v-card>
                    </v-dialog>
                </v-toolbar>
                <v-layout row wrap>
                    <v-flex  xs4 >
                        <v-card light color="white" style= "height:450px; overflow-y: scroll; " class="pa-3"  >
                            <p class="title">
                                <v-tooltip top>
                                    <v-btn slot="activator" icon >
                                        <v-icon color="#007bff" v-on:click="dialogCreateSection(indexTemplate)" small>fas fa-plus-circle</v-icon>
                                    </v-btn>
                                    <span>Create Section</span>
                                </v-tooltip>
                                Sections:</p>
                               
                                <v-layout row wrap class="pl-2 pr-2 pb-2 pt-0 mt-0 text-xs-center">
                                    
                                        
                                        <v-flex   xs12 class="pl-3 pb-3" v-for="(templateSection,indexTemplateSection) in myTemplates[indexTemplate].templateSections" :key="'section-features-'+indexTemplateSection"  >
                                           
                                        
                                           
                                             <v-hover :key="'v-hover-index-Sections'+indexTemplateSection">
                                                <v-card light color="white" slot-scope="{ hover }" :class="`elevation-${hover ? 2 : 4}`" v-on:click="changePosSection(indexTemplate,indexTemplateSection)" >
                                                
                                                    <v-layout row wrap class="pl-2  pr-2">
                                                        <v-flex  xs6 :style="templateSection.sectionName ==sectionSelected? 'border-color:#007bff; font-size:20px;':''" :class="templateSection.isModifiable? 'text-xs-left pt-2 pl-2':'text-xs-left pt-3 pl-2'">
                                                            <span v-if="templateSection.isModifiable" class="subheading pt-2 ">
                                                                <v-tooltip top>
                                                                    <v-btn slot="activator" icon v-on:click="dialogDeleteSection(indexTemplate,indexTemplateSection)" >
                                                                        <v-icon color="#007bff"  small>fas fa-trash</v-icon>
                                                                    </v-btn>
                                                                    <span>Delete Section</span>
                                                                </v-tooltip>
                                                            </span>
                                                           
                                                            
                                                            <span><i  :style="templateSection.sectionName ==sectionSelected ? 'font-style: normal; color:#007bff; font-size:14px;': 'font-style: normal; color:black; font-size:16px; margin-top:10px;'">{{templateSection.sectionName }}</i></span>
                                                        </v-flex>
                                                        <v-flex  xs6 class="pt-2 text-xs-right">
                                                            <v-tooltip top>
                                                                    <v-btn slot="activator" icon  >
                                                                        <v-icon color="#007bff" >fab fa-facebook-messenger fa-2x</v-icon>
                                                                    </v-btn>
                                                                    <span>Try it out on Messenger!</span>
                                                                </v-tooltip>
                                                        </v-flex>
                                                    </v-layout>
                                                     
                                                </v-card>
                                            </v-hover> 
                                            <v-dialog
                                                v-model="dialogDeleteSectionControl"
                                                max-width="350"
                                                :key="'section-delete-'+indexTemplateSection"
                                            >
                                                <v-card>
                                                <v-container>
                                                <v-layout row wrap class="text-xs-center">
                                                    <v-flex xs12>
                                                        
                                                        <p >Do you really want to delete this Section:<strong>{{sectionSelected}}</strong> </p>
                                                    </v-flex>
                                                    <v-flex xs12>
                                                    <v-btn class="info"   small @click="dialogDeleteSection(indexTemplate,indexTemplateSection)">Cancel</v-btn>
                                                    <v-btn class="error"   small @click="deleteSection(indexTemplate,sectionSelected)">Delete Template</v-btn>
                                                    
                                                    </v-flex>
                                                </v-layout>
                                                </v-container>
                                                
                                                </v-card>
                                        </v-dialog>
 
                                        </v-flex>
                                       
                                        <template v-for="(templateSection,indexTemplateSection) in myTemplate.templateSections">
                                        <v-dialog
                                            v-model="dialogCreateSectionControl"
                                            max-width="350"
                                            :key="'section-Dialog'+indexTemplateSection"
                                        >
                                            <v-card>
                                            <v-container>
                                            <v-layout row wrap class="text-xs-center">
                                                <v-flex xs12>
                                                    <v-text-field
                                                    v-model="mySectionName"
                                                    :counter="40"
                                                    label="Section Name:"
                                                    required
                                                    v-on:keyup="validateSectionName(indexTemplate)"
                                                ></v-text-field>
                                                    <p v-if="nameSectionIsvalid==false" style="color:red;">It is necessary a unique name with a maximum of 40 characters</p>
                                                </v-flex>
                                                <v-flex xs12>
                                                <v-btn class="info"  small @click="dialogCreateSection(indexTemplate)">Cancel</v-btn>
                                                <v-btn class="info" v-if="nameSectionIsvalid==true"  small @click="createSection(indexTemplate)">Create Section</v-btn>
                                                <v-btn class="info" v-if="nameSectionIsvalid==false" small  disabled>Create Section</v-btn>
                                                </v-flex>
                                            </v-layout>
                                            </v-container>
                                            
                                            </v-card>
                                        </v-dialog>
                                        </template>
                                </v-layout> 
                        </v-card>

                    </v-flex>
                    <v-flex  xs8 >  
                     
                      <v-card light color="white" style= "height:450px; overflow-y: scroll; overflow-x: scroll; " class="pa-3"  >
                        <template v-for="(templateSection,indexTemplateSection) in myTemplate.templateSections">  
                            <template v-if="sectionSelected == templateSection.sectionName" >    
                                <p class="title pt-2" :key="'mySectionTitle-'+indexTemplateSection">Section: <span style="color:#007bff;">{{templateSection.sectionName}}</span><span ><v-icon color="#007bff" class="pl-2 pb-1" v-on:click="dialogEditSection()" small >fas fa-edit</v-icon></span></p>
                                <v-container :key="'mySection-'+indexTemplateSection">
                                    <template v-for="(sectionMessage,indexSectionMessage) in templateSection.sectionMessages" >
                                        <!--------------------------------------Simple Text Message------------------------------------------>
                                        
                                         <fade-transition :key="'fade-transition-simpleMessage'+indexSectionMessage" group>
                                        <v-layout class="pb-4"   v-if="sectionMessage.type=='simple_text'" :key="'simpleMessage-'+indexSectionMessage"  style="width:2500px;">
                                            <template v-if="templateSection.sectionMessages.length>1" >
                                                <template v-if="isNotFirstOrLastPosition(indexTemplate,indexTemplateSection,indexSectionMessage)">
                                                    <span class="pl-2 pr-2 pt-3" slot="activator" v-on:click="upPosition(indexTemplate,indexTemplateSection,indexSectionMessage)" ><v-icon small>fas fa-arrow-up</v-icon></span>
                                                    <span class="pl-2 pr-4 pt-3" slot="activator" v-on:click="downPosition(indexTemplate,indexTemplateSection,indexSectionMessage)"  ><v-icon small>fas fa-arrow-down</v-icon></span>
                                                </template>
                                                <template v-if="isFirstPosition(indexSectionMessage)">
                                                    <span class="pl-2 pr-4 pt-3" ></span>
                                                    <span class="pl-2 pr-4 pt-3" slot="activator" v-on:click="downPosition(indexTemplate,indexTemplateSection,indexSectionMessage)" ><v-icon small>fas fa-arrow-down</v-icon></span>
                                                    
                                                
                                                </template>
                                                <template v-if="isLastPosition(indexTemplate,indexTemplateSection,indexSectionMessage)">
                                                    <span class="pl-2 pr-4 pt-3"></span>
                                                    <span class="pl-2 pr-4 pt-3" slot="activator" v-on:click="upPosition(indexTemplate,indexTemplateSection,indexSectionMessage)"><v-icon small>fas fa-arrow-up</v-icon></span>   
                                                </template>
                                            </template>
                                            <template v-if="templateSection.sectionMessages.length<=1">
                                                <template >
                                                    <span class="pl-2 pr-4 pt-3" ></span>
                                                    <span class="pl-2 pr-4 pt-3" ></span>
                                                </template>
                                            </template>
                                            <v-menu
                                            v-model="showMenu"
                                            :position-x="positionXdialog"
                                            :position-y="positionYdialog"
                                            offset-y
                                            style="max-width: 600px"
                                            >
                                            <v-list>
                                                <v-list-tile
                                                v-for="(item, index) in myAttributes"
                                                :key="index"
                                                >
                                                <v-list-tile-title v-on:click="addAttribute(item.title,indexTemplate,indexTemplateSection,indexSectionMessage)">{{ item.title }}</v-list-tile-title>
                                                </v-list-tile>
                                            </v-list>
                                            </v-menu>
                                            <span 
                                            class="pl-2 pr-2 text-xs-left" 
                                            oncontextmenu="return false;" 
                                            v-html="sectionMessage.text" 
                                            contenteditable="true" 
                                            v-on:click.right="displayMenu($event)" 
                                            v-on:keyup="isValidateSimpleText(indexTemplate,indexTemplateSection,indexSectionMessage,$event)"
                                            v-on:blur ="saveSimpleTextValue(indexTemplate,indexTemplateSection,indexSectionMessage,$event)" 
                                            v-on:key.space ="saveSimpleTextValue(indexTemplate,indexTemplateSection,indexSectionMessage,$event)"
                                            style="background-color:#E8E8E8;  width:300px; padding:16px; box-shadow: 0 3px 3px -2px rgba(0,0,0,.3),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12)!important; margin: 0;" 
                                            ></span>
                                            <span class="pl-3 pr-2 pt-3" contenteditable="false"><v-icon color="#007bff" v-on:click="deleteSimpleMessage(indexTemplate,indexTemplateSection,indexSectionMessage)"  small>fas fa-trash</v-icon></span>
                                            <template v-if="sectionMessage.error">
                                                <span class="pl-3 pr-2 pt-3"  contenteditable="false"><v-icon color="red"  small>fas fa-exclamation-circle</v-icon></span>
                                            </template>
                                          
                                        </v-layout>
                                         </fade-transition>
                                          <v-divider class="pb-2 pt-2" v-if="sectionMessage.type=='simple_text'" :key="'divider-'+indexSectionMessage"></v-divider>
                                          
                                        
                                        <!--------------------------------------Simple Text Message------------------------------------------>
                                    
                                        <!--------------------------------------Quick Replies------------------------------------------>
                                         <fade-transition :key="'fade-transition-quick-replies'+indexSectionMessage" group>
                                        <v-layout v-if="sectionMessage.type=='quick_reply'" :key="'quick-replies-'+indexSectionMessage" class="pt-2 pb-2" style="width:2500px;">
                                              
                                             <template v-if="templateSection.sectionMessages.length>1" >
                                                <template v-if="isNotFirstOrLastPosition(indexTemplate,indexTemplateSection,indexSectionMessage)">
                                                    <span class="pl-2 pr-2 pt-4" slot="activator" v-on:click="upPosition(indexTemplate,indexTemplateSection,indexSectionMessage)" ><v-icon small>fas fa-arrow-up</v-icon></span>
                                                    <span class="pl-2 pr-4 pt-4" slot="activator" v-on:click="downPosition(indexTemplate,indexTemplateSection,indexSectionMessage)"  ><v-icon small>fas fa-arrow-down</v-icon></span>
                                                    <span class="pl-2 pr-4 pt-4" v-if="isValidQuickReplyGroup(indexTemplate,indexTemplateSection,indexSectionMessage) ==false"><v-tooltip top><v-icon color="red" slot="activator"  small>fas fa-exclamation-circle</v-icon><span>{{myErrorQuickReply}}</span></v-tooltip></span>
                                                </template>
                                                <template v-if="isFirstPosition(indexSectionMessage)">
                                                    <span class="pl-2 pr-4 pt-4" ></span>
                                                    <span class="pl-2 pr-4 pt-4" slot="activator" v-on:click="downPosition(indexTemplate,indexTemplateSection,indexSectionMessage)" ><v-icon small>fas fa-arrow-down</v-icon></span>
                                                    <span class="pl-2 pr-4 pt-4" v-if="isValidQuickReplyGroup(indexTemplate,indexTemplateSection,indexSectionMessage) ==false"><v-tooltip top><v-icon color="red" slot="activator"  small>fas fa-exclamation-circle</v-icon><span>{{myErrorQuickReply}}</span></v-tooltip></span>
                                                
                                                </template>
                                                <template v-if="isLastPosition(indexTemplate,indexTemplateSection,indexSectionMessage)">
                                                    <span class="pl-2 pr-4 pt-4"></span>
                                                    <span class="pl-2 pr-4 pt-4" slot="activator" v-on:click="upPosition(indexTemplate,indexTemplateSection,indexSectionMessage)"><v-icon small>fas fa-arrow-up</v-icon></span>   
                                                    <span class="pl-2 pr-4 pt-4" v-if="isValidQuickReplyGroup(indexTemplate,indexTemplateSection,indexSectionMessage) ==false"><v-tooltip top><v-icon color="red" slot="activator"  small>fas fa-exclamation-circle</v-icon><span>{{myErrorQuickReply}}</span></v-tooltip></span>
                                                </template>
                                            </template>
                                            <template v-if="templateSection.sectionMessages.length<=1">
                                                <template >
                                                    <span class="pl-2 pr-4 pt-4" ></span>
                                                    <span class="pl-2 pr-4 pt-4" ></span>
                                                    <span class="pl-2 pr-4 pt-4" v-if="isValidQuickReplyGroup(indexTemplate,indexTemplateSection,indexSectionMessage) ==false"><v-tooltip top><v-icon color="red" slot="activator"  small>fas fa-exclamation-circle</v-icon><span>{{myErrorQuickReply}}</span></v-tooltip></span>
                                                </template>
                                            </template>
                                             <!--------------------------------------Quick Reply------------------------------------------> 
                                            <template v-for="(quickReply,indexQuickReply) in sectionMessage.quick_replies" >

                                            <v-hover  :key="'v-hover-index-quick-reply'+indexQuickReply">
                                            
                                            <span :id="'myQuickReply'+indexTemplate+indexTemplateSection+indexSectionMessage+indexQuickReply" slot-scope="{ hover }" v-on:click="dialogEditQuickReply(indexTemplate,indexTemplateSection,indexSectionMessage,indexQuickReply)" :class="indexQuickReply==0? `pl-2 pr-2 mr-2 elevation-${hover ? 2 : 4}`:`pl-2 pr-2 ml-2 mr-2 elevation-${hover ? 2 : 4}`"  style="background-color:transparent; width:200px; height:64px; border:solid 1px #007bff; margin: 1px 0 2px 0px; border-radius:5px;" >
                                                <v-tooltip top>
                                                <p  style="margin:0; padding:10px 0 0 0; height:30px" slot="activator">{{quickReply.title}}</p>
                                                
                                                <p  style="font-size:12px;"  slot="activator">Redirect to: <span style="color:#007bff;"><strong>{{quickReply.payload}}</strong></span></p>
                                                <span style="width:200px;">Click to change properties</span>
                                                </v-tooltip>
                                            </span>
                                           
                                             
                                            </v-hover>
                                            
                                            </template>
                                           
                                                    <v-dialog
                                                    v-model="dialogEditQuickReplyControl"
                                                    max-width="350"
                                                    

                                                    >
                                                        <v-card>
                                                        <v-container>
                                                        <v-layout row wrap class="text-xs-center">
                                                            <v-flex xs12>
                                                                <v-text-field
                                                                v-model="myQuickReplyTitle"
                                                                :counter="20"
                                                                label="Quick Reply title:"
                                                                required
                                                            ></v-text-field>  
                                                            </v-flex>
                                                            <v-flex xs12>
                                                                <v-select
                                                                v-model="myQuickReplyPayload"
                                                                :items="mySections"
                                                                label="Redirect to:"
                                                                ></v-select>
                                                            </v-flex>
                                                            <v-flex xs12>
                                                                <v-text-field
                                                                v-model="myAttributeName"
                                                                :counter="20"
                                                                label="Save answer as:"
                                                                required
                                                            ></v-text-field>  
                                                            </v-flex>
                                                            <v-flex xs12>
                                                            <v-btn class="info"  small @click="dialogEditQuickReply(indexTemplate,indexTemplateSection,indexSectionMessage,indexQuickReply)">Update quick reply</v-btn>
                                                            </v-flex>
                                                        </v-layout>
                                                        </v-container>
                                                        
                                                        </v-card>
                                                    </v-dialog>
                                            
                                            <!--------------------------------------Quick Reply------------------------------------------>
                                            
                                            <span class="pl-2 pr-2 pt-4"><v-icon color="#007bff" v-on:click="addQuickReply(indexTemplate,indexTemplateSection,indexSectionMessage)"   small>fas fa-plus-circle</v-icon></span> 
                                            <span class="pl-2 pr-2 pt-4"><v-icon color="#007bff" v-on:click="deleteQuickReply(indexTemplate,indexTemplateSection,indexSectionMessage)"  small>fas fa-minus-circle</v-icon></span>
                                            <span class="pl-4 pr-2 pt-4"><v-icon color="#007bff" v-on:click="deleteQuickReplyGroup(indexTemplate,indexTemplateSection,indexSectionMessage)"   small>fas fa-trash</v-icon></span> 
                                            
                                         
                                        </v-layout> 
                                        </fade-transition>
                                        <v-divider class="pb-2 pt-4" v-if="sectionMessage.type=='quick_reply'" :key="'divider-'+indexSectionMessage"></v-divider>
                                        
                                         
                                        <!--------------------------------------Quick Replies------------------------------------------>

                                         <!--------------------------------------Button Template------------------------------------------>
                                        
                                        <v-layout v-if="sectionMessage.type=='button_template'" :key="'buttonTemplate-1'+indexSectionMessage"  class="pb-0"  style="width:2500px;">
                                            <template v-if="templateSection.sectionMessages.length>1" >
                                                <template v-if="isNotFirstOrLastPosition(indexTemplate,indexTemplateSection,indexSectionMessage)">
                                                    <span class="pl-2 pr-2 pt-4" slot="activator" v-on:click="upPosition(indexTemplate,indexTemplateSection,indexSectionMessage)" ><v-icon small>fas fa-arrow-up</v-icon></span>
                                                    <span class="pl-2 pr-4 pt-4" slot="activator" v-on:click="downPosition(indexTemplate,indexTemplateSection,indexSectionMessage)"  ><v-icon small>fas fa-arrow-down</v-icon></span> 
                                                </template>
                                                <template v-if="isFirstPosition(indexSectionMessage)">
                                                    <span class="pl-2 pr-4 pt-4" ></span>
                                                    <span class="pl-2 pr-4 pt-4" slot="activator" v-on:click="downPosition(indexTemplate,indexTemplateSection,indexSectionMessage)" ><v-icon small>fas fa-arrow-down</v-icon></span>
                                                </template>
                                                <template v-if="isLastPosition(indexTemplate,indexTemplateSection,indexSectionMessage)">
                                                    <span class="pl-2 pr-4 pt-4"></span>
                                                    <span class="pl-2 pr-4 pt-4" slot="activator" v-on:click="upPosition(indexTemplate,indexTemplateSection,indexSectionMessage)"><v-icon small>fas fa-arrow-up</v-icon></span>   
                                                </template>
                                            </template>
                                            <template v-if="templateSection.sectionMessages.length<=1">
                                                <template >
                                                    <span class="pl-2 pr-4 pt-4" ></span>
                                                    <span class="pl-2 pr-4 pt-4" ></span>
                                                </template>
                                            </template>
                                            <span 
                                            class="pl-2 pr-2 text-xs-left" 
                                            oncontextmenu="return false;" 
                                            v-html="sectionMessage.text" 
                                            contenteditable="true" 
                                            v-on:click.right="displayMenu($event)" 
                                            v-on:keyup="isValidateSimpleText(indexTemplate,indexTemplateSection,indexSectionMessage,$event)"
                                            v-on:blur ="saveSimpleTextValue(indexTemplate,indexTemplateSection,indexSectionMessage,$event)" 
                                            v-on:key.space ="saveSimpleTextValue(indexTemplate,indexTemplateSection,indexSectionMessage,$event)"
                                            style="background-color:#E8E8E8;  width:300px; padding:16px; box-shadow: 0 3px 3px -2px rgba(0,0,0,.3),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12)!important; margin: 0;" 
                                            ></span>
                                            <span class="pl-3 pr-2 pt-3" contenteditable="false"><v-icon color="#007bff" v-on:click="deleteSimpleMessage(indexTemplate,indexTemplateSection,indexSectionMessage)"  small>fas fa-trash</v-icon></span>
                                            <template v-if="sectionMessage.error">
                                                <span class="pl-3 pr-2 pt-3"  contenteditable="false"><v-icon color="red"  small>fas fa-exclamation-circle</v-icon></span>
                                            </template>
                                        </v-layout>
                                        <template>
                                        <template v-for="(button,indexButton) in sectionMessage.buttons">
                                        <v-layout v-if="sectionMessage.type=='button_template'" :key="'layout-button'+indexSectionMessage+indexButton" :class="ispb5(indexTemplate,indexTemplateSection,indexSectionMessage,indexButton)? 'pb-5':'pb-0'" style="width:2500px;">
                                            
                                            <span  style="padding-left:42px;" class="mr-3 pt-4"><v-icon color="transparent"  small>fas fa-edit</v-icon></span>
                                            <v-hover  :key="'v-hover-button'+indexSectionMessage+indexButton">
                                                <span slot-scope="{ hover }" :class="`pl-2 pr-2 elevation-${hover ? 2 : 4}`" v-on:click="dialogEditbuttonTemplate(indexTemplate,indexTemplateSection,indexSectionMessage,indexButton)" style="background-color:transparent; width:300px; border:solid 1px #007bff; margin: 4px 0 2px 0; border-radius:5px;" >
                                                    <p class="pt-2" style="margin:0; padding:0;">{{button.title}}</p>
                                                    <p class="pt-0" style="font-size:12px;">Redirect to: <span style="color:#007bff;"><strong>{{button.payload}}</strong></span></p>
                                                </span>
                                            </v-hover>
                                            <template v-if="indexButton ==0 && sectionMessage.buttons.length==1 ">
                                            <span  class="pl-3 pr-2 pt-4"><v-icon color="#007bff" v-on:click="addButtonToTemplate(indexTemplate,indexTemplateSection,indexSectionMessage,indexButton)"  small>fas fa-plus-circle</v-icon></span>
                                            </template> 
                                            <template v-if="indexButton ==1 && sectionMessage.buttons.length==2">
                                            <span  class="pl-3 pr-2 pt-4"><v-icon color="#007bff" v-on:click="addButtonToTemplate(indexTemplate,indexTemplateSection,indexSectionMessage,indexButton)"  small>fas fa-plus-circle</v-icon></span>
                                            <span  class="pl-3 pr-2 pt-4"><v-icon color="#007bff" v-on:click="deleteButtonTemplate(indexTemplate,indexTemplateSection,indexSectionMessage,indexButton)"  small>fas fa-minus-circle</v-icon></span>
                                            </template> 
                                            <template v-if="indexButton ==2 && sectionMessage.buttons.length==3" >
                                            <span  class="pl-3 pr-2 pt-4"><v-icon color="#007bff" v-on:click="deleteButtonTemplate(indexTemplate,indexTemplateSection,indexSectionMessage,indexButton)"  small>fas fa-minus-circle</v-icon></span>
                                            </template> 
                                           
                                        </v-layout >
                                         
                                        </template>
                                       </template>
                                       <v-divider class="pb-2 pt-2" v-if="sectionMessage.type=='button_template'" :key="'divider-'+indexSectionMessage"></v-divider> 
                                      
                                        
                                        <!--------------------------------------Button Template------------------------------------------>

                                        <!--------------------------------------Gallery------------------------------------------>
                                        <v-layout v-if="sectionMessage.type=='gallery_template'"  :style="isAttributeEditable? 'width: 712px;':'width: 456px;'" :key="'list-categories-'+indexSectionMessage" >
                                            <span class="pl-2 pr-2 pt-3"><v-icon small  color="transparent">fas fa-arrow-up</v-icon></span>
                                            <span class="pl-2 pr-4 pt-3" ><v-icon small  color="transparent">fas fa-arrow-down</v-icon></span>
                                            <v-select
                                            :id="'gallery-'+indexTemplate+indexTemplateSection+indexSectionMessage"
                                            :items="listOfCategories"
                                            label="Select a category"
                                            v-model="sectionMessage.categorySelected"
                                            class="ml-2 mr-2"
                                            ></v-select>
                                            <v-select
                                            v-if="isAttributeEditable"
                                            :id="'gallery-'+indexTemplate+indexTemplateSection+indexSectionMessage"
                                            :items="listOfCategories"
                                            label="Select attribute"
                                            v-model="sectionMessage.categorySelected"
                                            class="ml-2 mr-2"

                                            ></v-select>
                                            <v-select
                                            v-if="isAttributeEditable"
                                            :id="'gallery-'+indexTemplate+indexTemplateSection+indexSectionMessage"
                                            :items="listOfCategories"
                                            label="Select value"
                                            v-model="sectionMessage.categorySelected"
                                            class="ml-2 mr-2"
                                            ></v-select>
                                            <span class="pl-3 pr-2 pt-4"><v-icon small  color="#007bff">fas fa-trash</v-icon></span>
                                            <span class="pl-2 pr-4 pt-4" ><v-icon small  color="#007bff">fas fa-question-circle</v-icon></span>
                                        </v-layout>
                                        
                                        <v-layout v-if="sectionMessage.type=='gallery_template'" style="margin-bottom:15px;" :key="'index-gallery-container'+indexTemplate+indexTemplateSection+indexSectionMessage+indexCategory" >
                                          <template    v-for="(category,indexCategory) in categories"> 
                                            <template v-if="category.categoryName ==sectionMessage.categorySelected">
                                            <template v-for="(myRow, indexMyRow) in category.myRows">
                                              
                                            <v-container class="pb-0 pl-0 " v-if="indexMyRow==0" :key="'first Card'+indexCategory+indexMyRow">
                                            
                                                <v-layout>
                                                    <span class="pl-2 pr-2 pt-3"><v-icon small>fas fa-arrow-up</v-icon></span>
                                                    <span class="pl-2 pr-4 pt-3" ><v-icon small>fas fa-arrow-down</v-icon></span>
                                                    <span class="pl-2 pr-2 text-xs-center" style="background-color:#007bff; width:300px; padding:56px; border:solid 1px #007bff; margin: 1px 0 2px 0px; border-radius:5px;" >
                                                    <p style="color:white;" class="title">{{myRow.title}}</p>
                                                    </span>
                                                </v-layout>
                                                <v-layout  >
                                                    <span class="pl-2 pr-2 pt-3"><v-icon small color="transparent">fas fa-arrow-up</v-icon></span>
                                                    <span class="pl-2 pr-4 pt-3" ><v-icon small color="transparent">fas fa-arrow-down</v-icon></span>
                                                    <span style="background-color:transparent; width:300px; padding:16px; border:solid 1px #007bff; border-radius:5px;" >
                                                    {{myRow.button}}
                                                    </span>
                                                </v-layout>
                                            </v-container>
                                            
                                            <v-container class="pb-0 pl-0" v-if="indexMyRow>0" :key="'card'+indexCategory+indexMyRow">
                                                <v-layout >
                                                    <span class="pl-2 pr-2 text-xs-center" style="background-color:#007bff; width:300px; padding:56px; border:solid 1px #007bff; margin: 1px 0 2px 0px; border-radius:5px;" >
                                                    <p style="color:white;" class="title">{{myRow.title}}</p>
                                                    </span>
                                                </v-layout>
                                                <v-layout >
                                                    <span style="background-color:transparent; width:300px; padding:16px; border:solid 1px #007bff; border-radius:5px;" >
                                                     {{myRow.button}}
                                                    </span>
                                                </v-layout>
                                            </v-container>
                                                </template>
                                            </template>
                                            </template>
                                        </v-layout>
                                         <v-divider class="pb-2 pt-2" v-if="sectionMessage.type=='gallery_template'" :key="'divider-'+indexSectionMessage"></v-divider>
                                        <!--------------------------------------Gallery------------------------------------------>
                                     
                                    </template>   
                                </v-container>
                                        <v-dialog
                                            v-model="dialogEditSectionControl"
                                            max-width="350"
                                            :key="'section-Dialog'+indexTemplateSection"
                                        >
                                            <v-card>
                                            <v-container>
                                            <v-layout row wrap class="text-xs-center">
                                                <v-flex xs12>
                                                    <v-text-field
                                                    v-model="mySectionName"
                                                    :counter="40"
                                                    label="Section Name:"
                                                    required
                                                    v-on:keyup="validateSectionNameEdit(indexTemplate,indexTemplateSection)"
                                                ></v-text-field>
                                                    <p v-if="nameSectionIsvalid==false" style="color:red;">It is necessary a unique name with a maximum of 40 characters</p>
                                                </v-flex>
                                                <v-flex xs12>
                                                <v-btn class="info"  small @click="dialogEditSection()">Cancel</v-btn>
                                                <v-btn class="info" v-if="nameSectionIsvalid==true"  small @click="updateSection(indexTemplate,indexTemplateSection)">Update Section</v-btn>
                                                <v-btn class="info" v-if="nameSectionIsvalid==false" small  disabled>Update Section</v-btn>
                                                </v-flex>
                                            </v-layout>
                                            </v-container>
                                            
                                            </v-card>
                                        </v-dialog>
                                        <v-dialog
                                            v-model="dialogEditbuttonTemplateControl"
                                            max-width="350"
                                            :key="'button-template-Dialog'+indexTemplateSection"

                                            >
                                            <v-card>
                                            <v-container>
                                            <v-layout row wrap class="text-xs-center">
                                                <v-flex xs12>
                                                    <v-text-field
                                                    v-model="myButtonTemplateTitle"
                                                    :counter="20"
                                                    label="Title button:"
                                                    required
                                                ></v-text-field>  
                                                </v-flex>
                                                <v-flex xs12>
                                                    <v-select
                                                    v-model="mybuttonPayload"
                                                    :items="mySections"
                                                    label="Redirect to:"
                                                    ></v-select>
                                                </v-flex>
                                                <v-flex xs12>
                                                <v-btn class="info"  small @click="dialogEditbuttonTemplate(indexTemplate,indexTemplateSection,indexSectionMessage,indexButton)">Update Button</v-btn>
                                                </v-flex>
                                            </v-layout>
                                            </v-container>
                                            
                                            </v-card>
                                        </v-dialog>
                            </template>
                        </template>
                      </v-card>
                    </v-flex>
                </v-layout>
                 <v-btn
                    :color="saveButtonColor"
                    key="save-button"
                    dark
                    fab
                    fixed
                    bottom
                    right
                    class="mb-5 mr-5"
                    v-on:click="saveTemplate()"
                >
                    <v-icon>fas fa-save</v-icon>
                    <v-icon>close</v-icon>
                </v-btn>    
            </v-container>
        </v-content>
        
        </template>
    </v-app>
</template>

<script>
 
 import adboyBotsUsersHeader from '@/components/adboyBotsUsersHeader';
 import {FadeTransition} from 'vue2-transitions';
 import axios from 'axios'; 
 import {store} from '../store';
 

 export default {
 components:{adboyBotsUsersHeader,FadeTransition},
 data: () => (
  {
    categories:null,
    isAttributeEditable:true,
    saveButtonColor:"green",
    leToken:"eyJhbGciOiJIUzI1NiJ9.MTAxNTU3MjQ0MjIzMTU4ODU.lEIff8h5JA0S065NFTb8jxGqfqJ8S2Zj_Hu88qVM3bk",
    fbPgId:"2199872320244258",
    mybuttonPayload:"",
    myButtonTemplateTitle:"",
    dialogEditbuttonTemplateControl:false,
    indexButton:"",
    myErrorQuickReply:"",
    indexTemplate:"",
    indexTemplateSection:"",
    indexSectionMessage:"",
    indexQuickReply:"",
    myQuickReplyPayload:"",
    myAttributeName:"",
    myQuickReplyTitle:"",
    myQuickReplyName:null,
    dialogEditQuickReplyControl:false,
    positionXdialog:null,
    positionYdialog:null,
    myAttributes:[{title:"First Title"},{title:"second title"},{title:"third title"}],
    showMenu:false,
    dialogEditSectionControl:false,
    dialogCreateSectionControl:false,
    dialogDeleteSectionControl:false,
    mySectionName:"",
    nameSectionIsvalid:false,
    dialogCreateTemplateControl:false,
    dialogDeleteTemplateControl:false,
    dialogEditTemplateControl:false,
    myTemplateName:"",
    nameTemplateIsvalid:false,
    mySections:[],
    typeOfMessages:[
        {description:"Simple Text Message" ,type:'simple_text'},
        {description:"Quick Replies",type:'quick_reply'},
        {description:"Button Template",type:'button_template'},
    ],
    templateSelected:"",
    sectionSelected:"Get Started",
    listOfContexts:
    [
        "Welcome",
        "Prices",
        "Questions",
    ],
    listOfCategories:['--'],
    templatesName:
    [],
    
    myTemplates:
    [
      {
        templateName:"Local Business or Place",
        templateSections:
        [
          {
            sectionName:"Get Started",
            isModifiable:false,
            subtitleSection:"First Section of every template",
            sectionMessages:
            [
                {
                  type:'simple_text',
                  text:"Welcome to our chatbot, it is nice to chat with you!",
                  error:true
                }
            ]
          }
        ]
      },
      {
        templateName:"Company Organization or Institution",
        templateSections:
        [
          {
            sectionName:"Get Started",
            isModifiable:false,
            subtitleSection:"First Section of every template",
            sectionMessages:
            [
                {
                  type:'simple_text',
                  text:"Welcome to our chatbot, it is nice to chat with you!",
                  error:false
                }
            ]
          }
        ]
      },
      {
        templateName:"Brand or Product",
        templateSections:
        [
          {
            sectionName:"Get Started",
            isModifiable:false,
            subtitleSection:"First Section of every template",
            sectionMessages:
            [
                {
                  type:'simple_text',
                  text:"Welcome to our chatbot, it is nice to chat with you!",
                  error:false
                }
            ]
          }
        ]
      },
      {
        templateName:"Artist, Band or Public Figure",
        templateSections:
        [
          {
            sectionName:"Get Started",
            isModifiable:false,
            subtitleSection:"First Section of every template",
            sectionMessages:
            [
                {
                  type:'simple_text',
                  text:"Welcome to our chatbot, it is nice to chat with you!",
                  error:false
                }
            ]
          }
        ]
      },
      {
        templateName:"Entertainment",
        templateSections:
        [
          {
            sectionName:"Get Started",
            isModifiable:false,
            subtitleSection:"First Section of every template",
            sectionMessages:
            [
                {
                  type:'simple_text',
                  text:"Welcome to our chatbot, it is nice to chat with you!",
                  error:false
                }
            ]
          }
        ]
      },
      {
        templateName:"Cause or Community",
        templateSections:
        [
          {
            sectionName:"Get Started",
            isModifiable:false,
            subtitleSection:"First Section of every template",
            sectionMessages:
            [
                {
                  type:'simple_text',
                  text:"Welcome to our chatbot, it is nice to chat with you!",
                  error:false,
                
                }
            ]
          }
        ]
      }
    ]
    
  }),
  mounted:function(){
      // let fbPgId = this.$route.params.id;
      //this.$set(this,"fbPgId",fbPgId);
      let categoriesJSON = [{"panel":[true],"buttonList":["Send message","Buy Now","Book Now","Get Quote","Pricing","Enquire now","Learn More","Schedule call","Schedule appointment","Request appointment"],"myRows":[{"title":"Service 1","subtitle":"Subtitle Service 1","button":"Send message"},{"title":"Service 2","subtitle":"Subtitle Service 2","button":"Send message"},{"title":"Service 3","subtitle":"Subtitle Service 3","button":"Send message"},{"title":"Title 4","subtitle":"Subtitle 4","button":"Send message"},{"title":"Title 5","subtitle":"Subtitle 5","button":"Send message"},{"title":"Title 6","subtitle":"Subtitle 6","button":"Send message"},{"title":"Title 7","subtitle":"Subtitle 7","button":"Send message"},{"title":"Title 8","subtitle":"Subtitle 8","button":"Send message"},{"title":"Title 9","subtitle":"Subtitle 9","button":"Send message"},{"title":"Title 10","subtitle":"Subtitle 10","button":"Send message"}],"headers":[{"_id":"5c34704ae02a724b7725f03f","text":"Actions","value":"actions","sortable":false,"align":"center"},{"_id":"5c34704ae02a724b7725f03e","text":"Title","value":"title","sortable":false,"align":"left"},{"_id":"5c34704ae02a724b7725f03d","text":"Subtitle","value":"subtitle","sortable":false,"align":"left"},{"_id":"5c34704ae02a724b7725f03c","text":"Button","value":"button","sortable":false,"align":"left"}],"_id":"5c34704ae02a724b7725f03b","categoryName":"Services","categoryIsEditable":false,"dialogDeleteCategory":false,"buttonSelected":"Select a button","labelCheckboxbutton":"Use same button all category","sameButtonAllCategory":true,"attrEditable":true,"dialogConfirmDeleteAttribute":false,"myAttributeText":null,"posAttributeOnheaders":null,"dialogAddNewAttribute":false,"dialogChangePropertiesAttributes":false},{"panel":[true],"buttonList":["Send message","Buy Now","Book Now","Get Quote","Pricing","Enquire now","Learn More","Schedule call","Schedule appointment","Request appointment"],"myRows":[{"title":"Development","subtitle":"Software Development","button":"Get Quote","imageUrl":"http://www.example.com/image.png"},{"title":"Title 2","subtitle":"Subtitle 2","button":"Get Quote","imageUrl":"http://www.example.com/image.png"},{"title":"Title 3","subtitle":"Subtitle 3","button":"Get Quote","imageUrl":"http://www.example.com/image.png"},{"title":"Title 4","subtitle":"Subtitle 4","button":"Get Quote","imageUrl":"http://www.example.com/image.png"},{"title":"Title 5","subtitle":"Subtitle 5","button":"Get Quote","imageUrl":"http://www.example.com/image.png"},{"title":"Title 6","subtitle":"Subtitle 6","button":"Get Quote","imageUrl":"http://www.example.com/image.png"},{"title":"Title 7","subtitle":"Subtitle 7","button":"Get Quote","imageUrl":"http://www.example.com/image.png"},{"title":"Title 8","subtitle":"Subtitle 8","button":"Get Quote","imageUrl":"http://www.example.com/image.png"},{"title":"Title 9","subtitle":"Subtitle 9","button":"Get Quote","imageUrl":"http://www.example.com/image.png"},{"title":"Title 10","subtitle":"Subtitle 10","button":"Get Quote","imageUrl":"http://www.example.com/image.png"}],"headers":[{"_id":"5c34704ae02a724b7725f03a","text":"Actions","value":"actions","sortable":false,"align":"center"},{"_id":"5c34704ae02a724b7725f039","text":"Title","value":"title","sortable":false,"align":"left"},{"_id":"5c34704ae02a724b7725f038","text":"Subtitle","value":"subtitle","sortable":false,"align":"left"},{"_id":"5c34704ae02a724b7725f037","text":"Button","value":"button","sortable":false,"align":"left"},{"_id":"5c34704ae02a724b7725f036","text":"Image Url","value":"imageUrl","sortable":false,"align":"left"}],"_id":"5c34704ae02a724b7725f035","categoryName":"Products","categoryIsEditable":true,"dialogDeleteCategory":false,"buttonSelected":"Select a button","labelCheckboxbutton":"Use same button all category","sameButtonAllCategory":true,"attrEditable":true,"dialogConfirmDeleteAttribute":false,"myAttributeText":"","posAttributeOnheaders":"3","dialogAddNewAttribute":false,"dialogChangePropertiesAttributes":false}];
      let categories =JSON.parse(categoriesJSON);
      this.$set(this,"categories",categories);
      console.log("categories..."+JSON.stringify(this.categories));
      store.commit('setCurrentFbPgId',"2199872320244258");
      //this.$set(this,'leToken',this.$cookie.get('request_adboyBots_token'));
      //this.getTemplate(fbPgId);
      //this.getInitialCategories();
  },
 methods:
  {
      getInitialCategories()
      {
          let url ='https://localhost/api/getCategories'; 
                axios({
                method:'get',
                url:url,
                 params: {
                fbPgId: this.fbPgId
                },
                headers: {'Authorization': `bearer ${this.leToken}`}
                })
                .then(response => {
                  console.log("Get Categories..."+JSON.stringify(response.data.categories));
                  let categories =response.data.categories;
                  this.$set(this,"categories",categories);
                  console.log("this.categories..."+JSON.stringify(this.categories));
                  categories.forEach(category => {
                      this.listOfCategories.push(category.categoryName);    
                  });
                  
                })
                .catch(function (error) {
                    console.log(error); 
                });
      },
      async getCategories(indexTemplate,indexTemplateSection)
      {
                let messageType = "gallery_template";
                await this.addMessage(messageType,indexTemplate,indexTemplateSection);
                
                let sectionMessagesLength = this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages.length-1;
                let galleryTogo ="#gallery-"+indexTemplate+indexTemplateSection+sectionMessagesLength;
                //alert("galleryTogo"+galleryTogo);
                //this.$vuetify.goTo(galleryTogo,{ offset: -300 });
                
                
                
      },
      getTemplate(fbPgId){
          let url ='https://localhost/api/getScript'; 
                axios({
                method:'get',
                url:url,
                 params: {
                fbPgId: fbPgId
                },
                headers: {'Authorization': `bearer ${this.leToken}`}
                })
                .then(response => {
                  console.log("Template was created with selected..."+JSON.stringify(response.data));
                  let myTemplatesLength =  response.data.myTemplates.length-1;
                  this.$set(this,"myTemplates", response.data.myTemplates);
                  this.listOFTemplates();
                  this.$set(this,"templateSelected", response.data.templateSelected);
                
                 
                })
                .catch(function (error) {
                    console.log(error);
                   
                });
      },
      saveTemplate(){
          console.log("this.templateSelected..."+this.templateSelected);
          console.log("this.templateSelected..."+JSON.stringify(this.myTemplates));
          let url ='https://localhost/api/createScript'; 
          this.$set(this,"saveButtonColor","yellow");
                axios({
                method:'post',
                url:url,
                data:{myTemplates:this.myTemplates,fbPgId:this.fbPgId,templateSelected:this.templateSelected},
                headers: {'Authorization': `bearer ${this.leToken}`}
                })
                .then(response => {
                  console.log("Template was created..."+JSON.stringify(response.data));
                  this.$set(this,"saveButtonColor","green");
                  this.$set(this,"templateSelected", response.data.templateSelected);
                  let myTemplatesLength =  response.data.myTemplates.length-1;
                  this.$set(this,"myTemplates", response.data.myTemplates);
                  this.listOFTemplates();
                  
                  
                })
                .catch(function (error) {
                    console.log(error);
                   
                });
      },
      dialogEditbuttonTemplate(indexTemplate,indexTemplateSection,indexSectionMessage,indexButton)
      {
          if(!this.dialogEditbuttonTemplateControl)
          {
              this.$set(this,"indexTemplate",indexTemplate);
              this.$set(this,"indexTemplateSection",indexTemplateSection);
              this.$set(this,"indexSectionMessage",indexSectionMessage);
              this.$set(this,"indexButton",indexButton);
              this.$set(this,'mybuttonPayload',this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage].buttons[indexButton].payload);
              this.$set(this,'myButtonTemplateTitle',this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage].buttons[indexButton].title);
              this.listOFSections();
              this.$set(this,'dialogEditbuttonTemplateControl',true);       
          }
          else
          {
              this.$set(this.myTemplates[this.indexTemplate].templateSections[this.indexTemplateSection].sectionMessages[this.indexSectionMessage].buttons[indexButton],'title',this.myButtonTemplateTitle);
              this.$set(this.myTemplates[this.indexTemplate].templateSections[this.indexTemplateSection].sectionMessages[this.indexSectionMessage].buttons[indexButton],'payload',this.mybuttonPayload);
              this.$set(this,'dialogEditbuttonTemplateControl',false);  
              this.$set(this,'myButtonTemplateTitle',"");
              this.$set(this,'mybuttonPayload',"");
              this.$set(this,"indexTemplate","");
              this.$set(this,"indexTemplateSection","");
              this.$set(this,"indexSectionMessage","");
              this.$set(this,"indexButton","");
          }  
      },
      ispb5(indexTemplate,indexTemplateSection,indexSectionMessage,indexButton)
      {
          if(this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage].buttons.length==1 && indexButton==0){return true;}
          if(this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage].buttons.length==2 && indexButton==1){return true;}
          if(this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage].buttons.length==3 && indexButton==2){return true;}
          else
          {
              return false;
          }
      },
      deleteButtonTemplate(indexTemplate,indexTemplateSection,indexSectionMessage,indexButton)
      {
          this.$delete(this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage].buttons,indexButton);
      },
      addButtonToTemplate(indexTemplate,indexTemplateSection,indexSectionMessage,indexButton)
      {

          let buttonsLength =this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage].buttons.length;
          let sectionNameButtonTemplate =  this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionName;
          if(buttonsLength !==3)
          {
            let newButton;
            if(buttonsLength==1)
            {
               newButton = {type:"postback",title:"Second Button",payload:sectionNameButtonTemplate};
            }
            if(buttonsLength==2)
            {
               newButton = {type:"postback",title:"Third Button",payload:sectionNameButtonTemplate};
            }
            this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage].buttons.push(newButton);
          }
      },
      isValidQuickReplyGroup(indexTemplate,indexTemplateSection,indexSectionMessage){
          if(indexSectionMessage==0){this.myErrorQuickReply="The first position in a section cannot be a quick reply"; return false;}
         
          if(indexSectionMessage>0)
          {
               let typeOfMessageMinusOne = this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage-1].type;
               console.log("typeOfMessageMinusOne..."+typeOfMessageMinusOne);

                if(typeOfMessageMinusOne =="simple_text" || typeOfMessageMinusOne =="button_template" || typeOfMessageMinusOne =="gallery_template" )
               {
                   console.log("Quick reply valid");
                   return true;
               }
               if(typeOfMessageMinusOne =="quick_reply")
               {
                   this.myErrorQuickReply="It is necessary a simple text, image or a button template above a quick reply so that this quick reply could be valid.";
                   console.log("Quick reply invalid");
                   return false;
               }

          }
         
      },
      deleteQuickReplyGroup(indexTemplate,indexTemplateSection,indexSectionMessage)
      {
          this.$delete(this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages,indexSectionMessage);
      },
      addQuickReply(indexTemplate,indexTemplateSection,indexSectionMessage)
      {
          if(this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage].quick_replies.length<10)
          {
          let quickRepliesLength = this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage].quick_replies.length+1;
          let positionPayload = this.myTemplates[indexTemplate].templateSections.length;
          let newQuickReply = {content_type:"text",title:`Quick reply ${quickRepliesLength}`,payload:this.sectionSelected,pos:positionPayload};
          this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage].quick_replies.push(newQuickReply);
         
          }
      },
      deleteQuickReply(indexTemplate,indexTemplateSection,indexSectionMessage)
      {
          if(this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage].quick_replies.length>1)
          {
          let indexQuickReply = this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage].quick_replies.length-1;
          this.$delete(this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage].quick_replies,indexQuickReply);
          }
      },
      listOFSections(){
        
        let indexTemplate = this.myTemplates.map(function(e){ return e.templateName}).indexOf(this.templateSelected);
        console.log("indexTemplate..."+indexTemplate);
        for(var j=0; j<this.myTemplates[indexTemplate].templateSections.length; j++)
        {
            console.log("section Name..."+this.myTemplates[indexTemplate].templateSections[j].sectionName);
            let sectionName =this.myTemplates[indexTemplate].templateSections[j].sectionName;
            this.mySections.push(sectionName);
        }
      },
      dialogEditQuickReply(indexTemplate,indexTemplateSection,indexSectionMessage,indexQuickReply){
          if(!this.dialogEditQuickReplyControl)
          {
              console.log("indexSectionMessage..."+indexSectionMessage+"indexQuickReply..."+indexQuickReply);
              this.$set(this,"indexTemplate",indexTemplate);
              this.$set(this,"indexTemplateSection",indexTemplateSection);
              this.$set(this,"indexSectionMessage",indexSectionMessage);
              this.$set(this,"indexQuickReply",indexQuickReply);
              this.$set(this,'myQuickReplyPayload',this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage].quick_replies[indexQuickReply].payload);
              this.$set(this,'myQuickReplyTitle',this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage].quick_replies[indexQuickReply].title);
              this.$set(this,'myAttributeName',this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage].attributeName);
              this.listOFSections();
              this.$set(this,'dialogEditQuickReplyControl',true);       
          }
          else
          {
              this.$set(this.myTemplates[this.indexTemplate].templateSections[this.indexTemplateSection].sectionMessages[this.indexSectionMessage].quick_replies[this.indexQuickReply],'title',this.myQuickReplyTitle);
              this.$set(this.myTemplates[this.indexTemplate].templateSections[this.indexTemplateSection].sectionMessages[this.indexSectionMessage].quick_replies[this.indexQuickReply],'payload',this.myQuickReplyPayload);
              this.$set(this.myTemplates[this.indexTemplate].templateSections[this.indexTemplateSection].sectionMessages[this.indexSectionMessage],'attributeName',this.myAttributeName);
              this.$set(this,'dialogEditQuickReplyControl',false);  
              this.$set(this,'myQuickReplyTitle',"");
              this.$set(this,'myQuickReplyPayload',"");
              this.$set(this,'myAttributeName',"");
              this.$set(this,"indexTemplate","");
              this.$set(this,"indexTemplateSection","");
              this.$set(this,"indexSectionMessage","");
              this.$set(this,"indexQuickReply","");
          }  
      },
      deleteSimpleMessage(indexTemplate,indexTemplateSection,indexSectionMessage){
          this.$delete(this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages,indexSectionMessage);
      },
      downPosition(indexTemplate,indexTemplateSection,indexSectionMessage)
      {
          console.log("down Position");
          let posMsgInt = indexSectionMessage+1;
          let positionPlusOne = this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[posMsgInt];
         
          let myPosition= this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage];
          this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages.splice(indexSectionMessage+1,1,myPosition);
          this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages.splice(indexSectionMessage,1,positionPlusOne);
         

      },
      upPosition(indexTemplate,indexTemplateSection,indexSectionMessage)
      {
           console.log("up Position");
           let posMsgInt = indexSectionMessage-1;
           let positionMinusOne = this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[posMsgInt];
         
           let myPosition= this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage];
          
           this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages.splice(indexSectionMessage-1,1,myPosition);
           this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages.splice(indexSectionMessage,1,positionMinusOne);
           
           
      },
      addAttribute(itemTitle,indexTemplate,indexTemplateSection,indexSectionMessage)
      {
          alert("Item List..."+itemTitle+"..."+indexTemplate+indexTemplateSection+indexSectionMessage);
          let mySimpleMessage = this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage].text;
          alert("mySimpleMessage..."+mySimpleMessage);
          mySimpleMessage +=`<span style="background-color:#007bff; color:white; padding:5px; margin-left:2px; margin-right:2px; border-radius:5px;" contenteditable='false'>${itemTitle}</span>`;
          this.$set(this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage],'text',mySimpleMessage)
      },
      displayMenu(event)
      {
          //console.log("event.clientX..."+event.clientX+"event.clientY..."+event.clientY);
       
           
            
// component is the parent of all the columns
            var currentCaretPosition = getCaretPosition(component);
            this.$set(this,"positionXdialog",event.clientX);
            this.$set(this,"positionYdialog",event.clientY);
            
            this.$set(this,"showMenu",true);
          
      },
      saveSimpleTextValue(indexTemplate,indexTemplateSection,indexSectionMessage,event){
          if(this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage].error !==true)
          {
              console.log("It is not error on blur..."+event.target.innerText);
              this.$set(this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage],"text",event.target.innerText);
          }
      },
      isValidateSimpleText(indexTemplate,indexTemplateSection,indexSectionMessage,event)
      {
          console.log("on key up!");
          if(this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage].type=="simple_text" || this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage].type=="button_template")
          {
              console.log("It is simple text!");
                if(event.target.innerText=="")
                {
                    console.log("It is error"+event.target.innerText);
                   this.$set(this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage],"error",true);
                   this.$set(this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage],"text","");
                }
                if(event.target.innerText !=="")
                {
                    console.log("It is not error"+event.target.innerText);
                    this.$set(this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages[indexSectionMessage],"error",false);
                }
          }
      },
      isNotFirstOrLastPosition(indexTemplate,indexTemplateSection,indexSectionMessage){
          let sectionMessagesLength =this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages.length-1;
          if(sectionMessagesLength !==indexSectionMessage && indexSectionMessage !==0)
          {
              return true;
          }
            else
          {
              return false;
          }
      },
      isLastPosition(indexTemplate,indexTemplateSection,indexSectionMessage)
      {
          let sectionMessagesLength =this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages.length-1;
          if(sectionMessagesLength ==indexSectionMessage)
          {
              return true;
          }
          if(sectionMessagesLength !==indexSectionMessage)
          {
              return false;
          }

      },
      isFirstPosition(indexSectionMessage)
      {
          if(indexSectionMessage ==0)
          {
              return true
          }
          if (indexSectionMessage >0)
          {
              return false
          }
      },
      addMessage(typeOfMessage,indexTemplate,indexTemplateSection)
      {
         
          switch(typeOfMessage) {
            case 'simple_text':
                console.log("I am simple_text");
                let positionNewSimpleMessage = this.myTemplates[indexTemplate].templateSections.length+1;
                let newSimpleMessage =  {type:'simple_text',text:`Simple text message`,error:false};
                this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages.push(newSimpleMessage);
                break;
            case 'quick_reply':
                console.log("I am quick_reply");
                let sectionName = this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionName;
                let positionPayload = this.myTemplates[indexTemplate].templateSections.length+1;
                let newQuickReplyGroup =  
                {type:'quick_reply', 
                "quick_replies":[ 
                {content_type:"text",title:"Quick reply 1",payload:sectionName,pos:positionPayload}],
                attributeName:"",
                attributeValue:"",
                error:false};
                this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages.push(newQuickReplyGroup);
                console.log(JSON.stringify(this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages));
                break;
            case 'button_template':
                 let sectionNameButtonTemplate =  this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionName;
                 let position = this.myTemplates[indexTemplate].templateSections.length+1;
                 let newButtonTemplate = {type:'button_template',text:`Button template message`,error:false,buttons:[{type:"postback",title:"First Button",payload:sectionNameButtonTemplate}]};
                 this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages.push(newButtonTemplate);
                 console.log(JSON.stringify(this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages));

            break;
            case 'gallery_template':
                //let position = this.myTemplates[indexTemplate].templateSections[indexTemplateSection].length;
                let newGalleryTemplate = {type:'gallery_template',categorySelected:"--"};
                this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionMessages.push(newGalleryTemplate); 
               
            break;
            }
      },
      updateSection(indexTemplate,indexTemplateSection)
      {
          this.$set(this.myTemplates[indexTemplate].templateSections[indexTemplateSection],'sectionName',this.mySectionName);
          this.$set(this,'sectionSelected',this.mySectionName);
          this.$set(this,'dialogEditSectionControl',false);
          this.$set(this,'mySectionName',"");
      },
      validateSectionNameEdit(indexTemplate,indexTemplateSection)
      {
            let pos =this.myTemplates[indexTemplate].templateSections.map(function(e) { return e.sectionName; }).indexOf(this.mySectionName);
            console.log("pos..."+pos);
            if(pos!==indexTemplateSection)
            {
                if(this.mySectionName.trim().length>40 || pos>=0  || this.mySectionName.trim() =="")
                {
                    console.log("It is invalid..."+this.mySectionName);
                    this.$set(this,"nameSectionIsvalid",false);
                }
                if(this.mySectionName.trim().length<=40 && pos<0  && this.mySectionName.trim() !=="")
                {
                        console.log("It is valid..."+this.mySectionName);
                        this.$set(this,"nameSectionIsvalid",true);
                }
            }
            if(pos==indexTemplateSection)
            {
                if(this.mySectionName.trim().length>40  || this.mySectionName.trim() =="")
                {
                    console.log("It is invalid..."+this.mySectionName);
                    this.$set(this,"nameSectionIsvalid",false);
                }
                if(this.mySectionName.trim().length<=40  && this.mySectionName.trim() !=="")
                {
                        console.log("It is valid..."+this.mySectionName);
                        this.$set(this,"nameSectionIsvalid",true);
                }
            }
            
      },
      dialogEditSection()
      {
         if(!this.dialogEditSectionControl)
          {
              this.$set(this,'nameSectionIsvalid',true);
              this.$set(this,'mySectionName',this.sectionSelected);
              this.$set(this,'dialogEditSectionControl',true);       
          }
          else
          {
              this.$set(this,'dialogEditSectionControl',false);  
              this.$set(this,'mySectionName',"");  
          }  
      },
      deleteSection(indexTemplate,sectionSelected)
      {
          console.log("indexTemplate..."+indexTemplate+"sectionSelected..."+sectionSelected);
          let pos = this.myTemplates[indexTemplate].templateSections.map(function(e) { return e.sectionName; }).indexOf(sectionSelected);
          this.$delete(this.myTemplates[indexTemplate].templateSections,pos);
          let templateSectionsLength = this.myTemplates[indexTemplate].templateSections.length-1;
          this.$set(this,'sectionSelected',this.myTemplates[indexTemplate].templateSections[templateSectionsLength].sectionName);
          this.$set(this,'dialogDeleteSectionControl',false);
      },
      dialogDeleteSection(indexTemplate,indexTemplateSection)
      {
          if(!this.dialogDeleteSectionControl)
          {
              this.$set(this,"sectionSelected",this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionName);
              this.$set(this,'dialogDeleteSectionControl',true);       
          }
          else
          {
              this.$set(this,'dialogDeleteSectionControl',false);    
          } 
      },
      changePosSection(indexTemplate,indexTemplateSection)
      {
        this.$set(this,'sectionSelected',this.myTemplates[indexTemplate].templateSections[indexTemplateSection].sectionName);
      },
      createSection(indexTemplate)
      {
        
        if(this.mySectionName =="")
        {
            this.$set(this,"nameSectionIsvalid",false);
        }
        let newSection =
        {
            sectionName:this.mySectionName,
            isModifiable:true,
            subtitleSection:this.mySectionName,
            sectionMessages:[]
        };

        this.myTemplates[indexTemplate].templateSections.push(newSection);  
        this.$set(this,'sectionSelected',this.mySectionName); 
        this.$set(this,'dialogCreateSectionControl',false);    
        this.$set(this,'mySectionName',""); 
        //console.log("this.myTemplates[indexTemplateSection].templateSections..."+JSON.stringify(this.myTemplates[indexTemplate].templateSections));

      },
      dialogCreateSection(indexTemplate)
      {
          if(!this.dialogCreateSectionControl)
          {
              let sectionsLength = this.myTemplates[indexTemplate].templateSections.length+1;
              this.$set(this,'mySectionName',`section ${sectionsLength}`);
              this.validateSectionName(indexTemplate);
              this.$set(this,'dialogCreateSectionControl',true);       
          }
          else
          {
              this.$set(this,'mySectionName',"");    
              this.$set(this,'dialogCreateSectionControl',false);    
          }
      },
      validateSectionName(indexTemplate)
      {

            let pos =this.myTemplates[indexTemplate].templateSections.map(function(e) { return e.sectionName; }).indexOf(this.mySectionName);
            console.log("pos..."+pos);
            if(this.mySectionName.trim().length>40 || pos>=0  || this.mySectionName.trim() =="")
            {
                console.log("It is invalid..."+this.mySectionName);
                this.$set(this,"nameSectionIsvalid",false);
            }
            if(this.mySectionName.trim().length<=40 && pos<0  && this.mySectionName.trim() !=="")
            {
                    console.log("It is valid..."+this.mySectionName);
                    this.$set(this,"nameSectionIsvalid",true);
            }
      },
      deleteTemplate(indexTemplate)
      {
        
         if(indexTemplate>=0)
         {
            this.$delete(this.myTemplates,indexTemplate);
            this.templatesName.splice(indextemplateSelectedTemplate,1)
            let myTemplatesLength = this.myTemplates.length-1;
            console.log("myTemplatesLength..."+myTemplatesLength);
            this.$set(this,"templateSelected",this.templatesName[myTemplatesLength]);
            this.$set(this,"dialogDeleteTemplateControl",false);
            this.$set(this,"myTemplateName","");
         }
         
      },
      dialogDeleteTemplate()
      {
          if(!this.dialogDeleteTemplateControl)
          { this.$set(this,'dialogDeleteTemplateControl',true);}
          else{this.$set(this,'dialogDeleteTemplateControl',false);}
      },
      updateNameTemplate(indexTemplate)
      {
          this.templatesName.splice(indexTemplate,1,this.myTemplateName);
          this.$set(this,"templateSelected",this.myTemplateName);
          this.$set(this,'dialogEditTemplateControl',false);
          this.$set(this,"nameTemplateIsvalid",false);
          this.$set(this.myTemplates[indexTemplate],"templateName",this.myTemplateName);
      },
      validateNameTemplateEdit(indexTemplate)
      {
          //alert("On key up..."+indexTemplate);
          this.myTemplateName.trim();
          for(var j=0; j<this.myTemplates.length; j++)
          {
            if(indexTemplate !== j)
            {
                if(this.myTemplateName.trim().length>40 || this.myTemplateName.trim() == this.myTemplates[j].templateName || this.myTemplateName.trim() =="")
                {
                    console.log("It is invalid..."+this.myTemplateName);
                    this.$set(this,"nameTemplateIsvalid",false);
                }
                if(this.myTemplateName.length<=40 && this.myTemplateName.trim() !== this.myTemplates[j].templateName && this.myTemplateName.trim() !=="")
                {
                     console.log("It is valid..."+this.myTemplateName);
                    this.$set(this,"nameTemplateIsvalid",true);
                }
            }
          }
      },
      dialogNameTemplateEdit()
      {
          
         
           if(!this.dialogEditTemplateControl)
          {
              //console.log("this.myGroupName"+this.myGroupName);
              this.$set(this,"nameTemplateIsvalid",true);
              this.$set(this,"myTemplateName",this.templateSelected);

              let indexTemplate = this.templatesName.indexOf(this.myTemplateName);

              this.validateNameTemplateEdit(indexTemplate);

              this.$set(this,'dialogEditTemplateControl',true);       
          }
          else
          {
              this.$set(this,'dialogEditTemplateControl',false);
              this.$set(this,"myTemplateName","");
              this.$set(this,"nameTemplateIsvalid",false);
          }
      },
      listOFTemplates()
      {
            for(var j=0; j<this.myTemplates.length; j++)
            {
                this.templatesName.push(this.myTemplates[j].templateName);
            }
      },
      createTemplate()
      {
          let newTemplate = { templateName:this.myTemplateName,templateSections:[{
            sectionName:"Get Started",
            subtitleSection:"First Section of every template",
            isModifiable:true,
            payload:"--",
            sectionMessages:
            [
                {
                  type:'simple_text',
                  text:"Welcome to our chatbot, it is nice to chat with you!"
                }
            ]
          }]};
          
          this.myTemplates.push(newTemplate);
          this.templatesName.push(this.myTemplateName);
          console.log("This is the template sent to the server..."+JSON.stringify(this.myTemplates));
          this.$set(this,"templateSelected",this.myTemplateName)
          this.$set(this,'dialogCreateTemplateControl',false);
          this.$set(this,'nameTemplateIsvalid',false);
          this.$set(this,'myTemplateName',"");

      },
      dialogNameTemplate()
      {
         if(!this.dialogCreateTemplateControl)
          {
              //console.log("this.myGroupName"+this.myGroupName);
              this.$set(this,'dialogCreateTemplateControl',true);       
          }
          else
          {
              this.$set(this,"myTemplateName","");
              this.$set(this,'dialogCreateTemplateControl',false);
          }
      },
      validateNameTemplate()
      {
          
            if(this.myTemplateName.trim().length>40 || this.templatesName.indexOf(this.myTemplateName.trim()) >=0  || this.myTemplateName.trim() =="")
            {
                console.log("It is invalid..."+this.myTemplateName);
                this.$set(this,"nameTemplateIsvalid",false);
            }
            if(this.myTemplateName.trim().length<=40 && this.templatesName.indexOf(this.myTemplateName.trim()) <0  && this.myTemplateName.trim() !=="")
            {
                 console.log("It is valid..."+this.myTemplateName);
                 this.$set(this,"nameTemplateIsvalid",true);
            }
          

          
      }
  }
}
 
 </script>

 <style>
/* width */
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #E8E8E8;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #4da3ff;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #007bff; 
}
</style>
