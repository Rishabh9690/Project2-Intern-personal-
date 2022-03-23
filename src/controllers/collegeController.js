const collegeModel= require("../models/collegeModel");
const internModel= require("../models/internModel");

const isValid =function(value)
{
    if(typeof value=== undefined || value== null) return false;
    if(typeof value=== String && value.trim().length==0) return false;

    return true;
}

const isValidRequestBody= function (value)
{
    return Object.keys(value).length>0;
}

const createcollege =async function(req, res)
{
    try
    {
        const data = req.body;
        if(isValidRequestBody(data))
        {
            if(!isValid(data.name))  return res.status(400).send({status: false, message: "College Name is required..!!"});

            if(!isValid(data.fullName)) return res.status(400).send({status: false, message: "Full Name of College is required..!!"});

            if(!isValid(data.logoLink)) return res.status(400).send({status: false, message: "The link is not correct..!!"});

            const uniqueName= await collegeModel.findOne({name: data.name})
            if(uniqueName) return res.status(400).send({status: false, message: "Name already exist..!!"})
            
            const saveData= await collegeModel.create(data)
            res.status(200).send({status: true, message: "Data Saved..!!"})
        }
        else
        {
            res.send({message: "Please provide some data..!!"})
        }

    }
    catch(err)
    {
        console.log(err);
        return res.send({status: false, message: err.message})
    }
}


const collegeDetails = async function(req, res){
    try{    
        const data = req.query
        const collegeName = data.collegeName

        if(!isValidRequestBody(data)){
            return res.status(400).send({status : false, message: "Details of the college is missing..!!"})
        }

        if(!isValid(collegeName)){
            return res.status(400).send({status : false, message: "Please provide valid College Name..!!"})
        }

        const collegeInfo = await collegeModel.findOne({name : collegeName})

        if(!collegeInfo) {
            return res.status(404).send({status: false, message: "Invalid College Name..!!"})
        }

        const clgId = collegeInfo._id

        const internsInfo = await internModel.find({collegeId : clgId }).select({_id: 1, email: 1, name: 1, mobile: 1})
       

      const {name, fullName, logoLink} = collegeInfo

      const getInfo = {
                    name: name,
                    fullName : fullName,
                    logoLink : logoLink,
                    interns : internsInfo
                 }

        res.status(200).send({status: true, data: getInfo})

    } catch (error){
        res.status(500).send({error : error.message})
    }
}

module.exports.createcollege = createcollege;
module.exports.collegeDetails = collegeDetails;