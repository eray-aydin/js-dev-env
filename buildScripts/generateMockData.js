/* Generate mock data for development */

/* eslint-disable no-console */

import jsf from 'json-schema-faker';
import {schema} from './mockDataSchema';
import fs from 'fs';
import chalk from 'chalk';
// import { conditionalExpression } from '../../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/babel-types';

const json = JSON.stringify(jsf(schema)); // generate random data based on the schema.

// node's fs is used to write to a file.
fs.writeFile("./src/api/db.json", json, function (err) {
  if (err) {
    return console.log(chalk.red(err));
  } else {
    console.log(chalk.green("Mock data generated."));
  }
});


