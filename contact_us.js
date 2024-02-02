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