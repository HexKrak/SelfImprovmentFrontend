// core libraries
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

// import models
import { Goal } from '../models/goal';

// import environemnt variables
import { environment } from '../../environments/environment';

@Injectable()
export class GoalService {

  private eventApiUrl = `${environment.apiUrl}/goal`;
  private accessToken = localStorage.getItem('accessToken');

  constructor( private http: Http ) { }

  // create event action
  createGoal(goal: Goal): Promise<Goal> {
    // set the content type so lumen knows how to translate the content body
    const HEADERS = new Headers({ 'x-access-token': 'application/json' });
    const OPTIONS = new RequestOptions({ headers: HEADERS });

    // post the event to the api
    return this.http.post( `${this.eventApiUrl}/event`, JSON.stringify(goal), OPTIONS )
                    .toPromise()
                    .then(response => {
                      return response.json() as Goal
                    })
                    .catch(this.handleError);
  }

  // I would definitely want to handle errors better in a real world situation
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // log error to console
    return Promise.reject(error.message || error);
  }

}