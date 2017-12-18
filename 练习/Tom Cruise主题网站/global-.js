function addClass(e,t){e.className?e.className+=""+t:e.className=t}function addLoadEvent(e){var t=window.onload
"function"!=typeof window.onload?window.onload=e:window.onload=function(){t(),e()}}function insertAfter(e,t){var n=t.parentNode
n.lastChild==t?n.appendChild(e):n.insertBefore(e,t.nextSibling)}function moveElement(e,t,n,r){if(!document.getElementById)return!1
if(!document.getElementById(e))return!1
var a=document.getElementById(e)
a.movement&&clearTimeout(a.movement),a.style.left||(a.style.left="0px"),a.style.top||(a.style.top="0px")
var l,i=parseInt(a.style.left),o=parseInt(a.style.top)
if(i==t&&o==n)return!0
t>i&&(l=Math.ceil((t-i)/20),i+=l),i>t&&(l=Math.ceil((i-t)/20),i-=l),n>o&&(l=Math.ceil((n-o)/20),o+=l),o>n&&(l=Math.ceil((o-n)/20),o-=l),a.style.left=i+"px",a.style.top=o+"px"
var d='moveElement("'+e+'",'+t+","+n+","+r+")"
a.movement=setTimeout(d,r)}function highlightPage(){if(!document.getElementsByTagName)return!1
if(!document.getElementById)return!1
var e=document.getElementsByTagName("header")
if(0==e.length)return!1
var t=e[0].getElementsByTagName("nav")
if(0==t.length)return!1
for(var n=t[0].getElementsByTagName("a"),r=n.length-1;r>=0;r--)if(linkurl=n[r].getAttribute("href"),-1!=window.location.href.indexOf(linkurl)){n[r].className="here"
var a=n[r].lastChild.nodeValue.toLowerCase()
document.body.setAttribute("id",a)}}function prepareSlideshow(){if(!document.getElementById("intro"))return!1
var e=document.createElement("div")
e.setAttribute("id","slideshow")
var t=document.createElement("img")
t.setAttribute("src","slideshow.gif"),t.setAttribute("alt","a glimpse of what awaits you"),t.setAttribute("id","preview"),e.appendChild(t)
var n=document.getElementById("intro")
insertAfter(e,n)
for(var r=document.getElementsByTagName("a"),a=r.length-1;a>=0;a--)r[a].onmouseover=function(){var e=this.getAttribute("href");-1!=e.indexOf("index.html")&&moveElement("preview",0,0,5),-1!=e.indexOf("about.html")&&moveElement("preview",-160,0,5),-1!=e.indexOf("photos.html")&&moveElement("preview",-320,0,5),-1!=e.indexOf("live.html")&&moveElement("preview",-480,0,5),-1!=e.indexOf("contact.html")&&moveElement("preview",-640,0,5)}}function showSection(e){for(var t=document.getElementsByTagName("section"),n=t.length-1;n>=0;n--)t[n].getAttribute("id")!=e?t[n].style.display="none":t[n].style.display="block"}function prepareInternalnav(){if(!document.getElementsByTagName)return!1
if(!document.getElementById)return!1
var e=document.getElementsByTagName("article")
if(0==e.length)return!1
var t=e[0].getElementsByTagName("nav")
if(0==t.length)return!1
for(var n=t[0].getElementsByTagName("a"),r=n.length-1;r>=0;r--){var a=n[r].getAttribute("href").split("#")[1]
document.getElementById(a)&&(document.getElementById(a).style.display="none",n[r].destination=a,n[r].onclick=function(){return showSection(this.destination),!1})}}function preparePlace(){if(!document.createElement)return!1
if(!document.createTextNode)return!1
if(!document.getElementById)return!1
if(!document.getElementById("image"))return!1
var e=document.createElement("img")
e.setAttribute("id","plchold"),e.setAttribute("src","photo0.jpg"),e.setAttribute("alt","my image gallery"),e.style.display="block",e.style.width="646px",e.style.margin="0 auto"
var t=document.createElement("p")
t.setAttribute("id","description"),t.style.font="1.4em normal"
var n=document.createTextNode("Choose an image.")
t.appendChild(n)
var r=document.getElementById("image")
insertAfter(e,r),insertAfter(t,r)}function preparelinks(){if(!document.getElementById)return!1
if(!document.getElementsByTagName)return!1
if(!document.getElementById("image"))return!1
for(var e=document.getElementById("image"),t=e.getElementsByTagName("a"),n=0;n<t.length;n++)t[n].onclick=function(){return!showpic(this)}}function showpic(e){if(!document.getElementById("plchold"))return!1
var t=e.getAttribute("href"),n=document.getElementById("plchold")
if("IMG"!=n.nodeName)return!1
if(n.setAttribute("src",t),document.getElementById("description")){var r=e.getAttribute("title")?e.getAttribute("title"):"",a=document.getElementById("description")
3==a.firstChild.nodeType&&(a.firstChild.nodeValue=r)}return!0}function stripeTables(){if(!document.getElementsByTagName)return!1
for(var e=document.getElementsByTagName("table"),t=e.length-1;t>=0;t--)for(var n=!1,r=e[t].getElementsByTagName("tr"),a=1;a<r.length;a++)1==n?(addClass(r[a],"odd"),n=!1):n=!0}function highlightRows(){if(!document.getElementsByTagName)return!1
for(var e=document.getElementsByTagName("tr"),t=1;t<e.length;t++)e[t].oldclass=e[t].className,e[t].onmouseover=function(){addClass(this," highlight")},e[t].onmouseout=function(){this.className=this.oldclass}}function displayAbbr(){if(!document.getElementsByTagName||!document.createElement||!document.createTextNode)return!1
var e=document.getElementsByTagName("abbr")
if(e.length<1)return!1
for(var t=[],n=e.length-1;n>=0;n--){if(e[n].childNodes.length<1)return!1
var r=e[n].getAttribute("title"),a=e[n].lastChild.nodeValue
t[a]=r}dlist=document.createElement("dl")
for(a in t){var r=t[a],l=document.createElement("dt"),i=document.createElement("dd"),o=document.createTextNode(a),d=document.createTextNode(r)
l.appendChild(o),i.appendChild(d),dlist.appendChild(l),dlist.appendChild(i)}if(dlist.childNodes.length<1)return!1
header=document.createElement("h2"),htext=document.createTextNode("Abbreviations"),header.appendChild(htext)
var m=document.getElementsByTagName("article")
m[0].appendChild(header),m[0].appendChild(dlist)}function focusLabels(){if(!document.getElementsByTagName)return!1
for(var e=document.getElementsByTagName("label"),t=e.length-1;t>=0;t--)e[t].getAttribute("for")&&(e[t].onclick=function(){var e=document.getElementById("for")
if(!document.getElementById(e))return!1
var t=document.getElementById(e)
t.focus()})}function resetFields(){for(var e=0;e<document.forms.length;e++)for(var t=document.forms[e],n=0;n<t.elements.length;n++){var r=t.elements[n]
"submit"!=r.type&&r.placeholder&&(r.placeholders=r.placeholder,r.onfocus=function(){this.placeholder=""},r.onblur=function(){this.placeholder=this.placeholders})}}function isFilled(e){return 0==e.value.replace(" ","").length?!1:e.value!=placeholder}function isEmail(e){return-1!=e.value.indexOf("@")&&-1!=e.value.indexOf(".")}function validateForm(){for(var e=0;e<document.forms.length;e++){var t=document.forms[e]
resetFields(t),t.onsubmit=function(){for(var e=0;e<this.elements.length;e++){var t=this.elements[e]
return"required"!=t.required||isFilled(t)?"email"!=t.type||isEmail(t)?!0:(alert("The "+t.name+" field must be a valid email address."),!1):(alert("Please fill in the "+t.name+" field."),!1)}}}}addLoadEvent(highlightPage),addLoadEvent(prepareSlideshow),addLoadEvent(prepareInternalnav),addLoadEvent(preparePlace),addLoadEvent(preparelinks),addLoadEvent(stripeTables),addLoadEvent(highlightRows),addLoadEvent(displayAbbr),addLoadEvent(validateForm)
