"use strict";

var _ = require('underscore')
  , relativeRequire = require('./relative_require')
  , requireRelative = relativeRequire.from(process.cwd())
  , ProjectTreeRequire


module.exports = ProjectTreeRequire = {}


function defineCustomDir(subDirPath, name) {
  ProjectTreeRequire[name] = function(relativePath) {
    return requireRelative(subDirPath, relativePath)
  }
}

ProjectTreeRequire.configure = function(options) {
  _.each(options, defineCustomDir)

  return ProjectTreeRequire
}

ProjectTreeRequire.root = function(rootPath) {
  if (rootPath) {
    requireRelative = relativeRequire.from(rootPath)
  }

  return ProjectTreeRequire
}

ProjectTreeRequire.relative = function(relativePath) {
  return requireRelative(relativePath)
}
