const loadflowers = (search , type) => {
    document.getElementById("flowers").innerHTML="";
    document.getElementById("spinner").style.display = "block";
    if (type == "search") {
        fetch(`https://papri-dotcom.onrender.com/flowers/flower/?title=${search?search:""}`)
        .then((res) => res.json())
        .then((data) => {
        if(data.length > 0){
            document.getElementById("spinner").style.display = "none";
            document.getElementById("nodata").style.display = "none";
            displayflowers(data);
        }else{
            document.getElementById("doctors").innerHTML = "";
            document.getElementById("spinner").style.display = "none";
            document.getElementById("nodata").style.display = "block";
        }}); 
    }else if (type == "colorcat") {
        fetch(`https://papri-dotcom.onrender.com/flowers/flower/?color=${search?search:""}`)
        .then((res) => res.json())
        .then((data) => {
        if(data.length > 0){
            document.getElementById("spinner").style.display = "none";
            document.getElementById("nodata").style.display = "none";
            displayflowers(data);
        }else{
            document.getElementById("doctors").innerHTML = "";
            document.getElementById("spinner").style.display = "none";
            document.getElementById("nodata").style.display = "block";
        }}); 
    }else if (type == "flowercat") {
        fetch(`https://papri-dotcom.onrender.com/flowers/flower/?flower=${search?search:""}`)
        .then((res) => res.json())
        .then((data) => {
        if(data.length > 0){
            document.getElementById("spinner").style.display = "none";
            document.getElementById("nodata").style.display = "none";
            displayflowers(data);
        }else{
            document.getElementById("doctors").innerHTML = "";
            document.getElementById("spinner").style.display = "none";
            document.getElementById("nodata").style.display = "block";
        }}); 
    }else{
        fetch(`https://papri-dotcom.onrender.com/flowers/flower/`)
        .then((res) => res.json())
        .then((data) => {
        if(data.length > 0){
            document.getElementById("spinner").style.display = "none";
            document.getElementById("nodata").style.display = "none";
            displayflowers(data);
        }else{
            document.getElementById("doctors").innerHTML = "";
            document.getElementById("spinner").style.display = "none";
            document.getElementById("nodata").style.display = "block";
        }});
    }
    
};
const handelSearch = () => {
    const value = document.getElementById("search").value;
    loadflowers(value , "search");
}
const displayflowers = (flowers) => {
    flowers.forEach((flower) => {
        console.log(flower);
        const parent = document.getElementById("flowers");
        const div = document.createElement("div");
        div.classList.add("flw-card");
        div.innerHTML = `
        <img class="doc-img" src="${flower.image}" alt="">
        <h4>${flower.title}</h4>
        <h6>Categorys: <button class="btn btn-sm btn-warning mb-1" >${flower.color[0]}</button></h6>
        <p>${flower.descriptions.slice(0,100)}</p>
        <h6>Price: ${flower.price} BDT</h6>
        <button class="btn btn-primary"><a class="text-decoration-none text-light" target="_blank" href="flowerdetails.html?flowerId=${flower.id}">Details</a></button>
        
        `;
        parent.appendChild(div);
        });
}


// const displayflowers = (flower) => {
    
//         console.log(flower);
//         const parent = document.getElementById("flowers");
//         const div = document.createElement("div");
//         div.classList.add("flw-card");
//         div.innerHTML = `
//         <img class="doc-img" src=${flower.image} alt="">
//         <h4>${flower.full_name}</h4>
//         <h6>${flower.designation[0]}</h6>
//         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, vel?</p>
//         <p>
//         ${flower?.specialization.map((item) =>{
//             return `<button class="btn btn-warning disabled">${item}</button>`
//         })}
//         </p>
//         <button class="btn btn-primary"><a class="text-decoration-none text-light" target="_blank" href="docDetails.html?doctorId=${flower.id}">Details</a></button>
        
//         `;
//         parent.appendChild(div);

    
    
// }
const loadcolorcat = () => {
    fetch("https://papri-dotcom.onrender.com/flowers/color_cat/")
    .then((res) => res.json())
    .then((data) => {
        data.forEach((item) => {
            
            // console.log(item);
            const parent = document.getElementById("drop-colcat");
            const li = document.createElement("li");
            li.classList.add("dropdown-item");
            li.innerHTML = `
                <li onclick="loadflowers('${item.id}','${"colorcat"}')">${item.name}</li>
            `;
            parent.appendChild(li);

        });
    });
};
const loadflowercat = () => {
    fetch("https://papri-dotcom.onrender.com/flowers/flower_cat/")
    .then((res) => res.json())
    .then((data) => {
        data.forEach((item) => {
            const parent = document.getElementById("drop-flwcat");
            const li = document.createElement("li");
            li.classList.add("dropdown-item");
            li.innerHTML = `
                <li onclick="loadflowers('${item.id}','${"flowercat"}')">${item.name}</li>
            `;
            parent.appendChild(li);

        });
    });
};

const loadReview = () => {
    fetch("https://papri-dotcom.onrender.com/flowers/review/")
    .then((res) => res.json())
    .then((data) => displayReview(data));
};

const displayReview = (reviews) => {
    reviews.forEach((review) => {
        console.log("review obj",review.reviewer);
        const parent = document.getElementById("review-container");
        const div = document.createElement("div");
        div.classList.add("review-card");
        div.innerHTML = `
            <img src="./static/girl.png" alt="">
            <h4>${review.reviewer}</h4>
            <p>${review.body.slice(0,100)}</p>
            <h6>${review.rating}</h6>
        `;
        parent.appendChild(div);
    })
}

const navButtons = () => {
    const token = localStorage.getItem("token");
    const staff = localStorage.getItem("staff");
    
    if(token&&staff==="true"){
        console.log(token,staff);
        const parent = document.getElementById("navbuttons");
        parent.innerHTML = `
        <a class="btn btn-info text-dark me-2" href="userDetails.html"><strong>Profile</strong></a>

        <a class="btn btn-warning text-dark me-2" href="dashboard.html"><strong>Dashborad</strong></a>

        <div onclick="handlelogOut()" class="btn btn-danger text-dark me-2" ><strong>Logout</strong></div>
        `;
    }else if(token){
        console.log(token,staff);
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
    };
        
        
   
};
navButtons();
loadcolorcat();
loadflowercat();
loadflowers();
loadReview();


