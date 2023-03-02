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
        
        createChidDiv.innerHTML +=`
        <div class="card">
            <img style="height: 220px;" src="${tool.image}" class="card-img-top" alt="...">
            <div class="card-body ">
                <h3>Features</h3>
                <ul>
                <li><h5>${tool.features[0]}</h5></li>
                <li><h5>${tool.features[1]}</h5></li>
                <li><h5>${tool.features[2]}</h5></li>
                </ul>
                <hr>
                <h5 class="card-title">${tool.name}</h5>
                <br>
                <div class="d-flex justify-content-between align-items-center">
                <p><i class="fa-regular fa-calendar"></i><span class="fw-bold"> ${tool.published_in}</span></p>  
                <p><i class="fa-solid fa-arrow-right text-danger"></i></p>  

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




loadInitialData(5)



