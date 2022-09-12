class Image {
    constructor(url,name,size) {
        this.imageId=Math.floor(Math.random()*9999)
        this.url=url
        this.name=name
        this.size=size
    }
}
class UI {
    constructor() {
        this.uploadContainer=document.querySelector('.upload_container')
        this.allImages=null
    }
    showData(imagesArray){
        this.allImages=imagesArray.map(image=>{
            return `<div class="upload_row d-flex justify-content-between align-items-center mt-3"><img src="${image.url}" alt="" ><span >${image.name}</span><span >${image.size} KB</span><button data-imageId="${image.imageId}" class="btn btn-danger">Remove</button></div>`
        }).join('')
        this.uploadContainer.insertAdjacentHTML('beforeend',this.allImages)
    }
}

class Storage {
    constructor() {
        this.database=null
        this.dbInfo=null
        this.transaction=null
        this.imageStore=null
        this.request=null
    }
    createTx(mode){
        this.transaction=this.dbInfo.transaction('image',mode)

        this.transaction.addEventListener('error',e=>{
            console.log('transaction error',e)
        })
        this.transaction.addEventListener('complete',e=>{
            console.log('transaction success',e)
        })
        return this.transaction
    }
    storeData(newImage){
        this.imageStore=this.createTx("readwrite").objectStore('image')

        this.request=this.imageStore.add(newImage)

        this.request.addEventListener('error',e=>{
            console.log('store req error',e)
        })

        this.request.addEventListener('success',e=>{
            console.log('store req success',e)
        })

    }

    restoreData(){
        this.imageStore=this.createTx("readonly").objectStore('image')

        this.request=this.imageStore.getAll()

        this.request.addEventListener('error',e=>{
            console.log('restore req error',e)
        })

        this.request.addEventListener('success',e=>{
            ui.showData(e.target.result)
            console.log('restore req success',e)
        })

    }
    deleteData(imageId){
        this.imageStore=this.createTx("readwrite").objectStore('image')

        this.request=this.imageStore.delete(imageId)

        this.request.addEventListener('error',e=>{
            console.log('delete req error',e)
        })

        this.request.addEventListener('success',e=>{
            console.log('delete req success',e)
        })


    }

}


let storage=new Storage()
let ui=new UI()
window.addEventListener('load',()=>{
    storage.database=indexedDB.open('Uploader',7)

    storage.database.addEventListener('error',e=>{
        console.log('database create error',e)
    })

    storage.database.addEventListener('success',e=>{
        storage.dbInfo=e.target.result
        storage.restoreData()
        // console.log(storage.dbInfo)
        console.log('database create success',e)
    })

    storage.database.addEventListener('upgradeneeded',e=>{
        storage.dbInfo=e.target.result
        if(!storage.dbInfo.objectStoreNames.contains('image')){
            storage.dbInfo.createObjectStore('image',{
                keyPath:'imageId'
            })
        }
        // if(storage.dbInfo.objectStoreNames.contains('image')){
        //     storage.dbInfo.deleteObjectStore('image')
        // }
        console.log(storage.dbInfo.objectStoreNames)

        console.log('database create upgrade',e)

    })




})