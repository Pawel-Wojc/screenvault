import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassQueryParamsService {

  private titleSubject = new BehaviorSubject<string | null>(null);
  private title?: Observable<string | null> = this.titleSubject.asObservable();

  private tagsSubject = new BehaviorSubject<string[] | null>(null);
  private tags?: Observable<string[] | null> = this.tagsSubject.asObservable();

  public setTitle(title: string | null){
    this.titleSubject.next(title);
  }

  public getTitle(){
    return this.title;
  }

  public setTags(tags: string[] | null){
    this.tagsSubject.next(tags);
  }

  public getTags(){
    return this.tags;
  }
}
