import PhotoModel from "../models/Photo.js"

export const getPhotos = async(req, res) => {
    try {
        const photos = await PhotoModel.find();
        res.status(200).json(photos);
    } catch (error) {
        res.status(404).json({message: 'Unknown error'}) // You can use the error var
    }
}

export const addPhotos = async(req, res) => {
    const photo = req.body;
    const newPhoto = new PhotoModel(photo);
    try {
        await newPhoto.save();
        res.status(201).json(newPhoto);
    } catch (error) {
        res.status(409).json({message: 'Unknown error'})
    }
}

export const deletePhoto = async(req, res) => {
    const { id } = req.params;
    
    try {
        await PhotoModel.findByIdAndDelete(id);
        const photos = await PhotoModel.find();
        res.status(200).json(photos);
    } catch (error) {
        res.status(409).json({message: 'Unknown error'})
    }
}
