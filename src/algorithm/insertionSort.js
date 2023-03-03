export const getInsertionSort = (array) => {
    let animations = [];
    insertionSort(array, animations);
    return animations;
}

const insertionSort = (array, animation) => {

    for (let i = 1; i < array.length; i++) {
        let current = array[i];
        let j = i - 1;

        animation.push([i, j, "comp1"]);
        animation.push([i, j, "comp2"]);
        while (array[j] > current && j >= 0) {
            animation.push([j + 1, array[j], "swap"]);
            array[j + 1] = array[j];
            j--;
        }
        animation.push([j + 1, current, "swap"]);
        array[j + 1] = current

    }
}
