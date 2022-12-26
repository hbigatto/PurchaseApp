import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Po } from '@app/po/po';
import { GenericHttpService } from '@app/generic-http.service';
@Injectable({
  providedIn: 'root',
})
export class PoService extends GenericHttpService<Po> {
  constructor(httpClient: HttpClient) {
    super(httpClient, `pos`);
  } // constructor
} // PoService