class UI {
    constructor() {
        this.post = document.querySelector("#posts");
        this.titleInput = document.querySelector("#title");
        this.bodyInput = document.querySelector("#body");
        this.idInput = document.querySelector("#id");
        this.postSubmit = document.querySelector(".post-submit");
        this.forState = "add";
    }

    showPosts(posts) {
        let output = "";
        posts.forEach(post => {
            output += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}</p>
                        <a href="#" class="edit card-link" data-id="${
                            post.id
                        }"><i class="fa fa-edit"></i></a>
                        <a href="#" class="delete card-link" data-id="${
                            post.id
                        }"><i class="fa fa-trash"></i></a>
                    </div>
                </div>
            `;
            this.post.innerHTML = output;
        });
    }

    showAlert(msg, className) {
        this.clearAlert();
        // create a div
        const div = document.createElement("div");
        div.className = className;
        // add text
        div.appendChild(document.createTextNode(msg));
        // get the parent
        const container = document.querySelector(".postsContainer");
        // get the posts
        const posts = document.querySelector("#posts");
        // insert alert div
        container.insertBefore(div, posts);

        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    clearAlert() {
        const currentAlert = document.querySelector(".alert");

        if (currentAlert) {
            currentAlert.remove();
        }
    }

    clearFields() {
        this.titleInput.value = "";
        this.bodyInput.value = "";
    }

    // fil form to edit
    fillForm(data) {
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;

        this.changeFormState("edit");
    }

    clearId() {
        this.idInput.value = "";
    }

    changeFormState(state) {
        if (state === "edit") {
            this.postSubmit.textContent = "Update Post..";
            this.postSubmit.className = "post-submit btn btn-warning btn-block";

            // create a cancel btn
            const btn = document.createElement("button");
            btn.className = "post-cancel btn btn-light btn-block";
            btn.appendChild(document.createTextNode("Cancel Edit"));

            // get the parent
            const cardForm = document.querySelector(".card-form");
            // get the element to insert before
            const formEnd = document.querySelector("form-end");
            // insert card form
            cardForm.insertBefore(btn, formEnd);
        } else {
            this.postSubmit.textContent = "Post it !";
            this.postSubmit.className = "post-submit btn btn-primary btn-block";
            // remove cancel btn if there
            if (document.querySelector(".post-cancel")) {
                document.querySelector(".post-cancel").remove();
            }
            // clear the id from the hidden field
            this.clearId();
            // clear input fields
            this.clearFields();
        }
    }
}

export const ui = new UI();
