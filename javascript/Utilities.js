////////////////////Variables//////////////////////////////////////
const $=document
const dropZone=_q('.dropdown-zone')
const fileInput=_id('file_upload')
const uploadContainer=_q('.upload_container')
/////////////// Catching Elements with functions////////////////////
function _id(tag) {
    return  $.getElementById(tag)
}
function _class(tag) {
    return $.getElementsByClassName(tag)
}
function _q(tag) {
    return $.querySelector(tag)
}
function _qAll(tag) {
    return $.querySelectorAll(tag)
}
export {dropZone,fileInput,uploadContainer}