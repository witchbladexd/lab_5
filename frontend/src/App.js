function App() {

  async function addNewClient() {
    const name = document.getElementById("clientName").value;
    const surname = document.getElementById("clientSurname").value;

    let body = {
      "name": name,
      "surname": surname
    };
    body = JSON.stringify(body);

    if(!(name === '' || surname === '')) {
      await fetch ("http://localhost:8080/client", {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: body
      });
      window.location.reload();
    } else {
      window.alert("Введите имя и фамилию!");
    }
  }

  async function changeClient(id, name, surname) {
    let body = {
      "id": id,
      "name": name,
      "surname": surname
    };
    body = JSON.stringify(body);
    
    await fetch("http://localhost:8080/client", {
      method: 'PUT',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: body
    });
    document.getElementById("clientList").remove();
    isShow = false;
    showClients();
  }

  async function deleteClient(id) {
    await fetch("http://localhost:8080/client/" + id, {
      method: 'DELETE'
    });
    document.getElementById("clientList").remove();
    isShow = false;
    showClients();
  }

  let isShow = false;
  async function showClients() {
    if(!isShow) {
      const clients = await fetch("http://localhost:8080/client");
      const data = await clients.json();

      if(data.length > 0) {
        const clientList = document.createElement("div");
        clientList.id = "clientList";

        data.forEach(client => {
          let id = document.createElement("strong");
          let name = document.createElement("input");
          let surname = document.createElement("input");
          let changeB = document.createElement("button");
          let deleteB = document.createElement("button");

          id.id = client.id;
          name.id = `name${client.id}`;
          surname.id = `surname${client.id}`;

          name.type = "text";
          surname.type = "text";
          
          id.innerHTML = client.id + ".";
          name.value = client.name;
          surname.value = client.surname;

          changeB.id = `changeB${client.id}`;
          changeB.type = "button";
          changeB.textContent = "Сохранить изменения";
          changeB.onclick =  function() {
            changeClient(client.id, name.value, surname.value);
          };
          deleteB.id = `deleteB${client.id}`;
          deleteB.type = "button";
          deleteB.textContent = "Удалить";
          deleteB.onclick = function () {
            deleteClient(client.id);
          };

          clientList.appendChild(document.createElement("br"));
          clientList.appendChild(id);
          clientList.appendChild(name);
          clientList.appendChild(surname);
          clientList.appendChild(changeB);
          clientList.appendChild(deleteB);
          clientList.appendChild(document.createElement("br"));
        }); 
        document.getElementById("main").append(clientList);
      }
      isShow = true;
      document.getElementById("showClientsB").value = "Скрыть клиентов";
    } else {
      document.getElementById("clientList").remove();
      document.getElementById("showClientsB").value = "Показать клиентов";
      isShow = false;
    }
  }

  return (
    <div id = "main">
      <h2>Клиенты</h2>
      <label>Имя: </label>
      <input id = "clientName" type = "text" required/>
      <br />
      <label>Фамилия: </label>
      <input id = "clientSurname" type = "text" required/>
      <br /> <br />
      <input id = "addClientB" type = "button" value = "Добавить" onClick = {addNewClient}/>
      <br /> <br />
      <input id = "showClientsB" type = "button" value = "Показать клиентов" onClick = {showClients}/>
    </div>
  );
}

export default App;