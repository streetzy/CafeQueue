export function deleteLocation(req, res, database) {
    const restaurantLocation = database.locations.find((location) => location.name === req.params.locationName);
    if (restaurantLocation == undefined) {
        return res.status(404).send("Invalid location");
    }
    database.locations.splice(database.locations.indexOf(restaurantLocation), 1);
    res.status(200).send("OK");
}
