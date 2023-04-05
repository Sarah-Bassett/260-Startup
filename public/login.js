(async () => {
  try {
    const url = 'https://numbersapi.com/random/math';
    let response = await fetch(url);
    response = await response.text();
    document.querySelector("#joke").textContent = response;
  } catch {

  }
    let authenticated = false;
    const userName = localStorage.getItem('userName');
    if (userName != null) {
      const nameEl = document.querySelector('#userName');
      if (nameEl != null) {
        nameEl.value = userName;
        const user = await getUser(nameEl.value);
        authenticated = user?.authenticated;
        if (authenticated) {
            document.querySelector('#playerName').textContent = userName;
            setDisplay('loginControls', 'none');
            setDisplay('playControls', 'block');
          } else {
            setDisplay('loginControls', 'block');
            setDisplay('playControls', 'none');
          }
      }
    } else {
      setDisplay('loginControls', 'block');
      setDisplay('playControls', 'none');
    }
  
    
  })();
  
  async function loginUser() {
    data = await getScore(document.querySelector('#userName')?.value);
    loginOrCreate(`/api/auth/login`);
    localStorage.setItem('completeds', data.score);
  }
  
  async function createUser() {
    loginOrCreate(`/api/auth/create`);
    localStorage.setItem('completeds', '')
  }
  
  async function loginOrCreate(endpoint) {
    const userName = document.querySelector('#userName')?.value;
    const password = document.querySelector('#userPassword')?.value;
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const body = await response.json();
  
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      window.location.href = 'play.html';
    } else {
      const modalEl = document.querySelector('#msgModal');
      modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
      const msgModal = new bootstrap.Modal(modalEl, {});
      msgModal.show();
    }
  }
  
  function play() {
    window.location.href = 'home.html';
  }
  
  async function logout() {
    let score = await localStorage.getItem('completeds')
    let userName = localStorage.getItem('userName');
    const response = await fetch(`/api/scores`, {
      method: 'post',
      body: JSON.stringify({ email: userName, score: score }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    fetch(`/api/auth/logout`, {
      method: 'delete',
    }).then(() => (window.location.href = '/'));
  }
  
  async function getUser(email) {
    // See if we have a user with the given email.
    const response = await fetch(`/api/user/${email}`);
    if (response.status === 200) {
      return response.json();
    }
    return null;
  }

  async function getScore(email) {
    // See if we have a user with the given email.
    let response = await fetch(`/api/scores/${email}`);
    if (response.status === 200) {
      response = await response.json();
      return response;
    }
    return null;
  }
  
  function setDisplay(controlId, display) {
    const playControlEl = document.querySelector(`#${controlId}`);
    if (playControlEl) {
      playControlEl.style.display = display;
    }
  }
  