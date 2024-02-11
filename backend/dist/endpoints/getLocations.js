export function getLocations(req, res, database) {
    const restaurantLocations = database.locations;
    res.send(JSON.stringify(restaurantLocations));
}
