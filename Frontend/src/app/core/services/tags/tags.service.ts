import { Injectable } from '@angular/core';
import { ApiService } from "../api-service";
import { HttpClient, HttpParams } from "@angular/common/http";
import {catchError, EMPTY, map, Observable, tap} from "rxjs";
import {Tag} from "../../models/tags/tag";
import {TagDetails} from "../../models/tags/tag-details";
import {NotificationService} from "../notification/notification.service";
@Injectable({
  providedIn: 'root'
})
export class TagsService extends ApiService {

  constructor(
    http: HttpClient,
    private readonly notificationService: NotificationService,
  ){ super(http); }

  getTags(pageNumber: number, pageSize: number, desc = true, all = false): Observable<Tag[]> {
    const url = all ? 'tags/all' : 'tags'
    return this.get<{ tags: Tag[] }>(url, new HttpParams({
      fromObject: {
        pageNumber,
        pageSize,
        desc
      }
    })).pipe(
      map(t => t.tags)
    );
  }

  getTag(id: string): Observable<TagDetails> {
    return this.get<TagDetails>(`tags/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getTagsAmount(): Observable<number> {
    return this.get<number>('tags/amount');
  }

  deleteTag(id: string, name: string) {
    return this.delete(`tags/${id}`)
      .pipe(
        tap(_ => this.notificationService.notifySuccess(`Deleted tag ${name}`)),
        catchError(_ => {
          this.notificationService.notifyError(`Failed deletion of tag ${name}`);
          return EMPTY;
        })
      )
  }

  updateTag(id: string | undefined, data: {name: string | null}) {
    return this.patch(`tags/${id}`, data)
      .pipe(
        tap(_ => this.notificationService.notifySuccess(`Tag updated`)),
        catchError(_ => {
          this.notificationService.notifyError(`Failed updating tag`);
          return EMPTY;
        })
      );
  }

  activateTag(id: string | undefined) {
    return this.post(`tags/${id}/activate`, {})
      .pipe(
        tap(_ => this.notificationService.notifySuccess(`Tag updated`)),
        catchError(_ => {
          this.notificationService.notifyError(`Failed updating tag`);
          return EMPTY;
        })
      );
  }

  deactivateTag(id: string | undefined) {
    return this.post(`tags/${id}/deactivate`, {})
      .pipe(
        tap(_ => this.notificationService.notifySuccess(`Tag updated`)),
        catchError(_ => {
          this.notificationService.notifyError(`Failed updating tag`);
          return EMPTY;
        })
      );
  }
}
