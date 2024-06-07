import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private _storagePromise: Promise<void>;

  constructor(private storage: Storage) {
    this._storagePromise = this.init();
  }

  private async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  private async ensureStorageReady() {
    await this._storagePromise;
  }

  set(key: string, value: any): Observable<void> {
    return from(this.ensureStorageReady().then(() => this._storage?.set(key, value)));
  }

  get(key: string): Observable<any> {
    return from(this.ensureStorageReady().then(() => this._storage?.get(key)));
  }

  remove(key: string): Observable<void> {
    return from(this.ensureStorageReady().then(() => this._storage?.remove(key)));
  }

  clear(): Observable<void> {
    return from(this.ensureStorageReady().then(() => this._storage?.clear()));
  }
}