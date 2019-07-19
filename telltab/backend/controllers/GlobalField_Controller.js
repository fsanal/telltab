const GlobalField = require('../models/GlobalField');

createGlobalField = (req, res) => {
    const { fieldName, searchable, filterable, sortable } = req.body;
    let field = new GlobalField({
        fieldName: fieldName
    });
    if (searchable) field.searchable = searchable;
    if (filterable) field.filterable = filterable;
    if (sortable) field.sortable = sortable;

    field.save((err, field) => {
        if (err) return res.json({success: false, error: err});
        return res.json(field);
    });
}

getGlobalField = (req, res) => {
    GlobalField.findById(req.params.id).exec(function(err, field) {
        if (err) return res.json({success: false, error: err});
		return res.json(field);
    });
}

deleteGlobalField = (req, res) => {
    GlobalField.findByIdAndRemove(req.params.id, (err, field) => {
        if (err) return res.json({success: false, error: err});
        return res.json(field);
    });
}

editGlobalField = (req, res) => {
    const { id } = req.params;
    const { fieldName, searchable, filterable, sortable } = req.body;
    let update = {};
    if (fieldName) update.fieldName = fieldName;
    if (searchable) update.searchable = searchable;
    if (filterable) update.filterable = filterable;
    if (sortable) update.sortable = sortable;
    GlobalField.findByIdAndUpdate ( id, { $set: update }, { new: true }, (err, field) => {
		if (err) return res.json({success: false, error: err});
		return res.json(field);
	});
}

module.exports = { createGlobalField, getGlobalField, deleteGlobalField, editGlobalField };