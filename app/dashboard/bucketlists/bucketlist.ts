import { IBucketlistItem } from '../bucketlist-items/bucketlist-items';

export interface IBucketlist {
    id: number;
    description: string;
    _links: any;
    user: any;
    itemCount: number;
    items: IBucketlistItem[];
}
