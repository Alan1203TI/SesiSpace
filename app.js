const DATA={
 sun:{name:'Sol',order:'CENTRO',type:'ESTRELA',diameter:'1.392.700 km',distance:'0 km',shortDistance:'0 km',year:'—',day:'≈ 25 a 35 dias',temperature:'≈ 5.500 °C',moons:'—',gravity:274,gravityLabel:'274 m/s²',desc:'A estrela no centro do Sistema Solar. Sua energia sustenta praticamente toda a vida na Terra.',class:'sun-big',orbit:0,size:2.55,speed:0,kind:0},
 mercury:{name:'Mercúrio',order:'01 / 08',type:'PLANETA',diameter:'4.879 km',distance:'57,9 milhões km',shortDistance:'57,9 M km',year:'88 dias',day:'58,6 dias terrestres',temperature:'≈ 167 °C',moons:'0',gravity:3.70,gravityLabel:'3,70 m/s²',desc:'O menor planeta e o mais próximo do Sol. Possui uma superfície rochosa repleta de crateras.',class:'mercury-big',orbit:5.3,size:.48,speed:.42,kind:1},
 venus:{name:'Vênus',order:'02 / 08',type:'PLANETA',diameter:'12.104 km',distance:'108,2 milhões km',shortDistance:'108,2 M km',year:'224,7 dias',day:'243 dias terrestres',temperature:'≈ 464 °C',moons:'0',gravity:8.87,gravityLabel:'8,87 m/s²',desc:'Um mundo extremamente quente, envolto por uma atmosfera densa rica em dióxido de carbono.',class:'venus-big',orbit:7.4,size:.74,speed:.32,kind:2},
 earth:{name:'Terra',order:'03 / 08',type:'PLANETA',diameter:'12.742 km',distance:'149,6 milhões km',shortDistance:'149,6 M km',year:'365,25 dias',day:'23h 56min',temperature:'≈ 15 °C',moons:'1',gravity:9.81,gravityLabel:'9,81 m/s²',desc:'Nosso planeta natal, com oceanos de água líquida e uma atmosfera rica em nitrogênio e oxigênio.',class:'earth-big',orbit:9.6,size:.78,speed:.27,kind:3},
 mars:{name:'Marte',order:'04 / 08',type:'PLANETA',diameter:'6.779 km',distance:'227,9 milhões km',shortDistance:'227,9 M km',year:'687 dias',day:'24h 37min',temperature:'≈ -63 °C',moons:'2',gravity:3.71,gravityLabel:'3,71 m/s²',desc:'Conhecido como Planeta Vermelho, tem vulcões gigantes, cânions profundos e sinais de um passado com água.',class:'mars-big',orbit:12.2,size:.58,speed:.22,kind:4},
 jupiter:{name:'Júpiter',order:'05 / 08',type:'PLANETA',diameter:'139.820 km',distance:'778,5 milhões km',shortDistance:'778,5 M km',year:'11,86 anos',day:'9h 56min',temperature:'≈ -110 °C',moons:'95+ conhecidas',gravity:24.79,gravityLabel:'24,79 m/s²',desc:'O maior planeta do Sistema Solar, um gigante gasoso famoso pela Grande Mancha Vermelha.',class:'jupiter-big',orbit:17.0,size:1.9,speed:.12,kind:5},
 saturn:{name:'Saturno',order:'06 / 08',type:'PLANETA',diameter:'116.460 km',distance:'1,43 bilhão km',shortDistance:'1,43 bi km',year:'29,45 anos',day:'10h 42min',temperature:'≈ -140 °C',moons:'140+ conhecidas',gravity:10.44,gravityLabel:'10,44 m/s²',desc:'Gigante gasoso conhecido pelo impressionante sistema de anéis formado por gelo, poeira e rochas.',class:'saturn-big',orbit:21.5,size:1.62,speed:.09,kind:6},
 uranus:{name:'Urano',order:'07 / 08',type:'PLANETA',diameter:'50.724 km',distance:'2,87 bilhões km',shortDistance:'2,87 bi km',year:'84 anos',day:'17h 14min',temperature:'≈ -195 °C',moons:'27',gravity:8.69,gravityLabel:'8,69 m/s²',desc:'Um gigante de gelo que gira quase deitado, provavelmente devido a uma grande colisão no passado.',class:'uranus-big',orbit:25.8,size:1.12,speed:.065,kind:7},
 neptune:{name:'Netuno',order:'08 / 08',type:'PLANETA',diameter:'49.244 km',distance:'4,50 bilhões km',shortDistance:'4,50 bi km',year:'164,8 anos',day:'16h 6min',temperature:'≈ -200 °C',moons:'14',gravity:11.15,gravityLabel:'11,15 m/s²',desc:'O planeta mais distante do Sol, com alguns dos ventos mais rápidos já observados no Sistema Solar.',class:'neptune-big',orbit:30.0,size:1.08,speed:.052,kind:8}
};
const ORDER=['sun','mercury','venus','earth','mars','jupiter','saturn','uranus','neptune'];
const $=id=>document.getElementById(id);
let selected='earth',paused=false;
const LUNAR_MONTH=29.53059;let lunarDay=0,lunarRunning=true,lunarSpeed=.45,lunarDragging=false;

