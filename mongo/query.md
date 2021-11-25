# query

## basic find with projection

    db.getCollection('organizations').find({ _id: ObjectId("60892ce1c637cb77ba66cfe4") }, { companyName: 1 })

## aggregate and sort by nested array size with projections, nested matches and limit

    db.getCollection('organizations').aggregate([
        {
            $project : { count: {$size: { "$ifNull": [ "$members", [] ] } }, companyName: 1, 'feature-flags': 1 }
        },
        {
            $sort: {"count":-1}
        },
        {
            $match: { $and: [{ "count": { $lte: 20 }}, {"count": { $gte: 1 }}] }
        },
        {
            $match: { "feature-flags.featureName": { $ne: "advanced-esignature" } }
        },
        {
            $limit: 5
        }
    ])

## export collection

    mongoexport \
        --collection feature-flags \
        --db j2-preprod \
        --uri='mongodb+srv://jurotest.mwjmw.mongodb.net' \
        --username preprodApp \
        --password UGjOFF8Xa84lN8Ox \
        --quiet \
        > ./feature-flags.json

## import collection

    cat ./feature-flags.json | mongoimport \
        --collection feature-flags \
        --db j2-dev \
        --uri='mongodb://localhost:27017' \
        --quiet

## backup all from docker

    docker-compose exec mongo bash
    mkdir -p /tmp/backup && mongodump -d j2-dev -o /tmp/backup
    docker cp juro-mean_mongo_1:/tmp/backup/. ./backup/

## restore all into docker

    docker cp ./backup juro-mean_mongo_1:/tmp/
    docker-compose exec mongo bash
    mongorestore -d j2-dev /tmp/backup
