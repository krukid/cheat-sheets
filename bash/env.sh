# variable indirection (dynamic env var read)

( TO_READ=HOME; echo ${!TO_READ} ) # => /root or whatever

# variable uppercase/lowercase/capitalize

( VAR=tExT; echo ${VAR^^} ) # => TEXT
( VAR=text; echo ${VAR^} ) #=> Text
( VAR=tExT; echo ${VAR,,} ) #=> text
