import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../models/Address';
import { loginModel } from '../pages/login/models/loginModel';
import { User } from '../pages/signup/models/User';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private users: User[] = [];

  constructor(private localStorage: LocalStorageService) {
    // Créer les utilisateurs
    const usersRandom: User[] = [
      new User(
        'Josue', // firstname
        'Lubaki', // lastname
        'https://assets-prd.ignimgs.com/2020/08/06/john-wick-button-1596757524663.jpg' as string, // image
        'josuelubaki@gmail.com', // email
        'Josue2022', // password
        new Date(), // Dob
        '+1 873 873 8738', // phone
        new Address(
          '1010 Rue Richard',
          'app 09',
          'G8Z 1V5',
          'Trois-Rivières',
          'Québec'
        ), // address
        true, // isClient
        false, // isAdmin
        false // isAdmin
      ),
      new User(
        'Jonathan', // firstname
        'Kanyinda', // lastname
        'https://static.wikia.nocookie.net/marvelcentral/images/4/4a/Tony-Stark-iron-man-11234572-1485-2061.jpg/revision/latest?cb=20110219055106' as string, // image
        'jonathankanyinda@gmail.com', // email
        'Jonathan2022', // password
        new Date(), // Dob
        '+1 873 873 8738', // phone
        new Address(
          '1011 Rue Charles',
          'app 12B',
          'G8Z 1V4',
          'Trois-Rivières',
          'Québec'
        ), // address
        false, // isClient
        true, // isAdmin
        false // isAdmin
      ),
      new User(
        'Ismael', // firstname
        'Coulibaly', // lastname
        'https://static.wikia.nocookie.net/marvel-cinematic/images/3/32/Steve_Rogers_2.jpg/revision/latest?cb=20131025030358' as string, // image
        'ismaelcoulibal@gmail.com', // email
        'Ismael2022', // password
        new Date(), // Dob
        '+1 873 873 8738', // phone
        new Address(
          '1010 Rue Saint-Patrick',
          'app 3',
          'G8Z 1P4',
          'Trois-Rivières',
          'Québec'
        ), // address
        true, // isClient
        false, // isAdmin
        true // isAdmin
      ),
    ];

    this.createUsers(...usersRandom);
    console.log('Services : Users List', this.users);
  }

  // get users
  getUsers(): User[] {
    return this.users;
  }

  getUserById(idUser: string | number) {
    return this.users.find((user) => user.id === idUser);
  }

  /**
   * create user into the array
   * @param user User to create
   */
  createUser(user: User) {
    user = this.configIdUser(user);
    this.users.push(user);
  }

  /**
   * method to check if the user has an ID assigned, if not then assign one
   * @param user User to verify
   * @returns User
   */
  configIdUser(user: User): User {
    // Vérifier l'utilisateur a un ID depuis les données du tableau
    if (!user.id) {
      // Si l'utilisateur n'a pas d'ID, on le créer
      user.id = this._generateId();
      // update le nouveau user dans le tableau
      this.updateUser(user.id, user);
    }
    return user;
  }

  /**
   * generate random id UUID
   * @returns string
   */
  private _generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // create users into the array
  createUsers(...users: User[]) {
    users.forEach((user) => this.createUser(user));
  }

  /**
   * Method to login user by email and password
   * @param user User to login
   * @returns boolean
   */
  login(user: loginModel): boolean {
    // Chercher l'utilisateur dans la liste
    const userFound = this.getUserByEmail(user.email);
    if (userFound) {
      // Vérifier le mot de passe
      if (userFound.password === user.password) {
        console.log('Information User connected', userFound);
        // setter l'ID de l'utilisateur connecté dans le localStorage
        this.localStorage.setUserCurrent(userFound.id);
        // setter l'email de l'utilisateur
        this.localStorage.setVariable('email', userFound.email);
        return true;
      }
    }

    console.log('User not found');
    return false;
  }

  // update user into the array
  updateUser(id: string, userUpdated: User) {
    this.users.forEach((user, index) => {
      if (user.id === id) {
        this.users[index] = userUpdated;
      }
    });
  }

  // delete user with this id into the array
  deleteUser(id: string) {
    this.users.forEach((user, index) => {
      if (user.id === id) {
        this.users.splice(index, 1);
      }
    });
  }

  // get user by email
  getUserByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
}
