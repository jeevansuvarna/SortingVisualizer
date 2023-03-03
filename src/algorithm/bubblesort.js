export const getBubbleSort = (array) => {
    let animation = []
    bubbleSort(array, animation)
    return animation;
}

const bubbleSort = (array, animation) => {
    let n = array.length;
    var temp;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            animation.push([j, j + 1, "comp1"]) // red
            animation.push([j, j + 1, "comp2"]) //blue
            if (array[j] >= array[j + 1]) {
                animation.push([j, array[j + 1], "swap"])
                animation.push([j + 1, array[j], "swap"])
                temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

            }
        }
    }
}
