# data-manipulation

* online scss playground: http://www.sassmeister.com/

* there is a limited amount of data structures and ops:
http://sass-lang.com/documentation/file.SASS_REFERENCE.html

* with some effort, we can transform data structures:

    $scss_map: ('key1': 'string', 'key2': 200, 'key3': (1, 2, 3));
    $empty: ();
    $key: 'foo';
    $value: 100;
    $empty: map-merge($empty, ($key: $value));
    $key3_last: nth(map-get($scss_map, 'key3'), 3);

* control structures:

    @if <expr> {} @else {}
    @each $item in $list {}
    @each $key, $value in $map {}

* helpful functions:

    str-index, str-insert, variable-exists, @debug <expr>

* custom functions (see http://hugogiraudel.com/2013/08/08/advanced-sass-list-functions/)

    @function foo-bar($var1, $var2) {
      @return <expr>;
    }
