const loadPhones = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) =>{
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = '';

    //Show first 10 mobiles:
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
      phones = phones.slice(0, 10);
      showAll.classList.remove('d-none');
    }else{
      showAll.classList.add('d-none');
    }

    if(phones.length === 0){
      document.getElementById('noPhones').classList.remove('d-none');
    }else{
      document.getElementById('noPhones').classList.add('d-none');
    }

    phones.forEach( phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onClick="showPhoneDetails('${phone.slug}')" id="btn-show-details" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModel">Show Details</button>
        </div>
      </div>
        `
    phonesContainer.appendChild(phoneDiv);
    })

    loader(false);
}

const processData = (dataLimit) =>{
    loader(true);
    const searchField = document.getElementById('exampleFormControlInputField');
    const searchValue = searchField.value;
    loadPhones(searchValue, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function(){
  processData(10);
})

document.getElementById('exampleFormControlInputField').addEventListener('keypress', function(e){
  if(e.key === 'Enter'){
    processData(10);
  }
})

document.getElementById('btn-show-all').addEventListener('click', function(){
  processData();
})

const loader = isLoading =>{
  const loader = document.getElementById('loader');
  if(isLoading){
    loader.classList.remove('d-none');
  }else{
    loader.classList.add('d-none');
  }
}

const showPhoneDetails = async id =>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone =>{
  console.log(phone);
  const phoneTitle = document.getElementById('exampleModalLabel');
  phoneTitle.innerText = `${phone.name}`;
  const phoneBody = document.getElementById('modal-body');
  phoneBody.innerHTML = `
    <p>Release Date: ${phone.releaseDate? phone.releaseDate : "No release Date avialable"}</p>
    <p>Storage: ${phone.mainFeatures.storage? phone.mainFeatures.storage : "Storage not avialable"}</p>
    <p>Bluetooth: ${phone.others ? phone.others.Bluetooth : "No other information avialable"}</p>
  `
}
loadPhones();