export interface NoteType {
    _id: string;
    title: string;
    description: string;
    date: string;
}
  
export interface UserType{
    _id: string;
    email: string;
    user: string;
    password: string;
    image: string;
    notes: NoteType[];
} 