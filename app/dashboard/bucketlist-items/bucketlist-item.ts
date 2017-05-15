export interface IBucketlistItem {
    id: number;
    description: string;
    detailsLink: string;
    bucketlistId: number;
    done: boolean;
}

export interface IBucketlistItemNew {
    description: string;
    done: boolean;
}