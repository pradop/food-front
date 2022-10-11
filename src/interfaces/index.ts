export interface Nutrient {
  nutrient_id: number,
  name: string
}

export interface Food {
  fdc_id: number,
  description: string
}

export interface FoodNutrient {
  amount: number,
  nutrient: string,
  unit_name: string
}