export function getLocations(req, res, database) {
    const restaurantLocations = database.locations;
    res.json(restaurantLocations);
}
