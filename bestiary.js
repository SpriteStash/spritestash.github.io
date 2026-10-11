let roster=[];
let currentAction='Idle';
let paused=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pauseButton=document.getElementById('pause-previews');
const status=document.getElementById('preview-status');
function updatePreviews(){
  for(const character of roster){
    const card=document.querySelector(`[data-character="${character.slug}"]`);
    const action=character.mapping[currentAction];
    const image=card.querySelector('img');
    image.src=character.files[action][paused?'still':'animated'];
    image.alt=`${character.name} ${action} ${paused?'pose':'animation'}`;
    card.querySelector('.preview-label').textContent=action.replace(/([a-z])([A-Z])/g,'$1 $2');
  }
  document.querySelectorAll('[data-action]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.action===currentAction)));
  pauseButton.textContent=paused?'Play previews':'Pause previews';
  pauseButton.setAttribute('aria-pressed',String(paused));
  status.textContent=`Showing ${currentAction}. ${paused?'Previews paused.':'Previews repeat for inspection.'}`;
}
document.querySelectorAll('[data-action]').forEach(button=>button.addEventListener('click',()=>{currentAction=button.dataset.action;updatePreviews();}));
pauseButton.addEventListener('click',()=>{paused=!paused;updatePreviews();});
fetch('assets/bestiary-pack-01/characters.json').then(response=>{if(!response.ok)throw new Error('Preview data unavailable');return response.json();}).then(data=>{roster=data;updatePreviews();}).catch(()=>{status.textContent='Preview controls could not load. Please reload the page.';document.querySelectorAll('.preview-controls button').forEach(button=>button.disabled=true);});
