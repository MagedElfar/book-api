export class CreateBookDto {
    title: string;
    author: string;
    ISBN: string;
    qty: number;
    row_id: number;
    user_id: number
}

export class UpdateBookDto {
    id: number;
    title?: string;
    author?: string;
    ISBN?: string;
    qty?: number;
    row_id?: number;
    user_id?: number;
    userRole: string
}

export class DeleteBookDto {
    id: number;
    user_id?: number;
    userRole: string
}