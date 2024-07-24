// 'use client'
// import React, { ChangeEvent, useState } from 'react'
// import axios from 'axios'

// // Style
// const contentStyle: React.CSSProperties = {width: '80%', textAlign: 'center'}
// const textareaStyle: React.CSSProperties = {width: '100%', height: 100}
// const buttonStyle: React.CSSProperties = {...textareaStyle, fontSize: 30}
// const audioStyle: React.CSSProperties = {...textareaStyle}

// // Query型定義
// type Mora = {
//   text: string
//   consonant: string
//   consonant_length: number
//   vowel: string
//   vowel_length: number
//   pitch: number
// }

// type Query = {
//   accent_phrases: {
//       moras: Mora[]
//       accent: number
//       pause_mora: Mora
//   }
//   speedScale: number
//   pitchScale: number
//   intonationScale: number
//   volumeScale: number
//   prePhonemeLength: number
//   postPhonemeLength: number
//   outputSamplingRate: number
//   outputStereo: boolean
//   kana: string
// }

// const VoiceVox = () => {
//   const [inputText, setInputText] = useState<string>('')
//   const [queryJson, setQueryJson] = useState<Query>()
//   const [audioData, setAudioData] = useState<Blob>()

//   // 文字列からQueryを作り出す
//   const createQuery = async () => {
//     try {
//       const res = await axios.post('http://localhost:50021/audio_query', null, {
//         params: { speaker: 1, text: inputText }
//       });
  
//       if (res.data) {
//         setQueryJson(res.data as Query);
//       }
//     } catch (error) {
//       console.error('Error creating query:', error);
//     }
//   };
  
//   // Queryから合成音声を作り出す
//   const createVoice = async () => {
//     try {
//       const res = await axios.post('http://localhost:50021/synthesis', queryJson, {
//         params: { speaker: 1 },
//         responseType: 'blob',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
  
//       if (res.data) {
//         setAudioData(res.data as Blob);
//       }
//     } catch (error) {
//       console.error('Error creating voice:', error);
//     }
//   };

//   return (
//     <div className='App-header'>
//       <div style={contentStyle}>
//         <h2>読み上げたい文章を入力</h2>
//         <textarea 
//           style={textareaStyle}
//           value={inputText}
//           onChange={
//             (e: ChangeEvent<HTMLTextAreaElement>) => setInputText(e.target.value)
//           }
//         />
//       </div>

//       {inputText ? (
//         <div style={contentStyle}>
//           <p>↓</p>
//           <h2>文章からクエリデータを作成</h2>
//           <button style={buttonStyle} onClick={createQuery}>クエリ作成</button>
//         </div>
//       ) : null}

//       {queryJson ? (
//         <div style={contentStyle}>
//           <p>↓</p>
//           <h2>クエリデータから音声を合成</h2>
//           <button style={buttonStyle} onClick={createVoice}>音声合成</button>
//         </div>
//       ) : null}
      
//       {audioData ? (
//         <div style={contentStyle}>
//           <p>↓</p>
//           <h2>返却された音声ファイルを再生</h2>
//           <audio
//             style={audioStyle}
//             controls
//             src={audioData ? window.URL.createObjectURL(audioData) : undefined}>
//           </audio>
//         </div>
//       ) : null}
//     </div>
//   )
// }

// export default VoiceVox
