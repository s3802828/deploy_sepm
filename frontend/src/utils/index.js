function flatMap(array, fn) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        var mapping = fn(array[i]);
        result = result.concat(mapping);
    }
    return result;
}

export function nl2br (string) {
    string = flatMap(string.split(/\n/), function (part) {
        return [part, <br />];
    });
    // Remove the last spac
    string.pop();
    return <div>{string}</div>;
}