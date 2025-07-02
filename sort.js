export default function mergeSort(array) {
  if (array.length == 1) {
    return array;
  } else {
    let first_half = mergeSort(array.slice(0, Math.round(array.length / 2)));
    let second_half = mergeSort(
      array.slice(Math.round(array.length / 2), array.length)
    );
    let new_array = [];

    while (new_array.length < array.length) {
      if (first_half.length == 0) {
        for (const number of second_half) {
          new_array.push(number);
        }
      } else if (second_half.length == 0) {
        for (const number of first_half) {
          new_array.push(number);
        }
      } else {
        if (first_half[0] < second_half[0]) {
          new_array.push(first_half[0]);
          first_half.shift();
        } else {
          new_array.push(second_half[0]);
          second_half.shift();
        }
      }
    }
    return new_array;
  }
}