(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{38:function(e,t,n){},39:function(e,t,n){},58:function(e,t,n){},60:function(e,t,n){},61:function(e,t,n){},68:function(e,t,n){"use strict";n.r(t);var s=n(1),a=n.n(s),i=n(27),r=n.n(i),c=(n(38),n(3)),l=(n(39),n(9)),o=n.n(l),h=n(11),d=n(2);n(58);function u(e,t,n,s,a){var i,r,c,l,o,h,d,u,p,b=new String;for(l=2102,o=1024,r=0;r<this.Size;r++)this.Result[r]=0;if(this.Result[0]=n,r=0,c=32===this.Size?9:12,a&&"normal"===t){for(;r<l&&1!==this.BinVal[r];)r++;if((i=o-r)>=this.MinExp?r++:r=o-(i=this.MinExp-1),h=this.Size-1-c+r,1===this.BinVal[h+1]){if(d=0,1===this.BinVal[h])d=1;else for(u=h+2;0===d&&u<l;)d=this.BinVal[u],u++;for(u=h;1===d&&u>=0;)0===this.BinVal[u]?(this.BinVal[u]=1,d=0):this.BinVal[u]=0,u--}(r-=2)<0&&(r=0)}for(;r<l&&1!==this.BinVal[r];)r++;for(p=o-r,"normal"===t?(i=p)>=this.MinExp&&i<=this.MaxExp?r++:i<this.MinExp&&(-1078===p?this.StatCond="normal":p<this.MinUnnormExp?this.StatCond="underflow":this.StatCond="denormalized",r=o-(i=this.MinExp-1)):(r=o-(i=s),i>this.MaxExp?i=this.MaxExp+1:i<this.MinExp&&(i=this.MinExp-1));c<this.Size&&r<l;)this.Result[c]=this.BinVal[r],c++,r++;if(i>this.MaxExp||"normal"!==t)if("normal"===t)for(i=this.MaxExp+1,this.StatCond="overflow",this.DispStr="Infinity",1===this.Result[0]&&(this.DispStr="-"+this.DispStr),c=32===this.Size?9:12;c<this.Size;)this.Result[c]=0,c++;else this.StatCond=t,this.DispStr=e;for(r=32===this.Size?8:11,this.BinaryPower=i,i+=this.ExpBias;i/2!==0;)this.Result[r]=i%2,i%2===0?i/=2:i=i/2-.5,r-=1;for(b="",r=0;r<this.Size;r++)b+=this.Result[r];return b}function p(e){var t,n,s,a,i,r,c;for(r=2102,c=1024,i=0;i<r;i++)this.BinVal[i]=0;if("-"===(e=function(e){var t,n,s,a,i,r,c,l,o,h,d,u=new String,p=new String,b=new String,x=new String,j=new String,f=new String;p="0123456789",d=5,e=e.toUpperCase(),-1!==(t=e.indexOf("E"))?(n=t,s=1*(b=e.substring(t+1,e.length))):(n=e.length,s=0);i=-1!==(a=e.indexOf("."))?a:n;r=0,"-"===e.charAt(r)?(r++,x="-"):"+"===e.charAt(r)?(r++,x="+"):x="+";c=!1;for(;r<n&&!c;){for(l=1;l<p.length;){if(e.charAt(r)===p.charAt(l)){c=!0;break}l++}r++}r--,c?((o=i-r)>0&&(o-=1),s+=o):s=0;"-"===(f=""+s).charAt(h=0)?(h++,j="-"):j="+";b="E"+j,l=0;for(;l<d-f.length+h;)b+="0",l++;b+=f.substring(h,f.length),u=x,a===r+1?u+=e.substring(r,n):n===r+1?(u+=e.substring(r,n),u+="."):a<r?(u+=e.substring(r,r+1),u+=".",u+=e.substring(r+1,n)):-1!==a?(u+=e.substring(r,r+1),u+=".",u+=e.substring(r+1,a),u+=e.substring(a+1,n)):(u+=e.substring(r,n),u+=".");return u+=b}(e)).charAt(0)?this.Result[0]=1:this.Result[0]=0,-1!==(e=function(e){var t=new String;x(b(e),"5030817976931348623157")?(t="Infinity","-"===e.charAt(0)&&(t="-"+t)):t=e;return t}(e)).indexOf("Infinity"))a=this.MaxExp+1,this.StatCond64="overflow",this.DispStr=e;else if(this.StatCond64=function(e){var t=new String;t=x("4967624703282292062328",b(e))?"underflow":"normal";return t}(e),"underflow"===this.StatCond64)a=this.MinExp-1;else{for(e*=1,s=(t=Math.abs(e))-(n=Math.floor(t)),i=c;n/2!==0&&i>=0;)this.BinVal[i]=n%2,n%2===0?n/=2:n=n/2-.5,i-=1;for(i=1025;s>0&&i<r;)(s*=2)>=1?(this.BinVal[i]=1,s--,i++):(this.BinVal[i]=0,i++);for(i=0;i<r&&1!==this.BinVal[i];)i++;(a=c-i)<this.MinExp&&(a=this.MinExp-1)}this.BinaryPower=a}function b(e){var t,n,s,a=new String,i=new String;for(5,5e4,t=e.indexOf("E"),n=1*(a=e.substring(t+1,e.length)),a=i=""+(n+=5e4),s=0;s<5-i.length;)a="0"+a,s++;return a+=e.substring(1,2),a+=e.substring(3,t)}function x(e,t){var n,s,a,i,r,c=new String;for(c="0123456789",n=!1,s=e.length>t.length?e.length:t.length,a=0;a<s&&!((i=a<e.length?c.indexOf(e.charAt(a)):0)<(r=a<t.length?c.indexOf(t.charAt(a)):0));){if(i>r){n=!0;break}a++}return n}function j(){var e,t,n,s=new String;new String;for("0123456789ABCDEF",t=0;t<this.Size;t+=4){for(e=0,n=0;n<4;n++)e+=Math.pow(2,3-n)*this.Result[t+n];s+="0123456789ABCDEF".charAt(e)}return s}function f(e,t){var n,s,a,i,r,c,l,o,h,d,u,p=new String,b=new String,x=new String,j=new String,f=new String;for(b="0123456789",-1!==(n=(x=e.toUpperCase()).indexOf("E"))?(s=n,a=1*(j=e.substring(n+1,e.length))):(s=e.length,a=0),-1===e.indexOf(".")&&(x=e.substring(0,s),x+=".",e.length!==s&&(x+=e.substring(n,e.length)),e=x,n+=1,s+=1),i=e.indexOf("."),r=0,"-"===e.charAt(r)?(r++,f="-"):f="",c=r,l=!1;c<s&&!l;){for(o=1;o<b.length;){if(e.charAt(c)===b.charAt(o)){l=!0;break}o++}c++}if(c--,l?((h=i-c)>0&&(h-=1),j="e"+(a+=h)):c=r,d=s-c,-1!==(x=e.substring(c,s)).indexOf(".")&&(d-=1),u=d,t<d&&(u=t),x=e.substring(c,c+u+1),c!==r||-1===x.indexOf(".")){for(p=f,p+=e.substring(c,c+1),p+=".",p+=e.substring(c+1,c+u);d<t;)p+="0",d+=1;p+=j}else{for(p=e.substring(0,r+u+1);d<t;)p+="0",d+=1;e.length!==s&&(p+=e.substring(n,e.length))}return p}function m(){var e,t,n,s,a,i,r=new String;for(e=32===this.Size?9:12,this.BinaryPower<this.MinExp||this.BinaryPower>this.MaxExp?(n=0,s=0):(n=-1,s=1),t=e;t<this.Size;t++)s+=parseInt(this.Result[t])*Math.pow(2,n+e-t);return a=s*Math.pow(2,this.BinaryPower),32===this.Size?(e=8,s>0&&(i=Math.floor(Math.log(a)/Math.LN10),a+=.5*Math.pow(10,i-e+1),s+=5e-8)):e=17,1===this.Result[0]&&(a=-a),this.DecValue=""+a,"0"===this.DecValue&&1===this.Result[0]&&(this.DecValue="-"+this.DecValue),this.DecValue=f(this.DecValue,e),r=function(e,t){var n=new String,s=new String,a=e;return a<1&&(a+=1),s=f(s=""+a,t),n=a===e?s.substring(0,1):"0",n+s.substring(1,s.length)}(s,e),r}function g(e){this.Size=e,this.BinaryPower=0,this.DecValue="",this.DispStr="",this.Convert2Bin=u,this.Convert2Hex=j,this.Convert2Dec=m,this.Dec2Bin=p,this.StatCond="normal",this.StatCond64="normal",this.BinString="",this.BinVal=new Array(2102),32===e?(this.ExpBias=127,this.MaxExp=127,this.MinExp=-126,this.MinUnnormExp=-149,this.Result=new Array(32)):64===e&&(this.ExpBias=1023,this.MaxExp=1023,this.MinExp=-1022,this.MinUnnormExp=-1074,this.Result=new Array(64))}function O(e){var t="0";(e="string"===typeof e?parseFloat(e):e)<0&&(t="1",e=-e);var n=parseFloat(e).toString(2),s=0;if(s="0"===n.substr(0,1)?n.indexOf(".")-n.indexOf("1")+127:n.indexOf(".")-1+127,(n=(n=n.replace(".","")).substr(n.indexOf("1")+1)).length>23)n=n.substr(0,23);else for(;n.length<23;)n+="0";for(var a=parseFloat(s).toString(2);a.length<8;)a="0"+a;return parseInt(t+a+n,2).toString(16)}function v(e){e="string"!==typeof e?e.toString():e;var t,n=new g(32),s=new g(64);for(e=function(e){var t,n;for(new String,t=0;" "===e.charAt(t)&&t<e.length;)t++;for(n=e.length-1;" "===e.charAt(n)&&n>=0;)n--;return e.substring(t,n+1)}(e),s.Dec2Bin(e),s.BinString=s.Convert2Bin(s.DispStr,s.StatCond64,s.Result[0],s.BinaryPower,!1),2102,t=0;t<2102;t++)n.BinVal[t]=s.BinVal[t];n.BinString=n.Convert2Bin(s.DispStr,s.StatCond64,s.Result[0],s.BinaryPower,!0);var a=n.BinString;return{sign_bit:a[0],exp_bit:a.substring(1,9),mantissa_bit:a.substring(9,32),exp:n.BinaryPower,mantissa:n.Convert2Dec()}}function y(e){var t=0,n=0,s=1;if((e="0x"!==e.substring(0,2)?"0x".concat(e):e).length>10)throw"Value out of range";if(!/^0x[0-9a-fA-F]+$/g.test(e))throw"Invalid input!";if(/^0x/.exec(e))n=parseInt(e,16);else for(var a=e.length-1;a>=0;a-=1){if(e.charCodeAt(a)>255)throw"Invalid input!";n+=e.charCodeAt(a)*s,s*=256}var i=n>>>31?-1:1,r=(n>>>23&255)-127,c=(8388608+(8388607&n)).toString(2);for(a=0;a<c.length;a+=1)t+=parseInt(c[a])?Math.pow(2,r):0,r--;return t*i}function N(e,t,n){var s=parseInt(e),a=parseInt(t),i=parseFloat(n);return 0==a&&0==i?0:Math.pow(-1,s)*(1+i)*Math.pow(2,a-127)}function S(e,t){if(!t||!e)throw"Invalid input!";var n,s,a;if("float"==t){if(!E(e))throw"Input entered is invalid";s=O(e),a=v(e),n=e}else if("hex"==t)n=y(e),s=e,a=v(y(e));else if("ieee754"==t){var i=e.split("|"),r=i[0],c=i[1],l=i[2];!function(e,t,n){if(!w(e)||!w(t)||!E(n))throw"Invalid input";var s=parseInt(e),a=parseInt(t);if(n=parseFloat(n),isNaN(s)||isNaN(a)||isNaN(n))throw"Invalid input";if(0!=s&&1!=s)throw"invalid sign input";if(0!=n&&255===a)throw"special case identified: NaN";if(0==s&&0==n&&255===a)throw"special case identified: +Infinity";if(1==s&&0==n&&255===a)throw"special case identified: -Infinity";if(0===a)return void(0!==n?alert("special case identified: Denormalized numbers"):alert("special case identified: Zero"));if(a<0||a>255)throw"exponent value out of range";if(n<0||n>1)throw"mantissa value out of range"}(r,c,l),s=function(e,t,n){return O(N(e,t,n))}(r,c,l),a=v(n=N(r,c,l))}return{hexVal:s,binVal:a,realVal:n}}function w(e){return/^\d+$/g.test(e)}function E(e){return/^[+-]?\d+(\.\d+)?$/.test(e)}function C(e,t,n){var s=0;return"add"==n?s=parseFloat(e)+parseFloat(t):"subtract"==n?s=parseFloat(e)-parseFloat(t):"multiply"==n&&(s=parseFloat(e)*parseFloat(t)),s}var B=n(28),I=n(29),M=n(33),V=n(32),k=n(0),F=a.a.createContext(),A=function(e){Object(M.a)(n,e);var t=Object(V.a)(n);function n(){var e;Object(B.a)(this,n);for(var s=arguments.length,a=new Array(s),i=0;i<s;i++)a[i]=arguments[i];return(e=t.call.apply(t,[this].concat(a))).state={history:"some data"},e}return Object(I.a)(n,[{key:"render",value:function(){var e=this;return Object(k.jsx)(F.Provider,{value:{state:this.state,setHistory:function(t){return e.setState({history:t})}},children:this.props.children})}}]),n}(s.Component),D="https://localhost:5001",_=function(){var e=Object(s.useState)("float"),t=Object(c.a)(e,2),n=t[0],a=t[1],i=Object(s.useState)(""),r=Object(c.a)(i,2),l=r[0],h=r[1],d=Object(s.useState)(""),u=Object(c.a)(d,2),p=u[0],b=u[1],x=Object(s.useState)(""),j=Object(c.a)(x,2),f=j[0],m=j[1],g=Object(s.useState)(""),O=Object(c.a)(g,2),v=O[0],y=O[1],N=Object(s.useState)(""),w=Object(c.a)(N,2),E=w[0],C=w[1],B=Object(s.useState)(""),I=Object(c.a)(B,2),M=I[0],V=I[1],A=Object(s.useState)(""),_=Object(c.a)(A,2),R=_[0],T=_[1],z=Object(s.useContext)(F);Object(s.useEffect)((function(){document.title="IEEE 754 Converter",H()}),[]);var P=function(e){var t=e.target.value;a(t),b(""),m(""),h(""),T(""),y(""),C(""),V("")},H=function(){o.a.get("".concat(D,"/items")).then((function(e){console.log(e),z.setHistory(e.data)})).catch((function(e){console.log(e),alert("Invalid inputs")}))};return Object(k.jsxs)("div",{className:"home",children:[Object(k.jsxs)("div",{className:"border border-info p-2 mb-2",children:["(-1)",Object(k.jsx)("sup",{children:"sign  "})," (1 + fraction) x 2 ",Object(k.jsx)("sup",{children:"exponent - bias"})]}),Object(k.jsxs)("div",{className:"format",children:[Object(k.jsxs)("div",{className:"form-check form-check-inline",children:[Object(k.jsx)("input",{className:"form-check-input",checked:"float"===n,onChange:P,name:"input_format",value:"float",type:"radio",id:"float"}),Object(k.jsx)("label",{className:"form-check-label",htmlFor:"float",children:"Float"})]}),Object(k.jsxs)("div",{className:"form-check form-check-inline",children:[Object(k.jsx)("input",{className:"form-check-input",onChange:P,name:"input_format",value:"ieee754",type:"radio",id:"ieee754"}),Object(k.jsx)("label",{className:"form-check-label",htmlFor:"ieee754",children:"IEEE-754"})]}),Object(k.jsxs)("div",{className:"form-check form-check-inline",children:[Object(k.jsx)("input",{className:"form-check-input",onChange:P,name:"input_format",value:"hex",type:"radio",id:"hex"}),Object(k.jsx)("label",{className:"form-check-label",htmlFor:"hex",children:"Hex"})]})]}),Object(k.jsxs)("div",{className:"w-75  justify-content-center  d-flex",children:["ieee754"===n?Object(k.jsxs)("div",{className:"d-flex",children:[Object(k.jsx)("input",{type:"text",onChange:function(e){return y(e.target.value)},value:v,placeholder:"sign",style:{flexBasis:"30%"},className:"form-control"}),Object(k.jsx)("input",{type:"text",onChange:function(e){return C(e.target.value)},value:E,placeholder:"exponent(0-255)",className:"form-control mx-2"}),Object(k.jsx)("input",{type:"text",onChange:function(e){return V(e.target.value)},value:M,placeholder:"fraction(0-1)",className:"form-control"})]}):Object(k.jsx)("input",{type:"text",value:R,onChange:function(e){return T(e.target.value)},style:{width:"30%"},placeholder:"Enter a value",className:"form-control"}),Object(k.jsx)("button",{onClick:function(e){var t,s,a,i="ieee754"===n?"".concat(v,"|").concat(E,"|").concat(M):R;try{var r=S(i,n);t=r.binVal,s=r.realVal,a=r.hexVal,function(e){var t=e.Type,n=e.InputType;o.a.post("".concat(D,"/items"),{Type:t,InputType:n}).then((function(e){console.log(e)})).catch((function(e){console.log(e),alert("Invalid inputs")}))}({Type:"conversion",InputType:n}),b(t),m(a),h(s)}catch(c){alert(c),b(""),m(""),h("")}},type:"button",className:"btn btn-success mx-3",children:"Convert"})]}),Object(k.jsxs)("div",{className:"output",children:[Object(k.jsxs)("div",{className:"outputformat form-group row",children:[Object(k.jsx)("label",{className:"col-sm-2 col-form-label",htmlFor:"decimal",children:"Float"}),Object(k.jsx)("div",{className:"col-sm-8",children:Object(k.jsx)("input",{id:"decimal",placeholder:"decimal",className:"form-control ",value:l,type:"text",disabled:!0})})]}),Object(k.jsxs)("div",{className:"row form-group justify-content-left p-3 align-items-center border border-info rounded",children:[Object(k.jsx)("label",{className:"col-sm-2 col-form-label",htmlFor:"float",children:"IEEE-754"}),Object(k.jsxs)("div",{className:"ieee754 col-sm-10",children:[Object(k.jsxs)("div",{className:"d-flex justify-content-around p-1",children:[Object(k.jsx)("input",{id:"sign",placeholder:"sign",className:"form-control",value:p?"1"===p.sign_bit?"-1":"+1":"",type:"text",disabled:!0}),Object(k.jsx)("input",{id:"exponent",placeholder:"biased exponent (exp-127)",className:"form-control mx-2",value:p?p.exp:"",type:"text",disabled:!0}),Object(k.jsx)("input",{id:"mantissa",placeholder:"(1+fraction)",className:"form-control",value:p?p.mantissa:"",type:"text",disabled:!0})]}),Object(k.jsxs)("div",{className:"d-flex justify-content-around p-1",children:[Object(k.jsx)("input",{id:"sign bit",placeholder:"sign (binary)",className:"form-control",value:p?p.sign_bit:"",type:"text",disabled:!0}),Object(k.jsx)("input",{id:"exponent bits",placeholder:"exponent (binary)",className:"form-control mx-2",value:p?p.exp_bit:"",type:"text",disabled:!0}),Object(k.jsx)("input",{id:"mantissa bits",placeholder:"mantissa (binary)",className:"form-control",value:p?p.mantissa_bit:"",type:"text",disabled:!0})]}),Object(k.jsxs)("div",{className:"d-flex justify-content-around p-1",children:[Object(k.jsx)("input",{id:"sign-encode",placeholder:"sign (Encoded as)",className:"form-control",value:p?p.sign_bit:"",type:"text",disabled:!0}),Object(k.jsx)("input",{id:"exponent-encode",placeholder:"exponent (Encoded as)",className:"form-control mx-2",value:p?"".concat(parseInt(p.exp)+127):"",type:"text",disabled:!0}),Object(k.jsx)("input",{id:"mantissa-encode",placeholder:"mantissa (Encoded as)",className:"form-control",value:p?"".concat(parseInt(p.mantissa_bit,2)):"",type:"text",disabled:!0})]})]})]}),Object(k.jsxs)("div",{className:"outputformat form-group row",children:[Object(k.jsx)("label",{className:"col-sm-2 col-form-label",htmlFor:"hex",children:"Hex"}),Object(k.jsx)("div",{className:"col-sm-8",children:Object(k.jsx)("input",{id:"hex",placeholder:"hexadecimal",className:"form-control",value:f,type:"text",disabled:!0})})]})]})]})},R=(n(60),function(){var e=Object(s.useState)("float"),t=Object(c.a)(e,2),n=t[0],a=t[1],i=Object(s.useState)(""),r=Object(c.a)(i,2),l=r[0],h=r[1],d=Object(s.useState)(""),u=Object(c.a)(d,2),p=u[0],b=u[1],x=Object(s.useState)(""),j=Object(c.a)(x,2),f=j[0],m=j[1],g=Object(s.useState)(""),S=Object(c.a)(g,2),w=S[0],B=S[1],I=Object(s.useState)(""),M=Object(c.a)(I,2),V=M[0],F=M[1],A=Object(s.useState)(""),_=Object(c.a)(A,2),R=_[0],T=_[1],z=Object(s.useState)({sign:"",exp:"",mantissa:""}),P=Object(c.a)(z,2),H=P[0],U=P[1],L=Object(s.useState)({sign:"",exp:"",mantissa:""}),$=Object(c.a)(L,2),J=$[0],K=$[1],Z=function(e){var t=e.target.value;a(t),m(""),B(""),b(""),F(""),T(""),h(""),U({sign:"",exp:"",mantissa:""}),K({sign:"",exp:"",mantissa:""})},q=function(e){var t=e.Type,n=e.InputType;o.a.post("".concat(D,"/items"),{Type:t,InputType:n}).then((function(e){console.log(e)})).catch((function(e){console.log(e),alert("Invalid inputs")}))};return Object(k.jsxs)("div",{className:"container",children:[Object(k.jsxs)("div",{className:"border border-info p-2 mb-2",children:["(-1)",Object(k.jsx)("sup",{children:"sign  "})," (1 + fraction) x 2 ",Object(k.jsx)("sup",{children:"exponent - bias"})]}),Object(k.jsxs)("div",{className:"format",children:[Object(k.jsxs)("div",{className:"form-check form-check-inline",children:[Object(k.jsx)("input",{className:"form-check-input",checked:"float"===n,onChange:Z,name:"input_format1",value:"float",type:"radio",id:"reafloatl"}),Object(k.jsx)("label",{className:"form-check-label",htmlFor:"float",children:"Float"})]}),Object(k.jsxs)("div",{className:"form-check form-check-inline",children:[Object(k.jsx)("input",{className:"form-check-input",onChange:Z,name:"input_format1",value:"ieee754",type:"radio",id:"ieee754"}),Object(k.jsx)("label",{className:"form-check-label",htmlFor:"ieee754",children:"IEE754"})]}),Object(k.jsxs)("div",{className:"form-check form-check-inline",children:[Object(k.jsx)("input",{className:"form-check-input",onChange:Z,name:"input_format1",value:"hex",type:"radio",id:"hex"}),Object(k.jsx)("label",{className:"form-check-label",htmlFor:"hex",children:"Hex"})]})]}),Object(k.jsxs)("div",{className:"input",children:["ieee754"===n?Object(k.jsxs)("div",{children:[Object(k.jsxs)("div",{className:"d-flex mx-2",children:[Object(k.jsx)("input",{type:"text",val:H.sign,onChange:function(e){return U({sign:e.target.value,exp:H.exp,mantissa:H.mantissa})},placeholder:"sign",style:{flexBasis:"30%"},className:"form-control"}),Object(k.jsx)("input",{type:"text",val:H.exp,onChange:function(e){return U({sign:H.sign,exp:e.target.value,mantissa:H.mantissa})},placeholder:"exponent(0-255)",className:"form-control mx-2"}),Object(k.jsx)("input",{type:"text",val:H.mantissa,onChange:function(e){return U({sign:H.sign,exp:H.exp,mantissa:e.target.value})},placeholder:"fraction(0-1)",className:"form-control"})]}),Object(k.jsxs)("div",{className:"d-flex m-2",children:[Object(k.jsx)("input",{type:"text",val:J.sign,onChange:function(e){return K({sign:e.target.value,exp:J.exp,mantissa:J.mantissa})},placeholder:"sign",style:{flexBasis:"30%"},className:"form-control"}),Object(k.jsx)("input",{type:"text",val:J.exp,onChange:function(e){return K({sign:J.sign,exp:e.target.value,mantissa:J.mantissa})},placeholder:"exponent(0-255)",className:"form-control mx-2"}),Object(k.jsx)("input",{type:"text",val:J.mantissa,onChange:function(e){return K({sign:J.sign,exp:J.exp,mantissa:e.target.value})},placeholder:"fraction(0-1)",className:"form-control"})]})]}):Object(k.jsxs)("div",{style:{flexBasis:"40%"},children:[Object(k.jsx)("input",{onChange:function(e){F(e.target.value)},type:"text",value:V,placeholder:"Enter the first value",className:"form-control"}),Object(k.jsx)("input",{onChange:function(e){return T(e.target.value)},value:R,type:"text",placeholder:"Enter the second value",className:"form-control my-2"})]}),Object(k.jsxs)("select",{onChange:function(e){var t=e.target.value;h(t)},value:l,style:{width:"30%"},className:"form-select mx-2","aria-label":"Default select example",children:[Object(k.jsx)("option",{defaultValue:!0,children:"Select Operation"}),Object(k.jsx)("option",{value:"add",children:"Addition"}),Object(k.jsx)("option",{value:"subtract",children:"Subtraction"}),Object(k.jsx)("option",{value:"multiply",children:"Multiplication"})]}),Object(k.jsx)("button",{onClick:function(e){var t,s,a,i="ieee754"===n?"".concat(H.sign,"|").concat(H.exp,"|").concat(H.mantissa):V,r="ieee754"===n?"".concat(J.sign,"|").concat(J.exp,"|").concat(J.mantissa):R;try{var c=function(e,t,n,s){if(!s||!e||!t||!n)throw"Invalid input!";var a;if("float"==s){if(!E(e)||!E(t))throw"Input entered is invalid";a=C(e,t,n)}else if("hex"==s)a=C(e=y(e),t=y(t),n);else if("ieee754"==s){var i=e.split("|"),r=t.split("|"),c=i[0],l=i[1],o=i[2],h=r[0],d=r[1],u=r[2];a=C(N(c,l,o),N(h,d,u),n)}return{hexVal:O(a),binVal:v(a),realVal:a}}(i,r,l,n);t=c.binVal,s=c.realVal,a=c.hexVal,q({Type:"operation",InputType:n}),m(t),B(a),b(s)}catch(o){alert(o),m(""),B(""),b("")}},type:"button",className:"btn btn-success",children:"Submit"})]}),Object(k.jsxs)("div",{className:"output",children:[Object(k.jsxs)("div",{className:"outputformat form-group row",children:[Object(k.jsx)("label",{className:"col-sm-2 col-form-label",htmlFor:"decimal",children:"Float"}),Object(k.jsx)("div",{className:"col-sm-8",children:Object(k.jsx)("input",{id:"decimal",placeholder:"decimal",className:"form-control ",value:p,type:"text",disabled:!0})})]}),Object(k.jsxs)("div",{className:"row form-group justify-content-left p-2 align-items-center border border-info rounded  p-3",children:[Object(k.jsx)("label",{className:"col-sm-2 col-form-label",htmlFor:"float",children:"IEEE-754"}),Object(k.jsxs)("div",{className:"ieee754 col-sm-10",children:[Object(k.jsxs)("div",{className:"d-flex justify-content-around p-1",children:[Object(k.jsx)("input",{id:"sign",placeholder:"sign",className:"form-control",value:f?"1"===f.sign_bit?"-1":"+1":"",type:"text",disabled:!0}),Object(k.jsx)("input",{id:"exponent",placeholder:"biased exponent (exp-127)(exponent-127)",className:"form-control mx-2",value:f?f.exp:"",type:"text",disabled:!0}),Object(k.jsx)("input",{id:"mantissa",placeholder:"(1+fraction)",className:"form-control",value:f?f.mantissa:"",type:"text",disabled:!0})]}),Object(k.jsxs)("div",{className:"d-flex justify-content-around p-1",children:[Object(k.jsx)("input",{id:"sign bit",placeholder:"sign (binary)",className:"form-control",value:f?f.sign_bit:"",type:"text",disabled:!0}),Object(k.jsx)("input",{id:"exponent bits",placeholder:"exponent (binary)",className:"form-control mx-2",value:f?f.exp_bit:"",type:"text",disabled:!0}),Object(k.jsx)("input",{id:"mantissa bits",placeholder:"mantissa (binary)",className:"form-control",value:f?f.mantissa_bit:"",type:"text",disabled:!0})]}),Object(k.jsxs)("div",{className:"d-flex justify-content-around p-1",children:[Object(k.jsx)("input",{id:"sign-encode",placeholder:"sign (Encoded as)",className:"form-control",value:f?f.sign_bit:"",type:"text",disabled:!0}),Object(k.jsx)("input",{id:"exponent-encode",placeholder:"exponent (Encoded as)",className:"form-control mx-2",value:f?"".concat(parseInt(f.exp)+127):"",type:"text",disabled:!0}),Object(k.jsx)("input",{id:"mantissa-encode",placeholder:"mantissa (Encoded as)",className:"form-control",value:f?"".concat(parseInt(f.mantissa_bit,2)):"",type:"text",disabled:!0})]})]})]}),Object(k.jsxs)("div",{className:"outputformat form-group row",children:[Object(k.jsx)("label",{className:"col-sm-2 col-form-label",htmlFor:"hex",children:"Hex"}),Object(k.jsx)("div",{className:"col-sm-8",children:Object(k.jsx)("input",{id:"hex",placeholder:"hexadecimal",className:"form-control",value:w,type:"text",disabled:!0})})]})]})]})});var T=function(e){var t=Object(s.useContext)(F);return Object(s.useEffect)((function(){o.a.get("".concat(D,"/items")).then((function(e){console.log(e),t.setHistory(e.data)})).catch((function(e){console.log(e),alert("Invalid inputs")}))}),[]),Object(k.jsx)("div",{className:"wrapper",children:Object(k.jsx)("div",{children:Object(k.jsxs)("table",{style:{color:"white"},className:"table table-bordered",children:[Object(k.jsx)("thead",{children:Object(k.jsxs)("tr",{children:[Object(k.jsx)("th",{scope:"col",children:"Type"}),Object(k.jsx)("th",{scope:"col",children:"InputType"})]})}),Object(k.jsx)("tbody",{children:t.state.history.map((function(e){return Object(k.jsxs)("tr",{children:[Object(k.jsx)("td",{children:e.type}),Object(k.jsx)("td",{children:e.inputType})]})}))})]})})})};n(61);var z=function(e){return Object(k.jsxs)("div",{className:"wrapper",children:[Object(k.jsx)("input",{style:{width:"25%",backgroundColor:"#282c34",color:"white",border:"1.5px solid white"},className:"form-control",type:"text",placeholder:"Enter username",onKeyPress:e.handleEnter})," "]})};var P=Object(d.f)((function(e){var t=Object(s.useState)(!1),n=Object(c.a)(t,2),a=n[0],i=n[1];return Object(s.useEffect)((function(){document.title="IEEE 754 Converter"}),[]),Object(k.jsx)("div",{className:"App",children:a?Object(k.jsxs)("header",{className:"App-header",children:[Object(k.jsxs)("div",{className:"menu",children:[Object(k.jsx)(h.b,{activeClassName:"active",to:"/conversion",children:"Conversion"}),Object(k.jsx)(h.b,{activeClassName:"active",to:"/operations",children:"Operations"}),Object(k.jsx)(h.b,{activeClassName:"active",to:"/history",children:"History"})]}),Object(k.jsxs)(d.c,{children:[Object(k.jsx)(d.a,{exact:!0,path:"/",children:Object(k.jsx)(z,{})}),Object(k.jsxs)(A,{children:[Object(k.jsx)(d.a,{path:"/operations",children:Object(k.jsx)(R,{})}),Object(k.jsx)(d.a,{path:"/conversion",children:Object(k.jsx)(_,{})}),Object(k.jsx)(d.a,{path:"/history",children:Object(k.jsx)(T,{})})]})]})]}):Object(k.jsx)(z,{handleEnter:function(t){"Enter"===t.key&&(e.history.push("/conversion"),i(!0))}})})})),H=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,69)).then((function(t){var n=t.getCLS,s=t.getFID,a=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),s(e),a(e),i(e),r(e)}))};n(67);r.a.render(Object(k.jsx)(h.a,{children:Object(k.jsx)(a.a.StrictMode,{children:Object(k.jsx)(P,{})})}),document.getElementById("root")),H()}},[[68,1,2]]]);
//# sourceMappingURL=main.f9b89ad7.chunk.js.map