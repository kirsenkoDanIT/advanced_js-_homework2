'use strict'

class Hamburger {

    constructor(size, stuffing) {
        this._size = size
        this._stuffing = stuffing
        this._toppings = []

        try {
            if (!arguments['0']) {
                throw new HamburgerException('no size given')
            }

            if (size.category !== 'size') {
                throw new HamburgerException('invalid size ' + size.name)
            }

            if (!arguments['1']) {
                throw new HamburgerException('no stuffing given')
            }

            if (stuffing.category !== 'stuffing') {
                throw new HamburgerException('invalid stuffing ' + stuffing.name)
            }
        } catch (e) {
            console.log(e.name, e.message)
        }

    }

    static SIZE_SMALL = {
        price: 50,
        calories: 20,
        category: 'size',
        name: 'SIZE_SMALL',
    }

    static STUFFING_CHEESE = {
        price: 10,
        calories: 20,
        category: 'stuffing',
        name: 'STUFFING_CHEESE',
    }

    static TOPPING_MAYO = {
        price: 20,
        calories: 5,
        category: 'topping',
        name: 'TOPPING_MAYO',
    }



    getSize() {
        return this._size
    }
    getStuffing() {
        return this._stuffing
    }
    getToppings() {
        return this._toppings
    }
    calculatePrice() {
        if (this._toppings.length) {
            const totalToppinsPrice = this._toppings.reduce((acc, item) => {
                return acc + item.price
            }, 0)
            this.price = this._size.price + this._stuffing.price + totalToppinsPrice
        } else this.price = this._size.price + this._stuffing.price
        return this.price
    }
    calculateCalories() {
        if (this._toppings.length) {
            const totalToppinsCalories = this._toppings.reduce((acc, item) => {
                return acc + item.calories
            }, 0)
            this._calories = this._size.calories + this._stuffing.calories + totalToppinsCalories
        } else this._calories = this._size.calories + this._stuffing.calories
        return this._calories
    }
    addTopping(topping) {

        if (!this._toppings.includes(topping)) {
            this._toppings.push(topping)
        } else
            try {
                throw new HamburgerException('duplicate topping: ' + topping.name)
            } catch (e) {
                console.log(e.name, e.message)
            }
    }
    removeTopping(topping) {

        if (this._toppings.includes(topping)) {
            this._toppings = this._toppings.filter(item =>
                item !== topping
            )
        } else
            try {
                throw new HamburgerException('Can not remove a non-existent topping: ' + topping.name)
            } catch (e) {
                console.log(e.name, e.message)
            }

    }
}

function HamburgerException(message) {
    this.message = message
    this.name = 'HamburgerException: '
}



const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE)
const hamburger2 = new Hamburger(Hamburger.STUFFING_CHEESE, Hamburger.STUFFING_CHEESE)
hamburger.addTopping(Hamburger.TOPPING_MAYO)
hamburger.addTopping(Hamburger.TOPPING_MAYO)
hamburger.removeTopping(Hamburger.TOPPING_MAYO)
console.log("Is hamburger small: %s", hamburger.getSize() === Hamburger.SIZE_SMALL)
console.log("This stuffing is %s", hamburger.getStuffing().name)
console.log("Price: %f", hamburger.calculatePrice())
console.log("Calories: %f", hamburger.calculateCalories())
console.log("Have %d toppings", hamburger.getToppings().length)