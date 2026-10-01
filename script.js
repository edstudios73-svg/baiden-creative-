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

// horizontal scrollers: arrows + drag
document.querySelectorAll('[data-scroll]').forEach(sc=>{
  const arrows=sc.previousElementSibling&&sc.previousElementSibling.querySelector('[data-arrows]');
  if(arrows){const [b1,b2]=arrows.querySelectorAll('button');const step=()=>sc.firstElementChild.getBoundingClientRect().width+20;
    b1.onclick=()=>sc.scrollBy({left:-step(),behavior:'smooth'});b2.onclick=()=>sc.scrollBy({left:step(),behavior:'smooth'});}
  let down=false,sx=0,sl=0,moved=false;
  sc.addEventListener('mousedown',e=>{down=true;moved=false;sx=e.pageX;sl=sc.scrollLeft});
  addEventListener('mouseup',()=>{down=false;sc.classList.remove('drag')});
  sc.addEventListener('mousemove',e=>{if(!down)return;const d=e.pageX-sx;if(Math.abs(d)>5){moved=true;sc.classList.add('drag')}sc.scrollLeft=sl-d});
  sc.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
});

/* ===== v2 interactions ===== */
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
// scroll progress + nav active
const bar=document.querySelector('.progress');
addEventListener('scroll',()=>{const h=document.documentElement;bar.style.transform=`scaleX(${scrollY/(h.scrollHeight-innerHeight||1)})`},{passive:true});
const links=[...document.querySelectorAll('#menu a[href^="#"]:not(.btn)')];
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
links.forEach(a=>{const s=document.querySelector(a.getAttribute('href'));s&&so.observe(s)});
// headline word reveal
document.querySelectorAll('.hero h1 span').forEach((sp,k)=>{
  const words=sp.textContent.trim().split(/\s+/);
  sp.innerHTML=words.map((w,i)=>`<span class="w"><i style="--i:${k*3+i}">${w}</i></span>`).join(' ');
});
// spotlight + magnetic
document.querySelectorAll('.card,.pcard').forEach(c=>c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')}));
if(!reduce&&matchMedia('(hover:hover)').matches)document.querySelectorAll('.btn').forEach(b=>{b.classList.add('mag');
  b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.2}px,${(e.clientY-r.top-r.height/2)*.3}px)`});
  b.addEventListener('mouseleave',()=>b.style.transform='')});
// interactive network canvas
(function(){
  const cv=document.getElementById('net');if(!cv||reduce)return;
  const ctx=cv.getContext('2d');let W,H,pts=[],mouse={x:-999,y:-999},run=true;
  const dpr=Math.min(devicePixelRatio||1,2);
  function size(){W=cv.clientWidth;H=cv.clientHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    const n=Math.min(90,Math.floor(W*H/16000));pts=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35}))}
  size();addEventListener('resize',size);
  cv.parentElement.addEventListener('mousemove',e=>{const r=cv.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top});
  cv.parentElement.addEventListener('mouseleave',()=>mouse.x=mouse.y=-999);
  new IntersectionObserver(([e])=>{run=e.isIntersecting;if(run)loop()}).observe(cv);
  function loop(){if(!run)return;ctx.clearRect(0,0,W,H);
    for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
      const dx=p.x-mouse.x,dy=p.y-mouse.y,d=Math.hypot(dx,dy);if(d<140){p.x+=dx/d*1.2;p.y+=dy/d*1.2}
      ctx.fillStyle='rgba(255,255,255,.7)';ctx.beginPath();ctx.arc(p.x,p.y,1.4,0,6.3);ctx.fill()}
    for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);
      if(d<120){ctx.strokeStyle=`rgba(255,255,255,${.22*(1-d/120)})`;ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}
    if(mouse.x>0)for(const p of pts){const d=Math.hypot(p.x-mouse.x,p.y-mouse.y);if(d<170){ctx.strokeStyle=`rgba(255,255,255,${.5*(1-d/170)})`;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(mouse.x,mouse.y);ctx.stroke()}}
    requestAnimationFrame(loop)}
  loop();
})();
