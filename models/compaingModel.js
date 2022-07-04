import mongoose from 'mongoose'

const compaingSchema = new mongoose.Schema({

    title: {type: String, required: true  ,trim: true},
    short_description: { type: String, required: true  ,trim: true},
    long_description: { type: String, required: true , trim: true},
    images: { type: Array , required: true  ,trim: true},
    status: { type: String, trim: true},
    amount:{type:Number,required: true ,trim: true},
    start_date:{ type: Date, default: Date.now  ,trim: true},
    end_date:{type: Date ,trim: true},
    creator_address: { type: String  ,trim: true},
    full_name:{type: String  ,required: true ,trim: true},
    email: { type: String, required: true,unique: true ,trim: true},
    phone_number:{type: Number, required: true,unique: true ,trim: true},
    linkedin_link: { type: String,unique: true ,trim: true},
    telegram : { type: String ,unique: true ,trim: true},
    contributor_address:{type:Array ,trim: true},
    numberOfContributor:{type:Number,default:0 ,trim: true}
}, 
{    timestamps: true
})

let Dataset = mongoose.models.compaing || mongoose.model('compaing', compaingSchema)
export default Dataset