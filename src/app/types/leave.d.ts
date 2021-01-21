export interface LeaveElement{
    date: string;
    status: 'pending' | 'rejected' | 'accepted';
    description: string;
    id: string;
    serialNumber: number;
}
