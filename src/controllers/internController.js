const collegeModel= require("../models/collegeModel");
const internModel= require("../models/internModel");

const isValid= function(value)
{
    if(typeof value===undefined || value== null) return false;
    if(typeof value===String && value.trim().length==0) return false;
    return true;
}

const isValidRespond= function(value)
{
    return Object.keys(value).length>0;
}

const isValidObjectId = function(objectId)
{
    return mongoose.Types.ObjectId.isValid(objectId)
}

const createIntern= async function(req, res)
{
    try
    {
        const data= req.body;
        if(isValidRespond(data))
        {
            const {name,email,mobile,collegeId} = data;       //collegeId? collegeName
    
            if(!isValid(name)) return res.status(400).send({status: false, message: "Name is not valid..!!"});
    
            if(!isValid(email)) return res.status(400).send({status:false, message:"Email is not valid..!!"});

            if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
            {
                return res.status(400).send({status: false, message: "Please enter a valid email..!!"});
            }

            if(!isValid(mobile)) return res.status(400).send({status:false, message: "Mobile number is not valid..!!"});

            if(!/^[6-9]\d{9}$/.test(mobile))
            {
                return res.status(400).send({status:false, message: "Please enter a valid mobile number..!!"});
            }
    
            // if(!isValid(collegeName)) return res.status(400).send({status:false, message:"College name is not valid..!!"});

            //Checking wheather the details are unique or not 
            const unique_email=await internModel.findOne({email:email}) 
            if(unique_email) return res.status(400).send({status:false, message:"This email is already registered..!!"});

            const unique_mobile= await internModel.findOne({mobile:mobile})
            if(unique_mobile) return res.status(400).send({status:false, message: "The mobile number is already registered..!!"});

            if(!isValidObjectId(collegeId))
            {
                return res.status(400).send({status: false, message: "enter a valid college ID"})
            }
            
            const college= await collegeModel.findById({_id: collegeId})
            if(!college) return res.status(404).send({status:false, message: "College not found..!!"});

            // const clgId=college._Id

            // data.collegeId=clgId;

            const newIntern = await internModel.create(data);
            res.status(200).send({status:true, message:data})
        }
        else
        {
            return res.status(400).send({status: false, message: "Info is needed..!!"});
        }
    }
    catch(err)
    {
        console.log(err)
        res.status(400).send({status: false, message:err.message});
    }
}

module.exports.createIntern= createIntern;