#!/bin/bash

cd PhotoIn || exit 1
zip PhotoArh.zip *
cd ..

current_time=$(date +"%Y-%m-%d %H-%M-%S") 
log_file='conversion-log.txt'

echo -n "Создание архива исходных файлов $current_time" > $log_file
echo -n "Начало обработки файлов $current_time" >> $log_file 

for f in PhotoOut/*.jpg
do
    convert-im6.q16 -debug all "PhotoIn/$f PhotoOut/$f.png" 2 >> log_file
    mogrify-im6.q16 -debug all -quality 96 "PhotoOut/$f.png" 2 >> log_file
done

#for f in *.jpg; do
#    filename="../PhotoOut/new_$f"
#    if convert "$f" -resize 30% "$filename";then
#        echo "файл $f успешно обработан $current_time. Новоe имя файла $filename" >> ../"$log_file";
#    else
#        echo "ошибка конвертации файла $f $current_time"  >> ../"$log_file";
#    fi 
#done
