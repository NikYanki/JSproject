//configs
const Url = {
    main: 'https://jsonplaceholder.typicode.com',
    users: '/users',
    posts: '/posts',
    comments: '/comments'
};

//some functions
const createElement = (tagName, superNode) => {
    const element = document.createElement(tagName);
    superNode.append(element);
    return element;
};

const showSelectedKeysInObjet = (object, saveTo, ...keys) => {
    const ul = createElement('ul', saveTo)

    for (const key of keys) {
        const li = createElement('li', ul);

        for (const objectKey in object) {
            if (objectKey === key)
                li.innerHTML = `${objectKey} : ${object[objectKey]}`;
        }
    }
};

//APIService
const APIService = {
    "getUsers": () => fetch(Url.main.concat(Url.users))
        .then((response) => response.json())
}

//Tusks
APIService.getUsers().then((users) => {
    const usersDiv = createElement('div', document.body);
    usersDiv.classList.add('users');

    for (const user of users) {
        const userDiv = createElement('div', usersDiv);
        userDiv.classList.add('user');
        showSelectedKeysInObjet(user, userDiv, 'id', 'name');
        const linkToUserDetails = createElement('a', userDiv)
        linkToUserDetails.innerText = 'See more'
        linkToUserDetails.setAttribute("href", `./userDetails/userDetails.html?user=${user.id}`)
    }
});
