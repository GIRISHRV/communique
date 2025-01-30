const API_KEY = '06760add5ef84d3e955756973848d0c6';

// Theme switching function
function setTheme(mode = 'auto') {
    const userMode = localStorage.getItem('bs-theme');
    const sysMode = window.matchMedia('(prefers-color-scheme: light)').matches;
    const useSystem = mode === 'system' || (!userMode && mode === 'auto');
    const modeChosen = useSystem ? (sysMode ? 'light' : 'dark') : (mode === 'dark' || mode === 'light' ? mode : userMode);

    if (useSystem) {
        localStorage.removeItem('bs-theme');
    } else {
        localStorage.setItem('bs-theme', modeChosen);
    }

    // Explicitly set the data-bs-theme attribute on the html tag
    document.documentElement.setAttribute('data-bs-theme', modeChosen);
    document.querySelectorAll('.mode-switch .btn').forEach(e => e.classList.remove('text-body'));
    document.getElementById(modeChosen).classList.add('text-body');
}

// Event listeners for the buttons
document.getElementById('dark').addEventListener('click', () => setTheme('dark'));
document.getElementById('light').addEventListener('click', () => setTheme('light'));
document.getElementById('system').addEventListener('click', () => setTheme('system'));

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    setTheme(localStorage.getItem('bs-theme') || 'auto');
    loadStoredPosts();
    fetchUserDataAndPosts();
    setupPostForm();
    setupInfiniteScroll();
    loadStoredUsers();
    fetchPeopleYouMayKnow();
    fetchTrendingNews();
    fetchRecentActivity();
});

// Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

let currentPage = 1;
const postsPerPage = 10;
let infiniteScrollObserver;

function setupPostForm() {
    const postForm = document.getElementById('postForm');
    postForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const postTitle = document.getElementById('postTitle').value;
        const postContent = document.getElementById('postContent').value;
        if (postTitle.trim() !== '' && postContent.trim() !== '') {
            savePost(postTitle, postContent);
            document.getElementById('postTitle').value = '';
            document.getElementById('postContent').value = '';
        }
    });
}

function savePost(title, content) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const newPost = {
        title: title,
        content: content,
        timestamp: new Date().toISOString(),
        user: {
            picture: { thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX4Ya8mK6Eo-X7B4cmkpnNjpEKij-TXXPUkg&s" },
            name: { first: "John", last: "Doe" }
        }
    };
    posts.unshift(newPost); // Add new post to the beginning
    localStorage.setItem('posts', JSON.stringify(posts));
    displayPost(newPost);
    scrollToNewPost();
}

function loadStoredPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach(post => displayPost(post));
}

function fetchUserDataAndPosts() {
    Promise.all([
        fetch(`https://randomuser.me/api/?results=${postsPerPage}`).then(res => res.json()),
        fetch(`https://dummyjson.com/posts?limit=${postsPerPage}&skip=${(currentPage - 1) * postsPerPage}`).then(res => res.json())
    ])
    .then(([userData, postData]) => {
        const users = userData.results;
        const posts = postData.posts;
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];

        posts.forEach((post, index) => {
            const user = users[index];
            const newPost = {
                title: post.title,
                content: post.body,
                timestamp: new Date().toISOString(),
                user: {
                    picture: user.picture,
                    name: user.name
                }
            };
            storedPosts.unshift(newPost); // Add new post to the beginning
            displayPost(newPost);
        });

        localStorage.setItem('posts', JSON.stringify(storedPosts));
        currentPage++;
    })
    .catch(error => console.error('Error fetching data:', error));
}

function displayPost(post) {
    const postHTML = generatePostHTML(post.user, { title: post.title, body: post.content });
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.insertAdjacentHTML('afterbegin', postHTML); // Insert at the top
}

