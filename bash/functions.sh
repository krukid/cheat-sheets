# passing multiline arguments to function

foo() {
    # first command consumes the function input
    local lines
    mapfile -t lines
    local line
    for line in "${lines[@]}"; do
        # do something with line...
    done
}

foo <<- EOM
  line1 foo
  line2 bar
  line3 baz
EOM