function updatePanel(key){
 const d=DATA[key]; selected=key;
 $('bodyType').textContent=d.type;$('bodyOrder').textContent=d.order;$('bodyName').textContent=d.name;$('bodyDesc').textContent=d.desc;
 $('diameter').textContent=d.diameter;$('distance').textContent=d.distance;$('year').textContent=d.year;$('day').textContent=d.day;$('temperature').textContent=d.temperature;$('moons').textContent=d.moons;
 $('bigPlanet').className='big-planet '+d.class;$('hudTarget').textContent=d.name.toUpperCase();$('hudDistance').textContent=d.shortDistance;
 document.querySelectorAll('#planetSelector button').forEach(b=>b.classList.toggle('active',b.dataset.body===key));
 calculateWeight();compare();
}
function calculateWeight(){
 const earthWeight=Math.max(1,Math.min(500,Number($('weightInput').value)||70));$('weightInput').value=earthWeight;const d=DATA[selected];const value=earthWeight*(d.gravity/9.81);
 if(selected==='sun') $('weightResult').innerHTML=`Próximo à superfície do <b>${d.name}</b>, a força gravitacional seria equivalente a aproximadamente <strong>${value.toFixed(1)} kg</strong> em uma balança terrestre.`;
 else $('weightResult').innerHTML=`Em <b>${d.name}</b>, você pesaria aproximadamente <strong>${value.toFixed(1)} kg</strong> em uma balança calibrada para a gravidade terrestre.`;
}
function compare(){
 const otherKey=$('compareSelect').value,a=DATA[selected],b=DATA[otherKey];
 if(selected==='sun'){$('compareResult').innerHTML=`O <b>Sol</b> é uma estrela. Seu diâmetro é ${a.diameter}, muito maior que ${b.name} (${b.diameter}).`;return;}
 if(otherKey===selected){$('compareResult').innerHTML='Você selecionou o mesmo planeta nos dois lados. Escolha outro para comparar.';return;}
 $('compareResult').innerHTML=`<b>${a.name}</b>: ${a.diameter}, gravidade ${a.gravityLabel}.<br><b>${b.name}</b>: ${b.diameter}, gravidade ${b.gravityLabel}.`;
}
$('calcWeight').addEventListener('click',calculateWeight);$('weightInput').addEventListener('input',calculateWeight);$('compareSelect').addEventListener('change',compare);
$('startBtn').addEventListener('click',()=>{$('intro').classList.add('hidden');setTimeout(()=>travelTo('earth',true),250)});
$('pauseBtn').addEventListener('click',()=>{paused=!paused;$('pauseBtn').textContent=paused?'▶ Continuar':'⏸ Pausar'});
$('overviewBtn').addEventListener('click',()=>goOverview());$('backBtn').addEventListener('click',()=>goOverview());$('travelBtn').addEventListener('click',()=>travelTo(selected));
document.querySelectorAll('#planetSelector button').forEach(b=>b.addEventListener('click',()=>travelTo(b.dataset.body)));

// Fundo estrelado 2D da página
const bg=$('stars2d'),bgc=bg.getContext('2d');let bgStars=[];
function resizeBg(){const d=Math.min(2,devicePixelRatio||1);bg.width=innerWidth*d;bg.height=innerHeight*d;bg.style.width=innerWidth+'px';bg.style.height=innerHeight+'px';bgc.setTransform(d,0,0,d,0,0);bgStars=Array.from({length:Math.min(220,Math.floor(innerWidth*innerHeight/7000))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.3+.2,a:Math.random()*.7+.2,s:Math.random()*.08+.02}))}
function drawBg(){bgc.clearRect(0,0,innerWidth,innerHeight);for(const s of bgStars){s.y+=s.s;if(s.y>innerHeight+2){s.y=-2;s.x=Math.random()*innerWidth}bgc.beginPath();bgc.arc(s.x,s.y,s.r,0,Math.PI*2);bgc.fillStyle=`rgba(210,240,255,${s.a})`;bgc.fill()}requestAnimationFrame(drawBg)}
addEventListener('resize',resizeBg);resizeBg();drawBg();

// Efeito de hipervelocidade 2D sobre o WebGL
const warp=$('warpCanvas'),wctx=warp.getContext('2d');let warpStars=[];
function resizeWarp(){const r=$('viewerStage').getBoundingClientRect(),d=Math.min(2,devicePixelRatio||1);warp.width=Math.max(1,r.width*d);warp.height=Math.max(1,r.height*d);warp.style.width=r.width+'px';warp.style.height=r.height+'px';wctx.setTransform(d,0,0,d,0,0);warpStars=Array.from({length:150},()=>({a:Math.random()*Math.PI*2,r:Math.random()*Math.max(r.width,r.height)*.55+14,len:Math.random()*110+35,alpha:Math.random()*.8+.2}))}
function drawWarp(){const r=$('viewerStage').getBoundingClientRect();wctx.clearRect(0,0,r.width,r.height);if($('viewerStage').classList.contains('warping')){const cx=r.width/2,cy=r.height/2;wctx.lineCap='round';for(const s of warpStars){const x1=cx+Math.cos(s.a)*s.r*.25,y1=cy+Math.sin(s.a)*s.r*.25,x2=cx+Math.cos(s.a)*(s.r+s.len),y2=cy+Math.sin(s.a)*(s.r+s.len);const g=wctx.createLinearGradient(x1,y1,x2,y2);g.addColorStop(0,'rgba(120,225,255,0)');g.addColorStop(1,`rgba(220,250,255,${s.alpha})`);wctx.strokeStyle=g;wctx.lineWidth=1.2+s.alpha*1.6;wctx.beginPath();wctx.moveTo(x1,y1);wctx.lineTo(x2,y2);wctx.stroke();s.r+=6+s.alpha*10;if(s.r>Math.max(r.width,r.height)*.78){s.r=10;s.a=Math.random()*Math.PI*2}}}requestAnimationFrame(drawWarp)}
addEventListener('resize',resizeWarp);resizeWarp();drawWarp();

// ---------- Motor WebGL 3D local ----------
const canvas=$('glCanvas');const gl=canvas.getContext('webgl',{antialias:true,alpha:false});
if(!gl){$('viewerStage').innerHTML='<div style="padding:40px;color:white">Seu navegador não conseguiu iniciar WebGL. Teste no Chrome ou Edge atualizado.</div>';throw new Error('WebGL indisponível');}

