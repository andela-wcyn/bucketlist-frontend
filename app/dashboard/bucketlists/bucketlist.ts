import { IBucketlistItem } from '../bucketlist-items/bucketlist-items';

export interface IBucketlist {
    id: number;
    description: string;
    detailsLink: string;
    itemCount: number;
    items: IBucketlistItem[];
}