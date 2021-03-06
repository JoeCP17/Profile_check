import re
import sys

def txt(lines, write_file):
    delete1 = lines[0] 
    delete2 = lines[6]                       
    for line in lines:
        if delete1 != line and delete2 != line:
            if line[0:5] == 'core1':
                line = line[5:] 
            elif line[0:5] == 'core2':
                line = line[5:]
            elif line[0:5] == 'core3':
                line = line[5:]
            elif line[0:5] == 'core4':
                line = line[5:]
            elif line[0:5] == 'core5':
                line = line[5:]

            write_file.write(line)

def main(file_name):

    INPUT_File_LOC = './uploads/' + file_name
    OUTPUT_FILE_LOC = './remake/' + file_name 

    
    read_file = open(INPUT_File_LOC, 'r', encoding='utf-8')
    write_file = open(OUTPUT_FILE_LOC, 'w', encoding='utf-8')
    lines = read_file.readlines()
    txt(lines, write_file)
    read_file.close()
    write_file.close()

main(sys.argv[1])