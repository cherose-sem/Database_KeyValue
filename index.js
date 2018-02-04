var gdbm = require('gdbm');
var db = new gdbm.GDBM();
db.open("hoge.db", 0, gdbm.GDBM_WRCREAT);
db.store("dan", "kogai");
db.fetch("dan") # => "kogai"
db.close();
