const loader = document.getElementById('homaPageLoader');
window.addEventListener('load' , () => {
    loader.style.opacity ='0'
    setTimeout(() => {
        loader.style.display ='none'
    }, 200);
})
