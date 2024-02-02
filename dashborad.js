const allordershow = () => {
    
    // const parent = document.getElementById("dashboard-body");
    // parent.innerHTML="";
    
    fetch(`https://papri-dotcom.onrender.com/orders/order/`)
  .then((res) => {
      if (!res.ok) {
          throw new Error(`Request failed with status: ${res.status}`);
      }

      return res.json();
  })
  .then((data) => {
    // console.log(data);
    displayOrderData(data);
  })
  .catch((error) => {
      console.error('Error fetching flower data:', error);
  });
}
const displayOrderData = (orders) => {
    console.log("order Data",orders);
    const parent = document.getElementById("dashboard-body");
      parent.innerHTML = `
      <h4 class="text-center m-3 text-primary"><strong>All Orders</strong></h4>
      <table class="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Quantaty</th>
                <th scope="col">Order Status</th>
                <th scope="col">Date</th>
                <th scope="col">Item</th>
                <th scope="col">Change Order Status?</th>
              </tr>
            </thead>
            <tbody id="order-tablebody">
            
            </tbody>
          </table>
      `;
    orders.forEach((order) => {
      console.log("Order",order);
      const tbody = document.getElementById("order-tablebody");
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <th>${order.id}</th>
      <th>${order.quantity}</th>
      ${order.order_status == "Pending"
          ? `<th ><a href="" class="btn btn-danger">${order.order_status}</a></th>`
          : `<th ><a href="" class="btn btn-success">${order.order_status}</a></th>`
      }
      <th>${order.date}</th>
      
      <th><button class="btn btn-primary"><a class="text-decoration-none text-light" target="_blank" href="flowerdetails.html?flowerId=${order.flower}">Flower Details</a></button></th>
      <th><button class="btn btn-success"><a class="text-decoration-none text-light" target="_blank" onclick=updateOrderStatus(${order.id})>Flower Make Complite</a></button></th>
      `;
      tbody.appendChild(tr);
      });
      
  };

  


  async function updateOrderStatus(orderId) {
    console.log(orderId);
    const apiUrl = `https://papri-dotcom.onrender.com/orders/order/${orderId}/`;
    const updateData = {
      id: orderId,
      order_status: "Completed"
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
  
      if (response.ok) {
        console.log('Order status updated successfully.');
      } else {
        console.error('Failed to update order status.');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };
  
  // Example usage:// Replace with the actual order ID
  


// const makecomplite = (flwId) => {

//   const apiUrl = `https://papri-dotcom.onrender.com/orders/order/${flwId}`;
//     console.log("In func" , apiUrl);
//     const updateData = {
//       id: flwId,
//       order_status: 'Completed'
//     };
  
//     try {
//       const response = fetch(apiUrl, {
//         method: 'PUT', // Assuming your API endpoint supports PUT requests
//         headers: {
//           'Content-Type': 'application/json',
//           // Add any other headers required by your API
//         },
//         body: JSON.stringify(updateData),
//       });
  
//       if (response.ok) {
//         console.log('Order status updated successfully.');
//       } else {
//         console.error('Failed to update order status.');
//       }
//     } catch (error) {
//       console.error('Error updating order status:', error);
//     }
  
// };
const allproductshow = () => {
    
    // const parent = document.getElementById("dashboard-body");
    // parent.innerHTML="";
    fetch(`https://papri-dotcom.onrender.com/flowers/flower/`)
  .then((res) => {
      if (!res.ok) {
          throw new Error(`Request failed with status: ${res.status}`);
      }

      return res.json();
  })
  .then((data) => {
    // console.log(data);
    displayProductData(data);
  })
  .catch((error) => {
      console.error('Error fetching flower data:', error);
  });
}
const displayProductData = (products) => {
    console.log("Product Data",products);
    const parent = document.getElementById("dashboard-body");
      parent.innerHTML = `
      <h4 class="text-center m-3 text-primary"><strong>All Products</strong></h4>
      <table class="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Quantaty</th>
                <th scope="col">Price</th>
                <th scope="col">Flower Category</th>
                <th scope="col">Details Flower</th>
                <th scope="col">Delete Product?</th>
              </tr>
            </thead>
            <tbody id="order-tablebody">
            
            </tbody>
          </table>
      `;
    products.forEach((product) => {
      console.log("product",product);
          const tbody = document.getElementById("order-tablebody");
          const tr = document.createElement("tr");
          tr.innerHTML = `
          <td>${product.title}</td>
          <td>${product.quantity}</td>
          <td>${product.price}</td>
          
          <td><a href="" class="btn btn-warning">${product.flower[0]}</a></td>

          <td><button class="btn btn-primary"><a class="text-decoration-none text-light" target="_blank" href="flowerdetails.html?flowerId=${product.id}">Details</a></button></td>

          <td><button class="btn btn-danger" onclick=postdeletefunc(${product.id})>Delete</button></td>
          `;
          tbody.append(tr);
      });
  };

  
  const postdeletefunc = (id) => {

    fetch(`https://papri-dotcom.onrender.com/flowers/flower/${id}/`, {
    method: 'DELETE',
    headers: {
    'Content-Type': 'application/json',
    // You may need to include additional headers, such as authentication token
    // if your API requires authentication
    },
    })
    .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // If the deletion is successful, you may want to handle the response
    // or perform additional actions
    console.log('FlowerModel object deleted successfully');
    return response.json();  // You can remove this line if you don't need the response data
    })
    .then(data => {
    // Handle the response data if needed
    console.log('Response data:', data);
    })
    .catch(error => {
    // Handle errors, such as network issues or server errors
    console.error('Error deleting FlowerModel object:', error.message);
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
allordershow();