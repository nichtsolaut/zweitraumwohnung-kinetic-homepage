(function(){
"use strict";
var reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
var clamp=function(v,a,b){return v<a?a:v>b?b:v;};
var lerp=function(a,b,t){return a+(b-a)*t;};
var map=function(v,a,b,c,d){return c+(d-c)*clamp((v-a)/(b-a),0,1);};
var TAU=6.28318530718;

var IMG={
  "panton.png":"https://zweitraumwohnung.com/cdn/shop/files/ChatGPTImage26.Okt.2025_15_59_08.png?v=1761490767&width=900",
  "usm-sideboard.jpg":"https://zweitraumwohnung.com/cdn/shop/files/usm4schubladen_3.ebene.jpg?v=1775586536&width=900",
  "knoll-pollock.jpg":"https://zweitraumwohnung.com/cdn/shop/files/knollpollock.jpg?v=1777285812&width=900",
  "togo-tuerkis.jpg":"https://zweitraumwohnung.com/cdn/shop/files/togoweisshintergrund.jpg?v=1772813926&width=900",
  "fritzhansen-gelb.jpg":"https://zweitraumwohnung.com/cdn/shop/files/fritzhansengelbarmchair.jpg?v=1776274978&width=900",
  "usm-hochregal.jpg":"https://zweitraumwohnung.com/cdn/shop/files/hochregalusm.jpg?v=1775739784&width=900",
  "knoll-tulip-couch.jpg":"https://zweitraumwohnung.com/cdn/shop/files/knolltulip.jpg?v=1777286006&width=900",
  "tulipmarmor.jpg":"https://zweitraumwohnung.com/cdn/shop/files/tulipmarmor.jpg?v=1776273465&width=900",
  "teak-tisch.jpg":"https://zweitraumwohnung.com/cdn/shop/files/teaktischweisshintergrund.jpg?v=1772813837&width=900"
};
function R(f){return IMG[f]||f;}

var EARLY=[
  {img:"panton.png",href:"https://zweitraumwohnung.com/products/panton-chair",x:15,y:43,sz:"clamp(250px,23vw,380px)"},
  {img:"usm-sideboard.jpg",href:"https://zweitraumwohnung.com/products/usm-haller-sideboard-mit-schubladen",x:50,y:25,sz:"clamp(260px,24vw,395px)"},
  {img:"knoll-pollock.jpg",href:"https://zweitraumwohnung.com/products/knoll-pollock-chair-schwarz",x:84,y:57,sz:"clamp(230px,21vw,340px)"},
  {img:"tulipmarmor.jpg",href:"https://zweitraumwohnung.com/products/knoll-tulip-saarinen-esstisch-marmor-weiss",x:31,y:72,sz:"clamp(220px,20vw,330px)"},
  {img:"fritzhansen-gelb.jpg",href:"https://zweitraumwohnung.com/products/fritz-hansen-armchair-gelb-grau",x:70,y:16,sz:"clamp(220px,20vw,330px)"}
];

var L="clamp(285px,27vw,440px)", M="clamp(235px,23vw,360px)";
var BUBBLES=[
  {img:"panton.png",href:"https://zweitraumwohnung.com/products/panton-chair",x:12,sz:L,start:50,rise:210,sp:0.86,amp:5,freq:1.0,ph:0.2,rot:0.45},
  {img:"usm-sideboard.jpg",href:"https://zweitraumwohnung.com/products/usm-haller-sideboard-mit-schubladen",x:50,sz:L,start:38,rise:205,sp:0.82,amp:4,freq:0.9,ph:0.5,rot:0.35},
  {img:"togo-tuerkis.jpg",href:"https://zweitraumwohnung.com/products/togo-einsitzer-turkis",x:84,sz:L,start:52,rise:210,sp:0.84,amp:5,freq:1.0,ph:0.8,rot:0.45},
  {img:"fritzhansen-gelb.jpg",href:"https://zweitraumwohnung.com/products/fritz-hansen-armchair-gelb-grau",x:28,sz:M,start:104,rise:218,sp:0.88,amp:7,freq:1.08,ph:2.0,rot:0.55},
  {img:"knoll-pollock.jpg",href:"https://zweitraumwohnung.com/products/knoll-pollock-chair-schwarz",x:68,sz:M,start:122,rise:220,sp:0.86,amp:6,freq:1.04,ph:1.5,rot:0.50},
  {img:"usm-hochregal.jpg",href:"https://zweitraumwohnung.com/products/usm-haller-hochregal-dunkelblau",x:16,sz:M,start:176,rise:230,sp:0.72,amp:5,freq:0.92,ph:1.0,rot:0.35},
  {img:"knoll-tulip-couch.jpg",href:"https://zweitraumwohnung.com/products/knoll-tulip-couchtisch-weiss",x:54,sz:L,start:194,rise:235,sp:0.74,amp:4,freq:0.88,ph:0.4,rot:0.35},
  {img:"teak-tisch.jpg",href:"https://zweitraumwohnung.com/products/teakholz-tisch-im-stil-der-1960er-jahre",x:82,sz:M,start:168,rise:228,sp:0.82,amp:6,freq:1.04,ph:0.6,rot:0.45}
];

var earlyBubsEl=document.getElementById("earlyBubs");
var earlyEls=[];
EARLY.forEach(function(e){
  var a=document.createElement("a");
  a.className="ebub"; a.href=e.href; a.setAttribute("aria-label","Produkt ansehen");
  a.style.width=e.sz; a.style.height=e.sz; a.style.left=e.x+"%"; a.style.top=e.y+"vh";
  a.innerHTML='<span class="ebub__disc"><img src="'+R(e.img)+'" alt="" decoding="async"></span>';
  earlyBubsEl.appendChild(a);
  earlyEls.push({el:a});
});

var field=document.getElementById("bubbleField");
var bubbleEls=[];
BUBBLES.forEach(function(b){
  var a=document.createElement("a");
  a.className="bubble"; a.href=b.href; a.setAttribute("aria-label","Produkt ansehen");
  a.style.width=b.sz; a.style.height=b.sz; a.style.left="calc("+b.x+"% - ("+b.sz+")/2)";
  a.innerHTML='<span class="bubble__disc"><img src="'+R(b.img)+'" alt="" decoding="async"></span>';
  field.appendChild(a);
  bubbleEls.push({el:a,b:b});
});

var layerEls=[].slice.call(document.querySelectorAll(".iline,.frag")).map(function(el){
  return {el:el,z0:+el.dataset.z0,zr:+el.dataset.zr,d:+el.dataset.d,mx:+el.dataset.mx,my:+el.dataset.my};
});

var mx=0,my=0,tmx=0,tmy=0;
if(!reduce){
  window.addEventListener("mousemove",function(e){
    tmx=(e.clientX/window.innerWidth-0.5)*2;
    tmy=(e.clientY/window.innerHeight-0.5)*2;
  },{passive:true});
}

var intro=document.querySelector(".intro");
var scene=document.getElementById("scene");
var introHint=document.getElementById("introHint");
var bubblesSec=document.querySelector(".bubbles");
var heroImgEl=document.getElementById("heroImg");
function prog(el){return clamp((window.scrollY-el.offsetTop)/(el.offsetHeight-window.innerHeight),0,1);}
var DEPTH=reduce?0.35:1;

function render(){
  mx=lerp(mx,tmx,0.105); my=lerp(my,tmy,0.105);
  var p1=prog(intro);
  var mAtt=1-clamp(map(p1,0.72,1.0,0,1),0,1);
  scene.style.transform="translateY(3vh) rotateX("+(-my*13*mAtt).toFixed(2)+"deg) rotateY("+(mx*17*mAtt).toFixed(2)+"deg)";

  for(var li=0;li<layerEls.length;li++){
    var Ln=layerEls[li];
    var z=(Ln.z0+p1*Ln.zr)*DEPTH;
    var nearFade=clamp(map(z,390,840,1,0),0,1);
    var earlyFade=1-clamp(map(p1,0.73,0.98,0,1),0,1)*0.82;
    var isFrag=Ln.el.classList.contains("frag");
    var fragReveal=isFrag ? map(p1,0.08,0.34,0.16,1) : 1;
    var fragControl=isFrag ? (0.48+Ln.d*0.34) : 1;
    var txm=reduce?0:mx*Ln.mx*mAtt;
    var tym=reduce?0:my*Ln.my*mAtt;
    var rz=reduce?0:mx*Ln.d*1.6*mAtt;
    Ln.el.style.transform="translateZ("+z.toFixed(0)+"px) translateX("+txm.toFixed(1)+"px) translateY("+tym.toFixed(1)+"px) rotateZ("+rz.toFixed(2)+"deg)";
    Ln.el.style.opacity=(nearFade*earlyFade*fragReveal*fragControl).toFixed(3);
    Ln.el.style.filter="blur("+map(z,620,900,0,2.2).toFixed(2)+"px)";
  }

  introHint.style.transform="translateX(-50%) scaleY("+(1-clamp(p1*2.2,0,1)).toFixed(3)+")";
  introHint.style.opacity=(0.5*(1-clamp(p1*3,0,1))).toFixed(3);

  var appear=clamp(map(p1,0.52,0.78,0,1),0,1);
  for(var ei=0;ei<earlyEls.length;ei++){
    var E=earlyEls[ei];
    var sc=lerp(0.22,1,appear);
    E.el.style.opacity=(appear*(1-clamp(map(p1,0.94,1,0,1),0,1)*0.25)).toFixed(3);
    E.el.style.transform="translate(-50%,-50%) translateY("+(-appear*(18+ei*7)).toFixed(1)+"px) scale("+sc.toFixed(3)+")";
  }

  var pb=prog(bubblesSec);
  for(var i=0;i<bubbleEls.length;i++){
    var B=bubbleEls[i],b=B.b;
    var rise=reduce?b.rise*0.38:b.rise;
    var pr=clamp(pb*b.sp,0,1.35);
    var yv=b.start-pr*rise;
    var xx=Math.sin(pb*b.freq*TAU+b.ph)*(reduce?0:b.amp);
    var rr=reduce?0:Math.sin(pb*b.freq+b.ph)*b.rot;
    var oc=clamp(map(yv,118,98,0,1),0,1)*clamp(map(yv,-10,-32,1,0),0,1);
    B.el.style.transform="translate3d("+xx.toFixed(1)+"px,"+yv.toFixed(2)+"vh,0) rotate("+rr.toFixed(2)+"deg)";
    B.el.style.opacity=oc.toFixed(3);
  }

  if(heroImgEl){
    var hSec=heroImgEl.parentElement;
    var rect=hSec.getBoundingClientRect();
    var ps=clamp((window.innerHeight-rect.top)/(window.innerHeight+rect.height),0,1);
    var img=heroImgEl.querySelector("img");
    if(img) img.style.transform="translateY("+lerp(-22,22,ps).toFixed(1)+"px)";
  }
}
window.addEventListener("scroll",render,{passive:true});
window.addEventListener("resize",render);
window.addEventListener("load",render);
function loop(){render();requestAnimationFrame(loop);} 
requestAnimationFrame(loop);
render();
})();
