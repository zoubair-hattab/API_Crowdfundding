import connectDB from '../../../utils/connectDB'
import  Compaings from '../../../models/compaingModel'
import auth from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getCompaing(req, res)
            break;
        case "PUT":
            await updateCompaing(req, res)
            break;
        case "DELETE":
            await deleteCompaing(req, res)
            break;
    }
}
const getCompaing = async (req, res) => {
    try {
        const { id } = req.query;

        const compaing = await Compaings.findById(id)
        if(!compaing) return res.status(400).json({err: 'This compaing does not exist.'})
        
        res.json({ compaing })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}
const updateCompaing= async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin') 
        return res.status(400).json({err: 'Authentication is not valid.'})

        const {id} = req.query
        
        const {
            title, 
            short_description, 
            long_description , 
            status, 
            start_date, 
            end_date,
            creator_address,
            full_name,
            email,
            phone_number,
            linkedin_link,
            telegram,
            images    
         } 
     = req.body
     const errMsg = valid(   title, 
                             short_description,  
                             long_description , 
                             status,   
                             creator_address, 
                             full_name,
                             email,
                             phone_number,
                             linkedin_link,
                             telegram,
                             images )
     if(errMsg) return res.status(400).json({err: errMsg})

        await Compaings.findOneAndUpdate({_id: id}, {
                             title, 
                             short_description,  
                             long_description , 
                             status,   
                             creator_address, 
                             full_name,
                             email,
                             phone_number,
                             linkedin_link,
                             telegram,
                             images
        })

        res.json({msg: 'Success! Updated a Compaing'})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const deleteCompaing = async(req, res) => {
    try {
        const result = await auth(req, res)
        
        if(result.role !== 'admin') 
        return res.status(400).json({err: 'Authentication is not valid.'})

        const {id} = req.query

        await Compaings.findByIdAndDelete(id)
        res.json({msg: 'Deleted a Compaing.'})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}