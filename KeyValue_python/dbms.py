
def read():
    f = open('database.txt','r')
    message = f.read()
    lines = message.split('\n')
    for el in lines:
        msg = dec(el)
        print(msg)
    f.close()


def writeAppend():
    f = open('database.txt','a')
    f.write(enc('hello') + '\n')
    f.write(enc('world') + '\n')
    f.close()

def dec(str):
     return ''.join(chr(int(str[i*8:i*8+8],2)) for i in range(len(str)//7))

def enc(str):
	return ' '.join(format(ord(x), 'b') for x in str)


# writeBinaryFile()
# readBinaryFile()
# writeAppend()
read()
