import { Injectable } from '@angular/core';


@Injectable()
export class UserService {
    getBucketlists(): any{
        return {"id": 1,"username": "maria", "email": "maria@example.com"};
    }
}