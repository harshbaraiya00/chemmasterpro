import React from 'react';
import NCERTReactionChapter from './NCERTReactionChapter';
import {toNameReaction} from './name-reaction-model.js';
export default function NameReactionTopicChapter(props) {
  return <NCERTReactionChapter {...props} item={toNameReaction(props.item)} allowOriginalSources={false}/>;
}
