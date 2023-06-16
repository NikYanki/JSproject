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

//APIService
const APIService = {

    "getComments": (id) => fetch(Url.main + Url.posts + `/${id}` + Url.comments)
        .then(response => response.json()),
    "getPostById": (postId) => fetch(Url.main.concat(Url.posts) + '/' + postId)
        .then((response) => response.json())

}
//Tusks
const postId = new URL(location.href).searchParams.get("post");
APIService.getPostById(postId).then(post => {

    const postDetails = createElement('div', document.body);
    postDetails.classList.add('post');
    showObject(post, postDetails);

    const btnCommentsOfCurrentPost = createElement("button", postDetails);
    btnCommentsOfCurrentPost.innerText = "comments of current post"
    btnCommentsOfCurrentPost.addEventListener("click", (e) => {

        APIService.getComments(post.id).then(comments => {
            const commentsDiv = createElement('div', document.body);
            commentsDiv.classList.add('comments');

            for (const comment of comments) {
                showObject(comment, commentsDiv)
            }
        });
        btnCommentsOfCurrentPost.disabled = true;
    });
});