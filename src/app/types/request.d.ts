export interface Request{
    date: string;
    status: 'pending' | 'accepted' | 'rejected';
    description: string;
    id: string;
    serialNumber: number;
    amount?: string;
}
