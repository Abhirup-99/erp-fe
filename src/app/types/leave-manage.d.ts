export interface LeaveManage{
    date: string;
    status: 'pending' | 'accepted' | 'rejected';
    description: string;
    id: string;
    serialNumber: number;
    name: string;
    documentId: string;
}
