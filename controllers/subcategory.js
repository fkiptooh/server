const Subcategory = require('../models/subcategory');
const slugify = require('slugify');
const Product = require('../models/product');

exports.create = async(req, res) => {
    try{
        const {name, parent} = req.body;
        const subcategory = await new Subcategory({name, parent, slug: slugify(name)}).save();
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
    const {name, parent} = req.body;
    try{
        const updated = await Subcategory.findOneAndUpdate({slug: req.params.slug}, {name, parent, slug: slugify(name)}, {new: true});
        res.json(updated);
    }catch(err){
        res.status(400).send("Subcategory update failed");
    }  
};

exports.read = async(req, res) => {
    let subcategory = await Subcategory.findOne({slug: req.params.slug}).exec();
    let products = await Product.find({ subcategories: subcategory})
    .populate('category')
    .exec();

    res.json({
        subcategory,
        products,
    });
};
