const postSignup = (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    console.log(name, email, password);
  
    if (password !== confirmPassword) {
      alert("Password and confirm password do not match");
      return;
    }
  
    axios
      .post('./admin/signup', { name, email, password }, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then((response) => {
        alert(response.data.message);
        console.log(response.data.message);
        // console.log(response);
        // window.location.reload(); 
        window.location.href = "/login";
  
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code outside the 2xx range
          alert('Error creating user: ' + error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          alert('No response received from the server');
        } else {
          // Something happened in setting up the request that triggered an error
          alert('Error creating user: ' + error.message);
        }
      });
  };
  
  const signupButton = document.getElementById("signupp");
  signupButton.addEventListener('click', postSignup);
  