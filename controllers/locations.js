const Location = require('../models/Location');

// @desc Get all locations
// @route GET /api/v1/locations
// @access Public
exports.getLocations = async(req, res, next) => {
    try {
        const locations = await Location.find();

        return res.status(200).json({
            success: true,
            point: locations.length,
            data: locations
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Errors'});
    }
};

// @desc Create A Location
// @route POST /api/v1/locations
// @access Public
exports.addLocation = async (req, res, next) => {
    try {
        const location = await Location.create(req.body);

        return res.status(200).json({
            success: true,
            data: location
        });
    }
    catch (err) {
        console.error(err);
        if(err.code === 11000) {
            return res.status(400).json({ error: 'The Location Already Exists'})

        }
        res.status(500).json({ error: 'Server Error is'});
    }
};