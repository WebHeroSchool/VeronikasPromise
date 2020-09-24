const body = document.body;
const url = window.location.toString();
let requestFromPromise;

const getUsernameFromUrl = (url) => {
  let splitOfUrl = url.split('=');
  let stringOfUsername  = splitOfUrl[1];
  if (stringOfUsername == undefined) {
    stringOfUsername = 'VeronikaWells';
  }
  return stringOfUsername;
};

const getDate = new Promise((resolve, reject) =>
  setTimeout(() => new Date ? resolve(new Date) : reject(new Error('Время неизвестно')), 3000)
);

let preloader = document.getElementById('preloader');

const getRequest = fetch(`https://api.github.com/users/${getUsernameFromUrl(url)}`);

Promise.all([getRequest, getDate])
  .then(([request, nowDate]) => {
    requestFromPromise = request;
    date = nowDate;
  })
  .then(res => requestFromPromise.json())
  .then(json => {
    preloader.style.display = 'none';
    avatarOfUser = json.avatar_url;
    bioOfUser = json.bio;
    urlOfUser = json.url;
    const login = json.name;
    const link = json.html_url;

    const addUser = () => {
      const user = document.createElement('h1');
      user.innerHTML = `${getUsernameFromUrl(url)}`;
      body.appendChild(user);
    }
    const addBio = () => {
      const bio = document.createElement('h3');
      if (json.bio) {
        bio.innerHTML = json.bio;
      } else {
        bio.innerHTML = 'Пользователь не заполнил данное поле';
      };
      body.appendChild(bio);
    }
    const addImg = () => {
      const img = document.createElement('img');
      let newString = document.createElement('br');
      img.src = this.avatarOfUser;
      body.appendChild(img);
      body.appendChild(newString);
    }

    const userName = document.createElement('a'); 
      userName.innerHTML = login; 
      userName.setAttribute('href', link);
      body.appendChild(userName);

    const dateAdd = document.createElement('p');
      dateAdd.innerHTML = date;
      body.appendChild(dateAdd); 

    addUser();
    addBio();
    addImg();
})

.catch(err => document.body.innerHTML = 'Информация о пользователе не доступна');
