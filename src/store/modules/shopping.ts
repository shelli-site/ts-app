import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';

export interface ShoppingState {
    status: string;
}

export class Food {
    count: number = 1;
    food: any = {
        id: 0,
        name: '',
        price: 0.01,
        picture: '',
        extra: {}
    }
}

@Module({dynamic: true, store, name: 'shopping'})
export class ShoppingCart extends VuexModule implements ShoppingState {
    status: string = 'shopping';
    foodList: Food[] = [];
    diningModeData: any = {
        mode: "堂食",
        position: 0
    };

    constructor() {
        super(VuexModule);
    }

    @Mutation
    addFood(food: Food) {
        let isExist: boolean = false;
        let foodList: Food[] = this.foodList.reduce((previous: Food[], current: Food) => {
            if (JSON.stringify(current.food) === JSON.stringify(food.food)) {
                isExist = true;
                current.count = food.count + current.count;
            }
            previous.push(current);
            return previous;
        }, []);
        !isExist && foodList.push(food);
        this.foodList = foodList;
        return true;
    }

    @Mutation
    refreshFoodList() {
        this.foodList = this.foodList.filter((food: Food) => food.count !== 0);
    }

    @Mutation
    clearShopping() {
        this.foodList = [];
    }

    @Mutation
    setDiningModeData(diningModeData: any) {
        this.diningModeData = {
            ...this.diningModeData, ...diningModeData
        };
    }

    @Mutation
    init() {
        this.status = 'shopping';
    }
}

export const ShoppingModule = getModule(ShoppingCart);

export default ShoppingModule
