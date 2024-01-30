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

getparams();