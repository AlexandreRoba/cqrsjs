module.exports = {
    VERSION: require('./package.json').version,
    Guid: require('./lib/guid'),
    AggregateRoot: require('./lib/aggregateRoot'),
    Event: require('./lib/event'),
    Command: require('./lib/command'),
    Repository: require('./lib/base/repository')
};