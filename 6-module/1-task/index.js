/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.render();
  }
  render() {
    const table = document.createElement('table');

    const thead = document.createElement('thead');
    const theadTr = document.createElement('tr');
    const headers = ['Имя', 'Возраст', 'Зарплата', 'Город', ''];

    headers.forEach(text => {
      const th = document.createElement('th');
      th.textContent = text;
      theadTr.appendChild(th);
    });
    thead.appendChild(theadTr);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const createRow = (user) => {
      const tr = document.createElement('tr');
      ['name', 'age', 'salary', 'city'].forEach(key => {
        const td = document.createElement('td');
        td.textContent = user[key];
        tr.appendChild(td);
      });

      const tdDel = document.createElement('td');
      const btn = document.createElement('button');
      btn.textContent = 'X';
      btn.addEventListener('click', () => {
        tr.remove();
      });
      tdDel.appendChild(btn);
      tr.appendChild(tdDel);

      return tr;
    };

    this.rows.forEach(user => {
      tbody.appendChild(createRow(user));
    });

    table.appendChild(tbody);
    return table;
  }
}
