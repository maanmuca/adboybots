var mongoose = require('mongoose');
var Faq = mongoose.model('Faq',{
            myTemplateSections:
            [
                {
                    sectionName:
                    {
                        type: String,
                        required:false,
                        trim:true,
                    }
                }
                
            ],
            tag:
            {
                type: String,
                required:false,
                trim:true,

            },
            faqGroupNameSelected:
            {
                type: String,
                required:false,
                trim:true
            },
            facebookPageId:
            {
            type: String,
            required:true,
            minlength:3,
            trim:true,
            },
            botName:
            {
                type: String,
                required:true,
                minlength:3,
                trim:true,
                unique:true,  
            },
            faqs:
            [
                {
                    
                    faqName:
                    {
                        type: String,
                        required:false,
                        trim:true,
                    }
                    ,
                    tags:
                    [
                        {
                            text:
                            {
                                type: String,
                                required:false,
                                trim:true,
                            }
                        }
                    ]
                        
                }
                
            ],
            faqGroup:
            [
                {
                    faqGroupName: {
                        type: String,
                        required:false,
                        trim:true,
                    },
                    groupSelected:Boolean,
                    groupOfFaqs:
                    [
                        {
                            isSelected:Boolean,   
                            displaytags:Boolean,
                            faqName:
                            {
                                type: String,
                                required:false,
                                trim:true,
                            },
                            tags:
                            [
                                {
                                    text:{
                                        type: String,
                                        required:false,
                                        trim:true,
                                    }
                                }
                            ],
                            scriptSelected:
                            {
                                type: String,
                                required:false,
                                trim:true,
                            }
                        }
                    
                    ]
                }
            ]
        

    


});

module.exports ={Faq};