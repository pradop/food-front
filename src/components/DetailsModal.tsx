import React from 'react';
import { Food, FoodNutrient } from '../interfaces';

interface DetailModalProps {
  onClose: Function,
  food: Food,
  nutrients: FoodNutrient[]
}

const DetailsModal = ({onClose, food, nutrients}: DetailModalProps) => {

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10"
        onClick={() => onClose()}
      ></div>
      <div
        className="absolute md:top-20 top-5 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white z-10"
      >
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-bold text-gray-900">Food Details</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm font-medium">
              {food.description}
            </p>
          </div>
          <div className="mt-2 px-1 py-3 max-h-[70vh] md:max-h-[50vh] lg:max-h-[60vh] flex flex-col overflow-auto">
            <div className='flex w-full justify-between items-center'>
              <p className="text-md font-bold text-gray-500">Nutrient</p>
              <p className="text-md font-bold text-gray-500">Amount/Unit</p>
            </div>
            {nutrients.map((elem, i) => (
              <div className='flex w-full justify-between items-center' key={i}>
                <p className="text-sm text-gray-500 italic">{elem.nutrient}</p>
                <p className="text-sm text-gray-500 italic">{elem.amount} <span className='font-bold text-sm text-gray-500 italic'>{elem.unit_name}</span></p>
              </div>
            ))}
          </div>
          <div className="items-center px-4 py-3">
            <button
              onClick={() => onClose()}
              className="px-4 py-2 bg-dark-blue-custom text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-light-blue-custom"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </>

  )
}

export default DetailsModal;