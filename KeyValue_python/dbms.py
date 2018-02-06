import random
import string

indexMap = {}
db = 'database.txt'
hashMapIndex = 'hashMapIndex'

def read():
    f = open(db,'r')
    text = f.read()
    lines =  text.split('\n')
    print('READING THIS')
    # print(lines)
    for el in lines:
        element = dec(el)
        print(element)
        arr = element.split(':')
        if len(arr) == 2:
            key = arr[0]
            val = arr[1]
            indexMap[key] = val;
    f.close()

def write(key,val):
    pair = "%s:%s"%(key,val)
    f = open(db,'a')
    print(pair)
    f.write(enc(pair) + '\n')
    addNewIndex(key,val)
    createHashMapIndex(key,val)
    f.close()

def populateDB():
    write('dog','Bulder')
    write('cat','Muning')
    for el in range(10):
      write(el, getRandom())
    print('Done populating DB')

def addNewIndex(key,val):
    read()
    # if doesn't exist, add new index and write append to the db file
    # else replace/update the key value
    indexMap[key] = val;


def createHashMapIndex(key, val):
    pair = "%s:%s"%(key,val)
    f = open(hashMapIndex,'a')
    print('myIndexMap')
    print(indexMap)
    for key in indexMap.keys():
        value = indexMap[key]
        print(value)
    f.write(pair + '\n')
    f.close()

def dec(binaryString):
    # print('DECODING...' + binaryString)
    return "".join([chr(int(binaryString[i:i+8],2)) for i in range(0,len(binaryString),8)])


def enc(string):
    # print('ENCODING...' + string)
    return "".join([format(ord(char),'#010b')[2:] for char in string])


def getRandom():
    char = string.ascii_letters
    return ''.join(random.sample(char, 5))

# MAIN
print('WRITING THIS')
populateDB()
# print('---------------------------------')
# read()
