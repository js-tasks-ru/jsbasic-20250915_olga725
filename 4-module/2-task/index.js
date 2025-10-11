function makeDiagonalRed(table) {
  for (let i = 0; i < 5; i++) {
    const td = table.rows[i].cells[i];
    td.style.backgroundColor = 'red';
  }
}
