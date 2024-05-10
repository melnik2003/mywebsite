#!/bin/bash

cd PhotoIn || exit
zip image.zip *
cd ..

current_time=$(date +"%Y-%m-%d %H-%M-%S") 
log_file='conversion-log.txt'

echo -n "Создание архива исходных файлов $current_time">> $log_file
echo -n "Начало обработки файлов $current_time">>$log_file 

cd PhotoIn || exit

for f in *.jpg; do
  filename="../PhotoOut/new_$f"
  if convert "$f" -resize 30% "$filename";then
    echo "файл $f успешно обработан $current_time. Новоe имя файла $filename" >> ../"$log_file";
  else
    echo "ошибка конвертации файла $f $current_time"  >> ../"$log_file";
  fi 
done
