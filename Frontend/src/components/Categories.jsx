import React from 'react'

export const Categories = ({Sidebaropen}) => {
    const categories = ["Music", "Gaming", "Movies", "TV Shows", "News", "Trending", "Entertainment", "Education", "Science & Tech", "Travel", "Fashion", "Cooking", "Sports", "Pets", "Art", "Comedy", "Vlogs"]

    return ( 
        <div className='flex items-center gap-3 overflow-x-auto scrollbar-none pt-2 mt-15'>
            {
                categories.map((cat, ind) => 
                    <button key={ind} className='whitespace-nowrap bg-[#272727] px-4 py-1 rounded-lg text-sm hover:bg-gray-700 cursor-pointer'>{cat}</button>
                )
            }
        </div>
    )
}