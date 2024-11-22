import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Comment } from './comment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiURL: string = "";

  private httpClient = inject(HttpClient);
  constructor() { }

  getComments(pageNo: number): Observable<Comment[]>{
    return of([
    {
    id: 'FSDFDfGFRBVBD',
    userName: 'Tomek',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDdfGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDGFio8RBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDGFRqeBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSkDFDGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDGFhjgRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDGF443RBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    }
  ]);
    
  }
}
