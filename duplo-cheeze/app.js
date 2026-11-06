'use strict';
const filters=document.querySelectorAll('[data-filter]');
filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active))});document.querySelectorAll('[data-category]').forEach(item=>{item.hidden=button.dataset.filter!=='all'&&item.dataset.category!==button.dataset.filter})}));
const motion=matchMedia('(prefers-reduced-motion: reduce)');
const layers=[...document.querySelectorAll('[data-depth]')];
const hero=document.querySelector('.hero');
let current=scrollY,target=scrollY,frame=0;
function render(){current+=(target-current)*.12;const mobile=innerWidth<550?.55:1;layers.forEach(layer=>{const y=Math.min(current,hero.offsetHeight)*Number(layer.dataset.depth)*mobile;layer.style.transform=`translate3d(0,${y.toFixed(2)}px,0)${layer.classList.contains('round-stamp')?' rotate(12deg)':''}`});if(Math.abs(target-current)>.1)frame=requestAnimationFrame(render);else frame=0}
function update(){if(motion.matches)return;target=scrollY;if(!frame)frame=requestAnimationFrame(render)}
addEventListener('scroll',update,{passive:true});addEventListener('resize',update,{passive:true});motion.addEventListener('change',()=>{if(motion.matches){cancelAnimationFrame(frame);frame=0;layers.forEach(layer=>layer.style.transform='')}else update()});update();