function generatePostHTML(user, post) {
    const randomImageUrl = `https://picsum.photos/100?random=${Math.floor(Math.random() * 1000)}`;
    return `
        <div class="card text-center border border-3 rounded py-3 px-3 mb-3 shadow hvr-grow w-100">
            <div class="row h-100 border-bottom pb-2 border-1 align-items-center flex-column flex-md-row">
                <div class="col-auto mb-2 mb-md-0">
                    <img src="${user.picture.thumbnail}" class="rounded-circle d-block border border-2" alt="Profile" width="40" height="40">
                </div>
                <div class="col-auto">
                    <h6 class="fw-bold mb-0 text-start">${user.name.first} ${user.name.last}</h6>
                </div>
            </div>
            <div class="card-body">
                <div class="row align-items-center flex-column flex-md-row">
                    <div class="col-auto mb-2 mb-md-0">
                        <img src="${randomImageUrl}" class="rounded d-block border border-2" alt="Post Image" width="100" height="100">
                    </div>
                    <div class="col">
                        <h5>${post.title}</h5>
                        <p>${post.body}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function scrollToNewPost() {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.scrollTop = 0; // Scroll to the top
}

function setupInfiniteScroll() {
    infiniteScrollObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            fetchUserDataAndPosts();
        }
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
    });

    infiniteScrollObserver.observe(document.querySelector('.posts-scroll-anchor'));
}

function fetchPeopleYouMayKnow() {
    fetch(`https://randomuser.me/api/?results=100`)
        .then(res => res.json())
        .then(data => {
            const users = data.results;
            localStorage.setItem('users', JSON.stringify(users));
            displayPeopleYouMayKnow(users);
        })
        .catch(error => console.error('Error fetching people you may know:', error));
}

function loadStoredUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    displayPeopleYouMayKnow(users);
}

function displayPeopleYouMayKnow(users) {
    const peopleContainer = document.getElementById('peopleYouMayKnow');
    peopleContainer.innerHTML = ''; // Clear existing content
    users.forEach(user => {
        const userHTML = generateUserHTML(user);
        peopleContainer.insertAdjacentHTML('beforeend', userHTML);
    });
}

function generateUserHTML(user) {
    return `
        <div class="d-flex align-items-center mb-2 rounded border p-2">
            <img src="${user.picture.thumbnail}" class="rounded-circle border border-2 me-2" alt="Profile" width="40" height="40">
            <div>
                <h6 class="fw-bold mb-0 text-start">${user.name.first} ${user.name.last}</h6>
            </div>
        </div>
    `;
}

function fetchTrendingNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

    const req = new Request(url);

    fetch(req)
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById('newsContainer');
            newsContainer.innerHTML = ''; // Clear existing content
            data.articles.forEach(article => {
                const articleHTML = generateArticleHTML(article);
                newsContainer.insertAdjacentHTML('beforeend', articleHTML);
            });
        })
        .catch(error => console.error('Error fetching news:', error));
}

function generateArticleHTML(article) {
    const randomImageUrl = `https://picsum.photos/100?random=${Math.floor(Math.random() * 1000)}`;
    const truncatedTitle = article.title.length > 50 ? article.title.substring(0, 47) + '...' : article.title;
    return `
        <div class="d-flex align-items-center mb-2 rounded border p-2">
            <img src="${randomImageUrl}" class="rounded border border-2 me-2" alt="News Image" width="40" height="40">
            <div>
                <h6 class="fw-bold mb-0 text-start">${truncatedTitle}</h6>
            </div>
        </div>
    `;
}

function fetchRecentActivity() {
    const activities = ['liked', 'commented on', 'shared'];
    Promise.all([
        fetch(`https://randomuser.me/api/?results=10`).then(res => res.json()),
        fetch(`https://dummyjson.com/posts?limit=10`).then(res => res.json())
    ])
    .then(([userData, postData]) => {
        const users = userData.results;
        const posts = postData.posts;
        const recentActivityContainer = document.getElementById('recentActivity');
        recentActivityContainer.innerHTML = ''; // Clear existing content

        users.forEach((user, index) => {
            const activity = activities[Math.floor(Math.random() * activities.length)];
            const post = posts[index % posts.length];
            const activityHTML = generateActivityHTML(user, activity, post);
            recentActivityContainer.insertAdjacentHTML('beforeend', activityHTML);
        });
    })
    .catch(error => console.error('Error fetching recent activity:', error));
}

function generateActivityHTML(user, activity, post) {
    return `
        <div class="d-flex align-items-center mb-2 rounded border p-2">
            <img src="${user.picture.thumbnail}" class="rounded-circle border border-2 me-2" alt="Profile" width="40" height="40">
            <div>
                <h6 class="fw-bold mb-0 text-start">${user.name.first} ${user.name.last}</h6>
                <p class="mb-0 text-start">${activity} "${post.title}"</p>
            </div>
        </div>
    `;
}

console.log("Executed");