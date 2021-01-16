var backdrop = document.querySelector('.backdrop');
var dropdown = document.querySelector('.dropdown-menu');

var user = document.querySelector('.nav_btn');
if(user)
{
  user.addEventListener("click",function(){
    if(dropdown.style.display=='block')
    {
      dropdown.style.display='none';
      backdrop.style.display='none';
      user.classList.remove('active');
    }
    else{
    dropdown.style.display='block';
    backdrop.style.display='block';
    user.classList.add('active');
    }

})

}
var mobileNav = document.querySelector('.mobile-nav__sidebar');
var mobileNavButton = document.querySelector('.mobile-nav__button');



backdrop.addEventListener("click",function(){
    dropdown.style.display='none';
    backdrop.style.display='none';
    if(mobileNav)
    {
     mobileNav.style.display='none';
    }
    user.classList.remove('active');

})

var mobileNav = document.querySelector('.mobile-nav__sidebar');
var mobileNavButton = document.querySelector('.mobile-nav__button');

if(mobileNavButton){

  mobileNavButton.addEventListener('click',function(){
    if( mobileNav.style.display=='flex'){
      backdrop.style.display='none';
      mobileNav.style.display='none'
    }
    else{
      backdrop.style.display='block';
      mobileNav.style.display='flex';
    }
    
  })
}