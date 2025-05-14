export interface CourseModel {
    id: string;    
    code: string;
    description: string;
    title: string;
    order: number;
    data: string;
    tag: string;
    active: number;
    createdAt: Date;
    updatedAt: Date;
}