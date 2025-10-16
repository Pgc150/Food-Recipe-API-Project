import React, { useEffect, useState } from 'react'

const Foodrecipe = () => {
    const[query,setQuery] = useState("pasta")
    const[recipes,setRecipes] = useState([])
    const[selected,setSelected] = useState(null)

    useEffect(()=>{
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then((res)=> res.json())
        .then(data => setRecipes(data.meals || []))
    },[query])
  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-100 to red 200 p-6'>
        <h1 className='text-4xl font-bold text-center mb-8 text-red-600 drop-shadow-lg'>
              Food Recipe
        </h1>

        <div>
            <input
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            placeholder='search recipe (e.g pasta,noodles)'
            className='w-full border max-w-md p-3 rounded-2xl shadow-lg '
             type="text" />
        </div>

        <div className='grid md:grid-cols-3 gap-6'>
            {recipes.map((meal)=>
            <div className='bg-white rounded-2xl shadow-xl overflow-hidden transition hover:shadow-2xl'>
                <img 
                src={meal.strMealThumb}
                className='w-full h-56 object-cover'
                />
                <div className='p-4'>
                    <h2 className='text-xl font-bold mb-2'>{meal.strMeal}</h2>
                    <button 
                    onClick={() => setSelected(meal)}
                    className='bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition hover:bg-orange-600'>View Recipe</button>
                </div>
            </div>

            )}
        </div>
        {selected && (
           <div 
           onClick={()=>setSelected(null)}
           className='fixed inset-0 bg-black opasity-70 flex items-center justify-center z-50'>
            <div
            onClick={(e)=>e.stopPropagation()}
            className='bg-white p-6 rounded-2xl max-w-lg w-full realitve overflow-y-auto max-h-[90vh]'
            >
                <h2 className='text-2xl font-bold mb-3'>{selected.strMeal}</h2>
                <img 
                className='rounded-xl mb-3'
                src={selected.strMealThumb} alt="" />
                <p
                className='mb-3 text-gray-600'
                >{selected.strInstructions}</p>
                <a
                className='text-blue-600 underline' 
                target="_blank"
                href={selected.strYoutube}>Watch on Youtube</a>
            </div>
           </div>
        )}

        <div>

        </div>
    </div>
  )
}

export default Foodrecipe