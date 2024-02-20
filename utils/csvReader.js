const fs = require('node:fs');

/**
 * @param {string} csvFile - The csv file to be read
 * @param {separator} csvDelimiter - The csv delimiter
 * @param {boolean} ignoreEmptyRows - Ignore the empty lines
 */
function csvFileLines(csvFile, csvDelimiter = ',', ignoreEmptyRows = true) {
  
  const pattern = /".*?"/g;

  const readLines = csvFile =>
  fs
  .readFileSync(csvFile)
  .toString('UTF8')
  .split('\n')
  .filter(function (el) {
      if (ignoreEmptyRows) {
          return el != '';
      } else {
          return el == el;
      }
  })
  .map(function (row) {
    //   while(patternFound = pattern.exec(row))
    //   {
    //       row = row.replace(patternFound, patternFound.toString().replaceAll(',','@'));
    //   }
    //   return row.split(csvDelimiter);

    //return row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
    return row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
  });

  return readLines(csvFile).slice();;

}

/**
 * @param {Array} csvArray - array of csv rows
 */
function csvArrayRowsToJson(csvArray, headersArray) {

  const csvIntoJson = (rows) => {  
    return rows.reduce((jsonArray, row) => {
      const item = row.reduce((item, value, index) => {
        return {...item, [headersArray[index]]: value};
      }, {});
      return jsonArray.concat(item);
    }, []);
  };
  
  const jsonArray = csvIntoJson(csvArray, ';');
  
  return JSON.stringify(jsonArray);

}
function selectFromCsvArray(csvArray, header, columns, from, where, limit) {
  // let test = eval('csvArray.filter(function(e) {'
  //   + 'return (e[header.indexOf(where[0][1])] where[0][3] where[0][3] || e[header.indexOf(where[1][1])] == where[1][3])'
  //   + ' && e[header.indexOf("Website")].search(".com") > -1;'
  //   + ' }).slice(limit[0],limit[1]).map(r => columns.map(i => r[header.indexOf(i)]));');

//   let test = csvArray.filter(function(e) {
//     return (e[header.indexOf(where[0][1])] == where[0][3] || e[header.indexOf(where[1][1])] == where[1][3])
//      && e[header.indexOf("Website")].search('.com') > -1;
// }).map(r => columns.map(i => r[header.indexOf(i)]));

  // let test = csvArray.filter(function(e) {
  //     return (e[header.indexOf("Country")] == 'China' || e[header.indexOf("Country")] == 'Chad')
  //      && e[header.indexOf("Website")].search('.com') > -1;
  // }).map(r => columns.map(i => r[header.indexOf(i)]));

  let test = csvArray.map(r => columns.map(i => r[header.indexOf(i)]));
  let a = new Array();
  where.forEach(element => {
    return test.filter(function(e) {
      if (e[columns.indexOf(element[1])] == element[3]) {
        a.push(e);
      }
      //return e[keyindex] == value;
    });
  });

  // let filtered = new Array();
  // where.forEach(element => {
  //   filtered.push(getFilteredJsonArray(test, columns, element[1], element[2], element[3]));
  // });

  return a;
}

// function getFilteredJsonArray(array, columns, key, operator,value) {
//   return array.filter(function(e) {
//     return e[columns.indexOf(key)] == value;
//     //return e[keyindex] == value;
//   });
// }
/**
 * @param {string} csvRows - csv rows
 * @param {separator} csvDelimiter - The csv delimiter
 */
function csvRowsToJson(csvRows) {
  
  //const csv = 'contry;fromNr;toNr;Type;cust_1;cust_2\nUS;0;100;wood;max;nuk\nDE;100;500;metal;max;pal';
  const csv = csvRows;

  const csvIntoJson = (csv, csvDelimiter) => {
    let [headers, ...rows] = csv.split('\n');
    headers = headers.split(csvDelimiter);
    rows = rows.map(row => row.split(csvDelimiter));
  
    return rows.reduce((jsonArray, row) => {
      const item = row.reduce((item, value, index) => {
        return {...item, [headers[index]]: value};
      }, {});
      return jsonArray.concat(item);
    }, []);
  };
  
  const jsonArray = csvIntoJson(csv, ';');
  
  console.log(jsonArray);

}
  
module.exports = { csvFileLines, csvRowsToJson, csvArrayRowsToJson, selectFromCsvArray };