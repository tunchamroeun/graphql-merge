import { __spread } from 'tslib';
import { get, set, flatten } from 'lodash';
import { isScalarType } from 'graphql';
import { asArray } from '@graphql-tools/utils/es5';

function chainFunctions(funcs) {
    if (funcs.length === 1) {
        return funcs[0];
    }
    return funcs.reduce(function (a, b) { return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return a(b.apply(void 0, __spread(args)));
    }; });
}

function resolveRelevantMappings(resolvers, path, allMappings) {
    var splitted = path.split('.');
    if (splitted.length === 2) {
        var typeName_1 = splitted[0];
        if (isScalarType(resolvers[typeName_1])) {
            return [];
        }
        var fieldName_1 = splitted[1];
        if (typeName_1 === '*') {
            return flatten(Object.keys(resolvers).map(function (typeName) {
                return resolveRelevantMappings(resolvers, typeName + "." + fieldName_1, allMappings);
            }));
        }
        if (fieldName_1 === '*') {
            return flatten(Object.keys(resolvers[typeName_1]).map(function (field) {
                return resolveRelevantMappings(resolvers, typeName_1 + "." + field, allMappings);
            })).filter(function (mapItem) { return !allMappings[mapItem]; });
        }
        else {
            var paths = [];
            if (resolvers[typeName_1] && resolvers[typeName_1][fieldName_1]) {
                if (resolvers[typeName_1][fieldName_1].subscribe) {
                    paths.push(path + '.subscribe');
                }
                if (resolvers[typeName_1][fieldName_1].resolve) {
                    paths.push(path + '.resolve');
                }
                if (typeof resolvers[typeName_1][fieldName_1] === 'function') {
                    paths.push(path);
                }
            }
            return paths;
        }
    }
    else if (splitted.length === 1) {
        var typeName_2 = splitted[0];
        return flatten(Object.keys(resolvers[typeName_2]).map(function (fieldName) {
            return resolveRelevantMappings(resolvers, typeName_2 + "." + fieldName, allMappings);
        }));
    }
    return [];
}
/**
 * Wraps the resolvers object with the resolvers composition objects.
 * Implemented as a simple and basic middleware mechanism.
 *
 * @param resolvers - resolvers object
 * @param mapping - resolvers composition mapping
 * @hidden
 */
function composeResolvers(resolvers, mapping) {
    if (mapping === void 0) { mapping = {}; }
    var mappingResult = {};
    Object.keys(mapping).map(function (resolverPath) {
        if (mapping[resolverPath] instanceof Array || typeof mapping[resolverPath] === 'function') {
            var composeFns_1 = mapping[resolverPath];
            var relevantFields = resolveRelevantMappings(resolvers, resolverPath, mapping);
            relevantFields.forEach(function (path) {
                mappingResult[path] = asArray(composeFns_1);
            });
        }
        else {
            Object.keys(mapping[resolverPath]).forEach(function (fieldName) {
                var composeFns = mapping[resolverPath][fieldName];
                var relevantFields = resolveRelevantMappings(resolvers, resolverPath + '.' + fieldName, mapping);
                relevantFields.forEach(function (path) {
                    mappingResult[path] = asArray(composeFns);
                });
            });
        }
    });
    Object.keys(mappingResult).forEach(function (path) {
        var fns = chainFunctions(__spread(asArray(mappingResult[path]), [function () { return get(resolvers, path); }]));
        set(resolvers, path, fns());
    });
    return resolvers;
}

export { composeResolvers };
//# sourceMappingURL=index.esm.js.map
