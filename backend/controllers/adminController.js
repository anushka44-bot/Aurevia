import validator from 'validator'



const addDoctor=async(req,res)=>{
  try {
    const {name,email,password,speciality,degree,experience,about,fees,address}=req.body
    const imageFile=req.file

    //checking for all doctor data to add
    if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
      return res.json({success:false,message:"Missing Details"})
    }
    if(!validator.isEmail(email)){
      return res.json({success:false,message:"Please enter a valid email"})
    }
  
    
  } catch (error) {
    
  }
}

export {addDoctor}