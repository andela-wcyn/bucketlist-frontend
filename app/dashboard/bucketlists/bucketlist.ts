import { IBucketlistItem } from '../bucketlist-items/bucketlist-item';

export interface IBucketlist {
    id: number;
    description: string;
    _links: any;
    user: any;
    itemCount: number;
    items: IBucketlistItem[];
}
