// import ListMode from '@/components/map/editMap/ListMode'
// import React from 'react'

// const SharePage = () => {
//   return (
//     <>
//     <div>SharePage</div>
//     <ListMode/>
//     </>
//   )
// }

// export default SharePage

'use client'

import React from 'react';
import { create } from 'zustand';
import { motion } from 'framer-motion';

// Zustand store
interface State{
  showPhoto: boolean
  toggleView: () => void;
}

const useStore = create<State>((set) => ({
  showPhoto: true,
  toggleView: () => set((state) => ({ showPhoto: !state.showPhoto })),
}));

// Card component
const Card = ({ post }) => {
  const { showPhoto, toggleView } = useStore();

  return (
    <div 
      className="relative w-64 h-64 cursor-pointer [perspective:1000px]" 
      onClick={toggleView}
    >
      <motion.div
        className="w-full h-full absolute [backface-visibility:hidden]"
        initial={false}
        animate={{ rotateY: showPhoto ? 0 : 180 }}
        transition={{ duration: 0.6 }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <img 
          src={post.imageUrl}
          alt={post.title} 
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </motion.div>
      <motion.div
        className="w-full h-full absolute [backface-visibility:hidden] bg-white p-4 rounded-lg shadow-lg"
        initial={false}
        animate={{ rotateY: showPhoto ? -180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <h3 className="text-lg font-bold mb-2">{post.title}</h3>
        <p className="text-sm">{post.comment}</p>
      </motion.div>
    </div>
  );
};

// Demo component
const FlippingCardDemo = () => {
  const posts = [
    { 
      id: 1, 
      title: "美しい風景", 
      imageUrl: "/images/placeholder.png", 
      comment: "これは美しい自然の風景です。山々と湖が織りなす絶景をお楽しみください。" 
    },
    { 
      id: 2, 
      title: "都市の夜景", 
      imageUrl: "next.svg", 
      comment: "夜の街の輝きを捉えた一枚。ビルの明かりが星のように輝いています。" 
    },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">フリッピングカードデモ</h1>
      <p className="text-center mb-6">カードをクリックしてフリップアニメーションを確認してください。</p>
      <div className="flex flex-wrap justify-center gap-8">
        {posts.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default FlippingCardDemo;
