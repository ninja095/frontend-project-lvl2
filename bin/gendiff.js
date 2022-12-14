#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs';
import * as path from 'path';
import genDiff from '../src/gendiff.js'; // eslint-disable-line

// eslint-disable-next-line import/extensions

const program = new Command();

program
  .option('-f, --format <type>', 'output format')
  .name('gendiff')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .action((filepath1, filepath2) => {
    const fullPath1 = path.resolve(process.cwd(), '__fixtures__', filepath1);
    const fullPath2 = path.resolve(process.cwd(), '__fixtures__', filepath2);

    try {
      const data1 = fs.readFileSync(fullPath1, 'utf8');
      const data2 = fs.readFileSync(fullPath2, 'utf8');
      const content1 = JSON.parse(data1);
      const content2 = JSON.parse(data2);

      console.log(genDiff(content1, content2)); // eslint-disable-line
    } catch (err) {
      console.error(err); // eslint-disable-line
    }
  });

program.parse();
