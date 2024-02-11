export function getLocationOrder(req, res, database) {
    const restaurantLocation = database.locations.find((location) => location.name === req.params.locationName);
    if (restaurantLocation == undefined) {
        return res.status(404).send("Invalid location");
    }
    const requestedOrder = restaurantLocation.orders.find((order) => order.id == +req.params.orderID);
    if (requestedOrder == undefined)
        return res.status(404).send("Invalid order id");
    res.send(requestedOrder);
}
