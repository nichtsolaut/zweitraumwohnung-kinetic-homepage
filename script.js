(function(){
  "use strict";
  var reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
  var mobile=matchMedia("(max-width:760px)").matches;
  var clamp=function(v,a,b){return v<a?a:v>b?b:v;};
  var lerp=function(a,b,t){return a+(b-a)*t;};
  var map=function(v,a,b,c,d){return c+(d-c)*clamp((v-a)/(b-a),0,1);};
  var TAU=6.28318;

  /* ---------- product bubbles (curated lanes, full furniture shots) ---------- */
  var BASE="../../assets/products/";
  function R(f){ return (window.__resources && window.__resources[f]) || (BASE+f); }
  var L="clamp(190px,21vw,340px)", M="clamp(150px,16vw,250px)";
  // x = lane %, sz, start/rise in vh, sp speed, amp px, freq, ph phase, rot deg, m = mobile hide
  var BUBBLES=[
    {img:"panton.png",           href:"/products/panton-chair",     x:12, sz:L, start:60,  rise:250, sp:0.72, amp:10, freq:1.3, ph:0.2, rot:2.0, m:0},
    {img:"tulip-marmor.jpg",     href:"/products/tulip-esstisch",   x:30, sz:M, start:95,  rise:255, sp:0.95, amp:18, freq:1.8, ph:1.0, rot:2.0, m:1},
    {img:"usm-sideboard.jpg",    href:"/products/usm-sideboard",    x:50, sz:L, start:45,  rise:245, sp:0.66, amp:8,  freq:1.1, ph:0.5, rot:1.5, m:0},
    {img:"knoll-pollock.jpg",    href:"/products/knoll-pollock",    x:70, sz:M, start:110, rise:255, sp:0.90, amp:16, freq:1.7, ph:2.0, rot:2.0, m:0},
    {img:"togo-tuerkis.jpg",     href:"/products/togo-einsitzer",   x:88, sz:L, start:70,  rise:250, sp:0.74, amp:10, freq:1.4, ph:0.8, rot:2.0, m:1},
    {img:"fritzhansen-gelb.jpg", href:"/products/fritz-hansen",     x:18, sz:M, start:150, rise:255, sp:0.98, amp:20, freq:1.9, ph:2.4, rot:2.5, m:0},
    {img:"knollmr.jpg",          href:"/products/knoll-mr-tisch",   x:40, sz:M, start:175, rise:250, sp:0.92, amp:18, freq:1.8, ph:0.7, rot:2.0, m:1},
    {img:"usm-hochregal.jpg",    href:"/products/usm-hochregal",    x:62, sz:L, start:200, rise:300, sp:0.64, amp:8,  freq:1.2, ph:1.6, rot:1.5, m:0},
    {img:"teak-tisch.jpg",       href:"/products/teak-tisch",       x:82, sz:M, start:165, rise:255, sp:1.00, amp:20, freq:2.0, ph:0.3, rot:2.5, m:1},
    {img:"gavina-leder.jpg",     href:"/products/gavina-leder",     x:30, sz:M, start:235, rise:250, sp:0.94, amp:18, freq:1.7, ph:1.3, rot:2.0, m:0},
    {img:"knoll-tulip-couch.jpg",href:"/products/tulip-couchtisch", x:55, sz:L, start:255, rise:300, sp:0.68, amp:8,  freq:1.3, ph:0.9, rot:1.5, m:0}
  ];

  var field=document.getElementById("bubbleField");
  var bubbleEls=[];
  BUBBLES.forEach(function(b){
    var a=document.createElement("a");
    a.className="bubble";a.href=b.href;
    if(b.m) a.setAttribute("data-m","hide");
    a.style.width=b.sz;a.style.height=b.sz;
    a.style.left="calc("+b.x+"% - ("+b.sz+")/2)";
    a.innerHTML='<span class="bubble__disc"><img src="'+R(b.img)+'" alt="" decoding="async"></span>';
    field.appendChild(a);
    bubbleEls.push({el:a,b:b});
  });

  /* ---------- intro type / planes ---------- */
  var lineEls=[].slice.call(document.querySelectorAll(".iline,.plane")).map(function(el){
    return {el:el,z0:+el.dataset.z0,zr:+el.dataset.zr};
  });
  var DEPTH=reduce?0.4:1;

  /* ---------- mouse parallax ---------- */
  var mx=0,my=0,tmx=0,tmy=0;
  if(!reduce && !mobile){
    window.addEventListener("mousemove",function(e){
      tmx=(e.clientX/innerWidth-0.5)*2;
      tmy=(e.clientY/innerHeight-0.5)*2;
    },{passive:true});
  }

  /* ---------- refs ---------- */
  var intro=document.querySelector(".intro");
  var scene=document.getElementById("scene");
  var introCap=document.getElementById("introCap");
  var introHint=document.getElementById("introHint");
  var bubbles=document.querySelector(".bubbles");
  var about=document.querySelector(".about");
  var aboutInner=document.getElementById("aboutInner");
  var shop=document.querySelector(".shop");
  var shopMedia=document.getElementById("shopMedia");

  function prog(el){
    var vh=innerHeight;
    return clamp((window.scrollY-el.offsetTop)/(el.offsetHeight-vh),0,1);
  }

  function render(){
    /* ---- 1 · spatial type tunnel: fly THROUGH the words ---- */
    mx=lerp(mx,tmx,0.08);my=lerp(my,tmy,0.08);
    var p1=prog(intro);
    var att=1-clamp(map(p1,0,0.5,0,1),0,1);            // mouse parallax fades as we dive in
    scene.style.transform="rotateX("+(-my*5*att).toFixed(2)+"deg) rotateY("+(mx*7*att).toFixed(2)+"deg)";
    for(var li=0;li<lineEls.length;li++){
      var Ln=lineEls[li];
      var z=(Ln.z0 + p1*Ln.zr)*DEPTH;                  // dolly toward camera
      // present from the very top; each plane fades only as it passes the camera
      var fout=clamp(map(z,380,760,1,0),0,1);
      Ln.el.style.transform="translateZ("+z.toFixed(0)+"px)";
      Ln.el.style.opacity=fout.toFixed(3);
    }
    introCap.style.opacity=clamp(map(p1,0,0.12,0.62,0),0,1).toFixed(3);
    introHint.style.transform="translateX(-50%) scaleY("+(1-clamp(p1*2,0,1)).toFixed(3)+")";
    introHint.style.opacity=(0.5*(1-clamp(p1*3,0,1))).toFixed(3);

    /* ---- 2 · rising product bubbles (emerge from the dark depth) ---- */
    var pb=prog(bubbles);
    var emerge=clamp(map(pb,0,0.06,0,1),0,1);
    for(var i=0;i<bubbleEls.length;i++){
      var B=bubbleEls[i],b=B.b;
      var rise=reduce?b.rise*0.4:b.rise;
      var pr=clamp(pb*b.sp,0,1.4);
      var yv=b.start - pr*rise;
      var amp=reduce?0:b.amp;
      var xx=Math.sin(pb*b.freq*TAU+b.ph)*amp;
      var rr=reduce?0:Math.sin(pb*b.freq+b.ph)*b.rot;
      var scl=lerp(0.42,1,emerge);                     // born small from the depth
      var oc=clamp(map(yv,124,102,0,1),0,1)*clamp(map(yv,-14,-36,1,0),0,1)*emerge;
      B.el.style.transform="translate3d("+xx.toFixed(1)+"px,"+yv.toFixed(2)+"vh,0) scale("+scl.toFixed(3)+") rotate("+rr.toFixed(2)+"deg)";
      B.el.style.opacity=oc.toFixed(3);
    }

    /* ---- 3 · all about design (rises out of the bubble world) ---- */
    var p3=prog(about);
    var ain=clamp(map(p3,0.04,0.34,0,1),0,1);
    var aout=clamp(map(p3,0.78,1,0,1),0,1);
    aboutInner.style.opacity=(ain*(1-aout)).toFixed(3);
    aboutInner.style.transform="translateY("+lerp(46,0,ain).toFixed(1)+"px) scale("+lerp(0.97,1,ain).toFixed(3)+")";
    if(!reduce) aboutInner.style.filter=ain<1?"blur("+((1-ain)*14).toFixed(1)+"px)":"none";

    /* ---- 4 · garage hero parallax ---- */
    if(shopMedia){
      var rect=shop.getBoundingClientRect();
      var ps=clamp((innerHeight-rect.top)/(innerHeight+rect.height),0,1);
      shopMedia.style.transform="translateY("+lerp(-40,40,ps).toFixed(1)+"px)";
    }
  }

  window.addEventListener("scroll",render,{passive:true});
  window.addEventListener("resize",render);
  window.addEventListener("load",render);
  function loop(){ render(); requestAnimationFrame(loop); }
  requestAnimationFrame(loop);
  render();
})();