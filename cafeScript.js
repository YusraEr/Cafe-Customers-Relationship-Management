document.addEventListener('DOMContentLoaded', function() {
    function initializeCommonFeatures() {
        const toggleBtn = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (toggleBtn && navbarCollapse) {
            toggleBtn.addEventListener('click', () => {
                navbarCollapse.classList.toggle('show');
            });
        }

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    function initializeHomePage() {
        const dateRangeDropdown = document.querySelector('.dropdown');
        const customDateRange = document.getElementById('customDateRange');
        
        if (dateRangeDropdown && customDateRange) {
            dateRangeDropdown.addEventListener('click', (e) => {
                if (e.target.classList.contains('dropdown-item')) {
                    const selectedRange = e.target.textContent;
                    if (selectedRange === 'Custom') {
                        customDateRange.style.display = 'block';
                    } else {
                        customDateRange.style.display = 'none';
                        filterFeedback(selectedRange);
                    }
                }
            });
        }

        // Implement feedback filtering
        function filterFeedback(dateRange) {
            const storedFeedback = JSON.parse(localStorage.getItem('feedback'));
            let filteredFeedback = storedFeedback;

            if (dateRange === 'Today') {
                filteredFeedback = storedFeedback.filter(feedback => {
                    const date = new Date(feedback.date);
                    const today = new Date();
                    return date.getDate() === today.getDate() &&
                        date.getMonth() === today.getMonth() &&
                        date.getFullYear() === today.getFullYear();
                });
            } else if (dateRange === 'This Week') {
                filteredFeedback = storedFeedback.filter(feedback => {
                    const date = new Date(feedback.date);
                    const today = new Date();
                    return date.getTime() >= today.getTime() - (7 * 24 * 60 * 60 * 1000);
                });
            } else if (dateRange === 'This Month') {
                filteredFeedback = storedFeedback.filter(feedback => {
                    const date = new Date(feedback.date);
                    const today = new Date();
                    return date.getMonth() === today.getMonth() &&
                        date.getFullYear() === today.getFullYear();
                });
            } else if (dateRange === 'Custom') {
                filteredFeedback = storedFeedback;
            }

            const feedbackList = document.querySelector('.feedback-list');
            feedbackList.innerHTML = '';
            filteredFeedback.forEach(feedback => {
                const feedbackItem = document.createElement('li');
                feedbackItem.textContent = feedback.message;
                feedbackList.appendChild(feedbackItem);
            });
        }

        const searchBar = document.querySelector('.search-bar input');
        const searchButton = document.querySelector('.search-bar button');
        
        if (searchBar && searchButton) {
            searchButton.addEventListener('click', () => {
                const searchTerm = searchBar.value;
                const storedFeedback = JSON.parse(localStorage.getItem('feedback'));
                const searchedFeedback = storedFeedback.filter(feedback => {
                    return feedback.message.includes(searchTerm);
                });

                const feedbackList = document.querySelector('.feedback-list');
                feedbackList.innerHTML = '';
                searchedFeedback.forEach(feedback => {
                    const feedbackItem = document.createElement('li');
                    feedbackItem.textContent = feedback.message;
                    feedbackList.appendChild(feedbackItem);
                });
            });
        }
    }

    function initializeAddCoffeePage() {
        const addBlendForm = document.querySelector('.form-section form');
        
        if (addBlendForm) {
            addBlendForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(addBlendForm);
                const newFeedback = {
                    message: formData.get('message'),
                    date: new Date().toISOString(),
                };
                const storedFeedback = JSON.parse(localStorage.getItem('feedback')) || [];
                storedFeedback.push(newFeedback);
                localStorage.setItem('feedback', JSON.stringify(storedFeedback));
                console.log('New feedback added:', newFeedback);
            });
        }
    }

    function initializeProfileSettingsPage() {
        const uploadButton = document.querySelector('.upload-section button');
        
        if (uploadButton) {
            uploadButton.addEventListener('click', () => {
                console.log('Uploading new document...');
            });
        }

        const editProfileButton = document.querySelector('.user-details button');
        
        if (editProfileButton) {
            editProfileButton.addEventListener('click', () => {
                console.log('Editing profile details...');
            });
        }
    }

    function initializeStatisticsPage() {
        function loadStatistics() {
            console.log('Loading statistics data...');
        }

        loadStatistics();
        setInterval(loadStatistics, 60000);
    }

    function initializeLoginPage() {
        const loginForm = document.querySelector('form');
        let akun = ['admin', 'user', 'guest'];
        let pass = ['admin', 'user', 'guest'];
        const loginBtn = document.getElementById('loginBtn');
        
        if (loginForm) {
            loginBtn.addEventListener('click', (e) => { 
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                if (akun.includes(email) && pass.includes(password)) {
                    console.log('Login successful');
                    alert('Login successful', 'success');
                    window.location.href = 'home.html';
                } else {
                    console.log('Login failed');
                    alert('Login failed', 'error');
                }
            });
        }

        const forgotPasswordLink = document.getElementById('forPass');
        
        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Initiating password reset process...');
                alert('Password reset link sent to your email', 'success');
            });
        }
    }

    const currentPage = document.body.id;
    initializeCommonFeatures();

    switch (currentPage) {
        case 'home':
            initializeHomePage();
            break;
        case 'add-coffee':
            initializeAddCoffeePage();
            break;
        case 'profile-settings':
            initializeProfileSettingsPage();
            break;
        case 'statistics':
            initializeStatisticsPage();
            break;
        case 'login':
            initializeLoginPage();
            break;
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.className = `notification ${type}`;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }


});