const VS=`attribute vec3 aPos;attribute vec3 aNormal;uniform mat4 uModel;uniform mat4 uView;uniform mat4 uProj;uniform float uPointSize;varying vec3 vNormal;varying vec3 vObj;varying vec3 vWorld;void main(){vec4 world=uModel*vec4(aPos,1.0);vWorld=world.xyz;vNormal=mat3(uModel)*aNormal;vObj=aPos;gl_Position=uProj*uView*world;gl_PointSize=uPointSize;}`;
const FS=`precision mediump float;uniform vec3 uColor;uniform int uType;uniform float uTime;varying vec3 vNormal;varying vec3 vObj;varying vec3 vWorld;
float hash(vec3 p){return fract(sin(dot(p,vec3(12.9898,78.233,39.425)))*43758.5453);}float noise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);float n000=hash(i),n100=hash(i+vec3(1,0,0)),n010=hash(i+vec3(0,1,0)),n110=hash(i+vec3(1,1,0)),n001=hash(i+vec3(0,0,1)),n101=hash(i+vec3(1,0,1)),n011=hash(i+vec3(0,1,1)),n111=hash(i+vec3(1,1,1));return mix(mix(mix(n000,n100,f.x),mix(n010,n110,f.x),f.y),mix(mix(n001,n101,f.x),mix(n011,n111,f.x),f.y),f.z);}float fbm(vec3 p){float v=0.0,a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p*=2.03;a*=.5;}return v;}
void main(){
 if(uType==31){float d=length(gl_PointCoord-vec2(.5));if(d>.5)discard;gl_FragColor=vec4(0.75+0.25*(1.0-d),0.88,1.0,1.0);return;}
 if(uType==32){float d=length(gl_PointCoord-vec2(.5));if(d>.5)discard;float a=smoothstep(.5,.08,d);gl_FragColor=vec4(uColor,a);return;}
 if(uType==30){gl_FragColor=vec4(uColor,.26);return;} if(uType==20){gl_FragColor=vec4(uColor,.56);return;}
 vec3 n=normalize(vNormal);vec3 light=normalize(-vWorld);float dif=max(dot(n,light),0.0);float rim=pow(1.0-max(dot(n,normalize(vec3(0.0,0.0,1.0))),0.0),2.1);vec3 c=uColor;float f=fbm(vObj*5.0+uTime*.01);
 if(uType==0){float s=.78+.22*sin(uTime*2.2+vObj.y*14.0+vObj.x*7.0+f*4.0);c=vec3(1.0,.37,.02)*s+vec3(.12,.02,0.0)*f;gl_FragColor=vec4(c,1.0);return;}
 if(uType==1){float cr=fbm(vObj*16.0);c=mix(vec3(.25,.24,.23),vec3(.68,.65,.60),cr);}
 else if(uType==2){float cloud=fbm(vObj*7.0+vec3(2.0,0.0,0.0));c=mix(vec3(.54,.27,.08),vec3(.98,.77,.31),cloud);}
 else if(uType==3){float continents=fbm(vObj*4.7+vec3(1.7,.1,.8));float ridges=fbm(vObj*12.0);c=continents>.54?mix(vec3(.09,.34,.15),vec3(.38,.55,.20),ridges):mix(vec3(.015,.12,.46),vec3(.02,.36,.72),ridges);float ice=smoothstep(.70,.96,abs(vObj.y));c=mix(c,vec3(.93,.97,1.0),ice);float clouds=smoothstep(.60,.78,fbm(vObj*9.0+vec3(uTime*.025,2.0,0.0)));c=mix(c,vec3(.96,.98,1.0),clouds*.42);}
 else if(uType==4){float rock=fbm(vObj*8.0);c=mix(vec3(.36,.07,.035),vec3(.88,.28,.10),rock);float ice=smoothstep(.78,.97,abs(vObj.y));c=mix(c,vec3(.86,.82,.72),ice*.8);}
 else if(uType==5){float bands=.5+.5*sin(vObj.y*32.0+fbm(vObj*5.0)*4.0);c=mix(vec3(.35,.18,.10),vec3(.94,.74,.55),bands);float spot=exp(-55.0*((vObj.x-.55)*(vObj.x-.55)+(vObj.y+.18)*(vObj.y+.18)));c=mix(c,vec3(.73,.18,.08),spot*.85);}
 else if(uType==6){float bands=.5+.5*sin(vObj.y*27.0+fbm(vObj*4.0)*2.0);c=mix(vec3(.56,.45,.25),vec3(.95,.85,.59),bands*.62);}
 else if(uType==7){float bands=.5+.5*sin(vObj.y*10.0);c=mix(vec3(.29,.69,.72),vec3(.70,.95,.95),bands*.22);}
 else if(uType==8){float bands=.5+.5*sin(vObj.y*18.0+fbm(vObj*5.0));c=mix(vec3(.025,.12,.52),vec3(.12,.40,.96),bands*.50);}
 else if(uType==9){c=mix(vec3(.28),vec3(.75),fbm(vObj*10.0));}
 else if(uType==10){c=mix(vec3(.36,.22,.08),vec3(.92,.70,.27),fbm(vObj*8.0));}
 else if(uType==11){c=mix(vec3(.44,.49,.50),vec3(.86,.83,.72),fbm(vObj*7.0));}
 else if(uType==12){c=mix(vec3(.18,.19,.18),vec3(.56,.55,.50),fbm(vObj*8.0));}
 float lightAmt=.20+.80*dif;c*=lightAmt;c+=rim*vec3(.09,.17,.25);gl_FragColor=vec4(c,1.0);
}`;
function shader(type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s}
const prog=gl.createProgram();gl.attachShader(prog,shader(gl.VERTEX_SHADER,VS));gl.attachShader(prog,shader(gl.FRAGMENT_SHADER,FS));gl.linkProgram(prog);if(!gl.getProgramParameter(prog,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(prog));gl.useProgram(prog);
const loc={pos:gl.getAttribLocation(prog,'aPos'),normal:gl.getAttribLocation(prog,'aNormal'),model:gl.getUniformLocation(prog,'uModel'),view:gl.getUniformLocation(prog,'uView'),proj:gl.getUniformLocation(prog,'uProj'),color:gl.getUniformLocation(prog,'uColor'),type:gl.getUniformLocation(prog,'uType'),time:gl.getUniformLocation(prog,'uTime'),pointSize:gl.getUniformLocation(prog,'uPointSize')};

function sphere(lat=38,lon=56){const p=[],n=[],idx=[];for(let y=0;y<=lat;y++){const v=y/lat,ph=v*Math.PI;for(let x=0;x<=lon;x++){const u=x/lon,th=u*Math.PI*2,s=Math.sin(ph),px=Math.cos(th)*s,py=Math.cos(ph),pz=Math.sin(th)*s;p.push(px,py,pz);n.push(px,py,pz)}}for(let y=0;y<lat;y++)for(let x=0;x<lon;x++){const a=y*(lon+1)+x,b=a+lon+1;idx.push(a,b,a+1,b,a+1,b+1)}return {p,n,idx}}
function makeMesh(g){const o={};o.pb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,o.pb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(g.p),gl.STATIC_DRAW);o.nb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,o.nb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(g.n),gl.STATIC_DRAW);o.ib=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,o.ib);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(g.idx),gl.STATIC_DRAW);o.count=g.idx.length;return o}
const sphereMesh=makeMesh(sphere());
function ringMesh(inner=1.25,outer=2.05,segs=128){const p=[],n=[],idx=[];for(let i=0;i<=segs;i++){const a=i/segs*Math.PI*2,c=Math.cos(a),s=Math.sin(a);p.push(c*inner,0,s*inner,c*outer,0,s*outer);n.push(0,1,0,0,1,0)}for(let i=0;i<segs;i++){const k=i*2;idx.push(k,k+1,k+2,k+1,k+3,k+2)}return makeMesh({p,n,idx})}const ring=ringMesh();
function orbitMesh(r,segs=160){const p=[],n=[];for(let i=0;i<segs;i++){const a=i/segs*Math.PI*2;p.push(Math.cos(a)*r,0,Math.sin(a)*r);n.push(0,1,0)}const pb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,pb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(p),gl.STATIC_DRAW);const nb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,nb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(n),gl.STATIC_DRAW);return {pb,nb,count:segs}}
const orbits={};ORDER.slice(1).forEach(k=>orbits[k]=orbitMesh(DATA[k].orbit));
const moonOrbit=orbitMesh(1.55,96), jMoonOrbits=[orbitMesh(2.6,96),orbitMesh(3.2,96),orbitMesh(3.8,96),orbitMesh(4.5,96)];

