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

const showObject = (object, saveTo) => {
    const ul = createElement('ul', saveTo);
    for (const objectKey in object) {
        const li = createElement('li', ul);

        if (typeof (object[objectKey]) === "object") {
            li.innerHTML = `<b>${objectKey}  :</b>`;
            showObject(object[objectKey], saveTo);

        } else {
            li.innerHTML = objectKey + " : " + object[objectKey];
        }
    }
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

    "getUserPosts": (id) => fetch(Url.main + Url.users + `/${id}` + Url.posts)
        .then((response) => response.json()),
    "getUserById": (userId) => fetch(Url.main.concat(Url.users) + '/' + userId)
        .then((response) => response.json())

}
//Tusks

const userId = new URL(location.href).searchParams.get("user");
APIService.getUserById(userId).then(user => {
    const userDetails = createElement('div', document.body);
    userDetails.classList.add('user');
    showObject(user, userDetails);

    const btnPostOfCurrentUser = createElement("button", userDetails);
    btnPostOfCurrentUser.innerText = "post of current user";
    btnPostOfCurrentUser.addEventListener("click", (e) => {

        APIService.getUserPosts(userId).then(posts => {
            const postsDiv =createElement("div",document.body);
            postsDiv.classList.add("posts");

            for (const post of posts) {
                const postDiv =createElement("div",postsDiv);
                postDiv.classList.add("post");
                showSelectedKeysInObjet(post, postDiv, "title");

                const linkToPostDetails = createElement("a", postDiv);
                linkToPostDetails.innerText = "see more";
                linkToPostDetails.setAttribute("href", `../postDetails/postDetails.html?post=${post.id}\ `);

            }

        });
    });

});


