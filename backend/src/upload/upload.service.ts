import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import * as uuid from 'uuid';
import { Readable } from 'stream';

@Injectable()
export class UploadService {
  private readonly storage: Storage;
  constructor() {
    const GCP_PROJECT_ID = process.env.PROJEC_ID || 'unified-hull-395713';
    //add to env
    const GCP_KEY_FILE_PATH = 'key-neiser-gcp.json';
    //
    this.storage = new Storage({
      projectId: GCP_PROJECT_ID,
      keyFilename: GCP_KEY_FILE_PATH,
    });
  }
  async uploadFile(image: { buffer: Buffer } | string) {
    if (typeof image === 'string') {
      return image;
    }
    const GCP_BUCKET = 'bucket-tasks-images-api';
    const bucket = this.storage.bucket(GCP_BUCKET);

    const imageStream = new Readable();
    imageStream.push(image.buffer);
    imageStream.push(null); // Завершаем поток
    const fileName = uuid.v4() + 'jpg';
    const fileOptions = {
      gzip: true,
    };
    const file = bucket.file(fileName);
    return new Promise<string>(async (resolve, reject) => {
      imageStream
        .pipe(file.createWriteStream(fileOptions))
        .on('error', (err) => {
          console.error(
            'Error when saving image:',
            (err && err.message) || 'something went wrong',
          );
          reject(err);
        })
        .on('finish', async () => {
          try {
            const url = file.publicUrl();
            resolve(url);
          } catch (err) {
            console.error('Error getting signed link:', err);
            reject(err);
          }
        });
    });
  }
}
