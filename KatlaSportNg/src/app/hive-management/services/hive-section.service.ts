import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { HiveSection } from '../models/hive-section';
import { HiveSectionListItem } from '../models/hive-section-list-item';

@Injectable({
  providedIn: 'root'
})
export class HiveSectionService {
  private url = environment.apiUrl + 'api/sections/';

  constructor(private http: HttpClient) { }

  getHiveSections(): Observable<Array<HiveSectionListItem>> {
    return this.http.get<Array<HiveSectionListItem>>(this.url);
  }

  getHiveSection(hiveSectionId: number): Observable<HiveSection> {
    return this.http.get<HiveSection>(`${this.url}${hiveSectionId}`);
  }

  setHiveSectionStatus(hiveSectionId: number, deletedStatus: boolean): Observable<Object> {
    return this.http.put(`${this.url}${hiveSectionId}/status/${deletedStatus}`, null);
  }

  addHiveSection(hiveSection: HiveSection, hiveId: number): Observable<HiveSection> {
    hiveSection.hiveId = hiveId;
    return this.http.post<HiveSection>(`${this.url}`, hiveSection);
  }

  updateHiveSection(hiveSection: HiveSection, hiveId: number): Observable<Object> {
    hiveSection.hiveId = hiveId;
    return this.http.put<Object>(`${this.url}${hiveSection.id}`, hiveSection);
  }

  deleteHiveSection(hiveSectionId: number): Observable<Object> {
    return this.http.delete<Object>(`${this.url}${hiveSectionId}`);
  }
}
