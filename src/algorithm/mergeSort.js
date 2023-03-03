const getMergeSort = (array) => {
    let animation = [];
    if (array.length <= 1) return array;
    const aliasArray = array.slice();;

    mergeSort(array, 0, array.length - 1, aliasArray, animation);
    return animation

}

const mergeSort = (array, first, last, aliasArray, animation) => {
    if (first === last) return;

    let mid = Math.floor((first + last) / 2);
    mergeSort(aliasArray, first, mid, array, animation);
    mergeSort(aliasArray, mid + 1, last, array, animation);
    mergeArray(array, first, mid, last, aliasArray, animation);
}

const mergeArray = (array, first, mid, last, aliasArray, animation) => {

    let idx1 = first;
    let idx2 = mid + 1;
    let x = first;

    while (idx1 <= mid && idx2 <= last) {

        animation.push([idx1, idx2, 'comp1']);

        animation.push([idx1, idx2, 'comp2']);

        if (aliasArray[idx1] <= aliasArray[idx2]) {
            animation.push([x, aliasArray[idx1], 'swap'])

            array[x++] = aliasArray[idx1++]
        }
        else {
            animation.push([x, aliasArray[idx2], 'swap'])

            array[x++] = aliasArray[idx2++]
        }

    }
    while (idx1 <= mid) {
        animation.push([idx1, idx1, 'comp1']);

        animation.push([idx1, idx1, 'comp2']);
        animation.push([x, aliasArray[idx1], 'swap'])

        array[x++] = aliasArray[idx1++]
    }
    while (idx2 <= last) {
        animation.push([idx2, idx2, 'comp1']);

        animation.push([idx2, idx2, 'comp2']);
        animation.push([x, aliasArray[idx2], 'swap'])

        array[x++] = aliasArray[idx2++]
    }
}

export default getMergeSort
