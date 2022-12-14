import _ from 'lodash';

const genDiff = (file1, file2) => {
  let result = '{\n';
  const data1 = Object.keys(file1);
  const data2 = Object.keys(file2);
  let keys = _.concat(data1, data2);
  keys = _.sortBy(_.uniq(keys));
  /* eslint-disable */
  for (const key of keys) {
    if (!Object.hasOwn(file2, key)) {
      result += `- ${key}: ${file1[key]}\n`;
    } else if (
      Object.hasOwn(file1, key)
      && Object.hasOwn(file2, key)
      && file1[key] === file2[key]
    ) {
      result += `  ${key}: ${file1[key]}\n`;
    } else if (
      Object.hasOwn(file1, key)
      && Object.hasOwn(file2, key)
      && file1[key] !== file2[key]
    ) {
      result += `- ${key}: ${file1[key]}\n`;
      result += `+ ${key}: ${file2[key]}\n`;
    } else {
      result += `+ ${key}: ${file2[key]}\n`;
    }
  }

  /* eslint-enable */
  result += '}';
  return result;
};

export default genDiff;