const starCount=800,sp=[],sn=[];for(let i=0;i<starCount;i++){const r=42+Math.random()*60,th=Math.random()*Math.PI*2,ph=Math.acos(2*Math.random()-1);sp.push(r*Math.sin(ph)*Math.cos(th),r*Math.cos(ph)*.65,r*Math.sin(ph)*Math.sin(th));sn.push(0,1,0)}const starMesh={pb:gl.createBuffer(),nb:gl.createBuffer(),count:starCount};gl.bindBuffer(gl.ARRAY_BUFFER,starMesh.pb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(sp),gl.STATIC_DRAW);gl.bindBuffer(gl.ARRAY_BUFFER,starMesh.nb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(sn),gl.STATIC_DRAW);

const asteroidCount=650,ap=[],an=[];for(let i=0;i<asteroidCount;i++){const r=13.5+Math.random()*2.1,a=Math.random()*Math.PI*2,y=(Math.random()-.5)*.45;ap.push(Math.cos(a)*r,y,Math.sin(a)*r);an.push(0,1,0)}const asteroidMesh={pb:gl.createBuffer(),nb:gl.createBuffer(),count:asteroidCount};gl.bindBuffer(gl.ARRAY_BUFFER,asteroidMesh.pb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(ap),gl.STATIC_DRAW);gl.bindBuffer(gl.ARRAY_BUFFER,asteroidMesh.nb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(an),gl.STATIC_DRAW);

