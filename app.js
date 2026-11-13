(function(){
"use strict";
const $=id=>document.getElementById(id),S={kind:"url",source:"upload",corner:"extra-rounded",frame:"none",logo:null,qr:null,toastTimer:null};
const iconPaths={
 globe2:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
 camera:'<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
 github:'<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
 instagram:'<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
 envelope:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
 wifi:'<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><path d="M12 20h.01"/>',
 'play-circle':'<circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4z"/>',
 'star-fill':'<path d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/>',
 'lightning-charge-fill':'<path d="M11 21h-1l1-7H7.5a1.5 1.5 0 0 1-1.2-2.4l7.7-10.1a.5.5 0 0 1 .9.4l-1 7h3.6a1.5 1.5 0 0 1 1.2 2.4L11 21z"/>',
 'music-note':'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
 shop:'<path d="M3 9l1-6h16l1 6"/><path d="M4 9v12h16V9"/><path d="M4 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/><path d="M9 21v-6h6v6"/>',
 telephone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.68 2.8a2 2 0 0 1-.45 2.11L8.07 9.93a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.68A2 2 0 0 1 22 16.92z"/>',
 house:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1z"/>',
 heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z"/>'
};
function toast(s){$("toast").textContent=s;$("toast").classList.add("show");clearTimeout(S.toastTimer);S.toastTimer=setTimeout(()=>$("toast").classList.remove("show"),3200)}
function data(){switch(S.kind){case"url":{let v=$("urlValue").value.trim();if(v&&!/^[a-z][a-z0-9+.-]*:/i.test(v))v="https://"+v;return v}case"text":return $("textValue").value.trim();case"wifi":{const e=v=>String(v).replace(/([\\;,:"])/g,"\\$1");const sec=$("wifiSecurity").value;return "WIFI:T:"+sec+";S:"+e($("ssid").value)+";P:"+(sec==="nopass"?"":e($("wifiPass").value))+";"+($("wifiHidden").checked?"H:true;":"")+";"}case"email":return "mailto:"+$("emailTo").value.trim()+"?subject="+encodeURIComponent($("emailSubject").value)+"&body="+encodeURIComponent($("emailBody").value);case"phone":return "tel:"+$("phoneValue").value.trim().replace(/[^\d+*#]/g,"");default:return ""}}
function iconSvg(name){return '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="#182c27" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+(iconPaths[name]||iconPaths.globe2)+'</svg>'}
function logo(){if(S.source==="icon")return "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(iconSvg($("iconChoice").value));if(S.source==="url")return $("logoUrl").value.trim()||undefined;return S.logo||undefined}
function options(){const size=+$("size").value;const opt={width:size,height:size,type:"svg",data:data()||" ",margin:+$("quiet").value,qrOptions:{errorCorrectionLevel:$("errorLevel").value},dotsOptions:{color:$("qrColor").value,type:$("dotStyle").value},backgroundOptions:{color:$("transparent").checked?"rgba(0,0,0,0)":$("bgColor").value},cornersSquareOptions:{color:$("qrColor").value,type:S.corner},cornersDotOptions:{color:$("qrColor").value,type:S.corner==="square"?"square":"dot"},imageOptions:{crossOrigin:"anonymous",hideBackgroundDots:true,imageSize:+$("logoScale").value/100,margin:+$("logoPadding").value}};if(logo())opt.image=logo();return opt}
function render(){if(!data()){toast("Add content to generate a QR code.");return}try{$("loading").classList.add("show");if(!S.qr){S.qr=new QRCodeStyling(options());S.qr.append($("qrCode"))}else S.qr.update(options());$("dimension").textContent=$("size").value+" Ã "+$("size").value+" px";$("artboard").style.background=$("transparent").checked?"#fff":$("bgColor").value;frameApply();$("loading").classList.remove("show")}catch(e){$("loading").classList.remove("show");toast("QR generation failed. Check the image or content.");console.error(e)}}
let renderTimer;function later(){clearTimeout(renderTimer);renderTimer=setTimeout(render,140)}
function frameApply(){const a=$("artboard");a.classList.remove("frame-outline","frame-bottom","frame-badge");if(S.frame!=="none")a.classList.add("frame-"+S.frame);a.style.setProperty("--frame",$("frameColor").value);$("caption").textContent=$("frameText").value||"SCAN ME";$("caption").style.color=$("frameTextColor").value}
function setKind(k){S.kind=k;document.querySelectorAll("[data-kind]").forEach(b=>b.classList.toggle("active",b.dataset.kind===k));document.querySelectorAll("[data-field]").forEach(e=>e.classList.toggle("d-none",e.dataset.field!==k));later()}
function setSource(k){S.source=k;document.querySelectorAll("[data-source]").forEach(b=>b.classList.toggle("active",b.dataset.source===k));document.querySelectorAll("[data-source-field]").forEach(e=>e.classList.toggle("d-none",e.dataset.sourceField!==k));$("logoOptions").style.display=k==="upload"&&!S.logo?"none":"block";later()}
function setFrame(k){S.frame=k;document.querySelectorAll("[data-frame]").forEach(b=>b.classList.toggle("selected",b.dataset.frame===k));$("frameOptions").style.display=k==="none"?"none":"block";frameApply()}
function labelColor(id){$(id+"Text").textContent=$(id).value.toUpperCase()}
function filename(){return ($("fileName").value.trim()||"qr-forge-code").replace(/[^a-z0-9_-]+/gi,"-").slice(0,48)||"qr-forge-code"}
function blobImage(blob){return new Promise((resolve,reject)=>{const u=URL.createObjectURL(blob),i=new Image();i.onload=()=>{URL.revokeObjectURL(u);resolve(i)};i.onerror=()=>{URL.revokeObjectURL(u);reject(Error("Image decode failed"))};i.src=u})}
function save(blob,name){if(!blob)throw Error("No export data");const u=URL.createObjectURL(blob),a=document.createElement("a");a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1500)}
async function png(){try{const blob=await S.qr.getRawData("png"),img=await blobImage(blob),n=+$("size").value,pad=Math.round(n*.035),extra=S.frame==="bottom"?Math.round(n*.14):0,c=document.createElement("canvas");c.width=n+pad*2;c.height=n+pad*2+extra;const x=c.getContext("2d");if(!$("transparent").checked){x.fillStyle=$("bgColor").value;x.fillRect(0,0,c.width,c.height)}x.drawImage(img,pad,pad,n,n);if(S.frame!=="none"){x.save();x.strokeStyle=$("frameColor").value;x.lineWidth=Math.max(4,Math.round(n*.012));if(S.frame==="outline")x.strokeRect(2,2,c.width-4,c.height-4);if(S.frame==="badge"){x.beginPath();x.roundRect(2,2,c.width-4,c.height-4,n*.06);x.stroke()}if(S.frame==="bottom"||S.frame==="badge"){x.fillStyle=$("frameTextColor").value;x.font="700 "+Math.max(13,Math.round(n*.035))+"px Arial";x.textAlign="center";x.textBaseline="middle";x.fillText($("frameText").value.toUpperCase().slice(0,36),c.width/2,c.height-pad*.5)}x.restore()}const out=await new Promise(r=>c.toBlob(r,"image/png"));save(out,filename()+".png");toast("PNG exported.")}catch(e){toast("PNG export failed. Try a local image or remove the center image.");console.error(e)}}
function esc(s){return String(s).replace(/[<>&'"]/g,c=>({"<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':"&quot;"}[c]))}
async function svg(){
 try{
  const raw=await (await S.qr.getRawData("svg")).text();
  const n=+$("size").value,pad=Math.round(n*.035),extra=S.frame==="bottom"?Math.round(n*.14):0,total=n+pad*2,height=total+extra;
  const parsed=new DOMParser().parseFromString(raw,"image/svg+xml");
  if(parsed.querySelector("parsererror"))throw Error("QR engine returned invalid SVG");
  const source=parsed.documentElement;
  if(!source||source.localName!=="svg")throw Error("QR engine returned no SVG root");
  const ns="http://www.w3.org/2000/svg",out=document.createElementNS(ns,"svg");
  out.setAttribute("xmlns",ns);
  out.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink");
  out.setAttribute("width",String(total));
  out.setAttribute("height",String(height));
  out.setAttribute("viewBox","0 0 "+total+" "+height);
  if(!$("transparent").checked){
   const bg=document.createElementNS(ns,"rect");
   bg.setAttribute("width","100%");bg.setAttribute("height","100%");
   bg.setAttribute("fill",$("bgColor").value);out.appendChild(bg);
  }
  const group=document.createElementNS(ns,"g");
  group.setAttribute("transform","translate("+pad+" "+pad+")");
  Array.from(source.childNodes).forEach(node=>group.appendChild(document.importNode(node,true)));
  out.appendChild(group);
  if(S.frame==="outline"||S.frame==="badge"){
   const border=document.createElementNS(ns,"rect");
   border.setAttribute("x","2");border.setAttribute("y","2");
   border.setAttribute("width",String(total-4));border.setAttribute("height",String(height-4));
   if(S.frame==="badge")border.setAttribute("rx","20");
   border.setAttribute("fill","none");border.setAttribute("stroke",$("frameColor").value);
   border.setAttribute("stroke-width","5");out.appendChild(border);
  }
  if(S.frame==="bottom"||S.frame==="badge"){
   const caption=document.createElementNS(ns,"text");
   caption.setAttribute("x",String(total/2));caption.setAttribute("y",String(total+extra*.55));
   caption.setAttribute("text-anchor","middle");caption.setAttribute("dominant-baseline","middle");
   caption.setAttribute("font-family","Arial, sans-serif");
   caption.setAttribute("font-size",String(Math.max(13,Math.round(n*.035))));
   caption.setAttribute("font-weight","700");caption.setAttribute("letter-spacing","2");
   caption.setAttribute("fill",$("frameTextColor").value);
   caption.textContent=$("frameText").value.toUpperCase().slice(0,36);
   out.appendChild(caption);
  }
  const serialized=new XMLSerializer().serializeToString(out);
  const check=new DOMParser().parseFromString(serialized,"image/svg+xml");
  if(check.querySelector("parsererror"))throw Error("Generated SVG failed XML validation");
  save(new Blob([serialized],{type:"image/svg+xml;charset=utf-8"}),filename()+".svg");
  toast("SVG exported.");
 }catch(e){
  toast("SVG export failed. Check the QR content or center image.");
  console.error(e);
 }
}
async function copy(){try{const blob=await S.qr.getRawData("png");if(!navigator.clipboard||!window.ClipboardItem)throw Error();await navigator.clipboard.write([new ClipboardItem({"image/png":blob})]);toast("QR image copied.")}catch(e){toast("Clipboard image is unavailable. Download the PNG instead.")}}
function upload(file){if(!file)return;if(file.size>2*1024*1024){toast("Image is larger than 2 MB.");return}if(!/^image\/(png|jpeg|webp|svg\+xml)$/.test(file.type)){toast("Choose PNG, JPG, SVG or WebP.");return}const r=new FileReader();r.onload=()=>{S.logo=r.result;$("logoOptions").style.display="block";later();toast("Center image added.")};r.onerror=()=>toast("Could not read this image.");r.readAsDataURL(file)}
function bind(){
 document.querySelectorAll("[data-kind]").forEach(b=>b.onclick=()=>setKind(b.dataset.kind));document.querySelectorAll("[data-source]").forEach(b=>b.onclick=()=>setSource(b.dataset.source));document.querySelectorAll("[data-frame]").forEach(b=>b.onclick=()=>setFrame(b.dataset.frame));
 document.querySelectorAll("[data-corner]").forEach(b=>b.onclick=()=>{S.corner=b.dataset.corner;document.querySelectorAll("[data-corner]").forEach(x=>x.classList.toggle("selected",x===b));later()});
 const ids=["urlValue","textValue","ssid","wifiPass","wifiSecurity","wifiHidden","emailTo","emailSubject","emailBody","phoneValue","dotStyle","qrColor","bgColor","transparent","size","quiet","errorLevel","logoUrl","iconChoice","logoScale","logoPadding"];
 ids.forEach(id=>{const el=$(id);el.addEventListener("input",()=>{if(id==="size")$("sizeOut").textContent=el.value+" px";if(id==="quiet")$("quietOut").textContent=el.value+" px";if(id==="logoScale")$("logoScaleOut").textContent=el.value+"%";if(id==="logoPadding")$("logoPaddingOut").textContent=el.value+" px";if(id==="qrColor"||id==="bgColor")labelColor(id);later()});el.addEventListener("change",later)});
 $("logoFile").onchange=e=>upload(e.target.files[0]);$("removeLogo").onclick=()=>{S.logo=null;$("logoFile").value="";$("logoOptions").style.display="none";setSource("upload");toast("Center image removed.");later()};
 ["frameColor","frameTextColor"].forEach(id=>$(id).oninput=()=>{labelColor(id);frameApply()});$("frameText").oninput=frameApply;
 $("png").onclick=png;$("svg").onclick=svg;$("copy").onclick=copy;
 document.querySelectorAll("[data-preset]").forEach(b=>b.onclick=()=>{const p={forest:["#182c27","#ffffff"],ink:["#202925","#f1f0e9"],cobalt:["#143f91","#f5f8ff"],citrus:["#28351c","#e5f5a4"]}[b.dataset.preset];$("qrColor").value=p[0];$("bgColor").value=p[1];labelColor("qrColor");labelColor("bgColor");later();toast(b.dataset.preset+" preset applied.")});
 $("fileName").onchange=()=>{$("fileName").value=$("fileName").value.replace(/[^a-z0-9_-]+/gi,"-").slice(0,48)}
}
function init(){if(typeof QRCodeStyling==="undefined"){toast("QR engine did not load. Check your connection.");return}bind();setKind("url");setSource("upload");setFrame("none");render()}
document.addEventListener("DOMContentLoaded",init);
})();