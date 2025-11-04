import DatabaseService from 'common_utils/src/main/ets/service/DatabaseService';

export * from './src/main/ets/components/FoodCategory';
export * from './src/main/ets/model/FoodModelData';
export { Category } from 'common_utils/src/main/ets/service/DatabaseService';
export * from 'common_utils/src/main/ets/manager/EventManager'
export * from 'common_utils/src/main/ets/viewmodel/GoalItem'


console.log('DatabaseService:', DatabaseService);
export default DatabaseService;
