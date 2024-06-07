
const intervalInput = document.querySelector('input[name="interval"]');
const intervalValue = document.querySelector('.interval-value');

intervalInput.addEventListener('input', () => {
  intervalValue.textContent = `${intervalInput.value} min`;
});


const getData = async () => {
    let response = await fetch("http://localhost:3000/retrieve-data");
    response = await response.json(); 
    const data = response.data;
    console.log(data);
    data.forEach(user => {
        /* ------------------------- Inserting user details ------------------------- */
        const userDiv = document.createElement('table');
        userDiv.classList.add('user');
        userDiv.innerHTML = `
            <tr><td>First Name</td><td>${user.firstName}</td></tr>
            <tr><td>Last Name</td><td>${user.lastName}</td></tr>
            <tr><td>Email</td><td>${user.email}</td></tr>
            <tr><td>Invite Code</td><td>${user.testInvitation}</td></tr>
        `;
        document.querySelector('.container').appendChild(userDiv);
        
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        
        /* ---------------------------- Inserting images ---------------------------- */
        user.images.forEach(image => {
            const card = document.createElement('div');
            card.classList.add('card');
            const img = document.createElement('img');
            const title = document.createElement('span');
            title.classList.add('span');
            const m = image.id;
            const date = new Date(parseInt(m.split('-')[1]));
            const txt = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`
            title.innerHTML = txt;
            img.src = image.url;
            card.appendChild(img);
            card.appendChild(title);
            wrapper.appendChild(card);
        });

        /* ------------------------ When there are no images ------------------------ */
        if(user.images.length === 0){
        
            wrapper.innerHTML = `<p class='warn'> No images uploaded yet! </p>`;
        }
     document.querySelector('.container').appendChild(wrapper);
    })
}


document.querySelector('button').addEventListener('click', e => {
    e.preventDefault();
    const val = document.querySelector('input').value;
    console.log(val)

    fetch(`http://localhost:3000/set_interval?interval=${val}`)
    .then( _ => {
        const dtn = document.querySelector('button')
        dtn.innerText = `Interval is settted to ${val} min`
        setTimeout(() => dtn.innerText = 'Reset Interval Value', 3000);
    });
});


getData();
