export const scrollFunction = (scrollHeight:number) =>{
  const screenHeight = window.innerHeight as number
  window.addEventListener('scroll', e=>{
    const scrollY = window.scrollY as number
    if (scrollY >= screenHeight * .3 && scrollY < screenHeight * .6){
      document.body.classList.add('show-images')
      document.body.classList.remove('show-screen-white')
    }else if (scrollY >= screenHeight * .6){
      document.body.classList.add('show-screen-white')
    }else{
      document.body.classList.remove('show-images')
    }
  })
}
