let xPos = 0;

gsap.timeline()
    .set('.ring', { rotationY:180, cursor:'grab' }) //set initial rotationY so the parallax jump happens off screen
    .set('.img',  { // apply transform rotations to each image
      rotateY: (i)=> i*-36,
      transformOrigin: '50% 50% 500px',
      z: -500,
      backgroundImage: (i) => `url(${getImageUrl(i)})`,
      backgroundPosition:(i)=>getBgPos(i),
      backfaceVisibility:'hidden'
    })    
    .from('.img', {
      duration:1.5,
      y:200,
      opacity:0,
      stagger:0.1,
      ease:'expo'
    })
    .add(()=>{
      $('.img').on('mouseenter', (e)=>{
        let current = e.currentTarget;
        gsap.to('.img', {opacity:(i,t)=>(t==current)? 1:0.5, ease:'power3'})
      })
      $('.img').on('mouseleave', (e)=>{
        gsap.to('.img', {opacity:1, ease:'power2.inOut'})
      })
    }, '-=0.5')

$(window).on('mousedown touchstart', dragStart);
$(window).on('mouseup touchend', dragEnd);
      
function getImageUrl(i) {
  const imageUrls = [
    'https://i.pinimg.com/originals/b4/36/f5/b436f55b7cc0a342798983d6929d644e.webp',
    'https://play-lh.googleusercontent.com/kzYCnedLMTrrgEBPqx8LG1RHgBQA3bK1TucvXotRU_1Q8skBfXJKUTNKlsOhNi8V_kTX',
    'https://i.pinimg.com/736x/1d/c5/36/1dc5360bd3f4252f20394e12a8c5ad4c.jpg',
    'https://i.pinimg.com/originals/a5/be/71/a5be710f5a2200f4083fb68c24d6aafe.webp',
    'https://www.nawpic.com/media/2020/andrew-tate-nawpic-10-e1663618720173.jpg',
    // Add more image URLs here
  ];
  return imageUrls[i % imageUrls.length];
}

function dragStart(e){ 
  if (e.touches) e.clientX = e.touches[0].clientX;
  xPos = Math.round(e.clientX);
  gsap.set('.ring', {cursor:'grabbing'})
  $(window).on('mousemove touchmove', drag);
}


function drag(e){
  if (e.touches) e.clientX = e.touches[0].clientX;    

  gsap.to('.ring', {
    rotationY: '-=' +( (Math.round(e.clientX)-xPos)%360 ),
    onUpdate:()=>{ gsap.set('.img', { backgroundPosition:(i)=>getBgPos(i) }) }
  });
  
  xPos = Math.round(e.clientX);
}


function dragEnd(e){
  $(window).off('mousemove touchmove', drag);
  gsap.set('.ring', {cursor:'grab'});
}


function getBgPos(i){ //returns the background-position string to create parallax movement in each image
  return ( 100-gsap.utils.wrap(0,360,gsap.getProperty('.ring', 'rotationY')-180-i*36)/360*500 )+'px 0px';
}