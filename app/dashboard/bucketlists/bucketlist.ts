import { IBucketlistItem } from '../bucketlist-items/bucketlist-item';

export interface IBucketlist {
    id: number;
    description: string;
    _links: any;
    user: any;
    itemCount: number;
    items: IBucketlistItem[];
}

export interface IBucketlistNew {
    description: string;
}

export interface IMessage {
    message: string;
}


export interface IBucketlistPaginated {
    data: [IBucketlist[]];
    current_page: number;
    has_next: number;
    has_previous: boolean;
    next_page: number;
    previous_page: number;
    total: number;
}
