'use strict';

// Module to require whole directories
import requireDir from 'require-dir';

// Pulling in all tasks from the tasks folder
requireDir('./gulp/tasks', { recurse: true });
