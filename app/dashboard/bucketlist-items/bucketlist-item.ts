export interface IBucketlistItem {
    id: number;
    description: string;
    detailsLink: string;
    bucketlist_id: number;
    done: boolean;
}

export interface IBucketlistItemNew {
    description: string;
    done: boolean;
}