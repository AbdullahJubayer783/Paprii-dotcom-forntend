const loadUserDetails = () => {
const user_id = localStorage.getItem("usermodel_id");
  //=============================================
  fetch(`https://papri-dotcom.onrender.com/user/list/`)
  .then((res) => {
      if (!res.ok) {
          throw new Error(`Request failed with status: ${res.status}`);
      }

      return res.json();
  })
  .then((users) => {
      const selectedUser = users.find(users => users.id.toString() === user_id);
      if (selectedUser) {
        loadUserDetailsDisplay(selectedUser)
      } else {
          console.log(`Flower with ID ${user_id} not found`);
      }
  })
  .catch((error) => {
      console.error('Error fetching flower data:', error);
  });
  //========================================
  // https://papri-dotcom.onrender.com/orders/order/?user_id=6
  fetch(`https://papri-dotcom.onrender.com/orders/order/?user_id=${user_id}`)
  .then((res) => {
      if (!res.ok) {
          throw new Error(`Request failed with status: ${res.status}`);
      }

      return res.json();
  })
  .then((data) => {

    displayOrderData(data);
  })
  .catch((error) => {
      console.error('Error fetching flower data:', error);
  });
  
}

const displayOrderData = (orders) => {
  console.log("order Data",orders);
  orders.forEach((order) => {
    console.log(order);
    const parent = document.getElementById("order-tablebody");
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <th>${order.id}</th>
    <th>${order.quantity}</th>
    ${order.order_status == "Pending"
        ? `<th ><a href="" class="btn btn-danger">${order.order_status}</a></th>`
        : `<th ><a href="" class="btn btn-sucess">${order.order_status}</a></th>`
    }
    <th>${order.date}</th>
    
    <th><button class="btn btn-primary"><a class="text-decoration-none text-light" target="_blank" href="flowerdetails.html?flowerId=${order.flower}">Flower Details</a></button></th>
    
    `;
    parent.appendChild(tr);
    });
}

const loadUserDetailsDisplay = (data) => {
  console.log(data);
    const parent = document.getElementById("user-detais-container");
    const div = document.createElement("div");
    // div.classList.add("user-all");
    div.innerHTML = `
    <div class="user-img" >
    <img src="${data.image}" style="width: 300px; height: 300px; border-radius: 150px;" alt="" />
  </div>
  <div class="user-info">
    <h1>${data.user}</h1>
    <h3>${data.user.first_name } ${data.user.last_name}</h3>
    <h3>${data.user.email}</h3>
  </div>
    `;
    parent.appendChild(div);

}
const loadUsermodelId = () => {
  const user_id = localStorage.getItem("user_id");

  fetch(`https://papri-dotcom.onrender.com/user/list/?user=${user_id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Model data from user",data[0].id);
      localStorage.setItem("usermodel_id", data[0].id);
    });
};

loadUsermodelId();
loadUserDetails()