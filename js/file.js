//check color theme 

let mainColor = localStorage.getItem('main-color'),
    clr = document.querySelectorAll('.color-piker .color-list li');//color array

if(mainColor){//in case there is colore stored before

document.documentElement.style.setProperty('--main-color', mainColor)

clr.forEach(nn=>{ //remove active class from all colors
    nn.classList.remove('active')

    if(nn.getAttribute('data-color')  === mainColor){
        nn.classList.add('active')
    }
    }
)
}


// background changes randomly

/*page bk*/

var changeSt; // variable that control random change

var bk = document.getElementById('bk'),
    imgArr = ['imgs/0.jpg','imgs/1.jpg','imgs/2.jpg','imgs/3.jpg', 'imgs/4.jpg'],
             decBack = document.querySelectorAll('.random-background span'); //control botton
    /* background images */
     change = function(){ /*change func*/

        if(changeSt){
            bkIntrv = setInterval(function(){
            var randNo = Math.random(), /* random number creation */
                bkRand = Math.floor(randNo * imgArr.length);
                
                bk.style.backgroundImage = "url(" +imgArr[bkRand]+ ")"
            }, 5000);
        }
    };
    if (localStorage.getItem('change') === 'yes' || localStorage.getItem('change') === null){
        changeSt = true
        change();
    } else if (localStorage.getItem('change') === 'no'){
        decBack.forEach(spn => {
            spn.classList.remove('active');
        });
        decBack[1].classList.add('active');
    } 

    //------------------------
    //open setting menu
   
    var opn = function(){
        //open setting options
        document.getElementById('setn').classList.toggle('open');
        // spen icon
        document.getElementById('sign').classList.toggle('fa-spin');
    }

    // option setting

        //1 switch color         
    clr.forEach(li =>{//clr is cashed up line 8
         //loop and add event listner
        li.addEventListener('click', function(){
            document.documentElement.style.setProperty('--main-color', li.getAttribute('data-color'))
            clr.forEach(nn=>{
                nn.classList.remove('active')
            })
            li.classList.add('active')

    //save in local storage
            //color theme
            localStorage.setItem('main-color', li.getAttribute('data-color'))
            
    })
})

            //2 background control
         decBack.forEach(sp => {//add listner by looping
                    sp.addEventListener("click", function(){
                        if(this.getAttribute('control') === "no"){
                            clearInterval(bkIntrv);
                            changeSt = false;
                            
                            decBack.forEach(spp => {
                                spp.classList.remove('active');
                                this.classList.add('active');
                            localStorage.setItem('change', 'no');
                            })
                        
                        }
                        // in case yes
                        else if(this.getAttribute('control') === "yes"){
                            changeSt = true;
                            change()
                            decBack.forEach(spp => {
                                spp.classList.remove('active');
                                this.classList.add('active');
                            localStorage.setItem('change', 'yes');
                            })
                        
                        }

                    })
          })

          //3 show bullets
          let bulletSelct = document.querySelectorAll('.show-bullet span');
          bulletSelct.forEach(bul=>{
              bul.addEventListener( 'click',(e)=>{

            if ( e.target.getAttribute('control') === 'hide'){
              document.querySelectorAll('.navi-bullet').forEach(bulli=>{
                  bulli.style.display = 'none'

                  bulletSelct.forEach(bul=>{
                      bul.classList.remove('active')
                  })
                  e.target.classList.add('active')
                  
              })
            } else{

            document.querySelectorAll('.navi-bullet').forEach(bulli =>{
                bulli.style.display = 'block';
                bulletSelct.forEach(bul=>{
                    bul.classList.remove('active')
                })
                e.target.classList.add('active')
            })



            }

              } )
          })

    // progress bar Animation

    let skll = document.querySelectorAll('.skills'),
        windowH = this.innerHeight,
        skllH = skll[0].offsetHeight,
        skillOff = skll[0].offsetTop,

        scrllY = window.pageYOffset;
        
    var kok = document.querySelectorAll('.skill-box .skill-bar span')

    document.onscroll = function(){

    let scrllY   = window.pageYOffset,
        skll     = document.querySelectorAll('.skills'),
        skllOff =  skll[0].offsetTop,
        skllH    = skll[0].offsetHeight,
        windowH  = window.innerHeight;

        if(scrllY > (skillOff - windowH) ) {
             kok.forEach(lol =>{
                lol.style.width = lol.getAttribute('progress-data') 
            })
        }else if(scrllY < (skillOff - windowH)){
            kok.forEach(lol =>{
                lol.style.width = '0'
            })
            
        }
    }

// gallery 

    imgC = document.querySelectorAll('.gallery-box img')
    imgC.forEach(im => {
        im.addEventListener('click', function(){
            // creat popUp overlay
            let popupOver = document.createElement('div');
            //add class 
            popupOver.className = "popup-overlay"
            // append to body
            document.body.appendChild(popupOver);

            // create popup box
            let popupBox = document.createElement('div');
            // add class
                popupBox.className = "popup-box";
            // append to body
            document.body.appendChild(popupBox);

            //creat comment 
            let popupComment = document.createElement('h4'),
            popupCommentText = document.createTextNode(im.alt );
            //add class
            popupComment.className = 'popup-comment';
            popupComment.appendChild(popupCommentText);
            //append comment to popupbox
            popupBox.appendChild(popupComment);

            // create img
            popupImg = document.createElement('img');
            popupImg.src = im.src;
            // append img to overlay box
            popupBox.appendChild(popupImg)


            // close span
            let popupClose = document.createElement('span'),
                clCont = document.createTextNode('X');
                popupClose.appendChild(clCont);
            // add class
            popupClose.className = "popup-close";
            popupOver.appendChild(popupClose);
            //add function 
            popupClose.addEventListener('click', function(){
                document.body.removeChild(popupOver);
                document.body.removeChild(popupBox);

            })
            
        })
        // im.addEventListener('dblclick', function(){
        //     console.log('2')
        // })
    })

    //bullets select
    let bullet = document.querySelectorAll('.navi-bullet');
     let lnks = document.querySelectorAll('.links');
     let scrollInto = function(elmnts){
        elmnts.forEach(elmnt => {
            elmnt.addEventListener('click', (e)=>{
                 e.preventDefault();
                 document.querySelector('.' + e.target.getAttribute('data-custom')).scrollIntoView({
                     behavior:'smooth'
                    })
                    
                })
            })           
        }
        scrollInto(lnks);
        scrollInto(bullet);

//    reset logic
    document.querySelector('.reset button').onclick = function(){
        localStorage.removeItem('change');
        localStorage.removeItem('main-color');
        window.location.reload();
    }

// toggle menu 
    var toggl = document.querySelector('.toggle-menu'),
        menuu = document.querySelector('.header-area .options');


    toggl.onclick = function(){ //add function to toggle botton
        if(toggl.classList.contains('toggle-menu')){ //only if botton
            this.classList.toggle('square')
            
            if(!menuu.classList.contains('open')){ // if the menue not open
               
                menuu.classList.toggle('open')
                } else{ // if menu open we close
                    menuu.classList.remove('open')
                }

            }
        }    
