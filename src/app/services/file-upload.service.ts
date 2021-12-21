import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/file-upload';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private _basePath: string = '/images';

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  uploadFileToStorage(fileUpload: FileUpload) {
    const date = Date.now();
    const filePath = `${this._basePath}/${date}`;
    const storageRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, fileUpload.file);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((url) => {
            if (url) {
              fileUpload.url = url;
              fileUpload.name = fileUpload.file.name;
              this.saveFileData(fileUpload);
            }
          });
        })
      )
      .subscribe();

    return task.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload) {
    this.db.list<FileUpload>(this._basePath).push(fileUpload);
  }

  getFiles(numOfItems: number): AngularFireList<FileUpload> {
    return this.db.list(this._basePath, (ref) => {
      return ref.limitToLast(numOfItems);
    });
  }

  deleteFile(fileUpload: FileUpload) {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(console.log);
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this._basePath).remove(key);
  }

  private deleteFileStorage(name: string) {
    const storageRef = this.storage.ref(this._basePath);
    storageRef.child(name).delete();
  }
}
