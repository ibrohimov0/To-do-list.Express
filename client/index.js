const AddNew = document.getElementById("AddNew")
const Modal = document.getElementById("Modal")
const EditModal = document.getElementById("EditModal")
const Overlay = document.getElementById("Overlay")
const EditBtn = document.getElementById("EditBtn")
const DeleteBtn = document.getElementById("DeleteBtn")
//
AddNew.addEventListener("click", () => {
    Modal.style.display = "flex"
    Overlay.style.display = "block"
})
Overlay.addEventListener("click", () => {
    Modal.style.display = "none"
    Overlay.style.display = "none"
    EditModal.style.display = "none"
})
EditBtn.addEventListener("click", () => {
    EditModal.style.display = "flex"
    Overlay.style.display = "block"
})
fetch("http://localhost:3000/admin")
.then(res => res.json())
.then(result => console.log(result))