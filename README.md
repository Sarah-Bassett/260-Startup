
# 260-Startup
Do you want to finally put that useless knowledge in your brain to good use? Now, with my new app, you can show off your trivia skills to all your friends! Answer three questions on a given topic within the time allotment to earn that badge, but be careful - if you get one wrong, you will lose the chance to get that badge! New topics are released daily, so you'll never run out of things to learn and test your smarts.
![IMG_4347](https://user-images.githubusercontent.com/111597441/215010609-b66dc056-abb7-4147-880f-67dbcce46223.JPG)

simon html - ran sudo chmod 775 deployFiles.h to fix "permission denied"
simon css - bootstrap containers pretty useful
          - rel = 'stylesheet' href = '___.css'
          - bootstrap link https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css
startup html/css: 
    -use img inside <a> tag to make it a link
    -if right answer, -> same page; otherwise -> home
    -grid layout
simon javascript: 
          - include the <script> element at bottom of body if it modifies html 
          -keep track of ids of elements, thats main tool for making them interactive
          -ie document.querySelector('#whatever')
startup java:
    local storage is VERY helpful
    eval() can take string-> variable
    stringA.includes(stringB) can get substring

simon service:
    api calls should be async/await
    still can use localstorage
    node made database implementation pretty easy
    .gitignore, but still shows 435 changes to be staged 
          
Simon DB:
    when alter /etc/environment in ssh session, need to pm2 restart all --update-env, then pm2 save
    database.js has functions to access database
          
Simon login:
          gets userName from local storage, if not empty awaits getUser (fetch from api) -> authenticated
          authenticated? playcontrols: logincontrols (both seperate divs in index.html, conditionally visible

simon websocket: need peerProxy.js that creates new ws server, can upgrade stuff and track connections, kill ones that don't ping
          index.js has const PeerProxy from require (./peerProxy.js)
          class Game has socket attribute, configures WebSocket at beginning, can this.socket.send(string), wrote onopen, onclose, and onmessage events
          
React CLI: super helpful to set up everything right, get packages, etc
          
Startup service:
          run on nodemon index.js 3000
          console.log super helpful for debugging
          need to set up endpoints to get DB to persist
          ta help queue magically makes things work when I swear they weren't working
