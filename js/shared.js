// Shared data access and presentation helpers. User text is inserted with textContent.
export const $ = s => document.querySelector(s);
export const categories = ['Breakfast', 'Lunch', 'Dinner'];
export const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
export const params = new URLSearchParams(location.search);
export function el(tag, text, cls) { const node = document.createElement(tag); if(text != null) node.textContent = text; if(cls) node.className = cls; return node; }
export function link(text, href, cls) { const a=el('a',text,cls); a.href=href; return a; }
export function image(m) { const img=el('img'); img.src=m.image; img.alt=m.alt; img.width=380; img.height=280; img.style.height='auto'; return img; }
export const recipeURL = m => `recipe.html?id=${encodeURIComponent(m.id)}`;
export function message(text) { $('#message').textContent=text; }
export function read(key, fallback) { try {return JSON.parse(localStorage.getItem('kitchen.v1.'+key)) ?? fallback;} catch {return fallback;} }
export function write(key,value) {try {localStorage.setItem('kitchen.v1.'+key,JSON.stringify(value));return true;} catch {message('Browser storage is unavailable. Changes cannot be saved; check your privacy settings.');return false;} }
export async function meals() { const response=await fetch('data/meals.json'); if(!response.ok) throw Error('Recipes unavailable'); return response.json(); }
export function fail() {message('Recipes could not be loaded. Serve this folder with a local web server or GitHub Pages, then reload.');}
export function list(items,tag='ul') {const node=el(tag);items.forEach(item=>node.append(el('li',item)));return node;}
