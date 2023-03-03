export const getQuickSort = (array) => {
    let animations = [];
    quickSort(array, 0, array.length - 1, animations);
    return animations;
}

const quickSort = (array, low, high, animations) => {
    if (low < high) {
        let pivotIndex = partition(array, low, high, animations);
        quickSort(array, low, pivotIndex - 1, animations);
        quickSort(array, pivotIndex + 1, high, animations);
    }

}

const partition = (array, low, high, animations) => {
    let i = low - 1;
    let pivot = array[high];

    for (let x = low; x < high; x++) {
        animations.push([x, high, "comp1"]);
        animations.push([x, high, "comp2"]);

        if (array[x] < pivot) {
            i++;
            animations.push([x, array[i], "swap"]);
            animations.push([i, array[x], "swap"]);
            let temp = array[i];
            array[i] = array[x];
            array[x] = temp;
        }
    }
    i++;
    animations.push([i, pivot, "swap"]);
    animations.push([high, array[i], "swap"]);

    let temp = array[i];
    array[i] = array[high];
    array[high] = temp
    return i;

}
