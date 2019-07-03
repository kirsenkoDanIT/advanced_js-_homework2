'use strict'

class Hamburger {

    constructor(size, stuffing) {
        try {
            if (!arguments['0']) {
                throw new HamburgerException('no size given')
            }

            if (size.category !== 'size') {
                throw new HamburgerException(`invalid size ${size.name}`)
            }

            if (!arguments['1']) {
                throw new HamburgerException('no stuffing given')
            }

            if (stuffing.category !== 'stuffing') {
                throw new HamburgerException(`invalid stuffing ${stuffing.name}`)
            }
        } catch (e) {
            console.log(e.name, e.message)
        }
        this._size = size
        this._stuffing = stuffing
        this._toppings = []
    }

    static SIZE_SMALL = {
        price: 50,
        calories: 20,
        category: 'size',
        name: 'SIZE_SMALL',
    }
    static SIZE_LARGE = {
        price: 100,
        calories: 40,
        category: 'size',
        name: 'SIZE_LARGE',
    }

    static STUFFING_CHEESE = {
        price: 10,
        calories: 20,
        category: 'stuffing',
        name: 'STUFFING_CHEESE',
    }

    static STUFFING_SALAD = {
        price: 20,
        calories: 5,
        category: 'stuffing',
        name: 'STUFFING_SALAD',
    }
    static STUFFING_POTATO = {
        price: 15,
        calories: 10,
        category: 'stuffing',
        name: 'STUFFING_POTATO',
    }

    static TOPPING_MAYO = {
        price: 20,
        calories: 5,
        category: 'topping',
        name: 'TOPPING_MAYO',
    }
    static TOPPING_SPICE = {
        price: 15,
        calories: 0,
        category: 'topping',
        name: 'TOPPING_SPICE',
    }

    getSize() {
        return this._size
    }
    getStuffing() {
        return this._stuffing
    }
    get toppings() {
        return this._toppings
    }
    calculatePrice() {
        try {
            if (!this._size || !this._stuffing || this._size.category !== 'size' || this._stuffing.category !== 'stuffing') {
                throw new HamburgerException('nothing to calc, invalid size/stuffing');
            }

        } catch (e) {
            console.log(e.name, e.message);
        }

        let totalToppinsPrice = this._toppings.reduce((acc, item) => {
            return acc + item.price
        }, 0) || 0;

        if (this._size && this._stuffing) {
            this._price = this._size.price + this._stuffing.price + totalToppinsPrice;
        }

        if (!this._price) {
            this._price = 0;
        }

        return this._price;
    }


    calculateCalories() {
        try {
            if (!this._size || !this._stuffing || this._size.category !== 'size' || this._stuffing.category !== 'stuffing') {
                throw new HamburgerException('nothing to calc, invalid size/stuffing');
            }

        } catch (e) {
            console.log(e.name, e.message);
        }

        let totalToppinsCalories = this._toppings.reduce((acc, item) => {
            return acc + item.calories
        }, 0) || 0;

        if (this._size && this._stuffing) {
            this._calories = this._size.calories + this._stuffing.calories + totalToppinsCalories;
        }

        if (!this._calories) {
            this._calories = 0;
        }

        return this._calories;
    }
    set toppings(topping) {

        try {
            if (!this._size || !this._stuffing) {
                throw new HamburgerException('can not add topping, no size/stuffing given');
            }
            if (!topping || topping.category !== 'topping') {
                throw new HamburgerException('invalid topping!');
            }
            if (this._toppings.includes(topping)) {
                throw new HamburgerException(`duplicate topping ${topping.name}`);
            }
            this._toppings.push(topping)
        } catch (e) {
            console.log(e.name, e.message);
        }
    }
    removeTopping(topping) {
        try {
            if (!this._size || !this._stuffing) {
                throw new HamburgerException('can not remove topping, no size/stuffing given');
            }
            if (!topping || topping.category !== 'topping') {
                throw new HamburgerException('invalid topping!');
            }
            if (!this._toppings.includes(topping)) {
                throw new HamburgerException(`Can not remove a non-existent topping  ${topping.name}`);
            }
            this._toppings = this._toppings.filter((item) => {
                return item !== topping
            });
        } catch (e) {
            console.log(e.name, e.message);
        }
    }
}

function HamburgerException(message) {
    this.message = message
    this.name = 'HamburgerException: '
}



const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE)
// hamburger.toppings = Hamburger.TOPPING_MAYO
// hamburger.toppings = Hamburger.TOPPING_SPICE
hamburger.toppings = 'Hamburger.TOPPING_SPICE'
hamburger.toppings = Hamburger.STUFFING_CHEESE
// console.log(hamburger.toppings);
// const hamburger2 = new Hamburger(Hamburger.STUFFING_CHEESE, Hamburger.STUFFING_CHEESE)
// const hamburger = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_CHEESE)

// hamburger.removeTopping(Hamburger.TOPPING_MAYO)
// hamburger.removeTopping(Hamburger.TOPPING_MAYO)
// console.log("Is hamburger small: %s", hamburger.getSize() === Hamburger.SIZE_SMALL)
// console.log("Is hamburger large: %s", hamburger.getSize() === Hamburger.SIZE_LARGE)
// console.log("This size is %s", hamburger.getSize().name)
// console.log("This stuffing is %s", hamburger.getStuffing().name)
// console.log("Price: %f", hamburger.calculatePrice())
// console.log("Calories: %f", hamburger.calculateCalories())
console.log("Have %d toppings", hamburger.toppings.length)