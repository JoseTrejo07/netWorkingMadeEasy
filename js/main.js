//neaPal
document.querySelector('.newPal').addEventListener("click",createNewPal)
function createNewPal(){
    document.querySelector('.name').value = ''
    document.querySelector('.phoneNumber').value = ''
    document.querySelector('.email').value = ''
    document.querySelector('.discription').value = ''
    document.querySelector('.selectPal').value = ''
    document.querySelector('.img').src = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
}
//upload img dataURL
document.querySelector('.img').addEventListener('click',addPalImg)
function addPalImg(){
    document.querySelector('.upLoadPal').click()
}
document.querySelector('.upLoadPal').addEventListener('change',changePal)
function changePal(){
    const reader = new FileReader()

    reader.addEventListener('load', loadResults)
    function loadResults(){
        let imgData = reader.result
        localStorage.setItem('palImg',imgData) 
        document.querySelector('.img').src = localStorage.getItem('palImg')
    }
    reader.readAsDataURL(this.files[0])
}

//savePal
let palInfo=[JSON.parse(localStorage.getItem('myPals'))]
let palInfo2=palInfo.flat()
document.querySelector('.savePal').addEventListener('click',saveNewPal)
function saveNewPal(){
    let name = document.querySelector('.name').value
    let number = document.querySelector('.phoneNumber').value
    let email = document.querySelector('.email').value
    let discription = document.querySelector('.discription').value
    let img = localStorage.getItem('palImg')

    if((document.querySelector('.name').value === '')||(document.querySelector('.phoneNumber').value==='')||(document.querySelector('.email').value==='')||(document.querySelector('.discription').value==='')){
        alert('Missing Pal Info')
    }else{function SavePal(name,number,email,discription,img){
        this.palName = name
        this.palNumber = number
        this.palEmail = email
        this.palDiscription = discription
        this.palImg = img
        }
    let newPalCons = new SavePal(name,number,email,discription,img)

    if(!localStorage.getItem('myPals')){
        localStorage.setItem('myPals',JSON.stringify(newPalCons))
        }else{
            if(palInfo2.some(e => e.palName === name)){
                alert('Excisting pal')
            }else{
                var popup = document.getElementById("mySavePopup");
                popup.classList.toggle("show");

                palInfo2.push(newPalCons)
                let myPals = [...new Set(palInfo2)]
                localStorage.setItem('myPals',JSON.stringify(myPals))
            }
        }
    }
}
try{
    palInfo2.forEach((pal,i)=>{
        let palOption = document.createElement('option')
        palOption.text = pal.palName
        palOption.value = pal.palName + "&%" + pal.palNumber + "&%" + pal.palEmail + "&%" + pal.palDiscription + "&%" + pal.palImg + "&%" + i
        document.querySelector('.selectPal').appendChild(palOption) 
    })
    document.querySelector('.selectPal').addEventListener('change',changePal)
    function changePal(){
        let palValue = document.querySelector('.selectPal').value
        if(palValue === ''){
            let palArray = ['','','','']
            document.querySelector('.name').value = palArray[0]
            document.querySelector('.phoneNumber').value = palArray[1]
            document.querySelector('.email').value = palArray[2]
            document.querySelector('.discription').value = palArray[3]
            document.querySelector('.img').src = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        }else{
            let palArray = palValue.split("&%")
            document.querySelector('.name').value = palArray[0]
            document.querySelector('.phoneNumber').value = palArray[1]
            document.querySelector('.email').value = palArray[2]
            document.querySelector('.discription').value = palArray[3]
            document.querySelector('.img').src =palArray[4]
        }
    }
}catch(err){
    console.log(err)
}

//Delete Pal
document.querySelector('.selectPal').addEventListener('change',deleteOnChange)
function deleteOnChange(){
    let palId = document.querySelector('.selectPal').value
    palIdSplit = palId.split("&%")

    document.querySelector('.delete').addEventListener('click',deletePal)
    function deletePal(){
        palInfo2.splice(palIdSplit[5],1)
        localStorage.setItem('myPals',JSON.stringify(palInfo2))
        console.log(palInfo2)
    }
}

document.querySelector('.deletePopUp').addEventListener('click',mydeleteFunction)

function mydeleteFunction() {
    if((document.querySelector('.name').value === '')||(document.querySelector('.phoneNumber').value==='')||(document.querySelector('.email').value==='')||(document.querySelector('.discription').value==='')){
        alert('Missing Pal Info')
    }else{
  var popup = document.getElementById("myDeletePopup");
  popup.classList.toggle("show");
}
}
