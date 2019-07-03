const Product = require('../models/Product')
var mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

createProduct = (req, res) => {
    const { name, url } = req.body;
    let product = new Product(
        {
            name,
            created: new Date(),
        }
    );
    if (url) product.url = url;
    product.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(product);
    });
}

getProduct = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(product);
    });
}

editProduct = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    let update = {};
    if (name) update.name = name; 
    Product.findByIdAndUpdate(id, {$set: update}, {new: true}, (err, product) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(product);
    });
}

deleteProduct = (req, res) => {
    const { id } = req.params;
    Product.findByIdAndRemove(id, (err, product) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(product);
    });
}

module.exports = { createProduct, getProduct, editProduct, deleteProduct }