import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Comment } from './comment';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {
  private apiURL: string = "";

  private httpClient = inject(HttpClient);
  constructor() { }

  getComments(){
    return [
    {
    id: 'FSDFDGFRBVBD',
    userName: 'Tomek',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
                                                                                                                                                                                                                                                                              
    ];
  }
}
