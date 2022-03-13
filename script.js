'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');


//FUNCTION THAT IS CALLED TO OPEN THE MODAL WINDOW
const openModal = function (e) {

  e.preventDefault()

  //WE REMOVE THE  HIDDEN CLASS FROM OVERLAY AND MODAL
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');


};


//FUNCTION THAT IS CALLED TO CLOSE THE MODAL WINDOW
const closeModal = function () {


  //ADD THE HIDDEN CLASS IN MODAL AND OVERLAY
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


//NOW SETTING THE EVENT LISTNER ON BUTTON
btnsOpenModal.forEach(openbutton => {

  //OPENMODEL BUTTONS ARE > 1 SO A FOR LOOP TO ENABLE COMMAND ON ALL BUTTONS
  openbutton.addEventListener('click', openModal);


});


//CLOSE BUTTON ADD EVENT LISTNER
btnCloseModal.addEventListener('click', closeModal);


//WHEN WE CLICK ON OVERLAY IT SHOULD CLOSE
overlay.addEventListener('click', closeModal);


//WHEN WE CLICK ESCAPE KEY IT SHOULD CLOSE
document.addEventListener('keydown', function (e) {

  //IF KEY PRESSED IS ESCAPE AND MODEL DOES NOT CONTAIN HIDDEN THEN ONLU
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }


});



/*=============================================
=            SMOOTH SCROLLING            =
=============================================*/

//selecting button
const section1btn = document.querySelector('.btn--scroll-to');

//selecting section
const section1 = document.querySelector('#section--1');


section1btn.addEventListener('click', function (e){


  e.preventDefault();


  /*----------  OLD WAY OF ADDING SMOOTH SCROLLING  ----------*/
      // //getting scrolling co-ordinates of the section
      // const sec1cords = section1.getBoundingClientRect();

      // //adding scrolling
      // window.scrollTo({
      //   left: sec1cords.left + window.pageXOffset,
      //   top: sec1cords.top + window.pageYOffset,
      //   behavior: 'smooth',
      // })
  /*----------  OLD WAY COMPLETE  ----------*/ 
        
        
  /*----------  NEW WAY  ----------*/

        section1.scrollIntoView({behavior: 'smooth'});

  /*----------  NEW WAY COMPLETE ----------*/

})



/*----------  Adding Scroll to Nav-Bar  ----------*/


//WE ARE ADDING EVENT LISTNER TO THE NAV BAR CONTAINER
document.querySelector('.nav__links').addEventListener('click',function (e){

      e.preventDefault();


      //IF THE EVENT IS GENERTAED BY THE LINK THAT CONTAINS CLASS WHICH IS THE CLASS THAT IS WITH THE ANHOR THEN 
      //WE INITITIATE THE CLICK
      if(e.target.classList.contains('nav__link')){


        //WE STORE THE HREF OF THAT ANCHOR IN ID
        const id =  e.target.getAttribute('href');


        //WE ADD SCROLL TO THE ID
        document.querySelector(id).scrollIntoView({behavior: 'smooth'});
      }
});

/*=====  End of SMOOTH SCROLLING  ======*/



/*=============================================
=            TABBED SECTION IN THE PAGE            =
=============================================*/


document.querySelector('.operations__tab-container').addEventListener('click', function(e){

  //GET THE NEAREST ELEMENT WHICH HAS CLASS .operation__tab
  const clicked = e.target.closest('.operations__tab');


  //IF CLICKED DOES NOT FIND ANY CLASS LIKE THAT AND IS NULL THEN RETURN
  if(clicked===null){return;}


  //NOW WE REMOVE THE ACTIVE CLASS FROM ALL THE TABS
  document.querySelectorAll('.operations__tab').forEach(f => {
    f.classList.remove('operations__tab--active');
  });

  //ADD THE ACTIVE CLASS TO CLICKED ELEMENT
  clicked.classList.add('operations__tab--active');


  //REMOVE ACTIVE CLASS FROM ALL THE CONTENTS
  document.querySelectorAll('.operations__content').forEach(c => {
    c.classList.remove('operations__content--active');
  });;


  //ADD THE ACTIVE CLASS IN THE CLICKED CONTENT TAB THEN WE HAVE ACCESS THROUGH DATASET
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');


});


/*=====  End of TABBED SECTION IN THE PAGE  ======*/



/*=============================================
=            NAV-BAR FADEOUT            =
=============================================*/

