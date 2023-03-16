const output = document.querySelector('.data');
const ime = document.querySelector('#ime');
const prezime = document.querySelector('#prezime');
const broj = document.querySelector('#broj');
const grad = document.querySelector('#grad');
(async () =>{
    const res = await fetch(`/getphone`);
    const data = await res.json();
    if(!data.ok){
        throw new Error(`Failed to get contacts`)
    }
    data.data.forEach(element => {
        let p = document.createElement('p');
        p.textContent = `ime: ${element.name} prezime ${element.surname} grad: ${element.city} telefon: ${element.phone}`;
        output.appendChild(p);
    });
})()

document.querySelector('form').addEventListener('submit',async  e =>{
    e.preventDefault();
    const body = {
        name: ime.value,
        surname: prezime.value,
        phone: broj.value,
        city: grad.value,
    }
    
    const res = await fetch('/addphone',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    const data = await res.json();
    if(!data.ok){
        throw new Error(data.message);
    }
    let p = document.createElement('p');
    p.textContent = `ime: ${body.name} prezime ${body.surname} grad: ${body.city} telefon: ${body.phone}`;
    output.appendChild(p);
    console.log(data.message);
});