'use strict'

class Hamburger {

    constructor(size, stuffing) {
        try {
            if (!arguments['0']) {
                throw new HamburgerException('no size given')
            }

            if (size.category !== 'size') {
                let sizeError = size.name || arguments['0']
                throw new HamburgerException(`invalid size ${sizeError}`)
            }

            if (!arguments['1']) {
                throw new HamburgerException('no stuffing given')
            }

            if (stuffing.category !== 'stuffing') {
                let stuffingError = stuffing.name || arguments['1']
                throw new HamburgerException(`invalid stuffing ${stuffingError}`)
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
                throw new HamburgerException('nothing to calc, invalid size/stuffing')
            }

        } catch (e) {
            console.log(e.name, e.message)
        }

        let totalToppinsPrice = this._toppings.reduce((acc, item) => {
            return acc + item.price
        }, 0) || 0

        if (this._size && this._stuffing) {
            this._price = this._size.price + this._stuffing.price + totalToppinsPrice
        }

        if (!this._price) {
            this._price = 0
        }

        return this._price
    }


    calculateCalories() {
        try {
            if (!this._size || !this._stuffing || this._size.category !== 'size' || this._stuffing.category !== 'stuffing') {
                throw new HamburgerException('nothing to calc, invalid size/stuffing')
            }

        } catch (e) {
            console.log(e.name, e.message)
        }

        let totalToppinsCalories = this._toppings.reduce((acc, item) => {
            return acc + item.calories
        }, 0) || 0

        if (this._size && this._stuffing) {
            this._calories = this._size.calories + this._stuffing.calories + totalToppinsCalories
        }

        if (!this._calories) {
            this._calories = 0
        }

        return this._calories
    }
    set toppings(topping) {

        try {
            if (!this._size || !this._stuffing) {
                throw new HamburgerException('can not add topping, no size/stuffing given')
            }
            if (!topping || topping.category !== 'topping') {
                throw new HamburgerException('invalid topping!')
            }
            if (this._toppings.includes(topping)) {
                throw new HamburgerException(`duplicate topping ${topping.name}`)
            }
            this._toppings.push(topping)
        } catch (e) {
            console.log(e.name, e.message)
        }
    }
    removeTopping(topping) {
        try {
            if (!this._size || !this._stuffing) {
                throw new HamburgerException('can not remove topping, no size/stuffing given')
            }
            if (!topping || topping.category !== 'topping') {
                throw new HamburgerException('invalid topping!')
            }
            if (!this._toppings.includes(topping)) {
                throw new HamburgerException(`Can not remove a non-existent topping  ${topping.name}`)
            }
            this._toppings = this._toppings.filter(item => item !== topping)
        } catch (e) {
            console.log(e.name, e.message)
        }
    }
}

function HamburgerException(message) {
    this.message = message
    this.name = 'HamburgerException: '
}



// маленький гамбургер с начинкой из сыра
const hamburger = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_POTATO)
// console.log("Calories: %f", hamburger.calculateCalories())
// console.log("Price: %f", hamburger.calculatePrice())
// const hamburger = new Hamburger(Hamburger.SIZE_LARGE, 1)
// добавка из майонеза
hamburger.toppings = Hamburger.TOPPING_MAYO
hamburger.toppings = Hamburger.TOPPING_MAYO
hamburger.removeTopping(Hamburger.TOPPING_MAYO)
hamburger.toppings = 1
hamburger.toppings = ''
hamburger.toppings = Hamburger.STUFFING_POTATO
hamburger.removeTopping(Hamburger.STUFFING_POTATO)
// спросим сколько там калорий
console.log("Calories: %f", hamburger.calculateCalories())
// сколько стоит
console.log("Price: %f", hamburger.calculatePrice())
// я тут передумал и решил добавить еще приправу
hamburger.toppings = Hamburger.TOPPING_SPICE
// А сколько теперь стоит? 
console.log("Price with sauce: %f", hamburger.calculatePrice())
// Проверить, большой ли гамбургер? 
console.log("Is hamburger large: %s", hamburger.getSize() === Hamburger.SIZE_LARGE)
// console.log("Is hamburger small: %s", hamburger.getSize() === Hamburger.SIZE_SMALL)
console.log("Is stuffing potato: %s", hamburger.getStuffing() === Hamburger.STUFFING_POTATO)

// Убрать добавку
// hamburger.removeTopping(Hamburger.TOPPING_SPICE)
console.log("Have %d toppings", hamburger.toppings.length)



// не передали обязательные параметры
// const h2 = new Hamburger() // => HamburgerException: no size given

// передаем некорректные значения, добавку вместо размера
// const h3 = new Hamburger(Hamburger.TOPPING_SPICE, Hamburger.TOPPING_SPICE)
// => HamburgerException: invalid size 'TOPPING_SAUCE'

// добавляем много добавок
// const h4 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE)
// h4.removeTopping(Hamburger.TOPPING_MAYO)
// h4.toppings = Hamburger.TOPPING_MAYO
// h4.toppings = Hamburger.TOPPING_MAYO
// HamburgerException: duplicate topping 'TOPPING_MAYO'