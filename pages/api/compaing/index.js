import connectDB from '../../../utils/connectDB'
import bcrypt from "bcrypt"
import Compaings from '../../../models/compaingModel'
import User from '../../../models/userModel'

connectDB()
export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getCompaings(req, res)
            break;
        case "POST":
            await createCompagin(req, res)
            break;
    }
}

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString}

        const excludeFields = ['page', 'sort', 'limit']
        excludeFields.forEach(el => delete(queryObj[el]))
        if(queryObj.title !== 'all')
            this.query.find({title: {$regex: queryObj.title}})

        this.query.find()
        return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join('')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 3
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const getCompaings = async (req, res) => {
    try {
        const features = new APIfeatures(Compaings.find(), req.query)
        .filtering().sorting().paginating()

        const compaings = await features.query
        
        res.json({
            status: 'success',
            result: compaings.length,
            compaings
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const createCompagin = async (req, res) => {
    try {
        const {
            title, 
            creator_address,
            full_name,
            amount,
            email,
            phone_number,
            linkedin_link,
            telegram,
            images,
            short_description, 
            long_description   
         } 
     = req.body

     const newCompaing = new Compaings({
        title, 
        short_description, 
        long_description , 
         amount,
         full_name,
         email,
         phone_number,
         linkedin_link,
         telegram,
         images
     })
     const salt = bcrypt.genSaltSync(10);
     const hash = bcrypt.hashSync(req.body.email, salt);
    
     const savedCompaing=   await newCompaing.save()
        const newUser=new User({
            name:req.body.full_name,
            email:req.body.email,
            password:hash,
            compaing_id:savedCompaing._id,
           })
        await newUser.save();
        res.json({msg: 'Success! Created a new Compaing and you check you email plaise'})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}