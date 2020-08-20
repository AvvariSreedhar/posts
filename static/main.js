// Variable to hold number of loaded posts
let counter = 0

// Number of posts loaded at a time
const quantity = 20

// Load 'quantity' posts when the page is loaded initially
document.addEventListener('DOMContentLoaded', load)

// Load 'quantity' posts when the User hits the bottom of the page
window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        load()
    }
}

function load() {
    // Start count for posts
    const start = counter + 1

    // End count for the posts
    const end = counter + quantity

    // Request for posts with parameters as 'start', 'end'
    fetch(`/post?start=${start}&end=${end}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(add_content)
        })

    // Update no of loaded posts
    counter += quantity
}

// Add content to a post
function add_content(element) {
    // Create a post div
    const post = document.createElement('div')
    post.className = 'post'
    post.innerHTML = element

    // Add hide element
    const hide = document.createElement('button')
    hide.className = 'hide'
    hide.innerHTML = '&times;'

    // Add hide to post
    post.append(hide)

    // The behaviour of this-keyword with an arrow function is different
    // Add event handler to hide-button
    hide.onclick = function () {

        const post = this.parentElement

        // Start the animation of 'post'
        post.style.animationPlayState = 'running'

        // After the animation is complete, remove the post
        post.addEventListener('animationend', function () {
            this.remove()
        })
    }

    // Append the post to the DOM
    document.querySelector('#posts-wall').append(post)
}
