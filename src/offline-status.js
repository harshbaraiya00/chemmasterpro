import {useEffect,useState} from 'react';
export function statusMatchesBuild(message,expectedBuild) {
  return Boolean(message?.ready && expectedBuild && message.buildId === expectedBuild);
}
export function useOfflineStatus() {
  const [status,setStatus]=useState(import.meta.env.PROD?'checking':'unavailable');
  useEffect(()=>{
    if(!import.meta.env.PROD || !('serviceWorker' in navigator)) {setStatus('unavailable');return;}
    let disposed=false;
    let timer;
    async function verify() {
      const worker=navigator.serviceWorker.controller;
      if(!worker) return;
      const channel=new MessageChannel();
      clearTimeout(timer);
      timer=setTimeout(()=>{channel.port1.close();if(!disposed)setStatus('failed');},10000);
      channel.port1.onmessage=event=>{
        clearTimeout(timer);
        const expected = typeof __CHEMMASTER_BUILD_ID__ === 'string' ? __CHEMMASTER_BUILD_ID__ : '';
        if(!disposed)setStatus(statusMatchesBuild(event.data,expected)?'ready':event.data?.buildId!==expected?'checking':'failed');
        channel.port1.close();
      };
      worker.postMessage({type:'CHEMMASTER_OFFLINE_STATUS'},[channel.port2]);
    }
    navigator.serviceWorker.addEventListener('controllerchange',verify);
    navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(async()=>{
      await navigator.serviceWorker.ready;
      if(!disposed)verify();
    }).catch(()=>{if(!disposed)setStatus('failed');});
    return ()=>{disposed=true;clearTimeout(timer);navigator.serviceWorker.removeEventListener('controllerchange',verify);};
  },[]);
  return status;
}
