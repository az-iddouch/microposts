import { http } from "./http.js";
import { ui } from "./ui.js";

// Get posts on DOM Load
document.addEventListener("DOMContentLoaded", getPosts);

// add post event
document.querySelector(".post-submit").addEventListener("click", submitPost);

// listen for edit State
document.querySelector("#posts").addEventListener("click", enableEdit);

// listen for cancel edit
document.querySelector(".card-form").addEventListener("click", cancelEdit);

// listen for click delete
document.querySelector("#posts").addEventListener("click", deletePost);

// my functions
function getPosts() {
    http.get("http://localhost:3000/posts")
        .then(data => ui.showPosts(data))
        .catch(err => console.loh(err));
}

function submitPost() {
    const title = document.querySelector("#title").value;
    const body = document.querySelector("#body").value;
    const id = document.querySelector("#id").value;

    const data = {
        title,
        body
    };

    if (title === "" || body === "") {
        ui.showAlert("Please fill in all the fields !", "alert alert-danger");
    } else {
        // Check for ID
        if (id === "") {
            // create post
            http.post("http://localhost:3000/posts", data)
                .then(data => {
                    ui.showAlert("Post added!", "alert alert-success");
                    ui.clearFields();
                    getPosts();
                })
                .catch(err => console.log(err));
        } else {
            // Update the post
            http.put(`http://localhost:3000/posts/${id}`, data)
                .then(data => {
                    ui.showAlert("Post updated!", "alert alert-success");
                    ui.changeFormState("add");
                    getPosts();
                })
                .catch(err => console.log(err));
        }
    }
}

function enableEdit(e) {
    if (e.target.parentElement.classList.contains("edit")) {
        const id = e.target.parentElement.dataset.id;
        const body = e.target.parentElement.previousElementSibling.textContent;
        const title =
            e.target.parentElement.previousElementSibling.previousElementSibling
                .textContent;
        const data = {
            id,
            title,
            body
        };
        // Fill form with current post
        ui.fillForm(data);
    }
    e.preventDefault();
}

// cancel edit stat
function cancelEdit(e) {
    if (e.target.classList.contains("post-cancel")) {
        ui.changeFormState("add");
    }
    e.preventDefault();
}

function deletePost(e) {
    if (e.target.parentElement.classList.contains("delete")) {
        const id = e.target.parentElement.dataset.id;

        // http.delete(`http://localhost:3000/posts/${id}`)
        //     .then(data => {
        //         console.log(data);
        //         getPosts();
        //         ui.showAlert("post deleted !", "alert alert-success");
        //     })
        //     .catch(err => console.log(err));

        // doesn't work using the EasyHTTP library

        fetch(`http://localhost:3000/posts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(data => {
                return data.json();
            })
            .then(data => {
                console.log(data);
                getPosts();
                ui.showAlert("post deleted !", "alert alert-success");
            })
            .catch(err => console.log(err));
    }
    e.preventDefault();
}
