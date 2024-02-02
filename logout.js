  const handlelogOut = () => {
  const token = localStorage.getItem("token");
  fetch("https://papri-dotcom.onrender.com/user/logout/", {
      method: "POST",
      headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
      },
  })
  .then(response => {
      if (response.ok) {
          return response.json();
      } else {
          console.log(response);
          localStorage.clear()
          throw new Error('Logout request failed.');
          
      }
  })
  .then((data) => {
      console.log("Logout data", data);
      // Additional actions after successful logout
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      sessionStorage.clear();
  })
  .catch((error) => {
      console.error("Logout error:", error);
  });
};