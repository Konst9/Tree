const data = {
    "services": [
      {
        "id": 1,
        "head": null,
        "name": "Проф.осмотр",
        "node": 0,
        "price": 100.0,
        "sorthead": 20
      },
      {
        "id": 2,
        "head": null,
        "name": "Хирургия",
        "node": 1,
        "price": 0.0,
        "sorthead": 10
      },
      {
        "id": 3,
        "head": 2,
        "name": "Удаление зубов",
        "node": 1,
        "price": 0.0,
        "sorthead": 10
      },
      {
        "id": 4,
        "head": 3,
        "name": "Удаление зуба",
        "node": 0,
        "price": 800.0,
        "sorthead": 10
      },
      {
        "id": 5,
        "head": 3,
        "name": "Удаление 8ого зуба",
        "node": 0,
        "price": 1000.0,
        "sorthead": 30
      },
      {
        "id": 6,
        "head": 3,
        "name": "Удаление осколка зуба",
        "node": 0,
        "price": 2000.0,
        "sorthead": 20
      },
      {
        "id": 7,
        "head": 2,
        "name": "Хирургические вмешательство",
        "node": 0,
        "price": 200.0,
        "sorthead": 10
      },
      {
        "id": 8,
        "head": 2,
        "name": "Имплантация зубов",
        "node": 1,
        "price": 0.0,
        "sorthead": 20
      },
      {
        "id": 9,
        "head": 8,
        "name": "Коронка",
        "node": 0,
        "price": 3000.0,
        "sorthead": 10
      },
      {
        "id": 10,
        "head": 8,
        "name": "Слепок челюсти",
        "node": 0,
        "price": 500.0,
        "sorthead": 20
      }
    ]
  };

  function buildTree(data, parentId, parentNode) {
    const ul = document.createElement('ul');
    data.forEach(item => {
      if (item.head === parentId) {
        const li = document.createElement('li');
        const arrow = document.createElement('span');
        arrow.classList.add('arrow');
        li.appendChild(arrow);
        li.innerHTML += `<span>${item.name}</span> (${item.price})`;
        if (item.node === 1) {
          li.classList.add('node');
          li.dataset.id = item.id;
          li.addEventListener('click', toggleNode);
          const nestedUl = document.createElement('ul');
          nestedUl.id = `node-${item.id}`;
          nestedUl.classList.add('collapsed');
          li.appendChild(nestedUl);
          buildTree(data, item.id, nestedUl);
        }
        ul.appendChild(li);
      }
    });
    if (parentNode) {
      parentNode.appendChild(ul);
    } else {
      document.getElementById('tree').appendChild(ul);
    }
  }

  function toggleNode(event) {
    const nodeId = event.currentTarget.dataset.id;
    const nestedUl = document.getElementById(`node-${nodeId}`);
    if (nestedUl) {
      nestedUl.classList.toggle('collapsed');
      event.currentTarget.querySelector('.arrow').classList.toggle('expanded');
    }
    event.stopPropagation();
  }

  data.services.sort((a, b) => a.sorthead - b.sorthead);

  buildTree(data.services, null, null);
