!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.SelectAndReset=e():t.SelectAndReset=e()}(window,function(){return function(t){var e={};function s(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}return s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(i,n,function(e){return t[e]}.bind(null,n));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";s.r(e);class i{constructor(t){this.$cont=t}init(){return null!==this.$cont&&void 0!==this.$cont&&(this.$checkbox=this.$cont.querySelector(".js-checkbox").children[0],this.$button=this.$cont.querySelector(".js-button"),this.value=this.$button.dataset.value,this.isOpen=this.$cont.classList.contains("is-active"),this.initEvents(),!0)}initEvents(){this.$button.addEventListener("click",()=>{this.toggle()}),this.$checkbox.checked&&this.activate()}toggle(){return this.isOpen?this.deactivate():this.activate()}activate(){return!this.isOpen&&(this.isOpen=!0,this.$cont.classList.add("is-active"),this.$button.classList.add("is-selected"),this.$checkbox.value=1,this.$checkbox.setAttribute("checked",!0),!0)}deactivate(){return!!this.isOpen&&(this.isOpen=!1,this.$cont.classList.remove("is-active"),this.$button.classList.remove("is-selected"),this.$checkbox.value=0,this.$checkbox.removeAttribute("checked"),!0)}}class n{constructor(t,e){this.$cont=t;this.options=Object.assign({template:e.template||(t=>`<span style="pointer-events: none;">${t}</span>`),buttonClass:e.buttonClass},e)}init(){return null!==this.$cont&&void 0!==this.$cont&&(this.$input=this.$cont.querySelector(".js-input"),this.$counter=this.$cont.querySelector(".js-counter")||!1,this.$cont.addItem=this.addItem.bind(this),this.$cont.removeItem=this.removeItem.bind(this),!0)}addItem(t,e){const s=document.createElement("button");this.options.buttonClass&&(s.className+=`${this.options.buttonClass}`),s.setAttribute("data-children-name",t),s.setAttribute("data-parent-name",e),s.type="button",s.addEventListener("click",t=>{this.removeItem(t)}),s.innerHTML=this.setTemplate(t),this.$input.appendChild(s),!1==!this.$counter&&this.updateCounter()}updateCounter(){this.$counter.innerHTML=this.$input.children.length}removeItem(t){let e=null;const s=(e="string"==typeof t?document.querySelector(`[data-children-name="${t}"]`):t.target).getAttribute("data-parent-name"),i=e.getAttribute("data-children-name"),n=document.querySelector(`[data-param="${s}"]`),o=n.querySelector(`[data-fake-label="${i}"]`);n.removeItem(o),e.remove(),!1==!this.$counter&&this.updateCounter()}setTemplate(t){return this.options.template(t)}}class o{constructor(t){this.$cont=t}init(){return null!==this.$cont&&void 0!==this.$cont&&(this.$select=this.$cont.querySelector(".js-select"),this.$label=this.$cont.querySelector(".js-label"),this.$counter=this.$cont.querySelector(".js-counter"),this.$result=document.querySelector(".js-result"),this.param=this.$cont.getAttribute("data-param"),this.$fakeSelect=this.$cont.querySelector(".js-fake-select"),this.$options=this.$fakeSelect.querySelectorAll(".js-fake-option"),this.selectedOptions=[],this.count=this.$options.length,this.$cont.addItem=this.addItem.bind(this),this.$cont.removeItem=this.removeItem.bind(this),this.initEvents(),!0)}initEvents(){for(let t=0;t<this.count;t+=1)this.$options[t].addEventListener("click",()=>{this.onSelect(this.$options[t])});this.$label.addEventListener("click",()=>{this.onClick()}),document.addEventListener("click",t=>{let e=t.target;do{if(e===this.$cont)return!1;e=e.parentNode}while(e);return this.$cont.classList.remove("is-active")}),document.addEventListener("DOMContentLoaded",()=>{this.onPageReady()})}onClick(){return this.$cont.classList.contains("is-active")?this.deactivateCont():this.activateCont()}activateCont(){return this.$cont.classList.add("is-active")}deactivateCont(){return this.$cont.classList.remove("is-active")}onSelect(t){const e=t.getAttribute("data-fake-label");return t.classList.contains("is-selected")?this.$result.removeItem(e):(this.addItem(t,e),t.classList.add("is-selected"))}removeItem(t){const e=t.getAttribute("data-fake-value"),s=this.$select.querySelector(`[data-value="${e}"]`);this.selectedOptions.splice(this.selectedOptions.indexOf(e),1),s.checked=!1,s.removeAttribute("checked"),t.classList.remove("is-selected"),this.setCounter()}addItem(t,e){const s=t.getAttribute("data-fake-value"),i=this.$select.querySelector(`[data-value="${s}"]`);this.selectedOptions.push(s),i.checked=!0,i.setAttribute("checked",!0),this.$result.addItem(e,this.param),this.setCounter()}onPageReady(){for(let t=0;t<this.count;t+=1)if(this.$select.children[t].checked){const e=this.$select.children[t].getAttribute("data-value"),s=this.$select.children[t].getAttribute("data-label");this.selectedOptions.push(e),this.$options[t].classList.add("is-selected"),this.$result.addItem(s,this.param),this.setCounter()}}setCounter(){return this.selectedOptions.length>0?(this.$counter.classList.add("is-active"),this.$counter.innerHTML=this.selectedOptions.length,!0):(this.$counter.classList.remove("is-active"),this.$counter.innerHTML=0,!0)}}s.d(e,"Checkbox",function(){return i}),s.d(e,"Result",function(){return n}),s.d(e,"Select",function(){return o})}])});