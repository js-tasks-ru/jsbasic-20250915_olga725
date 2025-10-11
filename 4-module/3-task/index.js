function highlight(table) {
  const rows = table.tBodies[0].rows;
  for (let row of rows) {
    
    const age = Number(row.cells[1].textContent.trim());
    if (age < 18) {
      row.style.setProperty('text-decoration', 'line-through');
    }

    const gender = row.cells[2].textContent.trim().toLowerCase();
    row.classList.toggle('male', gender === 'm');
    row.classList.toggle('female', gender === 'f');

    const status = row.cells[3];
    const dataAvailable = status ? status.dataset.available : undefined;
    if (dataAvailable === undefined) {
      row.hidden = true;
    } else {
      row.hidden = false;
      row.classList.toggle('available', dataAvailable === 'true');
      row.classList.toggle('unavailable', dataAvailable === 'false');
    }
  }
}
