function mixArray(a, b, c, d) {
  //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  //Fisher-Yates shuffle algorithm
  //array,placeholder,placeholder,placeholder

  c = a.length;
  while (c)
    (b = (Math.random() * (--c + 1)) | 0),
      (d = a[c]),
      (a[c] = a[b]),
      (a[b] = d);
}

export { mixArray };
