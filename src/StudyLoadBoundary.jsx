import React from 'react';
export default class StudyLoadBoundary extends React.Component {
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  render(){
    if(this.state.failed)return <section className="tool-card" role="alert"><h3>This study panel could not open.</h3><p>Your saved progress remains in this browser. Reconnect and reload to fetch the current study build.</p><button className="button button-primary" onClick={()=>window.location.reload()}>Reload study workspace</button></section>;
    return this.props.children;
  }
}
