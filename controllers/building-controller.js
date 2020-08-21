const Building = require("../models/building");
const HttpError = require("../models/http-error");

const getBuildingById = async (req, res, next) => {
  const bid = req.params.bid;
  let building;
  try {
      building = await Building.findById(bid);
  } catch (err) {
      const error = new HttpError('Something went wrong on DB side', 500);
      return next(error);
  }

  if (!building) {
      return next(new HttpError('No building found for the given id!!', 404));
  }
  res.json({ building: building.toObject({ getters: true }) });
};



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
  res.json({buildings:buildings.map((b)=>(b.toObject({getters:true})))});
  
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

  res.status(201).json({msg:'Building has been added successfully!'});
};

const updateBuilding = async (req, res, next) => {
  
  const buildingId = req.params.bid;
  const { buildingName,lecHallCapacity,labCapacity,description } = req.body;
  let selectedBuilding;
  try {
      selectedBuilding = await Building.findById(buildingId);
  } catch (err) {
      const error = new HttpError(
          'something went wrong on db side, when finding the Building id',
          500
      );
      return next(error);
  }
  selectedBuilding.buildingName = buildingName;
  selectedBuilding.lecHallCapacity = lecHallCapacity;
  selectedBuilding.labCapacity = labCapacity;
  selectedBuilding.description = description;

  try {
      await selectedBuilding.save();
  } catch (err) {
      const error = new HttpError('something went wrong on db side', 500);
      return next(error);
  }

  res.status(200).json({
      building: selectedBuilding.toObject({ getters: true }),msg:'Building has updated successfully!!'
  });
};

const deleteBuilding = async (req, res, next) => {
  const buildingId = req.params.bid;
  let selectedBuilding;
  try {
      selectedBuilding = await Building.findById(buildingId);
  } catch (err) {
      const error = new HttpError(
          'something went wrong on db side, when finding the given building id'
      );
      return next(error);
  }

  if (!selectedBuilding) {
      return next(
          new HttpError('there is no record for the given building id', 404)
      );
  }

  try {
      await selectedBuilding.remove();
  } catch (err) {
      const error = new HttpError(
          'couldnt delete the record, something went wrong on db side'
      );
      return next(error);
  }

  res.status(200).json({ building: 'Building has been deleted' });
};




exports.getAllBuildings=getAllBuildings;
exports.addBuilding=addBuilding;
exports.updateBuilding=updateBuilding;
exports.deleteBuilding=deleteBuilding;
exports.getBuildingById=getBuildingById;