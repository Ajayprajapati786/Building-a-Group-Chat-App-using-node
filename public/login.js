const postLogin = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    axios
      .post('./admin/login', { email, password }, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then((response) => {
        alert(response.data.message);
        console.log(response.data.message);
  
        // Store the token in local storage
        const token = response.data.token;
        localStorage.setItem('token', token);
  
        // Redirect to another page or perform any desired action upon successful login
        window.location.href = "/dashboard";
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code outside the 2xx range
          alert('Error logging in: ' + error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          alert('No response received from the server');
        } else {
          // Something happened in setting up the request that triggered an error
          alert('Error logging in: ' + error.message);
        }
      });
  };
  
  const loginButton = document.getElementById("login");
  loginButton.addEventListener('click', postLogin);
  