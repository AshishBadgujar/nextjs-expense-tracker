import mongoose from 'mongoose'

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 
if(mm<10) 
{
    mm='0'+mm;
} 

const daySchema=new mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    days:[
        {
            _id:{
                type:String,
                default:`${dd}/${mm}/${yyyy}`,
                required:false
            },
            month:{
                type:Number,
                default:today.getMonth(),
                required:false
            },
            data:[
                {
                    text:{type:String,required:true},
                    amount:{type:Number,required:true},
                    category:{
                        type:String,
                        required:true,
                        enum:['Food','Rent','College','Other']
                    }
                }
            ]
        }
    ]
})

export default mongoose.models.day || mongoose.model('day',daySchema)