class UserDTO{
    constructor(email,phone,password,name,hasOwnImage,gender,contactUids) {
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.name=name,
        this.hasOwnImage=hasOwnImage,
        this.gender = gender,
        this.contactUids = contactUids
    }
}

module.exports = UserDTO