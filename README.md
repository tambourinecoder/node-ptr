[![Build Status](https://travis-ci.org/tambourinecoder/node-ptr.png?branch=master)](https://travis-ci.org/tambourinecoder/node-ptr)

# Project Tree Require
Easily require node modules within a project tree.


## Install
    $ npm install ptr


## Examples
By default, modules are required relative to `process.cwd()`.
```js
/* config.js */
var ptr = require('ptr').configure({
  models: 'app/controllers',
  controllers: 'app/controllers'
})

/* routes.js */
var requireController = ptr.controllers

var HomeController = requireController('home')
app.get('/', HomeController.welcome)
...

var NotesController = requireController('api/notes').inject(db)
app.get('/api/notes', NotesController.index)
...
```

Keep in mind that you need to explicitly specify the a root if you plan on
distributing your code as it's own package (since it will live somewhere inside of `node_modules`).
```js
var ptr = require('ptr')
  , packageRoot = __dirname + '/..'


ptr.root(packageRoot).configure({
  ...
})

...
```
(Have a look at [substack's `parents` module](https://npmjs.org/package/parents) for a more elegant way of specifying parent directories)


## Licence
_This software is released under the MIT license cited below_.

    Copyright (c) 2014 Tambourinecoder <tambourinecoder@gmail.com>

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    'Software'), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
    IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
    CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
    TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
    SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
