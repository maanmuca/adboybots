var mongoose = require('mongoose');
var Faq = mongoose.model('Faq',{
            templateName:
            {
                type: String,
                required:true,
                minlength:3,
                trim:true,  
            },
            facebookPageId:
            {
            type: String,
            required:true,
            minlength:3,
            trim:true,
            },
            selectedFaq:
            {
                type: String,
                required:false,
                trim:true
            },
            selectedGroup:Number,
            myScripts:
            [
                
                {
                    type: String,
                    required:false,
                    trim:true,
                }
                
            ],
            faqs:
            [
                {
                    
                    faqName:
                    {
                        type: String,
                        required:false,
                        trim:true,
                    },
                    scriptSelected:
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
                            },
                            isOpen:Boolean,
                            isModifiable:Boolean
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
                    panel:[Boolean],
                    groupOfFaqs:
                    [
                        {
                            isSelected:Boolean,   
                            faqName:
                            {
                                type: String,
                                required:false,
                                trim:true,
                            }
                            
                        }
                    
                    ],
                    isModifiable:Boolean
                }
            ]
        

    


});

module.exports ={Faq};