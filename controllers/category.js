const Category = require('../models/category');
const Subcategory = require('../models/subcategory');
const Product = require('../models/product');
const slugify = require('slugify');

exports.create = async(req, res) => {
    try{
        const {name} = req.body;
        const category = await new Category({name, slug: slugify(name)}).save();
        res.json(category);
    } catch(err){
        console.log(err);
        res.status(400).send("Category failed to create.");
    }

};

exports.list = async(req, res) => 
    res.json(await Category.find().sort({createdAt: -1}).exec());

exports.remove = async(req, res) => {
    try{
        const deleted = await Category.findOneAndDelete({slug: req.params.slug});
        res.json(deleted);
    }
    catch(err){
        res.status(400).send('Failed to delete category');
    }
    
};

exports.update = async(req, res) => {
    const {name} = req.body;
    try{
        const updated = await Category.findOneAndUpdate({slug: req.params.slug}, {name, slug: slugify(name)}, {new: true});
        res.json(updated);
    }catch(err){
        res.status(400).send("Category update failed");
    }  
};

exports.read = async(req, res) => {
    let category = await Category.findOne({slug: req.params.slug}).exec();
    const products = await Product.find({category})
    .populate('category')
    .populate('ratings.postedBy', '_id name')
    .exec();

    res.json({
        category,
        products
    })
    // res.json(category);
};

exports.getSubcategory = (req, res)=> {
    Subcategory.find({parent: req.params._id}).exec((err, subcategory)=>{
        if(err) console.log(err);
        res.json(subcategory);
    })

}
