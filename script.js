const $=s=>document.querySelector(s);
$('#yr').textContent=new Date().getFullYear();
const nav=$('#nav'),menu=$('#menu'),burger=$('#burger');
addEventListener('scroll',()=>nav.classList.toggle('solid',scrollY>40),{passive:true});
burger.onclick=()=>{const o=menu.classList.toggle('open');burger.classList.toggle('open',o);burger.setAttribute('aria-expanded',o)};
menu.querySelectorAll('a').forEach(a=>a.onclick=()=>{menu.classList.remove('open');burger.classList.remove('open')});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%4)*80+'ms';io.observe(el)});
// cursor + tilt
const cur=$('.cursor');
addEventListener('mousemove',e=>{cur.style.opacity=1;cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px'});
document.querySelectorAll('a,button,.chips span').forEach(el=>{el.addEventListener('mouseenter',()=>cur.classList.add('big'));el.addEventListener('mouseleave',()=>cur.classList.remove('big'))});
document.querySelectorAll('.tilt').forEach(c=>{
  c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(800px) rotateY(${x*8}deg) rotateX(${-y*8}deg)`});
  c.addEventListener('mouseleave',()=>c.style.transform='');
});
// contact form -> opens email
$('#form').addEventListener('submit',e=>{
  e.preventDefault();const f=new FormData(e.target);
  const body=`Name: ${f.get('name')}\nPhone: ${f.get('phone')||'-'}\nService: ${f.get('service')}\n\n${f.get('msg')}`;
  location.href=`mailto:edstudios77@gmail.com?subject=${encodeURIComponent('New project inquiry from '+f.get('name'))}&body=${encodeURIComponent(body)}`;
});
