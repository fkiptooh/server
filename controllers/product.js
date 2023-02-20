const Product = require("../models/product");
const User = require('../models/user');
const slugify = require("slugify");
// const { query } = require("express");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create product failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAll = async (req, res) => {
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subcategory")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.staus(400).send("Product delete failed");
  }
};

exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subcategory")
    .exec();
  res.json(product);
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("PRODUCT UPDATE ERROR ----> ", err);
    // return res.status(400).send("Product update failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

// Without pagination
// exports.list = async (req, res)=> {
//   try {
//     // createdAt, updatedAt, desc/asc 3..
//     const { sort, order, limit } = req.body;
//     const products = await Product.find({})
//     .populate('category')
//     .populate('subcategory')
//     .sort([[sort, order]])
//     .limit(limit)
//     .exec();

//     res.json(products);

//   }
//   catch(err) {
//     console.log(err);
//   }
// }


// WITH PAGINATION
exports.list = async (req, res) => {
  // console.table(req.body);
  try {
    // createdAt/updatedAt, desc/asc, 3
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3; // 3

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subcategory")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

exports.productsCount = async(req, res) => {
  const total = await Product.find({}).estimatedDocumentCount().exec();

  res.json(total);
}

exports.productStar = async(req, res) => {
  const product = await Product.findById(req.params.productId).exec();

  // Check that req.user is defined before trying to use it
  if (req.user) {
    const user = await User.findOne({email: req.user.email}).exec();
    console.log(user);

    const {star} = req.body;

    // Checking if the currently logged in user has left the rating on the product before;
    let existingRatingObject = product.ratings.find((ele) => ele.postedBy.toString() === user._id.toString());

    // if user haven't left rating yet, push the new ratings
    if (existingRatingObject === undefined) {
      let ratingAdded = await Product.findByIdAndUpdate(product._id,
        {$push: { ratings: { star, postedBy: user._id } } },
        {new: true},
      ).exec();
      console.log("Ratings added", ratingAdded);
      res.json(ratingAdded);
    } else {
       // if user had left rating initially, then update existing rating.
       const ratingUpdated = await Product.updateOne({
        ratings: { $elemMatch: existingRatingObject}
       }, {$set: {"ratings.$.star": star}},
       {new: true}).exec();

       console.log("ratingUpdated", ratingUpdated);

       res.json(ratingUpdated);
    }
  } 
}

exports.listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(3)
    .populate("category")
    .populate("subcategory")
    .populate("ratings.postedBy")
    .exec();

  res.json(related);
};

const handleQuery =async(req, res, query) => {
  const products = await Product.find({ $text: { $search: query}})
  .populate('category', '_id name')
  .populate('subcategory', '_id name')
  .populate('ratings.postedBy', '_id name')
  .exec();

  res.json(products);
}

exports.searchFilters = async(req, res)=> {
  const { query } = req.body;
  
  if(query){
    console.log("query", query);
    await handleQuery(req, res, query);
  }
}
