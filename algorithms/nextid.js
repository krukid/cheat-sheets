function createUniqueIdGenerator() {
    const index = {};
    const pointers = [-1];
    const alphabet = 'abcefghijklmnopqrstuvwxyz';

    function generateNextId() {
        const i = pointers.length - 1;
        const p = pointers[i];
        if (p + 1 < alphabet.length) {
            pointers[i] += 1;
        } else {
            pointers[i] = pointers.length - 1;
            pointers.push(pointers.length);
        }
        return pointers.map((p) => alphabet.charAt(p)).join('');
    }

    return (name) => {
        if (!index.hasOwnProperty(name)) {
            index[name] = generateNextId();
        }
        return index[name]
    }
}

const uniqueIdGenerator = createUniqueIdGenerator();

// uniqueIdGenerator() ...
