'use client'

import axios from 'axios'
import React from 'react'

interface VoiceButtonProps {
  text: string
}

const VoiceButton = ({text}: VoiceButtonProps) => {
const onClick = async ()=>{
  const res = await axios.get('https://deprecatedapis.tts.quest/v2/voicevox/audio/?text=ここに何か入力&key=O91_98k-4-l734r')
  console.log({data:res.data});
}

  return (
    <>
    <button
    onClick={onClick}
    >再生</button>
    </>
  )
}

export default VoiceButton