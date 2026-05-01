const { loadQaData } = require('./lib/loadQaData');
const { translateQuestion } = require('./lib/translateNotes');
const data = loadQaData();
const questions = [];
for (const section of data) { for (const q of section.questions) { const tr = translateQuestion(q.q); questions.push({orig:q.q, tr}); } }
const regex = new RegExp('\(kya|kaise|kyu|kyon|ka|ke|ki|ko|jabki|jab|hai|hain|hota|hoti|hote|karo|karte|karta|karna|agar|kyunki|isliye|ke liye|mein|par|pe|se|aur|ya|sirf|alag|milta|milti|dikhata|dikhati|rokta|banata|poochta|hamesha|bahut|zyada|kam|chahiye)\','i');
const hibad = questions.filter(x => regex.test(x.tr) && x.tr !== x.orig);
console.log('Total questions:', questions.length);
console.log('Translated with Hinglish markers:', hibad.length);
hibad.slice(0,50).forEach(item => { console.log('ORIG:', item.orig); console.log('TR:', item.tr); });