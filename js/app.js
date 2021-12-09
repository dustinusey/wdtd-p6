const pagination = {
    items_per_page: 9,
    ui: {
        card: (data) => {
            const employee_list = document.querySelector('.employee-list ul');
            const li = document.createElement('li');
                const card = document.createElement('div');
                card.className = 'employee-card';
                    const photo_and_contact_info = document.createElement('div');   
                    photo_and_contact_info.className="photo-and-contact-info";
                        const photo_div = document.createElement('div');
                        photo_div.className = 'photo-div';
                        const img = document.createElement('img');
                        img.className = 'employee-photo';
                        img.src = data.picture.avatar;
                        photo_div.appendChild(img);
                        const contact_info_div = document.createElement('div');
                        contact_info_div.className = 'contact-info-div';
                            const name = document.createElement('p');
                            name.textContent = `${data.name.first} ${data.name.last}`;
                            const email = document.createElement('a');
                            email.href = `mailto:${data.email}`;
                            email.textContent = data.email;
                            contact_info_div.appendChild(name);
                            contact_info_div.appendChild(email);
                    photo_and_contact_info.appendChild(photo_div);
                    photo_and_contact_info.appendChild(contact_info_div)
                    card.appendChild(photo_and_contact_info)
                    const hr = document.createElement('hr')
                    card.appendChild(hr);
                    const joined_date = document.createElement('p')
                    joined_date.className = "joined-date";
                        const span_for_date = document.createElement('span')
                        span_for_date.textContent = 'joined: 10.10.2008';
                    joined_date.appendChild(span_for_date)
                card.appendChild(joined_date)
                li.appendChild(card)
                employee_list.appendChild(li)
        },
        items: () => {
            for (let i = 0; i < pagination.items_per_page; i ++) {
                pagination.ui.card(data[i])
            }
        },
        page_numbers: () => {
            const number_of_pages = Math.ceil(data.length / pagination.items_per_page);
            const pagination_container = document.querySelector('.pagination-container ul');
            
            for (let i = 1; i <= number_of_pages; i++) {
                const li = document.createElement('li')
                const p = document.createElement('p')
                p.textContent = i;
                li.appendChild(p)
                pagination_container.appendChild(li)
            }

            const page_numbers = document.querySelectorAll('.pagination-container li');
            page_numbers[0].classList.add('active');
            
        }
    },
    page_buttons: {
        current_page: 1,
        ui_toggle: () => {
        const pagination_container = document.querySelector('.pagination-container');
        pagination_container.addEventListener('click', e => {
            let btns = document.querySelectorAll('ul li');
            btns.forEach((btn) => {
                if (e.target === btn) {
                    for (let i = 0; i < btns.length; i++) {
                        btns[i].classList.remove('active')
                    }
                    e.target.classList.add('active');
                }
            })
            if (e.target.tagName === 'LI') {
                pagination.page_buttons.current_page = e.target.textContent;
                pagination.page_buttons.render_items(pagination.page_buttons.current_page)
            }
        })
        },
        render_items: (page_num) => {
            console.log(page_num)
        }
}
}

const toggleTheme = {
    themes: {
        dark: () => {
            document.body.classList = 'dark';
        },
        light: () => {
            document.body.classList = '';
        }
    },
    switch: (theme) => {
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


pagination.ui.items();
pagination.ui.page_numbers();
pagination.page_buttons.ui_toggle();
toggleTheme.switch();