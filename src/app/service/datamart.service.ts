import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Datamart } from "../interfaces/Datamart";

@Injectable({
  providedIn: "root",
})
export class DatamartService {
  url: string = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  getDataDatamart(): Observable<Datamart[]> {
    return this.http.get<Datamart[]>(`${this.url}/datamart-data`);
  }

  sycDatamart(): Observable<any> {
    return this.http.get<any>(`${this.url}/sync-motel`);
  }
}
