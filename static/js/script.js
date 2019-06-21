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
  const deleteBtns = document.querySelectorAll('a[data-method="delete"]');
  if(deleteBtns){
    deleteBtns.addEventListener('click', (e)=>{
      console.log(e.target.dataset.id)
    })
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
