# query

## basic find with projection

    db.getCollection('collection').find({ _id: ObjectId("60892ce1c637cb77ba66cfe4") }, { field: 1 })

## aggregate and sort by nested array size with projections, nested matches and limit

    db.getCollection('collection').aggregate([
        {
            $project : { count: {$size: { "$ifNull": [ "$members", [] ] } }, companyName: 1, 'some-field': 1 }
        },
        {
            $sort: {"count":-1}
        },
        {
            $match: { $and: [{ "count": { $lte: 20 }}, {"count": { $gte: 1 }}] }
        },
        {
            $match: { "some-field.subfield": { $ne: "some-value" } }
        },
        {
            $limit: 5
        }
    ])

## export collection

    mongoexport \
        --collection foos \
        --db "$DB" \
        --uri="$URI" \
        --username "$USERNAME" \
        --password "$PWD" \
        --quiet \
        > ./foos.json

## import collection

    cat ./foos.json | mongoimport \
        --collection foos \
        --db "$DB" \
        --uri='mongodb://localhost:27017' \
        --quiet

## backup all from docker

    docker-compose exec mongo bash
    mkdir -p /tmp/backup && mongodump -d j2-dev -o /tmp/backup
    docker cp mongo_container_1:/tmp/backup/. ./backup/

## restore all into docker

    docker cp ./backup mongo_container_1:/tmp/
    docker-compose exec mongo bash
    mongorestore -d "$DB" /tmp/backup
