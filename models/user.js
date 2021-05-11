
class User{
    constructor(uid,email,phone,name,hasOwnImage,gender,contactUids) {
        this.uid=uid,
        this.email = email;
        this.phone = phone;
        this.name=name,
        this.hasOwnImage=hasOwnImage,
        this.gender = gender,
        this.contactUids = contactUids
    }
}

module.exports = User