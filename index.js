let dbms = require('./dbms');

let test = "dog";
let val = dbms.read(test);
dbms.saveIndexMapToDisk();

// dbms.populate();

// dbms.write('dog', 'Bulder');
// dbms.write('cat', 'Meow');
