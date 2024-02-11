import { checkLocation } from "../app.js";
export function addLocationOrder(req, res, database) {
    const parsedBody = JSON.parse(req.body);
    if (checkLocation(database, req)) {
        return res.status(404).send("Invalid location");
    }
    const data = {
        id: idGenerator(restaurantLocation.orders),
        description: parsedBody[0],
        isPrepared: parsedBody[1],
    };
    restaurantLocation.orders.push(data);
    res.status(200).send("OK");
}
// Under the assumption that a location won't accumulate a 100 orders and not fulfill any
// of them so that there wouldn't be duplicates.
function idGenerator(orderArray) {
    if (orderArray.length > 100)
        return 1;
    return orderArray.length + 1;
}
