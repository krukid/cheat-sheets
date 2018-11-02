# find files with extended attributes

find . -xattr -exec xattr -v {} \; | grep -oE "^[^:]+" | uniq

# clear all extended attributes in directory tree

find . -xattr -exec xattr -v {} \; | grep -oE "^[^:]+" | uniq | xargs xattr -c

# delete .DS_Store files

find . -name .DS_Store | xargs rm

# find all executable files in directory tree and remove executable flag

find . -perm +111 -type f | xargs chmod -x
