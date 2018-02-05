const fs = require('fs');
const path = require('path');
const readline = require('readline');
const stream = require('stream');

let db = 'database.txt';
let hashMapIndex = {};

let hndl = {};


hndl.populate = function() {
  for (let index = 0; index < 10; index++) {
    let val = hndl.generateRandomString();
    hndl.write(index, val);
  }
}

hndl.generateRandomString = function() {
  var randomString = "";
  var randomStringSource = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++) {
    randomString += randomStringSource.charAt(Math.floor(Math.random() * randomStringSource.length));
  }
  return randomString;
}

hndl.indexDatabase = function(done) {
  // return early if already indexed
  if (hndl.getMap().size > 0) {
    return done();
  }
  // load index from file if exists
  hndl.readAll(err => {
    // if file reading was successful end indexing
    if (!err) {
      return done();
    }

    console.log('Indexing database...')
    let dbContent = fs.readFileSync(path.join(__dirname, dbFileName)).toString();

    // set up buffer stream for reading lines
    var buffer = new Buffer(dbContent);
    var bufferStream = new stream.PassThrough();
    bufferStream.end(buffer);
    var lineReader = readline.createInterface({
      input: bufferStream
    });
    // read lines one by one
    lineReader.on('line', line => {
      let key = line.split(':')[0];
      let value = dbContent.lastIndexOf(line);
      hashMapIndex[key] = value;
      // hashMapIndex.push(pair);
    })
    // trigger event when finished reading lines
    lineReader.addListener('close', () => {
      console.log('Done indexing.');
      return done();
    })
  })
}

hndl.saveIndexMapToDisk = function() {
  let indexMap = hndl.getMap();
  let keys = Object.keys(indexMap);
  let indexMapString = '';
  for (let key of keys) {
    indexMapString += key + ':' + indexMap[key] + '\n';
  }
  fs.writeFileSync('hashMapIndex', indexMapString)
  console.log('Done writing indexMap into file.');
}

hndl.updateIndex = function(key, line) {
  let dbContent = fs.readFileSync(db, 'utf-8').toString();
  let indexValue = dbContent.lastIndexOf(line);
  console.log('adding to index:', key, indexValue);
  hashMapIndex[key] = indexValue;
  // hashMapIndex.push(pair);
  hndl.saveIndexMapToDisk();
}

hndl.readAll = function() {
  try {
    let indexMapString = fs.readFileSync(path.join(__dirname, 'indexMap'), 'utf-8').toString()
    let lines = indexMapString.split('\n');
    let content = {};

    for (el in lines) {
      //if this is not gonna work, try split first
      console.log('all in lines ' + lines[el]);

      // hashMapIndex.push(lines[el]);
    }
    console.log('Done reading index map from file.');
  } catch (err) {
    return console.log('Cannot find index map file on disk.')
  }
}

hndl.read = function(key) {
  hndl.indexDatabase(() => {
    fs.readFile(db, 'utf8', function(err, list) {
      if (err) throw err;

      let keys = Object.keys(hashMapIndex);
      console.log('KEYS ' + keys);
      if (!keys) {
        console.log('Key not found in index map.');
      }
      console.log('LIST ' + list);
      //try without +1, if frst is empty
      let index = list.indexOf('\n') + 1;
      console.log('INDEX IS ' + index);
      let pair = list.substr(keys, index).toString();
      console.log('PAIR ' + pair);
      let pairset = pair.split(':');
      let val = pairset[1];
      console.log('VALUE IS ' + val);
      return val;
    });
  });
}

hndl.writeFile = function(indexMapStr) {
  fs.writeFileSync('hashMapIndex', indexMapStr);
}

hndl.write = function(key, val) {
  let entry = key + ':' + val + '\n';
  fs.appendFile(db, entry, (err) => {
    if (err) {
      throw err
    }
    console.log('Entry for ' + entry + ' was saved.')
  })
  hndl.updateIndex(key, entry);
}

hndl.getMap = function() {
  return hashMapIndex;
}

hndl.setIndex = function(indexMap) {
  hashMapIndex = indexMap;
}

module.exports = hndl;
