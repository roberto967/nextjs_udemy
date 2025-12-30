import { HashingService } from './hashing.service';
import * as bcrypt from 'bcryptjs';

export class BcryptHashingService extends HashingService {
  async hash(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(data, salt);
  }

  async compare(data: string, hashedData: string): Promise<boolean> {
    const isValid = await bcrypt.compare(data, hashedData);
    return isValid;
  }
}
