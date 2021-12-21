export class FileUpload {
  key!: string;
  name!: string;
  url!: string;

  constructor(public file: File) {}
}
