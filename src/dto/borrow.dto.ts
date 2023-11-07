export class BorrowBookDto {
    book_id: number
    user_id: number
    checkout_date: string
    due_date: string
}

export class ReturnBookDto {
    id: number
    user_id: number
}