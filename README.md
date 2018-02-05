# SoftDev_Database2018

## Assignment 1 - Simple DB with Hashmap-based Index
_Build a simple_db in the programming language of your choice._
* _Implement a Hashmap-based index._
* _Implement functionality to store your data on disk in a binary file._
* _Implement functionality to read your data from disk again, so that you can reinstantiate your database after a shutdown._

_Hint: You do not want to serialize and deserialize the an in memory Hashmap containing all data directly. Instead, you in memory index based on a Hashmap contains information on where in you database file a piece of information is stored._

## Solution:
### Set-up
* To execute the code, it requires you NodeJS: 1) Clone 2) ``npm init`` 3)``npm install`` 4) ``node index`` 

_(BUT I HAD SOME ISSUES AND IT LOOKS REALLY COMPLICATED USING JS, SO I TRIED PYTHON - though I don't have a background using it... exploring something new that might work)_

* In 'KeyValue_python' folder, run using ``python dbms.py``.

### Description

* Based on the python solution and my understanding when it comes to the requirements, it enables to make hashmap-based index: having index as key and value of the offset.
* It stores the data in a binary file.
* It reads the hashmap-based index from the binary file.
