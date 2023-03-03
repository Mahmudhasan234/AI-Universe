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
.catch (error=>console.log(error))
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
                <li><h6 class="fw-semibold text-secondary">${tool.features[0]}</h6></li>
                <li><h6 class="fw-semibold text-secondary">${tool.features[1]}</h6></li>
                <li><h6 class="fw-semibold text-secondary">${tool.features[2]}</h6></li>
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
        // console.log(tool)
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
// .catch (error=>console.log(error))
}

 const displayInitialDataForSingleCard = (data) => {
    // -----Modal title-----
  const modalTitle = document.getElementById('Modal-tittle')
 modalTitle.innerHTML = `${data.description ? data.description : 'No Desceiption'} 
 `
// -----Modal Pricing--------
    const priceAndPlan = document.getElementById('pricing-section')
    priceAndPlan.innerHTML =`
            <p class="text-success fw-bold text-center">${data.pricing ? data.pricing[0].price : 'Free of Cost'} <br> ${data.pricing ? data.pricing[0].plan : 'Basic'} </p>
           <p class="text-warning fw-bold text-center">${data.pricing ? data.pricing[1].price : 'Free of Cost'} <br> ${data.pricing ? data.pricing[1].plan : 'Pro'} </p>
            <p class="text-danger fw-bold text-center">${data.pricing ? data.pricing[2].price : 'Free of Cost'} <br> ${data.pricing ? data.pricing[2].plan : 'EnterPrise'} </p> 
    
    `
    // console.log(data.features)
    //------ features Data-------

    const features = data.features
    
    let descriptionData = "";
    let featureData = document.getElementById('features-data');
    for(let i in features){
        if(features){

            descriptionData +="<li>" +features[i].feature_name + "</li>"
        }
        else{
            
            descriptionData +="<p>"+ "NO Data Found" + "</p>"
        }
         featureData.innerHTML = descriptionData   
    }

    // --------- integrations data---------

    const integrations = data.integrations
    console.log(integrations)
    const integrationsData = document.getElementById('integrations-data')
    let integrationDescriptionData ="";
    // console.log(integrations)
    if(integrations === null){
        integrationsData.innerHTML =
        `<p>No Data Found</p>`
       console.log('no Data Found')
    }
    else{
        for(individualData in integrations){
            integrationDescriptionData +="<li>" +integrations[individualData]+ "</li>"
            integrationsData.innerHTML = integrationDescriptionData
            console.log(integrations[individualData])


        }
    }


    
    // ------modal imagea nd aquracy-------
    const onlyImage = document.getElementById('only-img-and-aqu')
    const accuracy = data.accuracy.score*100
    console.log(accuracy)
    if(accuracy === 0 ){
        onlyImage.innerHTML =`
        <p> <img  src="${data.image_link[0]}" class="card-img-top rounded" alt="..." ></p>
        `}
        else{
            onlyImage.innerHTML =`
            <p> <img  src="${data.image_link[0]}" class="card-img-top rounded" alt="..." > <span style="bottom:250px; left: 350px;" class="position-relative  badge rounded-pill bg-danger">${accuracy} % Accuracy </span></p>
            `    
    }
    // -----modal Image Description------
    const modalImage = document.getElementById('image-section')
    modalImage.innerHTML=`
   
   
    <h5 class="fw-bold text-center mt-5 mb-3">${data.input_output_examples ? data.input_output_examples[0].input : 'Can you give any example?'}</h5> 
    <h6 class="text-secondary fw-bold text-center mb-5 ">${data.input_output_examples ? data.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</h6> 
    
    `
 }





loadInitialData(5)



 