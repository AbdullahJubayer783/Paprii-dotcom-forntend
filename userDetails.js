const loadUserDetails = () => {

const user_id = localStorage.getItem("usermodel_id");
const builtin_user = localStorage.getItem("user_id");
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
  
  fetch(`https://papri-dotcom.onrender.com/user/user/?id=${builtin_user?builtin_user:""}`)
  .then((res) => res.json())
  .then((data) => console.log("Built in User data",data[0]));
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
  userInfoDisply(data.user)
  console.log(data);
    const parent = document.getElementById("user-detais-container");
    const div = document.createElement("div");
    div.classList.add("user-img");
    div.innerHTML = `
    <img src="${data.image}" style="width: 300px; height: 300px; border-radius: 150px;" alt="" />
    `;
    parent.appendChild(div);
};

const userInfoDisply = (id) => {
  console.log("user id",id);
  fetch(`https://papri-dotcom.onrender.com/user/user/${id}/`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const parent = document.getElementById("user-detais-container");
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <h1>Name: ${data.first_name} ${data.last_name}</h1>
    <h3>Email: ${data.email}</h3>
    <h5>Username: ${data.username}</h5>
    `;
    parent.appendChild(div);
  });
};
const navButtons = () => {
  const token = localStorage.getItem("token");
  const staff = localStorage.getItem("staff");
  if(token&&staff==="true"){
      const parent = document.getElementById("navbuttons");
      parent.innerHTML = `
      <a class="btn btn-info text-dark me-2" href="userDetails.html"><strong>Profile</strong></a>

      <a class="btn btn-warning text-dark me-2" href="dashboard.html"><strong>Dashborad</strong></a>

      <div onclick="handlelogOut()" class="btn btn-danger text-dark me-2" ><strong>Logout</strong></div>
      `;
  }else if(token){
      const parent = document.getElementById("navbuttons");
      parent.innerHTML = `
      <a class="btn btn-info text-dark me-2" href="userDetails.html"><strong>Profile</strong></a>

      <div onclick="handlelogOut()" class="btn btn-danger text-dark me-2" ><strong>Logout</strong></div>

      `;
  }else{
      const parent = document.getElementById("navbuttons");
      parent.innerHTML = `

      <a class="btn btn-success text-dark me-2" target="_blank" href="signup.html"><strong>Signup</strong></a>

      <a class="btn btn-primary text-dark me-2" target="_blank" href="login.html"><strong>Login</strong></a>
      `;
  }
      
      
 
};
navButtons();
loadUserDetails()