function fade(e, opac){

  //CHECKING IF THE TARGET ELEMENT HAS THE CLASS .nav--link
  if(e.target.classList.contains('nav__link')){

    
    //STORING ALL SIBLINGS OF THE TARGET ELEMENT IN A ITRATOR WHICH HAVE CLASS .nav__link
   const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');


   //SETTING OPACITY OF ALL THE ELEMENTS TO CERTAIN VALUE EXCEPT THE TARGET VALUE ELEMENT
   siblings.forEach(navlink => {

     if(navlink !== e.target){

      //SETTING OPACITY
       navlink.style.opacity = opac;

     }
   });


   //CHANGING THE OPACITY OF LOGO ON MOUSEOVER/MOUSEOUT
   document.querySelector('img').style.opacity = opac;

  }
}

//CALLING THE FUNTION ON MOUSEOVER WITH 0.5 OPACITY
document.querySelector('.nav').addEventListener('mouseover', (e)=> fade(e, 0.5));


//CALLING THE FUNCTION ON MOUSEOUT WITH 1 OPACITY
document.querySelector('.nav').addEventListener('mouseout', (e) => fade(e,1));

/*=====  End of NAV-BAR FADEOUT  ======*/



/*=============================================
=            STICKY NAVIGATION BAR            =
=============================================*/

const header = document.querySelector('.header');

let nav_height = document.querySelector('.nav').getBoundingClientRect().height;
console.log(nav_height);

function obscallback(enteries){

  if(!enteries[0].isIntersecting){
    document.querySelector('.nav').classList.add('sticky');
  }else{
    document.querySelector('.nav').classList.remove('sticky');
  }
}

let obsoptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${nav_height}px`,
}



const headerObserver = new IntersectionObserver(obscallback, obsoptions);


headerObserver.observe(header);

/*=====  End of STICKY NAVIGATION BAR  ======*/



/*=============================================
=            REVEAL SECTION ON SCROLL            =
=============================================*/

    const allsections = document.querySelectorAll('.section');
    
    function secCallback(enteries){


      if(!enteries[0].isIntersecting){return};

      enteries[0].target.classList.remove('section--hidden');

      sectionobserver.unobserve(enteries[0].target);
    }


    let secOptions = {
      root: null,
      threshold: 0.15,
    }

    const sectionobserver = new IntersectionObserver(secCallback, secOptions);


    allsections.forEach(el => {
      sectionobserver.observe(el);
      el.classList.add('section--hidden');
    });

/*=====  End of REVEAL SECTION ON SCROLL  ======*/



/*=============================================
=            IMAGES LAZY LOADING            =
=============================================*/

const lazyimages = document.querySelectorAll('img[data-src');

function imgCallback(enteries){
    if(!enteries[0].isIntersecting) return;

    enteries[0].target.src = enteries[0].target.dataset.src;

    enteries[0].target.addEventListener(('load'), function(){
      enteries[0].target.classList.remove('lazy-img');
    })
}

let imgOptions = {
  root: null,
  threshold: 0,
  rootMargin: '90px',
}

const imageObserver = new IntersectionObserver(imgCallback, imgOptions);

lazyimages.forEach(el => imageObserver.observe(el));

/*=====  End of IMAGES LAZY LOADING  ======*/



/*=============================================
=            SLIDER SECTION            =
=============================================*/


//SELECTING THE PARENT CLASS SLIDER
const silder = document.querySelector('.slider');


//SELECTING ALL THE ELEMENTS WHICH CONTAIN CLASS SLIDE
const slides = document.querySelectorAll('.slide');


//FUNCTION TO TRANSLATE THE SLIDE
function transFunc(cs){

  for(let i=0;i<slides.length;i++){

    slides[i].style.transform = `translateX(${100*i - cs*100}%)`;//0, 100, 200

  }

}


//TRANSLATEING ALL ELEMENTS ACCORING TO THE ORDER  AT THE NORMAL STATE
transFunc(0);


//DEFINING VARIABLE TO HOLD CURRENT SLIDE
let currentSlide = 0;


//NEXT SLIDE FUNTION
function nextSlide(){

  if(currentSlide === slides.length-1){

    currentSlide = 0;

  }
  
  else{

    currentSlide++;

  }

  transFunc(currentSlide);

}


//PREVIOUS SLIDE FUNCTION
function previousSlide(){

  if(currentSlide === 0){

    currentSlide = slides.length -1;

  }
  
  else{

    currentSlide--;

  }

  transFunc(currentSlide);

}


//ADDING EVENT LISTNER TO RIGHT BUTTON
document.querySelector('.slider__btn--right').addEventListener('click', nextSlide);


//ADDING EVENT LISTNER TO LEFT BUTTON
document.querySelector('.slider__btn--left').addEventListener('click', previousSlide);


//ADDING KEYBOARD BUTTON TO LEFT AND RIGHT KEYS TO SLIDE
document.addEventListener('keydown', (e) => { e.key === 'ArrowLeft' && previousSlide(); e.key === 'ArrowRight' && nextSlide();});






/*=====  End of SLIDER SECTION  ======*/






