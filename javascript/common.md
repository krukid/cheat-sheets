## create a string of N repeated characters

    new Array(N).join(char)

## another approach when you need to map an new array of given length

    Array.from({length: 5}).map(() => 'c').join('')
