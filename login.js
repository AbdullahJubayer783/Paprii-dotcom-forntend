const handleLogin = (event) => {
    event.preventDefault();
    const username = getValue("login-username");
    const password = getValue("login-password");
    console.log(username, password);
    if ((username, password)) {
      fetch("https://papri-dotcom.onrender.com/user/login/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          
  
          if (data.token && data.user_id) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.user_id);
            localStorage.setItem("staff", data.staff);
            loadUsermodelId();
            alert("login Success full");
            window.location.href = "index.html";
            console.log(data);
          }
        });
    }
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
  

  const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
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