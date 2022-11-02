export interface Subscription {
    endpoint: string;
    expirationTime: string;
    keys: SubscriptionKey;
}

export interface SubscriptionKey {
    p256dh: string;
    auth: string;
}