import React from 'react';
import { Food } from '../interfaces';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface FoodCardProps {
  food: Food,
  onClick: Function
}
const FoodCard = ({ food, onClick }: FoodCardProps) => {
  return (
    <div
      className='md:w-[30%] w-full flex flex-col justify-between rounded-xl px-3 py-4 my-2 cursor-pointer shadow-lg shadow-dark-blue-custom transform transition duration-500 md:hover:scale-110 hover:scale-105'
      onClick={() => onClick(food)}
    >
      <div className='flex w-full justify-start'>
        <p className='truncate font-light'>{food.description}</p>
      </div>
      <div className='flex w-full justify-end mt-2'>
        <VisibilityIcon fontSize='small' className='text-dark-blue-custom'/>
        <p className='font-semibold text-sm ml-1 text-dark-blue-custom'>More</p>
      </div>
    </div>
  )
}

export default FoodCard;