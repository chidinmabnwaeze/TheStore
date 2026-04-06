export class Cart {
  constructor(public items: { productId: number; quantity: number }[] = []) {
    this.items = items;
  }

  addProduct(productId: number, quantity: number){
    const existingItem = this.items.find(item => item.productId ===productId);
    if(existingItem){
        existingItem.quantity += quantity;
    } else{
        this.items.push({ productId, quantity });
    }
  }

removeProduct(productId:number){
    this.items = this.items.filter(item => item.productId !== productId);      
}

calculateTotal(products: { id: number; price: number }[]): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
}
}



