import {$,el,link,image,recipeURL,meals,fail,read,categories} from './shared.js';
async function start(){
 const recipes=await meals(); let filter='All meals',last='';
 function render(){const items=recipes.filter(m=>filter==='All meals'||filter===m.category||(filter==='Favorite'&&m.id===read('favorite','')));$('#cards').replaceChildren();$('#count').textContent=`${items.length} recipe${items.length===1?'':'s'}`;
 for(const m of items){const card=el('article',null,'card'),a=link('',recipeURL(m)),body=el('div',null,'cardbody'),meta=el('div',null,'meta');meta.append(el('span',m.category),el('span',`${m.minutes} min`));body.append(meta,el('h3',m.name),el('p',m.description),el('span','View recipe →','read'));const img=image(m);img.loading='lazy';a.append(img,body);card.append(a);$('#cards').append(card);}
 if(!items.length)$('#cards').append(el('p','No favorite yet. Open a recipe and choose “Save as favorite” to keep it here.'));
 }
 document.querySelectorAll('[data-filter]').forEach(btn=>btn.onclick=()=>{filter=btn.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));render();});
 $('#pick').onsubmit=e=>{e.preventDefault();const pool=recipes.filter(m=>m.category===$('#category').value&&m.id!==last);const m=pool[Math.floor(Math.random()*pool.length)];last=m.id;const box=el('article',null,'pickresult');box.append(image(m),el('span',`YOUR PICK · ${m.category.toUpperCase()} · ${m.minutes} MIN`,'kicker'),el('h3',m.name),el('p',m.description),link('Ingredients & instructions →',recipeURL(m),'action'));$('#picked').replaceChildren(box);};render();window.addEventListener('pageshow',render);
}start().catch(fail);
