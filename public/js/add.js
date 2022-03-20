const locationForm = document.getElementById('location-form');
const locationId = document.getElementById('location-id');
const locationAddress = document.getElementById('location-address');
const locationOperator = document.getElementById('location-operator');
const locationPhone = document.getElementById('location-phone');
const locationStatus = document.getElementById('location-status');

// Sending POST To API to add the location
async function addLocation(e){
    e.preventDefault();

    if(locationId.value === '' || locationAddress.value === ''){
        alert('Please Fill In Fields');
    }

    const sendBody = {
        locationId: locationId.value,
        address: locationAddress.value,
        operator: locationOperator.value,
        phonenumber: locationPhone.value,
        status: locationStatus.value
    }

    try {
        const res = await fetch('/api/v1/locations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendBody)
        });

        if(res.status === 400) {
            throw Error('Location already exists!')
        }

        alert('Location Added');
        window.location.href = '/index.html'

    } catch (err) {
        alert(err);
        return;
    }
}

locationForm.addEventListener('submit', addLocation);