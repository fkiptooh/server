const Subcategory = require('../models/subcategory');
const slugify = require('slugify');

exports.create = async(req, res) => {
    try{
        const {name} = req.body;
        const subcategory = await new Subcategory({name, slug: slugify(name)}).save();
        res.json(subcategory);
    } catch(err){
        console.log(err);
        res.status(400).send("Subcategory failed to create.");
    }

};

exports.list = async(req, res) => 
    res.json(await Subcategory.find().sort({createdAt: -1}).exec());

exports.remove = async(req, res) => {
    try{
        const deleted = await Subcategory.findOneAndDelete({slug: req.params.slug});
        res.json(deleted);
    }
    catch(err){
        res.status(400).send('Failed to delete subcategory');
    }
    
};

exports.update = async(req, res) => {
    const {name} = req.body;
    try{
        const updated = await Subcategory.findOneAndUpdate({slug: req.params.slug}, {name, slug: slugify(name)}, {new: true});
        res.json(updated);
    }catch(err){
        res.status(400).send("Subcategory update failed");
    }  
};

exports.read = async(req, res) => {
    let subcategory = await Subcategory.findOne({slug: req.params.slug}).exec();
    res.json(subcategory);
};
