// fetch section
let fetchDate = [] ;
const loadInitialData =(loadDataLimit, sortByDate) => {


const url = `https://openapi.programming-hero.com/api/ai/tools`
fetch(url)
.then(res => res.json())
.then(data => {
    fetchDate = data.data.tools
    displayInitialData(data.data.tools , loadDataLimit, sortByDate)
})
}
const displayInitialData =(tools, loadDataLimit, sortByDate) =>{

    if(sortByDate, loadDataLimit < 6){
        tools = tools.slice(0,6)    
    }


    const cardParentBody =document.getElementById('card-parent-body')
    cardParentBody.innerHTML= '';
    cardParentBody.classList.add('col')
    // ----------slice-section start----------
    tools.forEach(tool => {
        const createChidDiv = document.createElement('div')
        
        createChidDiv.innerHTML =`
        <div class="card">
            <img style="height: 220px;" src="${tool.image}" class="card-img-top" alt="...">
            <div class="card-body ">
                <h3 class="fw-bold">Features</h3>
                <ul class="fw-bold">
                <li><h5 class="fw-semibold text-secondary">${tool.features[0]}</h5></li>
                <li><h5 class="fw-semibold text-secondary">${tool.features[1]}</h5></li>
                <li><h5 class="fw-semibold text-secondary">${tool.features[2]}</h5></li>
                </ul>
                <hr>
                <h5 class="card-title fw-bold">${tool.name}</h5>
                <br>
                <div class="d-flex justify-content-between align-items-center">
                <p><i class="fa-regular fa-calendar"></i><span class="fw-bold text-secondary"> ${tool.published_in}</span></p>  
          
                <button onclick="loadInitialDataForSingleCard('${tool.id}')"  class="border-0 rounded-circle"><i class="fa-solid fa-arrow-right text-danger"  data-bs-toggle="modal" data-bs-target="#detailsModal"></i></button>  

              </div>
            </div>
          </div>
        `
        cardParentBody.appendChild(createChidDiv)
        console.log(tool)
    });
    loadSpinner(false)
}

// ------Load Spinner-----
 const loadSpinner = (isLoading) =>{
    const loadingIcon = document.getElementById('loading-spinner')
    if(isLoading){
        loadingIcon.classList.remove('d-none')
    }
    else{
        loadingIcon.classList.add('d-none')
    }
 }


// ------------ dataLimit-------

const loadDataLimit = (dataLimit) =>{

    loadInitialData(dataLimit)
}
// ---see more button-----

document.getElementById('see-more-btn').addEventListener('click', function(){
    loadSpinner(true)
    loadInitialData()

})

// ------sort by date-----

const sortByDate =()=>{

    createSort = (a, second) =>{
        const dateA = new Date(a.published_in);
        const dateB = new Date(second.published_in);
        if (dateA > dateB) return 1;
        else if (dateA < dateB) return -1;
        return 0;
    }
  
 displayInitialData(fetchDate.sort(createSort))
}

// fetch data of single card

const loadInitialDataForSingleCard = (id) => {
 const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
fetch(url)
.then(res => res.json())
.then(data => displayInitialDataForSingleCard(data.data))
}

const displayInitialDataForSingleCard = (data) => {
    const singleDataParentDiv = document.getElementById('modal-body')
    singleDataParentDiv.classList.add('modal-body')
    singleDataParentDiv.innerHTML = '';
    const createDivofSingleId = document.createElement('div');
    createDivofSingleId.innerHTML =`

    <div class=" container gap-5 d-flex flex-column flex-md-row justify-content-center align-items-center">

    <div class="shadow-lg p-3 mb-5 bg-body rounded">
    <h5 class=" fw-bold" id="exampleModalToggleLabel">${data.description ? data.description : 'No Desceiption'}</h5>
    <div class="d-flex flex-column flex-md-row justify-content-center align-items-center gap-5 my-5">
    <p class="text-success fw-bold text-center">${data.pricing ? data.pricing[0].price : 'Free of Cost'} <br> ${data.pricing ? data.pricing[0].plan : ''} </p>

    <p class="text-warning fw-bold text-center">${data.pricing ? data.pricing[1].price : 'Free of Cost'} <br> ${data.pricing ? data.pricing[1].plan : ''} </p>
<p class="text-danger fw-bold text-center">${data.pricing ? data.pricing[2].price : 'Free of Cost'} <br> ${data.pricing ? data.pricing[2].plan : ''} </p> 
   
    
    </div>

    <div>

    </div>

    </div>

    <div>
    <img src="${data.image_link[0]}" class="card-img-top" alt="...">
    </div>

    </div>
    `

    singleDataParentDiv.appendChild(createDivofSingleId)
    
    
    console.log(data)
}





loadInitialData(5)



 