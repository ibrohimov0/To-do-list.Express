const AddNew = document.getElementById("AddNew")
const Modal = document.getElementById("Modal")
const EditModal = document.getElementById("EditModal")
const Overlay = document.getElementById("Overlay")
const EditBtn = document.getElementById("EditBtn")
const DeleteBtn = document.getElementById("DeleteBtn")
const Table = document.getElementById("Table")
const Message = document.getElementById("message")
const MessageBox = document.querySelector(".message")
//
const typeModal = document.getElementById("typeModal")
const nameModal = document.getElementById("nameModal")
const ageModal = document.getElementById("ageModal")
const nameEditModal = document.getElementById("nameEditModal")
const typeEditModal = document.getElementById("typeEditModal")
const ageEditModal = document.getElementById("ageEditModal")
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
const OpenEditModal = () => {
    EditModal.style.display = "flex"
    Overlay.style.display = "block"
}
//
async function GetData() {
    const response = await fetch("http://localhost:3000/api/admin")
    return response.json()
}
async function PostData(body) {
    const response = await fetch("http://localhost:3000/api/admin",
    {headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(body)
    })
    return response.json()
}
async function PutData(body, id) {
    const response = await fetch(`http://localhost:3000/api/admin/${id}`,
    {headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: "PUT",
    body: JSON.stringify(body)
    })
    return response.json()
}
async function DeleteData(id) {
    const response = await fetch(`http://localhost:3000/api/admin/${id}`,
    {headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: "DELETE"
    })
    return response.json()
}
//
GetData().then(res => res.map((e) => {
    const tr = document.createElement('tr')
    tr.id = e._id
    for (let i = 1; i < 4; i++) {
        const td = document.createElement('td')
        td.textContent = Object.values(e)[i]
        tr.append(td)
    }   
    const toolDel = document.createElement("button");toolDel.id = "DeleteBtn";toolDel.className = "fa-solid fa-trash";toolDel.value = e._id;
    const toolEdt = document.createElement("button");toolEdt.id = "EditBtn";toolEdt.className = "fa-solid fa-pen";toolEdt.value = e._id;
    toolEdt.addEventListener("click", (e) => {OpenEditModal();window.localStorage.setItem("editId", e.target.value)})
    toolDel.addEventListener("click", (e) => DeleteItem(e.target.value))
    const tools = document.createElement("td");
    tools.append(toolEdt, toolDel);
    tr.append(tools);
    Table.append(tr);
}))
Modal.addEventListener("submit", (e) => {
    e.preventDefault()
    MessageBox.style.animationName = ""
    const body = {
        name: nameModal.value,
        age: parseInt(ageModal.value),
        type: typeModal.value
    }
    PostData(body).then(res => {
        if(res.status == 200) {
            Modal.style.display = "none"
            Overlay.style.display = "none" 
            nameModal.value = null
            ageModal.value = null
            typeModal.value = null
            location.reload()
        } else {
            Message.textContent = res.message
            MessageBox.style.animationName = "message"
        }
    })
})
EditModal.addEventListener("submit", (e) => {
    e.preventDefault()
    MessageBox.style.animationName = ""
    const body = {
        name: nameEditModal.value,
        age: ageEditModal.value,
        type: typeEditModal.value
    }
    const id = window.localStorage.getItem("editId")
    PutData(body, id).then(res => {
        if(res.status == 200) {
            EditModal.style.display = "none"
            Overlay.style.display = "none" 
            nameEditModal.value = null
            ageEditModal.value = null
            typeEditModal.value = null
            location.reload()    
        } else {
            Message.textContent = res.message
            MessageBox.style.animationName = "message"
        }
    })
})
function DeleteItem(id) {
    MessageBox.style.animationName = ""
    DeleteData(id).then(res => {
        if(res.status == 200) {
            location.reload()    
        } else {
            Message.textContent = res.message
            MessageBox.style.animationName = "message"
        }
    })  
}
//