"use strict";

var path = require('path')
  , _ = require('underscore')


function join(rootPath, relativeParts) {
  var cleanRelativeParts = _.compact(relativeParts)
    , parts = [rootPath].concat(cleanRelativeParts)

  return path.join.apply(path, parts)
}

function buildRelativeRequire(rootPath) {
  return function relativeRequire() {
    var args = Array.prototype.slice.call(arguments)
      , absolutePath = join(rootPath, args)

    return require(absolutePath)
  }
}

exports.from = function(rootPath) {
  return buildRelativeRequire(rootPath)
}
