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
  sp.innerHTML=words.map((w,i)=>`<span class="w"><i style="--i:${k*3+i}">${[...w].map(c=>`<span class="ch">${c}</span>`).join('')}</i></span>`).join(' ');
});
// spotlight + magnetic
document.querySelectorAll('.card,.pcard').forEach(c=>c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')}));
if(!reduce&&matchMedia('(hover:hover)').matches)document.querySelectorAll('.btn').forEach(b=>{b.classList.add('mag');
  b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.2}px,${(e.clientY-r.top-r.height/2)*.3}px)`});
  b.addEventListener('mouseleave',()=>b.style.transform='')});
// hero: parallax glow + orbit
const hero=document.querySelector('.hero');
hero.addEventListener('mousemove',e=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--gx',e.clientX-r.left+'px');hero.style.setProperty('--gy',e.clientY-r.top+'px');
  hero.style.setProperty('--px',((e.clientX-r.left)/r.width-.5).toFixed(3));hero.style.setProperty('--py',((e.clientY-r.top)/r.height-.5).toFixed(3))});
// rotating words
(function(){const el=document.querySelector('.swap');if(!el||reduce)return;const w=el.dataset.words.split(',');let i=0;
  setInterval(()=>{el.classList.add('out');setTimeout(()=>{i=(i+1)%w.length;el.textContent=w[i];el.classList.remove('out')},250)},2200)})();
// interactive network canvas: signals, click bursts, cursor attraction
(function(){
  const cv=document.getElementById('net');if(!cv||reduce)return;
  const ctx=cv.getContext('2d');let W,H,pts=[],sig=[],rip=[],mouse={x:-999,y:-999},run=true,t=0;
  const dpr=Math.min(devicePixelRatio||1,2),LINK=130;
  function size(){W=cv.clientWidth;H=cv.clientHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    const n=Math.min(110,Math.floor(W*H/12000));pts=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*1.4+1,ph:Math.random()*6.3}))}
  size();addEventListener('resize',size);
  hero.addEventListener('mousemove',e=>{const r=cv.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top});
  hero.addEventListener('mouseleave',()=>mouse.x=mouse.y=-999);
  hero.addEventListener('click',e=>{if(e.target.closest('a,button'))return;const r=cv.getBoundingClientRect();rip.push({x:e.clientX-r.left,y:e.clientY-r.top,r:0})});
  new IntersectionObserver(([e])=>{run=e.isIntersecting;if(run)loop()}).observe(cv);
  function loop(){if(!run)return;t+=.02;ctx.clearRect(0,0,W,H);
    for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
      const dx=p.x-mouse.x,dy=p.y-mouse.y,d=Math.hypot(dx,dy);if(d<160&&d>0){p.x+=dx/d*1.6;p.y+=dy/d*1.6}
      for(const r of rip){const rd=Math.hypot(p.x-r.x,p.y-r.y);if(Math.abs(rd-r.r)<24&&rd>0){p.x+=(p.x-r.x)/rd*2.5;p.y+=(p.y-r.y)/rd*2.5}}
      const a=.45+.35*Math.sin(t*2+p.ph);ctx.fillStyle=`rgba(255,255,255,${a})`;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.3);ctx.fill()}
    const edges=[];
    for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);
      if(d<LINK){edges.push([a,b]);ctx.strokeStyle=`rgba(255,255,255,${.26*(1-d/LINK)})`;ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}
    if(edges.length&&sig.length<14&&Math.random()<.12)sig.push({e:edges[Math.random()*edges.length|0],k:0});
    sig=sig.filter(s=>{s.k+=.03;const[a,b]=s.e,x=a.x+(b.x-a.x)*s.k,y=a.y+(b.y-a.y)*s.k;
      const g=ctx.createRadialGradient(x,y,0,x,y,10);g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,10,0,6.3);ctx.fill();return s.k<1});
    if(mouse.x>0)for(const p of pts){const d=Math.hypot(p.x-mouse.x,p.y-mouse.y);if(d<190){ctx.strokeStyle=`rgba(255,255,255,${.55*(1-d/190)})`;ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(mouse.x,mouse.y);ctx.stroke()}}
    rip=rip.filter(r=>{r.r+=5;ctx.strokeStyle=`rgba(255,255,255,${Math.max(0,.5-r.r/600)})`;ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(r.x,r.y,r.r,0,6.3);ctx.stroke();return r.r<600});
    requestAnimationFrame(loop)}
  loop();
})();

// scroll cue + edge fade for the hero strip
(function(){const sc=document.querySelector('.disc .hscroll'),cue=document.querySelector('.cue');if(!sc)return;
  const upd=()=>{const max=sc.scrollWidth-sc.clientWidth,p=max>0?sc.scrollLeft/max:1;
    cue.style.setProperty('--p',(.33+.67*p).toFixed(3));sc.classList.toggle('at-end',p>.97);
    if(sc.scrollLeft>40)cue.querySelector('.txt').firstChild.textContent=p>.97?'That\u2019s all three ':'Keep going '};
  sc.addEventListener('scroll',upd,{passive:true});upd();addEventListener('resize',upd)})();
