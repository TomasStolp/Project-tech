/*jshint esversion: 6 */
import {multiply} from './plus.js';

console.log(multiply(3, 3));






window.onload = function(){

  if(document.querySelector('body').getAttribute('data-page-type') === 'add-bands'){
    searchBands();
  }

  function searchBands(){
    const searchField = document.querySelector('input[data-field="search"]');

    var bands = document.querySelectorAll('input[data-name="band"]');
    
    //bands[0].style.display ="none"
    
    searchField.addEventListener("keyup", (e)=>{
      setTimeout(()=>{
        e.preventDefault();
        
        let value = searchField.value;
        console.log(value)
        
        bands.forEach(function(elem){
            elem.parentNode.classList.add("hide");
        })
        
        let regex = new RegExp(value, "g");
        let result = Array.from(bands).filter(function(elem){
            return elem.getAttribute("name").match(regex);
        })
        result.forEach(function(elem){
            console.log(elem)
            elem.parentNode.classList.remove("hide");
        })
      }, 500)
    })
  }

  // Removing bands

  // Checks if there are delete buttons with the data-method attribute = delete
  if(document.querySelectorAll('button[data-method="delete"]')){
  
    // If so, select all those nodeelements and receive a nodelist binded to nodelist.
    const nodelist = document.querySelectorAll('button[data-method="delete"]');

    /* I want to call the forEach method on the nodelist. You can do that nowadays but to be rather sure
      for browser support, I'm first gonna convert the nodelist to an instance of an array.
    */
    const deleteBtns = Array.from(nodelist);

    /* Then I apply a foreach method on the array so I can apply the addEventListener to each of the items
      inside the array. Once you click on one of the elements, the event target (so where you basically click on) it's data-attribute 
      name is gonna be logged. I render the Object unique id there. So I can use this to delete the instance of that object from the user 
      that's currently logged in.
    */
    deleteBtns.forEach((elem)=>{
      elem.addEventListener('click', (event)=>{
        console.log(event.target.dataset.id);
        let confirmPopup = document.querySelector('.confirm-delete');
        let confirmText = document.querySelector('.confirm-delete p');
        let cancelBtn = document.querySelector('button[data-name="cancel"]');
        let deleteConfirm = document.querySelector('button[data-name="delete"]');

        confirmPopup.classList.add('show');

        cancelBtn.addEventListener('click', (event)=>{
          console.log(`canceled`)
          confirmPopup.classList.remove('show');
        })

        confirmText.textContent = `Are you sure you want to delete ${event.target.dataset.name}?`;

        let band = event.target.dataset.id;

        // delete(event.target.dataset.id)
        deleteConfirm.addEventListener('click', ()=>{
          deleting(band);
        })
      })
    })


    function deleting(band){
      let confirmPopup = document.querySelector('.confirm-delete');

        console.log(`deleting ${band}`)
        confirmPopup.classList.remove('show');

        // Gebruikt uit example
        fetch('/top-twenty/' + band, {method: 'delete'})
        .then(onresponse)
        .then(onload, onfail)

        function onresponse(res) {
          return res.json()
        }
      
        function onload() {
          window.location = '/top-twenty'
        }
      
        function onfail() {
          throw new Error('Could not delete!')
        }

    }

  }



}












//   let concertSubmit = document.querySelector('#concertSubmit');
//
//   concertSubmit.addEventListener('click', validateConcert);
//
//   function validateConcert(event){
//     event.preventDefault();
//     let title = document.querySelector('input[name="title"]').value;
//     let description = document.querySelector('textarea[name="description"]').value;
//     //console.log(`${title} ${description}`);
//
// // if title and description evaluates to true - so type cohersion
//     if(title && description){
//       console.log('opgevuld');
//       addConcert(title, description);
//     }
//   }
//
//   function addConcert(title, description){
//     return new concert(title, description);
//   }
//
//   class concert{
//     constructor(title){
//       this.title = title;
//     }
//   }

// import {multiply} from './plus.js';
//
//
// console.log(multiply(2,3));
