[{
    id: '',
    name: '',
    room: ''
}]

class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        var user = {
            id,
            name,
            room
        };
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0]
    }
    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }

    isUnique(a, n) {
        var temp = this.getUserList(a)
        if (temp.find((user) => user == n))
            return 0
        else return 1
    }
}

module.exports = {
    Users
};

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// }
//
// var me = new Person('Andrew', 25);
// var description = me.getUserDescription();
// console.log(description);
// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     getuserDescription() {
//         return `${this.name} is ${this.age} old`;
//     }
// }

// var me = new Person('Rohit', 25);{}