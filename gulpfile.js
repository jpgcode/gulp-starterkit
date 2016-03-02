'use strict';

// Module to require whole directories
let requireDir = require('require-dir');

// Pulling in all tasks from the tasks folder
requireDir('./gulp/tasks', { recurse: true });
