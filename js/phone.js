const loadPhone = async (searchText = "13",isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones,isShowAll);
};


const displayPhones = (phones,isShowAll) => {
    // console.log("is show al", isShowAll);

    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display show all button if there are more then 12 phone
    const ShowAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        ShowAllContainer.classList.remove('hidden');
    }
    else{
        ShowAllContainer.classList.add("hidden");
    }

    // display only first 10 phones
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }
    


    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-5 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body flex flex-col text-center">
        <h2 class=" font-bold text-2xl text-center">${phone.phone_name}</h2>
        <p class="text-[#706F6F] text-lg">There are many variations of passages of available, but the majority have suffered</p>
        <p class="text-2xl font-bold">999$</p>
        <div class="card-actions  justify-center">
            <button onclick="hendleShowDetail('${phone.slug}')" class="btn btn-primary font-semibold text-xl">Show Details</button>
        </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    // loading spinner off
    toggleLoadingSpinner(false);
}

const hendleShowDetail = async (id) => {
    // console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone);
}


const showPhoneDetails = (phone) => {
    console.log(phone);

    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;


    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <div class="flex justify-center items-center mb-5" >
        <img src="${phone.image}" alt="">
    </div>
    <p class="text-md font-semibold"><span class="text-xl font-bold">Storage:</span> ${phone?.mainFeatures?.storage}</p>
    <p class="text-md font-semibold"><span class="text-xl font-bold">Display Size:</span> ${phone?.mainFeatures?.displaySize}</p>
    <p class="text-md font-semibold"><span class="text-xl font-bold">Chipset:</span> ${phone?.mainFeatures?.chipSet}</p>
    <p class="text-md font-semibold"><span class="text-xl font-bold">Memory:</span> ${phone?.mainFeatures?.memory}</p>
    <p class="text-md font-semibold"><span class="text-xl font-bold">Slug:</span> ${phone?.slug}</p>
    <p class="text-md font-semibold"><span class="text-xl font-bold">Release Data:</span> ${phone?.releaseDate}</p>
    <p class="text-md font-semibold"><span class="text-xl font-bold">Brand:</span> ${phone?.brand}</p>
    <p class="text-md font-semibold"><span class="text-xl font-bold">GPS:</span> ${phone?.others?.GPS || 'NO GPS'}</p>
    
    `

    show_details_modal.showModal();
}

// Hendle Search Button
const hendleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchField);
    loadPhone(searchText, isShowAll);
}




const toggleLoadingSpinner = (isloading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isloading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    hendleSearch(true);
}
loadPhone();