const films = [
  {
    id: 26,
    title: 'Побег из Шоушенка',
    imdb: 9.30,
    year: 1994,
  },
  {
    id: 25,
    title: 'Крёстный отец',
    imdb: 9.20,
    year: 1972,
  },
  {
    id: 27,
    title: 'Крёстный отец 2',
    imdb: 9.00,
    year: 1974,
  },
  {
    id: 1047,
    title: 'Тёмный рыцарь',
    imdb: 9.00,
    year: 2008,
  },
  {
    id: 223,
    title: 'Криминальное чтиво',
    imdb: 8.90,
    year: 1994,
  },
];

const table = document.createElement('table');
table.classList.add('table_sort');
table.innerHTML = `  <thead>
  <tr>
    <td class="sortable"><a href="#" class="tableLink" sort="id">id</a></td>
    <td class="sortable"><a href="#" class="tableLink" sort="title">title</a></td>
    <td class="sortable"><a href="#" class="tableLink" sort="year">year</a></td>
    <td class="sortable"><a href="#" class="tableLink" sort="imdb">imdb</a></td>
  </tr>
  </thead>
<tbody class="tableBody">

</tbody>`;
document.body.append(table);

function tableRender() {
  document.querySelector('.tableBody').innerHTML = '';
  films.forEach((item) => {
    document.querySelector('.tableBody').insertAdjacentHTML('beforeend', `<tr>
<td>${item.id}</td>
<td>${item.title}</td>
<td>${item.year}</td>
<td>${item.imdb.toFixed(2)}</td>
</tr>
`);
  });
}

function sortByAttr(attr, evt) {
  evt.classList.remove('arrowUP', 'arrowDown');
  if (evt.hasAttribute('sorted')) {
    films.reverse();
    evt.classList.add('arrowDown');
    evt.removeAttribute('sorted');
  } else {
    document.querySelectorAll('.sortable').forEach((item) => {
      item.removeAttribute('sorted');
    });
    films.sort((a, b) => {
      if (a[attr] > b[attr]) {
        return 1;
      }
      if (a[attr] < b[attr]) {
        return -1;
      }
      return 0;
    });
    evt.setAttribute('sorted', '');
    evt.classList.add('arrowUP');
  }
  console.log(films);
}

const clicklinks = Array.from(document.querySelectorAll('.tableLink'));
clicklinks.forEach((item) => {
  item.addEventListener('click', (evt) => {
    evt.preventDefault();
    // eslint-disable-next-line no-shadow
    clicklinks.forEach((item) => { item.classList.remove('arrowUP', 'arrowDown'); });
    sortByAttr(evt.target.getAttribute('sort'), evt.target);
    tableRender();
  });
});

tableRender();
