export function addLocation(req, res, database) {
    const data = {
        id: idGenerator(database),
        name: req.body,
        orders: [],
    };
    database.locations.push(data);
    res.status(200).send("OK");
}
// Purpose of this is so that there are no duplicate IDs.
function idGenerator(db) {
    if (db.locations.length === 0)
        return 1;
    return db.locations[db.locations.length - 1].id + 1;
}
