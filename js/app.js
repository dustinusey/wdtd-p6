const toggleTheme = {
    themes: {
        dark: () => {
            document.body.classList = 'dark';
        },
        light: () => {
            document.body.classList = '';
        }
    },
    switch: () => {
        const themeToggle = document.querySelector('.toggle-div');
        themeToggle.addEventListener('click', e => {
            if (e.target.tagName === 'I') {
                if (e.target.classList.contains('fa-toggle-on')) {
                    e.target.classList = 'fas fa-toggle-off';
                    toggleTheme.themes.light();
                } else 
                if (e.target.classList.contains('fa-toggle-off')) {
                    e.target.classList = 'fas fa-toggle-on';
                    toggleTheme.themes.dark();
                }
            }
        })
    }
}

const pagination = {
    items_per_page: 9,
    current_page: 1,

    render: {

        // creates markup for individual card w data
        card: (data) => {

            const ul = document.querySelector('.employee-list ul');
            const li = document.createElement('li');
                const card = document.createElement('div');
                card.classList = 'employee-card';
                    const photo_and_contact_info = document.createElement('div');
                    photo_and_contact_info.classList = 'photo-and-contact-info';
                        // child 1
                        const photo_div = document.createElement('div');
                        photo_div.classList = 'photo-div';
                            const img = document.createElement('img');
                            img.classList = 'employee-photo';
                            img.src = data.picture.avatar;
                        photo_div.appendChild(img)
                        // child 2
                        const contact_info_div = document.createElement('div');
                        contact_info_div.classList = 'contact-info-div';
                            // child 1 - first & last name
                            const name = document.createElement('p');
                            name.textContent = `${data.name.first} ${data.name.last}`;
                            // child 2 - email
                            const email = document.createElement('a');
                            email.href = `mailto:${data.email}`;
                            email.textContent = data.email;
                        contact_info_div.appendChild(name);
                        contact_info_div.appendChild(email);
                    photo_and_contact_info.appendChild(photo_div);
                    photo_and_contact_info.appendChild(contact_info_div);
                card.appendChild(photo_and_contact_info);
                    const hr = document.createElement('hr');
                card.appendChild(hr);
                    const join_date = document.createElement('p');
                    join_date.classList = 'joined-date';
                    join_date.textContent = `Joined: ${data.registered.date}`;
                card.appendChild(join_date);
            li.appendChild(card);
            ul.appendChild(li);

        },

        // makes a call to pagination.render.card();
        cards_to_page: () => {

            data.forEach((data) => {
                pagination.render.card(data);
            });

        },
        
        // creates pagination buttons
        pagination_buttons: () => {

            const ul = document.querySelector('.pagination-container ul');
            ul.innerHTML = '';

            let items_per_page = pagination.items_per_page;
            let amount_of_pages =  Math.ceil(data.length / items_per_page);

            for (let i = 1; i <= amount_of_pages; i++) {
                const li = document.createElement('li');
                const p = document.createElement('p');
                p.textContent = i;
                li.appendChild(p);
                ul.appendChild(li);

            }

            ul.firstElementChild.classList.add('active');

        },

        // 
    },

    logic: {
        button_toggling: () => {

            const ul = document.querySelector('.pagination-container ul');
            const li = ul.querySelectorAll('li');
            ul.addEventListener('click', e => {
                if (e.target.tagName === 'LI') {
                    for (let i = 0; i < li.length; i++) {
                        li[i].classList.remove('active')
                    }
                    e.target.classList.add('active');
                    pagination.current_page = parseInt(e.target.textContent);
                    pagination.logic.set_page();
                }
            });
        },

        set_page: () => {
            const cards = document.querySelectorAll('.employee-card');
            const start_index = pagination.current_page * pagination.items_per_page - pagination.items_per_page;
            cards.forEach((card) => {
                card.parentNode.style.display = 'none';
            });
            if (pagination.items_per_page + start_index > data.length) {
                for (let i = start_index; i < data.length; i++) {
                    cards[i].parentNode.style.display = 'flex';
                }
            } else {
            for (let i = start_index; i < pagination.items_per_page + start_index; i++) {
                cards[i].parentNode.style.display = 'flex';
            }
        }
        },

        search: {
            render: () => {
                const info_bar = document.querySelector('.info-bar');
                const search_div = document.createElement('div');
                search_div.classList = 'search-div';
                    const input = document.createElement('input');
                    input.setAttribute('placeholder', 'Search for employee by name');
                    const search_icon = document.createElement('i');
                    search_icon.classList = 'fas fa-search';
                search_div.appendChild(input);
                search_div.appendChild(search_icon)
                info_bar.appendChild(search_div);

            },

            filter: () => {
                const search = document.querySelector('.search-div input');
                const employees = document.querySelectorAll('.contact-info-div p');
                const cards = document.querySelectorAll('.employee-card');
                search.addEventListener('keyup', e => {
                    let employee_names = [];
                    employees.forEach((name) => {
                        employee_names.push(name.textContent.toLowerCase());
                    });
                    employee_names.forEach((name, index) => {
                        if (!name.includes(e.target.value.toLowerCase())) {
                            cards[index].parentNode.style.display = 'none';
                        } else {
                            cards[index].parentNode.style.display = 'flex';
                        }
                    })
                })
            }
        }
    },

    // functions to run
    run: () => {
        pagination.render.cards_to_page();
        pagination.render.pagination_buttons();

        pagination.logic.button_toggling();
        pagination.logic.set_page();

        pagination.logic.search.render();
        pagination.logic.search.filter();
    }
}


// pagination.ui.render_cards(pagination.current_start_index);
// pagination.ui.page_numbers();
// pagination.page_buttons.ui_toggle();
toggleTheme.switch();
pagination.run();