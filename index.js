async function populate() {

    const requestURL = 'https://script.google.com/macros/s/AKfycbz7W8iIBKJK9-jTTRhqWy3dDLDJ5oUWqIHD2UnsY7UJ5YJunEFS-QnzhFyxWz8yFoNrtg/exec';
    const request = new Request(requestURL);

    const response = await fetch(request);
    const tennisCourts = await response.json();

    populateHeader(tennisCourts);
    populateCourtTimes(tennisCourts);

}

function populateHeader(obj) {
    const header = document.querySelector('header');
    const myH1 = document.createElement('h1');
    myH1.textContent = obj.title ;

    const para = document.createElement('p');
    para.textContent = 'Last Modified: ' + obj.last_updated;
    myH1.appendChild(para);
    header.appendChild(myH1);
}

function populateCourtTimes(obj) {
    const section = document.querySelector('section');
    const bookings = obj.courts;

    for (const booking of bookings) {
        const h2 = document.createElement('h2');
        const ul = document.createElement('ul');
        const anchor = document.createElement('a');
        anchor.href = booking.url;
        anchor.target = '_blank';
        anchor.textContent = booking.date;
        h2.appendChild(anchor);
        section.appendChild(h2);

        const courts = booking.courts
        for (const court of courts) {
            const h3 = document.createElement('h3');
            h3.textContent = court.court_name
            section.appendChild(h3);
            for (i = 0; i < court.times.length; i++) {
                const para = document.createElement('p');
                para.textContent = court.times[i];
                section.appendChild(para);
            }
        }
    }
}

populate();