const I=()=>new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
function model(tx,ty,tz,s=1,rotX=0){const c=Math.cos(rotX),si=Math.sin(rotX);return new Float32Array([s,0,0,0,0,c*s,si*s,0,0,-si*s,c*s,0,tx,ty,tz,1])}
function perspective(fov,aspect,near,far){const f=1/Math.tan(fov/2),nf=1/(near-far);return new Float32Array([f/aspect,0,0,0,0,f,0,0,0,0,(far+near)*nf,-1,0,0,2*far*near*nf,0])}
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]],dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2],cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];function norm(a){const l=Math.hypot(...a)||1;return a.map(v=>v/l)}
function lookAt(eye,center,up=[0,1,0]){const z=norm(sub(eye,center)),x=norm(cross(up,z)),y=cross(z,x);return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-dot(x,eye),-dot(y,eye),-dot(z,eye),1])}
function mul(a,b){const o=new Float32Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++)o[c*4+r]=a[r]*b[c*4]+a[4+r]*b[c*4+1]+a[8+r]*b[c*4+2]+a[12+r]*b[c*4+3];return o}
function tx(m,v){return [m[0]*v[0]+m[4]*v[1]+m[8]*v[2]+m[12]*v[3],m[1]*v[0]+m[5]*v[1]+m[9]*v[2]+m[13]*v[3],m[2]*v[0]+m[6]*v[1]+m[10]*v[2]+m[14]*v[3],m[3]*v[0]+m[7]*v[1]+m[11]*v[2]+m[15]*v[3]]}
function bind(mesh){gl.bindBuffer(gl.ARRAY_BUFFER,mesh.pb);gl.vertexAttribPointer(loc.pos,3,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(loc.pos);gl.bindBuffer(gl.ARRAY_BUFFER,mesh.nb);gl.vertexAttribPointer(loc.normal,3,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(loc.normal)}
const colors={sun:[1,.42,.04],mercury:[.55,.52,.49],venus:[.78,.48,.17],earth:[.05,.35,.78],mars:[.68,.22,.11],jupiter:[.68,.52,.39],saturn:[.77,.68,.45],uranus:[.32,.78,.82],neptune:[.08,.28,.82]};
let simTime=0,last=performance.now(),yaw=.72,pitch=.34,camDist=45,focus=[0,0,0],following=null,travel=null,proj=I(),view=I(),cameraPos=[0,0,45],screenBodies={};
function bodyPos(key){if(key==='sun')return [0,0,0];const d=DATA[key],i=ORDER.indexOf(key),a=simTime*d.speed+i*.72;return [Math.cos(a)*d.orbit,Math.sin(a*.37)*.35,Math.sin(a)*d.orbit]}
function moonPos(parent,orbit,speed,phase=0,yScale=.18){const p=bodyPos(parent),a=simTime*speed+phase;return [p[0]+Math.cos(a)*orbit,p[1]+Math.sin(a*.55)*yScale,p[2]+Math.sin(a)*orbit]}
function earthMoonPos(){const p=bodyPos('earth');const towardSun=Math.atan2(-p[2],-p[0]);const phaseAngle=(lunarDay/LUNAR_MONTH)*Math.PI*2;const a=towardSun+phaseAngle;return [p[0]+Math.cos(a)*1.55,p[1]+Math.sin(phaseAngle)*.10,p[2]+Math.sin(a)*1.55]}
function smooth(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
function setWarp(active,label='calculando rota...'){const stage=$('viewerStage');stage.classList.toggle('warping',active);const el=$('warpLabel').querySelector('span');if(el)el.textContent=label;}
function travelTo(key,quiet=false){updatePanel(key);following=null;const d=DATA[key];travel={key,start:performance.now(),dur:2450,fromF:[...focus],fromD:camDist,toD:key==='sun'?8.4:Math.max(4.1,d.size*4.8)};$('travelStatus').textContent='VIAJANDO PARA '+d.name.toUpperCase();setWarp(true,'rota para '+d.name);if(!quiet)$('viewerStage').scrollIntoView({behavior:'smooth',block:'center'})}
function goOverview(){following=null;travel={key:null,start:performance.now(),dur:1900,fromF:[...focus],fromD:camDist,toD:45,toF:[0,0,0]};$('travelStatus').textContent='RETORNANDO À VISÃO GERAL';setWarp(true,'retornando à visão geral')}

function resizeGL(){const r=canvas.getBoundingClientRect(),d=Math.min(2,devicePixelRatio||1),w=Math.max(1,Math.floor(r.width*d)),h=Math.max(1,Math.floor(r.height*d));if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h}gl.viewport(0,0,w,h);proj=perspective(Math.PI/4,w/h,.1,180)}addEventListener('resize',resizeGL);
function drawMesh(mesh,mode,modelM,color,type,indexed=true,point=1){bind(mesh);gl.uniformMatrix4fv(loc.model,false,modelM);gl.uniform3fv(loc.color,color);gl.uniform1i(loc.type,type);gl.uniform1f(loc.pointSize,point);if(indexed){gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,mesh.ib);gl.drawElements(mode,mesh.count,gl.UNSIGNED_SHORT,0)}else gl.drawArrays(mode,0,mesh.count)}
function drawMoon(pos,size,color,kind=9){drawMesh(sphereMesh,gl.TRIANGLES,model(pos[0],pos[1],pos[2],size),color,kind,true,1)}
function render(now){resizeGL();const dt=Math.min(.05,(now-last)/1000);last=now;if(!paused){simTime+=dt;if(lunarRunning&&!lunarDragging){lunarDay=(lunarDay+dt*lunarSpeed)%LUNAR_MONTH;updateMoonLab(false)}}
 if(travel){const raw=Math.min(1,(now-travel.start)/travel.dur),t=smooth(raw),dest=travel.key?bodyPos(travel.key):travel.toF;focus=[travel.fromF[0]+(dest[0]-travel.fromF[0])*t,travel.fromF[1]+(dest[1]-travel.fromF[1])*t,travel.fromF[2]+(dest[2]-travel.fromF[2])*t];camDist=travel.fromD+(travel.toD-travel.fromD)*t;if(raw>=1){following=travel.key;travel=null;setWarp(false);$('travelStatus').textContent=following?'ORBITANDO '+DATA[following].name.toUpperCase():'VISÃO GERAL DO SISTEMA'}}
 else if(following)focus=bodyPos(following);
 cameraPos=[focus[0]+Math.sin(yaw)*Math.cos(pitch)*camDist,focus[1]+Math.sin(pitch)*camDist,focus[2]+Math.cos(yaw)*Math.cos(pitch)*camDist];view=lookAt(cameraPos,focus);
 gl.enable(gl.DEPTH_TEST);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.clearColor(.005,.012,.035,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.useProgram(prog);gl.uniformMatrix4fv(loc.view,false,view);gl.uniformMatrix4fv(loc.proj,false,proj);gl.uniform1f(loc.time,simTime);
 gl.depthMask(false);drawMesh(starMesh,gl.POINTS,I(),[.8,.9,1],31,false,2.1*Math.min(2,devicePixelRatio||1));gl.depthMask(true);
 for(const k of ORDER.slice(1))drawMesh(orbits[k],gl.LINE_LOOP,I(),[.25,.55,.72],30,false,1);
 gl.depthMask(false);drawMesh(asteroidMesh,gl.POINTS,I(),[.58,.50,.42],32,false,2.2*Math.min(2,devicePixelRatio||1));gl.depthMask(true);
 screenBodies={};const vp=mul(proj,view);
 for(const k of ORDER){const d=DATA[k],p=bodyPos(k);drawMesh(sphereMesh,gl.TRIANGLES,model(p[0],p[1],p[2],d.size),colors[k],d.kind,true,1);
  if(k==='sun'){gl.depthMask(false);gl.blendFunc(gl.SRC_ALPHA,gl.ONE);drawMesh(sphereMesh,gl.TRIANGLES,model(p[0],p[1],p[2],d.size*1.07),[1,.25,.02],0,true,1);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.depthMask(true)}
  if(k==='saturn'){drawMesh(ring,gl.TRIANGLES,model(p[0],p[1],p[2],d.size,0.28),[.82,.72,.48],20,true,1)}
  if(k==='earth'){drawMesh(moonOrbit,gl.LINE_LOOP,model(p[0],p[1],p[2],1),[.34,.55,.65],30,false,1);const m=earthMoonPos();drawMoon(m,.22,[.75,.75,.72],9)}
  if(k==='jupiter'){const moonDefs=[{o:2.6,s:.72,p:.2,z:.18,c:[.88,.63,.22],t:10},{o:3.2,s:.56,p:1.8,z:.16,c:[.75,.77,.72],t:11},{o:3.8,s:.43,p:3.2,z:.23,c:[.55,.52,.42],t:12},{o:4.5,s:.32,p:5.0,z:.20,c:[.42,.42,.39],t:12}];for(let i=0;i<4;i++){drawMesh(jMoonOrbits[i],gl.LINE_LOOP,model(p[0],p[1],p[2],1),[.30,.45,.52],30,false,1);const md=moonDefs[i],m=moonPos('jupiter',md.o,md.s,md.p,.14);drawMoon(m,md.z,md.c,md.t)}}
  const q=tx(vp,[p[0],p[1],p[2],1]);if(q[3]>0){const nx=q[0]/q[3],ny=q[1]/q[3];screenBodies[k]={x:(nx*.5+.5)*canvas.clientWidth,y:(-.5*ny+.5)*canvas.clientHeight,r:Math.max(11,d.size*18/camDist*22)}}
 }
 requestAnimationFrame(render)}
updateZoomUI();
  requestAnimationFrame(render);

// Controles de câmera e seleção direta no canvas
// PC: arraste para girar + roda do mouse para zoom.
// Tablet/celular: 1 dedo gira + pinça com 2 dedos controla o zoom.
const activePointers=new Map();
let down=false,lastX=0,lastY=0,moved=0;
let pinchStartDistance=0,pinchStartCamDist=0,pinchMoved=false;

function clampCameraDistance(v){
  return Math.max(2.8,Math.min(70,v));
}
function zoomPercentToDistance(percent){
  const p=Math.max(0,Math.min(100,Number(percent)||0))/100;
  // Curva suave: 0% = visão bem afastada, 100% = aproximação máxima.
  const minD=2.8,maxD=70;
  return maxD*Math.pow(minD/maxD,p);
}
function distanceToZoomPercent(distance){
  const minD=2.8,maxD=70;
  const d=clampCameraDistance(distance);
  const p=Math.log(d/maxD)/Math.log(minD/maxD);
  return Math.round(Math.max(0,Math.min(1,p))*100);
}
function updateZoomUI(){
  const label=$('zoomValue'),track=$('zoomTrack'),fill=$('zoomFill'),thumb=$('zoomThumb');
  if(!label)return;
  const pct=distanceToZoomPercent(camDist);
  label.textContent=pct+'%';
  if(track)track.setAttribute('aria-valuenow', String(pct));
  if(fill)fill.style.height=`calc(${pct}% - 0px)`;
  if(thumb)thumb.style.bottom=`calc(${pct}% + 10px)`;
}
function pointerDistance(){
  const pts=[...activePointers.values()];
  if(pts.length<2)return 0;
  return Math.hypot(pts[0].x-pts[1].x,pts[0].y-pts[1].y);
}
function stopAutoTravelForManualCamera(){
  travel=null;
  following=null;
  setWarp(false);
}
function selectPlanetAt(clientX,clientY){
  const r=canvas.getBoundingClientRect(),x=clientX-r.left,y=clientY-r.top;
  let best=null,bd=1e9;
  for(const k of ORDER){
    const s=screenBodies[k];
    if(!s)continue;
    const dd=Math.hypot(x-s.x,y-s.y);
    if(dd<Math.max(18,s.r)&&dd<bd){bd=dd;best=k}
  }
  if(best)travelTo(best);
}

canvas.addEventListener('pointerdown',e=>{
  if(e.pointerType==='touch')e.preventDefault();
  activePointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  try{canvas.setPointerCapture(e.pointerId)}catch(_){}
  moved=0;
  if(activePointers.size===1){
    down=true;
    pinchMoved=false;
    lastX=e.clientX;
    lastY=e.clientY;
  }else if(activePointers.size===2){
    down=false;
    pinchMoved=true;
    pinchStartDistance=Math.max(1,pointerDistance());
    pinchStartCamDist=camDist;
    stopAutoTravelForManualCamera();
  }
},{passive:false});

canvas.addEventListener('pointermove',e=>{
  if(!activePointers.has(e.pointerId))return;
  if(e.pointerType==='touch')e.preventDefault();
  activePointers.set(e.pointerId,{x:e.clientX,y:e.clientY});

  if(activePointers.size>=2){
    const dist=Math.max(1,pointerDistance());
    if(!pinchStartDistance){
      pinchStartDistance=dist;
      pinchStartCamDist=camDist;
    }
    const scale=dist/pinchStartDistance;
    camDist=clampCameraDistance(pinchStartCamDist/scale);
    updateZoomUI();
    pinchMoved=true;
    moved=999;
    stopAutoTravelForManualCamera();
    return;
  }

  if(!down)return;
  const dx=e.clientX-lastX,dy=e.clientY-lastY;
  moved+=Math.abs(dx)+Math.abs(dy);
  if(Math.abs(dx)+Math.abs(dy)>0)stopAutoTravelForManualCamera();
  yaw-=dx*.006;
  pitch=Math.max(-1.15,Math.min(1.15,pitch+dy*.005));
  lastX=e.clientX;
  lastY=e.clientY;
},{passive:false});

function finishPointer(e,cancelled=false){
  const wasSingle=activePointers.size===1;
  activePointers.delete(e.pointerId);
  try{canvas.releasePointerCapture(e.pointerId)}catch(_){}

  if(activePointers.size<2){
    pinchStartDistance=0;
    pinchStartCamDist=camDist;
  }

  if(activePointers.size===1){
    const remaining=[...activePointers.values()][0];
    down=true;
    lastX=remaining.x;
    lastY=remaining.y;
    moved=999; // evita clique acidental logo após uma pinça
  }else{
    down=false;
  }

  if(!cancelled && wasSingle && !pinchMoved && moved<8){
    selectPlanetAt(e.clientX,e.clientY);
  }

  if(activePointers.size===0){
    setTimeout(()=>{pinchMoved=false},0);
  }
}

canvas.addEventListener('pointerup',e=>finishPointer(e,false));
canvas.addEventListener('pointercancel',e=>finishPointer(e,true));
canvas.addEventListener('lostpointercapture',e=>{
  if(activePointers.has(e.pointerId))finishPointer(e,true);
});

canvas.addEventListener('wheel',e=>{
  e.preventDefault();
  camDist=clampCameraDistance(camDist*(1+Math.sign(e.deltaY)*.09));
  stopAutoTravelForManualCamera();
  updateZoomUI();
},{passive:false});

const zoomTrack=$('zoomTrack');
const zoomResetBtn=$('zoomResetBtn');

function setZoomFromPercent(percent){
  const pct=Math.max(0,Math.min(100,Number(percent)||0));
  camDist=zoomPercentToDistance(pct);
  stopAutoTravelForManualCamera();
  updateZoomUI();
}
function setZoomFromTrackEvent(e){
  if(!zoomTrack)return;
  const rect=zoomTrack.getBoundingClientRect();
  const raw=(rect.bottom - e.clientY) / rect.height;
  const pct=Math.max(0,Math.min(1,raw))*100;
  setZoomFromPercent(pct);
}
if(zoomTrack){
  let zoomDragging=false;
  zoomTrack.addEventListener('pointerdown',e=>{
    e.preventDefault();
    e.stopPropagation();
    zoomDragging=true;
    try{zoomTrack.setPointerCapture(e.pointerId)}catch(_){}
    setZoomFromTrackEvent(e);
  },{passive:false});
  zoomTrack.addEventListener('pointermove',e=>{
    if(!zoomDragging)return;
    e.preventDefault();
    setZoomFromTrackEvent(e);
  },{passive:false});
  function endZoomDrag(e){
    if(!zoomDragging)return;
    zoomDragging=false;
    try{zoomTrack.releasePointerCapture(e.pointerId)}catch(_){}
  }
  zoomTrack.addEventListener('pointerup',endZoomDrag);
  zoomTrack.addEventListener('pointercancel',endZoomDrag);
  zoomTrack.addEventListener('keydown',e=>{
    const current=distanceToZoomPercent(camDist);
    if(e.key==='ArrowUp' || e.key==='ArrowRight'){ e.preventDefault(); setZoomFromPercent(current+2); }
    if(e.key==='ArrowDown' || e.key==='ArrowLeft'){ e.preventDefault(); setZoomFromPercent(current-2); }
    if(e.key==='Home'){ e.preventDefault(); setZoomFromPercent(0); }
    if(e.key==='End'){ e.preventDefault(); setZoomFromPercent(100); }
  });
}
if(zoomResetBtn){
  zoomResetBtn.addEventListener('click',()=>{
    setZoomFromPercent(50);
  });
}
updateZoomUI();


// ---------- Laboratório de fases da Lua ----------
const moonCanvas=$('moonPhaseCanvas'),moonCtx=moonCanvas.getContext('2d');
const earthLabCanvas=$('earthLabCanvas'),earthLabCtx=earthLabCanvas.getContext('2d');
const moonOrbitCanvas=$('moonOrbitCanvas'),moonOrbitCtx=moonOrbitCanvas.getContext('2d');
const earthRealisticImg=new Image();
earthRealisticImg.src='assets/earth-realistic.png';
earthRealisticImg.onload=()=>drawEarthLab();

function drawEarthLab(){
 const ctx=earthLabCtx,w=earthLabCanvas.width,h=earthLabCanvas.height,cx=w/2,cy=h/2,r=w*.355;
 ctx.clearRect(0,0,w,h);

 // Atmospheric halo
 let halo=ctx.createRadialGradient(cx,cy,r*.72,cx,cy,r*1.18);
 halo.addColorStop(0,'rgba(63,181,255,0)');
 halo.addColorStop(.78,'rgba(63,181,255,.02)');
 halo.addColorStop(.91,'rgba(54,177,255,.34)');
 halo.addColorStop(.98,'rgba(95,213,255,.13)');
 halo.addColorStop(1,'rgba(95,213,255,0)');
 ctx.fillStyle=halo;
 ctx.beginPath();ctx.arc(cx,cy,r*1.18,0,Math.PI*2);ctx.fill();

 // Realistic Earth image
 ctx.save();
 ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.clip();

 if(earthRealisticImg.complete && earthRealisticImg.naturalWidth){
   const s=Math.min(earthRealisticImg.naturalWidth,earthRealisticImg.naturalHeight);
   const sx=(earthRealisticImg.naturalWidth-s)/2;
   const sy=(earthRealisticImg.naturalHeight-s)/2;
   ctx.drawImage(earthRealisticImg,sx,sy,s,s,cx-r,cy-r,r*2,r*2);
 }else{
   let fallback=ctx.createRadialGradient(cx-r*.35,cy-r*.38,r*.05,cx,cy,r*1.1);
   fallback.addColorStop(0,'#6bd3ff');fallback.addColorStop(.3,'#147ebd');
   fallback.addColorStop(.7,'#063f70');fallback.addColorStop(1,'#02111d');
   ctx.fillStyle=fallback;ctx.fillRect(cx-r,cy-r,r*2,r*2);
 }

 // Sun is on the left: reinforce spherical terminator without hiding texture.
 let shade=ctx.createLinearGradient(cx-r,cy,cx+r,cy);
 shade.addColorStop(0,'rgba(255,248,219,.05)');
 shade.addColorStop(.50,'rgba(0,0,0,0)');
 shade.addColorStop(.73,'rgba(0,5,16,.07)');
 shade.addColorStop(.90,'rgba(0,3,12,.26)');
 shade.addColorStop(1,'rgba(0,2,8,.55)');
 ctx.fillStyle=shade;ctx.fillRect(cx-r,cy-r,r*2,r*2);

 // Soft specular highlight
 let gloss=ctx.createRadialGradient(cx-r*.42,cy-r*.42,0,cx-r*.42,cy-r*.42,r*.72);
 gloss.addColorStop(0,'rgba(255,255,255,.10)');
 gloss.addColorStop(.48,'rgba(255,255,255,.018)');
 gloss.addColorStop(1,'rgba(255,255,255,0)');
 ctx.fillStyle=gloss;ctx.fillRect(cx-r,cy-r,r*2,r*2);
 ctx.restore();

 // Thin atmospheric edge
 ctx.strokeStyle='rgba(89,201,255,.78)';
 ctx.lineWidth=1.3;
 ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.stroke();

 // Tiny night-side rim for depth
 ctx.save();
 ctx.globalAlpha=.65;
 ctx.strokeStyle='rgba(13,77,132,.55)';
 ctx.lineWidth=3;
 ctx.beginPath();
 ctx.arc(cx+r*.015,cy,r*.985,-Math.PI/2,Math.PI/2);
 ctx.stroke();
 ctx.restore();
}

function moonTexture(ctx,c,r){
 const base=ctx.createRadialGradient(c-r*.34,c-r*.36,r*.05,c,c,r*1.18);base.addColorStop(0,'#f2f1ec');base.addColorStop(.22,'#cacac4');base.addColorStop(.58,'#8f918f');base.addColorStop(.86,'#5b5e5d');base.addColorStop(1,'#353a3d');ctx.fillStyle=base;ctx.fillRect(c-r,c-r,r*2,r*2);
 const maria=[[-.22,-.10,.22,.12,.2],[.25,.08,.18,.11,-.3],[.08,.34,.20,.08,.15],[-.12,-.38,.13,.08,-.2]];
 ctx.fillStyle='rgba(55,61,62,.25)';for(const [x,y,rx,ry,rot] of maria){ctx.beginPath();ctx.ellipse(c+x*r,c+y*r,rx*r,ry*r,rot,0,Math.PI*2);ctx.fill()}
 const cr=[[-.36,-.20,.115],[.18,-.34,.075],[.34,.10,.105],[-.12,.23,.07],[-.41,.31,.055],[.06,.04,.043],[.37,-.17,.04],[-.04,-.49,.04],[.17,.48,.055],[-.27,.43,.042],[.46,.33,.036]];
 for(const [x,y,rr] of cr){let cg=ctx.createRadialGradient(c+x*r-rr*r*.24,c+y*r-rr*r*.26,1,c+x*r,c+y*r,rr*r);cg.addColorStop(0,'rgba(46,49,50,.72)');cg.addColorStop(.64,'rgba(92,95,94,.28)');cg.addColorStop(.82,'rgba(230,229,218,.22)');cg.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=cg;ctx.beginPath();ctx.arc(c+x*r,c+y*r,rr*r,0,Math.PI*2);ctx.fill()}
}

function phasePath(ctx,c,r,day){
 const phase=(day/LUNAR_MONTH)*Math.PI*2,k=Math.cos(phase);
 ctx.beginPath();
 if(phase<=Math.PI){ctx.arc(c,c,r,-Math.PI/2,Math.PI/2,false);ctx.ellipse(c,c,Math.abs(k)*r,r,0,Math.PI/2,-Math.PI/2,phase<Math.PI/2)}
 else{ctx.arc(c,c,r,Math.PI/2,-Math.PI/2,false);ctx.ellipse(c,c,Math.abs(k)*r,r,0,-Math.PI/2,Math.PI/2,phase<Math.PI*1.5)}
 ctx.closePath();
}

function drawLunarDisc(canvas,day,opts={}){
 const ctx=canvas.getContext('2d'),w=canvas.width,h=canvas.height,c=w/2,r=w*(opts.ratio||.38);ctx.clearRect(0,0,w,h);
 if(opts.glow){let g=ctx.createRadialGradient(c,c,r*.66,c,c,r*1.32);g.addColorStop(0,'rgba(214,235,246,.10)');g.addColorStop(.72,'rgba(160,210,238,.045)');g.addColorStop(1,'rgba(160,210,238,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(c,c,r*1.32,0,Math.PI*2);ctx.fill()}
 // dark visible sphere
 ctx.save();ctx.beginPath();ctx.arc(c,c,r,0,Math.PI*2);ctx.clip();let dark=ctx.createRadialGradient(c-r*.32,c-r*.32,r*.04,c,c,r*1.2);dark.addColorStop(0,'#384149');dark.addColorStop(.55,'#192126');dark.addColorStop(1,'#070a0d');ctx.fillStyle=dark;ctx.fillRect(c-r,c-r,r*2,r*2);ctx.globalAlpha=.20;moonTexture(ctx,c,r);ctx.globalAlpha=1;ctx.restore();
 // illuminated portion with same real texture
 ctx.save();phasePath(ctx,c,r,day);ctx.clip();moonTexture(ctx,c,r);let shine=ctx.createLinearGradient(c-r,c,c+r,c);shine.addColorStop(0,'rgba(255,251,229,.22)');shine.addColorStop(.45,'rgba(255,255,255,.06)');shine.addColorStop(1,'rgba(20,25,28,.18)');ctx.fillStyle=shine;ctx.fillRect(c-r,c-r,r*2,r*2);ctx.restore();
 ctx.strokeStyle='rgba(211,229,239,.27)';ctx.lineWidth=Math.max(1,w/300);ctx.beginPath();ctx.arc(c,c,r,0,Math.PI*2);ctx.stroke();
}

function drawOrbitMoon(){drawLunarDisc(moonOrbitCanvas,lunarDay,{ratio:.38,glow:true})}

const PHASES=[
 {d:0,name:'Lua Nova',icon:'🌑',tip:'A Lua está aproximadamente entre a Terra e o Sol. A face iluminada fica voltada para longe de nós.'},
 {d:3.691,name:'Lua Crescente',icon:'🌒',tip:'Uma fina parte iluminada começa a aparecer depois da Lua Nova.'},
 {d:7.383,name:'Quarto Crescente',icon:'🌓',tip:'Vemos aproximadamente metade do disco lunar iluminado.'},
 {d:11.074,name:'Gibosa Crescente',icon:'🌔',tip:'Mais da metade da Lua está iluminada e a fase Cheia se aproxima.'},
 {d:14.765,name:'Lua Cheia',icon:'🌕',tip:'A Terra fica aproximadamente entre o Sol e a Lua, e vemos quase toda a face iluminada.'},
 {d:18.457,name:'Gibosa Minguante',icon:'🌖',tip:'Depois da Lua Cheia, a parte iluminada começa a diminuir.'},
 {d:22.148,name:'Quarto Minguante',icon:'🌗',tip:'Novamente vemos cerca de metade do disco iluminado, agora diminuindo.'},
 {d:25.839,name:'Lua Minguante',icon:'🌘',tip:'Resta uma fina faixa iluminada antes do ciclo retornar à Lua Nova.'}
];
function circularDiff(a,b){let d=Math.abs(a-b)%LUNAR_MONTH;return Math.min(d,LUNAR_MONTH-d)}
function currentPhase(){let best=PHASES[0],dist=1e9;for(const p of PHASES){const d=circularDiff(lunarDay,p.d);if(d<dist){dist=d;best=p}}return best}
function moonIllumination(){return (1-Math.cos((lunarDay/LUNAR_MONTH)*Math.PI*2))/2}
function drawMoonPhase(){drawLunarDisc(moonCanvas,lunarDay,{ratio:.35,glow:true})}

function drawFixedPhaseCanvases(){
 document.querySelectorAll('#moonPhaseStrip button').forEach(b=>{const c=b.querySelector('canvas');if(c)drawLunarDisc(c,Number(b.dataset.day),{ratio:.36,glow:false})});
 document.querySelectorAll('.orbit-phase-node').forEach(b=>{const c=b.querySelector('canvas');if(c)drawLunarDisc(c,Number(b.dataset.day),{ratio:.34,glow:false})});
}

function updateMoonLab(forceSlider=true){
 const phase=currentPhase(),illum=moonIllumination(),angle=(lunarDay/LUNAR_MONTH)*Math.PI*2;
 $('moonPhaseIcon').textContent=phase.icon;$('moonPhaseName').textContent=phase.name;$('moonPhaseNameLarge').textContent=phase.name;
 $('moonDayLabel').textContent='Dia '+lunarDay.toFixed(1).replace('.',',')+' de aproximadamente 29,5 dias';$('illuminationValue').textContent=Math.round(illum*100)+'%';$('illuminationBar').style.width=(illum*100).toFixed(1)+'%';$('phaseTip').textContent=phase.tip;
 // day 0 is on the Sun side (left), full moon on the opposite side (right)
 const ox=57-32.5*Math.cos(angle),oy=50-30*Math.sin(angle);$('moonOrbiter').style.left=ox+'%';$('moonOrbiter').style.top=oy+'%';$('moonOrbiter').style.transform='translate(-50%,-50%)';
 drawEarthLab();drawOrbitMoon();if(forceSlider)$('moonDaySlider').value=lunarDay;drawMoonPhase();
 document.querySelectorAll('#moonPhaseStrip button,.orbit-phase-node').forEach(b=>b.classList.toggle('active',circularDiff(lunarDay,Number(b.dataset.day))<1.85));
}

drawFixedPhaseCanvases();
$('moonPlayBtn').addEventListener('click',()=>{lunarRunning=!lunarRunning;$('moonPlayBtn').textContent=lunarRunning?'⏸ PAUSAR TEMPO':'▶ CONTINUAR TEMPO'});
$('moonSpeedSelect').addEventListener('change',e=>{lunarSpeed=Number(e.target.value)||.45});
$('moonDaySlider').addEventListener('pointerdown',()=>lunarDragging=true);
$('moonDaySlider').addEventListener('pointerup',()=>lunarDragging=false);
$('moonDaySlider').addEventListener('input',e=>{lunarDay=Number(e.target.value)%LUNAR_MONTH;updateMoonLab(false)});
document.querySelectorAll('#moonPhaseStrip button').forEach(b=>b.addEventListener('click',()=>{lunarDay=Number(b.dataset.day)%LUNAR_MONTH;updateMoonLab(true)}));
document.querySelectorAll('.orbit-phase-node').forEach(b=>b.addEventListener('click',()=>{lunarDay=Number(b.dataset.day)%LUNAR_MONTH;updateMoonLab(true)}));
updateMoonLab(true);

updatePanel('earth');compare();resizeGL();resizeWarp();
