import React, {useEffect, useState, useCallback, useRef} from 'react';
import TextField from '@mui/material/TextField';
import NutrientsFinder from './components/NutrientsFinder';
import { InputAdornment } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import './App.css';
import { getSearchFood, getChangePage, getFoodDetail } from './services/api';
import { AxiosResponse } from 'axios';
import DetailsModal from './components/DetailsModal';
import FoodCard from './components/FoodCard';
import { Food, FoodNutrient, Nutrient } from './interfaces';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const scrollToRef = (ref: any) => window.scrollTo({
  top: ref.current.offsetTop,
  behavior: 'smooth'
});

function App() {
  const [displayFood, setDisplayFood] = useState<Food[] | []>([]);
  const [foodCount, setFoodCount] = useState<number>(0);
  const [nextPage, setNextPage] = useState<string | null>(null)
  const [previousPage, setPreviousPage] = useState<string | null>(null)
  
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [inputFood, setInputFood] = useState<string>("");
  const [nutrientIds, setNutrientIds] = useState<Nutrient[]>([]);
  const [foodNutrients, setFoodNutrients] = useState<FoodNutrient[]>([]);

  const topRef = useRef(null);

  const onClickCardHandle = async (food: Food) => {
    setSelectedFood(food)
    const response = await getFoodDetail(food.fdc_id)
    setFoodNutrients(response.data);
    setShowDetailsModal(prev => !prev);
    scrollToRef(topRef);
  }

  const onCloseDetailsModal = () => {
    setShowDetailsModal(prev => !prev)
    setSelectedFood(null)
  }

  const findFood = useCallback(async () => {
    const response = await getSearchFood(inputFood, nutrientIds) as AxiosResponse<any, any>;

    const {count, next, previous, results} = response.data;

    setDisplayFood(results as Food[])
    setFoodCount(count);
    setNextPage(next);
    setPreviousPage(previous)
  }, [inputFood, nutrientIds])

  const changePage = async (page: string) => {
    const response = await getChangePage(page) as AxiosResponse<any, any>;

    const {count, next, previous, results} = response.data;

    setDisplayFood(results as Food[])
    setFoodCount(count);
    setNextPage(next);
    setPreviousPage(previous)
  }

  useEffect(() => {
    findFood();
  }, [inputFood, nutrientIds, findFood])

  useEffect(() => {
    findFood();
  }, [findFood])

  return (
    <div className='flex flex-col w-full h-full justify-between items-center' ref={topRef}>
      {showDetailsModal && selectedFood && <DetailsModal onClose={onCloseDetailsModal} food={selectedFood} nutrients={foodNutrients} />}
      <div className='flex items-center md:mt-12 mt-4'>
        <RestaurantIcon className='text-dark-blue-custom' fontSize='large'/>
        <h1 className="text-3xl font-bold underline text-dark-blue-custom ml-4">
          Search Food Data
        </h1>
      </div>
      <div className='flex md:flex-row flex-col md:mt-24 mt-8 w-full max-w-[900px] md:justify-between items-center'>
        <div className='flex md:mt-0 w-full md:w-auto px-4 md:px-0'>
          <TextField 
            id="search-food"
            label="Food"
            variant="outlined"
            size='small'
            className='md:w-56 w-full' 
            value={inputFood}
            onChange={(e) => setInputFood(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className='flex md:ml-8 mt-8 md:mt-0 w-full md:w-auto px-4 md:px-0'>
          <NutrientsFinder onChange={setNutrientIds} />
        </div>
      </div>
      <div className='flex flex-col w-full items-center'>
        <div className='flex w-full max-w-[900px] mt-8 mb-4 px-4 md:px-0'>
          <span className='font-bold text-dark-blue-custom'>Results: </span><span>{foodCount}</span>
        </div>
        <div className='flex md:flex-row flex-col w-full max-w-[900px] md:justify-between items-center flex-wrap px-3'>
          {displayFood.map((food: Food) => (
            <FoodCard food={food} onClick={onClickCardHandle} key={food.fdc_id}/>
          ))}
        </div>
      </div>
      <div className='flex flex-col w-full items-center'>
        {displayFood.length === 0 && <p className='font-semibold text-sm ml-1 text-dark-blue-custom'>We don't have any food to display...</p>}
      </div>
      <div className='flex w-full max-w-[900px] justify-between items-center md:mt-8 mt-3 px-4 md:px-0 pb-4'>
        <div className={`bg-dark-blue-custom text-white flex items-center justify-between rounded-xl mx-1 py-2 px-4 ${previousPage ? 'cursor-pointer ' : 'cursor-not-allowed opacity-40'}`} onClick={() => previousPage ? changePage(previousPage as string) : undefined}>
          <ChevronLeftIcon fontSize='small' className='text-white'/>
          <p>Back</p>
        </div>
        <div className={`bg-dark-blue-custom text-white flex items-center justify-between rounded-xl mx-1 py-2 px-4 ${nextPage ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'}`} onClick={() => nextPage ? changePage(nextPage as string) : undefined}>
          <p>Next</p>
          <ChevronRightIcon fontSize='small' className='text-white'/>
        </div>
      </div>
    </div>
  );
}

export default App;