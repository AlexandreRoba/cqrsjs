module.exports = {
    VERSION: require('./package.json').version,
    uuid: require('./lib/utils').uuid,
//    domain: require('./lib/domain'),
    AggregateRoot: require('./lib/base/aggregateRoot')

};