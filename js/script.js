'use strict'

class Hamburger {
    constructor(size, stuffing) {
        this._size = size
        this._stuffing = stuffing
        this._toppings = []
        console.log(arguments);
        this._price = this._size.price
    }


    static SIZE_SMALL = () => {
        return {
            price: 50,
            calories: 20,
            category: 'size',
            name: 'SIZE_SMALL',
        }
    }





    // get size() {
    //     return this._size
    // }
    // get stuffing() {
    //     return this._stuffing
    // }
    // get toppings() {
    //     return this._toppings
    // }
}

const hamburger = new Hamburger(Hamburger.SIZE_SMALL())
console.log(hamburger._size);
console.log(hamburger._price);
// console.dir(Hamburger);
// console.log(Hamburger.SIZE_SMALL);