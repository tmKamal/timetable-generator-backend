const Building = require("../models/building");
const HttpError = require("../models/http-error");



const getAllBuildings =  async(req, res) => {
  let buildings;
  try{
      buildings =await Building.find();
  }catch(err){
    const error=new HttpError('Something went wrong on DB',500);
    return next(error);
  }
  if(!buildings){
    const error=new HttpError('No Buildings found',404);  
    return next(error);
  }
  res.json({buildings:buildings.toObject({getters:true})});
  
};

const addBuilding = async (req, res, next) => {
 
  const { buildingName,lecHallCapacity,labCapacity,description } = req.body;
  
  const newBuilding = new Building({
    buildingName,
    lecHallCapacity,
    labCapacity,
    description
  });

  try {
    await newBuilding.save();
  } catch (err) {
      console.log(newBuilding);
    const error = new HttpError("Building has not created successfully, error on db", 500);
    return next(error);
  }

  res.status(201).json({Location:newBuilding.toObject({getters:true})});
};




exports.getAllBuildings=getAllBuildings;
exports.addBuilding=addBuilding;