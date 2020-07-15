let films;
const request = new XMLHttpRequest();

function reqListener(e) {
  films = request.response;
  films = JSON.parse(films);
}

function jsonLoading() {
  request.onload = reqListener;
  request.open('get', './data.json', true);
  request.send();
}




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
    clicklinks.forEach((element) => { element.classList.remove('arrowUP', 'arrowDown'); });
    sortByAttr(evt.target.getAttribute('sort'), evt.target);
    tableRender();
  });
});
jsonLoading();
tableRender();
