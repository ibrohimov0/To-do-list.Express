const AddNew = document.getElementById("AddNew")
const Modal = document.getElementById("Modal")
const EditModal = document.getElementById("EditModal")
const Overlay = document.getElementById("Overlay")
const EditBtn = document.getElementById("EditBtn")
const DeleteBtn = document.getElementById("DeleteBtn")
const Table = document.getElementById("Table")
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
//
async function GetData() {
    const response = await fetch("http://localhost:3000/api/admin")
    return response.json()
}
//
GetData().then(res => res.map((e) => {
    const tr = document.createElement('tr')
    tr.id = e.id
    Object.values(e).map((el) => {
        const td = document.createElement('td')
        td.textContent = el
        tr.append(td)
    })
    const toolDel = document.createElement("button");toolDel.id = "DeleteBtn";toolDel.className = "fa-solid fa-trash";toolDel.value = e.id;
    const toolEdt = document.createElement("button");toolEdt.id = "EditBtn";toolEdt.className = "fa-solid fa-pen";toolEdt.value = e.id;
    const tools = document.createElement("td");
    tools.append(toolEdt, toolDel);
    tr.append(tools);
    Table.append(tr);
}))

//
// fetch("http://localhost:3000/admin",
//  {headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
// },
// method: "POST",
// body: JSON.stringify({name: "Unkn",age:17,type:"ok"})})
// .then(res => res.json())
// .then(result => console.log(result))