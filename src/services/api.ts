import axios from 'axios';
import { Nutrient } from '../interfaces';

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = process.env.REACT_APP_API_URL;


export const getNutrients = async (search: string) => {
  return await axiosInstance.get('nutrient/', {
    params: {
      search: search?.trim() !== '' ? search : '',
    }
  })
}

export const getSearchFood = async (search?: string, nutrientIds?: Nutrient[]) => {
  let params = new URLSearchParams();

  for (let i = 0; nutrientIds && i < nutrientIds.length; i++) {
    const nutrient = nutrientIds[i];
    params.append('nutrient_ids', nutrient.nutrient_id.toString());
  }

  params.append('search', search?.trim() !== '' ? search as string : '');

  return await axiosInstance.get('food/', {
    params: params
  })
}

export const getChangePage = async (url: string) => {
  return await axiosInstance.get(url)
}

export const getFoodDetail = async (fdc_id: number) => {
  return await axiosInstance.get('food_detail/', {
    params: {
      fdc_id: fdc_id
    }
  })
}