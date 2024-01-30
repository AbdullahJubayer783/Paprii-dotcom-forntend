// document.getElementById('registrationForm').addEventListener('submit', handleRegistration);
// const handleRegistration = (event) => {
//     event.preventDefault();
//     console.log(event);
//     const formdata = new FormData(event.target)
//     const imageFile = document.getElementById('test-image').files[0];
//     const username = getValue("username");
//     const first_name = getValue("first_name");
//     const last_name = getValue("last_name");
//     const mobile_no = getValue("mobile_no");
//     const email = getValue("email");
//     const password = getValue("password");
//     const confirm_password = getValue("confirm_password");
//     const info = {
//       imageFile,
//       username,
//       first_name,
//       last_name,
//       email,
//       mobile_no,
//       password,
//       confirm_password,
//     };
  
//     if (password === confirm_password) {
//       document.getElementById("error").innerText = "";
//       if (
//         /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
//           password
//         )) {
//         console.log(info);
  
//         fetch("https://papri-dotcom.onrender.com/user/register/", {
//           method: "POST",
//           headers: { "content-type": "application/json" },
//           body: JSON.stringify(info),
//         })
//           .then((res) => res.json())
//           .then((data) => console.log(data));
//       } else {
//         document.getElementById("error").innerText =
//           "pass must contain eight characters, at least one letter, one number and one special character:";
//       }
//     } else {
//       document.getElementById("error").innerText =
//         "password and confirm password do not match";
//       alert("password and confirm password do not match");
//     }
//   };

  // const getValue = (id) => {
  //   const value = document.getElementById(id).value;
  //   console.log(value);
  //   return value;
  // };

  // The function handleImageUpload returns the image URL from the file input

document.getElementById('registrationForm').addEventListener('submit', handleRegistration);
 
function handleRegistration(event) {
    event.preventDefault();
 
    const formData = new FormData();
    const imageFile = document.getElementById('image').files[0];
    const username = document.getElementById('username').value;
    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const mobileNo = document.getElementById('mobile_no').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
 
    formData.append('image', imageFile);
    formData.append('username', username);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('mobile_no', mobileNo);
    formData.append('password', password);
    formData.append('confirm_password', confirmPassword);
    //========================================================
    if (password === confirmPassword) {
              document.getElementById("error").innerText = "";
              if (password.length >= 8) {
                fetch('https://papri-dotcom.onrender.com/user/register/', {
                method: 'POST',
                body: formData
            })
                .then((res) => res.json())
                .then((data) => console.log(data));
                alert(`Check Your Mail At ${email} For Confirmation.`);
              } else {
                document.getElementById("error").innerText =
                  "pass must contain eight characters, at least one letter, one number and one special character:";
              }
            } else {
              document.getElementById("error").innerText =
                "password and confirm password do not match";
              alert("password and confirm password do not match");
            }
    //========================================================
    // fetch('https://papri-dotcom.onrender.com/user/register/', {
    //     method: 'POST',
    //     body: formData
    // })
    // .then(response => {
    //     if (response.ok) {
    //         return response.json();
    //     }
    //     throw new Error('Network response was not ok.');
    // })
    // .then(data => {
    //     console.log('Registration successful:', data);
 
    // })
    // .catch(error => {
    //     console.error('Error during registration:', error);
 
    // });
}
 