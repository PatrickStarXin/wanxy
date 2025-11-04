@Observed
export class GoalItem {
    id: number;
    title: string;
    sales: number;
    category: string;
    price: number;
    pic: string;
    label: string;
    constructor(id: number, title: string, sales: number, category: string, price: number, pic: string, label: string) {
        this.id = id;
        this.title = title;
        this.sales = sales;
        this.category = category;
        this.price = price;
        this.pic = pic;
        this.label = label;
    }
}
