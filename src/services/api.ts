import axios from 'axios';

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = process.env.REACT_APP_API_URL;


export const getNutrients = async (search: string) => {
  return await axiosInstance.get('nutrient/', {
    params: {
      search: search?.trim() !== '' ? search : '',
    }
  })
}

export const getSearchFood = async (search?: string, nutrientId?: number) => {
  const params: any = {
    search: search?.trim() !== '' ? search : '',
  }

  if (nutrientId) {
    params.nutrient_id = nutrientId ? nutrientId : ''
  }

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