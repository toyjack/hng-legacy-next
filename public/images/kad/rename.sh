for filename in *.bmp; do
  mv "$filename" $(echo "$filename" | sed "s/^kad//")
done
