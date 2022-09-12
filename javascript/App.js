import {fileInput,uploadContainer,dropZone} from "./Utilities.js";
dropZone.addEventListener('dragenter',e=>{
    e.preventDefault()
    e.target.classList.add('active')
})
dropZone.addEventListener('dragover',e=>{
    e.preventDefault()
})
dropZone.addEventListener('dragleave',e=>{
    e.preventDefault()
    e.target.classList.remove('active')
})
dropZone.addEventListener('drop',e=>{
    e.preventDefault()
    getFiles(e.dataTransfer.files)
    e.target.classList.remove('active')
})
const getFiles = (fileArray) => {
    let files=[...fileArray]
    files.forEach(file=>{
        let reader=new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load',e=>{
            imageGenerator(e.target.result,file.name,((file.size)/1000).toFixed(2))
        })
    })
}
const imageGenerator = (url,name,size) => {

    let newImage=new Image(url,name,size)

    storage.storeData(newImage)

    uploadContainer.insertAdjacentHTML('beforeend',`<div class="upload_row d-flex justify-content-between align-items-center mt-3"><img src="${url}" alt="" ><span >${name}</span><span >${size} KB</span><button data-imageId="${newImage.imageId}" class="btn btn-danger">Remove</button></div>`)

}
fileInput.addEventListener('change',e=>{
    getFiles(e.target.files)
})

uploadContainer.addEventListener('click',e=>{
    if(e.target.tagName==='BUTTON'){
        e.target.parentElement.remove()
        storage.deleteData(Number(e.target.dataset.imageid))
    }
})
