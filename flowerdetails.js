const getparams = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const flowerId = urlParams.get('flowerId');
    
        fetch(`https://papri-dotcom.onrender.com/flowers/flower/`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Request failed with status: ${res.status}`);
                }
    
                return res.json();
            })
            .then((flowers) => {
                // Filter the flowers array based on the flowerId
                const selectedFlower = flowers.find(flower => flower.id.toString() === flowerId);

                

                if (selectedFlower) {
                    // Log the selected flower data to the console for verification
                    // console.log('Selected Flower:', selectedFlower);
                    displayDetailsFlower(selectedFlower)
                    // Now you can use the selectedFlower data as needed in your code
                } else {
                    console.log(`Flower with ID ${flowerId} not found`);
                }
            })
            .catch((error) => {
                console.error('Error fetching flower data:', error);
            });

            fetch(`https://papri-dotcom.onrender.com/flowers/review/`)
                .then((res) => res.json())
                .then((reviews) => {
                    selectedreview = reviews.filter(reviews => reviews.flower.toString() === flowerId);

                    if (selectedreview) {
                        // Log the selected flower data to the console for verification
                        // console.log('Selected Flower:', selectedreview);
                        console.log(reviews);
                        flowerReview(selectedreview)
                        // Now you can use the selectedFlower data as needed in your code
                    } else {
                        console.log(`Flower with ID ${flowerId} not found`);
                    }
                });
        
};

const displayDetailsFlower = (flower) => {
    const parent = document.getElementById("doc-details");
    const div = document.createElement("div");
    div.classList.add("doc-details-container");
    div.innerHTML = `
    <div class="card flower_details_card mb-3" >
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${flower.image}" class="img-fluid rounded-start flower_image" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${flower.title}</h5>
        <p class="card-text">${flower.descriptions}</p>
        <h5 class="card-title">Quantity: ${flower.quantity}</h5>
        
        <h4>Price: ${flower.price} BDT</h4>
        <button type="button" class="btn btn-primary" onclick="handleBuying()">Buy Now</button>
      </div>
    </div>
  </div>
</div>
    `;
    parent.appendChild(div);
};

const flowerReview = (reviews) => {
    console.log('reviews',reviews);
    reviews.map((review) => {
        
      const parent = document.getElementById("doc-details-review");
      const div = document.createElement("div");
      div.classList.add("review-card");
      div.innerHTML = `
            <img src="./static/girl.png" alt="" />
                <h4>${review.reviewer}</h4>
                <p>
                 ${review.body.slice(0, 100)}
                </p>
                <h6>${review.rating}</h6>
            `;
      parent.appendChild(div);
    });
  };

  const handleBuying = () => {
    const urlParams = new URLSearchParams(window.location.search);

    const formData = new FormData();
    const flowerId = urlParams.get('flowerId');
    const user_id = localStorage.getItem("usermodel_id");
    formData.append("flower", flowerId);
    formData.append("user", user_id);
    formData.append("order_status", "Pending");
    formData.append("quantity", 1);
    fetch('https://papri-dotcom.onrender.com/orders/order/', {
        method: 'POST',
        body: formData
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
    alert(`Check Your Mail At For Confirmation.`);
  };

const navButtons = () => {
  const token = localStorage.getItem("token");
  const staff = localStorage.getItem("staff");
  if(token&&staff==="true"){
      const parent = document.getElementById("navbuttons");
      parent.innerHTML = `
      <a class="btn btn-info text-dark me-2" href="userDetails.html"><strong>Profile</strong></a>

      <a class="btn btn-warning text-dark me-2" href=""><strong>Dashborad</strong></a>

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
getparams();