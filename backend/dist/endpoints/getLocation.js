export function getLocation(req, res, database) {
    const restaurantLocation = database.locations.find((location) => location.name === req.params.locationName);
    if (restaurantLocation == undefined) {
        return res.status(404).send("Invalid location");
    }
    res.json(restaurantLocation);
}
